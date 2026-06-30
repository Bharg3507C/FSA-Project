import express from "express";
import cors    from "cors";
import dotenv  from "dotenv";

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Credentials ───────────────────────────────────────────────────────────────
const VERIFY_TOKEN = process.env.VERIFY_TOKEN    || "EFAR_WEBHOOK_2025";
const API_TOKEN    = process.env.ACCESS_TOKEN    || "";
const PHONE_ID     = process.env.PHONE_NUMBER_ID || "";
const WA_URL       = `https://graph.facebook.com/v22.0/${PHONE_ID}/messages`;

// ── In-memory stores ──────────────────────────────────────────────────────────
const sessions      = {};  // phone → { step, data }
const leaveRequests = [];  // all submitted requests

// ── WhatsApp send helpers ─────────────────────────────────────────────────────

async function sendText(to, body) {
  console.log(`\n📤 SENDING TO ${to}:\n${body}\n`);
  if (!API_TOKEN || !PHONE_ID) {
    console.error("❌ Missing ACCESS_TOKEN or PHONE_NUMBER_ID in .env — message NOT sent");
    return;
  }
  try {
    const res  = await fetch(WA_URL, {
      method:  "POST",
      headers: { "Authorization": `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type:    "individual",
        to,
        type: "text",
        text: { body },
      }),
    });
    const data = await res.json();
    if (!res.ok) console.error("❌ WA API error:", JSON.stringify(data.error));
    else         console.log("✅ Sent:", data.messages?.[0]?.id);
  } catch (err) {
    console.error("❌ sendText error:", err.message);
  }
}

async function sendTemplate(to, templateName, params) {
  if (!API_TOKEN || !PHONE_ID) return;
  try {
    const res  = await fetch(WA_URL, {
      method:  "POST",
      headers: { "Authorization": `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name:       templateName,
          language:   { code: "en" },
          components: [{ type: "body", parameters: params.map((p) => ({ type: "text", text: String(p) })) }],
        },
      }),
    });
    const data = await res.json();
    if (!res.ok) console.error("❌ Template error:", JSON.stringify(data.error));
    else         console.log("✅ Template sent:", templateName);
  } catch (err) {
    console.error("❌ sendTemplate error:", err.message);
  }
}

// ── Bot step definitions ──────────────────────────────────────────────────────

const STEPS = [
  {
    field: "fullName",
    ask: "👤 *What is your full name?*\n\nPlease reply with your full name as per employment records.\n_Example: Sarah Lim_",
    validate(v) {
      if (!v || v.trim().length < 2) return "Name must be at least 2 characters.";
      if (!/[a-zA-Z]/.test(v))       return "Name must contain letters.";
      return null;
    },
    clean: (v) => v.trim(),
  },
  {
    field: "role",
    ask: "🏥 *What is your role?*\n\nPlease reply with one of:\n\n• *Driver*\n• *Paramedic*\n• *EMT*",
    validate(v) {
      if (!["driver", "paramedic", "emt"].includes(v.trim().toLowerCase()))
        return "Please reply with *Driver*, *Paramedic*, or *EMT*.";
      return null;
    },
    clean: (v) => ({ driver: "Driver", paramedic: "Paramedic", emt: "EMT" }[v.trim().toLowerCase()]),
  },
  {
    field: "leaveDates",
    ask: "📅 *What date(s) are you taking leave?*\n\n_Example: 10 Jun 2025_ or _10–12 Jun 2025_",
    validate(v) {
      if (!v || v.trim().length < 5) return "Please enter a valid date or date range.";
      if (!/\d/.test(v))             return "Date must include numbers.";
      return null;
    },
    clean: (v) => v.trim(),
  },
  {
    field: "ambulance",
    ask: "🚑 *What is your Ambulance ID?*\n\n_Example: AMB-01_",
    validate(v) {
      if (!v || v.trim().length < 2) return "Please enter a valid ambulance ID.";
      return null;
    },
    clean: (v) => v.trim().toUpperCase(),
  },
  {
    field: "leaveType",
    ask: "📋 *What type of leave are you applying for?*\n\nPlease reply with:\n\n• *Medical Leave* (or MC)\n• *Annual Leave* (or AL)\n• *Emergency Leave*\n• *Unpaid Leave*",
    validate(v) {
      const valid = ["medical leave", "mc", "annual leave", "al", "emergency leave", "emergency", "unpaid leave", "unpaid"];
      if (!valid.includes(v.trim().toLowerCase()))
        return "Please choose: *Medical Leave*, *Annual Leave*, *Emergency Leave*, or *Unpaid Leave*.";
      return null;
    },
    clean(v) {
      const map = {
        "medical leave": "Medical Leave", "mc": "Medical Leave",
        "annual leave":  "Annual Leave",  "al": "Annual Leave",
        "emergency leave": "Emergency Leave", "emergency": "Emergency Leave",
        "unpaid leave":  "Unpaid Leave",  "unpaid": "Unpaid Leave",
      };
      return map[v.trim().toLowerCase()];
    },
  },
  {
    field: "mcDocument",
    ask: "📎 *Please upload your Medical Certificate (MC).*\n\n⚠️ *MC is required for Medical Leave.*\n\nSend a photo or PDF of your MC.\n_For other leave types, type *skip* to proceed._",
    validate(v, data, hasMedia) {
      if (data.leaveType === "Medical Leave" && !hasMedia && v.trim().toLowerCase() !== "skip")
        return "MC is required for Medical Leave. Please upload a photo or PDF.";
      return null;
    },
    clean: (v, hasMedia) => (hasMedia ? "[Document uploaded]" : "N/A"),
  },
];

const LABELS = {
  fullName: "Name", role: "Role", leaveDates: "Date(s)",
  ambulance: "Ambulance", leaveType: "Leave Type", mcDocument: "Document",
};

// ── Conversation handler ──────────────────────────────────────────────────────

async function handleMessage(phone, text, hasMedia) {
  const lower   = (text || "").trim().toLowerCase();
  const session = sessions[phone];

  console.log(`🤖 handleMessage | phone=${phone} | text="${text}" | hasMedia=${hasMedia} | step=${session?.step ?? "none"}`);

  // ── No active session ──
  if (!session) {
    if (lower === "leave") {
      sessions[phone] = { step: 0, data: {} };
      await sendText(phone,
        "👋 Hello! Welcome to *EFAR Leave Management*.\n\n" +
        "I will guide you through your application step by step. Let's begin! 😊\n\n" +
        "━━━━━━━━━━━━━━━━━━━━━"
      );
      await sendText(phone, STEPS[0].ask);
    } else {
      await sendText(phone,
        "👋 Hi! I'm the *EFAR Operations Bot*.\n\n" +
        "Type *leave* to apply for leave."
      );
    }
    return;
  }

  const { step, data } = session;
  const stepConf = STEPS[step];

  if (!stepConf) {
    delete sessions[phone];
    await sendText(phone, "Session expired. Type *leave* to start again.");
    return;
  }

  // ── Validate reply ──
  const error = stepConf.validate ? stepConf.validate(text, data, hasMedia) : null;
  if (error) {
    await sendText(phone, `❌ ${error}\n\n${stepConf.ask}`);
    return;
  }

  // ── Store answer ──
  const cleaned = stepConf.clean ? stepConf.clean(text, hasMedia) : text.trim();
  data[stepConf.field] = cleaned;
  await sendText(phone, `✅ *${LABELS[stepConf.field]}:* ${cleaned}`);

  session.step += 1;

  if (session.step < STEPS.length) {
    await sendText(phone, STEPS[session.step].ask);
    return;
  }

  // ── All steps done — submit ──
  delete sessions[phone];

  const record = {
    id:          `LR-${Date.now()}`,
    phone,
    ...data,
    status:      "pending",
    submittedAt: new Date().toISOString(),
  };
  leaveRequests.push(record);
  console.log("✅ Leave request saved:", record.id);

  // Send confirmation template (best effort)
  try {
    await sendTemplate(phone, "leave_request_confirmation", [
      data.fullName, data.role, data.leaveDates,
      data.ambulance, data.leaveType, record.id,
    ]);
  } catch (_) { /* ignore template errors */ }

  await sendText(phone,
    `📋 *Leave Request Submitted!*\n\n` +
    `• *Name:*       ${data.fullName}\n` +
    `• *Role:*       ${data.role}\n` +
    `• *Date(s):*    ${data.leaveDates}\n` +
    `• *Ambulance:*  ${data.ambulance}\n` +
    `• *Leave Type:* ${data.leaveType}\n` +
    `• *Reference:*  ${record.id}\n\n` +
    `Your application has been sent to the *Operations Director* for review.\n` +
    `You will receive a WhatsApp notification once a decision is made. 🙏`
  );
}

// ── WEBHOOK GET — Meta verification ──────────────────────────────────────────

app.get("/webhook", (req, res) => {
  const mode      = req.query["hub.mode"];
  const token     = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log(`🔐 Webhook verify | mode=${mode} | token=${token}`);

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    return res.status(200).send(challenge);
  }

  console.log(`❌ Verification failed — expected "${VERIFY_TOKEN}"`);
  return res.sendStatus(403);
});

// ── WEBHOOK POST — receive messages ──────────────────────────────────────────

app.post("/webhook", async (req, res) => {
  // Always 200 immediately so Meta doesn't retry
  res.sendStatus(200);

  console.log("\n" + "=".repeat(60));
  console.log("📨 INCOMING WEBHOOK:");
  console.log(JSON.stringify(req.body, null, 2));
  console.log("=".repeat(60));

  try {
    const body = req.body;

    if (body.object !== "whatsapp_business_account") {
      console.log("⚠️  Not a whatsapp_business_account event — skipping. Got:", body.object);
      return;
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value    = change.value || {};
        const messages = value.messages || [];
        const statuses = value.statuses || [];

        console.log(`📊 field="${change.field}" | messages=${messages.length} | statuses=${statuses.length}`);

        for (const msg of messages) {
          const phone    = msg.from;
          const type     = msg.type;
          let   text     = "";
          let   hasMedia = false;

          if (type === "text") {
            text = msg.text?.body || "";
          } else if (type === "image" || type === "document") {
            hasMedia = true;
            text     = "[media]";
          } else {
            text = `[${type}]`;
          }

          console.log(`📩 FROM: ${phone} | TYPE: ${type} | TEXT: "${text}"`);
          await handleMessage(phone, text, hasMedia);
        }

        for (const s of statuses) {
          console.log(`📊 Status: ${s.recipient_id} → ${s.status}`);
        }
      }
    }
  } catch (err) {
    console.error("❌ Webhook error:", err.message, "\n", err.stack);
  }
});

// ── Dashboard API ─────────────────────────────────────────────────────────────

app.get("/api/leave", (req, res) => {
  res.json(leaveRequests);
});

app.get("/api/leave/pending", (req, res) => {
  res.json(leaveRequests.filter((r) => r.status === "pending"));
});

app.post("/api/leave/approve/:id", async (req, res) => {
  const record = leaveRequests.find((r) => r.id === req.params.id);
  if (!record)                     return res.status(404).json({ error: "Not found" });
  if (record.status !== "pending") return res.status(400).json({ error: `Already ${record.status}` });

  record.status     = "approved";
  record.approvedAt = new Date().toISOString();

  try {
    await sendTemplate(record.phone, "leave_approved", [
      record.fullName, record.leaveDates, record.ambulance, record.leaveType,
    ]);
  } catch (_) { /* ignore */ }

  await sendText(record.phone,
    `🎉 *Great news, ${record.fullName}!*\n\n` +
    `Your *${record.leaveType}* for *${record.leaveDates}* has been *approved* ✅\n\n` +
    `We hope you have a restful recovery. Get well soon! 🙏\n\n` +
    `_Please ensure your shift is covered before your leave._\n\n` +
    `Reference ID: *${record.id}*`
  );

  res.json({ message: "Approved. Staff notified.", record });
});

app.post("/api/leave/reject/:id", async (req, res) => {
  const record = leaveRequests.find((r) => r.id === req.params.id);
  if (!record)                     return res.status(404).json({ error: "Not found" });
  if (record.status !== "pending") return res.status(400).json({ error: `Already ${record.status}` });

  const reason      = req.body?.reason || "No reason provided.";
  record.status     = "rejected";
  record.rejectedAt = new Date().toISOString();
  record.reason     = reason;

  delete sessions[record.phone];

  await sendText(record.phone,
    `❌ *Leave Request Update — ${record.fullName}*\n\n` +
    `Your *${record.leaveType}* for *${record.leaveDates}* has been *rejected*.\n\n` +
    `*Reason:* ${reason}\n\n` +
    `Please contact your Operations Director for clarification.\n` +
    `Type *leave* to submit a new request.\n\n` +
    `Reference ID: *${record.id}*`
  );

  res.json({ message: "Rejected. Staff notified.", record });
});

// ── Health & debug ────────────────────────────────────────────────────────────

app.get("/healthz", (req, res) => {
  res.json({
    ok:            true,
    verifyToken:   Boolean(VERIFY_TOKEN),
    apiToken:      Boolean(API_TOKEN),
    phoneId:       Boolean(PHONE_ID),
    activeSessions: Object.keys(sessions).length,
    totalRequests:  leaveRequests.length,
  });
});

app.get("/debug/sessions", (req, res) => res.json(sessions));

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n${"=".repeat(55)}`);
  console.log(`✅  EFAR Bot Server running on port ${PORT}`);
  console.log(`${"=".repeat(55)}`);
  console.log(`   VERIFY_TOKEN   : ${VERIFY_TOKEN ? "✓ " + VERIFY_TOKEN : "✗ MISSING"}`);
  console.log(`   ACCESS_TOKEN   : ${API_TOKEN    ? "✓ set"             : "✗ MISSING"}`);
  console.log(`   PHONE_NUMBER_ID: ${PHONE_ID     ? "✓ " + PHONE_ID     : "✗ MISSING"}`);
  console.log(`${"=".repeat(55)}`);
  console.log(`   POST /webhook        — receive WA messages`);
  console.log(`   GET  /webhook        — Meta verification`);
  console.log(`   GET  /healthz        — health check`);
  console.log(`   GET  /debug/sessions — active bot sessions`);
  console.log(`   GET  /api/leave/pending — pending approvals`);
  console.log(`${"=".repeat(55)}\n`);
});
