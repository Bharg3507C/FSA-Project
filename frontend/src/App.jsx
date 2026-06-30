import { useState, useEffect } from "react";
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
function ContactPage() {
  const [form,setForm]=useState({name:"",email:"",phone:"",subject:"",message:""});
  const [sent,setSent]=useState(false);
  const inp={width:"100%",background:"#ffffff",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",color:C.text,fontSize:13,outline:"none",boxSizing:"border-box"};
  const lbl={fontSize:11.5,fontWeight:500,color:C.sub,display:"block",marginBottom:6};
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
        <SCard title="✉️ Send Us a Message" sub="We'll get back to you as soon as possible" g={G.indigo}>
          {sent ? (
            <div style={{ textAlign:"center",padding:"28px 0" }}>
              <div style={{ fontSize:40,marginBottom:12 }}>✅</div>
              <div style={{ fontSize:16,fontWeight:700,color:C.text,marginBottom:6 }}>Message Sent!</div>
              <div style={{ fontSize:13,color:C.muted,marginBottom:18 }}>We'll be in touch shortly.</div>
              <button onClick={()=>{ setSent(false); setForm({name:"",email:"",phone:"",subject:"",message:""}); }} style={{ padding:"9px 22px",borderRadius:8,background:C.indigo,color:"#fff",fontWeight:600,fontSize:13,border:"none",cursor:"pointer" }}>Send Another</button>
            </div>
          ) : (
            <>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div><label style={lbl}>Full Name</label><input placeholder="Jane Tan" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inp} /></div>
                <div><label style={lbl}>Email</label><input type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={inp} /></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <div><label style={lbl}>Phone</label><input placeholder="+65 9XXX XXXX" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} style={inp} /></div>
                <div>
                  <label style={lbl}>Subject</label>
                  <select value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} style={{ ...inp,cursor:"pointer",background:"#ffffff" }}>
                    <option value="">Select a topic...</option>
                    <option>Ambulance Services</option><option>First Aid Training</option>
                    <option>Event Medical Coverage</option><option>Corporate / Medical Standby</option>
                    <option>General Enquiry</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Message</label>
                <textarea rows={4} placeholder="Tell us how we can help..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} style={{ ...inp,resize:"vertical",lineHeight:1.6 }} />
              </div>
              <button onClick={()=>setSent(true)} style={{ width:"100%",padding:"11px",borderRadius:8,background:C.indigo,color:"#fff",fontWeight:700,fontSize:14,border:"none",cursor:"pointer" }}>Send Message →</button>
            </>
          )}
        </SCard>
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
            <div style={{ width:36,height:36,borderRadius:"50%",background:"#6366f1",flexShrink:0 }} />
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
          <button onClick={onLogin} style={{ width:"100%",padding:"13px",borderRadius:10,background:"#6366f1",color:"#fff",fontWeight:600,fontSize:14,border:"none",cursor:"pointer",marginBottom:12 }}>
            Sign In as Paramedic / Driver
          </button>
          <button onClick={onLogin} style={{ width:"100%",padding:"13px",borderRadius:10,background:"transparent",color:"#6366f1",fontWeight:600,fontSize:14,border:"2px solid #6366f1",cursor:"pointer" }}>
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
  const content = { dashboard:<DashboardTab/>,scheduler:<SchedulerTab/>,roster:<RosterTab/>,leave:<LeaveTab/>,conflicts:<ConflictsTab/>,employees:<EmployeesTab/> };
  const titles  = { dashboard:"Workforce Dashboard",scheduler:"Auto Scheduler",roster:"Roster Management",leave:"Leave Management",conflicts:"Conflict Detection",employees:"Employee Database" };
  const subs    = { dashboard:"Real-time ambulance manpower visibility and roster coverage",scheduler:"AI-powered shift scheduling based on availability and demand",roster:"Manage weekly and monthly staff rosters",leave:"Manage leave applications via WhatsApp",conflicts:"Auto-detected scheduling conflicts requiring attention",employees:"Staff profiles, certifications and employment records" };

  return (
    <div style={{ display:"flex",height:"100vh",background:C.bg,fontFamily:"'Inter','Segoe UI',sans-serif",color:C.text,overflow:"hidden" }}>
      {/* SIDEBAR — dark indigo matching login left panel */}
      <div style={{ width:220,background:C.sidebar,display:"flex",flexDirection:"column",flexShrink:0 }}>
        <div style={{ padding:"18px 16px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,0.15)",marginBottom:8 }} />
          <div style={{ fontSize:13.5,fontWeight:700,color:"#ffffff",lineHeight:1.2 }}>MediFlow</div>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.4)",marginTop:2 }}>Emergencies F&amp;R</div>
        </div>
        <nav style={{ flex:1,padding:"10px 8px" }}>
          {TABS.map(t=>(
            <div key={t.id} onClick={()=>setTab(t.id)} style={{ display:"flex",alignItems:"center",padding:"9px 12px",borderRadius:8,cursor:"pointer",marginBottom:2,background:tab===t.id?"rgba(255,255,255,0.12)":"transparent",color:tab===t.id?"#ffffff":"rgba(255,255,255,0.5)",fontWeight:tab===t.id?600:400,fontSize:13,border:tab===t.id?"1px solid rgba(255,255,255,0.15)":"1px solid transparent",transition:"all 0.15s" }}>
              {t.label}
            </div>
          ))}
        </nav>
        <div style={{ padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={onLogout} style={{ width:"100%",padding:"9px",borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.5)",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}>
            ← Log Out
          </button>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.25)",marginTop:8,textAlign:"center" }}>v1.0 · emergencies.com.sg</div>
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
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:12,fontWeight:600,color:C.text }}>MediFlow</div>
              <div style={{ fontSize:10,color:C.muted }}>Operations Director</div>
            </div>
            <div style={{ width:34,height:34,borderRadius:"50%",background:C.indigo }} />
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
          <div style={{ width:36,height:36,borderRadius:"50%",background:C.indigo }} />
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
   APP ROOT
   ═══════════════════════════════ */
export default function App() {
  const [view,setView]=useState("public");
  const [section,setSection]=useState("home");

  const scroll = (id) => {
    setSection(id);
    setTimeout(()=>document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }),50);
  };

  if(view==="login")     return <LoginPage onLogin={()=>setView("dashboard")} onBack={()=>setView("public")} />;
  if(view==="dashboard") return <DashboardShell onLogout={()=>setView("public")} />;

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
    </div>
  );
}
