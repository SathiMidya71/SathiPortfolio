import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import { Toc } from "@/components/case-study/toc"
import { FlowSkeleton, ImageBox, Lines, Placeholder, WireSection } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { areas, getArea, getAreaModule, portalNames } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// One module inside a SCINODE user area (e.g. CRO › Proposal module), low-fidelity.

type Params = { params: Promise<{ area: string; module: string }> }

export function generateStaticParams() {
  return areas.flatMap((a) => a.modules.map((m) => ({ area: a.slug, module: m.slug })))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await params
  const a = getArea(p.area)
  const m = getAreaModule(p.area, p.module)
  return a && m ? { title: `${m.name} · ${a.name} · SCINODE | Sathi Midya` } : {}
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
  const p = await params
  const a = getArea(p.area)
  const m = getAreaModule(p.area, p.module)
  if (!a || !m) notFound()
  if (a.track === "researcher") redirect(`/work/scinode/researcher?user=${a.slug}#modules`)
  const siblings = a.modules.filter((x) => x.slug !== m.slug)

  return (
    <>
      <SiteHeader />
      <main>
        <header className={`${shell} pt-6 md:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-body">
            <Link href="/work/scinode#map" className="hover:text-brand">
              SCINODE
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span>{portalNames[a.portal]}</span>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <Link href={`/work/scinode/${a.slug}`} className="inline-flex items-center gap-1 hover:text-brand">
              <ArrowLeft className="size-3.5" /> {a.name}
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span className="text-ink">{m.name}</span>
          </nav>
          <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-brand uppercase">
            SCINODE · {a.name} {a.portal === "supplier" ? "portal" : ""}
          </p>
          <h1 className="mt-4 text-[42px] leading-[0.98] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[76px] lg:leading-none">{m.name}</h1>
          <p className="mt-5 max-w-[720px] text-[19px] leading-snug text-body">{m.summary}</p>
          {m.tbc && <p className="mt-4 inline-block rounded-full bg-[#ece9fd] px-3 py-1 text-[12px] font-bold text-[#5b4fd1]">CONTENT TO COME</p>}
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
              <Placeholder label="Problem">
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
              <Placeholder label="Module flowchart" hint="From where the user enters this module to the hand-off to the next step. Coded flowchart to come.">
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
              <Placeholder label="Pointers (XYZ format)" hint="Accomplished [X] as measured by [Y], by doing [Z]. Real figures only; [metric needed] where missing.">
                <Lines n={2} />
              </Placeholder>
            </WireSection>

            <section className="mt-20 border-t border-line pt-14">
              <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">More from the {a.name} {a.portal === "supplier" ? "portal" : ""}</p>
              {siblings.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {siblings.map((o) => (
                    <Link key={o.slug} href={`/work/scinode/${a.slug}/${o.slug}`} className="group rounded-[16px] border border-line bg-white p-4 transition-transform hover:-translate-y-0.5">
                      <span className="flex items-start justify-between gap-2 text-[17px] font-semibold text-ink">
                        {o.name}
                        <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-[15px] text-soft">More modules to come.</p>
              )}
              <div className="mt-8 flex flex-wrap gap-6">
                <Link href={`/work/scinode/${a.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-brand">
                  <ArrowLeft className="size-4" /> Back to {a.name}
                </Link>
                <Link href="/work/scinode#map" className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-brand">
                  <ArrowLeft className="size-4" /> SCINODE ecosystem map
                </Link>
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
