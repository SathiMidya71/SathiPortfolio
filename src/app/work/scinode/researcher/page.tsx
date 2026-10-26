import type { Metadata } from "next"
import Image from "next/image"
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
import { EvolutionFlip } from "@/components/scinode/researcher/interactive"
import { ModuleCards } from "@/components/scinode/researcher/modules"
import { Toc } from "@/components/case-study/toc"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { ResearcherHero } from "@/components/scinode/researcher/hero"
import { KeepExploring, ScinodeMap, Trail } from "@/components/scinode/wayfinding"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { meta } from "@/lib/scinode-researcher"
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
  { id: "problem", label: "Problem & objectives" },
  { id: "methods", label: "Research methods" },
  { id: "research", label: "User research" },
  { id: "competitors", label: "Competitive analysis" },
  { id: "affinity", label: "Affinity mapping" },
  { id: "empathy", label: "Empathy map" },
  { id: "personas", label: "Personas" },
  { id: "journey", label: "User journey map" },
  { id: "architecture", label: "Platform architecture" },
  { id: "modules", label: "Modules I designed" },
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
          <Trail platform="researcher" />
          <Image src="/case-studies/scinode/logo-researchers.png" alt="Scinode for Researchers by Scimplify" width={800} height={249} className="mt-8 h-12 w-auto" priority />
          <h1 className="mt-5 text-[32px] leading-[1.02] tracking-[-0.02em] text-brand md:text-[54px] md:leading-[0.98] lg:text-[64px] lg:leading-none">
            {meta.title}
            <span className="mt-3 block text-[0.5em] leading-tight text-ink/80">{meta.subtitle}</span>
          </h1>
        </header>

        <div className={`${shell} mt-8`}>
          <ResearcherHero />
        </div>

        <div className={`${shell} mt-10 lg:mt-14 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14`}>
          <aside className="hidden lg:block">
            <Toc items={sections} before={<ScinodeMap platform="researcher" />} />
          </aside>
          <article className="min-w-0">
        {/* editorial overview (Sathi's style reference) */}
        <section id="overview" className="scroll-mt-28">
          <EditorialOverview serifClass={serif.className} />
        </section>

        <EdSection id="problem" n={2} label="Problem statement & research objectives" title={["Great labs, hidden behind", "emails"]}>
          <ProblemVenn />
          <div id="objectives" className="scroll-mt-24">
            <p className="text-[16px] text-soft">Research objectives</p>
            <h3 className="mt-1 font-sans text-[23px] leading-tight font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[34px]">
              Four questions <span className={cn(serif.className, "text-ink/60 italic")}>to answer</span>
            </h3>
            <div className="mt-8">
              <Objectives />
            </div>
          </div>
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

        <EdSection id="modules" label="Modules I designed" title={["Three modules,", "one story each"]}>
          <p className="-mt-2 max-w-[640px] text-[16px] leading-snug text-body">
            Each module has its own short case study: the problem, the research behind it, the flow, a walkthrough and the decisions that shaped it.
          </p>
          <ModuleCards />
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

            <KeepExploring platform="researcher" />
          </article>
        </div>
      </main>
      <div className="mt-16">
        <SiteFooter />
      </div>
    </>
  )
}
