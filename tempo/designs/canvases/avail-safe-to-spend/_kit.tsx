import React, { useState } from "react";

/* ------------------------------------------------------------------ *
 * Avail — shared canvas kit
 *
 * Todd's words: warm · inviting · calming · a therapist's office ·
 * Scandinavian · clean, airy, uncluttered · green, wood, nature ·
 * soft, organic, human · encouraging · NOT cold, dark, charts, fintech.
 *
 * The rules that keep it from looking generated:
 *   one gesture per screen · matte materials, no gloss · real leaves ·
 *   a little paper grain · italics once, not everywhere · nothing centred
 *   that doesn't need to be · things you can touch.
 * ------------------------------------------------------------------ */

/** Pigments: what the painted things are painted with. Warmer and braver than the UI colours. */
export const P = {
  sky: "#CFDCD6",
  dawn: "#F3C9A2",
  apricot: "#EDAF7E",
  ochre: "#DDAA5E",
  terracotta: "#C46E4C",
  rose: "#E6B3A0",
  moss: "#8FA66F",
  leaf: "#6E8D5B",
  forest: "#3F5E47",
  pine: "#2E4637",
  stone: "#A7AFA8",
  linen: "#F4EDE1",
  pencil: "#6B6259",
};

/** A line written by hand: notes, nudges, the sign-off. Never numbers. */
export function Hand({ children, size = 20, tone = "#8A6A45", rotate = 0, className = "" }: { children: React.ReactNode; size?: number; tone?: string; rotate?: number; className?: string }) {
  return (
    <span className={`av-hand ${className}`} style={{ fontSize: size, color: tone, display: "inline-block", transform: rotate ? `rotate(${rotate}deg)` : undefined }}>
      {children}
    </span>
  );
}

export const C = {
  cream: "#F7F2EA",
  paper: "#FDFBF6",
  oat: "#EFE7DA",
  sage: "#6F8F72",
  sageLight: "#A3B8A3",
  fern: "#34523F",
  oak: "#C8A67E",
  oakDeep: "#A8875C",
  clay: "#BE7D5E",
  ink: "#3A332C",
  muted: "#8B837A",
  line: "rgba(58,51,44,.10)",
  // aliases
  linen: "#F7F2EA",
  moss: "#6F8F72",
  sageSoft: "#E4EAE1",
  claySoft: "#F1E3D6",
  lineGreen: "rgba(111,143,114,.22)",
};

export function AvailStyles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..600&display=swap');

.av { font-family: 'DM Sans', -apple-system, ui-sans-serif, system-ui, sans-serif; -webkit-font-smoothing: antialiased; letter-spacing: -.003em; }
.av-serif { font-family: Newsreader, 'Iowan Old Style', Georgia, serif; font-optical-sizing: auto; letter-spacing: -.012em; }
/* a real pen: for the notes a person would scribble */
.av-hand { font-family: 'Nanum Pen Script', 'Bradley Hand', cursive; line-height: 1; letter-spacing: .01em; }
/* painted: natural forms get gouache edges and paper tooth instead of clean vectors */
.av-paint { filter: url(#av-wash); }
.av-paint-soft { filter: url(#av-wash-soft); }
.av-wc { filter: url(#av-wc); }
.av-wc-sm { filter: url(#av-wc-sm); }
/* numbers: a quiet Scandinavian grotesk, not a display serif */
.av-tnum { font-family: 'Schibsted Grotesk', 'DM Sans', system-ui, sans-serif; font-variant-numeric: lining-nums proportional-nums; font-variation-settings: normal; font-weight: 400; letter-spacing: -0.025em; font-style: normal; }

@keyframes av-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes av-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes av-scale-in { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: none; } }
.av-rise { opacity: 0; animation: av-rise 1s cubic-bezier(.22,.9,.28,1) forwards; }
.av-fade { opacity: 0; animation: av-fade 1.2s ease forwards; }
.av-pop  { opacity: 0; animation: av-scale-in .9s cubic-bezier(.2,.9,.3,1) forwards; }
.d1{animation-delay:.06s}.d2{animation-delay:.2s}.d3{animation-delay:.34s}
.d4{animation-delay:.48s}.d5{animation-delay:.64s}.d6{animation-delay:.8s}
.d7{animation-delay:.98s}.d8{animation-delay:1.16s}.d9{animation-delay:1.36s}

@keyframes av-count { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform:none; } }
.av-count { opacity:0; animation: av-count 1.2s cubic-bezier(.16,1,.3,1) .25s forwards; }
@keyframes av-breathe { 0%,100% { transform: scale(1); opacity:.6 } 50% { transform: scale(1.04); opacity:.9 } }
.av-breathe { animation: av-breathe 8s ease-in-out infinite; }
@keyframes av-halo { 0%,100% { opacity:.55; transform:scale(1) } 50% { opacity:.75; transform:scale(1.02) } }
.av-halo { animation: av-halo 9s ease-in-out infinite; }
@keyframes av-sway { 0%,100% { transform: rotate(-.8deg) } 50% { transform: rotate(.8deg) } }
.av-sway { transform-origin: 8% 92%; animation: av-sway 11s ease-in-out infinite; }

@keyframes av-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.av-grow { transform-origin: left center; animation: av-grow 1.4s cubic-bezier(.2,.8,.2,1) .5s both; }
@keyframes av-draw { to { stroke-dashoffset: var(--to); } }
.av-draw { animation: av-draw 1.8s cubic-bezier(.3,.9,.3,1) .4s forwards; }
@keyframes av-bloom { 0% { transform: scale(.6); opacity:0 } 60% { transform: scale(1.08); opacity:1 } 100% { transform: scale(1); opacity:1 } }
.av-bloom { animation: av-bloom .55s cubic-bezier(.3,1.3,.5,1) .6s both; }
@keyframes av-quote { 0% { opacity:0; transform: translateY(4px) } 100% { opacity:1; transform:none } }
.av-quote { animation: av-quote 1.4s ease 1s both; }
@keyframes av-ripple { 0% { transform: scale(.5); opacity:.8 } 100% { transform: scale(1.7); opacity:0 } }
.av-ripple { transform-box: fill-box; transform-origin: center; animation: av-ripple 1.3s ease-out forwards; }
@keyframes av-plump { 0% { transform: scale(1,.72) } 45% { transform: scale(.96,1.12) } 75% { transform: scale(1.02,.97) } 100% { transform: none } }
.av-plump { animation: av-plump .6s cubic-bezier(.3,1.2,.5,1) both; }
@keyframes av-ring { 0% { transform: scale(.74); opacity:.45 } 100% { transform: scale(1.5); opacity:0 } }
.av-ring { animation: av-ring 4s ease-out infinite; }
@keyframes av-spin { to { transform: rotate(360deg) } }
.av-spin { animation: av-spin 3s linear infinite; }
@keyframes av-drift { 0%,100% { transform: translateX(0) } 50% { transform: translateX(-6px) } }
.av-drift { animation: av-drift 24s ease-in-out infinite; }

.av-input { font-family: 'DM Sans', sans-serif; }
.av-input::placeholder { color: #B3AB9E; font-family: Newsreader, Georgia, serif; font-style: italic; }
.av-press { transition: transform .26s cubic-bezier(.2,.8,.2,1), background-color .25s ease, opacity .25s ease; }
.av-press:hover { transform: translateY(-1px); }
.av-press:active { transform: scale(.985); }
.av-row { transition: background-color .25s ease; border-radius: 12px; }
.av-row:hover { background-color: rgba(111,143,114,.06); }
.av-cta { transition: transform .26s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease; }
.av-cta:hover { transform: translateY(-1px); box-shadow: 0 14px 28px -16px rgba(52,82,63,.45); }
.av-cta:active { transform: translateY(0) scale(.99); }
`}</style>
  );
}

/* ---------------------------- the room ---------------------------- */

/** Paper grain. Almost invisible; it's what makes a screen feel printed rather than rendered. */
export function Grain({ opacity = 0.09 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%", opacity, mixBlendMode: "multiply" }}>
      <filter id="av-grain">
        <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 .32  0 0 0 0 .27  0 0 0 0 .2  0 0 0 .7 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#av-grain)" />
    </svg>
  );
}

/** Window light: one soft warm wash from the top-left. Quiet. */
export function WindowLight({ strength = 1 }: { strength?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: `radial-gradient(90% 55% at 0% 0%, rgba(243,222,196,${0.55 * strength}) 0%, rgba(243,222,196,0) 65%)` }}
    />
  );
}

/** The filters every screen paints with. */
export function PaintDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id="av-wash" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="9" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="3" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 1.08" result="toothA" />
          <feComposite in="shape" in2="toothA" operator="in" result="painted" />
          <feGaussianBlur in="shape" stdDeviation="0.6" result="edge" />
          <feComposite in="painted" in2="edge" operator="over" />
        </filter>
        {/* watercolour: wobbly edge, pigment pooling at the rim, blotches, paper tooth */}
        <filter id="av-wc" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="4" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="13" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="0.9" result="soft" />
          <feMorphology in="soft" operator="erode" radius="2.2" result="inner" />
          <feComposite in="soft" in2="inner" operator="out" result="rim" />
          <feGaussianBlur in="rim" stdDeviation="0.8" result="rimSoft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="21" result="blotch" />
          <feColorMatrix in="blotch" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.1 0 0 0 0.2" result="blotchA" />
          <feComposite in="soft" in2="blotchA" operator="in" result="body" />
          <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="9" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.3 1.08" result="toothA" />
          <feMerge result="paint">
            <feMergeNode in="body" />
            <feMergeNode in="soft" />
            <feMergeNode in="rimSoft" />
          </feMerge>
          <feComposite in="paint" in2="toothA" operator="in" />
        </filter>
        {/* the same paint for small things: a lighter hand, a wider margin so nothing gets clipped square */}
        <filter id="av-wc-sm" x="-70%" y="-70%" width="240%" height="240%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="0.5" result="soft" />
          <feMorphology in="soft" operator="erode" radius="1.2" result="inner" />
          <feComposite in="soft" in2="inner" operator="out" result="rim" />
          <feGaussianBlur in="rim" stdDeviation="0.5" result="rimSoft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="9" result="tooth" />
          <feColorMatrix in="tooth" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.3 1.08" result="toothA" />
          <feMerge result="paint">
            <feMergeNode in="soft" />
            <feMergeNode in="rimSoft" />
          </feMerge>
          <feComposite in="paint" in2="toothA" operator="in" />
        </filter>
        <filter id="av-wash-soft" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="11" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

export function Phone({ children, surface = C.cream, light = true }: { children: React.ReactNode; surface?: string; light?: boolean }) {
  return (
    <div className="av flex items-center justify-center p-[34px]" style={{ background: "#EEE8DD" }}>
      <AvailStyles />
      <PaintDefs />
      <div
        className="relative w-[406px] h-[860px] rounded-[58px] p-[8px] shrink-0"
        style={{ background: "#F2ECE2", boxShadow: "0 40px 70px -44px rgba(58,51,44,.32), 0 8px 22px -14px rgba(58,51,44,.12), inset 0 0 0 1px rgba(58,51,44,.10)" }}
      >
        <div className="relative w-full h-full rounded-[50px] overflow-hidden" style={{ background: surface }}>
          {light && <WindowLight />}
          {children}
          <Grain />
        </div>
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] rounded-full z-50" style={{ background: C.ink }} />
      </div>
    </div>
  );
}

export function StatusBar({ tone = C.ink }: { tone?: string }) {
  return (
    <div className="absolute inset-x-0 top-0 z-40 flex items-end justify-between px-[26px] pt-[16px] pb-[4px] h-[44px] text-[15px] font-medium av-tnum" style={{ color: tone }}>
      <span>9:41</span>
      <div className="flex items-center gap-[6px] pb-[2px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={tone}>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={tone}>
          <path d="M8 11.2 5.6 8.7a3.4 3.4 0 0 1 4.8 0L8 11.2Z" />
          <path d="M3.2 6.3a6.8 6.8 0 0 1 9.6 0" stroke={tone} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M.9 3.9a10.1 10.1 0 0 1 14.2 0" stroke={tone} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect x="0.6" y="0.6" width="21" height="10.8" rx="3.2" stroke={tone} strokeOpacity=".4" fill="none" />
          <rect x="2.4" y="2.4" width="16" height="7.2" rx="2" fill={tone} />
          <path d="M23.2 4.2v3.6a2 2 0 0 0 0-3.6Z" fill={tone} fillOpacity=".4" />
        </svg>
      </div>
    </div>
  );
}

/* ---------------------------- brand ---------------------------- */

export function Leaf({ size = 22, color = C.fern }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20.5 3.5C11 3 5 7 5 13.5c0 2.2.8 4 2 5.3C9.4 13.6 13 10.6 17.5 9c-3.6 2.3-6.3 5.6-7.7 10.4 1 .4 2 .6 3.2.6 6 0 8.5-6 7.5-16.5Z" fill={color} />
    </svg>
  );
}

export function Wordmark({ color = C.fern, size = 24 }: { color?: string; size?: number }) {
  return (
    <div className="flex items-center gap-[6px]">
      <Leaf size={size * 0.9} color={color} />
      <span className="av-serif font-medium" style={{ fontSize: size, color, lineHeight: 1 }}>
        avail
      </span>
    </div>
  );
}

/* ---------------------------- the plant ---------------------------- */

const LEAF = "M0 0C7 -8.5 19 -10.5 31 0C19 10.5 7 8.5 0 0Z";

/** An olive branch. Real leaves — pointed, with a midrib — on a gently bending stem. */
export function Branch({ size = 180, opacity = 1, className = "", flip = false }: { size?: number; opacity?: number; className?: string; flip?: boolean }) {
  // x, y, rotation, scale, tone
  const leaves: [number, number, number, number, string][] = [
    [26, 156, -96, 1.0, C.sage],
    [34, 146, 6, 0.96, C.sageLight],
    [46, 130, -100, 0.94, C.fern],
    [56, 118, 2, 0.9, C.sage],
    [70, 104, -94, 0.86, C.sageLight],
    [82, 92, 8, 0.82, C.sage],
    [96, 78, -98, 0.76, C.fern],
    [108, 66, 4, 0.72, C.sageLight],
    [122, 52, -92, 0.64, C.sage],
    [134, 42, 10, 0.58, C.sage],
    [148, 30, -96, 0.5, C.sageLight],
    [158, 22, 6, 0.42, C.fern],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={`av-sway ${className}`} style={{ opacity, transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M16 172 C 44 140, 92 96, 170 8" stroke={C.oakDeep} strokeWidth="1.6" strokeLinecap="round" opacity=".8" />
      {leaves.map(([x, y, r, s, tone], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
          <path d={LEAF} fill={tone} opacity=".92" />
          <path d="M3 0H27" stroke="rgba(255,252,246,.45)" strokeWidth=".9" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
export const Vine = Branch;
export const Sprig = Branch;

/** A soft pool of green light. Quieter than before — one per screen at most. */
export function Blob({ size = 240, tone = "rgba(111,143,114,.14)", className = "" }: { size?: number; tone?: string; className?: string }) {
  return (
    <div
      className={`absolute av-breathe pointer-events-none ${className}`}
      style={{ width: size, height: size * 0.84, background: tone, borderRadius: "58% 42% 55% 45% / 52% 60% 40% 48%", filter: "blur(26px)" }}
    />
  );
}

/** A ceramic pot for the branch to sit in. */
export function Pot({ size = 110, className = "", flip = false }: { size?: number; className?: string; flip?: boolean }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * 1.05, transform: flip ? "scaleX(-1)" : undefined }}>
      <div className="absolute" style={{ left: size * 0.08, top: size * -0.02 }}>
        <Branch size={size * 0.9} />
      </div>
      <div
        className="absolute"
        style={{
          left: size * 0.06,
          bottom: 0,
          width: size * 0.34,
          height: size * 0.26,
          background: "linear-gradient(180deg,#EDE3D1,#DCCFB8)",
          borderRadius: `${size * 0.03}px ${size * 0.03}px ${size * 0.1}px ${size * 0.1}px`,
          boxShadow: "inset 0 -5px 0 rgba(58,51,44,.07), 0 10px 14px -10px rgba(58,51,44,.45)",
        }}
      />
    </div>
  );
}

/* ---------------------------- navigation ---------------------------- */

export function TabBar({ active = "today", onWood = false }: { active?: string; onWood?: boolean }) {
  const items = [
    { k: "today", d: ICON_SUN },
    { k: "plan", d: ICON_PLAN },
    { k: "you", d: ICON_YOU },
  ];
  const off = onWood ? "rgba(58,51,44,.42)" : "#BFB8AC";
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 pt-[14px] pb-[24px] px-[38px] flex items-start justify-between"
      style={{ background: onWood ? "linear-gradient(180deg, rgba(185,152,98,0) 0%, rgba(185,152,98,.55) 40%)" : "linear-gradient(180deg, rgba(247,242,234,0) 0%, rgba(247,242,234,.96) 30%)" }}
    >
      {items.map((it) => {
        const on = active === it.k;
        return (
          <div key={it.k} className="w-[60px] flex flex-col items-center gap-[6px] av-press">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? C.fern : off} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d={it.d} />
            </svg>
            <span className="text-[11.5px] font-medium" style={{ color: on ? C.fern : off }}>
              {it.k}
            </span>
            <div className="w-[4px] h-[4px] rounded-full" style={{ background: on ? C.clay : "transparent" }} />
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------- materials ---------------------------- */

export function OakShelf() {
  return (
    <div className="relative" style={{ height: 9 }}>
      <svg viewBox="0 0 390 9" preserveAspectRatio="none" style={{ width: "100%", height: 9, display: "block" }}>
        <defs>
          <linearGradient id="oakg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#DCC09A" />
            <stop offset=".5" stopColor="#CBA77D" />
            <stop offset="1" stopColor="#AE8B5E" />
          </linearGradient>
        </defs>
        <rect width="390" height="9" fill="url(#oakg)" />
        <path d="M0 2.8C70 2.2 130 3.6 200 2.8S330 2.2 390 3" stroke="#9E7A4C" strokeWidth=".5" fill="none" opacity=".45" />
        <path d="M0 6.2C90 5.8 150 7 230 6.2S340 5.8 390 6.4" stroke="#9E7A4C" strokeWidth=".5" fill="none" opacity=".35" />
        <rect width="390" height="1" fill="#F1E1C6" opacity=".8" />
      </svg>
      <div className="absolute inset-x-0 top-[9px] h-[18px] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(58,51,44,.12), rgba(58,51,44,0))" }} />
    </div>
  );
}

export function DawnScene({ h = 300 }: { h?: number }) {
  return (
    <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: h }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(178deg,#F3DCC0 0%,#EFD3B6 26%,#E3D2B9 50%,#CCD3BC 74%,#BACBB5 100%)" }} />
      <div className="absolute left-[60%] top-[24%] w-[96px] h-[96px] rounded-full av-halo" style={{ background: "radial-gradient(circle,#FFF6E6 0%,#F8E2BC 42%,rgba(248,226,188,0) 70%)" }} />
      <svg className="absolute inset-x-0 bottom-0 av-drift" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ height: h * 0.5, width: "108%", left: "-4%" }}>
        <path d="M0 78C60 78 80 40 130 40s70 36 120 36 70-44 150-44v88H0Z" fill="#AEC1AE" opacity=".7" />
        <path d="M0 100C70 100 96 66 150 66s74 30 120 30 66-32 130-32v56H0Z" fill="#8FA894" />
      </svg>
    </div>
  );
}

export function MeadowBand({ h = 72, opacity = 1 }: { h?: number; opacity?: number }) {
  return (
    <svg viewBox="0 0 400 100" preserveAspectRatio="none" style={{ height: h, width: "100%", opacity, display: "block" }}>
      <path d="M0 62C60 62 84 34 140 34s78 30 130 30 70-30 130-30v66H0Z" fill="#BFCFBA" opacity=".7" />
      <path d="M0 84C70 84 100 60 156 60s76 22 120 22 64-24 124-24v42H0Z" fill="#93AC97" opacity=".9" />
    </svg>
  );
}

/* ---------------------------- words & lines ---------------------------- */

/** A whisper: the small quiet line that introduces a thing. Sentence case, sans, never capitals. */
export function Whisper({ children, tone = C.muted }: { children: React.ReactNode; tone?: string }) {
  return (
    <div className="text-[12.5px]" style={{ color: tone, lineHeight: 1.35, letterSpacing: ".005em" }}>
      {children}
    </div>
  );
}
export const Eyebrow = Whisper;

/** The one italic line on a screen — the sentence that carries the feeling. */
/* ---------------- the type scale every home screen shares ----------------
 * Read top to bottom, a home screen is one sentence:
 *     "Good morning, Todd."  →  $2,487  →  "is yours today. Every bill is covered."
 * 1 Hero      the number. The only large thing, and the only green text.
 * 2 Greeting  serif, ink. Says hello; the number answers it.
 * 3 Support   one italic line that finishes the number's sentence. Muted.
 * 4 Section   small sans that names a group. Never uppercase, never green.
 * 5 Body      sans for tasks and rows; their amounts sit quieter than the names.
 * Hand        at most two pen notes per screen, oak, for Avail's own voice.
 * ------------------------------------------------------------------------ */
export const T = {
  ink: "#3A332C",
  support: "#7A7168",
  section: "rgba(58,51,44,.5)",
  amount: "#5E574F",
};

export function Greeting({ children, size = 21 }: { children: React.ReactNode; size?: number }) {
  return (
    <div className="av-serif" style={{ fontSize: size, color: T.ink, lineHeight: 1.25, fontWeight: 450 }}>
      {children}
    </div>
  );
}

/** Finishes the number's sentence: "$2,487 — is yours today." */
export function Support({ children, tone = T.support, size = 16, className = "" }: { children: React.ReactNode; tone?: string; size?: number; className?: string }) {
  return (
    <div className={`av-serif italic ${className}`} style={{ fontSize: size, color: tone, lineHeight: 1.4 }}>
      {children}
    </div>
  );
}

export function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`av-serif italic ${className}`} style={{ fontSize: 15.5, color: C.muted, lineHeight: 1.3 }}>
      {children}
    </div>
  );
}

export function Hero({ children, size = 64, tone = C.fern, className = "", style }: { children: React.ReactNode; size?: number; tone?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`av-tnum ${className}`} style={{ fontSize: size, lineHeight: 1.02, color: tone, letterSpacing: "-0.04em", transition: "color .6s", ...style }}>
      {children}
    </div>
  );
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ fontSize: 13, fontWeight: 500, color: T.section, letterSpacing: ".01em", lineHeight: 1.3 }}>
      {children}
    </div>
  );
}

export function Aside({ children, tone = C.fern, size = 15.5 }: { children: React.ReactNode; tone?: string; size?: number }) {
  return (
    <div className="av-serif italic" style={{ color: tone, fontSize: size, lineHeight: 1.45 }}>
      {children}
    </div>
  );
}

export function Line({
  title,
  sub,
  value,
  tone = C.ink,
  first,
  check,
  strong,
  py = 15,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  value?: React.ReactNode;
  tone?: string;
  first?: boolean;
  check?: "empty" | "done";
  strong?: boolean;
  py?: number;
}) {
  return (
    <div className="av-row flex items-center gap-[14px] px-[4px]" style={{ paddingTop: py, paddingBottom: py, borderTop: first ? "none" : `1px solid ${C.line}` }}>
      {check === "empty" && <div className="w-[20px] h-[20px] rounded-full shrink-0" style={{ border: `1.5px solid ${C.oak}` }} />}
      {check === "done" && <Check />}
      <div className="flex-1 min-w-0">
        <div className={strong ? "av-serif text-[17px] font-medium" : "text-[14.5px] font-medium"} style={{ color: C.ink, lineHeight: 1.3 }}>
          {title}
        </div>
        {sub && (
          <div className="text-[12px] mt-[3px] leading-[1.45]" style={{ color: C.muted }}>
            {sub}
          </div>
        )}
      </div>
      {value !== undefined && (
        <div className={`av-serif av-tnum ${strong ? "text-[20px]" : "text-[17px]"} shrink-0`} style={{ color: tone }}>
          {value}
        </div>
      )}
    </div>
  );
}

/** A pencil tick that draws itself. */
export function Tick({ done }: { done: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="9.5" stroke={done ? C.sage : C.oak} strokeWidth="1.4" fill={done ? "rgba(111,143,114,.12)" : "transparent"} style={{ transition: "all .4s ease" }} />
      <path
        d="m6.6 12.4 3.7 3.7L17.6 8.4"
        stroke={C.fern}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="20"
        strokeDashoffset={done ? 0 : 20}
        style={{ transition: "stroke-dashoffset .5s cubic-bezier(.2,.8,.2,1)" }}
      />
    </svg>
  );
}

/** A task you can actually tick. Controlled when `done`/`onToggle` are given, otherwise keeps its own state. */
export function Task({
  title,
  sub,
  value,
  first,
  py = 13,
  done: doneProp,
  onToggle,
}: {
  title: string;
  sub?: string;
  value?: string;
  first?: boolean;
  py?: number;
  done?: boolean;
  onToggle?: () => void;
}) {
  const [inner, setInner] = useState(false);
  const done = doneProp ?? inner;
  const toggle = () => (onToggle ? onToggle() : setInner((d) => !d));
  return (
    <div
      className="av-row flex items-center gap-[14px] px-[4px] cursor-pointer select-none"
      style={{ paddingTop: py, paddingBottom: py, borderTop: first ? "none" : `1px solid ${C.line}` }}
      onClick={toggle}
    >
      <Tick done={done} />
      <div className="flex-1 min-w-0">
        <div className="relative inline-block text-[15px] font-medium" style={{ color: done ? C.muted : C.ink, lineHeight: 1.3, transition: "color .4s" }}>
          {title}
          <span className="absolute left-0 top-[54%] h-[1.5px] rounded-full" style={{ width: done ? "100%" : "0%", background: C.oakDeep, transition: "width .45s cubic-bezier(.2,.8,.2,1)" }} />
        </div>
        {sub && (
          <div className="text-[12px] mt-[2px]" style={{ color: C.muted, opacity: done ? 0.6 : 1, transition: "opacity .4s" }}>
            {done ? "done — nice." : sub}
          </div>
        )}
      </div>
      {value && (
        <div className="av-tnum text-[15.5px] shrink-0" style={{ color: T.amount, opacity: done ? 0.4 : 1, transition: "opacity .4s" }}>
          {value}
        </div>
      )}
    </div>
  );
}

export function Button({ children, ghost }: { children: React.ReactNode; ghost?: boolean }) {
  return (
    <div
      className="av-cta rounded-full py-[16px] text-center text-[15px] font-medium"
      style={ghost ? { background: C.paper, color: C.fern, boxShadow: `inset 0 0 0 1px ${C.lineGreen}` } : { background: C.fern, color: C.paper }}
    >
      {children}
    </div>
  );
}

export function TextLink({ children, tone = C.sage }: { children: React.ReactNode; tone?: string }) {
  return (
    <div className="av-press inline-flex items-center gap-[5px]">
      <span className="text-[13.5px] font-medium" style={{ color: tone }}>
        {children}
      </span>
      <svg width="13" height="13" viewBox="0 0 24 24" stroke={tone} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={ICON.chevR} />
      </svg>
    </div>
  );
}

export function Check({ delay = "" }: { delay?: string }) {
  return (
    <div className={`av-bloom w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 ${delay}`} style={{ background: C.sage }}>
      <svg width="11" height="11" viewBox="0 0 24 24" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12.5 4.6 4.6L19 6.8" />
      </svg>
    </div>
  );
}

export function Thread({ pct, delay = "0s", tone = C.sage }: { pct: number; delay?: string; tone?: string }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 3, background: "rgba(58,51,44,.08)" }}>
      <div className="av-grow h-full rounded-full" style={{ width: `${pct}%`, background: tone, animationDelay: delay }} />
    </div>
  );
}

export function Quote({ text, by, align = "left", tone = C.fern }: { text: string; by: string; align?: "left" | "center"; tone?: string }) {
  return (
    <div className={`av-quote ${align === "center" ? "text-center" : ""}`}>
      <div className="av-serif italic text-[15px]" style={{ color: tone, lineHeight: 1.5 }}>
        “{text}”
      </div>
      <div className="text-[11.5px] mt-[6px]" style={{ color: C.clay }}>
        {by}
      </div>
    </div>
  );
}

export function BackBar({ title, tone = C.ink }: { title?: string; tone?: string }) {
  return (
    <div className="px-[22px] pt-[10px] flex items-center justify-between av-fade d1">
      <div className="av-press w-[36px] h-[36px] -ml-[8px] rounded-full flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" stroke={tone} strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICON.arrowL} />
        </svg>
      </div>
      {title && (
        <span className="text-[13px]" style={{ color: C.muted }}>
          {title}
        </span>
      )}
      <div className="w-[28px]" />
    </div>
  );
}

/* ---------------------------- icons ---------------------------- */

const ICON_SUN = "M12 4.5v-1.5M12 21v-1.5M19.5 12H21M3 12h1.5M17.3 6.7l1.1-1.1M5.6 18.4l1.1-1.1M17.3 17.3l1.1 1.1M5.6 5.6l1.1 1.1M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z";
const ICON_PLAN = "M5 7h14M5 12h14M5 17h9";
const ICON_YOU = "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8.5c.6-3.6 3.5-5.5 7-5.5s6.4 1.9 7 5.5";

export const ICON = {
  sun: ICON_SUN,
  plan: ICON_PLAN,
  you: ICON_YOU,
  arrowR: "M5 12h14M13 6l6 6-6 6",
  arrowL: "M19 12H5M11 18l-6-6 6-6",
  chevR: "m9 5 7 7-7 7",
  lock: "M6.4 10.6h11.2v9.8H6.4v-9.8Zm2.4 0V7.8a3.2 3.2 0 0 1 6.4 0v2.8",
  search: "M11 4.4a6.6 6.6 0 1 1 0 13.2 6.6 6.6 0 0 1 0-13.2Zm5.2 11.8 4 4",
  check: "m5 12.5 4.6 4.6L19 6.8",
};
