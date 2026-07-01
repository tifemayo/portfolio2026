import {
  CaseSection,
  CaseStudyShell,
  ConfirmTodo,
} from "../components/CaseStudyShell";
import { Seo } from "../components/Seo";
import belearnHero from "../assets/belearn-hero.png";
import belearnFeature from "../assets/belearn-feature.png";

export function WeLearnCasePage() {
  return (
    <>
      <Seo
        title="BeLearn: an inclusive tutoring marketplace · Tife Boluwatife"
        description="Case study: building BeLearn, a managed tutoring marketplace for SEN learners and underrepresented subjects. 1,100+ waitlist signups across 28 countries, pre-launch at belearn.org."
        ogTitle="BeLearn Case Study · Tife Boluwatife"
        ogDescription="The tutoring platform I wish had existed when I was teaching."
      />
      <CaseStudyShell
        fileNumber="02 / BeLearn"
        status="Pre-launch · 1,100+ waitlist"
        statusTone="muted"
        title="BeLearn: an inclusive tutoring marketplace I had to build."
        subtitle="The tutoring platform I wish had existed when I was teaching. For SEN learners, underrepresented subjects, and the families the market keeps overlooking."
        meta={[
          { label: "Role", value: "Founder & Product Lead" },
          { label: "Status", value: "Pre-launch · live at belearn.org" },
          { label: "Traction", value: "1,100+ waitlist signups across 28 countries", emphasis: true },
          {
            label: "Scope",
            value: "Discovery, two-sided PRD, brand, marketplace strategy, accessibility model",
          },
        ]}
        annotation={{
          note: "Note 02 / Why",
          quote:
            "I watched students light up when the right person explained something the right way. BeLearn is about making that match happen.",
        }}
        nextHref="/work/unifeed"
        nextLabel="01 / Unifeed"
      >
        <figure className="border border-border bg-paper overflow-hidden">
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
            Live at belearn.org. 1,100+ waitlist signups across 28 countries, before any paid acquisition.
          </figcaption>
        </figure>

        <CaseSection num="01" title="The Problem">
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
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border mt-2">
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
            The waitlist is not a vanity number. It is a live demand-validation instrument. 1,100+ signups
            from 28 countries before launch
            <ConfirmTodo note="add channel mix, e.g. organic vs paid" />
            is strong evidence that the relatability and affordability wedge lands internationally, not just
            at home.
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
          <div className="space-y-px bg-border border border-border mt-2">
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
          <div className="border border-border bg-paper overflow-hidden mt-2">
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

        <CaseSection num="06" title="Where It Stands">
          <p>
            Before launch, BeLearn has already proved international demand for a model the incumbents do not
            offer. The near-term priorities are clear: convert the waitlist into activated first sessions,
            instrument match quality so I can prove the hand-match beats self-serve, and turn the manual
            matching logic into something repeatable.{" "}
            <ConfirmTodo note="add any early pilot sessions, conversion figures, or tutor sign-up numbers" />
          </p>
        </CaseSection>

        <figure className="border border-border bg-paper overflow-hidden">
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

        <div className="border border-border bg-paper/60 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
            className="px-5 py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors"
          >
            Visit site ↗
          </a>
        </div>
      </CaseStudyShell>
    </>
  );
}
