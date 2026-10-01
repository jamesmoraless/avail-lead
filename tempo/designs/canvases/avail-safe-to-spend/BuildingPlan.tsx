import { C, Phone, StatusBar, Line, Vine, Quote, MeadowBand, Blob } from "./_kit";

/* Give us a moment — the wait, as a breath.
   Rings drift outward; each discovery lands on its own beat. */

function Working({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center gap-[14px] px-[4px] py-[13px]" style={{ borderTop: `1px solid ${C.line}` }}>
      <svg className="av-spin shrink-0" width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(111,143,114,.22)" strokeWidth="2.4" />
        <circle cx="12" cy="12" r="9" fill="none" stroke={C.sage} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="18 42" />
      </svg>
      <div className="flex-1 min-w-0">
        <div className="text-[14.5px] font-medium" style={{ color: C.muted, lineHeight: 1.3 }}>
          {title}
        </div>
        <div className="text-[12px] mt-[3px]" style={{ color: C.muted }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

export function BuildingPlan() {
  return (
    <Phone>
      <StatusBar />
      <div className="relative z-10 h-full pt-[44px] flex flex-col">
        <div className="relative h-[250px] flex items-center justify-center mt-[16px]">
          <Blob size={280} />
          {[0, 1, 2].map((i) => (
            <div key={i} className="absolute w-[150px] h-[150px] rounded-full av-ring" style={{ border: `1px solid ${C.sage}`, animationDelay: `${i * 1.25}s` }} />
          ))}
          <div className="relative av-pop d2 w-[132px] h-[132px] rounded-full flex items-center justify-center overflow-hidden" style={{ background: C.paper, boxShadow: "0 22px 40px -28px rgba(52,82,63,.45)" }}>
            <div className="-ml-[10px] -mt-[6px]">
              <Vine size={96} />
            </div>
          </div>
        </div>

        <div className="px-[36px] text-center av-rise d3">
          <h1 className="av-serif font-medium" style={{ fontSize: 30, lineHeight: 1.18, color: C.fern }}>
            Give us a moment.
          </h1>
          <p className="text-[13.5px] mt-[8px]" style={{ color: C.muted, lineHeight: 1.55 }}>
            We're reading six months of your history so the first number you see is a true one. About twenty seconds.
          </p>
        </div>

        <div className="px-[30px] mt-[22px] av-rise d5">
          <Line first check="done" title="Found three accounts" sub="Chase checking, savings and Sapphire" py={13} />
          <Line check="done" title="Spotted your paycheck" sub="Every other Thursday, about $3,420" py={13} />
          <Working title="Learning your bills" sub="Nine so far — mortgage, electric, insurance…" />
        </div>

        <div className="flex-1" />

        <div className="relative z-10 px-[40px] pb-[80px]">
          <Quote text="Little by little, a little becomes a lot." by="Tanzanian proverb" align="center" />
        </div>
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          <MeadowBand h={64} />
        </div>
      </div>
    </Phone>
  );
}

export default BuildingPlan;
