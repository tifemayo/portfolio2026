import { useEffect, useState } from "react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "./Work";

const phases = [
  {
    key: "Discover",
    blurb: "Find the real problem before anyone builds anything.",
    skills: ["Discovery interviews", "Usability tests", "Customer journeys", "Competitive research"],
    proof: "Ran 15+ discovery interviews for Unifeed before scoping a single feature.",
  },
  {
    key: "Define",
    blurb: "Turn what I learned into a clear, prioritised plan.",
    skills: [
      "Product vision and roadmaps",
      "Value proposition design",
      "MVP definition",
      "User stories and acceptance criteria",
      "Prioritisation (RICE, ROI)",
    ],
    proof: "Defined the MVP for Unifeed and prioritised its backlog by effort against impact.",
  },
  {
    key: "Design",
    blurb: "Make it concrete early, so it can be tested cheaply.",
    skills: ["Figma", "Miro", "Prototyping and wireframing", "UX/UI design"],
    proof: "Cut two planned features mid-build after usability testing showed users did not value them.",
  },
  {
    key: "Deliver",
    blurb: "Keep a team moving and stakeholders informed.",
    skills: [
      "Agile and Scrum",
      "Sprint planning, stand-ups, reviews, retros",
      "Stakeholder management",
      "Jira",
      "Confluence",
    ],
    proof:
      "Ran 3 Agile sprint cycles from prototype to live product, and led teams of 7 to 8 on two e-commerce builds.",
  },
  {
    key: "Measure",
    blurb: "Check it worked, with numbers people trust.",
    skills: [
      "Success metrics and OKRs",
      "A/B testing",
      "Funnel and KPI analysis",
      "Power BI",
      "Adobe Analytics",
      "Data storytelling",
    ],
    proof: "Defined the KPI framework for Premier Inn Business by platform, device, channel and country.",
  },
  {
    key: "AI",
    blurb: "The thread through all of it: building with and for AI.",
    skills: [
      "Agentic AI and multi-agent systems",
      "LLM application design",
      "Prompt engineering",
      "Model benchmarking",
      "Human-in-the-loop design",
    ],
    proof:
      "Built the core prompts for NavigAite at Deloitte and benchmarked each GPT release, up to GPT-5, before adoption.",
  },
];

const tools = ["Python", "SQL", "LLM APIs", "Claude Code", "Databricks", "Spark SQL", "PySpark", "Java", "Git"];

const C = 160;
const R = 112;
// Five phases around the ring, starting at the top; AI sits in the centre
const ring = phases.slice(0, 5).map((p, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { ...p, x: C + Math.cos(a) * R, y: C + Math.sin(a) * R };
});

export function Process() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % phases.length), 3800);
    return () => window.clearInterval(id);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const phase = phases[active];

  return (
    <section id="process" className="bg-paper border-y border-border scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-20 md:py-28">
        <SectionHeading eyebrow="How I work" title="From problem to launch, in a" script="loop" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <svg
              viewBox="0 0 320 320"
              className="w-full max-w-[420px] mx-auto"
              role="group"
              aria-label="Product loop: pick a phase"
            >
              <circle
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke="var(--ink)"
                strokeOpacity="0.18"
                strokeWidth="1.5"
                strokeDasharray="3 7"
                strokeLinecap="round"
              />
              <g className="loop-orbit" aria-hidden="true">
                <circle cx={C} cy={C - R} r="4" fill="var(--pink)" />
              </g>
              {ring.map((p, i) => {
                const on = active === i;
                return (
                  <g
                    key={p.key}
                    role="button"
                    tabIndex={0}
                    aria-pressed={on}
                    aria-label={p.key}
                    onClick={() => pick(i)}
                    onMouseEnter={() => pick(i)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pick(i)}
                    className="cursor-pointer outline-none"
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 41 : 36}
                      fill={on ? "var(--accent)" : "var(--background)"}
                      stroke="var(--ink)"
                      strokeOpacity={on ? 0 : 0.2}
                      strokeWidth="1.5"
                      style={{ transition: "all .35s cubic-bezier(.16,1,.3,1)" }}
                    />
                    <text
                      x={p.x}
                      y={p.y + 4.5}
                      textAnchor="middle"
                      fontSize="13.5"
                      fontWeight="700"
                      fontFamily="var(--font-display)"
                      fill={on ? "#fff" : "var(--ink)"}
                    >
                      {p.key}
                    </text>
                  </g>
                );
              })}
              <g
                role="button"
                tabIndex={0}
                aria-pressed={active === 5}
                aria-label="AI"
                onClick={() => pick(5)}
                onMouseEnter={() => pick(5)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pick(5)}
                className="cursor-pointer outline-none"
              >
                <circle
                  cx={C}
                  cy={C}
                  r={active === 5 ? 38 : 33}
                  fill={active === 5 ? "var(--accent)" : "var(--ink)"}
                  style={{ transition: "all .35s cubic-bezier(.16,1,.3,1)" }}
                />
                <text
                  x={C}
                  y={C + 6}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="800"
                  fontFamily="var(--font-display)"
                  fill="#fff"
                >
                  AI
                </text>
              </g>
            </svg>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div key={phase.key} className="animate-reveal">
              <div className="flex items-baseline gap-4">
                <span className="font-display font-extrabold text-accent text-2xl tabular-nums">
                  0{active + 1}
                </span>
                <h3 className="font-extrabold tracking-tight text-4xl md:text-5xl">{phase.key}</h3>
              </div>
              <p className="mt-4 text-xl leading-snug font-medium text-pretty">{phase.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {phase.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-background border border-border px-3.5 py-1.5 text-sm font-medium"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-2xl bg-background border border-border p-5 md:p-6">
                <div className="eyebrow !text-accent mb-2">Where I did this</div>
                <p className="text-lg leading-relaxed text-pretty">{phase.proof}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              <span className="eyebrow mr-2">Tools</span>
              {tools.map((t, i) => (
                <span key={t} className="text-muted-foreground">
                  {t}
                  {i < tools.length - 1 && <span className="pl-2 opacity-40">/</span>}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
