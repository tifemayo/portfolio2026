import { useState } from "react";
import { Girl, PhoneGirl } from "../Character";
import { Reveal } from "../Reveal";
import { CV_URL, EMAIL, LINKEDIN, openChat } from "../../lib/site";

export function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-5 md:px-6 pb-20 md:pb-28 scroll-mt-20">
      <Reveal>
        <div className="rounded-[1.75rem] bg-sand overflow-hidden grid md:grid-cols-12">
          <div className="md:col-span-8 p-7 md:p-12">
            <div className="eyebrow !text-ink/70 mb-4">About me</div>
            <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl leading-[1.05] text-balance">
              I care more about <span className="script text-[1.15em] mx-[0.1em]">why</span> something
              gets built than how. I can do both.
            </h2>
            <div className="mt-7 space-y-4 text-lg leading-relaxed max-w-[58ch]">
              <p>
                Unifeed came from a problem I lived with every day. BeLearn came from tutoring students aged 6
                to 18 and seeing what one-size-fits-all teaching misses.
              </p>
              <p>
                At Deloitte I work on financial crime engagements and generative AI tools, which taught me to
                make sense of complexity and explain it clearly. I&apos;m now looking for a Product Manager
                role where I can bring structure, empathy and a builder&apos;s mindset to a team.
              </p>
            </div>
          </div>
          <div className="md:col-span-4 relative min-h-[220px] md:min-h-0">
            <Girl
              pose="wave"
              title="Illustration of Tife waving"
              className="girl-hop absolute bottom-6 right-10 md:right-14 h-[190px] md:h-[250px] w-auto"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-5 md:px-6 pb-20 md:pb-28 scroll-mt-20">
      <Reveal>
        <div className="canvas-frame bg-blush relative overflow-hidden mx-1.5 px-7 md:px-14 pt-12 md:pt-16 pb-44 md:pb-20">
          <div className="eyebrow !text-ink/70 mb-4">Contact</div>
          <h2 className="font-extrabold tracking-tight text-5xl md:text-7xl leading-[0.98]">
            Let&apos;s <span className="script text-[1.25em] !text-ink mx-[0.12em]">talk</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-[40ch] font-medium">
            Hiring for a product role, or want to hear more about something I&apos;ve built? My inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}`} className="btn btn-primary">
              {EMAIL}
            </a>
            <button type="button" onClick={copyEmail} className="btn btn-ghost !border-ink/40" aria-live="polite">
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 font-semibold">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener"
              className="border-b-2 border-ink/40 hover:border-ink pb-0.5"
            >
              LinkedIn ↗
            </a>
            <a href={CV_URL} download className="border-b-2 border-ink/40 hover:border-ink pb-0.5">
              Download CV ↓
            </a>
            <button
              type="button"
              onClick={() => openChat()}
              className="border-b-2 border-ink/40 hover:border-ink pb-0.5"
            >
              Ask my AI assistant
            </button>
          </div>
          <PhoneGirl className="absolute bottom-7 right-6 md:right-14 w-[240px] md:w-[360px] h-auto" />
        </div>
      </Reveal>
    </section>
  );
}
