import { useEffect, useState } from "react";
import { C, P, T, Phone, StatusBar, TabBar, Tick, Hand, Section } from "./_kit";

/* R4 · The Letter.
   A folded note with your name on it, resting on pale linen in morning light,
   with the soft shadow of a plant moving across it. Tap the note and it unfolds. Five lines: the number, two
   small things, a P.S. for what Avail did while you slept. Tap the number
   to see how. "not quite?" teaches it. */

export function HomeLetter() {
  const [open, setOpen] = useState(false);
  const [how, setHow] = useState(false);
  const [done, setDone] = useState<[boolean, boolean]>([false, false]);
  const [corrected, setCorrected] = useState(false);
  const allDone = done[0] && done[1];

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  const paperShadow = "0 24px 40px -26px rgba(92,66,36,.55), 0 2px 3px rgba(92,66,36,.12)";
  const paper = "linear-gradient(180deg,#FFFDF8 0%,#FBF7EF 100%)";

  return (
    <Phone light={false}>
      {/* a pale linen surface in morning light; a plant by the window throws soft leaf shadows across it */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(165deg,#F3EEE6 0%,#EEE7DC 55%,#E8E0D3 100%)" }} />
      {/* the weave of the linen, barely there */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ opacity: 0.22, mixBlendMode: "multiply" }}>
        <filter id="letter-linen">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.06" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .5  0 0 0 0 .42  0 0 0 .5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#letter-linen)" />
      </svg>
      {/* window light, falling in two soft panes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden av-fade d1">
        <div className="absolute" style={{ left: -40, top: 60, width: 380, height: 560, transform: "skewX(-18deg) rotate(-6deg)", filter: "blur(18px)", opacity: 0.75 }}>
          <div className="absolute" style={{ left: 0, top: 0, width: 160, height: 540, background: "rgba(255,249,236,.85)" }} />
          <div className="absolute" style={{ left: 178, top: 0, width: 160, height: 540, background: "rgba(255,249,236,.7)" }} />
        </div>
      </div>
      {/* a second, fainter branch lower down, further from the glass */}
      <div className="absolute pointer-events-none av-fade d3" style={{ left: -60, bottom: 60, width: 260, height: 300 }}>
        <svg width="260" height="300" viewBox="0 0 260 300" className="av-sway" style={{ filter: "blur(8px)", transformOrigin: "0% 100%", opacity: 0.7 }}>
          <g fill="rgba(84,72,54,.12)">
            <path d="M10 290 C 60 220, 110 170, 190 120" fill="none" stroke="rgba(84,72,54,.1)" strokeWidth="3" />
            <path d="M80 210 C 70 170, 90 140, 130 125 C 135 165, 115 195, 80 210 Z" />
            <path d="M120 180 C 160 185, 195 175, 220 150 C 185 135, 145 145, 120 180 Z" />
            <path d="M45 255 C 20 230, 15 200, 30 170 C 55 195, 60 225, 45 255 Z" />
          </g>
        </svg>
      </div>

      <StatusBar />

      {/* ---------- the note, centred on the desk ---------- */}
      <div className="relative z-10 h-full pt-[44px] pb-[88px] flex items-center justify-center">
        <div className="av-rise d2" style={{ perspective: 1400, width: 312, cursor: "pointer", transform: "rotate(-1.2deg)" }} onClick={() => setOpen((o) => !o)}>
          {/* top half */}
          <div className="relative px-[30px] pt-[26px] pb-[14px]" style={{ background: paper, borderRadius: "3px 3px 0 0", boxShadow: paperShadow }}>
            <div className="av-serif text-[21px]" style={{ color: T.ink, lineHeight: 1.25, fontWeight: 450 }}>
              Good morning, Todd.
            </div>
            <div
              className="av-count av-tnum inline-block mt-[14px]"
              style={{ fontSize: 60, lineHeight: 1, color: C.fern, letterSpacing: "-0.04em", borderBottom: `1.5px dotted ${how ? C.sage : "rgba(111,143,114,.45)"}`, paddingBottom: 2, transition: "border-color .3s" }}
              onClick={stop(() => setHow((h) => !h))}
              title="tap to see how"
            >
              $2,487<span style={{ fontSize: 26, opacity: 0.55 }}>.36</span>
            </div>
            <div className="av-serif italic text-[16px] mt-[8px]" style={{ color: T.support }}>
              is yours today. Every bill is covered.
            </div>

            <div style={{ maxHeight: how ? 120 : 0, opacity: how ? 1 : 0, overflow: "hidden", transition: "max-height .7s cubic-bezier(.2,.8,.2,1), opacity .5s ease" }}>
              <div className="mt-[12px] pt-[8px]" style={{ borderTop: "1px dashed rgba(58,51,44,.14)" }}>
                {[
                  ["in your accounts", "$4,318.90"],
                  ["bills before Friday", "− $1,684.20"],
                  ["cushion and goals", "− $147.34"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between py-[3px]">
                    <span className="text-[12.5px]" style={{ color: C.muted }}>
                      {k}
                    </span>
                    <span className="av-tnum text-[14px]" style={{ color: C.fern }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom half — folds up over the top */}
          <div className="relative" style={{ transformStyle: "preserve-3d", transformOrigin: "top center", transform: `rotateX(${open ? 0 : -180}deg)`, transition: "transform 1s cubic-bezier(.3,.9,.3,1)" }}>
            <div className="px-[30px] pt-[14px] pb-[22px]" style={{ background: "linear-gradient(180deg,#F3EDE2 0%,#FBF7EF 14%,#FFFDF8 100%)", borderRadius: "0 0 3px 3px", boxShadow: paperShadow, backfaceVisibility: "hidden" }}>
              <Section>{allDone ? "Both done." : "Two small things"}</Section>
              {[
                ["Move $120 to savings", ""],
                ["Pay the electric bill", "$142.36"],
              ].map(([t, v], i) => (
                <div key={t} className="flex items-center gap-[12px] mt-[12px] av-press" onClick={stop(() => setDone((d) => (i === 0 ? [!d[0], d[1]] : [d[0], !d[1]])))}>
                  <Tick done={done[i]} />
                  <div className="relative inline-block flex-1 text-[15px] font-medium" style={{ color: done[i] ? C.muted : C.ink, lineHeight: 1.3, transition: "color .4s" }}>
                    {t}
                    <span className="absolute left-0 top-[52%] h-[1.5px] rounded-full" style={{ width: done[i] ? "100%" : "0%", background: C.oakDeep, transition: "width .45s cubic-bezier(.2,.8,.2,1)" }} />
                  </div>
                  {v && (
                    <span className="av-tnum text-[15.5px]" style={{ color: T.amount, opacity: done[i] ? 0.4 : 1, transition: "opacity .4s" }}>
                      {v}
                    </span>
                  )}
                </div>
              ))}

              {/* the P.S. is in Avail's own hand */}
              <div className="mt-[18px]" style={{ transform: "rotate(-.6deg)" }}>
                <div key={String(corrected)} className="av-hand av-fade" style={{ fontSize: 21, color: "#5A6B5C", lineHeight: 1.05 }}>
                  <span style={{ color: P.terracotta }}>P.S. </span>
                  {corrected ? "Put it back. I'll ask you first next time. " : "Electric ran high last night, so I trimmed your day to $87 till Friday. "}
                  <span className="av-press cursor-pointer" style={{ color: corrected ? C.muted : C.oakDeep, textDecoration: "underline", textDecorationColor: "rgba(168,135,92,.5)", textUnderlineOffset: 3, whiteSpace: "nowrap" }} onClick={stop(() => setCorrected((c) => !c))}>
                    {corrected ? "undo" : "not quite?"}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-end gap-[6px] mt-[10px]">
                <span key={String(allDone)} className="av-hand av-fade" style={{ fontSize: 26, color: C.fern, transform: "rotate(-3deg)", display: "inline-block" }}>
                  {allDone ? "go enjoy the day ~ avail" : "~ avail"}
                </span>
                <svg width="22" height="22" viewBox="0 0 22 22" style={{ transform: "translateY(-4px)" }}>
                  <path d="M3 19C3 9 10 3 19 3c0 10-6 16-16 16Z" fill={P.leaf} opacity=".85" className="av-wc-sm" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 px-[30px] flex items-center justify-between" style={{ background: "#FAF4E9", borderRadius: "4px 4px 0 0", boxShadow: paperShadow, backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
              <Hand size={32} tone={C.fern} rotate={-2}>
                for Todd
              </Hand>
              <span className="av-serif italic text-[14px]" style={{ color: C.muted }}>
                this morning
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* leaf shadows from the plant by the window, swaying slowly */}
      <div className="absolute pointer-events-none av-fade d2" style={{ right: -80, top: -20, width: 340, height: 520, zIndex: 20, mixBlendMode: "multiply" }}>
        <svg width="340" height="520" viewBox="0 0 340 520" className="av-sway" style={{ filter: "blur(3.5px)", transformOrigin: "100% 0%", opacity: 0.85 }}>
          <g fill="rgba(84,72,54,.16)" stroke="rgba(84,72,54,.14)" strokeWidth="3" strokeLinecap="round">
            <path d="M330 10 C 270 120, 230 230, 200 380" fill="none" />
            <path d="M300 70 C 250 90, 200 80, 170 40 C 220 30, 270 40, 300 70 Z" />
            <path d="M282 130 C 250 170, 200 190, 150 180 C 180 140, 230 120, 282 130 Z" />
            <path d="M262 200 C 270 250, 250 290, 210 310 C 200 270, 220 225, 262 200 Z" />
            <path d="M245 255 C 200 270, 150 260, 120 230 C 160 215, 210 220, 245 255 Z" />
            <path d="M226 330 C 240 370, 230 410, 200 440 C 185 400, 195 360, 226 330 Z" />
            <path d="M330 150 C 300 180, 300 220, 320 250" fill="none" />
            <path d="M318 205 C 290 230, 285 270, 300 300 C 320 280, 330 240, 318 205 Z" />
          </g>
        </svg>
      </div>
      <TabBar active="today" />
    </Phone>
  );
}

export default HomeLetter;
