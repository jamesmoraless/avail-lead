import { C, Phone, StatusBar, TabBar, Wordmark, Vine, Line, Whisper, TextLink, Quote, MeadowBand, Blob } from "./_kit";

/* Home B — one number.
   A plant in the corner, the number in a thin ring, one small thing.
   The room, mostly empty. */

export function HomeGarden() {
  const R = 86;
  const CIRC = 2 * Math.PI * R;
  const pct = 0.72;

  return (
    <Phone>
      <div className="absolute -right-[24px] top-[36px] av-fade d2">
        <Vine size={200} opacity={0.5} />
      </div>
      <StatusBar />

      <div className="relative z-10 h-full pt-[44px] overflow-hidden">
        <div className="px-[26px] pt-[16px] av-fade d1">
          <Wordmark size={22} />
        </div>

        <div className="px-[26px] mt-[30px] av-rise d2">
          <div className="av-serif text-[28px]" style={{ lineHeight: 1.15, color: C.fern }}>
            Good morning, Todd.
          </div>
        </div>

        {/* ---------- the number ---------- */}
        <div className="relative flex justify-center mt-[24px]">
          <Blob size={270} className="top-[-20px]" />
          <div className="relative av-pop d3">
            <svg width="216" height="216" viewBox="0 0 216 216">
              <circle cx="108" cy="108" r={R} fill="none" stroke="rgba(59,52,44,.07)" strokeWidth="4" />
              <circle
                className="av-draw"
                cx="108"
                cy="108"
                r={R}
                fill="none"
                stroke={C.sage}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC}
                style={{ ["--to" as any]: `${CIRC * (1 - pct)}`, transform: "rotate(-90deg)", transformOrigin: "108px 108px" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Whisper>you can spend</Whisper>
              <div className="av-serif av-count font-medium mt-[6px]" style={{ fontSize: 62, lineHeight: 1, color: C.fern }}>
                $94
              </div>
              <Whisper>today</Whisper>
            </div>
          </div>
        </div>

        <div className="text-center mt-[18px] px-[44px] av-fade d5">
          <div className="text-[13.5px]" style={{ color: C.muted, lineHeight: 1.5 }}>
            $243 will get you to Friday's paycheck, with room to breathe.
          </div>
          <div className="mt-[8px]">
            <TextLink>How we got here</TextLink>
          </div>
        </div>

        {/* ---------- one small thing ---------- */}
        <div className="px-[30px] mt-[28px] av-rise d7">
          <div className="px-[4px] mb-[2px]">
            <Whisper>One small thing today</Whisper>
          </div>
          <Line first check="empty" title="Pay the electric bill" sub="Duke Energy, due today" value="$142.36" tone={C.fern} py={13} />
        </div>

        {/* ---------- the daily word, then the meadow ---------- */}
        <div className="absolute left-0 right-0 bottom-[150px] px-[36px]">
          <Quote text="Let us not grow weary of doing good, for in due season we will reap." by="Galatians 6:9" align="center" />
        </div>
        <div className="absolute inset-x-0 bottom-[90px] pointer-events-none">
          <MeadowBand h={54} />
        </div>
      </div>

      <TabBar active="today" />
    </Phone>
  );
}

export default HomeGarden;
