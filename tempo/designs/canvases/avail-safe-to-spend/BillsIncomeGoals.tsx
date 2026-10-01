import { C, Phone, StatusBar, TabBar, Line, Whisper, Thread } from "./_kit";

/* Your plan — sorted by the paycheck that covers it.
   Sentences, hairlines, serif numbers. Nothing that looks like a spreadsheet. */

function Head({ label, right }: { label: string; right: string }) {
  return (
    <div className="flex items-baseline justify-between px-[4px] mb-[2px]">
      <Whisper tone={C.fern}>{label}</Whisper>
      <span className="text-[12px]" style={{ color: C.muted }}>
        {right}
      </span>
    </div>
  );
}

export function BillsIncomeGoals() {
  return (
    <Phone>
      <StatusBar />
      <div className="relative z-10 h-full pt-[44px] overflow-hidden">
        <div className="px-[26px] pt-[14px] av-fade d1">
          <h1 className="av-serif font-medium" style={{ fontSize: 30, lineHeight: 1.15, color: C.fern }}>
            Your plan
          </h1>
          <p className="text-[13.5px] mt-[4px]" style={{ color: C.muted }}>
            Everything, sorted by the paycheck that covers it.
          </p>
        </div>

        <div className="px-[26px] mt-[16px] flex items-center gap-[22px] av-rise d2">
          {["bills", "income", "goals"].map((t, n) => (
            <div key={t} className="av-press pb-[5px]" style={{ borderBottom: n === 0 ? `2px solid ${C.oak}` : "2px solid transparent" }}>
              <span className="av-serif text-[16px]" style={{ color: n === 0 ? C.fern : C.muted }}>
                {t}
              </span>
            </div>
          ))}
        </div>

        <div className="px-[22px] mt-[20px] av-rise d3">
          <Head label="This Friday's paycheck covers" right="$3,420" />
          <Line first title="Mortgage" sub="April 28, paid automatically" value="$1,842" py={11} />
          <Line title="Electric" sub="A little high this month — $67 over" value="$209" py={11} />
          <Line title="Internet" sub="May 2" value="$79" py={11} />
          <div className="px-[4px] mt-[10px]">
            <Thread pct={66} delay=".5s" />
            <div className="text-[12px] mt-[7px]" style={{ color: C.muted }}>
              $2,250 of it is spoken for. The rest is your daily number.
            </div>
          </div>
        </div>

        <div className="px-[22px] mt-[20px] av-rise d5">
          <Head label="The one after covers" right="May 9 · $3,420" />
          <Line first title="Car insurance" sub="May 12, twice a year" value="$612" py={11} />
        </div>

        <div className="px-[22px] mt-[20px] av-rise d7">
          <Head label="Growing, a little each paycheck" right="$120 each" />
          <Line first title="Family vacation" sub="$3,200 of $5,000" value="64%" tone={C.sage} py={11} />
          <div className="px-[4px] -mt-[3px] mb-[5px]">
            <Thread pct={64} delay=".6s" />
          </div>
          <Line title="Emergency fund" sub="$1,840 of $6,000" value="31%" tone={C.sage} py={11} />
          <div className="px-[4px] -mt-[3px]">
            <Thread pct={31} delay=".7s" tone={C.oak} />
          </div>
        </div>
      </div>

      <TabBar active="plan" />
    </Phone>
  );
}

export default BillsIncomeGoals;
