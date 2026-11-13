import { Reveal } from "../Reveal";
import { SectionHeading } from "./Work";

const roles = [
  {
    title: "Forensic Technology Senior Associate",
    org: "Deloitte LLP, London",
    dates: "Sept 2025 to present",
    points: [
      "Took NavigAite, a generative AI review tool, live on 5 to 6 matters with human-in-the-loop review.",
      "Shaped product direction and content architecture for an internal resource hub, from early stage to firm-wide rollout.",
      "AI Reverse Mentor: coach partners on generative and agentic AI adoption, using Copilot agents to show real use cases.",
      "Resolved recurring client blockers across concurrent financial crime engagements, turning complex evidence into client-ready findings.",
    ],
  },
  {
    title: "Data Product Analyst Intern",
    org: "Whitbread, London",
    dates: "June to Sept 2025",
    points: [
      "Delivered the single source of truth for Premier Inn Business: one search-to-booking funnel dashboard replacing reporting across two legacy platforms.",
      "Defined the KPI framework and built the Databricks pipeline behind it.",
    ],
  },
  {
    title: "Teaching Assistant, Computer Science",
    org: "Aston University",
    dates: "Sept 2024 to May 2025",
    points: [
      "Ran labs and tutorials in Data Structures & Algorithms and Computer Systems for undergraduate cohorts.",
    ],
  },
  {
    title: "Computer Science Tutor",
    org: "School of Coding & AI",
    dates: "March to Aug 2023",
    points: ["Taught Scratch, Python and Java to students aged 6 to 18, tailoring each lesson to the learner."],
  },
  {
    title: "Advanced Data Analytics Intern",
    org: "GSK PLC, London",
    dates: "June to Sept 2022",
    points: [
      "Built Power BI dashboards published on the GSK website for global clients, surfacing sales trends through Python and MySQL analysis.",
    ],
  },
];

const modules = [
  ["Enterprise Computing Strategies", "100"],
  ["Software Project Management", "96"],
  ["Multi-Agent Systems", "92"],
  ["Software Engineering", "90"],
  ["Artificial Intelligence", "86"],
];

const credentials = [
  "AI Micro-Certification, Product School (2025)",
  "Product Discovery Micro-Certification, Product School (2025)",
  "AI Product Management, Udemy (2026)",
  "90-Day GenAI Programme, Deloitte",
  "BCS Professional Member (MBCS)",
  "IoT Ambassador, CISCO, selected from 2,000 students (2020)",
  "Led volunteers raising £1,000 for the Young Women's Trust",
  "Volunteer, Black TechFest and 5MFutures",
];

export function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-5 md:px-6 py-20 md:py-28 scroll-mt-16">
      <SectionHeading eyebrow="Experience" title="Where I've" script="worked" />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <ol className="lg:col-span-7 relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />
          {roles.map((r, i) => (
            <li key={r.title} className="relative pl-9 pb-10 last:pb-0">
              <span
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                  i === 0 ? "bg-pink border-pink" : "bg-background border-ink"
                }`}
                aria-hidden="true"
              />
              <Reveal>
                <div className="text-sm font-medium text-muted-foreground">{r.dates}</div>
                <h3 className="mt-1 font-bold text-xl md:text-2xl tracking-tight">{r.title}</h3>
                <div className="font-semibold text-accent">{r.org}</div>
                <ul className="mt-3 space-y-2 text-[0.97rem] leading-relaxed text-foreground/85">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="lg:col-span-5 space-y-6">
          <Reveal>
            <div className="rounded-[1.75rem] bg-sky p-7 md:p-8">
              <div className="eyebrow !text-ink/70 mb-3">Education</div>
              <h3 className="font-extrabold text-2xl md:text-3xl tracking-tight">
                BSc Computer Science, First Class Honours
              </h3>
              <div className="mt-1 font-medium">Aston University · 2021 to 2025</div>
              <ul className="mt-6 space-y-3">
                {modules.map(([name, mark]) => (
                  <li key={name}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{name}</span>
                      <span className="font-bold tabular-nums">{mark}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink/10 overflow-hidden">
                      <div className="h-full rounded-full bg-ink" style={{ width: `${mark}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed opacity-85">
                Coded collaborative agents for a multi-agent Mars explorer in Java. Also LLM applications,
                model training, clustering and regression.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-[1.75rem] bg-paper border border-border p-7 md:p-8">
              <div className="eyebrow mb-4">Certifications and awards</div>
              <ul className="space-y-2.5 text-[0.95rem] leading-snug">
                {credentials.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="text-pink" aria-hidden="true">
                      ✦
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
