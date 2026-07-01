import {
  CaseSection,
  CaseStudyShell,
  DataPanel,
  ResultsTable,
} from "../components/CaseStudyShell";
import { Seo } from "../components/Seo";
import unifeedHome from "../assets/unifeed-home.png";
import unifeedProfile from "../assets/unifeed-profile.png";
import unifeedSearch from "../assets/unifeed-search.png";

export function UnifeedCasePage() {
  return (
    <>
      <Seo
        title="Unifeed: a unified social media platform · Tife Boluwatife"
        description="Case study: Unifeed went from a personal frustration to a validated MVP with 75 real users, roughly 50% less platform-switching time, and a 4.5+/5 satisfaction score."
        ogTitle="Unifeed Case Study · Tife Boluwatife"
        ogDescription="From a user frustration to a validated product with 75 real users."
      />
      <CaseStudyShell
        fileNumber="01 / Unifeed"
        status="Shipped & Validated"
        statusTone="accent"
        title="Unifeed: from a user frustration to a validated product."
        subtitle="A unified social media platform that cut platform-switching time roughly in half, built end to end and tested with 75 real users."
        meta={[
          { label: "Role", value: "Sole Product Owner, Researcher, Builder" },
          { label: "Timeline", value: "13 sprints, Oct 2024 to May 2025" },
          { label: "Scope", value: "Discovery, scoping, build, usability testing, validation" },
          { label: "Research base", value: "75 users · 25+ interviews" },
          { label: "Core outcome", value: "~50% reduction in platform-switching time", emphasis: true },
          { label: "Satisfaction", value: "4.5+ / 5 average across core tasks" },
        ]}
        annotation={{
          note: "Note 04 / Discovery",
          quote:
            "The MVP I shipped looked nothing like my original idea. That's exactly how it should work.",
        }}
        nextHref="/work/welearn"
        nextLabel="02 / BeLearn"
      >
        <figure className="border border-border bg-paper overflow-hidden">
          <div className="border-b border-border px-4 py-2 flex items-center justify-between bg-secondary/40">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Unifeed · Home (Desktop &amp; Mobile)
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">v1.0</span>
          </div>
          <img
            src={unifeedHome}
            alt="Unifeed unified feed in desktop and mobile view, showing aggregated posts from Instagram, TikTok, and Unifeed in a single timeline."
            className="w-full block bg-paper"
            loading="lazy"
          />
          <figcaption className="px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border">
            One feed across platforms. Mobile strips the side rails to reduce cognitive load.
          </figcaption>
        </figure>

        <CaseSection num="01" title="The Problem">
          <p>
            Almost nobody lives on a single social platform. The average person moves across close to seven
            of them, each specialised: TikTok for short video, Instagram for visual feeds. All that switching
            feels harmless, but it is not. It splinters attention, inflates the hours we lose, and chips away
            at wellbeing.
          </p>
          <p>
            The tools that look like they solve this (Hootsuite, Buffer, Sprout Social) are built for
            marketers scheduling posts. Not one of them is built for an ordinary person who wants to consume
            content with less friction. That was the opening: the consumer side of this problem had no product
            speaking to it.
          </p>
        </CaseSection>

        <CaseSection num="02" title="The Decision I'd Lead With">
          <p>
            The most important call on Unifeed was not a feature. It was choosing to ship a credible proof of
            concept on simulated data instead of live platform APIs.
          </p>
          <p>
            Feasibility research hit a wall early. Instagram's Graph API and TikTok's API both demand
            business verification, enforce strict rate limits, and lock down third-party engagement in ways a
            solo, unfunded project cannot clear inside a fixed timeline. I had a choice: spend the whole
            project fighting for API access and risk shipping nothing, or build a genuinely working experience
            on a mock data layer designed from day one to be swapped for real APIs later.
          </p>
          <p>
            I built. The trade-off is plain: I gave up "real data" credibility in exchange for a product that
            actually worked and could be tested. That is the only way to answer the question that mattered:
            does a unified, usage-aware feed reduce switching and feel good to use? To protect the future, I
            built a service-abstraction layer so authentication, content retrieval, and platform connections
            all carry over when real APIs go in.{" "}
            <span className="text-accent font-medium">
              A scope and sequencing call under a hard external constraint. That is the everyday substance of
              the job.
            </span>
          </p>
        </CaseSection>

        <CaseSection num="03" title="Discovery">
          <p>I did not trust my own hunch. I triangulated across three sources.</p>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border mt-2">
            {[
              {
                n: "01",
                title: "Primary research",
                body: "A survey of 75 people. Two thirds reported four or more hours a day on social media. 96% used no management tool at all — the existing tools were seen as irrelevant, not merely unappealing.",
              },
              {
                n: "02",
                title: "Competitive teardown",
                body: "Mapped Hootsuite, Buffer, and Sprout Social against Unifeed across seven dimensions: unified viewing, content discovery, consumer UI, platform-native interactions, usage tracking, price, and analytics. Every incumbent optimised for professionals. None cared about a consumer's wellbeing.",
              },
              {
                n: "03",
                title: "Literature review",
                body: "Grounded the problem in cognitive-load and task-switching research. It also surfaced an honest gap: no study quantifies the time lost specifically to platform switching. I treated that as something to measure rather than something to gloss over.",
              },
            ].map((b) => (
              <div key={b.n} className="bg-background p-6 space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Source {b.n}
                </div>
                <div className="font-semibold text-sm">{b.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
          <p>
            The 96% figure was the one that changed the pitch. It told me the problem was not that people
            chose the wrong tool. It was that no tool felt relevant to them at all. That became the backbone
            of the market-gap argument.
          </p>
        </CaseSection>

        <CaseSection num="04" title="Roadmap and Prioritisation">
          <p>
            I converted the research into a MoSCoW-prioritised requirement set, each item paired with a
            measurable acceptance criterion rather than a vague wish.
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border mt-2">
            {[
              {
                priority: "Must have",
                tone: "accent" as const,
                items: [
                  "Unified feed with platform indicators",
                  "Authentication",
                  "Profile and follow",
                  "Cross-platform like and comment",
                ],
              },
              {
                priority: "Should have",
                tone: "muted" as const,
                items: ["Platform filtering", "Cross-platform search"],
              },
              {
                priority: "Could have",
                tone: "muted" as const,
                items: [
                  "Daily time tracking and goal setting (promoted mid-project, see below)",
                ],
              },
              {
                priority: "Won't have this cycle",
                tone: "muted" as const,
                items: [
                  "Content scheduling",
                  "Full analytics dashboards",
                  "Consciously parked to protect the MVP.",
                ],
              },
            ].map((p) => (
              <div key={p.priority} className="bg-background p-6 space-y-3">
                <div
                  className={`font-mono text-[10px] uppercase tracking-widest ${
                    p.tone === "accent" ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {p.priority}
                </div>
                <ul className="space-y-2">
                  {p.items.map((item, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex gap-2">
                      <span className="text-accent mt-0.5 shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p>
            One moment where data changed the plan: time-usage tracking started life as a "Could have." Once
            the survey showed how badly people underestimate their own usage, I promoted it to a headline
            differentiator. The feature that lifts Unifeed from a convenience layer into a wellbeing tool.
            Non-functional requirements got the same discipline: feed load under 3s, interactions under 1s,
            WCAG 2.1 AA accessibility, over 75% test coverage.
          </p>
        </CaseSection>

        <CaseSection num="05" title="Execution">
          <p>
            I ran 13 two-week sprints across six phases as Agile Scrum adapted for a team of one. Product
            owner, delivery, and QA all sat with me, but I kept the ceremonies that keep a roadmap honest: a
            Trello Kanban board, burndown tracking, weekly stakeholder reviews with my supervisor, and daily
            written stand-ups.
          </p>
          <p>
            I also kept a probability-and-impact risk matrix covering eight tracked risks, each with a
            mitigation and a contingency. When the project slipped by several weeks after some unforeseen
            events, the contingency I had already agreed with myself (pause the non-MVP features) meant I
            protected the core instead of panicking.
          </p>
          <p>
            Stack rationale: React over Angular and Vue for component reuse, MySQL over MongoDB and Firebase
            for relational integrity, a service layer for platform-agnostic data. The stack is not the point.
            The point is that I made reasoned build decisions and documented them well enough to defend to an
            engineer.
          </p>
        </CaseSection>

        <div className="grid md:grid-cols-2 gap-4">
          <figure className="border border-border bg-paper overflow-hidden">
            <img
              src={unifeedProfile}
              alt="Unifeed profile screen consolidating social identity across networks."
              className="w-full block"
              loading="lazy"
            />
            <figcaption className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border">
              Profile · one identity, every platform
            </figcaption>
          </figure>
          <figure className="border border-border bg-paper overflow-hidden">
            <img
              src={unifeedSearch}
              alt="Unifeed cross-platform search results aggregated from TikTok, Instagram, and Unifeed."
              className="w-full block"
              loading="lazy"
            />
            <figcaption className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border">
              Search · cross-platform, one query
            </figcaption>
          </figure>
        </div>

        <CaseSection num="06" title="Results">
          <p>I measured through three lenses and reported the misses as openly as the wins.</p>

          <ResultsTable
            label="User Acceptance Testing · 5 users · tasks scored 1 to 5"
            columns={["Task", "Success rate", "Satisfaction"]}
            rows={[
              ["View unified feed", "100%", "4.9 / 5"],
              ["Apply platform filter", "100%", "4.6 / 5"],
              ["Search users and posts", "100%", "4.4 / 5"],
              [
                "Edit profile",
                <span className="text-accent font-medium">85%</span>,
                "4.0 / 5",
              ],
              ["Log in", "100%", "4.9 / 5"],
            ]}
            caption="Profile-edit at 85% exposed a real defect: connections would not update without a page refresh. Fixed by moving to optimistic updates, then re-tested. All five testers said they would adopt Unifeed."
          />

          <p>
            Usability testing with ten users in five think-aloud pairs surfaced the quieter friction: unclear
            password rules, no confirmation after a save, a share flow that could submit empty content. Each
            became a specific fix.
          </p>

          <div className="border-l-2 border-accent/40 pl-5 py-1">
            <p className="text-lg font-medium">
              The headline number, told straight.
            </p>
            <p className="text-muted-foreground mt-1">
              Session time on the unified interface came in under a minute, against roughly two minutes on
              Instagram plus five on TikTok when used separately. That works out to about a 50% reduction in
              switching time. I flagged this as an estimate in the write-up, because the research gap means
              there is no perfectly clean baseline.{" "}
              <span className="text-foreground">Naming that honestly is the point.</span>
            </p>
          </div>

          <ResultsTable
            label="Performance · Targets vs Actuals"
            columns={["Metric", "Target", "Actual", "Result"]}
            rows={[
              [
                "LCP (Largest Contentful Paint)",
                "3.0s",
                "1.7s",
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Pass</span>,
              ],
              [
                "Interaction response",
                "1.0s",
                "0.6s",
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Pass</span>,
              ],
              [
                "CLS (Cumulative Layout Shift)",
                "0.1",
                "0.009",
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Pass</span>,
              ],
              [
                "Frame rate",
                "30fps",
                "38 to 46fps",
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Pass</span>,
              ],
              [
                "Total Blocking Time",
                "200ms",
                "210ms",
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Miss
                </span>,
              ],
            ]}
            caption="TBT missed by 10ms. Reported here rather than quietly dropped — one honest miss out of five."
          />
        </CaseSection>

        <DataPanel
          items={[
            { value: "75", label: "Active testers" },
            { value: "25+", label: "User interviews" },
            { value: "~50%", label: "Switching time cut" },
            { value: "4.5/5", label: "Avg satisfaction" },
          ]}
        />

        <CaseSection num="07" title="Reflection">
          <p>
            Unifeed met over 90% of its defined objectives, proved genuine consumer demand in a category the
            incumbents ignore, and left behind an architecture ready for real-API integration. The two unmet
            requirements were deliberate deferrals (scheduling and advanced analytics), not failures.
          </p>
          <p>
            What I would do differently: I under-budgeted sprint buffer time, which is exactly why the delays
            stung. Next time, I build slack in from sprint one and pressure-test the riskiest assumption (API
            feasibility) in week one, not halfway through the build.
          </p>
        </CaseSection>
      </CaseStudyShell>
    </>
  );
}
