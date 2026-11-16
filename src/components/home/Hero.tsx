import { useEffect, useRef } from "react";
import { mountIdeaToShipped } from "../../lib/ideaToShipped";
import { CV_URL, openChat } from "../../lib/site";

const stats = [
  { value: "5", label: "products taken from problem to launch" },
  { value: "75", label: "users validated Unifeed, rated 4.5+/5" },
  { value: "100+", label: "people on the BeLearn waitlist" },
];

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="animate-reveal inline-flex items-center gap-2.5 rounded-full bg-paper border border-border px-4 py-1.5 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-pink opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink" />
            </span>
            Open to Product Manager roles · London
          </div>

          <h1
            className="animate-reveal font-extrabold tracking-tight leading-[0.98] text-[2.7rem] sm:text-6xl lg:text-[4.1rem] text-balance"
            style={{ animationDelay: "80ms" }}
          >
            I turn user problems into products that{" "}
            <span className="script script-in text-[1.3em] ml-1">ship</span>
          </h1>

          <p
            className="animate-reveal mt-8 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[52ch] text-pretty"
            style={{ animationDelay: "160ms" }}
          >
            I&apos;m Tife, a product manager and First Class Computer Science graduate. I&apos;ve taken five
            products from problem to launch, and at Deloitte I helped take a generative AI review tool live
            and coach senior partners on AI adoption.
          </p>

          <div className="animate-reveal mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <a href="#work" className="btn btn-primary">
              See my work <span aria-hidden="true">↓</span>
            </a>
            <a href={CV_URL} download className="btn btn-ghost">
              Download CV
            </a>
            <button type="button" onClick={() => openChat()} className="btn btn-ghost">
              <span className="h-2 w-2 rounded-full bg-pink" aria-hidden="true" />
              Ask my AI assistant
            </button>
          </div>

          <dl
            className="animate-reveal mt-12 grid grid-cols-3 gap-5 md:gap-8 border-t border-border pt-7 max-w-xl"
            style={{ animationDelay: "320ms" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display font-extrabold text-3xl md:text-5xl tracking-tight tabular-nums">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-xs md:text-sm text-muted-foreground leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The story of an idea getting shipped, straight on the page with room to move */}
        <div className="lg:col-span-7 animate-reveal" style={{ animationDelay: "200ms" }}>
          <div className="lg:-ml-6 lg:-mr-5 xl:-mr-16 2xl:-mr-24">
            <ShipStory />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The looping idea-to-shipped animation. The drawing itself lives in lib/ideaToShipped.js. */
function ShipStory() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => (ref.current ? mountIdeaToShipped(ref.current, STORY_SPEED) : undefined), []);
  return (
    <svg
      ref={ref}
      viewBox="190 -810 1770 1640"
      className="idea-story block w-full h-auto"
      role="img"
      aria-label="Tife has an idea, pushes it through research, planning, design, build and testing, and ships it."
    />
  );
}

// 1 = the original 18 second loop. 1.3 brings "SHIPPED!" in at about 8 seconds.
const STORY_SPEED = 1.3;

const marqueeItems = [
  "Deloitte",
  "Whitbread",
  "GSK",
  "Aston University, First Class",
  "Product School certified",
  "BCS Professional Member",
  "Unifeed",
  "BeLearn",
];

export function CredentialMarquee() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-8 pr-8 font-display font-semibold text-lg md:text-xl whitespace-nowrap">
          {item}
          <span className="text-pink text-base" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y border-border bg-paper overflow-hidden py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
