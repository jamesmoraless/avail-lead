import { useRef, useState } from "react";
import { C, P, T, Phone, StatusBar, TabBar, Wordmark, Task, Aside, WindowLight, Hand, Greeting, Hero, Section, Support, HomeHeader, Sheet } from "./_kit";

/* R2 · The Curtain.
   The number is the hero, above the window. The curtain is drawn; behind it,
   written on the glass, is how we got there. Pull the curtain (or tap it) to
   see the arithmetic. The cushion is a dial on the wall: turn it and the
   number and the arithmetic change together. */

const PANE_W = 330;
const PANE_H = 188;
const MIN_W = 30; // curtain gathered at the left
const MAX_W = PANE_W; // curtain fully drawn

const CUSHION = [
  { label: "thin", pct: "1%", held: 34.2, number: "$2,521", note: "More to spend, closer to the edge.", angle: -52 },
  { label: "snug", pct: "2%", held: 68.4, number: "$2,487", note: "Room to breathe, nothing wasted.", angle: 0 },
  { label: "deep", pct: "4%", held: 136.8, number: "$2,418", note: "Less to spend, quieter nights.", angle: 52 },
];

/** Your cushion, literally: a stack of one, two or three soft pillows. Tap to add one; past three it resets. */
const PILLOWS = [
  { fill: "#E4CFA8", edge: "#A8875C", tilt: -2 },
  { fill: "#C9D8C0", edge: "#6F8F72", tilt: 1.8 },
  { fill: "#ECC3AD", edge: "#B97A5C", tilt: -1.2 },
];

function PillowStack({ count, onTap }: { count: number; onTap: () => void }) {
  const W = 66;
  const PH = 17; // one pillow's height
  const STEP = 13; // how much each one adds to the stack
  const base = 58;
  const pillow = (cx: number, by: number, w: number) => {
    const x0 = cx - w / 2;
    const x1 = cx + w / 2;
    const y0 = by - PH;
    const mid = by - PH / 2;
    return `M${x0 + 3} ${y0 + 1} Q${cx} ${y0 - 5} ${x1 - 3} ${y0 + 1} Q${x1 + 4} ${mid} ${x1 - 3} ${by - 1} Q${cx} ${by + 3} ${x0 + 3} ${by - 1} Q${x0 - 4} ${mid} ${x0 + 3} ${y0 + 1} Z`;
  };
  return (
    <button aria-label={`cushion: ${count} of 3, tap to change`} className="av-press relative shrink-0 cursor-pointer" onClick={onTap} style={{ width: W, height: 62 }}>
      {/* a small plus says "you can add one"; at three it turns into a return arrow */}
      <span className="absolute flex items-center justify-center rounded-full" style={{ right: -6, top: 0, width: 18, height: 18, background: C.paper, boxShadow: `inset 0 0 0 1px rgba(58,51,44,.16)`, color: C.muted, fontSize: 12, lineHeight: 1 }}>
        {count < 3 ? "+" : "↺"}
      </span>
      <svg width={W} height="62" viewBox={`0 0 ${W} 62`} style={{ overflow: "visible" }}>
        <ellipse cx={W / 2} cy={base + 1.5} rx="27" ry="2.4" fill="rgba(58,51,44,.14)" />
        {PILLOWS.map((p, n) => {
          const on = n < count;
          const by = base - n * STEP;
          const w = 54 - n * 4;
          return (
            <g key={n} style={{ opacity: on ? 1 : 0, transform: `translateY(${on ? 0 : -14}px) rotate(${p.tilt}deg)`, transformOrigin: `${W / 2}px ${by}px`, transition: on ? "opacity .25s ease, transform .55s cubic-bezier(.3,1.5,.5,1)" : "opacity .25s ease, transform .3s ease" }}>
              <path d={pillow(W / 2, by, w)} fill={p.fill} opacity=".95" className="av-wc-sm" />
              <path d={pillow(W / 2, by, w)} fill="none" stroke={p.edge} strokeOpacity=".65" strokeWidth="1" strokeLinejoin="round" />
              <path d={`M${W / 2 - w / 2 + 7} ${by - PH / 2} Q${W / 2} ${by - PH / 2 + 1.5} ${W / 2 + w / 2 - 7} ${by - PH / 2}`} fill="none" stroke={p.edge} strokeOpacity=".4" strokeWidth=".8" strokeDasharray="1.6 2.2" />
              <circle cx={W / 2} cy={by - PH / 2} r="1.4" fill={p.edge} opacity=".7" />
            </g>
          );
        })}
      </svg>
    </button>
  );
}

export function HomeCurtain() {
  const [w, setW] = useState(MAX_W);
  const [evening, setEvening] = useState(false);
  const [cushion, setCushion] = useState(1);
  const [done, setDone] = useState<[boolean, boolean]>([false, false]);
  const drag = useRef<{ x: number; w: number; moved: boolean } | null>(null);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, w, moved: false };
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setW(Math.max(MIN_W, Math.min(MAX_W, drag.current.w + dx)));
  };
  const up = () => {
    if (drag.current && !drag.current.moved) setW(w > PANE_W / 2 ? MIN_W : MAX_W);
    drag.current = null;
  };

  const open = 1 - (w - MIN_W) / (MAX_W - MIN_W);
  const rings = 5;
  const c = CUSHION[cushion];
  const allDone = done[0] && done[1];
  const sky = evening ? "linear-gradient(178deg,#E8C9B2 0%,#E3C3AE 28%,#D7C6B0 52%,#B9C2AE 78%,#9DB09E 100%)" : "linear-gradient(178deg,#F4DFC3 0%,#F0D4B8 30%,#E2D3BA 55%,#C6D0BA 78%,#AEC1AE 100%)";

  return (
    <Phone light={false}>
      <WindowLight strength={0.5 + open * 1.1} />
      {/* sunlight through the glass, falling across the page when the curtain opens */}
      <div className="absolute pointer-events-none" style={{ left: 40, top: 300, width: 360, height: 420, background: "linear-gradient(160deg, rgba(246,214,170,.5), rgba(246,214,170,0) 70%)", clipPath: "polygon(8% 0, 92% 0, 100% 100%, 20% 100%)", opacity: open * 0.9, transition: drag.current ? "none" : "opacity .8s ease", mixBlendMode: "multiply" }} />
      <StatusBar />
      <div className="relative z-10 h-full pt-[44px] overflow-hidden select-none">
        <div className="av-fade d1">
          <HomeHeader />
        </div>

        <div className="px-[26px] mt-[28px] av-rise d2">
          <Greeting>Good morning, Todd.</Greeting>
          <Hero key={c.number} className="av-count mt-[16px]">
            {c.number}
          </Hero>
          <Support className="mt-[9px]">is yours today. Every bill is covered.</Support>
        </div>

        {/* ---------- a Scandinavian window: white frame, a cross in the glass, a pot on the sill ---------- */}
        <div className="relative mx-auto mt-[32px] av-rise d3" style={{ width: PANE_W + 20 }}>
          <div className="relative rounded-[6px] p-[10px]" style={{ background: "#FBF8F2", boxShadow: "0 30px 40px -34px rgba(58,51,44,.55), inset 0 0 0 1px rgba(58,51,44,.08), inset 0 -3px 0 rgba(58,51,44,.05)" }}>
            <div className="relative overflow-hidden" style={{ width: PANE_W, height: PANE_H, borderRadius: 2, boxShadow: "inset 0 0 0 1px rgba(58,51,44,.12)" }}>
              {/* the view, painted */}
              <div className="absolute inset-0" style={{ background: sky, transition: "background 1.4s ease" }} />
              <svg className="absolute inset-0" viewBox={`0 0 ${PANE_W} ${PANE_H}`} width={PANE_W} height={PANE_H} style={{ overflow: "visible" }}>
                <g style={{ transform: `translateY(${evening ? 70 : 0}px)`, transition: "transform 1.6s cubic-bezier(.3,.8,.3,1)", cursor: "pointer" }} onClick={() => setEvening((v) => !v)}>
                  <circle cx="298" cy="40" r="36" fill={evening ? P.rose : P.dawn} opacity=".45" className="av-wc" style={{ transition: "fill 1.4s" }} />
                  <circle cx="298" cy="40" r="17" fill={evening ? P.apricot : "#F6CF98"} opacity=".95" className="av-wc" style={{ transition: "fill 1.4s" }} />
                </g>
                <path d="M-10 132 C 50 104, 110 100, 170 122 S 280 96, 340 110 V220 H-10 Z" fill={evening ? "#9FB09B" : "#B9C9AF"} opacity=".9" className="av-wc" style={{ transition: "fill 1.4s" }} />
                {[
                  [38, 118, 1],
                  [54, 124, 0.75],
                  [228, 112, 0.9],
                ].map(([x, y, k], n) => (
                  <g key={n} transform={`translate(${x} ${y}) scale(${k})`}>
                    <line x1="0" y1="0" x2="0" y2="14" stroke={P.pine} strokeWidth="1.4" />
                    <path d="M0 -28 C8 -18 11 -4 0 6 C-11 -4 -8 -18 0 -28 Z" fill={n === 1 ? "#557A5B" : P.forest} opacity=".9" className="av-wc-sm" />
                  </g>
                ))}
                <path d="M-10 160 C 60 140, 150 150, 210 158 S 300 140, 340 146 V220 H-10 Z" fill={evening ? P.leaf : P.moss} opacity=".88" className="av-wc" style={{ transition: "fill 1.4s" }} />
                <path d="M-10 188 C 90 176, 200 196, 340 180 V220 H-10 Z" fill={evening ? P.forest : P.leaf} opacity=".8" className="av-wc" style={{ transition: "fill 1.4s" }} />
              </svg>

              {/* the cross in the glass */}
              <div className="absolute top-0 bottom-0" style={{ left: PANE_W / 2 - 4, width: 8, background: "#FBF8F2", boxShadow: "1px 0 2px rgba(58,51,44,.12)" }} />
              <div className="absolute left-0 right-0" style={{ top: PANE_H * 0.46 - 4, height: 8, background: "#FBF8F2", boxShadow: "0 1px 2px rgba(58,51,44,.12)" }} />

              {/* how we got here: a note taped to the glass */}
              <div
                className="absolute rounded-[3px] px-[16px] pt-[14px] pb-[11px]"
                style={{ left: MIN_W + 14, right: 74, top: 20, background: "#FFFDF8", transform: `rotate(-1.2deg) translateX(${(1 - open) * 16}px)`, opacity: Math.max(0, (open - 0.35) / 0.65), transition: drag.current ? "none" : "opacity .4s ease, transform .5s ease", boxShadow: "0 12px 20px -14px rgba(58,51,44,.45), 0 1px 0 rgba(58,51,44,.06)" }}
              >
                <div className="absolute left-1/2 -top-[7px] w-[58px] h-[16px] -translate-x-1/2" style={{ background: "rgba(221,170,94,.45)", transform: "rotate(2deg)", clipPath: "polygon(3% 0,97% 4%,100% 100%,0 96%)" }} />
                <Hand size={19} tone={C.oakDeep}>
                  how we got here
                </Hand>
                {[
                  ["in your accounts", "$4,319"],
                  ["spoken for by Friday", "− $1,763"],
                  [`cushion · ${c.label}`, `− $${Math.round(c.held)}`],
                  ["yours today", c.number],
                ].map(([k, v], i) => {
                  const last = i === 3;
                  const tone = i === 2 ? C.oakDeep : C.fern;
                  return (
                    <div key={k} className="flex items-baseline justify-between gap-[10px] whitespace-nowrap" style={{ marginTop: i ? 3 : 4, paddingTop: last ? 5 : 0, borderTop: last ? `1.5px solid ${C.fern}` : "none" }}>
                      <span className={last ? "text-[12.5px] font-semibold" : "text-[12px]"} style={{ color: last ? C.fern : C.ink, opacity: last ? 1 : 0.8, transition: "color .4s" }}>
                        {k}
                      </span>
                      <span key={v} className={`av-tnum av-fade ${last ? "text-[16px]" : "text-[14px]"}`} style={{ color: tone }}>
                        {v}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* the linen curtain: soft folds, the view glowing faintly through it */}
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: w,
                  cursor: "ew-resize",
                  touchAction: "none",
                  background:
                    "linear-gradient(180deg, rgba(255,250,240,.0), rgba(255,250,240,.18)), repeating-linear-gradient(90deg, rgba(246,239,227,.8) 0px, rgba(252,248,240,.72) 9px, rgba(232,221,203,.86) 20px, rgba(246,239,227,.8) 30px)",
                  boxShadow: "8px 0 18px -10px rgba(58,51,44,.35)",
                  transition: drag.current ? "none" : "width .6s cubic-bezier(.2,.8,.2,1)",
                }}
                onPointerDown={down}
                onPointerMove={move}
                onPointerUp={up}
                onPointerCancel={up}
              >
                <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ opacity: 0.28, mixBlendMode: "multiply" }}>
                  <filter id="linen">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9 0.05" numOctaves="2" seed="5" />
                    <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .48  0 0 0 0 .38  0 0 0 .6 0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#linen)" />
                </svg>
                <div className="absolute top-[10px] right-[10px] w-[1.5px] rounded-full" style={{ height: PANE_H * 0.55, background: "#A8875C" }} />
                <div className="absolute right-[5px] w-[11px] h-[15px]" style={{ top: 10 + PANE_H * 0.55 - 2, borderRadius: "40% 40% 50% 50%", background: "linear-gradient(180deg,#C8A67E,#A8875C)", boxShadow: "0 3px 5px -2px rgba(58,51,44,.4)" }} />
              </div>
              <div className="absolute left-0 right-0 top-[4px] h-[3px] rounded-full" style={{ background: "#8E6E45" }} />
              {Array.from({ length: rings }).map((_, i) => (
                <div key={i} className="absolute top-[1px] w-[9px] h-[9px] rounded-full" style={{ left: 4 + (i * (w - 18)) / (rings - 1), border: "1.6px solid #8E6E45", transition: drag.current ? "none" : "left .6s cubic-bezier(.2,.8,.2,1)" }} />
              ))}
            </div>
          </div>
          {/* the sill, and a pot of something green on it */}
          <div className="relative mx-[-8px] h-[10px] rounded-[3px]" style={{ background: "linear-gradient(180deg,#F6F1E8,#E7DFD2)", boxShadow: "0 8px 12px -8px rgba(58,51,44,.4)" }} />
          <svg className="absolute pointer-events-none" width="58" height="66" viewBox="0 0 58 66" style={{ left: 6, bottom: 6 }}>
            <path d="M29 36 C 22 24, 10 20, 4 22 C 8 30, 18 36, 29 38Z" fill={P.leaf} opacity=".9" className="av-wc-sm" />
            <path d="M29 36 C 34 20, 46 12, 54 14 C 52 26, 42 34, 29 38Z" fill={P.moss} opacity=".9" className="av-wc-sm" />
            <path d="M29 38 C 28 22, 30 10, 36 2 C 40 14, 36 28, 29 38Z" fill={P.forest} opacity=".85" className="av-wc-sm" />
            <path d="M14 38 H44 L40 64 H18 Z" fill={P.terracotta} opacity=".95" className="av-wc-sm" />
          </svg>
          {/* a pencilled nudge toward the cord */}
          <div className="absolute pointer-events-none flex items-end gap-[2px]" style={{ right: -2, top: -30, opacity: open > 0.5 ? 0 : 1, transition: "opacity .5s" }}>
            <Hand size={20} tone={C.oakDeep} rotate={-3}>
              pull the cord
            </Hand>
            <svg width="22" height="30" viewBox="0 0 22 30">
              <path d="M4 3 C 14 6, 18 14, 14 26 M14 26 l-4 -5 M14 26 l4 -5" stroke={C.oakDeep} strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <Sheet className="mt-[14px]">
          {/* ---------- the cushion: a stack of pillows you can add to ---------- */}
          <div className="px-[30px] mt-[14px] flex items-center gap-[16px] av-rise d4">
            <PillowStack count={cushion + 1} onTap={() => setCushion((v) => (v + 1) % 3)} />
            <div className="flex-1 min-w-0">
              <div key={c.label} className="av-fade">
                <div className="flex items-baseline gap-[8px]">
                  <span className="text-[15px] font-medium" style={{ color: T.ink, lineHeight: 1.2 }}>
                    {c.label[0].toUpperCase() + c.label.slice(1)} cushion
                  </span>
                  <span className="av-tnum text-[13px]" style={{ color: C.muted }}>
                    {c.pct} held back
                  </span>
                </div>
                <div className="text-[12.5px] mt-[4px]" style={{ color: C.muted }}>
                  {c.note}
                </div>
              </div>
            </div>
          </div>

          <div className="px-[30px] mt-[12px] av-rise d5">
            <Section className="px-[4px] mb-[2px]">{allDone ? "Both done. Go enjoy the day." : "Two small things today"}</Section>
            <Task first title="Move $120 to savings" value="$120" py={11} done={done[0]} onToggle={() => setDone([!done[0], done[1]])} />
            <Task title="Pay the electric bill" value="$142.36" py={11} done={done[1]} onToggle={() => setDone([done[0], !done[1]])} />
          </div>
        </Sheet>
      </div>
      <TabBar active="today" />
    </Phone>
  );
}

export default HomeCurtain;
