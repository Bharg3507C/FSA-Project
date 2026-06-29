# EFAR MediFlow — Full Stack Project

## Structure
```
efar_final/
├── client/          ← React/Vite frontend (port 5173)
│   ├── src/
│   │   ├── App.jsx       ← Full UI
│   │   ├── http.js       ← API fetch helper
│   │   ├── main.jsx      ← React entry
│   │   └── index.css     ← Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/          ← Node/Express backend (port 3001)
    ├── index.js          ← All-in-one server + bot logic
    ├── package.json
    ├── .env              ← Your credentials (pre-filled)
    └── .env.example      ← Safe version to commit
```

---

## Commands

### Terminal 1 — Start Server
```bash
cd server
npm install
node index.js
```

### Terminal 2 — Start Client
```bash
cd client
npm install
npm run dev
```

### Terminal 3 — Expose server publicly (required for WhatsApp)
```bash
npm install -g ngrok
ngrok http 3001
```
Copy the `https://xxxx.ngrok-free.app` URL

---

## Meta Webhook Setup (do this once)
1. Go to Meta Developer Console → Your App → WhatsApp → Configuration
2. Callback URL: `https://xxxx.ngrok-free.app/webhook`
3. Verify Token: `EFAR_WEBHOOK_2025`
4. Click **Verify and Save**
5. Webhook Fields → tick **messages** → Save

---

## Test
```bash
# Health check
curl http://localhost:3001/healthz

# Pending approvals
curl http://localhost:3001/api/leave/pending
```

---

## Bot Flow
```
User types: leave
Bot: What is your full name?
User: Sarah Lim
Bot: ✅ Name: Sarah Lim — What is your role?
User: Paramedic
Bot: ✅ Role: Paramedic — What date(s)?
User: 10 Jun 2025
Bot: ✅ Date(s): 10 Jun 2025 — What is your Ambulance ID?
User: AMB-01
Bot: ✅ Ambulance: AMB-01 — What type of leave?
User: MC
Bot: ✅ Leave Type: Medical Leave — Please upload your MC.
User: [uploads photo]
Bot: ✅ Document received — Request submitted! Ref: LR-xxx
```
