import { C, Phone, StatusBar, Wordmark, Vine, Button, ICON } from "./_kit";

/* Welcome. A bright room, a plant, one promise. Never dark. */

export function OnboardingWelcome() {
  return (
    <Phone>
      {/* morning sun, high and soft */}
      <div className="absolute right-[-40px] top-[80px] w-[220px] h-[220px] rounded-full av-halo" style={{ background: "radial-gradient(circle, rgba(250,222,180,.95) 0%, rgba(250,222,180,.5) 38%, rgba(250,222,180,0) 70%)" }} />
      <div className="absolute -left-[30px] top-[150px] av-fade d2">
        <Vine size={300} opacity={0.9} flip />
      </div>
      <StatusBar />

      <div className="relative z-10 h-full pt-[44px] flex flex-col">
        <div className="px-[26px] pt-[16px] flex items-center justify-between av-fade d1">
          <Wordmark size={24} />
          <span className="av-serif italic text-[14px]" style={{ color: C.muted }}>
            Sign in
          </span>
        </div>

        <div className="flex-1" />

        <div className="px-[28px] pb-[34px]">
          <h1 className="av-serif av-rise d2 font-medium" style={{ fontSize: 40, lineHeight: 1.1, color: C.fern }}>
            Your bank balance isn't your spending balance.
          </h1>
          <p className="av-rise d3 text-[15px] mt-[16px]" style={{ color: C.muted, lineHeight: 1.6, maxWidth: 320 }}>
            Avail reads your bills, your paycheck and your goals, then tells you one honest number: what you can spend
            today. Gently, every morning.
          </p>

          <div className="av-rise d4 flex items-center gap-[7px] mt-[24px] mb-[22px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-full" style={{ width: i === 0 ? 22 : 6, height: 6, background: i === 0 ? C.clay : "rgba(59,52,44,.18)" }} />
            ))}
          </div>

          <div className="av-rise d5">
            <Button>
              <span className="inline-flex items-center gap-[8px]">
                Show me my number
                <svg width="16" height="16" viewBox="0 0 24 24" stroke={C.paper} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICON.arrowR} />
                </svg>
              </span>
            </Button>
          </div>

          <div className="av-fade d6 flex items-center justify-center gap-[7px] mt-[16px]">
            <svg width="13" height="13" viewBox="0 0 24 24" stroke={C.sage} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={ICON.lock} />
            </svg>
            <span className="text-[12px]" style={{ color: C.muted }}>
              We only look. We never move your money.
            </span>
          </div>
        </div>

        <div className="mx-auto mb-[9px] w-[132px] h-[5px] rounded-full" style={{ background: "rgba(59,52,44,.18)" }} />
      </div>
    </Phone>
  );
}

export default OnboardingWelcome;
