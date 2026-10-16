import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Toc } from "@/components/case-study/toc"
import { FlowSkeleton, ImageBox, Lines, Placeholder, WireSection } from "@/components/scinode/wire"
import { KeepExploring, ScinodeMap, Trail } from "@/components/scinode/wayfinding"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { areas, getArea, getAreaModule } from "@/lib/scinode"
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
  if (a.track === "researcher") {
    const to = ({ opportunity: "opportunities", proposal: "proposals", "project-management": "project-management" } as Record<string, string>)[m.slug]
    redirect(to ? `/work/scinode/researcher/${to}` : "/work/scinode/researcher#modules")
  }

  return (
    <>
      <SiteHeader />
      <main>
        <header className={`${shell} pt-6 md:pt-10`}>
          <Trail platform={a.slug} module={m.slug} />
          <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-brand uppercase">
            SCINODE · {a.name} {a.portal === "supplier" && !a.name.startsWith("Scinode") ? "portal" : ""}
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
            <Toc items={sections} before={<ScinodeMap platform={a.slug} module={m.slug} />} />
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

            <KeepExploring platform={a.slug} module={m.slug} />
          </article>
        </div>
      </main>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </>
  )
}
