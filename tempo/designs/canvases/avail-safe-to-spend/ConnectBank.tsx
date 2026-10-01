import { C, Phone, StatusBar, BackBar, Whisper, Button, ICON } from "./_kit";

/* Bring in your bank. The nervous step — so, plain words, a short list,
   and the reassurance sits right where the thumb is. */

function Bank({ name, mark, first }: { name: string; mark: string; first?: boolean }) {
  return (
    <div className="av-row flex items-center gap-[14px] px-[4px] py-[13px]" style={{ borderTop: first ? "none" : `1px solid ${C.line}` }}>
      <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0 av-serif text-[16px]" style={{ background: C.oat, color: C.fern }}>
        {mark}
      </div>
      <div className="flex-1 text-[14.5px] font-medium" style={{ color: C.ink }}>
        {name}
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" stroke="#C9C2B5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={ICON.chevR} />
      </svg>
    </div>
  );
}

export function ConnectBank() {
  return (
    <Phone>
      <StatusBar />
      <div className="relative z-10 h-full pt-[44px] overflow-hidden">
        <BackBar title="two of three" />

        <div className="px-[26px] mt-[22px] av-rise d2">
          <h1 className="av-serif font-medium" style={{ fontSize: 30, lineHeight: 1.18, color: C.fern }}>
            Let's bring in your bank.
          </h1>
          <p className="text-[13.5px] mt-[10px]" style={{ color: C.muted, lineHeight: 1.55 }}>
            This is the only setup there is. After this, Avail quietly builds your plan — you won't type in a single
            transaction.
          </p>
        </div>

        <div className="px-[22px] mt-[22px] av-rise d3">
          <div className="av-press flex items-center gap-[10px] rounded-full px-[18px] py-[13px]" style={{ background: C.paper, boxShadow: `inset 0 0 0 1px ${C.line}` }}>
            <svg width="16" height="16" viewBox="0 0 24 24" stroke={C.muted} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={ICON.search} />
            </svg>
            <span className="text-[13.5px]" style={{ color: "#ABA497" }}>
              Search for your bank
            </span>
          </div>
        </div>

        <div className="px-[22px] mt-[22px] av-rise d4">
          <div className="px-[4px] mb-[4px]">
            <Whisper>Banks near you</Whisper>
          </div>
          <Bank first name="Chase" mark="C" />
          <Bank name="Bank of America" mark="B" />
          <Bank name="Wells Fargo" mark="W" />
          <Bank name="Truist" mark="T" />
        </div>

        <div className="absolute left-0 right-0 bottom-0 px-[22px] pb-[28px] av-rise d6" style={{ background: "linear-gradient(180deg, rgba(251,246,238,0), rgba(251,246,238,1) 30%)" }}>
          <div className="text-center text-[12.5px] mb-[14px]" style={{ color: C.muted, lineHeight: 1.6 }}>
            We only look. We never touch.
            <br />
            Disconnect any time, in two taps.
          </div>
          <Button>Connect with Plaid</Button>
        </div>
      </div>
    </Phone>
  );
}

export default ConnectBank;
