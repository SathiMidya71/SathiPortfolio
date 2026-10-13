import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import {
  Affinity,
  Architecture,
  ColourStudy,
  Competitors,
  Empathy,
  JourneyMap,
  MethodArcs,
  EditorialOverview,
  Objectives,
  Personas,
  ProblemVenn,
  ResearchQuotes,
  Targets,
  Upcoming,
  UserNeeds,
} from "@/components/scinode/researcher/diagrams"
import { serif } from "@/components/scinode/researcher/fonts"
import { EvolutionFlip, PilotPlantToggle } from "@/components/scinode/researcher/interactive"
import { Toc } from "@/components/case-study/toc"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { ImageBox } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { decisions, meta } from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// Scinode for Researchers: one research-led UX case study for CROs and scientists. Visual first, very little
// text, editorial section headers (Sathi's style references) in the content column beside the TOC. CROs and scientists share every use case; only the profile differs (shown once, in Personas and in the
// platform architecture). Sources and publishing rules: src/lib/scinode-researcher.ts.

export const metadata: Metadata = {
  title: "Scinode for Researchers | UX Case Study for CROs & Scientists | Sathi Midya",
  description:
    "UX case study: interviews, competitive analysis, affinity and empathy maps, personas, a journey map and platform architecture behind Scinode for Researchers, one R&D platform for CROs and scientists.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem statement" },
  { id: "objectives", label: "Research objectives" },
  { id: "methods", label: "Research methods" },
  { id: "research", label: "User research" },
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
        </header>

        <div className={`${shell} mt-12`}>
          <ImageBox label="Hero image: Scinode for Researchers" ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16`}>
          <aside className="hidden lg:block">
            <Toc items={sections} />
          </aside>
          <article className="min-w-0">
        {/* editorial overview (Sathi's style reference) */}
        <section id="overview" className="scroll-mt-28">
          <EditorialOverview serifClass={serif.className} />
        </section>

        <EdSection id="problem" n={2} label="Problem statement" title={["Great labs, hidden behind", "emails"]}>
          <ProblemVenn />
        </EdSection>

        <EdSection id="objectives" n={3} label="Research objectives" title={["Four questions", "to answer"]}>
          <Objectives />
        </EdSection>

        <EdSection id="methods" n={4} label="Research methods" title={["Seven research", "methods"]}>
          <MethodArcs />
        </EdSection>

        <EdSection id="research" n={5} label="User research" title={["Understand", "user needs"]}>
          <UserNeeds />
          <ResearchQuotes serifClass={serif.className} />
        </EdSection>

        <EdSection id="competitors" n={6} label="Competitive analysis" title={["Where others", "fall short"]}>
          <Competitors />
        </EdSection>

        <EdSection id="affinity" n={7} label="Affinity mapping" title={["What we heard,", "grouped"]}>
          <Affinity />
        </EdSection>

        <EdSection id="empathy" n={8} label="Empathy map" title={["Inside a", "researcher's mind"]}>
          <Empathy />
        </EdSection>

        <EdSection id="personas" n={9} label="Personas" title={["Meet the CRO and", "the scientist"]}>
          <Personas />
        </EdSection>

        <EdSection id="journey" n={10} label="User journey map" title={["From discovery", "to delivery"]}>
          <JourneyMap />
        </EdSection>

        <EdSection id="architecture" n={11} label="Platform architecture" title={["One flow,", "two profiles"]}>
          <Architecture />
        </EdSection>

        <EdSection id="design" n={12} label="Key design decisions" title={["Where research became", "interface"]}>
          <div className="grid gap-16">
            {decisions.map((d, i) => (
              <div key={d.title} className="grid gap-5">
                <div className="flex items-start gap-4">
                  <span className="font-heading text-[44px] leading-none font-semibold text-brand/20">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-sans text-[26px] leading-tight text-[#1d1d1f] md:text-[30px]">{d.title}</h3>
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
        </EdSection>

        <EdSection id="visual" n={13} label="Visual direction" title={["Standing out in a", "sea of blue"]}>
          <ColourStudy />
        </EdSection>

        <EdSection id="outcome" n={14} label="Outcome" title={["What we're", "measuring"]}>
          <Targets />
        </EdSection>

        <EdSection id="evolution" n={15} label="How it evolved" title={["From first concept", "to shipped"]}>
          <EvolutionFlip />
        </EdSection>

        <EdSection id="next" n={16} label="What's next" title={["Coming", "next"]}>
          <Upcoming />
        </EdSection>

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
