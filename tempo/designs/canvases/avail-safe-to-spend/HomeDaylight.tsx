import { C, Phone, StatusBar, TabBar, DawnScene, Wordmark, OakShelf, Line, Whisper, TextLink, Quote, Blob } from "./_kit";

/* Home A — the morning brief.
   A pale dawn through the window, one paper card on an oak shelf,
   two small things, and a sentence to carry. */

export function HomeDaylight() {
  return (
    <Phone light={false}>
      <DawnScene h={310} />
      <StatusBar />

      <div className="relative z-10 h-full pt-[44px] overflow-hidden">
        <div className="px-[26px] pt-[16px] flex items-center justify-between av-fade d1">
          <Wordmark size={22} />
          <span className="av-serif italic text-[13.5px]" style={{ color: C.fern, opacity: 0.8 }}>
            Thursday, April 24
          </span>
        </div>

        <div className="px-[26px] mt-[30px] av-rise d2">
          <div className="av-serif text-[28px]" style={{ lineHeight: 1.15, color: C.fern }}>
            Good morning, Todd.
          </div>
        </div>

        {/* ---------- the card, on its shelf ---------- */}
        <div className="px-[22px] mt-[40px]">
          <div
            className="av-rise d3 px-[26px] pt-[26px] pb-[22px] relative overflow-hidden"
            style={{ background: C.paper, borderRadius: "30px 30px 6px 6px", boxShadow: "0 26px 44px -30px rgba(59,52,44,.4)" }}
          >
            <Blob size={230} className="-left-[60px] -top-[30px]" />
            <div className="relative">
              <Whisper>Today you can spend</Whisper>
              <div className="av-serif av-count font-medium mt-[8px]" style={{ fontSize: 66, lineHeight: 0.95, color: C.fern }}>
                $2,487<span style={{ fontSize: 30, opacity: 0.5 }}>.36</span>
              </div>
              <div className="av-serif italic text-[15.5px] mt-[12px]" style={{ color: C.fern, lineHeight: 1.4 }}>
                and everything's still covered.
              </div>
              <div className="text-[13px] mt-[10px]" style={{ color: C.muted, lineHeight: 1.45 }}>
                You're $12 ahead of where you planned to be. Friday is payday.
              </div>
              <div className="mt-[18px] pt-[14px]" style={{ borderTop: `1px solid ${C.line}` }}>
                <TextLink>How we got here</TextLink>
              </div>
            </div>
          </div>
        </div>
        <OakShelf />

        {/* ---------- two small things ---------- */}
        <div className="px-[26px] mt-[28px] av-rise d5">
          <div className="px-[4px] mb-[4px]">
            <Whisper>Two small things today</Whisper>
          </div>
          <Line first check="empty" title="Move $120 to savings" sub="Your emergency fund grows a little" value="$120" tone={C.fern} py={13} />
          <Line check="empty" title="Pay the electric bill" sub="Duke Energy, due today" value="$142.36" tone={C.fern} py={13} />
        </div>

        {/* ---------- the daily word ---------- */}
        <div className="absolute left-0 right-0 bottom-[90px] px-[26px] pb-[16px]">
          <div className="pt-[16px]" style={{ borderTop: `1px solid ${C.oak}` }}>
            <Quote text="Discipline is the bridge between goals and accomplishment." by="Jim Rohn" />
          </div>
        </div>
      </div>

      <TabBar active="today" />
    </Phone>
  );
}

export default HomeDaylight;
