import {
  CaseSection,
  CaseStudyShell,
  ConfirmTodo,
} from "../components/CaseStudyShell";
import { Seo } from "../components/Seo";
import belearnHero from "../assets/belearn-hero.png";
import belearnFeature from "../assets/belearn-feature.png";

export function BeLearnCasePage() {
  return (
    <>
      <Seo
        title="BeLearn: a STEM and AI learning platform for young people · Tife Olusina"
        description="Case study: building BeLearn, a STEM and AI learning platform for young people, from discovery and customer journey mapping to a 100+ waitlist."
        ogTitle="BeLearn Case Study · Tife Olusina"
        ogDescription="A STEM and AI learning platform for young people, from discovery to a 100+ waitlist."
      />
      <CaseStudyShell
        fileNumber="BeLearn"
        status="Pre-launch · 100+ waitlist"
        statusTone="muted"
        title="BeLearn: a STEM and AI learning platform for young people."
        subtitle="An online learning platform giving the younger generation STEM knowledge and AI skills, taken from discovery and customer journey mapping to a 100+ waitlist."
        meta={[
          { label: "Role", value: "Co-Founder & Product Lead" },
          { label: "Timeline", value: "May 2026 to present" },
          { label: "Status", value: "Pre-launch · live at belearn.org" },
          { label: "Traction", value: "100+ waitlist signups before launch", emphasis: true },
          {
            label: "Scope",
            value:
              "Discovery, customer journey mapping, unit economics, agentic AI outreach, LLM matching prototype",
          },
        ]}
        annotation={{
          note: "Why I built it",
          quote:
            "I watched students light up when the right person explained something the right way. BeLearn is about making that match happen.",
        }}
        nextHref="/work/unifeed"
        nextLabel="Unifeed"
      >
        <figure className="rounded-2xl border border-border bg-paper overflow-hidden">
          <div className="border-b border-border px-4 py-2 flex items-center justify-between bg-secondary/40">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              belearn.org · Landing
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">Live</span>
          </div>
          <img
            src={belearnHero}
            alt="BeLearn landing page showing 'Tutoring that sees everyone' hero with waitlist signup form."
            className="w-full block"
            loading="lazy"
          />
          <figcaption className="px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border">
            Live at belearn.org. 100+ waitlist signups before launch.
          </figcaption>
        </figure>

        <CaseSection num="01" title="The Problem">
          <p>
            BeLearn is a STEM and AI learning platform for young people. It starts from a problem I saw up
            close while teaching.
          </p>
          <p>
            Tutoring quietly fails the very families who need it most. The same four frustrations kept coming
            up: a tutor who does not really understand the child's pace, background, or way of learning; a
            price that puts good tutoring out of reach; sessions the child sits through and still leaves
            confused; and no way to find someone who understands your culture, or who can teach a home
            language.
          </p>
          <p>
            The model that dominates the category, a marketplace that lists tutors and lets parents guess,
            hands every one of those problems straight back to the parent.
          </p>
        </CaseSection>

        <CaseSection num="02" title="The Product Thesis">
          <p>
            BeLearn's central bet is simple to say and hard to execute: managed, not marketplace. Rather than
            dropping parents in front of a search box, BeLearn owns the match. A hand-matched tutor, a free
            first session to take the risk out of fit, then ongoing sessions with progress tracked along the
            way.
          </p>
          <p>
            This is a real strategic trade-off I hold consciously. A marketplace scales cheaply but optimises
            for transactions. BeLearn optimises for match quality and outcomes, which is harder to scale and
            thinner on margin early on. I accept that, because it is the only model that actually answers the
            four frustrations above, and it is far more defensible once it works.
          </p>
          <p>
            Everything ladders up to one line:{" "}
            <span className="text-accent font-medium">
              your potential should not be limited by your postcode, your background, or your budget.
            </span>
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden mt-2">
            {[
              {
                n: "01",
                title: "Relatability",
                body: "Globally sourced tutors who understand a learner's world, including the cultures and home languages (African languages among them) that mainstream platforms do not serve.",
              },
              {
                n: "02",
                title: "Smart matching",
                body: "Pairing on how a student learns best, not merely on who happens to be free.",
              },
              {
                n: "03",
                title: "Individual analysis",
                body: "Tutors who diagnose the specific areas a learner struggles with. This extends naturally into SEN-aware matching.",
              },
            ].map((b) => (
              <div key={b.n} className="bg-background p-6 space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  Differentiator {b.n}
                </div>
                <div className="font-semibold text-sm">{b.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection num="03" title="Discovery and Validation">
          <p>
            The waitlist is not a vanity number. It is a live demand-validation instrument. 100+ signups
            before launch is early evidence that the relatability and affordability wedge lands with
            families.
          </p>
          <p>
            My read on the problem also comes from lived experience: I have taught coders aged 6 to 18, and
            I watched at close range how badly one-size-fits-all instruction lets down the learners who do
            not fit the default mould.
            <ConfirmTodo note="add any survey or interview numbers if available" />
          </p>
        </CaseSection>

        <CaseSection num="04" title="Product Thinking">
          <p>
            Even before launch, the operating model demands the same reasoning a PM does every day.
          </p>
          <div className="space-y-px bg-border border border-border rounded-2xl overflow-hidden mt-2">
            {[
              {
                label: "Roadmap and sequencing",
                body: "Validate willingness through the waitlist. Prove the match by hand first with a free first session. Learn what a good match really means from those early sessions. Then systematise the matching into product. The riskiest assumption (will families actually commit) gets de-risked before I spend on the expensive matching infrastructure.",
              },
              {
                label: "Two-sided market",
                body: "BeLearn is actively recruiting tutors, so I am reasoning about both sides at once: demand quality against supply liquidity, and the safeguarding and quality bar a managed model has no choice but to own.",
              },
              {
                label: "Stakeholders and compliance",
                body: "Pairing adults with children, many of them minors, forces early thinking about safeguarding, DBS-style vetting, and family data protection. That is the founder's version of the Business, Legal, and Compliance inputs a PM coordinates.",
              },
            ].map((block) => (
              <div key={block.label} className="bg-background p-6 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {block.label}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {block.body}
                  {block.label === "Stakeholders and compliance" && (
                    <ConfirmTodo note="add specific vetting and safeguarding steps defined so far" />
                  )}
                </p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection num="05" title="Sample Requirement">
          <p>
            Writing requirements is not a formality. It is how you expose what you have not thought through.
            Here is one from BeLearn:
          </p>
          <div className="rounded-2xl border border-border bg-paper overflow-hidden mt-2">
            <div className="border-b border-border px-4 py-2 bg-secondary/40">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Feature · Hand-matched tutor recommendation (v1, manual-first)
              </span>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                  User story
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 italic">
                  As a parent, I want my child matched to a tutor suited to their level, goals, learning
                  style, and cultural or linguistic needs, so that I can trust the fit without vetting tutors
                  myself.
                </p>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">
                  Acceptance criteria
                </div>
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li className="flex gap-3">
                    <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                    <span>
                      Given a completed intake covering subject, goals, schedule, and learning preferences,
                      when a match is proposed, the parent receives a tutor profile with a stated rationale
                      for why this tutor.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                    <span>A free first session can be booked before any commitment is made.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent mt-0.5 shrink-0 font-bold">·</span>
                    <span>
                      If no suitable tutor exists, the parent is told honestly and queued. No auto-assignment
                      of a poor-fit tutor.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CaseSection>

        <CaseSection num="06" title="What I Have Built So Far">
          <div className="space-y-px bg-border border border-border rounded-2xl overflow-hidden mt-2">
            {[
              {
                label: "Unit economics model",
                body: "Modelled 6 price points: LTV of £419 to £978 per student, a CAC ceiling, and 17 to 24 students needed to reach £3k MRR.",
              },
              {
                label: "Agentic AI email agent",
                body: "Built with Claude Code. It decides which schools to contact, sends and replies autonomously, and logs every action.",
              },
              {
                label: "LLM matching layer",
                body: "Prototyping a layer that pairs learners with tutors by subject, learning need and SEN requirement.",
              },
            ].map((block) => (
              <div key={block.label} className="bg-background p-6 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {block.label}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{block.body}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection num="07" title="Where It Stands">
          <p>
            Before launch, BeLearn has already shown real demand for a model the incumbents do not
            offer. The near-term priorities are clear: convert the waitlist into activated first sessions,
            instrument match quality so I can prove the hand-match beats self-serve, and turn the manual
            matching logic into something repeatable.{" "}
            <ConfirmTodo note="add any early pilot sessions, conversion figures, or tutor sign-up numbers" />
          </p>
        </CaseSection>

        <figure className="rounded-2xl border border-border bg-paper overflow-hidden">
          <img
            src={belearnFeature}
            alt="BeLearn feature section showing global relatable tutors and smart matching paired by how each learner learns best."
            className="w-full block"
            loading="lazy"
          />
          <figcaption className="px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border">
            Positioning: global, relatable tutors paired by how each learner learns best.
          </figcaption>
        </figure>

        <div className="rounded-2xl border border-border bg-paper p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Live preview
            </div>
            <div className="font-semibold">belearn.org</div>
          </div>
          <a
            href="https://belearn.org"
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
          >
            Visit site ↗
          </a>
        </div>
      </CaseStudyShell>
    </>
  );
}
