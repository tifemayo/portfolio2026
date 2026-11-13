/**
 * The site's character: a small illustrated figure of Tife.
 * Slicked-back hair into a low afro puff, pink tank top, flared trousers, loafers.
 * Drawn in SVG so she stays crisp at any size and can be animated with CSS.
 */

const SKIN = "#7b4a2d";
const SKIN_BACK = "#633a21";
const HAIR = "#1f1612";
const TOP = "var(--pink)";
const TROUSER = "#3b2c1c";
const TROUSER_BACK = "#2c2014";
const SHOE = "#fff7ea";
const GOLD = "#e0aa3e";
const BAG = "var(--butter)";

const LEG = "M53.5,102 L66.5,102 L67,148 Q68,168 75,186 L45,186 Q52,168 53,148 Z";
const SHOE_PATH = "M55,183 h15 q10,1 11,9 h-26 z";

function Puff({ cx, cy, r = 7.5 }: { cx: number; cy: number; r?: number }) {
  // A soft scalloped cloud reads as an afro puff at small sizes
  const bumps = [0, 51, 103, 154, 206, 257, 309].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + Math.cos(a) * r * 0.72, y: cy + Math.sin(a) * r * 0.72 };
  });
  return (
    <g fill={HAIR}>
      <circle cx={cx} cy={cy} r={r} />
      {bumps.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={r * 0.5} />
      ))}
    </g>
  );
}

function Head() {
  return (
    <g>
      <Puff cx={46.5} cy={53} />
      <circle cx="61" cy="42" r="13" fill={SKIN} />
      {/* slicked-back hair */}
      <path d="M48.5,49 Q44,27 61,27.5 Q73,28 74.5,37 Q66,32.5 58.5,36.5 Q53.5,40 52.5,49.5 Z" fill={HAIR} />
      <circle cx="57" cy="45.5" r="2.2" fill={SKIN_BACK} />
      <circle cx="57" cy="50" r="1.5" fill={GOLD} />
    </g>
  );
}

export function Girl({
  pose = "stand",
  className = "",
  title = "Illustration of Tife",
}: {
  pose?: "stand" | "wave";
  className?: string;
  title?: string;
}) {
  const wave = pose === "wave";
  const bag = (
    <g>
      <path d="M56,104 q4,-7 8,0" fill="none" stroke={TROUSER} strokeWidth="1.4" />
      <rect x="52" y="104" width="16" height="13" rx="3" fill={BAG} stroke={TROUSER} strokeWidth="1" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 120 200"
      className={`girl ${wave ? "girl--wave" : ""} ${className}`}
      role="img"
      aria-label={title}
    >
      <ellipse cx="76" cy="192.5" rx="30" ry="3.2" fill="var(--ink)" opacity="0.16" />
      <g className="girl-body">
        <g className="arm arm-back" style={{ transform: "rotate(5deg)" }}>
          <rect x="56.5" y="64" width="7" height="42" rx="3.5" fill={SKIN_BACK} />
          {wave && bag}
        </g>
        <g className="leg leg-back" style={{ transform: "rotate(-5deg)" }}>
          <path d={SHOE_PATH} fill={SHOE} />
          <path d={LEG} fill={TROUSER_BACK} />
        </g>
        {/* tank top */}
        <path d="M50.5,70 Q50.5,61.5 60,61.5 Q69.5,61.5 69.5,70 L68.5,97 L51.5,97 Z" fill={TOP} />
        {/* waistband and hips */}
        <path d="M51,95 h18 l0.5,11 q-9.5,5 -19,0 z" fill={TROUSER} />
        <g className="leg leg-front" style={{ transform: "rotate(4deg)" }}>
          <path d={SHOE_PATH} fill={SHOE} />
          <path d={LEG} fill={TROUSER} />
        </g>
        <rect x="56.5" y="51" width="7.5" height="13" rx="3" fill={SKIN} />
        <Head />
        <g className="arm arm-front" style={{ transform: wave ? "rotate(-112deg)" : "rotate(-4deg)" }}>
          <rect x="56.5" y="64" width="7" height="42" rx="3.5" fill={SKIN} />
          {!wave && bag}
        </g>
      </g>
    </svg>
  );
}

/** Head only, for the chat avatar. */
export function GirlHead({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="34 22 48 48" className={className} aria-hidden="true">
      <path d="M50.5,70 Q50.5,61.5 60,61.5 Q69.5,61.5 69.5,70 Z" fill={TOP} />
      <rect x="56.5" y="51" width="7.5" height="13" rx="3" fill={SKIN} />
      <Head />
    </svg>
  );
}

/** Lying on her front, on the phone, feet kicking. Used in the contact section. */
export function PhoneGirl({ className = "" }: { className?: string }) {
  const shin = "M190,88 L202,88 L203,58 Q204,46 211,35 L181,35 Q188,46 189,58 Z";
  const foot = "M186,36 v-6 q1,-7 9,-7 h13 q3,7 -2,13 z";
  return (
    <svg
      viewBox="0 0 260 120"
      className={`phone-girl ${className}`}
      role="img"
      aria-label="Illustration of Tife lying down, chatting on a pink phone"
    >
      <ellipse cx="150" cy="102" rx="82" ry="3.5" fill="var(--ink)" opacity="0.16" />
      {/* phone */}
      <path
        d="M49,92 q10,-14 20,-4 q9,9 16,-2 q7,-11 12,-27"
        fill="none"
        stroke="var(--pink)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M20,100 q1,-15 15,-15 q14,0 15,15 z" fill="var(--pink)" />
      <circle cx="35" cy="93" r="4.5" fill="var(--paper)" />
      {/* back shin */}
      <g className="shin shin-b">
        <path d={foot} fill={SHOE} />
        <path d={shin} fill={TROUSER_BACK} />
      </g>
      {/* back arm resting on the floor */}
      <path d="M120,72 L124,97 L100,98" fill="none" stroke={SKIN_BACK} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* trousers then top, as thick rounded strokes */}
      <path d="M146,81 Q170,89 196,89" fill="none" stroke={TROUSER} strokeWidth="21" strokeLinecap="round" />
      <path d="M114,70 Q131,72 147,80" fill="none" stroke={TOP} strokeWidth="21" strokeLinecap="round" />
      <g className="shin shin-a">
        <path d={foot} fill={SHOE} />
        <path d={shin} fill={TROUSER} />
      </g>
      {/* neck and head, facing the phone */}
      <path d="M108,66 L99,57" stroke={SKIN} strokeWidth="8" strokeLinecap="round" />
      <g transform="translate(155 6) scale(-1 1)">
        <Head />
      </g>
      {/* handset */}
      <rect x="95" y="36" width="6.5" height="25" rx="3.2" fill="var(--pink)" transform="rotate(-6 98 48)" />
      {/* front arm: elbow on the floor, hand at the ear */}
      <path d="M115,71 L111,97 L101,60" fill="none" stroke={SKIN} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
