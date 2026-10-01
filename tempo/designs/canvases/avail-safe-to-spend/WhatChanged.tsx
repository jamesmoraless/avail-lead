import { C, Phone, StatusBar, BackBar, Line, Button, Vine } from "./_kit";

/* What changed — the number moved; here's why, kindly.
   No chart. The reasons are the content. */

export function WhatChanged() {
  return (
    <Phone>
      <div className="absolute -right-[34px] bottom-[110px] av-fade d3">
        <Vine size={210} opacity={0.5} flip />
      </div>
      <StatusBar />
      <div className="relative z-10 h-full pt-[44px] overflow-hidden">
        <BackBar title="since yesterday" />

        <div className="px-[26px] mt-[16px] av-rise d2">
          <div className="av-serif font-medium" style={{ fontSize: 30, lineHeight: 1.2, color: C.fern }}>
            A little lower than yesterday.
          </div>
          <p className="text-[13.5px] mt-[10px]" style={{ color: C.muted, lineHeight: 1.55 }}>
            Down <span className="av-serif text-[15px]" style={{ color: C.oakDeep }}>$34</span>. That's okay — three things
            posted overnight, and one of them ran a little high.
          </p>
        </div>

        <div className="px-[22px] mt-[22px] av-rise d3">
          <Line first title="Dinner at Sunrise Diner" sub="A touch above your usual Thursday" value="− $18" tone={C.oakDeep} py={13} />
          <Line title="Gas on Rivers Ave" value="− $9" tone={C.oakDeep} py={13} />
          <Line title="The electric bill" sub="Duke Energy ran $67 higher than it usually does" value="− $7" tone={C.oakDeep} py={13} />
        </div>

        <div className="px-[26px] mt-[30px] av-rise d5">
          <div className="pl-[16px]" style={{ borderLeft: `2px solid ${C.oak}` }}>
            <div className="av-serif font-medium text-[18px]" style={{ color: C.fern, lineHeight: 1.3 }}>
              We've already smoothed it out.
            </div>
            <p className="text-[13.5px] mt-[6px]" style={{ color: C.muted, lineHeight: 1.55, maxWidth: 270 }}>
              Your daily number is <span style={{ color: C.ink, fontWeight: 500 }}>$87</span> instead of $96 until Friday.
              Nothing for you to do.
            </p>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 px-[22px] pb-[30px] av-rise d7">
          <Button>Thanks</Button>
        </div>
      </div>
    </Phone>
  );
}

export default WhatChanged;
