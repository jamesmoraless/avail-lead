import { useState } from "react";
import { C, P, T, Phone, StatusBar, TabBar, Wordmark, Aside, Quote, Greeting, Hero, Support } from "./_kit";

/* R3 · The Forecast.
   "Can I afford this?" answered the way people already talk about the days
   ahead: as weather. The week sits under a sky. Ask about a purchase — in
   your own words — and the sky changes: sunny through Friday, a little cloud
   on Thursday, or rain before payday. No judgment, no gauge. A forecast. */

const WEEK = 243;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const X = [58, 127, 196, 265, 334];

const TRIES: [string, number, number][] = [
  // thing, usual price, step for − / +
  ["coffee", 6, 1],
  ["lunch", 18, 2],
  ["dinner out", 180, 10],
  ["new shoes", 260, 20],
];

/** The things on the shelf, painted. Each sits on a 48×44 baseline at y=40. */
function Thing({ kind, on }: { kind: number; on: boolean }) {
  const o = on ? 0.95 : 0.78;
  return (
    <svg width="66" height="60" viewBox="0 0 48 44" style={{ overflow: "visible", display: "block" }}>
      {kind === 0 && (
        <g>
          {/* coffee: a stoneware cup on a saucer, a little steam */}
          <ellipse cx="22" cy="39" rx="17" ry="3.4" fill="#E9DFCF" opacity={o} className="av-wc-sm" />
          <path d="M11 20h22l-2.4 14.5a3 3 0 0 1-3 2.5H16.4a3 3 0 0 1-3-2.5Z" fill="#E7D6BC" opacity={o} className="av-wc-sm" />
          <path d="M33 23.5c5 0 6 6.5 0 7.5" fill="none" stroke="#C9B08C" strokeWidth="2.2" strokeLinecap="round" opacity={o} />
          <ellipse cx="22" cy="20.5" rx="11" ry="2.2" fill="#8A6245" opacity={o * 0.9} />
          <path d="M19 15c-2-3 2-4 0-7M25 15c-2-3 2-4 0-7" fill="none" stroke="#B9A88F" strokeWidth="1.1" strokeLinecap="round" className={on ? "av-fade" : ""} opacity={on ? 0.9 : 0} />
        </g>
      )}
      {kind === 1 && (
        <g>
          {/* lunch: a bowl of greens */}
          <path d="M18 18c2-6 8-7 10-3 3-5 9-2 8 3" fill={P.moss} opacity={o} className="av-wc-sm" />
          <circle cx="16" cy="19" r="3.4" fill={P.terracotta} opacity={o * 0.85} className="av-wc-sm" />
          <path d="M6 20h36c0 9.5-8 17-18 17S6 29.5 6 20Z" fill="#DCCBB0" opacity={o} className="av-wc-sm" />
          <path d="M6 20h36" stroke="#B59C78" strokeWidth="1" opacity=".6" />
        </g>
      )}
      {kind === 2 && (
        <g>
          {/* dinner out: a glass of red */}
          <path d="M14 8h20c0 10-4 15-10 15S14 18 14 8Z" fill="none" stroke="#B9A88F" strokeWidth="1.1" opacity={o} />
          <path d="M15 13h18c-.8 6-4.4 10-9 10s-8.2-4-9-10Z" fill="#B2584A" opacity={o} className="av-wc-sm" />
          <path d="M24 23v12" stroke="#B9A88F" strokeWidth="1.3" />
          <ellipse cx="24" cy="37" rx="8" ry="2.2" fill="#E2D6C4" stroke="#B9A88F" strokeWidth=".9" opacity={o} />
          <circle cx="38" cy="34" r="3" fill="#F2C48E" opacity={on ? 0.9 : 0.5} className="av-wc-sm" />
        </g>
      )}
      {kind === 3 && (
        <g>
          {/* new shoes: one sneaker, side on */}
          <path d="M5 33c0-6 2-12 6-14 3 2 7 2 10 0 4 4 10 7 17 8 4 1 6 3 6 6v2H5Z" fill="#B9CDB4" opacity={o} className="av-wc-sm" />
          <path d="M5 35h39" stroke="#8FA68A" strokeWidth="2.4" strokeLinecap="round" opacity={o} />
          <path d="M14 22l3 4M18 21l3 4M22 21l3 4" stroke="#6F8F72" strokeWidth="1" strokeLinecap="round" opacity={o * 0.8} />
        </g>
      )}
    </svg>
  );
}

type Sky = "sun" | "partly" | "cloud" | "rain";

function skyFor(i: number, ratio: number, over: boolean): Sky {
  if (i === 4) return "sun"; // payday
  if (over) return i >= 3 ? "rain" : i >= 2 ? "cloud" : i >= 1 ? "partly" : "sun";
  if (ratio >= 0.75) return "sun";
  if (ratio >= 0.5) return i >= 3 ? "partly" : "sun";
  if (ratio >= 0.25) return i >= 3 ? "cloud" : i >= 2 ? "partly" : "sun";
  return i >= 2 ? "cloud" : i >= 1 ? "partly" : "sun";
}

function parse(text: string): { amount: number; thing: string } {
  const m = text.match(/\$?\s?(\d{1,4})/);
  const amount = m ? parseInt(m[1], 10) : 0;
  const t = text.toLowerCase().match(/\b(?:on|for)\s+(?:a\s+|the\s+|some\s+)?([a-z][a-z ]{1,24}?)(?:\s+(?:tonight|today|tomorrow|this|next)\b|[?.!,]|$)/);
  return { amount, thing: t ? t[1].trim() : "" };
}

function forecast(amount: number, thing: string) {
  const left = WEEK - amount;
  const ratio = left / WEEK;
  const what = thing ? `${thing} at $${amount}` : `$${amount}`;
  const What = what[0].toUpperCase() + what.slice(1);
  if (amount > WEEK) return { line: `Rain by Thursday. ${What} is $${amount - WEEK} more than the week holds. Sunnier after Friday — I can remind you.`, tone: C.clay };
  if (ratio >= 0.75) return { line: `Sunny all week. After ${what} you'd still have $${left} through Friday.`, tone: C.fern };
  if (ratio >= 0.5) return { line: `Fair, with a little cloud on Thursday. ${What} leaves $${left} through Friday — that's fine.`, tone: C.fern };
  if (ratio >= 0.25) return { line: `Clouds by Thursday. ${What} leaves $${left} for the rest of the week — doable, just quieter days.`, tone: C.oakDeep };
  return { line: `Grey until payday. ${What} leaves $${left} — it can be done, but Thursday would be tight.`, tone: C.oakDeep };
}

/** One day's sky. Every layer is always drawn; the state only changes opacity and position, so weather drifts in rather than switching. */
function Day({ x, sky, payday }: { x: number; sky: Sky; payday?: boolean }) {
  const sunOn = sky === "sun" || sky === "partly";
  const cloudOn = sky !== "sun";
  const dark = sky === "rain";
  const r = payday ? 15 : 12;
  const dx = sky === "partly" ? -8 : 0;
  const dy = sky === "partly" ? -7 : 0;
  return (
    <g>
      {/* sun: a watercolour dab */}
      <g style={{ transform: `translate(${x + dx}px, ${58 + dy}px)`, transition: "transform .9s cubic-bezier(.3,.8,.3,1)" }}>
        <circle r={r + 11} fill={P.dawn} opacity={sunOn ? 0.5 : 0} className="av-wc-sm" style={{ transition: "opacity .9s ease" }} />
        <circle r={r} fill={payday ? P.apricot : "#F2C48E"} className="av-wc-sm" style={{ opacity: sunOn ? 0.95 : 0, transform: `scale(${sunOn ? 1 : 0.6})`, transformOrigin: "0 0", transition: "opacity .9s ease, transform .9s ease" }} />
      </g>
      {/* cloud: a grey-blue wash */}
      <g style={{ transform: `translate(${x + 4}px, ${cloudOn ? 64 : 76}px)`, opacity: cloudOn ? 1 : 0, transition: "transform .9s cubic-bezier(.3,.8,.3,1), opacity .9s ease" }}>
        <path d="M-19 6a7 7 0 0 1 1-13.8A11 11 0 0 1 3-13a9 9 0 0 1 13 7A6.5 6.5 0 0 1 16 6Z" fill={dark ? "#A9B3B4" : "#D5DCDC"} opacity=".92" className="av-wc-sm" style={{ transition: "fill .9s ease" }} />
      </g>
      {/* rain: pencil strokes */}
      <g style={{ opacity: dark ? 1 : 0, transition: "opacity .9s ease .2s" }}>
        {[-9, -1, 7].map((o, k) => (
          <line key={o} x1={x + 5 + o} y1={76 + (k % 2) * 3} x2={x + 2 + o} y2={86 + (k % 2) * 3} stroke="#7F9AA0" strokeWidth="1.5" strokeLinecap="round" className="av-paint-soft" />
        ))}
      </g>
    </g>
  );
}

export function HomeForecast() {
  const [item, setItem] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);
  const thing = item === null ? "" : TRIES[item][0];
  const pick = (n: number) => {
    if (item === n) return reset();
    setItem(n);
    setAmount(TRIES[n][1]);
  };
  const nudge = (dir: 1 | -1) => {
    if (item === null) return;
    const step = TRIES[item][2];
    setAmount((a) => Math.max(step, Math.min(600, a + dir * step)));
  };
  const reset = () => {
    setItem(null);
    setAmount(0);
  };
  const asking = amount > 0;
  const over = amount > WEEK;
  const left = Math.max(0, WEEK - amount);
  const ratio = asking ? left / WEEK : 1;
  const fc = asking ? forecast(amount, thing) : null;
  const tone = fc ? fc.tone : C.fern;
    const skies = DAYS.map((_, i) => skyFor(i, ratio, over));
  const grey = asking && ratio < 0.5;

  return (
    <Phone>
      <StatusBar />
      <div className="relative z-10 h-full pt-[44px] overflow-hidden select-none">
        <div className="px-[26px] pt-[16px] av-fade d1">
          <Wordmark size={23} />
        </div>

        <div className="px-[26px] mt-[18px] av-rise d2">
          <Greeting>Good morning, Todd.</Greeting>
          <div key={asking ? thing || "n" : "idle"} className="av-fade">
            <Hero tone={tone} className="mt-[16px]">
              ${asking ? left : 94}
            </Hero>
            <Support className="mt-[9px]">{asking ? `would be left for the week, after ${thing || "that"}.` : "is yours today, and $243 through Friday."}</Support>
          </div>
        </div>

        {/* ---------- the week, under a sky ---------- */}
        <div className="mt-[10px] av-pop d3">
          <svg viewBox="0 0 390 172" width="100%" style={{ display: "block" }}>
            {/* the sky: one loose wash, warm when the week is easy, grey when it isn't */}
            <rect x="6" y="16" width="378" height="104" rx="30" fill={grey ? "#DCDFDA" : "#F6E0C6"} opacity=".75" className="av-wc" style={{ transition: "fill 1.2s ease" }} />
            {/* the hills the week sits on */}
            <path d="M-6 104C70 92 120 106 190 98S300 84 396 94V132H-6Z" fill={grey ? "#B8C3B1" : "#BCCDB2"} opacity=".9" className="av-wc" style={{ transition: "fill 1.2s ease" }} />
            <path d="M-6 116C80 108 150 120 230 110S330 102 396 108V132H-6Z" fill={grey ? P.leaf : P.moss} opacity=".7" className="av-wc" style={{ transition: "fill 1.2s ease" }} />
            {DAYS.map((d, i) => (
              <g key={d}>
                <Day x={X[i]} sky={skies[i]} payday={i === 4} />
                <text x={X[i]} y="149" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight={i === 0 || i === 4 ? 500 : 400} fill={i === 4 ? P.terracotta : i === 0 ? C.fern : "rgba(58,51,44,.5)"}>
                  {i === 4 ? "payday" : i === 0 ? "today" : d}
                </text>
                <text x={X[i]} y="165" textAnchor="middle" fontFamily="Newsreader, Georgia, serif" fontStyle="italic" fontSize="12" fill={skies[i] === "rain" ? C.clay : skies[i] === "cloud" ? C.oakDeep : C.sage} style={{ opacity: asking ? 1 : 0, transition: "opacity .6s ease" }}>
                  {skies[i] === "sun" ? "clear" : skies[i] === "partly" ? "fair" : skies[i] === "cloud" ? "cloudy" : "rain"}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* ---------- can I afford it? a shelf of everyday things ---------- */}
        <div className="px-[26px] mt-[26px] av-rise d5">
          <div className="av-serif" style={{ fontSize: 20, color: T.ink, lineHeight: 1.3 }}>
            Thinking of something?
          </div>

          {/* the shelf */}
          <div className="relative mt-[14px]">
            <div className="grid grid-cols-4">
              {TRIES.map(([name], n) => {
                const on = item === n;
                const dim = item !== null && !on;
                return (
                  <button key={name} className="av-press flex flex-col items-center cursor-pointer" onClick={() => pick(n)} style={{ opacity: dim ? 0.45 : 1, transition: "opacity .4s" }}>
                    <div className="relative" style={{ transform: `translateY(${on ? -8 : 0}px)`, transition: "transform .6s cubic-bezier(.3,1.4,.5,1)" }}>
                      {/* a soft wash behind the one you're weighing */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 84, height: 84, background: "radial-gradient(circle, rgba(246,224,198,.9) 0%, rgba(246,224,198,0) 70%)", opacity: on ? 1 : 0, transition: "opacity .5s" }} />
                      <div className="relative">
                        <Thing kind={n} on={on} />
                      </div>
                    </div>
                    <div className="mt-[12px] text-[13px]" style={{ color: on ? T.ink : C.muted, fontWeight: on ? 500 : 400, transition: "color .3s" }}>
                      {name}
                    </div>
                  </button>
                );
              })}
            </div>
            {/* the oak ledge they sit on */}
            <div className="absolute left-[0px] right-[0px] h-[5px] rounded-full" style={{ top: 55, background: "linear-gradient(180deg,#D9BF98,#C2A276)", boxShadow: "0 4px 6px -4px rgba(92,66,36,.4)" }} />
          </div>

          <div className="mt-[14px] text-[12.5px]" style={{ color: C.muted, opacity: fc ? 0 : 1, maxHeight: fc ? 0 : 20, overflow: "hidden", transition: "opacity .3s, max-height .4s" }}>
            Tap one to see how the week's weather changes.
          </div>

          {/* how much, and what the sky says */}
          <div style={{ marginTop: 16, maxHeight: fc ? 150 : 0, opacity: fc ? 1 : 0, overflow: "hidden", transition: "max-height .5s ease, opacity .4s ease" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-[8px]">
                <span className="text-[13px]" style={{ color: C.muted }}>
                  about
                </span>
                <span className="av-tnum text-[24px]" style={{ color: T.ink, letterSpacing: "-0.02em" }}>
                  ${amount}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                {[-1, 1].map((d) => (
                  <button key={d} aria-label={d < 0 ? "less" : "more"} className="av-press w-[34px] h-[34px] rounded-full flex items-center justify-center cursor-pointer" style={{ boxShadow: "inset 0 0 0 1px rgba(58,51,44,.16)", background: "rgba(253,251,246,.8)", color: T.ink, fontSize: 18, lineHeight: 1 }} onClick={() => nudge(d as 1 | -1)}>
                    {d < 0 ? "−" : "+"}
                  </button>
                ))}
              </div>
            </div>
            <div key={fc ? fc.line : "x"} className="av-fade pl-[14px] mt-[12px]" style={{ borderLeft: `2px solid ${tone}` }}>
              <Aside tone={tone} size={15}>
                {fc ? fc.line : ""}
              </Aside>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-[118px] px-[40px]" style={{ opacity: asking ? 0 : 1, transition: "opacity .4s" }}>
          <Quote text="Enough is a feast." by="Buddhist proverb" align="center" />
        </div>
      </div>
      <TabBar active="today" />
    </Phone>
  );
}

export default HomeForecast;
