import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import { Toc } from "@/components/case-study/toc"
import {
  Affinity,
  Architecture,
  ColourStudy,
  Competitors,
  Empathy,
  Insights,
  JourneyMap,
  Methods,
  Metrics,
  Objectives,
  Personas,
  Problems,
  Targets,
  Upcoming,
} from "@/components/scinode/researcher/diagrams"
import { EvolutionFlip, PilotPlantToggle } from "@/components/scinode/researcher/interactive"
import { ImageBox, WireSection } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { decisions, meta } from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// Scinode for Researchers: one research-led UX case study for CROs and scientists. Visual first, very little
// text. CROs and scientists share every use case; only the profile differs (shown once, in Personas and in the
// platform architecture). Sources and publishing rules: src/lib/scinode-researcher.ts.

export const metadata: Metadata = {
  title: "Scinode for Researchers | UX Case Study for CROs & Scientists | Sathi Midya",
  description:
    "UX case study: interviews, competitive analysis, affinity and empathy maps, personas, a journey map and platform architecture behind Scinode for Researchers, one R&D platform for CROs and scientists.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const label = "mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem statement" },
  { id: "objectives", label: "Research objectives" },
  { id: "methods", label: "Research methods" },
  { id: "insights", label: "What they told us" },
  { id: "competitors", label: "Competitive analysis" },
  { id: "affinity", label: "Affinity mapping" },
  { id: "empathy", label: "Empathy map" },
  { id: "personas", label: "Personas" },
  { id: "journey", label: "User journey map" },
  { id: "architecture", label: "Platform architecture" },
  { id: "design", label: "Key design decisions" },
  { id: "visual", label: "Visual direction" },
  { id: "outcome", label: "Outcome" },
  { id: "evolution", label: "How it evolved" },
  { id: "next", label: "What's next" },
]

export default function ResearcherPage() {
  return (
    <>
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
        </header>

        <div className={`${shell} mt-12`}>
          <ImageBox label="Hero image: Scinode for Researchers" ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16`}>
          <aside className="hidden lg:block">
            <Toc items={sections} />
          </aside>
          <article className="min-w-0">
            <WireSection id="overview" n={1} eyebrow="Overview" title="One R&D platform for CROs and scientists">
              <Metrics />
            </WireSection>

            <WireSection id="problem" n={2} eyebrow="Problem statement" title="Great labs, hidden behind emails">
              <Problems />
            </WireSection>

            <WireSection id="objectives" n={3} eyebrow="Research objectives" title="Four questions to answer">
              <Objectives />
            </WireSection>

            <WireSection id="methods" n={4} eyebrow="Research methods" title="Seven research methods">
              <Methods />
            </WireSection>

            <WireSection id="insights" n={5} eyebrow="Qualitative research" title="What CROs and scientists told us">
              <Insights />
            </WireSection>

            <WireSection id="competitors" n={6} eyebrow="Competitive analysis" title="Where other platforms fall short">
              <Competitors />
            </WireSection>

            <WireSection id="affinity" n={7} eyebrow="Affinity mapping" title="What we heard, grouped">
              <Affinity />
            </WireSection>

            <WireSection id="empathy" n={8} eyebrow="Empathy map" title="Inside a researcher's mind">
              <Empathy />
            </WireSection>

            <WireSection id="personas" n={9} eyebrow="Personas" title="Meet the CRO and the scientist">
              <Personas />
            </WireSection>

            <WireSection id="journey" n={10} eyebrow="User journey map" title="From discovery to delivery">
              <JourneyMap />
            </WireSection>

            <WireSection id="architecture" n={11} eyebrow="Platform architecture" title="One flow, two profiles">
              <Architecture />
            </WireSection>

            <WireSection id="design" n={12} eyebrow="Key design decisions" title="Where research became interface">
              <div className="grid gap-14">
                {decisions.map((d, i) => (
                  <div key={d.title} className="grid gap-5">
                    <div className="flex items-start gap-4">
                      <span className="font-heading text-[44px] leading-none font-semibold text-brand/20">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-heading text-[26px] leading-tight font-semibold text-ink md:text-[30px]">{d.title}</h3>
                        <p className="mt-1.5 max-w-[640px] text-[16px] leading-snug text-body">{d.text}</p>
                      </div>
                    </div>
                    <div className={cn("grid gap-5", i === 1 && "lg:grid-cols-2")}>
                      {i === 1 && <PilotPlantToggle />}
                      <ImageBox label={`Screen: ${d.title}`} ratio="16 / 10" />
                    </div>
                  </div>
                ))}
              </div>
            </WireSection>

            <WireSection id="visual" n={13} eyebrow="Visual direction" title="Standing out in a sea of blue">
              <ColourStudy />
            </WireSection>

            <WireSection id="outcome" n={14} eyebrow="Outcome" title="What we're measuring">
              <Targets />
            </WireSection>

            <WireSection id="evolution" n={15} eyebrow="How it evolved" title="From first concept to shipped">
              <EvolutionFlip />
            </WireSection>

            <WireSection id="next" n={16} eyebrow="What's next" title="Coming next">
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
    </>
  )
}
