import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import { Toc } from "@/components/case-study/toc"
import { StepStrip } from "@/components/scinode/ecosystem"
import { FlowSkeleton, ImageBox, Lines, Placeholder, WireSection } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { ecosystem, getScinodeModule, portalNames, scinodeModules } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// One SCINODE module page (low-fidelity). Same structure for every module; content to come from Sathi.

type Params = { params: Promise<{ module: string }> }

export function generateStaticParams() {
  return scinodeModules.map((m) => ({ module: m.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const m = getScinodeModule((await params).module)
  return m ? { title: `${m.name} · SCINODE | Sathi Midya` } : {}
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem & research" },
  { id: "workflow", label: "Workflow" },
  { id: "screens", label: "Key screens" },
  { id: "decisions", label: "Decisions" },
  { id: "outcome", label: "Outcome" },
]

export default async function ModulePage({ params }: Params) {
  const m = getScinodeModule((await params).module)
  if (!m) notFound()
  const others = scinodeModules.filter((x) => x.slug !== m.slug)
  const stepNames = m.steps.map((n) => `${n} ${ecosystem.steps.find((s) => s.n === n)?.title}`)

  return (
    <>
      <SiteHeader />
      <main>
        <header className={`${shell} pt-6 md:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-body">
            <Link href="/work/scinode" className="inline-flex items-center gap-1.5 hover:text-brand">
              <ArrowLeft className="size-4" /> SCINODE
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span>{portalNames[m.portal]}</span>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span className="text-ink">{m.name}</span>
          </nav>
          <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-brand uppercase">SCINODE · {portalNames[m.portal]}</p>
          <h1 className="mt-4 text-[42px] leading-[0.98] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[76px] lg:leading-none">{m.name}</h1>
          {m.tbc && (
            <p className="mt-4 inline-block rounded-full bg-[#fff1e6] px-3 py-1 text-[12px] font-bold text-[#b8461a]">
              TO CONFIRM: module name, portal and the steps it covers
            </p>
          )}

          {/* where it lives */}
          <div className="mt-10 rounded-[20px] border border-line bg-white/60 p-5">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">Where it sits in the ecosystem: {stepNames.join(" · ")}</p>
            <StepStrip lit={m.steps} />
          </div>
        </header>

        <div className={`${shell} mt-10`}>
          <ImageBox label={`Hero image: ${m.name}`} ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20`}>
          <aside className="hidden lg:block">
            <Toc items={sections} />
          </aside>
          <article className="min-w-0">
            <WireSection id="overview" n={1} eyebrow="Overview" title="Who it is for and what it does">
              <div className="grid gap-4 md:grid-cols-3">
                {["Users", "The job it does", "My role"].map((t) => (
                  <Placeholder key={t} label={t}>
                    <Lines n={2} />
                  </Placeholder>
                ))}
              </div>
            </WireSection>

            <WireSection id="problem" n={2} eyebrow="Problem & research" title="What was hard before">
              <Placeholder label="Problem" hint={m.summary}>
                <Lines n={3} />
              </Placeholder>
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Placeholder key={i} label={`Insight ${i}`}>
                    <Lines n={2} />
                  </Placeholder>
                ))}
              </div>
            </WireSection>

            <WireSection id="workflow" n={3} eyebrow="Workflow" title="The end-to-end workflow">
              <Placeholder label="Module flowchart" hint="From where the user enters this module to the hand-off to the next portal. Coded flowchart to come.">
                <FlowSkeleton />
              </Placeholder>
            </WireSection>

            <WireSection id="screens" n={4} eyebrow="Key screens" title="Key screens">
              {[0, 1, 2].map((i) => (
                <div key={i} className={cn("grid items-center gap-6 md:gap-10", i % 2 ? "md:grid-cols-[7fr_3fr]" : "md:grid-cols-[3fr_7fr]")}>
                  <div className={cn(i % 2 ? "md:order-2" : "")}>
                    <Placeholder label={`Screen ${i + 1} notes`}>
                      <Lines n={3} />
                    </Placeholder>
                  </div>
                  <ImageBox label={`Screen ${i + 1}`} ratio="16 / 10" className={cn(i % 2 ? "md:order-1" : "")} />
                </div>
              ))}
            </WireSection>

            <WireSection id="decisions" n={5} eyebrow="Decisions" title="Decisions and edge cases">
              <div className="grid gap-4 md:grid-cols-2">
                {["States & permissions", "Empty and error states"].map((t) => (
                  <Placeholder key={t} label={t}>
                    <Lines n={2} />
                  </Placeholder>
                ))}
              </div>
            </WireSection>

            <WireSection id="outcome" n={6} eyebrow="Outcome" title="Outcome">
              <Placeholder label="Outcome" hint="Real results only, or scope facts if there are no published numbers.">
                <Lines n={2} />
              </Placeholder>
            </WireSection>

            {/* other modules */}
            <section className="mt-20 border-t border-line pt-14">
              <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">More from SCINODE</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {others.map((o) => (
                  <Link key={o.slug} href={`/work/scinode/${o.slug}`} className="group rounded-[16px] border-2 border-brand/70 bg-[#e4f1eb] p-4 transition-transform hover:-translate-y-0.5">
                    <span className="text-[11px] font-bold tracking-[0.12em] text-soft uppercase">{portalNames[o.portal]}</span>
                    <span className="mt-1 flex items-start justify-between gap-2 text-[15px] font-semibold text-brand">
                      {o.name}
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/work/scinode#ecosystem" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-brand">
                <ArrowLeft className="size-4" /> Back to the SCINODE ecosystem
              </Link>
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
