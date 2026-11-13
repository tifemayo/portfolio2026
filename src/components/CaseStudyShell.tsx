import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface MetaItem {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
}

export function CaseStudyShell({
  fileNumber,
  status,
  statusTone,
  title,
  subtitle,
  meta,
  annotation,
  children,
  nextHref,
  nextLabel,
}: {
  /** Project name shown above the title */
  fileNumber: string;
  status: string;
  statusTone: "accent" | "muted";
  title: string;
  subtitle: string;
  meta: MetaItem[];
  annotation?: { note: string; quote: string };
  children: ReactNode;
  nextHref: "/work/unifeed" | "/work/belearn";
  nextLabel: string;
}) {
  const field = statusTone === "accent" ? "bg-sky" : "bg-blush";
  return (
    <article>
      {/* Header: one colour field per project */}
      <header className={`${field}`}>
        <div className="max-w-6xl mx-auto px-5 md:px-6 pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-3 mb-8 text-sm font-semibold">
            <Link to="/#work" className="hover:underline underline-offset-4">
              ← All work
            </Link>
            <span className="opacity-40" aria-hidden="true">
              ·
            </span>
            <span>{fileNumber}</span>
            <span className="rounded-full bg-ink text-background px-3 py-1 text-xs">{status}</span>
          </div>
          <h1 className="font-extrabold tracking-tight text-4xl md:text-6xl leading-[1.03] mb-6 text-balance max-w-[18ch] animate-reveal">
            {title}
          </h1>
          <p className="text-xl md:text-2xl leading-snug font-medium max-w-[52ch] text-pretty animate-reveal opacity-85">
            {subtitle}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 md:px-6 pt-12 md:pt-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-20">
          {/* Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="rounded-2xl border border-border bg-paper p-6 space-y-5">
                {meta.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <div className="eyebrow">{m.label}</div>
                    <div
                      className={
                        m.emphasis
                          ? "font-semibold text-accent"
                          : "font-medium leading-relaxed"
                      }
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {annotation && (
                <div className="pl-5 border-l-[3px] border-pink">
                  <div className="eyebrow !text-accent">{annotation.note}</div>
                  <p className="text-lg mt-2 leading-relaxed font-medium">
                    &ldquo;{annotation.quote}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-14">{children}</div>
        </div>

        {/* Next */}
        <Link
          to={nextHref}
          className="group mb-20 flex items-center justify-between gap-6 rounded-[1.75rem] bg-ink text-background px-7 md:px-12 py-9 md:py-12 hover:bg-accent transition-colors"
        >
          <span className="eyebrow !text-background/70">Next project</span>
          <span className="font-display font-extrabold tracking-tight text-3xl md:text-5xl">
            {nextLabel}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </span>
        </Link>
      </div>
    </article>
  );
}

export function CaseSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5">
      <h2 className="flex items-baseline gap-3 font-extrabold tracking-tight text-2xl md:text-3xl">
        <span className="text-accent text-lg tabular-nums">{num}</span>
        {title}
      </h2>
      <div className="space-y-4 text-lg leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

export function DataPanel({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="rounded-[1.75rem] bg-ink text-background p-8 md:p-10">
      <div className="eyebrow !text-background/60 mb-6">Results</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.label}>
            <div className="font-display text-3xl md:text-5xl font-extrabold mb-2 tracking-tight tabular-nums">
              {it.value}
            </div>
            <div className="text-sm text-background/70">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductMockCard({
  label,
  caption,
  rows,
}: {
  label: string;
  caption: string;
  rows: { tag: string; text: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-paper overflow-hidden">
      <div className="border-b border-border px-5 py-3 bg-secondary/50 font-semibold text-sm">{label}</div>
      <div className="p-6 md:p-8 space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
            <span className="eyebrow !text-accent w-16 shrink-0 pt-1">{r.tag}</span>
            <span className="text-sm text-foreground/80 leading-relaxed">{r.text}</span>
          </div>
        ))}
        <div className="pt-4 text-sm text-muted-foreground">{caption}</div>
      </div>
    </div>
  );
}

export function ResultsTable({
  label,
  columns,
  rows,
  caption,
}: {
  label: string;
  columns: string[];
  rows: ReactNode[][];
  caption?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-paper overflow-hidden">
      <div className="border-b border-border px-5 py-3 bg-secondary/50 font-semibold text-sm">{label}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th key={col} className="px-5 py-3 text-left eyebrow font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-5 py-3 leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <div className="px-5 py-3 border-t border-border text-sm text-muted-foreground">{caption}</div>
      )}
    </div>
  );
}

/**
 * Marks a spot in a case study where a figure still needs confirming.
 * Renders nothing, so visitors never see it; search the code for ConfirmTodo to find them.
 */
export function ConfirmTodo(_props: { note: string }) {
  return null;
}
