import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, ChevronRight } from "lucide-react"
import { BlockView } from "@/components/case-study/blocks"
import { Toc } from "@/components/case-study/toc"
import {
  AccessGate,
  Affinity,
  ColourStudy,
  CompetitorMatrix,
  CroOnboarding,
  Iterations,
  JourneyMapBoard,
  LabWorkflow,
  Market,
  Methods,
  ModuleMap,
  Objectives,
  Opportunities,
  PainToDesign,
  Patterns,
  ProposalFlow,
  ScientistProfile,
  ScientistStepper,
  Synthesis,
  Targets,
  Themes,
  TrustSignals,
  Upcoming,
} from "@/components/scinode/researcher/diagrams"
import { ForUser, JourneyView, PersonaView, PilotPlantToggle, UserProvider, UserSwitch, UserTag } from "@/components/scinode/researcher/user-switch"
import { ImageBox, Placeholder, WireSection } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { empathy, glance, highlights, meta, problem, quotes, screens } from "@/lib/scinode-researcher"

// Scinode for Researchers: ONE research-led UX case study for both user types (CRO and scientist).
// Story: problem → objectives → methods → qualitative → quantitative → benchmarking → affinity → empathy →
// personas → journeys → IA → insights to design → iterations → key design decisions → visual → outcome.
// A CRO / Scientist switch changes the persona, the module journey and the onboarding visuals.
// Sources and rules: see src/lib/scinode-researcher.ts.

export const metadata: Metadata = {
  title: "Scinode for Researchers | UX Case Study (CRO & Scientist) | Sathi Midya",
  description:
    "Research-led UX case study: qualitative interviews, competitive benchmarking, affinity and empathy maps, personas and journeys that shaped Scinode for Researchers, an R&D platform for CROs and scientists.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const label = "mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem statement" },
  { id: "objectives", label: "Research objectives" },
  { id: "methods", label: "Research methods" },
  { id: "qualitative", label: "Qualitative research" },
  { id: "quantitative", label: "Quantitative research" },
  { id: "benchmarking", label: "Competitive benchmarking" },
  { id: "affinity", label: "Affinity mapping" },
  { id: "empathy", label: "Empathy map" },
  { id: "personas", label: "Personas" },
  { id: "journey", label: "User journey" },
  { id: "architecture", label: "Information architecture" },
  { id: "insights", label: "Insights to design" },
  { id: "iterations", label: "Iterations" },
  { id: "design", label: "Key design decisions" },
  { id: "visual", label: "Visual direction" },
  { id: "outcome", label: "Outcome" },
  { id: "screens", label: "Key screens" },
  { id: "next", label: "What's next" },
]

function Sub({ title, text }: { title: string; text?: string }) {
  return (
    <div>
      <h3 className="font-heading text-[24px] leading-tight font-semibold text-ink md:text-[28px]">{title}</h3>
      {text && <p className="mt-2 max-w-[720px] text-[16px] leading-relaxed text-body">{text}</p>}
    </div>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[740px] text-[17px] leading-relaxed text-body">{children}</p>
}

export default function ResearcherPage() {
  return (
    <UserProvider>
      <SiteHeader />
      <main style={{ "--tone-purple": "#B79CEC", "--tone-purple-ink": "#6B4CB8", "--accent-purple": "#F1EBFC", "--on-purple": "#2B2150", "--tone-orange": "#1F392D" } as React.CSSProperties}>
        <header className={`${shell} pt-6 md:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-body">
            <Link href="/work/scinode#map" className="inline-flex items-center gap-1.5 hover:text-brand">
              <ArrowLeft className="size-4" /> SCINODE
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span>Supplier portal</span>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span className="text-ink">Researcher sign-up</span>
          </nav>
          <Image src="/case-studies/scinode/logo-researchers.png" alt="Scinode for Researchers by Scimplify" width={800} height={249} className="mt-10 h-14 w-auto" priority />
          <h1 className="mt-6 text-[42px] leading-[0.98] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[80px] lg:leading-none">
            {meta.title}
            <span className="mt-3 block text-[0.5em] leading-tight text-ink/80">{meta.subtitle}</span>
          </h1>
          <dl className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-[minmax(0,420px)_1fr_1fr_1fr] lg:gap-10">
            <div>
              <dt className={label}>Overview</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{meta.overview}</dd>
            </div>
            <div>
              <dt className={label}>My role</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{meta.role}</dd>
            </div>
            <div>
              <dt className={label}>Team</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#ece9fd] px-1 text-[#5b4fd1]">Placeholder</span> PM, engineering
              </dd>
            </div>
            <div>
              <dt className={label}>Timeline</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{meta.timeline}</dd>
            </div>
          </dl>
          <div className="mt-10">
            <UserSwitch />
          </div>
        </header>

        <div className={`${shell} mt-10`}>
          <ImageBox label="Hero image: Scinode for Researchers" ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16`}>
          <aside className="hidden lg:block">
            <Toc items={sections} />
          </aside>
          <article className="min-w-0">
            <WireSection id="overview" n={1} eyebrow="Overview" title="One platform for two kinds of researchers">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
                {glance.map((g) => (
                  <li key={g.label}>
                    <p className="font-heading text-[44px] leading-none font-semibold text-brand md:text-[52px]">{g.value}</p>
                    <p className="mt-2 text-[14.5px] text-body">{g.label}</p>
                  </li>
                ))}
              </ul>
              <div>
                <h3 className="text-[13px] font-semibold tracking-[0.12em] text-soft uppercase">Highlights</h3>
                <ul className="mt-4 grid gap-3.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[16.5px] leading-snug text-ink">
                      <Check className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={2.4} aria-hidden />
                      <span>
                        {h.split("[result needed]").map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="rounded bg-[#ece9fd] px-1 text-[0.9em] font-semibold text-[#5b4fd1]">[result needed]</span>}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </WireSection>

            <WireSection id="problem" n={2} eyebrow="Problem statement" title="Researchers signed up, but never became active">
              <BlockView block={problem} />
            </WireSection>

            <WireSection id="objectives" n={3} eyebrow="Research objectives" title="What I needed to learn">
              <Objectives />
            </WireSection>

            <WireSection id="methods" n={4} eyebrow="Research methods" title="How I researched it">
              <Lead>
                Qualitative interviews first, backed by desk research and benchmarking. Every answer then went through the same six steps, from raw notes to product decisions.
              </Lead>
              <Methods />
              <Synthesis />
            </WireSection>

            <WireSection id="qualitative" n={5} eyebrow="Qualitative research" title="What suppliers and buyers told us">
              <Lead>
                Two interview rounds with Scimplify&apos;s business and project teams, who work with CROs, scientists and buyers every day. Ten questions per user group: how they find work, judge fit, quote, sign NDAs, get paid and stay updated.
              </Lead>
              <BlockView block={{ type: "quotes", items: quotes }} />
              <Sub title="Six supplier themes" text="Coded answers grouped into themes, then ranked by impact." />
              <Themes />
            </WireSection>

            <WireSection id="quantitative" n={6} eyebrow="Quantitative research" title="A growing market, and who is in it">
              <Lead>Desk research sized the CRO market and defined the two sides of the platform.</Lead>
              <Market />
              <Placeholder label="Survey or analytics data" hint="Add any survey results, sign-up funnel or profile completion numbers here when available." />
            </WireSection>

            <WireSection id="benchmarking" n={7} eyebrow="Competitive benchmarking" title="10 platforms, 10 features">
              <Lead>I compared R&D marketplaces and CRO websites on what a researcher or buyer needs end to end.</Lead>
              <CompetitorMatrix />
            </WireSection>

            <WireSection id="affinity" n={8} eyebrow="Affinity mapping" title="Grouping what suppliers said">
              <Affinity />
            </WireSection>

            <WireSection id="empathy" n={9} eyebrow="Empathy map" title="Inside the supplier's head">
              <BlockView block={empathy} />
              <TrustSignals />
            </WireSection>

            <WireSection id="personas" n={10} eyebrow="Personas" title="Two user types, one sign-up">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Lead>Switch between the CRO and the scientist. Both use one platform, but bring and need different things.</Lead>
                <UserTag />
              </div>
              <PersonaView />
            </WireSection>

            <WireSection id="journey" n={11} eyebrow="User journey" title="From first touch to repeat projects">
              <Sub title="Supplier journey map" text="Five phases from research: where suppliers meet the platform, what delights them and where the opportunities are." />
              <JourneyMapBoard />
              <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
                <Sub title="Across the modules" text="The same journey through the product, with the pain point at each step and what I designed for it." />
                <UserTag />
              </div>
              <JourneyView />
            </WireSection>

            <WireSection id="architecture" n={12} eyebrow="Information architecture" title="Five modules, unlocked by trust">
              <Lead>Card sorting shaped the navigation into five modules. Verification decides what a researcher can open.</Lead>
              <ModuleMap />
              <AccessGate />
            </WireSection>

            <WireSection id="insights" n={13} eyebrow="Insights to design" title="From pain point to design">
              <PainToDesign />
            </WireSection>

            <WireSection id="iterations" n={14} eyebrow="Iterations" title="From first concept to what shipped">
              <Lead>The first concept came straight from research. Many rounds with the PM, engineering and testing reshaped it.</Lead>
              <Iterations />
            </WireSection>

            <WireSection id="design" n={15} eyebrow="Key design decisions" title="Where research became interface">
              <div className="grid gap-14">
                <div className="grid gap-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <Sub title="Onboarding that fits who you are" text="CROs land on a dashboard with one job. Scientists get five short, timed steps." />
                    <UserTag />
                  </div>
                  <ForUser
                    cro={
                      <div className="grid gap-6">
                        <CroOnboarding />
                        <PilotPlantToggle />
                      </div>
                    }
                    scientist={
                      <div className="grid gap-6">
                        <ScientistStepper />
                        <ScientistProfile />
                      </div>
                    }
                  />
                </div>
                <div className="grid gap-6">
                  <Sub title="Matched by chemistry, not by keyword" text="Suppliers only take work they can deliver, so every project shows its fit before they open the brief." />
                  <Opportunities />
                </div>
                <div className="grid gap-6">
                  <Sub title="Proposals with a status you can see" text="One tracker from invitation to won or not selected, with a clear next action at each step." />
                  <ProposalFlow />
                </div>
                <div className="grid gap-6">
                  <Sub title="One workspace for lab execution" text="Six gated stages replace email updates. At every milestone: move forward, or retry." />
                  <LabWorkflow />
                </div>
                <div className="grid gap-6">
                  <Sub title="Patterns that reduce form fatigue" />
                  <Patterns />
                </div>
              </div>
            </WireSection>

            <WireSection id="visual" n={16} eyebrow="Visual direction" title="Standing out in a sea of blue">
              <ColourStudy />
            </WireSection>

            <WireSection id="outcome" n={17} eyebrow="Outcome" title="What we're measuring">
              <Targets />
            </WireSection>

            <WireSection id="screens" n={18} eyebrow="Key screens" title="Key screens">
              <Lead>Screens to come. Each slot shows the screen that will go here.</Lead>
              <div className="grid gap-5 md:grid-cols-2">
                {screens.map((s) => (
                  <ImageBox key={s} label={s} ratio="16 / 10" />
                ))}
              </div>
            </WireSection>

            <WireSection id="next" n={19} eyebrow="What's next" title="Coming next for researchers">
              <Upcoming />
            </WireSection>

            <section className="mt-20 border-t border-line pt-14">
              <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">More from SCINODE</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { name: "Manufacturer", kind: "Supplier portal", href: "/work/scinode/manufacturer" },
                  { name: "CVP", kind: "Customer portal", href: "/work/scinode/cvp" },
                  { name: "Ecosystem map", kind: "SCINODE", href: "/work/scinode#map" },
                ].map((o) => (
                  <Link key={o.name} href={o.href} className="group rounded-[16px] border border-line bg-white p-4 transition-transform hover:-translate-y-0.5">
                    <span className="text-[11px] font-bold tracking-[0.12em] text-soft uppercase">{o.kind}</span>
                    <span className="mt-1 flex items-start justify-between gap-2 text-[17px] font-semibold text-ink">
                      {o.name}
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </UserProvider>
  )
}
