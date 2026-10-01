import { useEffect, useRef, useState } from "react";
import { C, P, T, Phone, StatusBar, TabBar, Wordmark, Task, Aside, WindowLight, Hand, Greeting, Section, Support, HomeHeader, Sheet } from "./_kit";

/* R1 · Exhale.
   A paper disc and your breath. HOLD the disc to breathe — an arc times
   four seconds while the number comes into focus. TAP the disc and it turns
   over like a coin to show how the number was made. Then one sentence asks
   how money feels this morning; the answer changes the room — the light,
   the ring, how much is asked of you — not just the list. */

type Phase = "idle" | "in" | "out" | "done";
type Mood = "heavy" | "okay" | "light";

const R = 110;
const CIRC = 2 * Math.PI * R;
const HOLD_MS = 260;

const MOOD = {
  heavy: { light: 0.45, ring: 0.55, line: "One thing today. The rest can wait.", tasks: [1] },
  okay: { light: 1, ring: 1, line: "Two small things, all covered.", tasks: [0, 1] },
  light: { light: 1.5, ring: 1, line: "Two small things, plus one if you like.", tasks: [0, 1, 2] },
} as const;

const TASKS = [
  { title: "Move $120 to savings", value: "$120" },
  { title: "Pay the electric bill", value: "$142.36" },
  { title: "A little extra to savings, if you like", value: "$40" },
];

/** A stone for heavy, a sprout for okay, a feather for light — painted, not drawn. */
function MoodObject({ kind, on }: { kind: Mood; on: boolean }) {
  const o = on ? 0.95 : 0.55;
  return (
    <svg width="46" height="38" viewBox="0 0 46 38" style={{ display: "block", overflow: "visible" }}>
      {kind === "heavy" && (
        <g>
          <ellipse cx="23" cy="33" rx="15" ry="2.6" fill="rgba(58,51,44,.14)" />
          <path d="M7 25C7 15 15 9 24 9s16 6 15 15c-1 7-8 9-16 9S7 31 7 25Z" fill={on ? "#8E9A93" : P.stone} opacity={o} className="av-wc-sm" style={{ transition: "opacity .4s" }} />
          <path d="M14 17c3-3 7-4 10-4" stroke="rgba(255,255,255,.6)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>
      )}
      {kind === "okay" && (
        <g>
          <path d="M23 34V21" stroke={P.forest} strokeWidth="1.4" strokeLinecap="round" opacity={o} />
          <path d="M23 22C12 22 8 12 10 5c8 0 15 5 13 17Z" fill={P.moss} opacity={o} className="av-wc-sm" style={{ transition: "opacity .4s" }} />
          <path d="M23 24C34 24 38 15 36 8c-8 0-14 5-13 16Z" fill={P.leaf} opacity={o} className="av-wc-sm" style={{ transition: "opacity .4s" }} />
        </g>
      )}
      {kind === "light" && (
        <g transform="rotate(-28 23 19)">
          <path d="M23 3c8 5 9 16 2 25l-2 3-2-3c-7-9-6-20 2-25Z" fill={P.ochre} opacity={o * 0.85} className="av-wc-sm" style={{ transition: "opacity .4s" }} />
          <path d="M23 6V35" stroke={P.pencil} strokeWidth="1" strokeLinecap="round" opacity={o} />
        </g>
      )}
    </svg>
  );
}

export function HomeExhale() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [flipped, setFlipped] = useState(false);
  const [mood, setMood] = useState<Mood | null>(null);
  const [done, setDone] = useState<boolean[]>([false, false, false]);
  const holdTimer = useRef<number | null>(null);
  const breathing = useRef(false);
  const settle = useRef<number | null>(null);

  // one guided breath on arrival, so the number is there when you look
  useEffect(() => {
    const a = window.setTimeout(() => setPhase("in"), 150);
    const b = window.setTimeout(() => setPhase("out"), 4000);
    const c = window.setTimeout(() => setPhase("done"), 7200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, []);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    if (settle.current) clearTimeout(settle.current);
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = null;
      breathing.current = true;
      setPhase("in");
    }, HOLD_MS);
  };
  const up = () => {
    if (holdTimer.current) {
      // released before the hold began: a tap — turn the disc over
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
      if (phase === "done") setFlipped((f) => !f);
      return;
    }
    if (!breathing.current) return;
    breathing.current = false;
    setPhase("out");
    settle.current = window.setTimeout(() => setPhase("done"), 3400);
  };

  const grown = phase === "in";
  const revealed = phase !== "idle";
  const ready = phase === "done";
  const m = mood ? MOOD[mood] : null;
  const tasks = m ? m.tasks : [0, 1];
  const allDone = tasks.every((i) => done[i]);
  const ease = `${grown ? 4 : 3.4}s cubic-bezier(.45,.02,.3,1)`;
  const caption = phase === "idle" ? "Press and hold. Breathe in." : phase === "in" ? "Breathe in…" : phase === "out" ? "…and let it go." : flipped ? "tap to turn it back" : "";

  return (
    <Phone light={false}>
      {/* the room's light answers the mood */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: (m ? m.light : 1) / 1.5, transition: "opacity 1.6s ease" }}>
        <WindowLight strength={1.5} />
      </div>
      <StatusBar />

      <div className="relative z-10 h-full pt-[44px] overflow-hidden select-none">
        <div className="av-fade d1">
          <HomeHeader />
        </div>

        <div className="px-[26px] mt-[28px] av-rise d2">
          <Greeting>Good morning, Todd.</Greeting>
        </div>

        {/* ---------- the disc ---------- */}
        <div
          className="relative mx-auto mt-[14px] flex items-center justify-center"
          style={{ width: 300, height: 256, cursor: "pointer", touchAction: "none", perspective: 900 }}
          onPointerDown={down}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={up}
        >
          <svg className="absolute" width="300" height="256" viewBox="0 0 300 256" style={{ transform: "rotate(-90deg)", opacity: m ? m.ring : 1, transition: "opacity 1.2s ease" }}>
            <circle cx="150" cy="128" r={R} fill="none" stroke={P.pencil} strokeOpacity=".22" strokeWidth="1" className="av-paint-soft" />
            <circle
              cx="150"
              cy="128"
              r={R}
              fill="none"
              stroke={P.leaf}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={grown ? 0 : CIRC}
              style={{ transition: `stroke-dashoffset ${grown ? "4s linear" : "3.4s cubic-bezier(.4,0,.2,1)"}` }}
            />
          </svg>

          {/* the coin: number on the front, the arithmetic on the back */}
          <div
            className="relative"
            style={{ width: 194, height: 194, transformStyle: "preserve-3d", transform: `rotateY(${flipped ? 180 : 0}deg) scale(${grown ? 1.07 : 1})`, transition: `transform ${flipped || !grown ? ".9s cubic-bezier(.3,.9,.3,1)" : ease}` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: "hidden" }}>
              {/* the sun, in watercolour: two washes that deepen as you breathe */}
              <svg className="absolute" width="260" height="260" viewBox="0 0 260 260" style={{ left: -33, top: -33, overflow: "visible" }}>
                <circle cx="130" cy="130" r="98" fill={P.dawn} opacity={grown ? 0.62 : 0.42} className="av-wc" style={{ transition: `opacity ${ease}` }} />
                <circle cx="118" cy="122" r="70" fill={P.apricot} opacity={grown ? 0.5 : 0.28} className="av-wc" style={{ transition: `opacity ${ease}` }} />
                <circle cx="148" cy="146" r="46" fill="#F7E3C6" opacity=".55" className="av-wc" />
              </svg>
              <div className="relative" style={{ opacity: revealed ? 1 : 0.3, filter: revealed ? "blur(0px)" : "blur(6px)", transition: "opacity 2.6s ease, filter 2.6s ease" }}>
                <div className="av-tnum" style={{ fontSize: 54, lineHeight: 1, color: C.fern, letterSpacing: "-0.04em" }}>
                  $2,487
                </div>
                <div className="av-serif italic text-[15px] mt-[6px]" style={{ color: "#7A5E45" }}>
                  is yours today
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-full flex flex-col items-center justify-center px-[26px]"
              style={{ background: "#FFFCF6", boxShadow: "0 22px 40px -30px rgba(58,51,44,.5), inset 0 0 0 1px rgba(58,51,44,.06)", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Hand size={19} tone={C.oakDeep}>
                how we got here
              </Hand>
              {[
                ["in your accounts", "$4,319"],
                ["bills before Friday", "− $1,684"],
                ["cushion and goals", "− $147"],
              ].map(([k, v], i) => (
                <div key={k} className="w-full flex items-baseline justify-between gap-[8px] whitespace-nowrap" style={{ marginTop: i ? 4 : 8, paddingTop: i ? 4 : 0, borderTop: i ? `1px solid ${C.line}` : "none" }}>
                  <span className="text-[10.5px]" style={{ color: C.muted }}>
                    {k}
                  </span>
                  <span className="av-serif av-tnum text-[13px]" style={{ color: C.fern }}>
                    {v}
                  </span>
                </div>
              ))}
              <div className="w-full flex items-baseline justify-between mt-[4px] pt-[4px]" style={{ borderTop: `1px solid ${C.oak}` }}>
                <span className="text-[10.5px]" style={{ color: C.fern }}>
                  yours
                </span>
                <span className="av-serif av-tnum text-[14px]" style={{ color: C.fern }}>
                  $2,487
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center px-[40px]" style={{ minHeight: 24 }}>
          <div key={caption} className="av-fade">
            <Hand size={22} tone={C.oakDeep}>
              {caption}
            </Hand>
          </div>
        </div>

        <Sheet className="mt-[20px]">
          {/* ---------- how does money feel? — a question, then three words ---------- */}
          <div className="px-[32px] mt-[12px]" style={{ opacity: ready ? 1 : 0, transform: `translateY(${ready ? 0 : 8}px)`, transition: "opacity 1.4s ease .2s, transform 1.4s ease .2s", pointerEvents: ready ? "auto" : "none" }}>
            <Section>This morning, money feels</Section>
            {/* three small objects: a stone, a leaf, a feather */}
            <div className="grid grid-cols-3 gap-[10px] mt-[12px]">
              {(["heavy", "okay", "light"] as Mood[]).map((w) => {
                const on = mood === w;
                const dim = mood && !on;
                const lift = on ? (w === "heavy" ? 3 : w === "light" ? -6 : 0) : 0;
                return (
                  <button
                    key={w}
                    className="av-press relative flex flex-col items-center gap-[6px] rounded-[18px] py-[10px] cursor-pointer"
                    style={{ background: "rgba(253,251,246,.75)", boxShadow: on ? "none" : "inset 0 0 0 1px rgba(58,51,44,.08)", opacity: dim ? 0.6 : 1, transition: "box-shadow .4s ease, opacity .4s ease" }}
                    onClick={() => setMood(on ? null : w)}
                  >
                    {/* chosen: a wash of colour soaks into the tile */}
                    <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: "visible" }}>
                      <rect x="3" y="4" width="94" height="92" rx="16" fill={w === "heavy" ? "#C9D0CB" : w === "okay" ? "#CFDDBF" : "#F3DDB5"} opacity={on ? 0.95 : 0} className="av-wc" style={{ transition: "opacity .6s ease" }} />
                    </svg>
                    <span className={`relative ${on && w === "okay" ? "av-sway" : ""}`} style={{ display: "block", transform: `translateY(${lift}px)`, transition: "transform .7s cubic-bezier(.3,1.4,.5,1)", transformOrigin: "50% 90%" }}>
                      <MoodObject kind={w} on={on} />
                    </span>
                    <span className="relative" style={{ fontSize: 13.5, color: on ? T.ink : C.muted, lineHeight: 1, fontWeight: 500, transition: "color .4s ease" }}>
                      {w}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* the reply — the one line that speaks */}
            <div className="mt-[18px]" style={{ minHeight: 26 }}>
              <div key={(mood ?? "none") + String(allDone)} className="av-fade">
                <Support>{allDone && m ? "That's the whole day. Go enjoy it." : m ? m.line : "Every bill is covered."}</Support>
              </div>
            </div>

            <div className="mt-[10px]">
              {tasks.map((i, n) => (
                <Task key={i} first={n === 0} title={TASKS[i].title} value={TASKS[i].value} py={11} done={done[i]} onToggle={() => setDone((d) => d.map((v, k) => (k === i ? !v : v)))} />
              ))}
            </div>
          </div>
        </Sheet>
      </div>
      <TabBar active="today" />
    </Phone>
  );
}

export default HomeExhale;
