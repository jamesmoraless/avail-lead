import { C, Phone, StatusBar, BackBar, Line, Whisper, Button, TextLink, ICON, Blob } from "./_kit";

/* How we got here — the trust screen.
   Five sentences a person can read aloud, each with its number. */

export function WhyThisNumber() {
  return (
    <Phone>
      <StatusBar />
      <div className="relative z-10 h-full pt-[44px] overflow-hidden">
        <BackBar title="this morning" />

        <div className="px-[26px] mt-[16px] relative av-rise d2">
          <Blob size={200} className="-left-[70px] -top-[40px]" />
          <div className="relative">
            <div className="av-serif font-medium" style={{ fontSize: 30, lineHeight: 1.2, color: C.fern }}>
              Here's how we got there.
            </div>
            <p className="text-[13.5px] mt-[10px]" style={{ color: C.muted, lineHeight: 1.55 }}>
              We start with what's in your accounts, set aside what's already spoken for before Friday, and what's
              left is yours — no maths homework required.
            </p>
          </div>
        </div>

        <div className="px-[22px] mt-[20px] av-rise d3">
          <Line first title="You have this in your accounts" sub="Checking and savings, as of this morning" value="$4,318.90" tone={C.fern} py={13} />
          <Line title="Bills before Friday's paycheck" sub="Mortgage, electric, internet, Netflix" value="− $1,684.20" tone={C.oakDeep} py={13} />
          <Line title="A cushion, just in case" sub="2% of your paycheck. Yours to change." value="− $68.40" tone={C.oakDeep} py={13} />
          <Line title="Toward the goals you chose" sub="The vacation fund and the emergency fund" value="− $78.94" tone={C.oakDeep} py={13} />
          <div style={{ borderTop: `1px solid ${C.oak}` }}>
            <Line first strong title="Yours to spend today" value="$2,487.36" tone={C.fern} py={16} />
          </div>
        </div>

        <div className="px-[26px] mt-[14px] flex items-center gap-[8px] av-fade d6">
          <svg width="14" height="14" viewBox="0 0 24 24" stroke={C.sage} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICON.lock} />
          </svg>
          <span className="text-[12.5px]" style={{ color: C.muted }}>
            We only ever look at your accounts. We never touch them.
          </span>
        </div>

        <div className="absolute left-0 right-0 bottom-0 px-[22px] pb-[30px] av-rise d7">
          <Button>Change my cushion</Button>
          <div className="text-center mt-[14px]">
            <TextLink>What changed since yesterday</TextLink>
          </div>
        </div>
      </div>
    </Phone>
  );
}

export default WhyThisNumber;
