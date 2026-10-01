import { C, AvailStyles, Wordmark, Whisper, OakShelf, Vine, WindowLight } from "./_kit";

/* Todd's words, made visible. Read this before the screens. */

const SWATCHES = [
  { n: "Cream", v: C.cream, note: "the room" },
  { n: "Paper", v: C.paper, note: "the card" },
  { n: "Oat", v: C.oat, note: "soft band" },
  { n: "Sage", v: C.sage, note: "the green" },
  { n: "Fern", v: C.fern, note: "the number" },
  { n: "Oak", v: C.oak, note: "the shelf" },
  { n: "Clay", v: C.clay, note: "warmth" },
];

const WORDS = [
  ["Warm, inviting, calming.", "Cream walls, window light, nothing glossy."],
  ["Walking into a therapist's office.", "One thing to look at. Sentences, not labels. No capitals."],
  ["Scandinavian: clean, airy, uncluttered.", "Hairlines, not boxes. One card per screen. Room to breathe."],
  ["Green tones, wood, nature.", "A sage ring, an oak shelf, a pothos in the corner."],
  ["Soft, organic, human.", "A rounded serif that speaks. Pools of light, not panels."],
  ["Encouraging, on your side.", "“and everything's still covered.” — the app talks like a kind friend."],
  ["Not cold. Not dark. No charts. Not fintech.", "No dashboards, no gradients on buttons, no ledger columns, no dark screens."],
];

export function Direction() {
  return (
    <div className="av relative overflow-hidden" style={{ width: 1990, background: C.cream }}>
      <AvailStyles />
      <WindowLight strength={1.2} />
      <div className="absolute right-[24px] -top-[24px] av-fade d2">
        <Vine size={340} opacity={0.45} />
      </div>

      <div className="relative px-[64px] pt-[52px] pb-[44px] flex gap-[72px]">
        <div className="w-[560px] shrink-0 av-rise d1">
          <Wordmark size={34} />
          <div className="mt-[28px]">
            <Whisper>Design direction, in Todd's words</Whisper>
          </div>
          <div className="av-serif font-medium mt-[12px]" style={{ fontSize: 58, lineHeight: 1.04, color: C.fern }}>
            Warm, inviting,
            <br />
            calming.
          </div>
          <p className="text-[16px] mt-[20px]" style={{ color: C.muted, lineHeight: 1.6, maxWidth: 470 }}>
            A therapist's office, not a finance app. A cream room with morning light through linen, a plant in the
            corner, an oak shelf — and on it, one honest number, said kindly.
          </p>

          <div className="mt-[34px]">
            <Whisper>Palette</Whisper>
            <div className="flex gap-[18px] mt-[14px]">
              {SWATCHES.map((s) => (
                <div key={s.n} className="w-[62px]">
                  <div className="w-[62px] h-[62px] rounded-full" style={{ background: s.v, boxShadow: "inset 0 0 0 1px rgba(59,52,44,.10)" }} />
                  <div className="text-[12.5px] font-medium mt-[8px]" style={{ color: C.ink }}>
                    {s.n}
                  </div>
                  <div className="text-[11px] mt-[1px]" style={{ color: C.muted }}>
                    {s.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[560px] shrink-0 av-rise d3">
          <Whisper>How it sounds</Whisper>
          <div className="mt-[14px]">
            <div className="av-serif av-count font-medium" style={{ fontSize: 60, lineHeight: 1, color: C.fern }}>
              $2,487.36
            </div>
            <div className="av-serif italic text-[20px] mt-[10px]" style={{ color: C.fern }}>
              and everything's still covered.
            </div>
            <div className="text-[14px] mt-[14px]" style={{ color: C.muted, lineHeight: 1.6, maxWidth: 440 }}>
              Newsreader, a bookish serif, for every sentence that matters. A pen hand for the notes Avail leaves you. DM Sans, small and quiet, for the
              rest. Never uppercase. Never a label where a sentence would do.
            </div>
          </div>

          <div className="mt-[30px] flex gap-[28px] items-end">
            <div>
              <Whisper>Wood</Whisper>
              <div className="mt-[10px] w-[180px]">
                <OakShelf />
              </div>
            </div>
            <div>
              <Whisper>Nature</Whisper>
              <div className="mt-[6px] -mb-[10px]">
                <Vine size={96} />
              </div>
            </div>
            <div>
              <Whisper>Light</Whisper>
              <div className="mt-[10px] w-[120px] h-[52px] rounded-[16px]" style={{ background: "radial-gradient(90% 90% at 10% 0%, #F7E0C4 0%, #FBF6EE 70%)", boxShadow: "inset 0 0 0 1px rgba(59,52,44,.08)" }} />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 pr-[230px] av-rise d5">
          <Whisper>His words, our answer</Whisper>
          <div className="mt-[10px]">
            {WORDS.map(([w, a], i) => (
              <div key={w} className="py-[9px]" style={{ borderTop: i ? `1px solid ${C.line}` : "none" }}>
                <div className="av-serif text-[16px]" style={{ color: C.fern, lineHeight: 1.3 }}>
                  {w}
                </div>
                <div className="text-[12.5px] mt-[2px]" style={{ color: C.muted, lineHeight: 1.45 }}>
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OakShelf />
      <div style={{ height: 22, background: C.cream }} />
    </div>
  );
}

export default Direction;
