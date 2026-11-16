import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../Reveal";
import unifeedHome from "../../assets/unifeed-home.png";
import belearnHero from "../../assets/belearn-hero.png";

function SectionHeading({ eyebrow, title, script }: { eyebrow: string; title: string; script?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h2 className="font-extrabold tracking-tight text-4xl md:text-6xl leading-[1.02] text-balance">
        {title}
        {script && <span className="script text-[1.25em] ml-[0.2em]">{script}</span>}
      </h2>
    </Reveal>
  );
}
export { SectionHeading };

/* ---------- Featured projects (have full case studies) ---------- */

function Featured({
  to,
  field,
  name,
  role,
  dates,
  line,
  points,
  metrics,
  image,
  imageAlt,
  reverse,
}: {
  to: string;
  field: string;
  name: string;
  role: string;
  dates: string;
  line: string;
  points: string[];
  metrics: { value: string; label: string }[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <Reveal>
      <Link to={to} className={`project-card group block rounded-[1.75rem] ${field} p-7 md:p-11`}>
        <div className="grid lg:grid-cols-2 gap-7 lg:gap-14 lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
              <span>{role}</span>
              <span className="opacity-40" aria-hidden="true">·</span>
              <span className="font-medium opacity-75">{dates}</span>
            </div>
            <h3 className="mt-4 font-extrabold tracking-tight text-4xl md:text-6xl">{name}</h3>
            <p className="mt-4 text-lg md:text-xl leading-snug font-medium text-pretty max-w-[34ch]">{line}</p>
          </div>
          <ul className="space-y-2.5 text-[0.95rem] leading-relaxed opacity-85">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The whole screenshot at full card width, never cropped */}
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="shot mt-8 md:mt-10 block w-full h-auto rounded-xl md:rounded-2xl shadow-2xl shadow-ink/25 border border-ink/10"
        />

        <div className="mt-8 md:mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-7 border-t border-ink/15 pt-6">
          <dl className="grid grid-cols-3 gap-4 md:gap-10">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-display font-extrabold text-2xl md:text-4xl tracking-tight tabular-nums">{m.value}</dt>
                <dd className="mt-1 text-xs md:text-sm opacity-75 leading-snug">{m.label}</dd>
              </div>
            ))}
          </dl>
          <span className="inline-flex items-center gap-2 font-semibold">
            <span className="border-b-2 border-ink pb-0.5">Read the case study</span>
            <span className="transition-transform group-hover:translate-x-1.5" aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ---------- Small coded vignettes for projects without screenshots ---------- */

function VignetteShell({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="shot rounded-xl bg-paper text-ink border border-ink/10 shadow-xl shadow-ink/15 p-4 text-xs" aria-hidden="true">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold">{label}</span>
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-pink" />
        </span>
      </div>
      {children}
    </div>
  );
}

function AgentVignette() {
  const rows = [
    { tag: "Decide", text: "Chose the next school to contact" },
    { tag: "Send", text: "Wrote and sent the intro email" },
    { tag: "Reply", text: "Answered a question, on its own" },
    { tag: "Log", text: "Recorded every action taken" },
  ];
  return (
    <VignetteShell label="Agent activity">
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.tag} className="flex items-center gap-2.5 rounded-lg bg-background px-2.5 py-1.5">
            <span className="w-12 font-bold text-accent">{r.tag}</span>
            <span className="opacity-80">{r.text}</span>
          </li>
        ))}
      </ul>
    </VignetteShell>
  );
}

function BenchmarkVignette() {
  const rows = [
    { label: "Earlier GPT release", w: "58%" },
    { label: "Newer GPT release", w: "74%" },
    { label: "GPT-5", w: "90%", on: true },
  ];
  return (
    <VignetteShell label="Model benchmark before adoption">
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="mb-1 opacity-75">{r.label}</div>
            <div className="h-2.5 rounded-full bg-background overflow-hidden">
              <div className={`h-full rounded-full ${r.on ? "bg-pink" : "bg-ink/35"}`} style={{ width: r.w }} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2 opacity-75">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-ink/50" /> A human reviews every output
      </div>
    </VignetteShell>
  );
}

function FunnelVignette() {
  const rows = [
    { label: "Search", w: "100%" },
    { label: "Checkout", w: "62%" },
    { label: "Booking", w: "38%" },
    { label: "Revenue", w: "30%" },
  ];
  return (
    <VignetteShell label="Search to booking funnel">
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <li key={r.label} className="flex items-center gap-2.5">
            <span className="w-14 opacity-75">{r.label}</span>
            <div className="flex-1">
              <div
                className={`h-4 rounded-md ${i === 2 ? "bg-pink" : "bg-ink/30"}`}
                style={{ width: r.w }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Platform", "Device", "Channel", "Country"].map((t) => (
          <span key={t} className="rounded-full bg-background px-2 py-0.5 opacity-80">{t}</span>
        ))}
      </div>
    </VignetteShell>
  );
}

function StoreVignette() {
  return (
    <VignetteShell label="Two e-commerce builds">
      <div className="grid grid-cols-2 gap-2.5">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-lg bg-background p-2">
            <div className={`h-9 rounded-md ${i === 0 ? "bg-blush" : "bg-sky"}`} />
            <div className="mt-2 grid grid-cols-3 gap-1">
              <div className="h-5 rounded bg-ink/15" />
              <div className="h-5 rounded bg-ink/15" />
              <div className="h-5 rounded bg-ink/15" />
            </div>
            <div className="mt-2 h-3 w-10 rounded-full bg-ink" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex -space-x-1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={`h-4 w-4 rounded-full border-2 border-paper ${i === 0 ? "bg-pink" : "bg-ink/40"}`} />
        ))}
        <span className="pl-3.5 opacity-75">a team of 7 to 8</span>
      </div>
    </VignetteShell>
  );
}

/* ---------- Compact project cards ---------- */

function Compact({
  field,
  where,
  dates,
  name,
  line,
  points,
  tags,
  vignette,
  delay,
}: {
  field: string;
  where: string;
  dates: string;
  name: string;
  line: string;
  points: string[];
  tags: string[];
  vignette: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className={`project-card h-full rounded-[1.75rem] ${field} p-7 md:p-9 flex flex-col`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
          <span>{where}</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span className="font-medium opacity-75">{dates}</span>
        </div>
        <h3 className="mt-3 font-extrabold tracking-tight text-3xl md:text-4xl text-balance">{name}</h3>
        <p className="mt-3 text-lg leading-snug font-medium text-pretty">{line}</p>
        <div className="mt-6 max-w-sm">{vignette}</div>
        <ul className="mt-6 space-y-2 text-[0.95rem] leading-relaxed opacity-85">
          {points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-current/25 px-3 py-1 text-xs font-semibold">
              {t}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-5 md:px-6 py-20 md:py-28 scroll-mt-16">
      <SectionHeading eyebrow="Selected work · 6 projects" title="Things I've" script="shipped" />

      <div className="space-y-6 md:space-y-8">
        <Featured
          to="/work/unifeed"
          field="bg-sky"
          name="Unifeed"
          role="Product Lead"
          dates="Sept 2024 to May 2025"
          line="One calm feed for people worn down by jumping between social apps."
          points={[
            "Ran 15+ discovery interviews before scoping a single feature.",
            "Defined the MVP, prioritised the backlog by effort against impact, and ran 3 Agile sprint cycles from prototype to live product.",
            "Cut two planned features mid-build after usability testing showed users did not value them.",
          ]}
          metrics={[
            { value: "50%", label: "less platform-switching time" },
            { value: "75", label: "users validated it" },
            { value: "4.5+/5", label: "satisfaction" },
          ]}
          image={unifeedHome}
          imageAlt="Unifeed's unified feed on desktop and mobile."
        />
        <Featured
          to="/work/belearn"
          field="bg-blush"
          name="BeLearn"
          role="Co-Founder & Product Lead"
          dates="May 2026 to present"
          line="A STEM and AI learning platform for young people."
          points={[
            "Took it from discovery and customer journey mapping to a live waitlist.",
            "Built the unit economics model across 6 price points: LTV of £419 to £978 per student and a CAC ceiling.",
            "Prototyping an LLM matching layer that pairs learners with tutors by subject, learning need and SEN requirement.",
          ]}
          metrics={[
            { value: "100+", label: "on the waitlist" },
            { value: "6", label: "price points modelled" },
            { value: "17 to 24", label: "students to reach £3k MRR" },
          ]}
          image={belearnHero}
          imageAlt="BeLearn landing page with waitlist sign-up."
          reverse
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Compact
            field="bg-ink text-background"
            where="Deloitte"
            dates="Sept 2025 to present"
            name="NavigAite"
            line="A generative AI review tool, taken live on 5 to 6 matters."
            vignette={<BenchmarkVignette />}
            points={[
              "Built its 3 to 4 core prompts.",
              "Benchmarked each GPT release, up to GPT-5, before the team adopted it.",
              "Kept a human in the loop on every review.",
            ]}
            tags={["Generative AI", "Prompt design", "Model benchmarking"]}
          />
          <Compact
            delay={100}
            field="bg-butter"
            where="BeLearn"
            dates="2026"
            name="School outreach email agent"
            line="An agentic AI email agent, built with Claude Code."
            vignette={<AgentVignette />}
            points={[
              "Decides which schools to contact.",
              "Sends and replies on its own.",
              "Logs every action so nothing happens unseen.",
            ]}
            tags={["Agentic AI", "Claude Code", "Growth"]}
          />
          <Compact
            field="bg-sand"
            where="Whitbread"
            dates="June to Sept 2025"
            name="Premier Inn Business funnel dashboard"
            line="The single source of truth for search to booking."
            vignette={<FunnelVignette />}
            points={[
              "One dashboard replaced reporting across two legacy platforms.",
              "Defined the KPI framework: conversion, checkout, bookings and revenue.",
              "Built the Databricks pipeline in Spark SQL and PySpark, validating data quality end to end.",
            ]}
            tags={["Data product", "KPI framework", "Databricks"]}
          />
          <Compact
            delay={100}
            field="bg-paper border border-border"
            where="Aston University"
            dates="Sept 2022 to 2024"
            name="Two e-commerce team builds"
            line="Product manager for a team of 7 to 8, twice."
            vignette={<StoreVignette />}
            points={[
              "Led both customer e-commerce builds from brief to delivered website.",
              "Scored 96 in Software Project Management.",
            ]}
            tags={["Team leadership", "Delivery", "E-commerce"]}
          />
        </div>
      </div>
    </section>
  );
}
