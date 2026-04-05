import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM — RideAssure
   Direction: Swiss Luxury Automotive
   Inspired by: Porsche Connect, Mercedes me, Rolls-Royce App
   
   Color Science:
   - Base: Deep teal-black (#0C1B1F) as canvas
   - Primary: Rich teal (#1B6B6D → #247B7D) for trust & safety  
   - Accent: Warm antique brass (#BFA365) for premium touch
   - Semantic: Malachite green for success, Vermillion for alerts
   - Neutrals: Cool-warm balanced grays with slight teal undertone
   ═══════════════════════════════════════════════════════════════ */

const C = {
  // Canvas & Surfaces
  canvas: "#0C1B1F",
  surface1: "#112428",
  surface2: "#162D32",
  surface3: "#1C373C",
  surfaceElevated: "#1E3D43",
  
  // Primary Teal
  teal700: "#145455",
  teal600: "#1B6B6D",
  teal500: "#247B7D",
  teal400: "#2E9496",
  teal300: "#4DB8B9",
  tealGlow: "rgba(36,123,125,0.15)",
  tealBorder: "rgba(36,123,125,0.22)",
  
  // Accent — Antique Brass / Warm Gold  
  brass600: "#A08940",
  brass500: "#BFA365",
  brass400: "#D1B87A",
  brass300: "#E0CC96",
  brass200: "#EDE0B8",
  brassGlow: "rgba(191,163,101,0.12)",
  brassBorder: "rgba(191,163,101,0.20)",
  
  // Semantic
  malachite: "#36B37E",
  malachiteBg: "rgba(54,179,126,0.08)",
  malachiteBorder: "rgba(54,179,126,0.18)",
  vermillion: "#E5503C",
  vermillionBg: "rgba(229,80,60,0.08)",
  vermillionBorder: "rgba(229,80,60,0.20)",
  
  // Neutrals (teal-undertone)
  white: "#F4F6F7",
  gray100: "#D8DFE2",
  gray200: "#B0BCC2",
  gray300: "#8A9BA3",
  gray400: "#667A84",
  gray500: "#4A5E67",
  gray600: "#344950",
  
  // Tier
  tierSilver: "#9AABB5",
  tierGoldBrass: "#BFA365",
  tierElite: "#D6C48A",
  
  // Borders
  borderSubtle: "rgba(255,255,255,0.04)",
  borderLight: "rgba(255,255,255,0.07)",
  borderMedium: "rgba(255,255,255,0.10)",
};

const BODY = `'Manrope', sans-serif`;
const HEAD = `'Cormorant Garamond', serif`;

/* ─── Shared UI Primitives ─── */

const Phone = ({ children }) => (
  <div style={{
    width: 393, height: 852, background: C.canvas, borderRadius: 48,
    border: "5px solid #1A2428", position: "relative", overflow: "hidden",
    boxShadow: `
      0 50px 100px -20px rgba(0,0,0,0.7),
      0 30px 60px -30px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(255,255,255,0.05),
      inset 0 -1px 0 rgba(0,0,0,0.3)
    `,
    display: "flex", flexDirection: "column",
  }}>
    {/* Dynamic Island */}
    <div style={{
      position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
      width: 120, height: 36, background: "#000", borderRadius: 20, zIndex: 99,
    }} />
    {/* Home Indicator */}
    <div style={{
      position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
      width: 134, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.12)", zIndex: 99,
    }} />
    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>{children}</div>
  </div>
);

const Bar = () => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "52px 30px 10px", fontFamily: BODY, fontSize: 14, fontWeight: 700,
    color: C.white, letterSpacing: "0.2px",
  }}>
    <span>9:41</span>
    <div style={{ display: "flex", gap: 6, alignItems: "center", opacity: 0.7 }}>
      <svg width="17" height="12" viewBox="0 0 17 12"><rect y="5" width="3" height="7" rx="1" fill="#fff"/><rect x="5" y="3" width="3" height="9" rx="1" fill="#fff"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#fff"/><rect x="15" y="5" width="2" height="7" rx="0.5" fill="#fff" opacity=".3"/></svg>
      <svg width="22" height="12" viewBox="0 0 22 12"><rect x=".5" y=".5" width="18" height="11" rx="2.5" stroke="#fff" strokeWidth=".8" fill="none"/><rect x="19.5" y="3.5" width="1.5" height="5" rx=".75" fill="#fff" opacity=".4"/><rect x="2" y="2" width="13" height="8" rx="1.2" fill={C.malachite}/></svg>
    </div>
  </div>
);

const TabBar = ({ active, go }) => {
  const tabs = [
    { id:"home", label:"Home", d:"M3 9.5l9-7 9 7V20a2 2 0 01-2 2H5a2 2 0 01-2-2V9.5z|M9 22V12h6v10" },
    { id:"history", label:"Activity", d:"M12 2a10 10 0 100 20 10 10 0 000-20z|M12 6v6l4 2" },
    { id:"safety", label:"Safety", d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { id:"profile", label:"Account", d:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2|M12 3a4 4 0 100 8 4 4 0 000-8z" },
  ];
  return (
    <div style={{
      display: "flex", background: C.surface1,
      borderTop: `1px solid ${C.borderSubtle}`, paddingBottom: 20, paddingTop: 6,
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => go(t.id)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 0",
          }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none"
              stroke={isActive ? C.brass500 : C.gray400} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {t.d.split("|").map((p,i) => <path key={i} d={p}/>)}
            </svg>
            <span style={{
              fontSize: 10, fontWeight: isActive ? 700 : 500, letterSpacing: "0.4px",
              color: isActive ? C.brass500 : C.gray400, fontFamily: BODY,
            }}>{t.label}</span>
            {isActive && <div style={{
              width: 4, height: 4, borderRadius: 2, background: C.brass500, marginTop: -1,
            }}/>}
          </button>
        );
      })}
    </div>
  );
};

const Chip = ({ children, active, gold, onClick }) => (
  <button onClick={onClick} style={{
    padding: "7px 15px", borderRadius: 100, whiteSpace: "nowrap",
    background: gold ? C.brassGlow : active ? C.tealGlow : "transparent",
    border: `1px solid ${gold ? C.brassBorder : active ? C.tealBorder : C.borderLight}`,
    color: gold ? C.brass400 : active ? C.teal300 : C.gray300,
    fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: BODY,
    letterSpacing: "0.3px", transition: "all 0.25s ease",
  }}>{children}</button>
);

const Header = ({ title, onBack }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "6px 0 24px" }}>
    <button onClick={onBack} style={{
      width: 44, height: 44, borderRadius: 14, cursor: "pointer",
      background: C.surface2, border: `1px solid ${C.borderLight}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background 0.2s",
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gray200} strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <h1 style={{ fontSize: 24, fontWeight: 600, color: C.white, fontFamily: HEAD, letterSpacing: "0.2px" }}>{title}</h1>
  </div>
);

const IconCircle = ({ children, size = 44, bg = C.surface3, border = C.borderLight }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.36, flexShrink: 0,
    background: bg, border: `1px solid ${border}`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>{children}</div>
);

const CarIcon = ({ color = C.gray200, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 20" fill="none">
    <path d="M3 12h18v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M5 12l2.5-6h9L19 12" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="15" r="1.5" fill={color} opacity=".6"/>
    <circle cx="17" cy="15" r="1.5" fill={color} opacity=".6"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.2"/>
  </svg>
);

/* ═══════════════════════ SCREENS ═══════════════════════ */

// ── ONBOARDING ──
const Onboarding = ({ next }) => {
  const [i, setI] = useState(0);
  const slides = [
    {
      svg: <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke={C.teal400} strokeWidth="1.5" strokeDasharray="4 4"/>
        <circle cx="32" cy="32" r="20" stroke={C.teal300} strokeWidth="1" opacity=".4"/>
        <path d="M32 18v28" stroke={C.teal400} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 26l8-8 8 8" stroke={C.brass400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="50" r="2.5" fill={C.malachite}/>
      </svg>,
      h: "Guaranteed\nBooking", p: "Your ride is always confirmed. If a driver cancels, a backup is assigned within seconds.",
    },
    {
      svg: <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="12" y="28" width="40" height="18" rx="5" stroke={C.teal400} strokeWidth="1.5"/>
        <path d="M18 28l4-10h20l4 10" stroke={C.teal400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="48" r="3.5" stroke={C.brass400} strokeWidth="1.5"/>
        <circle cx="44" cy="48" r="3.5" stroke={C.brass400} strokeWidth="1.5"/>
        <path d="M28 34h8" stroke={C.teal300} strokeWidth="1" strokeLinecap="round"/>
        <circle cx="32" cy="12" r="4" stroke={C.brass400} strokeWidth="1.2"/>
        <path d="M30 12l1.5 1.5L34 11" stroke={C.brass400} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      h: "Choose Your\nDriver Tier", p: "Silver, Gold, or Elite — select the experience level and vehicle class that suits you.",
    },
    {
      svg: <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M32 8L12 18v16c0 14 20 24 20 24s20-10 20-24V18L32 8z" stroke={C.teal400} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M24 34l6 6 10-12" stroke={C.malachite} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="32" r="16" stroke={C.teal300} strokeWidth="0.8" strokeDasharray="3 3" opacity=".4"/>
      </svg>,
      h: "Your Safety\nIs Paramount", p: "Live tracking, instant SOS, trip sharing with trusted contacts, and 24/7 dedicated support.",
    },
  ];

  return (
    <Phone>
      <div style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: `radial-gradient(ellipse at 50% 30%, ${C.surface3} 0%, ${C.canvas} 70%)`,
      }}>
        <Bar />
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          padding: "0 44px", textAlign: "center",
        }}>
          <div key={i} style={{ animation: "fadeUp .5s cubic-bezier(.22,1,.36,1)" }}>
            <div style={{ marginBottom: 40 }}>{slides[i].svg}</div>
            <h1 style={{
              fontSize: 36, fontWeight: 600, color: C.white, lineHeight: 1.1,
              fontFamily: HEAD, whiteSpace: "pre-line", marginBottom: 18, letterSpacing: "-0.2px",
            }}>{slides[i].h}</h1>
            <p style={{
              fontSize: 15, lineHeight: 1.65, color: C.gray300, fontFamily: BODY,
              fontWeight: 400, maxWidth: 270, margin: "0 auto",
            }}>{slides[i].p}</p>
          </div>
        </div>
        <div style={{ padding: "0 36px 56px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {slides.map((_,j) => (
              <div key={j} style={{
                width: j === i ? 28 : 6, height: 4, borderRadius: 2,
                background: j === i ? C.brass500 : C.gray500,
                transition: "all .4s cubic-bezier(.22,1,.36,1)",
              }}/>
            ))}
          </div>
          <button onClick={() => i < 2 ? setI(i+1) : next()} style={{
            width: "100%", padding: "18px", borderRadius: 16, border: "none",
            background: i === 2 ? `linear-gradient(135deg, ${C.brass500}, ${C.brass400})` : C.surface3,
            color: i === 2 ? C.canvas : C.white, fontSize: 16, fontWeight: 700,
            cursor: "pointer", fontFamily: BODY, letterSpacing: "0.3px",
            boxShadow: i === 2 ? `0 12px 40px ${C.brass600}40` : "none",
            transition: "all .3s",
          }}>{i === 2 ? "Get Started" : "Continue"}</button>
          {i < 2 && <button onClick={next} style={{
            background: "none", border: "none", color: C.gray400, fontSize: 14,
            cursor: "pointer", fontFamily: BODY,
          }}>Skip</button>}
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </Phone>
  );
};

// ── LOGIN ──
const LoginScreen = ({ next }) => {
  const [ph, setPh] = useState("");
  const ok = ph.length === 10;
  return (
    <Phone>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: C.canvas }}>
        <Bar />
        <div style={{ padding: "20px 30px", flex: 1, fontFamily: BODY }}>
          <IconCircle size={52} bg={`linear-gradient(145deg, ${C.teal600}, ${C.teal700})`} border={C.tealBorder}>
            <CarIcon color={C.brass400} size={24} />
          </IconCircle>
          <h1 style={{
            fontSize: 30, fontWeight: 600, color: C.white, margin: "28px 0 8px",
            fontFamily: HEAD, lineHeight: 1.15, letterSpacing: "-0.3px",
          }}>Welcome to<br/><span style={{ color: C.brass400 }}>RideAssure</span></h1>
          <p style={{ fontSize: 15, color: C.gray300, marginBottom: 40, lineHeight: 1.5 }}>
            Premium chauffeur service with guaranteed bookings
          </p>
          <label style={{
            display: "block", fontSize: 11, fontWeight: 700, color: C.gray400,
            marginBottom: 10, letterSpacing: "1.2px", textTransform: "uppercase",
          }}>Phone Number</label>
          <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
            <div style={{
              padding: "16px 14px", borderRadius: 14, background: C.surface2,
              border: `1px solid ${C.borderLight}`, fontSize: 15, fontWeight: 600, color: C.white,
              display: "flex", alignItems: "center", gap: 6,
            }}>🇮🇳 +91</div>
            <input type="tel" placeholder="Enter number" value={ph}
              onChange={e => setPh(e.target.value.replace(/\D/g,"").slice(0,10))}
              style={{
                flex: 1, padding: "16px 18px", borderRadius: 14,
                background: C.surface2, border: `1.5px solid ${ok ? C.tealBorder : C.borderLight}`,
                fontSize: 18, color: C.white, fontFamily: BODY, fontWeight: 500,
                outline: "none", letterSpacing: "2.5px", transition: "border .3s",
                caretColor: C.teal400,
              }}
            />
          </div>
          <button onClick={next} style={{
            width: "100%", padding: "18px", borderRadius: 16, border: "none",
            background: ok ? `linear-gradient(135deg, ${C.teal500}, ${C.teal400})` : C.surface3,
            color: ok ? C.white : C.gray500, fontSize: 16, fontWeight: 700,
            cursor: ok ? "pointer" : "default", fontFamily: BODY,
            boxShadow: ok ? `0 10px 36px ${C.teal700}60` : "none",
            transition: "all .3s", letterSpacing: "0.3px",
          }}>Send Verification Code</button>
          <p style={{
            textAlign: "center", fontSize: 12, color: C.gray500, marginTop: 28, lineHeight: 1.7,
          }}>
            By continuing, you agree to our <span style={{ color: C.teal400, fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: C.teal400, fontWeight: 600 }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </Phone>
  );
};

// ── HOME ──
const HomeScreen = ({ onBook, onTiers, go }) => {
  const [tier, setTier] = useState("gold");
  const [nightSafe, setNightSafe] = useState(false);
  const [fam, setFam] = useState(false);

  const tiers = {
    silver: { l: "Silver", p: "₹249", eta: "4 min", c: C.tierSilver, desc: "Comfortable sedan" },
    gold: { l: "Gold", p: "₹449", eta: "6 min", c: C.tierGoldBrass, desc: "Premium sedan", pop: true },
    elite: { l: "Elite", p: "₹849", eta: "8 min", c: C.tierElite, desc: "Luxury vehicle" },
  };
  const t = tiers[tier];

  return (
    <Phone>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", background: C.canvas, fontFamily: BODY }}>
        <Bar />
        {/* Map */}
        <div style={{
          flex: 1, position: "relative", minHeight: 260,
          background: `radial-gradient(ellipse at 45% 40%, ${C.surface3}80 0%, ${C.canvas} 75%)`,
        }}>
          <svg width="100%" height="100%" style={{ position: "absolute" }}>
            <defs>
              <pattern id="mapGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0L0 0 0 48" fill="none" stroke={C.gray600} strokeWidth=".35" opacity=".5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)"/>
            {/* Roads */}
            <path d="M-10,130 Q130,125 200,190 Q270,255 400,230" stroke={C.teal700} strokeWidth="8" fill="none" opacity=".35" strokeLinecap="round"/>
            <path d="M90,-10 Q100,110 170,170 Q240,230 220,420" stroke={C.teal700} strokeWidth="6" fill="none" opacity=".28" strokeLinecap="round"/>
            <path d="M260,-10 L270,70 Q280,120 330,155 L400,185" stroke={C.teal700} strokeWidth="5" fill="none" opacity=".22" strokeLinecap="round"/>
          </svg>

          {/* Location marker */}
          <div style={{ position: "absolute", top: "42%", left: "44%", transform: "translate(-50%,-50%)" }}>
            <div style={{
              position: "absolute", top: -30, left: -30, width: 76, height: 76, borderRadius: "50%",
              border: `1.5px solid ${C.teal400}30`,
              animation: "ping 2.5s cubic-bezier(0,.5,.5,1) infinite",
            }}/>
            <div style={{
              width: 18, height: 18, borderRadius: "50%", position: "relative", zIndex: 2,
              background: C.teal400, border: `3px solid ${C.white}`,
              boxShadow: `0 0 0 5px ${C.teal400}20, 0 3px 16px ${C.teal400}50`,
            }}/>
          </div>

          {/* Driver dots */}
          {[[75,20],[88,50],[25,55],[65,75],[12,32]].map(([l,tp],j) => (
            <div key={j} style={{
              position: "absolute", left: `${l}%`, top: `${tp}%`,
              width: 8, height: 8, borderRadius: "50%",
              background: C.brass500, opacity: 0.45 + j*0.08,
              boxShadow: `0 0 6px ${C.brass500}40`,
            }}/>
          ))}

          {/* Top bar */}
          <div style={{ position: "absolute", top: 8, left: 20, right: 20, display: "flex", gap: 10, zIndex: 10 }}>
            <button onClick={() => go("profile")} style={{
              width: 48, height: 48, borderRadius: 16, cursor: "pointer",
              background: `${C.surface1}E8`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${C.borderLight}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gray200} strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 6h16M4 12h12M4 18h16"/>
              </svg>
            </button>
            <div style={{
              flex: 1, padding: "14px 18px", borderRadius: 16,
              background: `${C.surface1}E8`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${C.borderLight}`,
              display: "flex", alignItems: "center", gap: 12,
              color: C.gray300, fontSize: 15, fontWeight: 500,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
              Where to?
            </div>
          </div>
        </div>

        {/* Panel */}
        <div style={{
          background: C.surface1, borderRadius: "28px 28px 0 0",
          padding: "22px 22px 0", marginTop: -28, position: "relative", zIndex: 10,
          borderTop: `1px solid ${C.borderSubtle}`,
        }}>
          {/* Service chips */}
          <div style={{ display: "flex", gap: 6, marginBottom: 18, overflowX: "auto", paddingBottom: 2 }}>
            <Chip active={nightSafe} onClick={() => setNightSafe(!nightSafe)}>☽ Night Safe</Chip>
            <Chip active={fam} onClick={() => setFam(!fam)}>◇ Family</Chip>
            <Chip>♀ Women-Only</Chip>
            <Chip gold>★ My Driver</Chip>
          </div>

          {/* Tiers */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {Object.entries(tiers).map(([k,v]) => {
              const sel = tier === k;
              return (
                <button key={k} onClick={() => setTier(k)} style={{
                  flex: 1, padding: "18px 6px 16px", borderRadius: 18, cursor: "pointer",
                  background: sel ? `linear-gradient(180deg, ${v.c}10, transparent)` : C.surface2,
                  border: `1.5px solid ${sel ? `${v.c}30` : "transparent"}`,
                  textAlign: "center", transition: "all .25s", position: "relative", fontFamily: BODY,
                }}>
                  {v.pop && sel && (
                    <div style={{
                      position: "absolute", top: -7, left: "50%", transform: "translateX(-50%)",
                      padding: "2px 9px", borderRadius: 5, fontSize: 8, fontWeight: 800,
                      background: C.brass500, color: C.canvas, letterSpacing: "0.8px",
                    }}>POPULAR</div>
                  )}
                  <CarIcon color={sel ? v.c : C.gray500} size={24} />
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: sel ? v.c : C.gray500,
                    letterSpacing: "1px", textTransform: "uppercase", margin: "8px 0 4px",
                  }}>{v.l}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: sel ? C.white : C.gray500 }}>{v.p}</div>
                  <div style={{ fontSize: 10, color: C.gray400, marginTop: 4 }}>{v.eta} away</div>
                </button>
              );
            })}
          </div>

          <button onClick={onTiers} style={{
            width: "100%", padding: "11px", borderRadius: 10, marginBottom: 14,
            background: "transparent", border: `1px solid ${C.borderLight}`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            cursor: "pointer", fontFamily: BODY,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.c }}>{t.l}</span>
            <span style={{ fontSize: 12, color: C.gray400 }}>— {t.desc}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Price */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 20px", borderRadius: 16, marginBottom: 16,
            background: C.tealGlow, border: `1px solid ${C.tealBorder}`,
          }}>
            <div>
              <div style={{ fontSize: 10, color: C.teal300, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 4 }}>
                Fixed Price · No Surge
              </div>
              <div style={{ fontSize: 30, fontWeight: 700, color: C.white, fontFamily: HEAD, letterSpacing: "-0.5px" }}>
                {t.p}
              </div>
            </div>
            <div style={{
              padding: "5px 12px", borderRadius: 8,
              background: C.malachiteBg, border: `1px solid ${C.malachiteBorder}`,
              color: C.malachite, fontSize: 10, fontWeight: 800, letterSpacing: "0.8px",
            }}>✓ GUARANTEED</div>
          </div>

          <button onClick={onBook} style={{
            width: "100%", padding: "19px", borderRadius: 16, border: "none",
            background: `linear-gradient(135deg, ${C.teal500}, ${C.teal400})`,
            color: C.white, fontSize: 17, fontWeight: 700, cursor: "pointer",
            fontFamily: BODY, letterSpacing: "0.4px",
            boxShadow: `0 12px 40px ${C.teal700}50`,
          }}>Book Now</button>
        </div>
        <TabBar active="home" go={go} />
      </div>
      <style>{`@keyframes ping{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.2);opacity:0}}`}</style>
    </Phone>
  );
};

// ── TIER COMPARISON ──
const TierScreen = ({ back }) => {
  const tiers = [
    { n:"Silver", c:C.tierSilver, p:"From ₹249", f:["Comfortable sedan","Trained & verified driver","AC guaranteed","Standard insurance","GPS tracking"] },
    { n:"Gold", c:C.tierGoldBrass, p:"From ₹449", pop:true, f:["Premium sedan (Honda City class)","Certified professional chauffeur","Complimentary water & mints","Comprehensive insurance","Priority 24/7 support"] },
    { n:"Elite", c:C.tierElite, p:"From ₹849", f:["Luxury vehicle (BMW / Mercedes)","Elite-trained personal chauffeur","Refreshments, Wi-Fi & newspaper","Premium insurance coverage","Dedicated concierge line"] },
  ];
  return (
    <Phone><div style={{ minHeight: "100%", background: C.canvas, fontFamily: BODY }}>
      <Bar /><div style={{ padding: "4px 24px 30px" }}>
        <Header title="Driver Tiers" onBack={back} />
        {tiers.map((t,i) => (
          <div key={i} style={{
            padding: "22px", borderRadius: 20, marginBottom: 12, position: "relative",
            background: C.surface1, border: `1px solid ${t.pop ? `${C.brass500}20` : C.borderSubtle}`,
          }}>
            {t.pop && <div style={{
              position: "absolute", top: -8, right: 20, padding: "3px 10px", borderRadius: 6,
              background: C.brass500, color: C.canvas, fontSize: 9, fontWeight: 800, letterSpacing: "1px",
            }}>MOST POPULAR</div>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, color: t.c, fontFamily: HEAD }}>{t.n}</div>
                <div style={{ fontSize: 12, color: C.gray400, marginTop: 3 }}>{t.p}</div>
              </div>
              <CarIcon color={t.c} size={28} />
            </div>
            {t.f.map((f,j) => (
              <div key={j} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                fontSize: 13, color: C.gray200, fontWeight: 400,
                borderTop: j===0 ? `1px solid ${C.borderSubtle}` : "none",
                paddingTop: j===0 ? 16 : 8,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.malachite} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                {f}
              </div>
            ))}
          </div>
        ))}
      </div></div></Phone>
  );
};

// ── BOOKING CONFIRMED ──
const BookingScreen = ({ onTrack, back }) => {
  const [sec, setSec] = useState(120);
  useEffect(() => { const t = setInterval(() => setSec(s => s > 0 ? s-1 : 0), 1000); return () => clearInterval(t); }, []);

  return (
    <Phone><div style={{ height: "100%", background: C.canvas, fontFamily: BODY, display: "flex", flexDirection: "column" }}>
      <Bar /><div style={{ padding: "4px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <Header title="Ride Confirmed" onBack={back} />
        
        {/* Guaranteed */}
        <div style={{
          padding: "16px 20px", borderRadius: 16, marginBottom: 18,
          background: C.malachiteBg, border: `1px solid ${C.malachiteBorder}`,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <IconCircle size={46} bg={`${C.malachite}12`} border={C.malachiteBorder}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.malachite} strokeWidth="1.8" strokeLinejoin="round">
              <path d="M12 2l-8 4v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z"/>
              <path d="M9 12l2 2 4-4" stroke={C.malachite} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </IconCircle>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.malachite }}>Guaranteed — Backup Ready</div>
            <div style={{ fontSize: 12, color: C.gray300, marginTop: 3 }}>Auto-reassignment if driver cancels</div>
          </div>
        </div>

        {/* Driver */}
        <div style={{
          padding: "22px", borderRadius: 20, background: C.surface1,
          border: `1px solid ${C.borderSubtle}`, marginBottom: 14,
        }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <IconCircle size={56} bg={`linear-gradient(145deg, ${C.teal600}, ${C.teal700})`} border={C.tealBorder}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.brass400} strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="8" r="4"/><path d="M4 21v-2a6 6 0 0112 0v2"/>
              </svg>
            </IconCircle>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: C.white, fontFamily: HEAD }}>Rajesh Kumar</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <span style={{ color: C.brass400, fontSize: 13, fontWeight: 700 }}>★ 4.9</span>
                <div style={{
                  padding: "2px 8px", borderRadius: 5, fontSize: 9, fontWeight: 800, letterSpacing: "0.8px",
                  background: `${C.tierGoldBrass}15`, border: `1px solid ${C.tierGoldBrass}25`, color: C.tierGoldBrass,
                }}>GOLD</div>
                <span style={{ fontSize: 11, color: C.gray400 }}>2,340 rides</span>
              </div>
            </div>
          </div>
          <div style={{
            display: "flex", borderRadius: 14, overflow: "hidden",
            background: C.surface2, border: `1px solid ${C.borderSubtle}`,
          }}>
            {[{l:"Vehicle",v:"Honda City"},{l:"Plate",v:"TN 45 AB 1234"},{l:"ETA",v:"6 min",g:true}].map((d,i) => (
              <div key={i} style={{
                flex: 1, textAlign: "center", padding: "14px 4px",
                borderRight: i<2 ? `1px solid ${C.borderSubtle}` : "none",
              }}>
                <div style={{ fontSize: 10, color: C.gray400, marginBottom: 4, letterSpacing: "0.5px", textTransform: "uppercase" }}>{d.l}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: d.g ? C.malachite : C.white }}>{d.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 20px", borderRadius: 14,
          background: C.surface1, border: `1px solid ${C.borderSubtle}`, marginBottom: 12,
        }}>
          <div>
            <div style={{ fontSize: 10, color: C.gray400, letterSpacing: "1px", textTransform: "uppercase" }}>Fixed Price</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.white, fontFamily: HEAD }}>₹449</div>
          </div>
          <div style={{ padding: "5px 12px", borderRadius: 8, background: C.tealGlow, border: `1px solid ${C.tealBorder}`, color: C.teal300, fontSize: 11, fontWeight: 700 }}>No surge</div>
        </div>

        {/* Timer */}
        <div style={{ textAlign: "center", padding: "10px", borderRadius: 10, background: C.surface2, marginBottom: 18 }}>
          <span style={{ fontSize: 12, color: C.gray400 }}>Free cancellation: </span>
          <span style={{ fontSize: 15, fontWeight: 700, fontFamily: BODY, color: sec > 60 ? C.malachite : C.vermillion }}>
            {Math.floor(sec/60)}:{(sec%60).toString().padStart(2,"0")}
          </span>
        </div>

        <div style={{ marginTop: "auto", paddingBottom: 20 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <button style={{
              flex: 1, padding: "16px", borderRadius: 14, background: C.surface2,
              border: `1px solid ${C.borderLight}`, color: C.white, fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: BODY, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.teal400} strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0111.19 18.93 19.5 19.5 0 015.19 12.93 19.79 19.79 0 012.12 4.26 2 2 0 014.11 2h3a2 2 0 012 1.72"/></svg>
              Call
            </button>
            <button onClick={onTrack} style={{
              flex: 2, padding: "16px", borderRadius: 14, border: "none",
              background: `linear-gradient(135deg, ${C.teal500}, ${C.teal400})`,
              color: C.white, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: BODY,
              boxShadow: `0 8px 28px ${C.teal700}50`,
            }}>Track Driver →</button>
          </div>
          <button onClick={back} style={{
            width: "100%", padding: "14px", borderRadius: 12,
            background: "transparent", border: `1px solid ${C.vermillionBorder}`,
            color: C.vermillion, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: BODY,
          }}>Cancel Ride</button>
        </div>
      </div></div></Phone>
  );
};

// ── LIVE TRACKING ──
const TrackingScreen = ({ onDone, back, goSafety }) => {
  const [phase, setPhase] = useState(0);
  const [share, setShare] = useState(false);
  return (
    <Phone><div style={{ height: "100%", background: C.canvas, fontFamily: BODY, display: "flex", flexDirection: "column" }}>
      <Bar />
      <div style={{
        flex: 1, position: "relative",
        background: `radial-gradient(ellipse at 60% 35%, ${C.surface3}70 0%, ${C.canvas} 80%)`,
      }}>
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <defs><pattern id="tg2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0L0 0 0 40" fill="none" stroke={C.gray600} strokeWidth=".3" opacity=".4"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#tg2)"/>
          <path d="M55,330 Q130,250 200,210 Q280,170 320,100 T370,35" stroke={C.teal400} strokeWidth="3" fill="none" strokeDasharray="8 5" opacity=".45" strokeLinecap="round"/>
          <circle cx="55" cy="330" r="6" fill={C.teal400} opacity=".7"/><circle cx="55" cy="330" r="11" fill="none" stroke={C.teal400} strokeWidth="1" opacity=".25"/>
          <circle cx="370" cy="35" r="6" fill={C.brass500} opacity=".7"/><circle cx="370" cy="35" r="11" fill="none" stroke={C.brass500} strokeWidth="1" opacity=".25"/>
        </svg>
        <div style={{
          position: "absolute", top: phase===0?"44%":"32%", left: "52%",
          transition: "top 1.5s cubic-bezier(.22,1,.36,1)", transform: "rotate(-28deg)",
        }}>
          <CarIcon color={C.brass400} size={26} />
        </div>

        {/* Status bar */}
        <div style={{
          position: "absolute", top: 8, left: 20, right: 20,
          padding: "14px 18px", borderRadius: 18,
          background: `${C.surface1}E8`, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${C.borderLight}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={back} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gray200} strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.gray400, fontWeight: 500 }}>{phase===0?"Driver arriving in":"Arriving at destination"}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.white, fontFamily: HEAD }}>{phase===0?"3 min":"18 min"}</div>
          </div>
          <div style={{
            padding: "4px 10px", borderRadius: 8,
            background: C.malachiteBg, border: `1px solid ${C.malachiteBorder}`,
            color: C.malachite, fontSize: 10, fontWeight: 800, letterSpacing: "0.6px",
          }}>LIVE</div>
        </div>

        {/* SOS */}
        <button onClick={goSafety} style={{
          position: "absolute", bottom: 32, right: 22,
          width: 70, height: 70, borderRadius: "50%",
          background: `linear-gradient(145deg, ${C.vermillion}, #C93E2E)`,
          border: `3px solid rgba(255,255,255,0.2)`,
          color: C.white, fontSize: 15, fontWeight: 900, letterSpacing: "1.5px",
          cursor: "pointer", fontFamily: BODY,
          boxShadow: `0 8px 28px ${C.vermillion}45, 0 0 0 8px ${C.vermillion}12`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>SOS</button>
      </div>

      <div style={{
        background: C.surface1, borderRadius: "28px 28px 0 0",
        padding: "16px 22px 24px", marginTop: -28, position: "relative", zIndex: 10,
        borderTop: `1px solid ${C.borderSubtle}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 14 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.malachite} strokeWidth="2"><path d="M12 2l-8 4v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V6l-8-4z"/></svg>
          <span style={{ fontSize: 11, color: C.malachite, fontWeight: 700, letterSpacing: "0.4px" }}>Guaranteed — Backup Ready</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
          borderRadius: 16, background: C.surface2, border: `1px solid ${C.borderSubtle}`, marginBottom: 14,
        }}>
          <IconCircle size={48} bg={`linear-gradient(145deg, ${C.teal600}, ${C.teal700})`} border={C.tealBorder}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.brass400} strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a6 6 0 0112 0v2"/></svg>
          </IconCircle>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>Rajesh Kumar</div>
            <div style={{ fontSize: 12, color: C.gray400 }}>Honda City · TN 45 AB 1234</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["M22 16.92v3a2 2 0 01-2.18 2","M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"].map((d,i) => (
              <button key={i} style={{
                width: 40, height: 40, borderRadius: 12,
                background: C.tealGlow, border: `1px solid ${C.tealBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.teal400} strokeWidth="1.8"><path d={d}/></svg>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setShare(!share)} style={{
            flex: 1, padding: "14px", borderRadius: 14, background: C.surface2, border: `1px solid ${C.borderLight}`,
            color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: BODY,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal400} strokeWidth="2" strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            Share Trip
          </button>
          <button style={{
            flex: 1, padding: "14px", borderRadius: 14, background: C.surface2, border: `1px solid ${C.borderLight}`,
            color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: BODY,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal400} strokeWidth="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/></svg>
            Support
          </button>
        </div>
        <button onClick={() => phase===0 ? setPhase(1) : onDone()} style={{
          width: "100%", padding: "17px", borderRadius: 14, border: "none",
          background: phase===0 ? C.surface3 : `linear-gradient(135deg, ${C.brass500}, ${C.brass400})`,
          color: phase===0 ? C.white : C.canvas,
          fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: BODY,
          boxShadow: phase !== 0 ? `0 8px 28px ${C.brass600}35` : "none",
        }}>{phase===0 ? "Simulate: Driver Arrived →" : "Simulate: Complete Ride →"}</button>
      </div>
    </div></Phone>
  );
};

// ── RIDE COMPLETE ──
const CompleteScreen = ({ done }) => {
  const [r, setR] = useState(0);
  const [tip, setTip] = useState(null);
  return (
    <Phone><div style={{ height: "100%", background: C.canvas, fontFamily: BODY, display: "flex", flexDirection: "column" }}>
      <Bar /><div style={{ flex: 1, padding: "8px 24px 20px", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", margin: "8px 0 28px" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
            background: C.malachiteBg, border: `2px solid ${C.malachiteBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.malachite} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: C.white, fontFamily: HEAD, marginBottom: 6 }}>Ride Complete</h2>
          <p style={{ fontSize: 14, color: C.gray400 }}>Thank you for riding with RideAssure</p>
        </div>

        <div style={{ padding: "22px", borderRadius: 20, background: C.surface1, border: `1px solid ${C.borderSubtle}`, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 18 }}>
            {[{l:"Distance",v:"12.4 km"},{l:"Duration",v:"28 min"},{l:"Amount",v:"₹449",a:true}].map((d,i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.gray400, marginBottom: 5, letterSpacing: "0.8px", textTransform: "uppercase" }}>{d.l}</div>
                <div style={{ fontSize: d.a ? 24 : 18, fontWeight: 700, color: d.a ? C.brass400 : C.white, fontFamily: d.a ? HEAD : BODY }}>{d.v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 14px", borderRadius: 12, background: C.surface2, display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gray400} strokeWidth="1.8"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 00-16 0c0 3 2.7 7 8 11.7z"/></svg>
            <span style={{ fontSize: 12, color: C.gray400 }}>Srirangam → Thillai Nagar, Trichy</span>
          </div>
        </div>

        <div style={{ padding: "22px", borderRadius: 20, background: C.surface1, border: `1px solid ${C.borderSubtle}`, marginBottom: 18, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.white, marginBottom: 14 }}>Rate your ride</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 8 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setR(n)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 4,
                transform: n <= r ? "scale(1.12)" : "scale(1)", transition: "transform .2s",
              }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill={n<=r ? C.brass500 : "none"} stroke={n<=r ? C.brass500 : C.gray500} strokeWidth="1.4">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.gray400, height: 18 }}>
            {r===5?"Excellent!":r>=3?"Good experience":r>0?"We'll do better":"Tap to rate"}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.gray200, marginBottom: 12, textAlign: "center" }}>Add a tip for Rajesh</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {["₹20","₹50","₹100"].map(v => (
              <button key={v} onClick={() => setTip(v)} style={{
                padding: "11px 24px", borderRadius: 12,
                background: tip===v ? C.brassGlow : C.surface2,
                border: `1.5px solid ${tip===v ? C.brassBorder : C.borderLight}`,
                color: tip===v ? C.brass400 : C.gray200,
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: BODY, transition: "all .2s",
              }}>{v}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <button onClick={done} style={{
            width: "100%", padding: "18px", borderRadius: 16, border: "none",
            background: `linear-gradient(135deg, ${C.teal500}, ${C.teal400})`,
            color: C.white, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: BODY,
            boxShadow: `0 10px 36px ${C.teal700}45`,
          }}>Done</button>
          <button style={{
            width: "100%", padding: "12px", marginTop: 8, background: "none", border: "none",
            color: C.gray400, fontSize: 13, cursor: "pointer", fontFamily: BODY,
          }}>Report an issue</button>
        </div>
      </div></div></Phone>
  );
};

// ── SAFETY ──
const SafetyScreen = ({ back }) => {
  const items = [
    { d:"M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13", t:"Share Trip", s:"Share live location with trusted contacts" },
    { d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", t:"Trusted Contacts", s:"Manage your emergency contacts" },
    { d:"M3 11l19-9-9 21-2-8-8-4z", t:"Route Replay", s:"Review any past trip route" },
    { d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", t:"Ride Check", s:"Automatic safety alerts" },
    { d:"M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01", t:"Safety Tips", s:"Best practices for every ride" },
    { d:"M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z", t:"24/7 Support", s:"Help available anytime" },
  ];
  return (
    <Phone><div style={{ minHeight: "100%", background: C.canvas, fontFamily: BODY }}>
      <Bar /><div style={{ padding: "4px 24px 30px" }}>
        <Header title="Safety Center" onBack={back} />
        <button style={{
          width: "100%", padding: "24px 22px", borderRadius: 20, marginBottom: 22,
          background: C.vermillionBg, border: `1.5px solid ${C.vermillionBorder}`,
          display: "flex", alignItems: "center", gap: 18, cursor: "pointer",
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: `linear-gradient(145deg, ${C.vermillion}, #C93E2E)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.white, fontSize: 17, fontWeight: 900, letterSpacing: "1.5px", fontFamily: BODY,
            boxShadow: `0 6px 24px ${C.vermillion}35`,
          }}>SOS</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: C.vermillion, fontFamily: HEAD }}>Emergency SOS</div>
            <div style={{ fontSize: 12, color: C.gray300, marginTop: 4 }}>Alerts contacts & authorities instantly</div>
          </div>
        </button>
        {items.map((item,i) => (
          <button key={i} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 14,
            padding: "16px 18px", borderRadius: 16, marginBottom: 8,
            background: C.surface1, border: `1px solid ${C.borderSubtle}`,
            cursor: "pointer", textAlign: "left",
          }}>
            <IconCircle size={46} bg={C.tealGlow} border={C.tealBorder}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.teal400} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {item.d.split("M").filter(Boolean).map((seg,j) => <path key={j} d={`M${seg}`}/>)}
              </svg>
            </IconCircle>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.white }}>{item.t}</div>
              <div style={{ fontSize: 12, color: C.gray400, marginTop: 3 }}>{item.s}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gray500} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div></div></Phone>
  );
};

// ── PROFILE ──
const ProfileScreen = ({ back }) => {
  const menu = [
    { d:"M1 4h22v16H1zM1 10h22", t:"Payment Methods" },
    { d:"M12 21.7C17.3 17 20 13 20 10a8 8 0 00-16 0c0 3 2.7 7 8 11.7zM12 7a3 3 0 100 6 3 3 0 000-6z", t:"Saved Places" },
    { d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01", t:"Promotions" },
    { d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", t:"Safety Center" },
    { d:"M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z", t:"24/7 Support" },
    { d:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33", t:"Settings" },
  ];
  return (
    <Phone><div style={{ minHeight: "100%", background: C.canvas, fontFamily: BODY }}>
      <Bar /><div style={{ padding: "4px 24px 30px" }}>
        <Header title="Account" onBack={back} />
        <div style={{
          display: "flex", alignItems: "center", gap: 16, padding: "22px",
          borderRadius: 20, background: C.surface1, border: `1px solid ${C.borderSubtle}`, marginBottom: 20,
        }}>
          <IconCircle size={58} bg={`linear-gradient(145deg, ${C.teal600}, ${C.teal700})`} border={C.tealBorder}>
            <span style={{ fontSize: 24, fontWeight: 700, color: C.brass400, fontFamily: HEAD }}>B</span>
          </IconCircle>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, color: C.white, fontFamily: HEAD }}>Baskar</div>
            <div style={{ fontSize: 13, color: C.gray400, marginTop: 4 }}>+91 98765 43210</div>
          </div>
        </div>
        <button style={{
          width: "100%", padding: "18px 22px", borderRadius: 18, marginBottom: 24,
          background: C.brassGlow, border: `1.5px solid ${C.brassBorder}`, cursor: "pointer", textAlign: "left",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: C.brass400, fontFamily: HEAD }}>Personal Driver</div>
              <div style={{ fontSize: 12, color: C.gray300, marginTop: 5 }}>Your own dedicated driver pool & priority booking</div>
            </div>
            <div style={{
              padding: "5px 12px", borderRadius: 8, background: `${C.brass500}18`, border: `1px solid ${C.brassBorder}`,
              color: C.brass400, fontSize: 10, fontWeight: 800, letterSpacing: "0.8px",
            }}>UPGRADE</div>
          </div>
        </button>
        {menu.map((item,i) => (
          <button key={i} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 16,
            padding: "16px 4px", border: "none", background: "none",
            cursor: "pointer", textAlign: "left",
            borderBottom: i < menu.length-1 ? `1px solid ${C.borderSubtle}` : "none",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gray300} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {item.d.split("M").filter(Boolean).map((seg,j) => <path key={j} d={`M${seg}`}/>)}
            </svg>
            <span style={{ fontSize: 15, fontWeight: 500, color: C.gray200, flex: 1 }}>{item.t}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gray500} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div></div></Phone>
  );
};

// ── HISTORY ──
const HistoryScreen = ({ back }) => {
  const rides = [
    { f:"Srirangam", t:"Thillai Nagar", d:"Today, 2:30 PM", p:"₹449", tier:"Gold", tc:C.tierGoldBrass, dr:"Rajesh K.", s:5 },
    { f:"Central Bus Stand", t:"Airport", d:"Yesterday, 8:15 AM", p:"₹849", tier:"Elite", tc:C.tierElite, dr:"Vikram S.", s:5 },
    { f:"KK Nagar", t:"Srirangam Temple", d:"Mar 31, 6:00 PM", p:"₹249", tier:"Silver", tc:C.tierSilver, dr:"Kumar M.", s:4 },
    { f:"Railway Junction", t:"BHEL Township", d:"Mar 29, 10:00 AM", p:"₹449", tier:"Gold", tc:C.tierGoldBrass, dr:"Anand R.", s:5 },
  ];
  return (
    <Phone><div style={{ minHeight: "100%", background: C.canvas, fontFamily: BODY }}>
      <Bar /><div style={{ padding: "4px 24px 30px" }}>
        <Header title="Activity" onBack={back} />
        {rides.map((r,i) => (
          <div key={i} style={{
            padding: "20px", borderRadius: 20, marginBottom: 10,
            background: C.surface1, border: `1px solid ${C.borderSubtle}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.white }}>{r.f} → {r.t}</div>
                <div style={{ fontSize: 12, color: C.gray400, marginTop: 4 }}>{r.d}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.white, fontFamily: HEAD }}>{r.p}</div>
                <div style={{
                  display: "inline-block", marginTop: 4, padding: "2px 8px", borderRadius: 5,
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.8px",
                  background: `${r.tc}12`, border: `1px solid ${r.tc}25`, color: r.tc,
                }}>{r.tier.toUpperCase()}</div>
              </div>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingTop: 14, borderTop: `1px solid ${C.borderSubtle}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: C.gray300 }}>{r.dr}</span>
                <span style={{ color: C.brass500, fontSize: 12, letterSpacing: "1px" }}>{"★".repeat(r.s)}</span>
              </div>
              <button style={{
                padding: "8px 18px", borderRadius: 10,
                background: C.tealGlow, border: `1px solid ${C.tealBorder}`,
                color: C.teal300, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: BODY,
              }}>Rebook</button>
            </div>
          </div>
        ))}
      </div></div></Phone>
  );
};

/* ═══════════════════════ APP SHELL ═══════════════════════ */

export default function App() {
  const [s, setS] = useState("onboarding");
  const go = useCallback(id => setS(id), []);

  const V = {
    onboarding: <Onboarding next={() => go("login")} />,
    login: <LoginScreen next={() => go("home")} />,
    home: <HomeScreen onBook={() => go("booking")} onTiers={() => go("tiers")} go={go} />,
    tiers: <TierScreen back={() => go("home")} />,
    booking: <BookingScreen onTrack={() => go("tracking")} back={() => go("home")} />,
    tracking: <TrackingScreen onDone={() => go("complete")} back={() => go("booking")} goSafety={() => go("safety")} />,
    complete: <CompleteScreen done={() => go("home")} />,
    safety: <SafetyScreen back={() => go("home")} />,
    profile: <ProfileScreen back={() => go("home")} />,
    history: <HistoryScreen back={() => go("home")} />,
  };

  const labels = [
    ["onboarding","Onboarding"],["login","Login"],["home","Home"],["tiers","Tiers"],
    ["booking","Booking"],["tracking","Tracking"],["complete","Complete"],
    ["safety","Safety"],["profile","Account"],["history","Activity"],
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 25% 10%, ${C.teal700}18 0%, #060A0C 55%, #060A0C 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "24px 16px", fontFamily: BODY,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{
        display: "flex", gap: 3, marginBottom: 32, flexWrap: "wrap", justifyContent: "center",
        maxWidth: 540, padding: "5px", borderRadius: 14,
        background: `${C.surface1}90`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${C.borderSubtle}`,
      }}>
        {labels.map(([k,l]) => (
          <button key={k} onClick={() => go(k)} style={{
            padding: "9px 15px", borderRadius: 10, fontSize: 12, fontWeight: 600,
            background: s===k ? `linear-gradient(135deg, ${C.teal500}, ${C.teal400})` : "transparent",
            color: s===k ? C.white : C.gray400,
            border: "none", cursor: "pointer", fontFamily: BODY,
            transition: "all .2s", letterSpacing: "0.2px",
            boxShadow: s===k ? `0 4px 16px ${C.teal700}40` : "none",
          }}>{l}</button>
        ))}
      </div>

      {V[s]}

      <p style={{
        marginTop: 28, fontSize: 11, color: C.gray500, textAlign: "center",
        fontFamily: BODY, letterSpacing: "1px", textTransform: "uppercase",
      }}>RideAssure · Premium Chauffeur · Interactive Prototype</p>
    </div>
  );
}
