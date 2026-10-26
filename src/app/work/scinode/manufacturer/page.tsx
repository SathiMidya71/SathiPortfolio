import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Lock, Sparkles } from "lucide-react"
import { Toc } from "@/components/case-study/toc"
import { makeDiagrams } from "@/components/scinode/researcher/diagrams"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { serif } from "@/components/scinode/researcher/fonts"
import { EvolutionFlip } from "@/components/scinode/researcher/interactive"
import { KeepExploring, ScinodeMap, Trail } from "@/components/scinode/wayfinding"
import { ImageBox } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { architecture, manufacturerData, manufacturerEvolution, meta, sample } from "@/lib/scinode-manufacturer"
import { getPlatform } from "@/lib/scinode-nav"
import { cn } from "@/lib/utils"

// Scinode for Manufacturers: the same case study template as Scinode for Researchers (same sections and visuals,
// bound to the manufacturer data). Sections still on sample content carry a "Sample content" tag.

export const metadata: Metadata = {
  title: "Scinode for Manufacturers | UX Case Study | Sathi Midya",
  description:
    "UX case study: how Scinode for Manufacturers turns idle plant capacity into a steady flow of matched, global orders, from onboarding to proposals, purchase orders and order tracking.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const D = makeDiagrams(manufacturerData)

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem & objectives" },
  { id: "methods", label: "Research methods" },
  { id: "research", label: "User research" },
  { id: "competitors", label: "Competitive analysis" },
  { id: "affinity", label: "Affinity mapping" },
  { id: "empathy", label: "Empathy map" },
  { id: "personas", label: "Persona" },
  { id: "journey", label: "User journey map" },
  { id: "architecture", label: "Platform architecture" },
  { id: "modules", label: "Modules I designed" },
  { id: "visual", label: "Visual direction" },
  { id: "outcome", label: "Outcome" },
  { id: "evolution", label: "How it evolved" },
  { id: "next", label: "What's next" },
]

/** Marks a section whose content is still a sample, to be replaced with Sathi's material. */
function SampleTag({ id }: { id: string }) {
  if (!sample.has(id)) return null
  return (
    <p className="-mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FBF1D3] px-3 py-1 text-[12px] font-semibold text-[#8A6514]">
      <Sparkles className="size-3.5" aria-hidden /> Sample content, to replace
    </p>
  )
}

function ArchitectureRow() {
  return (
    <ol className="grid gap-2 md:grid-cols-7 md:gap-1.5">
      {architecture.map((s, i) => (
        <li key={s.title} className="flex flex-col md:flex-row md:items-stretch">
          <div className={cn("relative flex-1 rounded-[16px] p-3", s.locked ? "border border-dashed border-brand/35 bg-white" : "bg-[#e4f1eb]")}>
            {s.locked && <Lock className="absolute top-2.5 right-2.5 size-3 text-brand/50" aria-label="unlocks after verification" />}
            <p className="font-heading text-[11px] font-semibold text-brand/50 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-0.5 text-[14px] leading-tight font-semibold text-ink">{s.title}</p>
            <ul className="mt-1.5 grid gap-0.5">
              {s.items.map((x) => (
                <li key={x} className="text-[11.5px] leading-snug text-body">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          {i < architecture.length - 1 && <ArrowRight className="mx-auto my-1 size-3.5 shrink-0 rotate-90 text-soft md:mx-0.5 md:my-auto md:rotate-0" aria-hidden />}
        </li>
      ))}
    </ol>
  )
}

function ModuleList() {
  const p = getPlatform("manufacturer")!
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {p.modules.map((m, i) => (
        <li key={m.slug}>
          <Link href={m.href} className="group flex h-full flex-col rounded-[22px] border border-line bg-white p-4 transition-all hover:-translate-y-1 hover:border-brand/40">
            <ImageBox label={`Screen: ${m.title}`} ratio="16 / 10" />
            <div className="mt-3 flex items-start gap-3">
              <span className="font-heading text-[26px] leading-none font-semibold text-brand/25">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-[18px] leading-tight font-semibold text-ink">{m.title}</h3>
                <p className="mt-1 text-[13.5px] leading-snug text-body">{m.summary}</p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-soft group-hover:text-brand" aria-hidden />
            </div>
            <span className="mt-auto pt-3">
              {m.shared ? (
                <span className="rounded-full bg-[#F1EBFC] px-2 py-0.5 text-[11px] font-semibold text-[#4A307D]">Shared by all suppliers</span>
              ) : m.tbc ? (
                <span className="rounded-full bg-[#FBF1D3] px-2 py-0.5 text-[11px] font-semibold text-[#8A6514]">Content to come</span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function ManufacturerPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ "--tone-purple": "#B79CEC", "--tone-purple-ink": "#6B4CB8", "--accent-purple": "#F1EBFC", "--on-purple": "#2B2150", "--tone-orange": "#1F392D" } as React.CSSProperties}>
        <header className={`${shell} pt-6 md:pt-10`}>
          <Trail platform="manufacturer" />
          <Image src="/case-studies/scinode/logo-manufacturers.png" alt="Scinode for Manufacturers by Scimplify" width={800} height={249} className="mt-8 h-12 w-auto" priority />
          <h1 className="mt-5 text-[32px] leading-[1.02] tracking-[-0.02em] text-brand md:text-[54px] md:leading-[0.98] lg:text-[64px] lg:leading-none">
            {meta.title}
            <span className="mt-3 block text-[0.5em] leading-tight text-ink/80">{meta.subtitle}</span>
          </h1>
        </header>

        <div className={`${shell} mt-8`}>
          <ImageBox label="Hero image: Scinode for Manufacturers" ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-10 lg:mt-14 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14`}>
          <aside className="hidden lg:block">
            <Toc items={sections} before={<ScinodeMap platform="manufacturer" />} />
          </aside>
          <article className="min-w-0">
            <section id="overview" className="scroll-mt-28">
              <D.EditorialOverview serifClass={serif.className} />
            </section>

            <EdSection id="problem" label="Problem statement & research objectives" title={["Capacity without", "a pipeline"]}>
              <D.ProblemVenn />
              <div id="objectives" className="grid scroll-mt-24 gap-6">
                <div>
                  <p className="text-[16px] text-soft">Research objectives</p>
                  <h3 className="mt-1 font-sans text-[23px] leading-tight font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[34px]">
                    Four questions <span className={cn(serif.className, "text-ink/60 italic")}>to answer</span>
                  </h3>
                </div>
                <SampleTag id="objectives" />
                <D.Objectives />
              </div>
            </EdSection>

            <EdSection id="methods" label="Research methods" title={["How we learned", "about manufacturers"]}>
              <SampleTag id="methods" />
              <D.MethodArcs />
            </EdSection>

            <EdSection id="research" label="User research" title={["Understand", "manufacturer needs"]}>
              <D.UserNeeds />
              <D.ResearchQuotes serifClass={serif.className} />
            </EdSection>

            <EdSection id="competitors" label="Competitive analysis" title={["Where others", "fall short"]}>
              <SampleTag id="competitors" />
              <D.Competitors />
            </EdSection>

            <EdSection id="affinity" label="Affinity mapping" title={["What we heard,", "grouped"]}>
              <SampleTag id="affinity" />
              <D.Affinity />
            </EdSection>

            <EdSection id="empathy" label="Empathy map" title={["Inside a", "plant head's mind"]}>
              <SampleTag id="empathy" />
              <D.Empathy />
            </EdSection>

            <EdSection id="personas" label="Persona" title={["Meet the", "plant head"]}>
              <SampleTag id="personas" />
              <D.Personas />
            </EdSection>

            <EdSection id="journey" label="User journey map" title={["From onboarding", "to scale"]}>
              <D.JourneyMap />
            </EdSection>

            <EdSection id="architecture" label="Platform architecture" title={["From sign-up", "to shipment"]}>
              <ArchitectureRow />
            </EdSection>

            <EdSection id="modules" label="Modules I designed" title={["Three modules,", "one story each"]}>
              <ModuleList />
            </EdSection>

            <EdSection id="visual" label="Visual direction" title={["One visual language", "across Scinode"]}>
              <D.ColourStudy />
            </EdSection>

            <EdSection id="outcome" label="Outcome" title={["What the platform", "delivers"]}>
              <D.Targets />
            </EdSection>

            <EdSection id="evolution" label="How it evolved" title={["From first concept", "to shipped"]}>
              <SampleTag id="evolution" />
              <EvolutionFlip items={manufacturerEvolution} />
            </EdSection>

            <EdSection id="next" label="What's next" title={["Coming", "next"]}>
              <SampleTag id="next" />
              <D.Upcoming />
            </EdSection>

            <KeepExploring platform="manufacturer" />
          </article>
        </div>
      </main>
      <div className="mt-16">
        <SiteFooter />
      </div>
    </>
  )
}
