# Product Case Studies · Tife Boluwatife

APM / Product Manager candidate · [tifeolusina.vercel.app](https://tifeolusina.vercel.app) · Unifeed · [BeLearn](https://belearn.org)

> **How to read this:** every number and claim here comes from real work, either the Unifeed dissertation or the live BeLearn product. A few items are tagged `[confirm]` where only I hold the figure; those get filled in before anything ships. I have kept this to what I can defend in a room, because a case study that overreaches falls apart the moment someone asks a follow-up.

---

# Case Study 1: Unifeed
### One calm, usage-aware feed for people worn down by jumping between apps

**Role:** Sole product owner, researcher, and builder
**Timeline:** 13 two-week sprints, October 2024 to May 2025
**Outcome:** Concept validated on a 75-person research base. Over 90% of defined objectives met. Roughly 50% reduction in platform-switching time in usability testing, with 4.5+/5 average satisfaction across core tasks.

## The problem
Almost nobody lives on a single social platform. The average person moves across close to seven of them, each one specialised: TikTok for short video, Instagram for visual feeds, and so on. All that switching feels harmless, but it is not. It splinters attention, quietly inflates the hours we lose, and chips away at wellbeing. The tools that look like they solve this, Hootsuite, Buffer, Sprout Social, are built for marketers scheduling posts. Not one of them is built for an ordinary person who just wants to consume content with less friction. That was the opening: the consumer side of this problem had no product speaking to it.

## The decision I would lead with
The most important call on Unifeed was not a feature. It was choosing to ship a credible proof of concept on simulated data instead of live platform APIs.

Feasibility research turned up a wall early. Instagram's Graph API and TikTok's API demand business verification, enforce strict rate limits, and lock down third-party engagement in ways a solo, unfunded project simply could not clear inside the timeline. So I had a choice. I could spend the whole project fighting for API access and risk shipping nothing, or I could build a genuinely working experience on a mock data layer designed from day one to be swapped for real APIs later.

I chose to build. The trade-off was deliberate and I can name it plainly: I gave up "real data" credibility in exchange for a product that actually worked and could be tested, which is the only way to answer the question that mattered, does a unified, usage-aware feed reduce switching and feel good to use? To protect the future, I built a service-abstraction layer so authentication, content retrieval, and platform connect and disconnect all carry over when real APIs go in. That is a scope and sequencing decision made under a hard external constraint, which is the everyday substance of the job.

## Discovery: how I found and sized the problem
I did not trust my own hunch. I triangulated.

- **Primary research**, a survey of **75 people**. The findings did more than confirm the thesis, they redrew my priorities. Two thirds reported four or more hours a day on social media, well past the roughly two-hour global average, and a striking **96% used no management tool at all**. That last number told me the existing tools were seen as irrelevant or too complicated, and it became the backbone of my market-gap argument.
- **Competitive teardown**, mapping Hootsuite, Buffer, and Sprout Social against Unifeed across seven dimensions: unified viewing, content discovery, consumer-focused UI, platform-native interactions, usage tracking, price, and analytics. The pattern was clean. Every incumbent optimised for professionals. None cared about a consumer's wellbeing.
- **Literature review**, to ground the "why this matters" in cognitive-load and task-switching research. It also surfaced an honest gap: no study quantifies the time lost specifically to platform switching. I treated that as something to measure rather than something to gloss over.

## Turning insight into a prioritised roadmap
I converted the research into a **MoSCoW-prioritised** requirement set, each with a measurable acceptance criterion rather than a vague wish:

- **Must have:** unified feed with platform indicators, authentication, profile and follow, cross-platform like and comment.
- **Should have:** platform filtering, cross-platform search.
- **Could have:** daily time tracking and goal setting, the wellbeing layer.
- **Won't have this cycle:** content scheduling and full analytics dashboards, consciously parked to protect the MVP.

Here is a moment where the data changed the plan. Time-usage tracking started life as a lowly "Could have." Once the survey showed how badly people underestimate their own usage, I promoted it to a headline differentiator, the feature that lifts Unifeed from a convenience layer into a wellbeing tool. Non-functional requirements got the same discipline: feed load under three seconds, interactions under one, WCAG 2.1 AA accessibility, over 75% test coverage.

## Execution: shipping under constraint
I ran the build as Agile Scrum adapted for a team of one. Product owner, delivery, and QA all sat with me, but I kept the ceremonies that keep a roadmap honest: two-week sprints across six phases, a Trello Kanban board holding the product and sprint backlogs, burndown tracking, weekly stakeholder reviews with my supervisor, and daily written stand-ups.

I also ran it like a delivery lead who takes risk seriously, not just a coder. I kept a probability and impact risk matrix with eight tracked risks, each carrying both a mitigation and a contingency. That planning earned its keep. When the project slipped by several weeks after some unforeseen events, the contingency I had already agreed with myself, pause the non-MVP features, meant I protected the core instead of panicking. I can also talk through the engineering trade-offs I owned, React over Angular and Vue for component reuse, MySQL over MongoDB and Firebase for relational integrity, a service layer for platform-agnostic data. The stack itself is not the point. The point is that I made reasoned build decisions and documented them well enough to defend to an engineer.

## Measurement: did it actually work?
I checked through three lenses, and I reported the misses as openly as the wins.

- **User Acceptance Testing**, five users, structured tasks scored on a five-point scale:

  | Task | Success | Satisfaction |
  |---|---|---|
  | View unified feed | 100% | 4.9 |
  | Apply platform filter | 100% | 4.6 |
  | Search users and posts | 100% | 4.4 |
  | Edit profile | 85% | 4.0 |
  | Log in | 100% | 4.9 |

  All five said they would adopt Unifeed. The 85% on profile-edit was not noise, it exposed a real defect where connections would not update without a page refresh. I fixed it by moving to optimistic updates so feedback lands instantly, then re-tested to confirm.

- **Usability testing**, ten users in five think-aloud pairs across seven tasks. This surfaced the quieter friction: unclear password rules, no confirmation after a save, a share flow that could submit empty content. Each one became a specific fix, clearer validation, media previews, proper edge-case handling.

- **The headline number, told straight.** Session time on the unified interface came in under a minute, against roughly two minutes on Instagram plus five on TikTok when used separately, which works out to about a 50% reduction in switching time. I flagged this as an estimate in the write-up, because the research gap means there is no perfectly clean baseline. Naming that honestly is the point, not hiding behind the headline.

- **Performance against targets:** LCP 1.7s against a three-second target, interaction response 600ms against one second, CLS 0.009, frame rate 38 to 46fps. And one honest miss, Total Blocking Time at 210ms against a 200ms target, which I reported rather than quietly dropping.

## Outcome and reflection
Unifeed met over 90% of its defined objectives, proved there is genuine consumer demand in a category the incumbents ignore, and left behind an architecture that is ready for real-API integration. The two unmet requirements were deliberate deferrals, scheduling and advanced analytics, not failures.

What I would do differently: I under-budgeted sprint buffer time, which is exactly why the delays stung. Next time I build slack into the plan from the first sprint, and I pressure-test the riskiest assumption, API feasibility, in week one instead of feeling its full weight halfway through the build.

---

# Case Study 2: BeLearn
### A managed, relatable tutoring service for the learners the market keeps overlooking

**Role:** Founder and product lead
**Status:** Live waitlist, pre-launch, at [belearn.org](https://belearn.org)
**Traction:** 1,100+ students and tutors on the waitlist from 28 countries, entirely before launch.

## The problem
Tutoring quietly fails the very families who need it most. The same four frustrations kept coming up. A tutor who does not really get the child, their pace, their background, their way of learning. A price that puts good tutoring out of reach. Sessions the child sits through and still leaves just as confused. And no way to find someone who understands your culture, or who can teach a home language. The model that dominates the category, a marketplace that lists tutors and lets parents guess, hands every one of those problems straight back to the parent.

## The product thesis, and the core decision
BeLearn's central bet is simple to say and hard to execute: managed, not marketplace. Rather than dropping parents in front of a search box, BeLearn owns the match. We do the matching, the family just shows up ready to learn. A hand-matched tutor, a free first session to take the risk out of fit, then ongoing sessions with progress tracked along the way.

This is a real strategic trade-off, and I hold it consciously. A marketplace scales cheaply, but it optimises for transactions. BeLearn optimises for match quality and outcomes, which is harder to scale and thinner on margin early on. I accept that, because it is the only model that actually answers the four frustrations above, and it is far more defensible once it works. Everything ladders up to one line: your potential should not be limited by your postcode, your background, or your budget.

Three differentiators fall straight out of that thesis:

- **Relatability.** Globally sourced tutors who understand a learner's world, including the cultures and home languages, African languages among them, that mainstream platforms do not serve.
- **Smart matching.** Pairing on how a student learns best, not merely on who happens to be free.
- **Individual analysis.** Tutors who diagnose the specific areas a learner struggles with, which extends naturally into SEN-aware matching.

## Discovery and validation
The waitlist is not a vanity number, it is a live demand-validation instrument. **1,100+ signups from 28 countries before launch** `[confirm channel mix, e.g. organic vs paid]` is strong evidence that the relatability and affordability wedge lands internationally, not just at home. My read on the problem also comes from lived experience: I have taught coders aged 6 to 18, and I watched at close range how badly one-size-fits-all instruction lets down the learners who do not fit the default mould. `[confirm: fold in any survey or interview numbers, or specific waitlist insights, so this section carries primary research the way Unifeed's does.]`

## Building the product thinking, not just the landing page
Even before launch, the operating model demands the same reasoning a PM does every day.

- **Roadmap and sequencing.** Validate willingness through the waitlist, prove the match by hand first with a free first session, learn what "a good match" really means from those early sessions, then systematise the matching into product. The riskiest assumption, will families actually commit, gets de-risked before I spend on the expensive matching infrastructure.
- **A two-sided market.** BeLearn is actively recruiting tutors, so I am reasoning about both sides at once: demand quality against supply liquidity, and the safeguarding and quality bar a managed model has no choice but to own.
- **Stakeholders and compliance.** Pairing adults with children, many of them minors, forces early thinking about safeguarding and DBS-style vetting and family-data protection. That is the founder's version of the Business, Legal, and Compliance inputs a PM coordinates. `[confirm the vetting and safeguarding steps you have defined so you can speak to them concretely.]`

## Sample requirement, showing I can write for engineering
> **Feature:** Hand-matched tutor recommendation, manual-first, v1
> **User story:** As a parent, I want my child matched to a tutor suited to their level, goals, learning style, and cultural or linguistic needs, so that I can trust the fit without vetting tutors myself.
> **Acceptance criteria:**
> - Given a completed intake covering subject, goals, schedule, and learning preferences, when a match is proposed, the parent receives a tutor profile with a stated rationale for why this tutor.
> - A free first session can be booked before any commitment is made.
> - If no suitable tutor exists, the parent is told honestly and queued, never auto-assigned a poor-fit tutor.

## Where it stands, and what comes next
Before launch, BeLearn has already proven international demand for a model the incumbents do not offer. The near-term product priorities are clear: convert the waitlist into activated first sessions, instrument match quality so I can prove the hand-match beats self-serve, and turn the manual matching logic into something repeatable. `[confirm any early pilot sessions, conversion figures, or tutor sign-up numbers; these would be your single strongest additions.]`

---

# How these map to a Product Manager role
Using the Goldman Sachs PWM Product Management, Associate spec as the reference bar.

| What the role asks for | Where I show it |
|---|---|
| Develop product strategy and roadmap | Unifeed's MoSCoW roadmap and data-driven re-prioritisation; BeLearn's managed-vs-marketplace thesis |
| Write user stories, requirements, acceptance criteria | Explicit, measurable requirements in Unifeed; a worked sample requirement in both |
| Drive execution, partner with Engineering and Design | 13-sprint Agile delivery, defended build trade-offs, an optimistic-update fix driven by test feedback |
| Solicit stakeholder input across Business, Legal, Compliance | Weekly stakeholder reviews; BeLearn's safeguarding and data surface |
| Leverage analytics and data | A 75-person survey that reshaped priorities; UAT, usability, and performance instrumentation |
| Break large features into components with dependencies | Six-phase sprint decomposition; a service layer built for future APIs |
| Translate complex problems into next steps | The API-constraint to mock-data scoping call |
| Monitor competition and analyse feedback | A three-tool competitive teardown; think-aloud usability synthesis |
| Business case, feasibility, product definition | Feasibility-driven scope calls; BeLearn's commercial model and positioning |
| Manage risk | An eight-risk probability and impact matrix with contingencies I actually used |

## How I am sharpening the craft
Alongside the products, I am deliberately building the formal vocabulary of the discipline. I have earned two Product School micro-certificates `[confirm exact titles, e.g. Product Management and Product Strategy]`, and I am currently working through Marty Cagan's *Inspired*, which is reshaping how I think about outcome-driven teams and the difference between shipping features and delivering value. The habit I care about most is closing the loop between what the book argues and what my own products do, so the reading turns into better decisions rather than better jargon.

**The one thing I will always be honest about:** this is real product skill and genuine end-to-end ownership, but not years of tenure inside a large product org. In any cover note I lead with the evidence and I am straight about my stage, because candour reads better than inflation, and frankly the depth of evidence here is unusual for someone early in their career.
