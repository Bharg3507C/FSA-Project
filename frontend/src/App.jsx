import { useState, useEffect, useRef } from "react";
import http from "./http.js";

/* ── Light theme: white background + indigo accents ── */
const C = {
  bg:       "#f5f5ff",
  sidebar:  "#1e1b4b",
  sidebarB: "#17144a",
  card:     "#ffffff",
  cardDeep: "#f3f4f6",
  border:   "#e5e7eb",
  indigo:   "#6366f1",
  indigoDk: "#4f46e5",
  purple:   "#8b5cf6",
  teal:     "#0d9488",
  green:    "#16a34a",
  orange:   "#ea580c",
  red:      "#dc2626",
  blue:     "#2563eb",
  yellow:   "#d97706",
  text:     "#111827",
  sub:      "#4b5563",
  muted:    "#9ca3af",
  white:    "#ffffff",
};

const G = {
  indigo:     "linear-gradient(135deg,#6366f1,#8b5cf6)",
  indigoSoft: "linear-gradient(135deg,#818cf8,#a78bfa)",
  teal:       "linear-gradient(135deg,#0d9488,#16a34a)",
  blue:       "linear-gradient(135deg,#2563eb,#6366f1)",
  orange:     "linear-gradient(135deg,#ea580c,#dc2626)",
  heroBg:     "linear-gradient(135deg,#1e1b4b 0%,#312e81 45%,#4338ca 100%)",
};

const shadow = "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)";
const shadowMd = "0 4px 16px rgba(99,102,241,0.10), 0 2px 6px rgba(0,0,0,0.06)";

/* ── tiny helpers ── */
function GTop({ g }) {
  return <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:g,borderRadius:"12px 12px 0 0" }} />;
}
function Card({ g=G.indigo, style={}, children }) {
  return (
    <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:12,position:"relative",overflow:"hidden",boxShadow:shadow,...style }}>
      <GTop g={g} />
      {children}
    </div>
  );
}
function SCard({ title, sub, g=G.indigo, children }) {
  return (
    <Card g={g} style={{ padding:"22px 24px",marginBottom:20 }}>
      {title && <div style={{ fontSize:15,fontWeight:700,color:C.text,marginBottom:sub?4:14 }}>{title}</div>}
      {sub   && <div style={{ fontSize:12,color:C.muted,marginBottom:16 }}>{sub}</div>}
      {children}
    </Card>
  );
}
function Badge({ label, color }) {
  return <span style={{ display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,color,background:`${color}18`,border:`1px solid ${color}40` }}>{label}</span>;
}
const TH = { color:C.muted,fontWeight:500,fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",padding:"8px 14px",textAlign:"left",borderBottom:`1px solid ${C.border}` };
const TD = { padding:"12px 14px",borderBottom:`1px solid ${C.border}`,color:C.sub,fontSize:13 };

/* ═══════════════════════════════
   PUBLIC PAGES
   ═══════════════════════════════ */
function Hero() {
  return (
    <div style={{ background:G.heroBg,borderRadius:16,padding:"52px 48px",marginBottom:24,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:-80,right:-80,width:320,height:320,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none" }} />
      <div style={{ position:"absolute",bottom:-60,left:-60,width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,0.03)",pointerEvents:"none" }} />
      <div style={{ fontSize:11,color:"rgba(255,255,255,0.6)",fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:14 }}>Singapore's Leading Emergency Medical Services Provider</div>
      <div style={{ fontSize:38,fontWeight:800,color:"#ffffff",lineHeight:1.15,marginBottom:14 }}>
        Your Trusted Partner in<br /><span style={{ color:"#a5b4fc" }}>Emergency Response</span> &amp; First Aid.
      </div>
      <div style={{ fontSize:14,color:"rgba(255,255,255,0.65)",maxWidth:580,lineHeight:1.8,marginBottom:28 }}>
        Emergencies First Aid &amp; Rescue (EFAR) is a private ambulance and first aid training company
        registered with the Ministry of Health Singapore. We provide 24/7 emergency and non-emergency
        ambulance services, event medical coverage, and WSQ-accredited first aid training island-wide.
      </div>
      <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:28 }}>
        <a href="https://wa.me/15556435278" target="_blank" rel="noreferrer"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 24px",borderRadius:10,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none" }}>
          🚑 Call Us: +65 6297 8000
        </a>
        <span style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 24px",borderRadius:10,color:"#99f6e4",fontWeight:600,fontSize:14,border:"1px solid rgba(153,246,228,0.3)" }}>
          📧 admin@emergencies.com.sg
        </span>
      </div>
      <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
        {[["MOH Licensed","#a5b4fc"],["WSQ Accredited","#c4b5fd"],["24/7 Operations","#99f6e4"],["Island-Wide Coverage","#fde68a"],["BCLS & AED Certified","#93c5fd"]].map(([l,col])=>(
          <span key={l} style={{ padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,color:col,background:"rgba(255,255,255,0.08)",border:`1px solid ${col}40` }}>{l}</span>
        ))}
      </div>
    </div>
  );
}
function StatsBar() {
  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:20 }}>
      {[["24/7","Emergency ambulance availability"],["2010","Year established"],["1000+","Events covered annually"],["WSQ","Accredited training provider"]].map(([n,l])=>(
        <Card key={l} g={G.indigo} style={{ padding:"18px 20px" }}>
          <div style={{ fontSize:26,fontWeight:800,color:C.indigo,marginBottom:4 }}>{n}</div>
          <div style={{ fontSize:12,color:C.muted,lineHeight:1.5 }}>{l}</div>
        </Card>
      ))}
    </div>
  );
}
function ServicesGrid() {
  const list = [
    { icon:"🚑",title:"Private Ambulance Services",desc:"MOH-licensed 24/7 emergency and non-emergency ambulance services with AED-equipped fleet.",col:C.indigo },
    { icon:"🏥",title:"Event Medical Services",desc:"On-site medical standby for marathons, concerts, corporate events and mass gatherings.",col:C.purple },
    { icon:"🎓",title:"First Aid Training",desc:"WSQ-accredited BCLS+AED, Standard First Aid, and occupational first aid courses.",col:C.teal },
    { icon:"🩺",title:"Medical Escort Services",desc:"Safe transport with trained medical personnel between hospitals, clinics, or home care.",col:C.blue },
    { icon:"🏢",title:"Corporate Medical Retainer",desc:"Dedicated first aid officers and AED management for workplaces and industrial sites.",col:C.orange },
    { icon:"📋",title:"CPR & AED Courses",desc:"Practical CPR and AED certification recognised under Singapore's Heart Safe Community.",col:C.red },
  ];
  return (
    <SCard title="Our Services" sub="Comprehensive emergency medical services and first aid training across Singapore" g={G.indigoSoft}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
        {list.map(s=>(
          <div key={s.title} style={{ background:C.cardDeep,borderRadius:10,padding:"16px",border:`1px solid ${C.border}`,borderLeft:`3px solid ${s.col}` }}>
            <div style={{ fontSize:24,marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:12.5,fontWeight:700,color:C.text,marginBottom:4 }}>{s.title}</div>
            <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.55 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </SCard>
  );
}
function WhyUs() {
  return (
    <SCard title="Why Choose EFAR?" sub="Trusted by hospitals, corporations, event organisers, and individuals across Singapore" g={G.blue}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
        {[
          { icon:"✅",title:"MOH-Licensed Ambulance Operator",desc:"Fully licensed by MOH Singapore to operate private ambulances and provide pre-hospital emergency care." },
          { icon:"🎓",title:"WSQ-Accredited Training Provider",desc:"First aid and CPR courses accredited under Singapore's Workforce Skills Qualifications framework." },
          { icon:"⏱️",title:"Fast Response Times",desc:"Strategically located fleet for swift island-wide deployment, 24/7, 365 days a year." },
          { icon:"👩‍⚕️",title:"Trained Medical Professionals",desc:"Qualified EMTs, paramedics, nurses, and first aid instructors with extensive field experience." },
          { icon:"🏆",title:"Experienced Event Partner",desc:"Over a decade providing medical coverage for major sporting events, concerts, and functions." },
          { icon:"📞",title:"24/7 Hotline Support",desc:"Reach us any time via WhatsApp. Our team is always ready to assist with bookings and dispatch." },
        ].map(w=>(
          <div key={w.title} style={{ display:"flex",gap:12,background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:20,flexShrink:0,marginTop:2 }}>{w.icon}</div>
            <div>
              <div style={{ fontSize:12.5,fontWeight:700,color:C.text,marginBottom:3 }}>{w.title}</div>
              <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.55 }}>{w.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </SCard>
  );
}
function CtaStrip() {
  return (
    <div style={{ background:G.heroBg,borderRadius:14,padding:"26px 36px",marginBottom:20,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
      <div>
        <div style={{ fontSize:17,fontWeight:800,color:"#ffffff",marginBottom:4 }}>Need an ambulance or medical standby?</div>
        <div style={{ fontSize:12.5,color:"rgba(255,255,255,0.55)" }}>Available 24 hours, 7 days a week — including public holidays.</div>
      </div>
      <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
        <a href="https://wa.me/15556435278" target="_blank" rel="noreferrer"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",borderRadius:10,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",fontWeight:700,fontSize:13,textDecoration:"none" }}>
          📞 +65 6297 8000
        </a>
        <a href="mailto:admin@emergencies.com.sg"
          style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",borderRadius:10,color:"#99f6e4",fontWeight:600,fontSize:13,border:"1px solid rgba(153,246,228,0.3)",textDecoration:"none" }}>
          ✉️ Email Us
        </a>
      </div>
    </div>
  );
}
function AboutPage() {
  return (
    <>
      <div style={{ background:G.heroBg,borderRadius:16,padding:"44px 48px",marginBottom:20,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-80,right:-80,width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none" }} />
        <div style={{ fontSize:11,color:"rgba(255,255,255,0.55)",fontWeight:700,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:12 }}>Who We Are</div>
        <div style={{ fontSize:32,fontWeight:800,color:"#ffffff",lineHeight:1.2,marginBottom:12 }}>Built on <span style={{ color:"#a5b4fc" }}>Trust.</span><br />Driven by Purpose.</div>
        <div style={{ fontSize:13.5,color:"rgba(255,255,255,0.65)",maxWidth:520,lineHeight:1.8,marginBottom:22 }}>
          Founded in Singapore, Emergencies First Aid &amp; Rescue is a healthcare and training service provider
          committed to saving lives through rapid response, expert training, and operational excellence.
        </div>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          {[["Est. 2010","#a5b4fc"],["MOH Licensed","#99f6e4"],["50+ Staff","#c4b5fd"],["24/7 Operations","#fde68a"]].map(([l,col])=>(
            <span key={l} style={{ padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,color:col,background:"rgba(255,255,255,0.08)",border:`1px solid ${col}40` }}>{l}</span>
          ))}
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20 }}>
        <SCard title="🎯 Our Mission" g={G.indigo}>
          <p style={{ fontSize:13,color:C.sub,lineHeight:1.8,margin:0 }}>
            To provide rapid, reliable, and compassionate emergency medical services to the people of Singapore —
            ensuring every individual receives timely care when it matters most.
          </p>
        </SCard>
        <SCard title="🔭 Our Vision" g={G.indigoSoft}>
          <p style={{ fontSize:13,color:C.sub,lineHeight:1.8,margin:0 }}>
            To become Singapore's most trusted emergency services provider — innovating through technology and
            setting the gold standard for pre-hospital care and first aid training excellence.
          </p>
        </SCard>
      </div>
      <SCard title="🤝 Our Core Values" g={G.indigo}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
          {[
            { icon:"⚡",title:"Speed",desc:"Every second counts. We optimise for the fastest possible response.",col:C.teal },
            { icon:"🎓",title:"Excellence",desc:"MOH-accredited training and certified paramedics at every level.",col:C.indigo },
            { icon:"❤️",title:"Compassion",desc:"We treat every patient with dignity, care, and empathy.",col:C.red },
            { icon:"🔒",title:"Reliability",desc:"Operational 24/7, 365 days — rain or shine, no exceptions.",col:C.orange },
            { icon:"🔗",title:"Collaboration",desc:"Working alongside hospitals, SCDF, and community partners.",col:C.purple },
            { icon:"💡",title:"Innovation",desc:"Embracing technology to build leaner, smarter operations.",col:C.blue },
          ].map(v=>(
            <div key={v.title} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:20,marginBottom:8 }}>{v.icon}</div>
              <div style={{ fontSize:12.5,fontWeight:600,color:v.col,marginBottom:3 }}>{v.title}</div>
              <div style={{ fontSize:11.5,color:C.muted,lineHeight:1.5 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}
/* ── EFAR Chatbot ─────────────────────────────────────────────────────────── */
const BOT_CHIPS_DEFAULT = [
  { label:"Book an ambulance",    q:"How do I book an ambulance?"          },
  { label:"First Aid courses",    q:"What first aid courses do you offer?"  },
  { label:"SkillsFuture funding", q:"Is SkillsFuture funding available?"   },
  { label:"Event standby",        q:"Do you provide event medical standby?" },
  { label:"Certificate validity", q:"How long is my certificate valid?"    },
  { label:"Contact details",      q:"How can I contact EFAR?"              },
];
const BOT_CHIPS_FOLLOW = [
  { label:"Book an ambulance", q:"How do I book an ambulance?" },
  { label:"Contact details",   q:"How can I contact EFAR?"    },
  { label:"Other question",    q:"I have another question"    },
];

function getBotReply(raw) {
  const t = raw.toLowerCase();

  // ── Greetings ──────────────────────────────────────────────────────────────
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/.test(t))
    return { msg:"Hello there! Welcome to EFAR — Emergencies First Aid & Rescue 👋\n\nI'm your virtual assistant. I can help with ambulance bookings, first aid courses, event medical coverage, accreditation queries, and much more.\n\nHow may I assist you today?", chips:BOT_CHIPS_DEFAULT };

  // ── Course comparison: BCLS vs HeartSaver ──────────────────────────────────
  if (/\b(difference|compare|vs|versus|bcls|heartsaver|which course|which one|better)\b/.test(t) && /\b(bcls|heartsaver|basic cardiac|cpr)\b/.test(t))
    return { msg:"Great question! Here's how BCLS + AED and HeartSaver CPR + AED compare:\n\n🔵 BCLS + AED (Basic Cardiac Life Support)\n• Designed for healthcare & allied health professionals\n• Covers adult, child & infant CPR\n• 2-rescuer CPR techniques included\n• Mandatory for many clinical & nursing roles\n• Duration: ~8 hours\n\n🟣 HeartSaver CPR + AED\n• Designed for the general public & lay rescuers\n• Covers adult CPR & AED use\n• Ideal for workplace first responders\n• Duration: ~4 hours\n\nIf you're in a healthcare setting, BCLS is recommended. For general workplace compliance, HeartSaver is a great fit. Would you like help choosing the right course for your needs?", chips:[{ label:"SkillsFuture funding", q:"Is SkillsFuture funding available?" },{ label:"Register for a course", q:"How do I register for a course?" },{ label:"Course fees", q:"How much do the courses cost?" }] };

  // ── Course comparison: Standard FA vs Occupational FA ─────────────────────
  if (/\b(difference|compare|standard|occupational|mom|workplace|which)\b/.test(t) && /\b(first aid|fa course)\b/.test(t))
    return { msg:"Here's a clear comparison between our two most popular first aid courses:\n\n📗 Standard First Aid\n• Suitable for general public & community use\n• Covers wound care, burns, fractures, CPR, choking\n• SRFAC-accredited\n• Duration: ~2 days\n• Valid for 2 years\n\n📘 Occupational First Aid (OFA)\n• MOM-recognised — fulfils Workplace Safety & Health Act requirements\n• Required for designated First Aiders in workplaces with >25 employees\n• More in-depth workplace-specific scenarios\n• Duration: ~3 days\n• Valid for 2 years\n\nIf your company needs to comply with MOM regulations, OFA is the course to take. Shall I help you find out if SkillsFuture funding applies?", chips:[{ label:"SkillsFuture for OFA", q:"Is SkillsFuture available for Occupational First Aid?" },{ label:"Group training", q:"Can you train our whole team on-site?" },{ label:"Register now", q:"How do I register for a course?" }] };

  // ── MOM / workplace compliance ────────────────────────────────────────────
  if (/\b(mom|ministry of manpower|wsh|workplace safety|compliance|mandatory|legal|require)\b/.test(t))
    return { msg:"Under Singapore's Workplace Safety & Health (WSH) Act, companies with more than 25 employees are required to have a certified First Aider on-site at all times during working hours.\n\nOur Occupational First Aid (OFA) course is fully MOM-recognised and fulfils this legal requirement.\n\nKey details:\n• Duration: ~3 days (classroom + practical)\n• Certificate valid for 2 years\n• SSG-funded — significant subsidies available for eligible S'poreans & PRs\n• Can be conducted at your premises for groups\n\nWould you like us to arrange a corporate group training session for your team?", chips:[{ label:"On-site group training", q:"Can you train our whole team on-site?" },{ label:"Funding available", q:"Is SkillsFuture funding available?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── Accreditation ─────────────────────────────────────────────────────────
  if (/\b(accredit|certifi|srfac|recognised|moh|ssg|wsq|quality|standard|official)\b/.test(t))
    return { msg:"EFAR's training programmes carry the following accreditations:\n\n✅ SRFAC (Singapore Resuscitation & First Aid Council) — for Standard, Child & HeartSaver courses\n✅ MOM-recognised — for Occupational First Aid, fulfilling WSH Act requirements\n✅ SSG (SkillsFuture Singapore) — approved training provider, enabling course subsidies\n✅ BCLS + AED certified by SRFAC\n\nAll our instructors are certified professionals with active emergency services backgrounds, ensuring the highest standard of practical training.\n\nIs there a specific accreditation or compliance requirement you'd like us to address?", chips:[{ label:"MOM compliance", q:"What course do I need for MOM compliance?" },{ label:"Course list", q:"What first aid courses do you offer?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── International recognition ─────────────────────────────────────────────
  if (/\b(international|overseas|abroad|global|recognised outside|other countr|valid in)\b/.test(t))
    return { msg:"Our certificates are recognised within Singapore under SRFAC and MOM frameworks. Internationally, recognition varies by country and employer.\n\n• SRFAC-accredited certificates are widely acknowledged across Singapore's public and private sectors\n• For international use (e.g. if you're working abroad), we recommend checking with the specific employer or regulatory body in the destination country\n• BCLS + AED certification from SRFAC is generally recognised across many healthcare institutions in the region\n\nIf you have a specific country or employer in mind, feel free to share more details and we'll do our best to advise you further!", chips:[{ label:"View courses", q:"What first aid courses do you offer?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── On-site / group / corporate training ──────────────────────────────────
  if (/\b(on.?site|on site|our office|our premises|our location|come to us|group|team|bulk|corporate train)\b/.test(t))
    return { msg:"Absolutely — we offer on-site training at your premises! Here's what you need to know:\n\n🏢 On-Site Corporate Training\n• We bring our certified instructors directly to your workplace\n• Suitable for groups of 10 or more participants\n• All course materials and equipment are provided\n• Flexible scheduling including evenings & weekends\n• Available for all our courses: OFA, Standard FA, BCLS, HeartSaver, and more\n\n💰 Group Pricing\nGroup discounts are available and SSG/SkillsFuture subsidies still apply per participant.\n\nTo arrange an on-site session, please contact:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg\n\nOur team will customise a training schedule that works best for your organisation.", chips:[{ label:"Funding for groups", q:"Is SkillsFuture funding available for group training?" },{ label:"MOM compliance", q:"What course satisfies MOM requirements?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── Minimum group size ────────────────────────────────────────────────────
  if (/\b(minimum|min|how many|group size|small group|individual|solo|one person|alone)\b/.test(t))
    return { msg:"Here's our guidance on group and individual enrolment:\n\n👤 Individual / Public Classes\n• You're welcome to join our scheduled public classes as an individual\n• Classes run regularly throughout the month\n• Simply register online or contact us to confirm the next available date\n\n👥 Private / On-Site Group Sessions\n• Recommended minimum: 10 participants for on-site training\n• Smaller groups can join our public class schedule\n• Larger groups (20+) qualify for dedicated scheduling & enhanced group rates\n\nFor the next available public class date or to enquire about group bookings:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg", chips:[{ label:"On-site training", q:"Can you conduct training at our premises?" },{ label:"Register now", q:"How do I register for a course?" }] };

  // ── Registration process ──────────────────────────────────────────────────
  if (/\b(register|sign up|enrol|enroll|how to join|apply|book a course|start)\b/.test(t))
    return { msg:"Registering for a course with us is straightforward! Here's how:\n\n📝 Step-by-Step Registration\n1. Contact us via phone or email to enquire about available dates\n2. Our team will advise on the most suitable course for your needs\n3. Confirm your preferred date and provide participant details\n4. Receive a booking confirmation with venue and preparation instructions\n5. Attend the course and receive your certificate upon completion!\n\n📞 +65 6993 3993\n📧 info@emergencies.com.sg\n\n💡 Tip: If you're eligible for SkillsFuture Credit, let our team know during registration — we'll guide you through the claims process so you pay less out of pocket.", chips:[{ label:"SkillsFuture claims", q:"How do I claim SkillsFuture credit?" },{ label:"Course options", q:"What first aid courses do you offer?" },{ label:"Course fees", q:"How much do the courses cost?" }] };

  // ── SkillsFuture claims process ───────────────────────────────────────────
  if (/\b(claim|how to use|use skillfuture|apply funding|sfc|credit balance|myskillsfuture)\b/.test(t))
    return { msg:"Here's how to use your SkillsFuture Credit for our courses:\n\n🪙 SkillsFuture Credit Claims Process\n1. Log in to MySkillsFuture (www.myskillsfuture.gov.sg) with your Singpass\n2. Search for your chosen EFAR course\n3. Select your preferred session date\n4. Apply your SkillsFuture Credit balance during checkout\n5. Pay the remaining balance (if any) and complete your booking\n\n💰 Subsidy Rates\n• Singaporeans & PRs: Up to 50–70% SSG course fee subsidy\n• SkillsFuture Credit can be stacked on top of the subsidy\n\nOur team is happy to assist if you encounter any issues with the claims process. Just call us at +65 6993 3993 or email info@emergencies.com.sg.", chips:[{ label:"Eligible courses", q:"Which courses are SkillsFuture eligible?" },{ label:"Register now", q:"How do I register for a course?" }] };

  // ── Which courses are SkillsFuture eligible ───────────────────────────────
  if (/\b(which course|what course|eligible course|skillfuture for|funded course)\b/.test(t))
    return { msg:"The following EFAR courses are eligible for SSG funding and SkillsFuture Credit:\n\n✅ Occupational First Aid (MOM-recognised)\n✅ Standard First Aid\n✅ BCLS + AED\n✅ HeartSaver CPR + AED\n✅ Child First Aid\n\nEligibility criteria:\n• Singapore Citizens or Permanent Residents\n• Aged 21 and above (for SkillsFuture Credit)\n• Not currently in full-time education\n\nFor Instructor Training courses, please contact us directly for funding availability.\n\n📞 +65 6993 3993\n📧 info@emergencies.com.sg", chips:[{ label:"How to claim", q:"How do I claim SkillsFuture credit?" },{ label:"Register now", q:"How do I register for a course?" }] };

  // ── Ambulance equipment / capabilities ────────────────────────────────────
  if (/\b(ambulance equip|what does your ambulance|carry|stretcher|oxygen|paramedic level|als|bls|advanced life)\b/.test(t))
    return { msg:"Our ambulances are equipped to handle a wide range of medical emergencies:\n\n🚑 Standard Equipment on All EFAR Ambulances\n• Cardiac monitor & defibrillator (AED + manual)\n• Oxygen delivery systems (non-rebreather, BVM)\n• Suction units\n• Spinal immobilisation (cervical collars, backboards)\n• Stretcher & stair chair\n• IV access equipment\n• Wound care & trauma supplies\n• Medications for emergency stabilisation\n\n👨‍⚕️ Our Crew\nEvery ambulance is crewed by certified paramedics trained in pre-hospital emergency care, ensuring patients receive professional attention from the moment we arrive.\n\nFor specific capability enquiries (e.g. for high-risk patient transfers), please call us at +65 6560 6060.", chips:[{ label:"Book an ambulance", q:"How do I book an ambulance?" },{ label:"Response time", q:"What is your ambulance response time?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── Response time ─────────────────────────────────────────────────────────
  if (/\b(response time|how fast|how long|arrive|eta|wait|how quickly|speed)\b/.test(t))
    return { msg:"We understand that every second matters in an emergency.\n\n⏱️ Our Response Commitment\n• We dispatch immediately upon receiving a confirmed booking\n• Response times vary depending on traffic conditions and your location\n• Our fleet operates island-wide across Singapore, 24/7\n\nFor pre-planned transfers and event standby, our crew will arrive at the agreed time — we take punctuality very seriously.\n\nFor the most urgent emergencies, we always recommend calling SCDF (995) first for the fastest government response, and then calling us at +65 6560 6060 for non-emergency or inter-hospital transfers.\n\nIs there anything else I can help clarify?", chips:[{ label:"Book an ambulance", q:"How do I book an ambulance?" },{ label:"EFAR vs SCDF", q:"What is the difference between EFAR and SCDF ambulance?" }] };

  // ── Difference from SCDF ──────────────────────────────────────────────────
  if (/\b(scdf|995|government ambulance|singapore civil defence|difference between|private|public ambulance)\b/.test(t))
    return { msg:"Great question — here's a clear breakdown:\n\n🔴 SCDF (995) — Government Emergency Ambulance\n• For life-threatening emergencies requiring immediate response\n• Free of charge at point of call\n• Dispatched by the Singapore Civil Defence Force\n• Goes to restructured public hospitals (SGH, NUH, TTSH, etc.)\n\n🔵 EFAR — Private Ambulance Service\n• For non-emergency & inter-facility transfers\n• Scheduled or on-demand patient transport\n• Transfer to private hospitals (Mount Elizabeth, Gleneagles, Farrer Park, etc.)\n• Event & venue medical standby\n• Patients or families may choose destination hospital\n• Fees apply (subsidised rates available for insured patients)\n\n💡 Our recommendation: Always call 995 first for life-threatening emergencies. Call us at +65 6560 6060 for planned transfers, post-discharge transport, or event coverage.", chips:[{ label:"Book a transfer", q:"How do I book an ambulance?" },{ label:"Event standby", q:"Do you provide event medical standby?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── Payment / insurance ───────────────────────────────────────────────────
  if (/\b(payment|pay|insurance|medishield|integrated shield|claimable|invoice|receipt|cash|credit card|paynow)\b/.test(t))
    return { msg:"We accept multiple payment methods for your convenience:\n\n💳 Payment Options\n• Cash\n• Credit / Debit card\n• PayNow / PayLah!\n• Bank transfer / invoice (for corporate clients)\n\n🏥 Insurance\n• Our ambulance service fees may be claimable under your Integrated Shield Plan or private health insurance, depending on your insurer and policy\n• We can provide an official receipt / medical invoice for insurance claims\n• Medisave cannot be used for ambulance transport fees\n\nFor corporate billing arrangements or insurance pre-authorisation, please contact:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg", chips:[{ label:"Book an ambulance", q:"How do I book an ambulance?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── Instructor course ─────────────────────────────────────────────────────
  if (/\b(instructor|teach|trainer|become a|train the trainer|facilitator)\b/.test(t))
    return { msg:"Interested in becoming a certified First Aid Instructor? We offer instructor training programmes for qualified candidates.\n\n🎓 Instructor Training Requirements\n• Must hold a valid First Aid certificate (Standard or OFA)\n• Minimum 1–2 years of practical first aid experience recommended\n• Must pass both theoretical and practical assessments\n\n📋 What You'll Learn\n• Lesson planning and facilitation techniques\n• Practical demonstration & coaching skills\n• Assessment & certification procedures\n• Managing diverse training groups\n\nInstructor candidates are assessed and certified under SRFAC standards.\n\nFor eligibility details and upcoming instructor course dates, please contact:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg", chips:[{ label:"Course fees", q:"How much do the instructor courses cost?" },{ label:"Accreditation info", q:"What accreditations does EFAR hold?" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── What to do at an emergency at an event ────────────────────────────────
  if (/\b(emergency at event|someone collapse|patient at event|what to do|procedure|protocol|collapse)\b/.test(t))
    return { msg:"Here's the recommended emergency response procedure at an event with EFAR standby:\n\n🚨 Immediate Steps\n1. Stay calm and call for help — alert nearby staff or the event marshal\n2. Call our standby team immediately (we'll have a dedicated on-site number)\n3. Do NOT move the patient unless they're in immediate danger\n4. If trained, begin CPR if the patient is unresponsive and not breathing normally\n5. Use the nearest AED if available — our team will guide bystanders\n\n🚑 What Our Standby Team Will Do\n• Arrive at the scene within minutes\n• Perform primary & secondary patient assessment\n• Administer emergency treatment on-site\n• Coordinate hospital transport if required\n• Document the incident for official records\n\nFor life-threatening situations, 995 will always be activated in parallel.", chips:[{ label:"Book event standby", q:"How do I book event medical standby?" },{ label:"Our ambulance equipment", q:"What equipment does your ambulance carry?" }] };

  // ── Child first aid / paediatric ──────────────────────────────────────────
  if (/\b(child|paediatric|pediatric|baby|infant|kid|toddler|choking child|child cpr)\b/.test(t))
    return { msg:"We offer a dedicated Child First Aid course specifically designed for caregivers, parents, teachers, and childcare workers.\n\n👶 Child First Aid Course\n• Covers CPR for infants (under 1 year) and children (1–8 years)\n• Choking management for children & infants\n• Febrile seizures & managing high fever\n• Accidental poisoning & allergic reactions\n• Burns, wounds & fracture management for children\n• SRFAC-accredited, certificate valid for 2 years\n\nThis course is highly recommended for:\n• Parents and grandparents\n• Childcare educators & teachers\n• Domestic helpers caring for young children\n\nSSG funding and SkillsFuture Credit are applicable for eligible participants.\n\n📞 +65 6993 3993 to register!", chips:[{ label:"Funding available", q:"Is SkillsFuture funding available?" },{ label:"Register now", q:"How do I register for a course?" },{ label:"All courses", q:"What first aid courses do you offer?" }] };

  // ── AED ───────────────────────────────────────────────────────────────────
  if (/\b(aed|defibrillat|automated external|shock|heart rhythm|vf|ventricular)\b/.test(t))
    return { msg:"AED (Automated External Defibrillator) training is integrated into several of our courses:\n\n⚡ AED Training is included in:\n• BCLS + AED — for healthcare professionals\n• HeartSaver CPR + AED — for the general public\n• Standard First Aid — AED basics included\n\n🔋 About AED Use\n• AEDs are designed to be used by trained lay rescuers — they give voice instructions\n• Using an AED as early as possible significantly increases survival rates for cardiac arrest\n• AEDs are now widely installed in MRT stations, malls, schools, and offices across Singapore\n\nWe also supply AED devices and provide maintenance services for organisations. Would you like more information on AED procurement?", chips:[{ label:"Buy an AED", q:"Do you sell AED machines?" },{ label:"HeartSaver course", q:"Tell me about the HeartSaver CPR course" },{ label:"BCLS course", q:"Tell me about the BCLS course" }] };

  // ── CPR refresh frequency ─────────────────────────────────────────────────
  if (/\b(how often|frequency|every|when to renew|renew cpr|refresh cpr|cpr expire)\b/.test(t))
    return { msg:"It's great that you're thinking about keeping your skills current!\n\n🔄 Recommended Renewal Frequency\n• First Aid certificates (Standard, OFA, Child): Every 2 years — this is also when your certificate expires\n• CPR/AED (BCLS, HeartSaver): Every 2 years for recertification\n• Some healthcare employers require annual CPR competency checks — check with your employer if unsure\n\n💡 Why Renew?\nGuidelines for CPR and first aid are periodically updated by international bodies (e.g. AHA, ILCOR). Refresher courses ensure you're practising the latest evidence-based techniques.\n\nOur refresher courses are shorter in duration than the full courses and are available at subsidised rates. Contact us to find out the next available refresher date!", chips:[{ label:"Book a refresher", q:"How do I register for a course?" },{ label:"SkillsFuture funding", q:"Is SkillsFuture funding available?" }] };

  // ── Does EFAR sell AEDs ───────────────────────────────────────────────────
  if (/\b(sell aed|buy aed|purchase aed|aed price|aed unit|aed machine|procure aed)\b/.test(t))
    return { msg:"Yes — we supply AED devices for organisations and individuals!\n\n⚡ AED Supply & Services\n• Supply of AED units from trusted brands\n• Installation and placement advisory\n• Ongoing maintenance & electrode pad replacement\n• Staff training on AED operation (can be bundled with CPR courses)\n\nHaving an AED on your premises significantly improves survival outcomes in a cardiac emergency. Many offices, schools, and commercial buildings are now equipping themselves.\n\nFor pricing, availability, and maintenance packages:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg", chips:[{ label:"CPR+AED training", q:"Tell me about the HeartSaver CPR course" },{ label:"Contact us", q:"How can I contact EFAR?" }] };

  // ── Ambulance booking ─────────────────────────────────────────────────────
  if (/\b(ambulance|book|dispatch|emergency transport|transfer|inter.?hospital|patient transport)\b/.test(t))
    return { msg:"We provide 24/7 ambulance services islandwide across Singapore, covering:\n\n• Emergency medical transport\n• Inter-hospital & inter-facility patient transfers\n• Post-discharge transport to home or rehabilitation centre\n• Event & venue medical standby\n\nTo book, please contact us:\n🚑 24/7 Hotline: +65 6560 6060\n📧 Email: info@emergencies.com.sg\n\n💡 For planned transfers, booking in advance is recommended to ensure crew availability.", chips:BOT_CHIPS_FOLLOW };

  // ── General courses overview ──────────────────────────────────────────────
  if (/\b(first aid|course|training|class|learn|cpr|instructor|what do you offer)\b/.test(t))
    return { msg:"We offer a wide range of SRFAC & MOM-accredited first aid courses:\n\n• Standard First Aid (~2 days)\n• Child First Aid (~1 day)\n• Occupational First Aid — MOM-recognised (~3 days)\n• BCLS + AED — for healthcare professionals (~8 hrs)\n• HeartSaver CPR + AED — for general public (~4 hrs)\n• Instructor Training\n\nAll courses are conducted by certified instructors with active emergency services backgrounds. Certificates are valid for 2 years.\n\nSSG funding and SkillsFuture Credit are available for eligible participants.", chips:[{ label:"Compare courses", q:"What is the difference between Standard and Occupational First Aid?" },{ label:"SkillsFuture funding", q:"Is SkillsFuture funding available?" },{ label:"Register now", q:"How do I register for a course?" }] };

  // ── SkillsFuture (general) ────────────────────────────────────────────────
  if (/\b(skillfuture|funding|subsidy|grant|ssg|eligible|citizen|pr)\b/.test(t))
    return { msg:"Great news — SkillsFuture Credit and SSG funding are available!\n\n• Eligible Singaporeans & PRs may enjoy 50–70% course fee subsidies\n• SkillsFuture Credit can offset remaining payable fees\n• Most of our courses are SSG-approved\n\nFor the exact subsidy applicable to your course, please contact:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg\n\nOur team will walk you through the entire registration and funding process.", chips:[{ label:"How to claim SFC", q:"How do I claim SkillsFuture credit?" },{ label:"Eligible courses", q:"Which courses are SkillsFuture eligible?" }] };

  // ── Certificate validity ──────────────────────────────────────────────────
  if (/\b(certif|valid|expir|renew|refresh|how long|2 year)\b/.test(t))
    return { msg:"First aid certifications are valid for 2 years from the date of issue.\n\nAs your certification approaches expiry, we strongly recommend enrolling in a refresher course to:\n• Renew your certification for another 2 years\n• Refresh your skills with updated guidelines\n• Stay compliant with MOM and employer requirements\n\nRefresher courses are shorter than full courses and are still eligible for SSG subsidies.\n\nWould you like to know more about our refresher programmes?", chips:[{ label:"Book a refresher", q:"How do I register for a course?" },{ label:"How often to renew CPR", q:"How often should I renew my CPR certification?" }] };

  // ── Event standby ─────────────────────────────────────────────────────────
  if (/\b(event|standby|coverage|concert|marathon|sports|wedding|festival|function|gala)\b/.test(t))
    return { msg:"We provide professional medical standby for events of all sizes:\n\n• Corporate functions, conferences & seminars\n• Sports events, marathons & obstacle races\n• Concerts, festivals & large-scale gatherings\n• School sports days & community events\n• Private functions (weddings, birthday parties)\n\nOur standby packages typically include:\n✅ Certified paramedics on-site\n✅ Fully equipped ambulance on standby\n✅ First aid station setup\n✅ Incident documentation & reporting\n\nFor a tailored quote, please reach us at:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg", chips:[{ label:"Emergency protocol at events", q:"What is the emergency procedure at an event?" },{ label:"Our ambulance equipment", q:"What equipment does your ambulance carry?" }] };

  // ── Corporate ─────────────────────────────────────────────────────────────
  if (/\b(corporate|company|organisation|organization|workplace|business|employee|staff)\b/.test(t))
    return { msg:"We offer comprehensive corporate medical solutions tailored to your organisation:\n\n• On-site first aid & CPR training for employees\n• MOM-compliant Occupational First Aid training\n• Corporate medical standby for workplace events\n• Medical equipment supply & AED procurement\n• Annual refresher programmes\n\nWe work with organisations of all sizes — from SMEs to large corporations. Group training at your premises is available for 10+ participants.\n\nContact us at +65 6993 3993 for a customised corporate package and group pricing.", chips:[{ label:"On-site training", q:"Can you conduct training at our premises?" },{ label:"MOM compliance", q:"What course satisfies MOM requirements?" }] };

  // ── Pricing ───────────────────────────────────────────────────────────────
  if (/\b(price|cost|fee|charge|rate|how much|expensive|affordable)\b/.test(t))
    return { msg:"Course and service fees vary based on type, duration, and group size.\n\n💰 Good news on costs:\n• SSG subsidies of 50–70% are available for eligible Singaporeans & PRs\n• SkillsFuture Credit can further offset payable fees\n• Group discounts are available for corporate bookings\n\nFor a detailed and personalised price list:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg\n\nOur team will provide a no-obligation quote tailored to your requirements.", chips:[{ label:"SkillsFuture funding", q:"Is SkillsFuture funding available?" },{ label:"Group training", q:"Do you offer group training discounts?" }] };

  // ── Contact ───────────────────────────────────────────────────────────────
  if (/\b(contact|phone|call|email|reach|hotline|number|get in touch|whatsapp)\b/.test(t))
    return { msg:"Here are all the ways you can reach us:\n\n🚑 Ambulance / Emergency (24/7): +65 6560 6060\n📞 General Enquiries: +65 6993 3993\n📧 Email: info@emergencies.com.sg\n🌐 Website: emergencies.com.sg\n\nOffice hours:\n• Mon–Fri: 8:00am – 6:00pm\n• Saturday: 8:00am – 1:00pm\n• Emergency dispatch: 24/7, 365 days", chips:BOT_CHIPS_FOLLOW };

  // ── Hours ─────────────────────────────────────────────────────────────────
  if (/\b(hour|open|timing|operating|available|close|weekend|saturday|sunday|public holiday)\b/.test(t))
    return { msg:"Our operating hours are:\n\n🚑 Emergency Dispatch: 24 hours, 7 days, 365 days a year\n🏢 Monday – Friday: 8:00am – 6:00pm\n📅 Saturday: 8:00am – 1:00pm\n🔒 Sunday & Public Holidays: Emergency dispatch only\n\nIs there anything else you'd like to know?", chips:BOT_CHIPS_FOLLOW };

  // ── Location ──────────────────────────────────────────────────────────────
  if (/\b(location|address|where|office|headquarter|find you|based|situated)\b/.test(t))
    return { msg:"EFAR is based in Singapore and our services cover the entire island — no area is too far!\n\nFor our exact office address or to arrange a visit, please contact:\n📞 +65 6993 3993\n📧 info@emergencies.com.sg\n\nWe'll gladly provide directions and arrange an appointment.", chips:BOT_CHIPS_FOLLOW };

  // ── About EFAR ────────────────────────────────────────────────────────────
  if (/\b(about|who are|company|history|founded|background|established|when was)\b/.test(t))
    return { msg:"EFAR (Emergencies First Aid & Rescue) was founded in 2002 by James Teo and Doris Ching, with ambulance operations beginning in 2019.\n\nWe are one of Singapore's trusted private emergency medical services providers, offering:\n\n• 24/7 ambulance services island-wide\n• SRFAC & MOM-accredited first aid & CPR training\n• Medical equipment supply & AED procurement\n\nOur mission: ensuring every individual receives timely, expert care when it matters most.", chips:BOT_CHIPS_DEFAULT };

  // ── Equipment supply ──────────────────────────────────────────────────────
  if (/\b(equipment|supply|kit|glove|splint|product|buy|purchase)\b/.test(t))
    return { msg:"We supply a comprehensive range of medical equipment and first aid products:\n\n• First aid kits (various sizes & industry-specific configurations)\n• Splints & immobilisation devices\n• Gloves, masks & PPE\n• AED devices and electrode replacement pads\n• Stretchers and patient handling equipment\n\nFor purchasing enquiries and bulk orders:\n📧 info@emergencies.com.sg\n📞 +65 6993 3993", chips:BOT_CHIPS_FOLLOW };

  // ── Thanks / goodbye ──────────────────────────────────────────────────────
  if (/\b(thank|thanks|great|awesome|perfect|wonderful|helpful|bye|goodbye|appreciate)\b/.test(t))
    return { msg:"Thank you so much for reaching out to EFAR! It was truly a pleasure assisting you today. 😊\n\nShould you ever have more questions — whether about our courses, ambulance services, or anything else — please don't hesitate to get back in touch.\n\nWishing you a wonderful day ahead — take care!", chips:BOT_CHIPS_DEFAULT };

  // ── Fallback follow-up ────────────────────────────────────────────────────
  if (/\b(another|more|anything|other|else|help|question)\b/.test(t))
    return { msg:"Of course! I'd be happy to help with any other questions. Please go ahead — or choose a topic below.", chips:BOT_CHIPS_DEFAULT };

  return null;
}

const EMPLOYEES = [
  { name:"Sarah Tan",   role:"Senior Paramedic",     grad:"linear-gradient(135deg,#0d9488,#16a34a)", light:"#d1fae5", accent:"#0d9488" },
  { name:"Marcus Wong", role:"Training Coordinator",  grad:"linear-gradient(135deg,#7c3aed,#6366f1)", light:"#ede9fe", accent:"#7c3aed" },
  { name:"Priya Nair",  role:"Client Relations Exec", grad:"linear-gradient(135deg,#f59e0b,#ef4444)", light:"#fef3c7", accent:"#d97706" },
];

function EFARChatbot() {
  const [open, setOpen]           = useState(false);
  const [msgs, setMsgs]           = useState([{ role:"bot", text:"Hello! Welcome to EFAR — Emergencies First Aid & Rescue 👋\n\nI'm your virtual assistant and I'm here to help 24/7. Ask me anything about our services, or choose a topic below to get started!", chips:BOT_CHIPS_DEFAULT }]);
  const [input, setInput]         = useState("");
  const [empLocked, setEmpLocked] = useState(false);
  const [typing, setTyping]       = useState(false);
  const [activeEmp, setActiveEmp] = useState(null);
  const [unread, setUnread]       = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing]);
  useEffect(() => { if (open) setUnread(0); }, [open]);

  function connectEmployee(userQuestion) {
    const emp = EMPLOYEES[userQuestion.length % EMPLOYEES.length];
    setActiveEmp(emp);
    setEmpLocked(true);
    setMsgs(m => [...m, { role:"redirecting" }]);
    setTimeout(() => {
      setMsgs(m => m.filter(x => x.role !== "redirecting"));
      setTyping(true);
    }, 3000);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role:"employee", employee:emp, text:`Hi there! My name is ${emp.name} and I'm EFAR's ${emp.role}. It's so wonderful to connect with you today! 😊\n\nI've been briefed on your enquiry and I'm personally here to make sure you receive the very best assistance. Please give me just a moment while I look into this for you...`, chips:[] }]);
    }, 6500);
    setTimeout(() => {
      setEmpLocked(false);
      setMsgs(m => [...m, { role:"employee", employee:emp, text:`Thank you so much for your patience — I truly appreciate it! 🙏\n\nFor your specific question, the most accurate and personalised guidance would come from a brief direct conversation with our team. I'd personally recommend:\n\n📞 Call us: +65 6993 3993\n(Mon–Fri 8:00am–6:00pm, Sat 8:00am–1:00pm)\n\n📧 Email: info@emergencies.com.sg\n(We respond within 1 business day)\n\nIf you'd prefer, I can also ensure a senior team member follows up with you personally at a convenient time — just say the word! 😊\n\nIs there anything else I can help clarify for you right now?`, chips:[{ label:"Yes, another question", q:"I have another question" },{ label:"That's all, thank you", q:"thank you" }] }]);
    }, 9800);
  }

  function send(text) {
    const clean = text.trim();
    if (!clean || empLocked) return;
    const reply = getBotReply(clean);
    if (reply) {
      setMsgs(m => [...m, { role:"user", text:clean }, { role:"bot", text:reply.msg, chips:reply.chips }]);
      if (!open) setUnread(u => u + 1);
    } else {
      setMsgs(m => [...m,
        { role:"user", text:clean },
        { role:"bot", text:"Thank you for your question! That's quite a specialised matter and I want to make sure you receive the most accurate guidance possible.\n\nPlease hold on while I connect you with one of our wonderful team members right away. 🙏", chips:[] },
      ]);
      connectEmployee(clean);
    }
    setInput("");
  }

  const btnActive = !empLocked && input.trim().length > 0;
  const PlusIcon = ({w=14}) => <svg width={w} height={w} viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>;

  return (
    <>
      <style>{`
        @keyframes efar-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
        @keyframes efar-spin{to{transform:rotate(360deg)}}
        @keyframes efar-pop{from{opacity:0;transform:scale(0.9) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
      `}</style>

      {/* ── Popup window ── */}
      {open && (
        <div style={{ position:"fixed",bottom:90,right:24,width:370,height:560,borderRadius:18,overflow:"hidden",boxShadow:"0 16px 56px rgba(0,0,0,0.22)",zIndex:9998,display:"flex",flexDirection:"column",animation:"efar-pop 0.22s ease-out" }}>

          {/* Header */}
          <div style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)",padding:"13px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
            <div style={{ width:38,height:38,borderRadius:"50%",background: activeEmp ? activeEmp.grad : "rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:activeEmp?"0 2px 8px rgba(0,0,0,0.2)":"none" }}>
              <PlusIcon w={15} />
            </div>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontSize:13.5,fontWeight:700,color:"#fff",lineHeight:1.3 }}>{activeEmp ? activeEmp.name : "EFAR Assistant"}</div>
              <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.75)",display:"flex",alignItems:"center",gap:5,marginTop:1 }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ade80",flexShrink:0 }} />
                {activeEmp ? `${activeEmp.role} · EFAR` : "Online · Replies instantly"}
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{ background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"50%",width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex:1,overflowY:"auto",padding:"14px 12px",display:"flex",flexDirection:"column",gap:10,background:"#f5f5ff" }}>
            {msgs.map((m, i) => {
              if (m.role === "redirecting") return (
                <div key={i} style={{ display:"flex",alignItems:"center",gap:9,background:"#fff",border:"1.5px solid #e0e7ff",borderRadius:12,padding:"11px 14px",alignSelf:"flex-start",boxShadow:"0 1px 6px rgba(99,102,241,0.08)" }}>
                  <div style={{ width:16,height:16,border:"2.5px solid #6366f1",borderTopColor:"transparent",borderRadius:"50%",animation:"efar-spin 0.75s linear infinite",flexShrink:0 }} />
                  <span style={{ fontSize:13,color:"#6366f1",fontWeight:600 }}>Redirecting to employee...</span>
                </div>
              );
              if (m.role === "employee") return (
                <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"flex-start",gap:5 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <div style={{ width:32,height:32,borderRadius:"50%",background:m.employee.grad,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,0.14)" }}>
                      <PlusIcon w={12} />
                    </div>
                    <div>
                      <div style={{ fontSize:12,fontWeight:700,color:"#111827" }}>{m.employee.name}</div>
                      <div style={{ fontSize:10,color:"#9ca3af" }}>{m.employee.role} · EFAR</div>
                    </div>
                  </div>
                  <div style={{ marginLeft:40,background:"#fff",border:`1.5px solid ${m.employee.light}`,borderRadius:"2px 14px 14px 14px",padding:"10px 13px",maxWidth:"85%",fontSize:13,lineHeight:1.65,color:"#374151",whiteSpace:"pre-line",boxShadow:"0 1px 5px rgba(0,0,0,0.05)" }}>
                    {m.text}
                  </div>
                  {m.chips && m.chips.length > 0 && (
                    <div style={{ display:"flex",flexWrap:"wrap",gap:5,paddingLeft:40 }}>
                      {m.chips.map(c=>(
                        <button key={c.label} onClick={()=>send(c.q)} style={{ padding:"4px 12px",borderRadius:20,border:`1.5px solid ${m.employee.accent}`,background:"#fff",color:m.employee.accent,fontSize:11.5,fontWeight:600,cursor:"pointer" }}>{c.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
              if (m.role === "user") return (
                <div key={i} style={{ display:"flex",justifyContent:"flex-end" }}>
                  <div style={{ background:"linear-gradient(135deg,#6366f1,#7c3aed)",color:"#fff",borderRadius:"14px 14px 2px 14px",padding:"9px 13px",maxWidth:"76%",fontSize:13,lineHeight:1.55 }}>{m.text}</div>
                </div>
              );
              return (
                <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"flex-start",gap:6 }}>
                  <div style={{ display:"flex",alignItems:"flex-start",gap:8 }}>
                    <div style={{ width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                      <PlusIcon w={10} />
                    </div>
                    <div style={{ background:"#fff",border:"1px solid #e0e7ff",borderRadius:"2px 14px 14px 14px",padding:"10px 13px",maxWidth:"82%",fontSize:13,lineHeight:1.65,color:"#374151",whiteSpace:"pre-line",boxShadow:"0 1px 4px rgba(99,102,241,0.07)" }}>{m.text}</div>
                  </div>
                  {m.chips && m.chips.length > 0 && (
                    <div style={{ display:"flex",flexWrap:"wrap",gap:5,paddingLeft:36 }}>
                      {m.chips.map(c=>(
                        <button key={c.label} onClick={()=>send(c.q)} style={{ padding:"4px 12px",borderRadius:20,border:"1.5px solid #6366f1",background:"#fff",color:"#6366f1",fontSize:11.5,fontWeight:600,cursor:"pointer" }}>{c.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {typing && activeEmp && (
              <div style={{ display:"flex",alignItems:"flex-start",gap:8 }}>
                <div style={{ width:28,height:28,borderRadius:"50%",background:activeEmp.grad,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                  <PlusIcon w={10} />
                </div>
                <div style={{ background:"#fff",border:"1px solid #e0e7ff",borderRadius:"2px 14px 14px 14px",padding:"11px 14px",display:"flex",gap:4,alignItems:"center" }}>
                  {[0,200,400].map(d=>(
                    <span key={d} style={{ width:7,height:7,borderRadius:"50%",background:"#9ca3af",display:"inline-block",animation:`efar-bounce 1.2s ease-in-out ${d}ms infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding:"10px 12px",borderTop:"1px solid #e0e7ff",background:"#fff",display:"flex",gap:8,alignItems:"center",flexShrink:0 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey) send(input); }}
              placeholder={empLocked ? "Connecting you to an agent…" : activeEmp ? `Chatting with ${activeEmp.name}…` : "Type your message…"}
              disabled={empLocked}
              style={{ flex:1,border:"1.5px solid #e0e7ff",borderRadius:22,padding:"8px 14px",fontSize:13,outline:"none",background:empLocked?"#f9f9ff":"#fff",color:"#374151" }} />
            <button onClick={()=>send(input)} disabled={!btnActive}
              style={{ width:36,height:36,borderRadius:"50%",background:btnActive?"linear-gradient(135deg,#6366f1,#7c3aed)":"#e0e7ff",border:"none",cursor:btnActive?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background 0.2s" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Floating button ── */}
      <div style={{ position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8 }}>
        {!open && (
          <div style={{ background:"#1e1b4b",color:"#fff",fontSize:12,fontWeight:500,padding:"7px 13px",borderRadius:10,whiteSpace:"nowrap",boxShadow:"0 2px 10px rgba(0,0,0,0.18)" }}>
            Chat with us 👋
          </div>
        )}
        <button onClick={()=>setOpen(o=>!o)}
          style={{ width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#7c3aed)",border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(99,102,241,0.45)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",transition:"transform 0.18s" }}>
          {unread > 0 && !open && (
            <span style={{ position:"absolute",top:-3,right:-3,background:"#ef4444",color:"#fff",fontSize:10,fontWeight:700,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #fff" }}>{unread}</span>
          )}
          {open
            ? <svg width="18" height="18" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>
            : <svg width="20" height="20" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
          }
        </button>
      </div>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:20 }}>
        {[
          { icon:"📞",label:"Emergency Hotline",value:"+65 6297 8000",sub:"Available 24/7",col:C.indigo,g:G.indigo },
          { icon:"📧",label:"General Enquiries",value:"admin@emergencies.com.sg",sub:"Reply within 1 business day",col:C.purple,g:G.indigoSoft },
          { icon:"📍",label:"Our Office",value:"Singapore",sub:"Serving island-wide",col:C.teal,g:G.teal },
        ].map(c=>(
          <Card key={c.label} g={c.g} style={{ padding:"20px" }}>
            <div style={{ width:40,height:40,borderRadius:"50%",background:`${c.col}12`,border:`1px solid ${c.col}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:12 }}>{c.icon}</div>
            <div style={{ fontSize:10.5,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3 }}>{c.label}</div>
            <div style={{ fontSize:13.5,fontWeight:600,color:C.text,marginBottom:2 }}>{c.value}</div>
            <div style={{ fontSize:11.5,color:C.muted }}>{c.sub}</div>
          </Card>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <div style={{ borderRadius:14,background:"linear-gradient(135deg,#6366f1,#7c3aed)",padding:"36px 28px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",gap:14 }}>
          <div style={{ width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,0.18)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="22" height="22" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
          </div>
          <div style={{ fontSize:20,fontWeight:800,color:"#fff",lineHeight:1.3 }}>Chat with Us Live</div>
          <div style={{ fontSize:13,color:"rgba(255,255,255,0.88)",lineHeight:1.75,maxWidth:260 }}>
            Have a question? Our virtual assistant replies instantly — and for complex enquiries, a real team member will personally join the chat.
          </div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginTop:4 }}>
            {["Instant replies","24/7 availability","Live agent support"].map(t=>(
              <span key={t} style={{ background:"rgba(255,255,255,0.16)",padding:"5px 14px",borderRadius:20,fontSize:11.5,color:"#fff",fontWeight:500 }}>{t}</span>
            ))}
          </div>
          <div style={{ fontSize:11.5,color:"rgba(255,255,255,0.6)",marginTop:4 }}>
            👇 Click the chat bubble in the bottom-right corner
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <SCard title="🕐 Operating Hours" g={G.indigoSoft}>
            {[["Emergency Dispatch","24 / 7 / 365",C.indigo],["Monday – Friday","8:00am – 6:00pm",C.teal],["Saturday","8:00am – 1:00pm",C.purple],["Sunday & PH","Emergency only",C.muted]].map(([d,h,col])=>(
              <div key={d} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:13,color:C.sub }}>{d}</span>
                <span style={{ fontSize:13,fontWeight:600,color:col }}>{h}</span>
              </div>
            ))}
          </SCard>
          <SCard title="📲 Follow Us" g={G.indigo}>
            {[["🌐","Website","emergencies.com.sg",C.teal],["📘","Facebook","fb.com/emergenciessg",C.blue],["📸","Instagram","@emergencies.sg",C.indigo],["💼","LinkedIn","linkedin.com/company/ef-rescue",C.purple]].map(([icon,label,val,col])=>(
              <div key={label} style={{ display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:18,width:22 }}>{icon}</span>
                <div>
                  <div style={{ fontSize:10.5,color:C.muted,marginBottom:1 }}>{label}</div>
                  <div style={{ fontSize:12.5,color:col,fontWeight:500 }}>{val}</div>
                </div>
              </div>
            ))}
          </SCard>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════ */
function LoginPage({ onLogin, onBack }) {
  const [email,setEmail]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");

  function handleLogin() {
    if(!email||!pw){ setErr("Please enter both email and password."); return; }
    onLogin();
  }

  const inputStyle = {
    width:"100%",background:"#ffffff",border:"1.5px solid #d1d5db",
    borderRadius:8,padding:"11px 14px",color:"#111827",fontSize:14,
    outline:"none",boxSizing:"border-box",fontFamily:"'Inter','Segoe UI',sans-serif",
  };

  return (
    <div style={{ display:"flex",height:"100vh",fontFamily:"'Inter','Segoe UI',sans-serif",overflow:"hidden" }}>
      {/* LEFT — dark indigo panel */}
      <div style={{ flex:"0 0 58%",background:G.heroBg,position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-12%",right:"-8%",width:"52%",paddingBottom:"52%",borderRadius:"50%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position:"absolute",bottom:"-18%",left:"-12%",width:"62%",paddingBottom:"62%",borderRadius:"50%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position:"relative",zIndex:1,textAlign:"center",padding:"0 60px" }}>
          <div style={{ fontSize:88,fontWeight:900,color:"rgba(255,255,255,0.13)",lineHeight:1,marginBottom:22,letterSpacing:"-4px" }}>+</div>
          <div style={{ fontSize:54,fontWeight:900,color:"#ffffff",letterSpacing:"-1px",marginBottom:14 }}>EFAR</div>
          <div style={{ fontSize:16,color:"rgba(255,255,255,0.55)",lineHeight:1.65,maxWidth:300,margin:"0 auto" }}>
            Intelligent Ambulance Workforce<br />Management System
          </div>
        </div>
      </div>

      {/* RIGHT — white form panel */}
      <div style={{ flex:1,background:"#ffffff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"48px 40px",overflowY:"auto" }}>
        <div style={{ width:"100%",maxWidth:380 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:36 }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:"#6366f1",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
            </div>
            <span style={{ fontSize:18,fontWeight:700,color:"#1f2937" }}>EFAR</span>
          </div>
          <h1 style={{ fontSize:28,fontWeight:700,color:"#111827",marginBottom:6 }}>Welcome back</h1>
          <p style={{ fontSize:14,color:"#6b7280",marginBottom:28 }}>Sign in to your account to continue</p>
          {err && <div style={{ background:"#fee2e2",border:"1px solid #fca5a5",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#dc2626",marginBottom:14 }}>{err}</div>}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:13,fontWeight:500,color:"#374151",display:"block",marginBottom:6 }}>Email Address</label>
            <input type="email" placeholder="you@efar.com.my" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom:8 }}>
            <label style={{ fontSize:13,fontWeight:500,color:"#374151",display:"block",marginBottom:6 }}>Password</label>
            <input type="password" placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={inputStyle} />
          </div>
          <div style={{ textAlign:"right",marginBottom:26 }}>
            <span style={{ fontSize:13,color:"#6366f1",cursor:"pointer",fontWeight:500 }}>Forgot password?</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
            <div style={{ flex:1,height:1,background:"#e5e7eb" }} />
            <span style={{ fontSize:11,fontWeight:600,color:"#9ca3af",letterSpacing:"0.08em",whiteSpace:"nowrap" }}>QUICK DEMO ACCESS</span>
            <div style={{ flex:1,height:1,background:"#e5e7eb" }} />
          </div>
          <button onClick={()=>onLogin("paramedic")} style={{ width:"100%",padding:"13px",borderRadius:10,background:"#6366f1",color:"#fff",fontWeight:600,fontSize:14,border:"none",cursor:"pointer",marginBottom:12 }}>
            Sign In as Paramedic / Driver
          </button>
          <button onClick={()=>onLogin("director")} style={{ width:"100%",padding:"13px",borderRadius:10,background:"transparent",color:"#6366f1",fontWeight:600,fontSize:14,border:"2px solid #6366f1",cursor:"pointer" }}>
            Sign In as Operations Director
          </button>
          <button onClick={onBack} style={{ display:"block",marginTop:16,width:"100%",padding:"9px",borderRadius:8,background:"transparent",border:"1px solid #e5e7eb",color:"#9ca3af",fontSize:12,cursor:"pointer" }}>
            ← Back to site
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   DASHBOARD TABS
   ═══════════════════════════════ */
const TAB_ICONS = {
  dashboard: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>,
  scheduler: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="14" height="12" rx="2"/><path d="M1 7h14"/><path d="M5 1v4M11 1v4"/></svg>,
  roster:    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 4h10M3 8h10M3 12h6"/></svg>,
  leave:     <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="1" width="10" height="14" rx="1.5"/><path d="M6 5h4M6 8h4M6 11h2"/></svg>,
  conflicts: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2L14.5 13.5H1.5L8 2z"/><path d="M8 6.5v3"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor"/></svg>,
  employees: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="5" r="2.5"/><path d="M1 14c0-3 2-5 5-5s5 2 5 5"/><circle cx="12" cy="5" r="2"/><path d="M15 14c0-2.5-1.5-4-3-4.5"/></svg>,
  schedule:  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="14" height="12" rx="2"/><path d="M1 7h14"/><path d="M5 1v4M11 1v4"/></svg>,
  profile:   <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="5" r="3"/><path d="M2 15c0-4 2.5-6 6-6s6 2 6 6"/></svg>,
  settings:  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M12.95 3.05l-1.41 1.41M4.46 11.54l-1.41 1.41"/></svg>,
};

const TABS = [
  { id:"dashboard",  label:"Dashboard" },
  { id:"scheduler",  label:"Auto Scheduler" },
  { id:"roster",     label:"Roster" },
  { id:"leave",      label:"Leave Management" },
  { id:"conflicts",  label:"Conflict Detection" },
  { id:"employees",  label:"Employee Database" },
];

function DashboardTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.15 }}>⊞</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.text,marginBottom:8 }}>Workforce Dashboard</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        Real-time ambulance manpower visibility, KPI tracking, and roster coverage will be displayed here once data is connected.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.teal}12`,border:`1px solid ${C.teal}40`,fontSize:12.5,fontWeight:600,color:C.teal }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}
function SchedulerTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.15 }}>🗓</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.text,marginBottom:8 }}>Auto Scheduler</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        AI-powered scheduling will automatically assign manpower based on availability, demand patterns, and operational constraints.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.indigo}12`,border:`1px solid ${C.indigo}40`,fontSize:12.5,fontWeight:600,color:C.indigo }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}
function RosterTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.15 }}>📋</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.text,marginBottom:8 }}>Roster Management</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        Staff rosters will be managed here. View weekly and monthly schedules, assign shifts, and track attendance across all ambulance crews.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.blue}12`,border:`1px solid ${C.blue}40`,fontSize:12.5,fontWeight:600,color:C.blue }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}

function LeaveTab() {
  const WA_NUMBER = "https://wa.me/15556435278";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [search, setSearch] = useState("");

  function fetchRequests() {
    setLoading(true);
    http.get("/api/leave").then(data => { setRequests(data); setLoading(false); }).catch(()=>setLoading(false));
  }
  useEffect(() => { fetchRequests(); }, []);

  async function approve(id) {
    await http.post(`/api/leave/approve/${id}`);
    fetchRequests();
  }
  async function reject(id) {
    await http.post(`/api/leave/reject/${id}`, { reason: rejectReason || "No reason provided." });
    setRejectId(null); setRejectReason(""); fetchRequests();
  }

  const statusColor = { pending: C.yellow, approved: C.green, rejected: C.red };

  return (
    <>
      <div style={{ background:G.heroBg,borderRadius:14,padding:"26px 32px",marginBottom:20,position:"relative",overflow:"hidden" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <div style={{ width:48,height:48,borderRadius:12,background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>💬</div>
            <div>
              <div style={{ fontSize:16,fontWeight:700,color:"#ffffff",marginBottom:4 }}>Leave Management via WhatsApp Bot</div>
              <div style={{ fontSize:12.5,color:"rgba(255,255,255,0.55)",lineHeight:1.6 }}>
                Staff send <strong style={{ color:"#ffffff" }}>leave</strong> on WhatsApp to apply. Review and approve requests below.
              </div>
            </div>
          </div>
          <div style={{ display:"flex",gap:10,alignItems:"center" }}>
            <a href={WA_NUMBER} target="_blank" rel="noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",borderRadius:10,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",color:"#fff",fontWeight:700,fontSize:13,textDecoration:"none" }}>
              💬 Open WhatsApp
            </a>
            <button onClick={fetchRequests} style={{ padding:"10px 16px",borderRadius:10,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.7)",fontSize:13,cursor:"pointer" }}>↻ Refresh</button>
          </div>
        </div>
      </div>

      <SCard title="📋 Leave Requests" sub="All submitted leave applications" g={G.teal}>
        <div style={{ marginBottom:14 }}>
          <input type="text" placeholder="Search by Ref ID, name, role, ambulance, leave type, dates or status..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:"100%",background:"#ffffff",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box" }} />
        </div>
        {loading ? (
          <div style={{ textAlign:"center",padding:"32px 0",color:C.muted,fontSize:13 }}>Loading...</div>
        ) : requests.filter(r=>[r.id,r.fullName,r.role,r.ambulance,r.leaveType,r.leaveDates,r.status].some(v=>(v||"").toLowerCase().includes(search.toLowerCase()))).length===0 ? (
          <div style={{ textAlign:"center",padding:"32px 0",color:C.muted,fontSize:13 }}>{search?"No matching requests found.":"No leave requests yet."}</div>
        ) : (
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
            <thead><tr>{["Ref ID","Name","Role","Ambulance","Leave Type","Date(s)","Document","Submitted","Status","Actions"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
            <tbody>
              {requests.filter(r=>[r.id,r.fullName,r.role,r.ambulance,r.leaveType,r.leaveDates,r.status].some(v=>(v||"").toLowerCase().includes(search.toLowerCase()))).map(r=>(
                <tr key={r.id}>
                  <td style={{ ...TD,fontWeight:700,color:C.muted,fontSize:11 }}>{r.id}</td>
                  <td style={{ ...TD,fontWeight:600,color:C.text }}>{r.fullName}</td>
                  <td style={TD}>{r.role}</td>
                  <td style={TD}>{r.ambulance}</td>
                  <td style={TD}>{r.leaveType}</td>
                  <td style={TD}>{r.leaveDates}</td>
                  <td style={{ ...TD,fontSize:11,color:C.muted }}>{r.mcDocument}</td>
                  <td style={{ ...TD,fontSize:11,color:C.muted }}>{new Date(r.submittedAt).toLocaleString()}</td>
                  <td style={TD}><Badge label={r.status} color={statusColor[r.status]||C.muted} /></td>
                  <td style={TD}>
                    {r.status==="pending"?(
                      <div style={{ display:"flex",gap:"6px" }}>
                        <button onClick={()=>approve(r.id)} style={{ padding:"5px 12px",borderRadius:6,background:C.green+"18",border:`1px solid ${C.green}`,color:C.green,fontSize:11,fontWeight:600,cursor:"pointer" }}>Approve</button>
                        <button onClick={()=>setRejectId(r.id)} style={{ padding:"5px 12px",borderRadius:6,background:C.red+"18",border:`1px solid ${C.red}`,color:C.red,fontSize:11,fontWeight:600,cursor:"pointer" }}>Reject</button>
                      </div>
                    ):null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SCard>

      {rejectId && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100 }}>
          <div style={{ background:"#ffffff",border:`1px solid ${C.border}`,borderRadius:14,padding:"28px 32px",width:420,boxShadow:shadowMd }}>
            <div style={{ fontSize:16,fontWeight:700,color:C.text,marginBottom:12 }}>Reject Leave Request</div>
            <div style={{ fontSize:12.5,color:C.muted,marginBottom:10 }}>Provide a reason (sent to staff via WhatsApp):</div>
            <textarea rows={3} value={rejectReason} onChange={e=>setRejectReason(e.target.value)} placeholder="e.g. Insufficient staffing on that date..." style={{ width:"100%",background:"#ffffff",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box",resize:"vertical" }} />
            <div style={{ display:"flex",gap:10,marginTop:16,justifyContent:"flex-end" }}>
              <button onClick={()=>{ setRejectId(null); setRejectReason(""); }} style={{ padding:"9px 20px",borderRadius:8,background:"transparent",border:`1px solid ${C.border}`,color:C.sub,fontSize:13,cursor:"pointer" }}>Cancel</button>
              <button onClick={()=>reject(rejectId)} style={{ padding:"9px 20px",borderRadius:8,background:C.red+"18",border:`1px solid ${C.red}`,color:C.red,fontSize:13,fontWeight:600,cursor:"pointer" }}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      <SCard title="📌 How It Works" sub="Once you open WhatsApp, the bot takes over" g={G.blue}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:12 }}>
          {[
            { step:"1",label:"Open Chat",    desc:"Click the button above to open WhatsApp.",col:C.teal },
            { step:"2",label:'Type "leave"', desc:"Send the word leave to start the bot flow.",col:C.blue },
            { step:"3",label:"Bot asks you", desc:"Bot asks for your name, role, dates, ambulance & leave type.",col:C.purple },
            { step:"4",label:"Upload MC",    desc:"For Medical Leave, upload your MC.",col:C.orange },
            { step:"5",label:"Done",         desc:"Bot confirms. Ops Director reviews on this dashboard.",col:C.green },
          ].map(s=>(
            <div key={s.step} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}`,textAlign:"center" }}>
              <div style={{ width:30,height:30,borderRadius:"50%",background:`${s.col}12`,border:`1px solid ${s.col}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:s.col,margin:"0 auto 10px" }}>{s.step}</div>
              <div style={{ fontSize:12,fontWeight:700,color:C.text,marginBottom:4 }}>{s.label}</div>
              <div style={{ fontSize:11,color:C.muted,lineHeight:1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}

function ConflictsTab() {
  const conflicts = [
    { id:"C-001",type:"Double Booking",     staff:"Nur Aisyah",  shift1:"AMB-01 08:00–20:00",shift2:"AMB-03 07:00–19:00",date:"25 May 2025",severity:"High",   sc:C.red },
    { id:"C-002",type:"Overtime Breach",    staff:"Kumar Raj",   shift1:"AMB-02 07:00–19:00",shift2:"Extended +2hrs",    date:"25 May 2025",severity:"Medium", sc:C.orange },
    { id:"C-003",type:"Rest Period Breach", staff:"Daniel Tan",  shift1:"AMB-01 20:00 end",   shift2:"Next shift 04:00", date:"26 May 2025",severity:"High",   sc:C.red },
    { id:"C-004",type:"Understaffed Crew",  staff:"AMB-04 crew", shift1:"06:00–18:00",         shift2:"Missing medic",    date:"25 May 2025",severity:"Medium", sc:C.orange },
    { id:"C-005",type:"Skill Mismatch",     staff:"Reza Malik",  shift1:"AMB-04 driver slot",  shift2:"Req. paramedic",  date:"27 May 2025",severity:"Low",    sc:C.yellow },
  ];
  const summary = [
    { count:2,label:"High Severity",col:C.red },
    { count:2,label:"Medium Severity",col:C.orange },
    { count:1,label:"Low Severity",col:C.yellow },
    { count:5,label:"Total Conflicts",col:C.indigo },
  ];
  return (
    <>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:20 }}>
        {summary.map(s=>(
          <Card key={s.label} g={G.orange} style={{ padding:"18px 20px" }}>
            <div style={{ fontSize:28,fontWeight:800,color:s.col,marginBottom:4 }}>{s.count}</div>
            <div style={{ fontSize:12,color:C.muted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <SCard title="⚠️ Active Scheduling Conflicts" sub="Auto-detected conflicts requiring immediate attention" g={G.orange}>
        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
          <thead><tr>{["ID","Type","Staff / Unit","Shift 1","Shift 2","Date","Severity"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>
            {conflicts.map(r=>(
              <tr key={r.id}>
                <td style={{ ...TD,fontWeight:700,color:C.muted,fontSize:11 }}>{r.id}</td>
                <td style={{ ...TD,fontWeight:600,color:C.text }}>{r.type}</td>
                <td style={TD}>{r.staff}</td>
                <td style={{ ...TD,fontSize:12 }}>{r.shift1}</td>
                <td style={{ ...TD,fontSize:12 }}>{r.shift2}</td>
                <td style={{ ...TD,fontSize:12,color:C.muted }}>{r.date}</td>
                <td style={TD}><Badge label={r.severity} color={r.sc} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </SCard>
      <SCard title="📊 Conflict Breakdown by Type" g={G.blue}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          {[
            { type:"Double Booking",count:1,pct:60,col:C.red },
            { type:"Overtime Breach",count:1,pct:40,col:C.orange },
            { type:"Rest Period Breach",count:1,pct:80,col:C.red },
            { type:"Understaffed Crew",count:1,pct:50,col:C.orange },
            { type:"Skill Mismatch",count:1,pct:30,col:C.yellow },
          ].map(b=>(
            <div key={b.type} style={{ background:C.cardDeep,borderRadius:10,padding:"14px",border:`1px solid ${C.border}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                <span style={{ fontSize:12.5,fontWeight:600,color:C.text }}>{b.type}</span>
                <span style={{ fontSize:12,color:b.col,fontWeight:700 }}>{b.count}</span>
              </div>
              <div style={{ height:6,borderRadius:3,background:C.border,overflow:"hidden" }}>
                <div style={{ height:"100%",width:`${b.pct}%`,background:b.col,borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}

function EmployeesTab() {
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,opacity:0.15 }}>👥</div>
      <div style={{ fontSize:20,fontWeight:700,color:C.text,marginBottom:8 }}>Employee Database</div>
      <div style={{ fontSize:13.5,color:C.muted,maxWidth:380,lineHeight:1.7,marginBottom:24 }}>
        The employee management system will store staff profiles, certifications, contact details, and employment records for all EFAR personnel.
      </div>
      <div style={{ padding:"8px 22px",borderRadius:20,background:`${C.purple}12`,border:`1px solid ${C.purple}40`,fontSize:12.5,fontWeight:600,color:C.purple }}>
        Coming Soon — Week 15
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   DASHBOARD SHELL
   ═══════════════════════════════ */
function DashboardShell({ onLogout }) {
  const [tab,setTab]=useState("dashboard");
  const [showSignOut,setShowSignOut]=useState(false);
  const content = { dashboard:<DashboardTab/>,scheduler:<SchedulerTab/>,roster:<RosterTab/>,leave:<LeaveTab/>,conflicts:<ConflictsTab/>,employees:<EmployeesTab/> };
  const titles  = { dashboard:"Workforce Dashboard",scheduler:"Auto Scheduler",roster:"Roster Management",leave:"Leave Management",conflicts:"Conflict Detection",employees:"Employee Database" };
  const subs    = { dashboard:"Real-time ambulance manpower visibility and roster coverage",scheduler:"AI-powered shift scheduling based on availability and demand",roster:"Manage weekly and monthly staff rosters",leave:"Manage leave applications via WhatsApp",conflicts:"Auto-detected scheduling conflicts requiring attention",employees:"Staff profiles, certifications and employment records" };

  return (
    <div style={{ display:"flex",height:"100vh",background:C.bg,fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text,overflow:"hidden" }} onClick={()=>setShowSignOut(false)}>
      {/* SIDEBAR — dark indigo matching login left panel */}
      <div style={{ width:220,background:C.sidebar,display:"flex",flexDirection:"column",flexShrink:0 }}>
        <div style={{ padding:"18px 16px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.15)",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
          </div>
          <div style={{ fontSize:13.5,fontWeight:700,color:"#ffffff",lineHeight:1.2 }}>MediFlow</div>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.4)",marginTop:2 }}>Emergencies F&amp;R</div>
        </div>
        <nav style={{ flex:1,padding:"10px 8px" }}>
          {TABS.map(t=>(
            <div key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex",alignItems:"center",padding:"9px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,background:tab===t.id?"rgba(255,255,255,0.12)":"transparent",color:tab===t.id?"#ffffff":"rgba(255,255,255,0.5)",fontWeight:tab===t.id?700:400,fontSize:13,border:tab===t.id?"1px solid rgba(255,255,255,0.15)":"1px solid transparent",transition:"all 0.15s" }}>
              {t.label}
            </div>
          ))}
        </nav>
        <div style={{ padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.25)",textAlign:"center" }}>v1.0 · emergencies.com.sg</div>
        </div>
      </div>

      {/* MAIN — white content area */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        {/* TOPBAR */}
        <div style={{ background:"#ffffff",borderBottom:`1px solid ${C.border}`,padding:"0 28px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,boxShadow:shadow }}>
          <div style={{ fontSize:11,color:C.muted }}>
            <div style={{ fontSize:10 }}>Today</div>
            <div style={{ fontWeight:600,color:C.sub }}>Mon, May 25</div>
          </div>
          <div style={{ position:"relative" }} onClick={e=>{ e.stopPropagation(); setShowSignOut(v=>!v); }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"4px 6px",borderRadius:8,transition:"background 0.15s" }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12,fontWeight:600,color:C.text }}>MediFlow</div>
                <div style={{ fontSize:10,color:C.muted }}>Operations Director</div>
              </div>
              <div style={{ width:34,height:34,borderRadius:"50%",background:C.indigo,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
              </div>
            </div>
            {showSignOut && (
              <div style={{ position:"absolute",top:"calc(100% + 6px)",right:0,background:"#ffffff",border:`1px solid ${C.border}`,borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:160,zIndex:100,overflow:"hidden" }}>
                <div style={{ padding:"10px 14px 6px",borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:11,fontWeight:600,color:C.text }}>MediFlow</div>
                  <div style={{ fontSize:10,color:C.muted }}>Operations Director</div>
                </div>
                <div style={{ padding:"6px" }}>
                  <button onClick={onLogout} style={{ width:"100%",padding:"8px 10px",borderRadius:7,border:"none",background:"transparent",color:"#e53e3e",fontSize:12,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:7,textAlign:"left" }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"/><path d="M11 11l3-3-3-3"/><path d="M14 8H6"/></svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex:1,overflowY:"auto",padding:"28px 32px",background:C.bg }}>
          <div style={{ fontSize:24,fontWeight:800,color:C.text,marginBottom:4 }}>{titles[tab]}</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:24 }}>{subs[tab]}</div>
          {content[tab]}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   PUBLIC NAVBAR
   ═══════════════════════════════ */
function PublicNav({ active, onNav, onLoginClick }) {
  const NAV = [{ id:"home",label:"Home" },{ id:"about",label:"About Us" },{ id:"contact",label:"Contact Us" }];
  return (
    <div style={{ position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${C.border}`,boxShadow:shadow }}>
      <div style={{ maxWidth:960,margin:"0 auto",padding:"0 32px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
          <div style={{ width:36,height:36,borderRadius:"50%",background:C.indigo,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
          </div>
          <div>
            <div style={{ fontSize:14,fontWeight:700,color:C.text,lineHeight:1.2 }}>Emergencies F&amp;R</div>
            <div style={{ fontSize:10,color:C.muted }}>MediFlow Platform</div>
          </div>
        </div>
        <nav style={{ display:"flex",alignItems:"center",gap:2 }}>
          {NAV.map(s=>(
            <button key={s.id} onClick={()=>onNav(s.id)} style={{ padding:"7px 18px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:active===s.id?600:400,background:active===s.id?`${C.indigo}12`:"transparent",color:active===s.id?C.indigo:C.sub,transition:"all 0.15s" }}>{s.label}</button>
          ))}
        </nav>
        <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
          <div style={{ fontSize:11,color:C.muted,textAlign:"right" }}>
            <div style={{ fontSize:10 }}>Today</div>
            <div style={{ fontWeight:600,color:C.sub }}>Mon, May 25</div>
          </div>
          <div style={{ width:1,height:22,background:C.border }} />
          <button onClick={onLoginClick} style={{ display:"flex",alignItems:"center",gap:7,padding:"8px 18px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:600,background:C.indigo,color:"#fff",border:"none",boxShadow:`0 4px 14px ${C.indigo}40` }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   PARAMEDIC / DRIVER PORTAL
   ═══════════════════════════════ */
const MOCK_STAFF = {
  name:"Bhargavi Venkatesh", role:"Paramedic", station:"Bedok Station",
  employeeId:"EMP-0124", email:"bhargavi@efar.com.sg",
  phone:"+65 9123 4567", emergencyContact:"Venkatesh R · +65 8765 4321",
};

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const SCHEDULE = {
  // ── June ──────────────────────────────────────────────────────────────────
  "2026-06-01":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-06-03":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-06-04":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-06-06":{ type:"morning", ambulance:"AMB-01", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-06-08":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-06-10":{ type:"leave_approved", leaveType:"Annual Leave" },
  "2026-06-11":{ type:"leave_approved", leaveType:"Annual Leave" },
  "2026-06-13":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },
  "2026-06-15":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-06-16":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-06-18":{ type:"morning", ambulance:"AMB-01", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-06-21":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-06-22":{ type:"night",   ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-06-23":{ type:"night",   ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-06-25":{ type:"morning", ambulance:"AMB-01", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-06-27":{ type:"leave_pending", leaveType:"Medical Leave" },
  "2026-06-28":{ type:"leave_pending", leaveType:"Medical Leave" },
  "2026-06-29":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },

  // ── July ──────────────────────────────────────────────────────────────────
  // Wk Jun30-Jul4  (Wed-Fri shifts)
  "2026-07-01":{ type:"morning", ambulance:"AMB-01", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-07-02":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-07-03":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Jul6-10
  "2026-07-06":{ type:"night",   ambulance:"AMB-01", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-07-07":{ type:"night",   ambulance:"AMB-02", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-07-08":{ type:"morning", ambulance:"AMB-03", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-07-09":{ type:"morning", ambulance:"AMB-01", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-07-10":{ type:"morning", ambulance:"AMB-02", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Jul13-17
  "2026-07-13":{ type:"morning", ambulance:"AMB-03", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-07-14":{ type:"night",   ambulance:"AMB-01", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-07-15":{ type:"night",   ambulance:"AMB-02", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-07-16":{ type:"leave_approved", leaveType:"Annual Leave" },
  "2026-07-17":{ type:"morning", ambulance:"AMB-03", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  // Weekend
  "2026-07-18":{ type:"morning", ambulance:"AMB-01", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Jul20-24
  "2026-07-20":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-07-21":{ type:"night",   ambulance:"AMB-03", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-07-22":{ type:"morning", ambulance:"AMB-01", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-07-23":{ type:"morning", ambulance:"AMB-02", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-07-24":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Jul27-31
  "2026-07-27":{ type:"morning", ambulance:"AMB-01", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-07-28":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-07-29":{ type:"night",   ambulance:"AMB-03", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-07-30":{ type:"morning", ambulance:"AMB-01", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-07-31":{ type:"morning", ambulance:"AMB-02", partner:"Reza Malik",  partnerRole:"Driver"    },

  // ── August ────────────────────────────────────────────────────────────────
  // Wk Aug3-7
  "2026-08-03":{ type:"morning", ambulance:"AMB-01", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-08-04":{ type:"morning", ambulance:"AMB-03", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-08-05":{ type:"night",   ambulance:"AMB-02", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-08-06":{ type:"night",   ambulance:"AMB-01", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-08-07":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },
  // National Day public holiday
  "2026-08-09":{ type:"leave_approved", leaveType:"National Day" },
  // Wk Aug10-14
  "2026-08-10":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-08-11":{ type:"morning", ambulance:"AMB-01", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-08-12":{ type:"night",   ambulance:"AMB-03", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-08-13":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-08-14":{ type:"morning", ambulance:"AMB-01", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Aug17-21
  "2026-08-17":{ type:"morning", ambulance:"AMB-03", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-08-18":{ type:"morning", ambulance:"AMB-01", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-08-19":{ type:"morning", ambulance:"AMB-02", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-08-20":{ type:"night",   ambulance:"AMB-03", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-08-21":{ type:"night",   ambulance:"AMB-01", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Leave block
  "2026-08-22":{ type:"leave_approved", leaveType:"Annual Leave" },
  "2026-08-23":{ type:"leave_approved", leaveType:"Annual Leave" },
  // Wk Aug24-28
  "2026-08-24":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-08-25":{ type:"night",   ambulance:"AMB-03", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-08-26":{ type:"night",   ambulance:"AMB-01", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-08-27":{ type:"morning", ambulance:"AMB-02", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-08-28":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Aug31
  "2026-08-31":{ type:"morning", ambulance:"AMB-01", partner:"Kumar Raj",   partnerRole:"Paramedic" },

  // ── September ─────────────────────────────────────────────────────────────
  // Wk Sep1-5
  "2026-09-01":{ type:"morning", ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-09-02":{ type:"night",   ambulance:"AMB-03", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-09-03":{ type:"night",   ambulance:"AMB-01", partner:"Reza Malik",  partnerRole:"Driver"    },
  "2026-09-04":{ type:"morning", ambulance:"AMB-02", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  // Wk Sep7-11
  "2026-09-07":{ type:"morning", ambulance:"AMB-03", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-09-08":{ type:"morning", ambulance:"AMB-01", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-09-09":{ type:"night",   ambulance:"AMB-02", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-09-10":{ type:"night",   ambulance:"AMB-03", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-09-11":{ type:"morning", ambulance:"AMB-01", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Sep14-18
  "2026-09-14":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-09-15":{ type:"morning", ambulance:"AMB-03", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-09-16":{ type:"night",   ambulance:"AMB-01", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-09-17":{ type:"leave_approved", leaveType:"Annual Leave" },
  "2026-09-18":{ type:"morning", ambulance:"AMB-02", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  // Weekend
  "2026-09-19":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },
  // Wk Sep21-25
  "2026-09-21":{ type:"night",   ambulance:"AMB-01", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-09-22":{ type:"night",   ambulance:"AMB-02", partner:"Daniel Tan",  partnerRole:"Driver"    },
  "2026-09-23":{ type:"morning", ambulance:"AMB-03", partner:"Sarah Lim",   partnerRole:"EMT"       },
  "2026-09-24":{ type:"morning", ambulance:"AMB-01", partner:"Nur Aisyah",  partnerRole:"Paramedic" },
  "2026-09-25":{ type:"leave_approved", leaveType:"Annual Leave" },
  // Wk Sep28-30
  "2026-09-28":{ type:"morning", ambulance:"AMB-02", partner:"Kumar Raj",   partnerRole:"Paramedic" },
  "2026-09-29":{ type:"morning", ambulance:"AMB-03", partner:"Reza Malik",  partnerRole:"Driver"    },
  "2026-09-30":{ type:"night",   ambulance:"AMB-01", partner:"Daniel Tan",  partnerRole:"Driver"    },
};

function shiftMeta(type) {
  if(type==="morning")       return { label:"Morning Shift", time:"08:00 – 20:00", color:C.indigo  };
  if(type==="night")         return { label:"Night Shift",   time:"20:00 – 08:00", color:"#312e81" };
  if(type==="leave_approved")return { label:"Approved Leave",time:"",             color:C.green   };
  if(type==="leave_pending") return { label:"Pending Leave", time:"",             color:C.yellow  };
  return                            { label:"Rest Day",      time:"",             color:C.muted   };
}

function dateKey(y,m,d){ return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }

const CREW_PAIRS = [
  [{ name:"Marcus Ho",      role:"Driver"    }, { name:"Priya Nair",     role:"Paramedic" }],
  [{ name:"Wei Jian",       role:"EMT"       }, { name:"Siti Rahimah",   role:"Paramedic" }],
  [{ name:"Jamal Hassan",   role:"Driver"    }, { name:"Mei Lin",        role:"EMT"       }],
  [{ name:"Ryan Chong",     role:"Paramedic" }, { name:"Fatimah Zahra",  role:"Driver"    }],
  [{ name:"Lim Kah Wai",   role:"EMT"       }, { name:"Deepa Krishnan", role:"Paramedic" }],
];

function getDayCrews(dateStr, myAmbulance) {
  const d   = new Date(dateStr + "T00:00:00");
  const dow = d.getDay();
  if (dow === 0 || dow === 6) return [];
  const others = ["AMB-01","AMB-02","AMB-03"].filter(a => a !== myAmbulance);
  const seed   = d.getDate() + d.getMonth() * 7;
  return others.map((amb, i) => ({ ambulance: amb, members: CREW_PAIRS[(seed + i * 2) % CREW_PAIRS.length] }));
}

/* ── Paramedic: Dashboard tab ── */
function PaDashboardTab({ staff }) {
  const today = new Date();
  const upcoming = Object.entries(SCHEDULE)
    .filter(([k,v])=> new Date(k) >= today && (v.type==="morning"||v.type==="night"))
    .sort(([a],[b])=>a.localeCompare(b));
  const nextEntry  = upcoming[0];
  const nextShift  = nextEntry ? nextEntry[1] : null;
  const nextDate   = nextEntry ? nextEntry[0] : null;
  const workDays   = Object.values(SCHEDULE).filter(v=>v.type==="morning"||v.type==="night").length;
  const apvLeave   = Object.values(SCHEDULE).filter(v=>v.type==="leave_approved").length;
  const pendLeave  = Object.values(SCHEDULE).filter(v=>v.type==="leave_pending").length;
  const remainAL   = 14 - apvLeave;

  return (
    <>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20 }}>
        {/* Next shift */}
        <Card g={G.indigo} style={{ padding:"22px 24px" }}>
          <div style={{ fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8 }}>Next Upcoming Shift</div>
          {nextShift ? (
            <>
              <div style={{ fontSize:22,fontWeight:800,color:C.indigo,marginBottom:4 }}>
                {new Date(nextDate+"T00:00:00").toLocaleDateString("en-SG",{weekday:"short",day:"numeric",month:"short"})}
              </div>
              <div style={{ fontSize:13,color:C.sub,marginBottom:6 }}>{shiftMeta(nextShift.type).time}</div>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                <Badge label={shiftMeta(nextShift.type).label} color={shiftMeta(nextShift.type).color} />
                <Badge label={nextShift.ambulance} color={C.teal} />
                <Badge label={`With ${nextShift.partner}`} color={C.purple} />
              </div>
            </>
          ) : (
            <div style={{ fontSize:13,color:C.muted }}>No upcoming shifts scheduled.</div>
          )}
        </Card>
        {/* Station */}
        <Card g={G.teal} style={{ padding:"22px 24px" }}>
          <div style={{ fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8 }}>Assigned Station</div>
          <div style={{ fontSize:22,fontWeight:800,color:C.teal,marginBottom:4 }}>{staff.station}</div>
          <div style={{ fontSize:13,color:C.sub,marginBottom:6 }}>Employee ID: {staff.employeeId}</div>
          <Badge label={staff.role} color={C.indigo} />
        </Card>
      </div>

      {/* Stats */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:20 }}>
        {[
          ["Working Days",workDays,C.indigo,G.indigo],
          ["Approved Leave",apvLeave,C.green,G.teal],
          ["Pending Leave",pendLeave,C.yellow,G.orange],
          ["Remaining AL",remainAL,C.purple,G.indigoSoft],
        ].map(([l,v,col,g])=>(
          <Card key={l} g={g} style={{ padding:"18px 20px" }}>
            <div style={{ fontSize:28,fontWeight:800,color:col,marginBottom:4 }}>{v}</div>
            <div style={{ fontSize:12,color:C.muted }}>{l}</div>
          </Card>
        ))}
      </div>

      {/* Upcoming shifts list */}
      <SCard title="📅 Upcoming Working Shifts" sub="Next scheduled shifts in chronological order" g={G.indigo}>
        {upcoming.length===0 ? (
          <div style={{ textAlign:"center",padding:"24px 0",color:C.muted,fontSize:13 }}>No upcoming shifts.</div>
        ) : (
          <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
            <thead><tr>{["Date","Shift Type","Time","Ambulance","Partner","Role"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
            <tbody>
              {upcoming.slice(0,8).map(([k,v])=>{
                const m=shiftMeta(v.type);
                return (
                  <tr key={k}>
                    <td style={{ ...TD,fontWeight:600,color:C.text }}>{new Date(k+"T00:00:00").toLocaleDateString("en-SG",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</td>
                    <td style={TD}><Badge label={m.label} color={m.color} /></td>
                    <td style={{ ...TD,color:C.muted,fontSize:12 }}>{m.time}</td>
                    <td style={TD}><Badge label={v.ambulance} color={C.teal} /></td>
                    <td style={{ ...TD,fontWeight:500 }}>{v.partner}</td>
                    <td style={{ ...TD,color:C.muted }}>{v.partnerRole}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </SCard>
    </>
  );
}

/* ── Paramedic: Monthly Schedule tab ── */
function PaScheduleTab() {
  const [year,setYear]   = useState(2026);
  const [month,setMonth] = useState(5); // 0-indexed; 5 = June
  const [sel,setSel]     = useState(null);

  function prevMonth(){ if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); setSel(null); }
  function nextMonth(){ if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); setSel(null); }

  const firstDay  = new Date(year,month,1).getDay();
  const daysInMo  = new Date(year,month+1,0).getDate();
  const cells = Array(firstDay).fill(null).concat(Array.from({length:daysInMo},(_,i)=>i+1));
  while(cells.length%7) cells.push(null);

  const typeColor = { morning:C.indigo, night:"#312e81", leave_approved:C.green, leave_pending:C.yellow };

  return (
    <>
      <SCard title={`📅 ${MONTH_NAMES[month]} ${year}`} g={G.indigo}
        style={{ marginBottom:20 }}
        sub={
          <div style={{ display:"flex",gap:12,alignItems:"center",marginTop:4 }}>
            <button onClick={prevMonth} style={{ padding:"5px 14px",borderRadius:6,background:C.cardDeep,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:13 }}>‹ Prev</button>
            <button onClick={nextMonth} style={{ padding:"5px 14px",borderRadius:6,background:C.cardDeep,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:13 }}>Next ›</button>
          </div>
        }>
        {/* Legend */}
        <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:16 }}>
          {[["Morning","#6366f1"],["Night","#312e81"],["Approved Leave","#16a34a"],["Pending Leave","#d97706"],["Rest","#9ca3af"]].map(([l,c])=>(
            <span key={l} style={{ display:"flex",alignItems:"center",gap:5,fontSize:11.5,color:C.sub }}>
              <span style={{ width:10,height:10,borderRadius:2,background:c,display:"inline-block" }} />{l}
            </span>
          ))}
        </div>
        {/* Day headers */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:3 }}>
          {DAY_NAMES.map(d=><div key={d} style={{ textAlign:"center",fontSize:11,fontWeight:600,color:C.muted,padding:"4px 0" }}>{d}</div>)}
        </div>
        {/* Calendar cells */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3 }}>
          {cells.map((day,i)=>{
            if(!day) return <div key={`e${i}`} />;
            const key = dateKey(year,month,day);
            const entry = SCHEDULE[key];
            const type  = entry?.type || "rest";
            const col   = typeColor[type] || C.muted;
            const isSelected = sel===key;
            const isToday = key==="2026-06-30";
            return (
              <div key={key} onClick={()=>{ if(type!=="rest") setSel(isSelected?null:key); }}
                style={{ minHeight:64,borderRadius:8,padding:"6px 8px",background:isSelected?`${col}25`:`${col}10`,border:`1.5px solid ${isSelected?col:col+"40"}`,cursor:type==="rest"?"default":"pointer",position:"relative",transition:"all 0.12s" }}>
                <div style={{ fontSize:11,fontWeight:700,color:isToday?C.indigo:C.text,marginBottom:2 }}>
                  {day}{isToday&&<span style={{ fontSize:9,marginLeft:3,color:C.indigo,fontWeight:800 }}>TODAY</span>}
                </div>
                {entry && (
                  <div style={{ fontSize:10,fontWeight:600,color:col,lineHeight:1.4 }}>
                    {type==="morning"?"☀️ Morning":type==="night"?"🌙 Night":type==="leave_approved"?"✅ Leave":type==="leave_pending"?"⏳ Pending":""}
                    {entry.ambulance && (() => {
                      const extra = getDayCrews(key, entry.ambulance);
                      return (
                        <div style={{ marginTop:2 }}>
                          <div style={{ color:C.teal,fontWeight:700,fontSize:9 }}>{entry.ambulance}</div>
                          {extra.map(c=>(
                            <div key={c.ambulance} style={{ color:C.muted,fontWeight:400,fontSize:9 }}>{c.ambulance}</div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SCard>

      {/* Detail panel */}
      {sel && SCHEDULE[sel] && (()=>{
        const e=SCHEDULE[sel]; const m=shiftMeta(e.type);
        const d=new Date(sel+"T00:00:00");
        return (
          <SCard title="Shift Details" g={G.indigo}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12 }}>
              <div>
                <div style={{ fontSize:18,fontWeight:800,color:C.text,marginBottom:6 }}>
                  {d.toLocaleDateString("en-SG",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
                </div>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:10 }}>
                  <Badge label={m.label} color={m.color} />
                  {e.ambulance && <Badge label={e.ambulance} color={C.teal} />}
                  {m.time && <Badge label={m.time} color={C.sub} />}
                </div>
                {e.partner && (() => {
                  const extra = getDayCrews(sel, e.ambulance);
                  const allCrews = [
                    { ambulance:e.ambulance, members:[{ name:MOCK_STAFF.name, role:MOCK_STAFF.role }, { name:e.partner, role:e.partnerRole }], mine:true },
                    ...extra.map(c=>({ ambulance:c.ambulance, members:c.members, mine:false })),
                  ];
                  return (
                    <div style={{ display:"flex",flexDirection:"column",gap:10,marginTop:10 }}>
                      <div style={{ fontSize:12,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em" }}>All Crews on Duty</div>
                      {allCrews.map(c=>(
                        <div key={c.ambulance} style={{ borderRadius:10,border:`1.5px solid ${c.mine?C.indigo+"60":C.border}`,background:c.mine?`${C.indigo}08`:"#fafafa",overflow:"hidden" }}>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",background:c.mine?`${C.indigo}15`:"#f3f4f6",borderBottom:`1px solid ${c.mine?C.indigo+"30":C.border}` }}>
                            <span style={{ fontSize:12,fontWeight:700,color:c.mine?C.indigo:C.sub }}>{c.ambulance}</span>
                            {c.mine && <span style={{ fontSize:10,background:C.indigo,color:"#fff",borderRadius:4,padding:"1px 7px",fontWeight:600 }}>My Crew</span>}
                          </div>
                          <div style={{ padding:"10px 14px",display:"flex",flexDirection:"column",gap:6 }}>
                            {c.members.map((mem,mi)=>(
                              <div key={mi} style={{ display:"flex",alignItems:"center",gap:10 }}>
                                <div style={{ width:30,height:30,borderRadius:"50%",background:c.mine&&mi===0?C.indigo:C.sub,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
                                </div>
                                <div>
                                  <div style={{ fontSize:13,fontWeight:600,color:C.text }}>{mem.name}</div>
                                  <div style={{ fontSize:11,color:C.muted }}>{mem.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                {e.leaveType && <div style={{ marginTop:8,fontSize:13,color:C.sub }}>Leave Type: <strong>{e.leaveType}</strong></div>}
              </div>
              <button onClick={()=>setSel(null)} style={{ padding:"6px 14px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer",fontSize:12 }}>✕ Close</button>
            </div>
          </SCard>
        );
      })()}
    </>
  );
}

/* ── Paramedic: Profile tab ── */
function PaProfileTab({ staff }) {
  return (
    <>
      <Card g={G.indigo} style={{ padding:"28px 28px",marginBottom:20,display:"flex",alignItems:"center",gap:24 }}>
        <div style={{ width:72,height:72,borderRadius:"50%",background:G.indigo,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <svg width="28" height="28" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
        </div>
        <div>
          <div style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:4 }}>{staff.name}</div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            <Badge label={staff.role} color={C.indigo} />
            <Badge label={staff.station} color={C.teal} />
            <Badge label="Active" color={C.green} />
          </div>
        </div>
      </Card>
      <div style={{ background:`${C.yellow}12`,border:`1px solid ${C.yellow}40`,borderRadius:10,padding:"12px 18px",marginBottom:20,fontSize:13,color:C.sub }}>
        ℹ️ Profile updates require HR approval. Contact your Operations Director for any changes.
      </div>
      <SCard title="Employee Information" g={G.indigo}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0 }}>
          {[
            ["Employee ID",    staff.employeeId],
            ["Full Name",      staff.name],
            ["Email Address",  staff.email],
            ["Phone Number",   staff.phone],
            ["Role",           staff.role],
            ["Assigned Station",staff.station],
            ["Emergency Contact",staff.emergencyContact,"full"],
          ].map(([label,val,span])=>(
            <div key={label} style={{ gridColumn:span==="full"?"1/-1":"auto",padding:"14px 0",borderBottom:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:4 }}>
              <div style={{ fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em" }}>{label}</div>
              <div style={{ fontSize:13.5,fontWeight:500,color:C.text }}>{val}</div>
            </div>
          ))}
        </div>
      </SCard>
    </>
  );
}

/* ── Paramedic: Settings tab ── */
function PaSettingsTab() {
  const [form,setForm] = useState({ current:"",newPw:"",confirm:"" });
  const [msg, setMsg]  = useState(null); // { type:"success"|"error", text }

  function handleSave() {
    if(!form.current||!form.newPw||!form.confirm){ setMsg({type:"error",text:"All fields are required."}); return; }
    if(form.current!=="password123")              { setMsg({type:"error",text:"Incorrect current password."}); return; }
    if(form.newPw!==form.confirm)                 { setMsg({type:"error",text:"Passwords do not match."}); return; }
    if(form.newPw.length<8)                       { setMsg({type:"error",text:"Password must be at least 8 characters."}); return; }
    setMsg({type:"success",text:"Password updated successfully!"}); setForm({current:"",newPw:"",confirm:""});
  }

  const inp = { width:"100%",background:"#ffffff",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box" };
  const lbl = { fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6 };

  return (
    <SCard title="🔒 Change Password" sub="Update your account password" g={G.indigo} style={{ maxWidth:480 }}>
      {msg && (
        <div style={{ background:msg.type==="success"?`${C.green}12`:`${C.red}12`,border:`1px solid ${msg.type==="success"?C.green:C.red}`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:msg.type==="success"?C.green:C.red,marginBottom:14 }}>
          {msg.type==="success"?"✅":"❌"} {msg.text}
        </div>
      )}
      <div style={{ marginBottom:14 }}><label style={lbl}>Current Password</label><input type="password" placeholder="••••••••" value={form.current} onChange={e=>setForm(f=>({...f,current:e.target.value}))} style={inp} /></div>
      <div style={{ marginBottom:14 }}><label style={lbl}>New Password</label><input type="password" placeholder="••••••••" value={form.newPw} onChange={e=>setForm(f=>({...f,newPw:e.target.value}))} style={inp} /></div>
      <div style={{ marginBottom:20 }}><label style={lbl}>Confirm New Password</label><input type="password" placeholder="••••••••" value={form.confirm} onChange={e=>setForm(f=>({...f,confirm:e.target.value}))} style={inp} /></div>
      <button onClick={handleSave} style={{ padding:"11px 28px",borderRadius:8,background:C.indigo,color:"#fff",fontWeight:700,fontSize:14,border:"none",cursor:"pointer" }}>Save Changes</button>
    </SCard>
  );
}

/* ── Paramedic shell ── */
const PA_TABS = [
  { id:"dashboard", label:"Dashboard"       },
  { id:"schedule",  label:"Monthly Schedule"},
  { id:"leave",     label:"Apply for Leave" },
  { id:"profile",   label:"Profile"         },
  { id:"settings",  label:"Settings"        },
];

function ParamedicShell({ onLogout }) {
  const [tab,setTab] = useState("dashboard");
  const [showSignOut,setShowSignOut] = useState(false);

  function renderContent() {
    if(tab==="dashboard") return <PaDashboardTab staff={MOCK_STAFF} />;
    if(tab==="schedule")  return <PaScheduleTab />;
    if(tab==="profile")   return <PaProfileTab staff={MOCK_STAFF} />;
    if(tab==="settings")  return <PaSettingsTab />;
    if(tab==="leave") return (
      <SCard title="💬 Apply for Leave via WhatsApp" sub="EFAR uses a WhatsApp bot for leave applications" g={G.indigo}>
        <div style={{ textAlign:"center",padding:"28px 0" }}>
          <div style={{ fontSize:48,marginBottom:16 }}>💬</div>
          <div style={{ fontSize:15,fontWeight:700,color:C.text,marginBottom:8 }}>Submit leave via WhatsApp</div>
          <div style={{ fontSize:13,color:C.muted,maxWidth:360,margin:"0 auto",lineHeight:1.7,marginBottom:24 }}>
            Open WhatsApp and type <strong>leave</strong> to the EFAR Operations Bot. The bot will guide you through the application step by step.
          </div>
          <a href="https://wa.me/15556435278" target="_blank" rel="noreferrer"
            style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",borderRadius:10,background:C.indigo,color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none" }}>
            💬 Open WhatsApp
          </a>
        </div>
      </SCard>
    );
  }

  const titles = { dashboard:"My Dashboard",schedule:"Monthly Schedule",leave:"Apply for Leave",profile:"My Profile",settings:"Settings" };
  const subs   = { dashboard:"Your shifts, stats, and upcoming schedule",schedule:"View your monthly roster and shift details",leave:"Submit leave applications via WhatsApp",profile:"Your employment details and contact information",settings:"Manage your account and password" };

  return (
    <div style={{ display:"flex",height:"100vh",background:C.bg,fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text,overflow:"hidden" }} onClick={()=>setShowSignOut(false)}>
      <div style={{ width:220,background:C.sidebar,display:"flex",flexDirection:"column",flexShrink:0 }}>
        <div style={{ padding:"18px 16px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.15)",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
          </div>
          <div style={{ fontSize:13,fontWeight:700,color:"#ffffff",lineHeight:1.2 }}>{MOCK_STAFF.name}</div>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.4)",marginTop:2 }}>{MOCK_STAFF.role} · {MOCK_STAFF.station}</div>
        </div>
        <nav style={{ flex:1,padding:"10px 8px" }}>
          {PA_TABS.map(t=>(
            <div key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex",alignItems:"center",padding:"9px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,background:tab===t.id?"rgba(255,255,255,0.12)":"transparent",color:tab===t.id?"#ffffff":"rgba(255,255,255,0.5)",fontWeight:tab===t.id?700:400,fontSize:13,border:tab===t.id?"1px solid rgba(255,255,255,0.15)":"1px solid transparent" }}>
              {t.label}
            </div>
          ))}
        </nav>
        <div style={{ padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.25)",textAlign:"center" }}>v1.0 · EFAR Staff Portal</div>
        </div>
      </div>
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        <div style={{ background:"#ffffff",borderBottom:`1px solid ${C.border}`,padding:"0 28px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,boxShadow:shadow }}>
          <div style={{ fontSize:11,color:C.muted }}><div style={{ fontSize:10 }}>Today</div><div style={{ fontWeight:600,color:C.sub }}>Mon, Jun 30</div></div>
          <div style={{ position:"relative" }} onClick={e=>{ e.stopPropagation(); setShowSignOut(v=>!v); }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"4px 6px",borderRadius:8 }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12,fontWeight:600,color:C.text }}>{MOCK_STAFF.name}</div>
                <div style={{ fontSize:10,color:C.muted }}>{MOCK_STAFF.role}</div>
              </div>
              <div style={{ width:34,height:34,borderRadius:"50%",background:C.indigo,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"><line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/></svg>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" style={{ transition:"transform 0.15s",transform:showSignOut?"rotate(180deg)":"rotate(0deg)" }}><path d="M2 4l4 4 4-4"/></svg>
            </div>
            {showSignOut && (
              <div style={{ position:"absolute",top:"calc(100% + 6px)",right:0,background:"#ffffff",border:`1px solid ${C.border}`,borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",minWidth:160,zIndex:100,overflow:"hidden" }}>
                <div style={{ padding:"10px 14px 6px",borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:11,fontWeight:600,color:C.text }}>{MOCK_STAFF.name}</div>
                  <div style={{ fontSize:10,color:C.muted }}>{MOCK_STAFF.role}</div>
                </div>
                <div style={{ padding:"6px" }}>
                  <button onClick={onLogout} style={{ width:"100%",padding:"8px 10px",borderRadius:7,border:"none",background:"transparent",color:"#e53e3e",fontSize:12,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:7,textAlign:"left" }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"/><path d="M11 11l3-3-3-3"/><path d="M14 8H6"/></svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ flex:1,overflowY:"auto",padding:"28px 32px",background:C.bg }}>
          <div style={{ fontSize:24,fontWeight:800,color:C.text,marginBottom:4 }}>{titles[tab]}</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:24 }}>{subs[tab]}</div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   APP ROOT
   ═══════════════════════════════ */
export default function App() {
  const [view,setView]=useState("public");
  const [section,setSection]=useState("home");
  const [role,setRole]=useState("director");

  const scroll = (id) => {
    setSection(id);
    setTimeout(()=>document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }),50);
  };

  if(view==="login")     return <LoginPage onLogin={(r)=>{ setRole(r); setView("dashboard"); }} onBack={()=>setView("public")} />;
  if(view==="dashboard") return role==="paramedic"
    ? <ParamedicShell onLogout={()=>setView("public")} />
    : <DashboardShell onLogout={()=>setView("public")} />;

  return (
    <div style={{ background:C.bg,minHeight:"100vh",fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text }}>
      <PublicNav active={section} onNav={scroll} onLoginClick={()=>setView("login")} />
      <div style={{ maxWidth:960,margin:"0 auto",padding:"0 32px" }}>
        <section id="home" style={{ paddingTop:40 }}>
          <Hero /><StatsBar /><ServicesGrid /><WhyUs /><CtaStrip />
        </section>
        <section id="about" style={{ paddingTop:20 }}>
          <div style={{ fontSize:26,fontWeight:800,color:C.text,marginBottom:4 }}>About Us</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:24 }}>Our mission, values, and what drives us</div>
          <AboutPage />
        </section>
        <section id="contact" style={{ paddingTop:20,paddingBottom:60 }}>
          <div style={{ fontSize:26,fontWeight:800,color:C.text,marginBottom:4 }}>Contact Us</div>
          <div style={{ fontSize:12.5,color:C.muted,marginBottom:24 }}>Get in touch with our team — we're here to help</div>
          <ContactPage />
        </section>
      </div>
      <EFARChatbot />
    </div>
  );
}
