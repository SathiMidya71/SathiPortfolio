import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight, PlayCircle } from "lucide-react"
import { Toc } from "@/components/case-study/toc"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { serif } from "@/components/scinode/researcher/fonts"
import { PilotPlantToggle } from "@/components/scinode/researcher/interactive"
import { ModuleFlow, ModuleSwitcher, moduleHref } from "@/components/scinode/researcher/modules"
import { ProjectManagementSections, pmSections } from "@/components/scinode/researcher/pm-module"
import { ImageBox, Lines, Placeholder } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { decisions, getModule, modules } from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// One module of Scinode for Researchers, as its own short case study (same template for every module):
// problem → research for this module → flow → walkthrough → key decisions → result, then back / next.
// Real content where it exists; Sathi's module research, screens, video and results are placeholders.

type Params = { params: Promise<{ module: string }> }

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const m = getModule((await params).module)
  return m ? { title: `${m.title} · Scinode for Researchers | Sathi Midya`, description: m.tagline } : {}
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const sections = [
  { id: "problem", label: "The problem" },
  { id: "research", label: "Research" },
  { id: "flow", label: "The flow" },
  { id: "walkthrough", label: "Walkthrough" },
  { id: "decisions", label: "Key decisions" },
  { id: "result", label: "Result" },
]

export default async function ResearcherModulePage({ params }: Params) {
  const slug = (await params).module
  const m = getModule(slug)
  if (!m) notFound()
  const i = modules.findIndex((x) => x.slug === slug)
  const next = modules[(i + 1) % modules.length]
  const ds = [...m.decisionIdx.map((d) => decisions[d]), ...(m.extraDecisions ?? [])]
  // modules with their own full case study; the others use the shared template below
  const custom = m.slug === "project-management"

  return (
    <>
      <SiteHeader />
      <main style={{ "--tone-purple": "#B79CEC", "--tone-purple-ink": "#6B4CB8", "--accent-purple": "#F1EBFC", "--on-purple": "#2B2150", "--tone-orange": "#1F392D" } as React.CSSProperties}>
        <header className={`${shell} pt-6 md:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-body">
            <Link href="/work/scinode#map" className="hover:text-brand">
              SCINODE
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <Link href="/work/scinode/researcher#modules" className="inline-flex items-center gap-1 hover:text-brand">
              <ArrowLeft className="size-3.5" /> Scinode for Researchers
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span className="text-ink">{m.title}</span>
          </nav>
          <p className="mt-8 text-[15px] text-soft">Module {String(i + 1).padStart(2, "0")} of {modules.length}</p>
          <h1 className="mt-1 font-sans text-[38px] leading-[1.05] font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[52px] lg:text-[60px]">
            {m.title}
          </h1>
          <p className={cn(serif.className, "mt-3 max-w-[760px] text-[22px] leading-snug text-ink/60 italic md:text-[26px]")}>{m.tagline}</p>
          <div className="mt-6">
            <ModuleSwitcher current={m.slug} />
          </div>
        </header>

        <div className={`${shell} mt-8`}>
          {m.hero ? (
            <Image src={m.hero.src} alt={m.hero.alt} width={m.hero.width} height={m.hero.height} priority sizes="(min-width: 1200px) 1120px, 100vw" className="w-full rounded-[20px] md:rounded-[28px]" />
          ) : (
            <ImageBox label={`Hero screen: ${m.title}`} ratio="16 / 7" />
          )}
        </div>

        <div className={`${shell} mt-10 lg:mt-14 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14`}>
          <aside className="hidden lg:block">
            <Toc items={custom ? pmSections : sections} />
          </aside>
          <article className="min-w-0">
            {custom ? (
              <ProjectManagementSections />
            ) : (
            <>
            <EdSection id="problem" label="The problem" title={["What wasn't", "working"]}>
              <p className="max-w-[760px] font-heading text-[24px] leading-snug font-medium text-ink md:text-[28px]">{m.problem}</p>
            </EdSection>

            <EdSection id="research" label="Research" title={["What we learned", "for this module"]}>
              <div className="grid gap-4 md:grid-cols-2">
                {m.quotes.map((q) => (
                  <figure key={q} className="border-t border-line pt-5">
                    <blockquote className={cn(serif.className, "text-[21px] leading-snug text-ink italic")}>&ldquo;{q}&rdquo;</blockquote>
                    <figcaption className="mt-2 text-[13px] text-soft">From interviews</figcaption>
                  </figure>
                ))}
              </div>
              <Placeholder label="Module UX study" hint="The research done for this module: method, who took part, key findings and what changed in the design.">
                <Lines n={3} />
              </Placeholder>
            </EdSection>

            <EdSection id="flow" label="The flow" title={["How it", "works"]}>
              <ModuleFlow m={m} />
            </EdSection>

            <EdSection id="walkthrough" label="Walkthrough" title={["See it", "in action"]}>
              <div className="relative">
                <ImageBox label={`Walkthrough video: ${m.title} (under 90 seconds)`} ratio="16 / 9" />
                <PlayCircle className="pointer-events-none absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-[130%] text-brand/30" aria-hidden />
              </div>
            </EdSection>

            <EdSection id="decisions" label="Key decisions" title={["Where research became", "interface"]}>
              <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
                {ds.map((d, k) => (
                  <div key={d.title} className="grid content-start gap-4">
                    <div className="flex items-start gap-3">
                      <span className="font-heading text-[32px] leading-none font-semibold text-brand/20">{String(k + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-sans text-[21px] leading-tight text-[#1d1d1f] md:text-[22px]">{d.title}</h3>
                        <p className="mt-1 text-[14.5px] leading-snug text-body">{d.text}</p>
                      </div>
                    </div>
                    {d.title === "A profile that adapts" && <PilotPlantToggle />}
                    <ImageBox label={`Screen: ${d.title}`} ratio="16 / 10" />
                  </div>
                ))}
                {ds.length < 3 && (
                  <Placeholder label="More decisions" hint="2–3 more decisions you're proud of in this module, each with its screen." className="self-start">
                    <Lines n={2} />
                  </Placeholder>
                )}
              </div>
            </EdSection>

            <EdSection id="result" label="Result" title={["What", "changed"]}>
              <Placeholder label="Result" hint="What changed after launch: a real figure or a clear qualitative outcome. [result needed]">
                <Lines n={2} />
              </Placeholder>
            </EdSection>

            </>
            )}

            <nav aria-label="More modules" className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
              <Link href="/work/scinode/researcher#modules" className="group rounded-[18px] border border-line bg-white p-5 transition-transform hover:-translate-y-0.5">
                <span className="text-[12px] font-bold tracking-[0.12em] text-soft uppercase">Back to</span>
                <span className="mt-1 flex items-center gap-2 text-[18px] font-semibold text-ink">
                  <ArrowLeft className="size-4" aria-hidden /> Scinode for Researchers
                </span>
              </Link>
              <Link href={moduleHref(next.slug)} className="group rounded-[18px] bg-brand p-5 text-white transition-transform hover:-translate-y-0.5 sm:text-right">
                <span className="text-[12px] font-bold tracking-[0.12em] text-white/70 uppercase">Next module</span>
                <span className="mt-1 flex items-center gap-2 text-[18px] font-semibold sm:justify-end">
                  {next.title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </nav>
          </article>
        </div>
      </main>
      <div className="mt-16">
        <SiteFooter />
      </div>
    </>
  )
}
