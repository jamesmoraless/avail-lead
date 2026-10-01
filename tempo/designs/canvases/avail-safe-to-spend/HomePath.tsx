import { useRef, useState } from "react";
import { C, P, T, Phone, StatusBar, TabBar, Wordmark, Aside, Hand, Greeting, Hero, Section, Support, HomeHeader, Sheet } from "./_kit";

/* R5 · The Horizon.
   The week to payday is a sunrise. The sun sits low on Monday and climbs
   toward Friday along a faint path; drag it, or tap a day, and that day's
   number appears while the sky warms. The bills sit on the horizon on the
   day they land. Below, the week in three lines — and the electric bill can
   be moved to Friday's paycheck, which re-flows every day's number. */

type Day = { d: string; n: string; s: string };

const BASE: Day[] = [
  { d: "Monday", n: "$94", s: "is yours today. Four days to payday." },
  { d: "Tuesday", n: "$96", s: "on Tuesday. About the same as today." },
  { d: "Wednesday", n: "$88", s: "on Wednesday, when electric lands." },
  { d: "Thursday", n: "$92", s: "on Thursday, after internet." },
  { d: "Friday", n: "+$3,420", s: "lands on Friday. You made it." },
];

const CARRIED: Day[] = [
  { d: "Monday", n: "$146", s: "is yours today. Electric moved to Friday." },
  { d: "Tuesday", n: "$148", s: "on Tuesday. About the same as today." },
  { d: "Wednesday", n: "$140", s: "on Wednesday. Nothing lands now." },
  { d: "Thursday", n: "$144", s: "on Thursday, after internet." },
  { d: "Friday", n: "+$3,211", s: "lands Friday, electric already set aside." },
];

const W = 390;
const H = 296;
const HORIZON = 176;
const X0 = 52;
const X1 = 346;
const XS = [0, 0.25, 0.5, 0.75, 1].map((k) => X0 + k * (X1 - X0));
const sunAt = (t: number) => ({ x: X0 + t * (X1 - X0), y: HORIZON - 46 - Math.pow(t, 1.3) * 116 });
const ARC = Array.from({ length: 41 }, (_, k) => sunAt(k / 40))
  .map((p, k) => `${k ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
  .join(" ");

export function HomePath() {
  const [t, setT] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const [carried, setCarried] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  const setFrom = (clientX: number) => {
    const el = sceneRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((clientX - r.left) / r.width) * W;
    setT(Math.max(0, Math.min(1, (px - X0) / (X1 - X0))));
    setTouched(true);
  };
  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFrom(e.clientX);
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => dragging && setFrom(e.clientX);
  const up = () => {
    setDragging(false);
    setT((v) => Math.round(v * 4) / 4);
  };
  const goTo = (k: number) => {
    setT(k / 4);
    setTouched(true);
  };

  const days = carried ? CARRIED : BASE;
  const i = Math.round(t * 4);
  const day = days[i];
  const friday = i === 4;
  const sun = sunAt(t);
  const ease = dragging ? "none" : "all .7s cubic-bezier(.3,.8,.3,1)";
  const electricDay = carried ? 4 : 2;

  // what sits on the horizon, per day
  const marks: { k: number; label: string; tone: string }[] = [
    { k: electricDay, label: "electric", tone: carried ? C.sage : C.oakDeep },
    { k: 3, label: "internet", tone: C.oakDeep },
  ];

  return (
    <Phone light={false}>
      {/* the whole screen is the morning sky; it warms as the week goes on */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#E3E8E1 0%,#EEEDE4 40%,#F4EFE5 62%, #F7F2EA 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#F6D9BC 0%,#F7E6D2 38%,rgba(247,238,226,0) 62%)", opacity: 0.25 + t * 0.75, transition: ease }} />
      <StatusBar />

      <div className="relative z-10 h-full pt-[44px] overflow-hidden select-none">
        <div className="av-fade d1">
          <HomeHeader />
        </div>

        <div className="px-[26px] mt-[28px] av-rise d2" style={{ minHeight: 146 }}>
          <Greeting>Good morning, Todd.</Greeting>
          <div key={day.d + String(carried)} className="av-fade">
            <Hero tone={friday ? P.terracotta : C.fern} className="mt-[16px]">
              {day.n}
            </Hero>
            <Support className="mt-[9px]">{day.s}</Support>
          </div>
        </div>

        {/* ---------- the week, painted as a sunrise ---------- */}
        <div ref={sceneRef} className="relative av-pop d3" style={{ height: H, cursor: "ew-resize", touchAction: "none" }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
            {/* two slow clouds */}
            <g className="av-drift">
              <ellipse cx="250" cy="34" rx="34" ry="9" fill="#FFFFFF" opacity=".7" className="av-wc" />
              <ellipse cx="96" cy="70" rx="24" ry="6" fill="#FFFFFF" opacity=".6" className="av-wc" />
            </g>
            {/* the sun's path through the week, pencilled in */}
            <path d={ARC} fill="none" stroke={P.pencil} strokeOpacity=".35" strokeWidth="1" strokeDasharray="1.5 6" strokeLinecap="round" className="av-paint-soft" />

            {/* the sun: a watercolour bloom that deepens toward Friday */}
            <g style={{ transform: `translate(${sun.x}px, ${sun.y}px)`, transition: dragging ? "none" : "transform .7s cubic-bezier(.3,.8,.3,1)" }}>
              {dragging && <circle r="30" fill="none" stroke={P.apricot} strokeWidth="1.2" className="av-ring" />}
              <g className="av-halo" style={{ transformOrigin: "0 0" }}>
                <circle r={34 + t * 8} fill={P.dawn} opacity={0.5} className="av-wc-sm" style={{ transition: ease }} />
              </g>
              <circle r={17 + t * 5} fill={t > 0.6 ? P.apricot : "#F2BE8C"} opacity=".92" className="av-wc-sm" style={{ transition: ease }} />
            </g>

            {/* far hills, near hills, the field: three washes of green */}
            <path d={`M-10 ${HORIZON + 2} C 40 ${HORIZON - 34}, 120 ${HORIZON - 40}, 190 ${HORIZON - 14} S 320 ${HORIZON - 44}, 400 ${HORIZON - 18} V${HORIZON + 8} H-10 Z`} fill="#B9C8B0" opacity=".85" className="av-wc" />
            <path d={`M-10 ${HORIZON + 6} C 70 ${HORIZON - 16}, 150 ${HORIZON - 8}, 230 ${HORIZON + 2} S 350 ${HORIZON - 22}, 400 ${HORIZON - 6} V${HORIZON + 20} H-10 Z`} fill={P.moss} opacity=".8" className="av-wc" />
            {/* a red cabin on the far hill: home, where Friday is */}
            <g transform={`translate(${X1 + 14} ${HORIZON - 30})`}>
              <path d="M-12 0 L0 -11 L12 0 V12 H-12 Z" fill="#B45A43" opacity=".92" className="av-wc-sm" />
              <path d="M-14 1 L0 -12 L14 1" fill="none" stroke={P.pine} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="av-paint-soft" />
              <rect x="-3" y="3" width="5" height="5" fill={t > 0.85 ? "#F6D48C" : "#EFE4CF"} style={{ transition: "fill .8s" }} />
            </g>
            {/* a few trees */}
            {[
              [18, HORIZON - 10, 1],
              [34, HORIZON - 4, 0.8],
              [132, HORIZON - 26, 0.9],
              [292, HORIZON - 30, 0.75],
            ].map(([x, y, k], n) => (
              <g key={n} transform={`translate(${x} ${y}) scale(${k})`}>
                <line x1="0" y1="0" x2="0" y2="14" stroke={P.pine} strokeWidth="1.4" />
                <path d="M0 -26 C8 -16 10 -4 0 6 C-10 -4 -8 -16 0 -26 Z" fill={n % 2 ? P.forest : "#557A5B"} opacity=".88" className="av-wc-sm" />
              </g>
            ))}
            <path d={`M-10 ${HORIZON} H400 V${H + 10} H-10 Z`} fill="#A8BC96" opacity=".75" className="av-wc" />
            <path d={`M-10 ${H - 30} C 90 ${H - 44}, 240 ${H - 20}, 400 ${H - 40} V${H + 10} H-10 Z`} fill={P.leaf} opacity=".75" className="av-wc" />

            {/* bills: little flags planted on the day they land */}
            {marks.map((m) => {
              const tall = m.label === "electric" && carried ? 34 : 22;
              return (
                <g key={m.label} style={{ transform: `translate(${XS[m.k]}px, ${HORIZON + 2}px)`, transition: "transform .9s cubic-bezier(.3,.8,.3,1)" }}>
                  <line x1="0" y1="0" x2="0" y2={-tall} stroke={P.pencil} strokeWidth="1.3" strokeLinecap="round" style={{ transition: "all .6s" }} />
                  <path d={`M0 ${-tall} l14 4 -14 5 Z`} fill={m.label === "electric" && carried ? P.moss : P.terracotta} opacity=".9" className="av-wc-sm" style={{ transition: "all .6s" }} />
                </g>
              );
            })}

            {/* a mark and a name for each day, sitting in the grass */}
            {XS.map((x, k) => (
              <g key={k} style={{ cursor: "pointer" }} onClick={() => goTo(k)} onPointerDown={(e) => e.stopPropagation()}>
                <rect x={x - 30} y={HORIZON - 6} width="60" height="46" fill="transparent" />
                <circle cx={x} cy={HORIZON + 4} r={k === i ? 5.5 : 3} fill={k === i ? C.paper : "rgba(253,251,246,.75)"} stroke={k === i ? C.fern : "none"} strokeWidth="1.6" style={{ transition: "all .3s" }} />
                <text x={x} y={HORIZON + 26} textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight={k === i ? 600 : 400} fill={k === i ? P.pine : "rgba(46,70,55,.62)"} style={{ transition: "fill .3s" }}>
                  {k === 0 ? "today" : days[k].d.slice(0, 3)}
                </text>
              </g>
            ))}
          </svg>
          <div className="absolute right-[30px] top-[4px] flex items-center gap-[4px]" style={{ opacity: touched ? 0 : 1, transition: "opacity .4s" }}>
            <Hand size={20} tone={C.oakDeep} rotate={-3}>
              drag the sun along
            </Hand>
            <svg width="26" height="18" viewBox="0 0 26 18" style={{ transform: "translateY(10px)" }}>
              <path d="M24 2C18 4 10 8 4 14M4 14l1-6M4 14l6-1" stroke={C.oakDeep} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* ---------- this week, on the paper below the grass ---------- */}
        <Sheet className="av-rise d5">
          <div className="px-[26px] pt-[12px] pb-[4px]">
          <Section>This week</Section>
          {[
            { k: electricDay, title: "Electric", amt: "$209" },
            { k: 3, title: "Internet", amt: "$79" },
            { k: 4, title: "Paycheck", amt: "+$3,420" },
          ].map((r, n) => (
            <div key={r.title} className="av-row flex items-center gap-[12px] py-[10px] px-[4px] cursor-pointer" style={{ borderTop: n ? `1px solid ${C.line}` : "none", marginTop: n ? 0 : 2 }} onClick={() => goTo(r.k)}>
              <span className="w-[34px] shrink-0 text-[12.5px]" style={{ color: r.k === i ? P.pine : C.muted, fontWeight: r.k === i ? 600 : 400 }}>
                {BASE[r.k].d.slice(0, 3)}
              </span>
              <span className="flex-1 text-[15px] font-medium" style={{ color: T.ink }}>
                {r.title}
              </span>
              {r.title === "Electric" && (
                <span
                  className="av-press text-[12.5px] rounded-full px-[11px] py-[5px] shrink-0"
                  style={{ color: carried ? C.muted : C.fern, fontWeight: 500, boxShadow: `inset 0 0 0 1px ${carried ? "rgba(58,51,44,.16)" : "rgba(111,143,114,.55)"}`, background: carried ? "transparent" : "rgba(111,143,114,.08)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarried((v) => !v);
                  }}
                >
                  {carried ? "undo" : "move to Friday"}
                </span>
              )}
              <span className="av-tnum text-[15.5px] shrink-0 w-[70px] text-right" style={{ color: r.title === "Paycheck" ? P.terracotta : T.amount }}>
                {r.amt}
              </span>
            </div>
          ))}
          </div>
        </Sheet>
      </div>
      <TabBar active="today" />
    </Phone>
  );
}

export default HomePath;
