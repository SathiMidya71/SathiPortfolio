import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import { Toc } from "@/components/case-study/toc"
import { StepStrip } from "@/components/scinode/ecosystem"
import { FlowSkeleton, ImageBox, Lines, Placeholder, WireSection } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { areas, ecosystem, getArea, portalNames } from "@/lib/scinode"

// One SCINODE user area (e.g. the CRO portal), low-fidelity. Lists its modules, each with its own page.

type Params = { params: Promise<{ area: string }> }

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArea((await params).area)
  return a ? { title: `${a.name} · SCINODE | Sathi Midya` } : {}
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const sections = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users & research" },
  { id: "modules", label: "Modules" },
  { id: "flow", label: "End-to-end flow" },
  { id: "highlights", label: "Design highlights" },
  { id: "outcome", label: "Outcome" },
]

export default async function AreaPage({ params }: Params) {
  const a = getArea((await params).area)
  if (!a) notFound()
  const others = areas.filter((x) => x.slug !== a.slug)
  const label = a.portal === "supplier" ? `${a.name} portal` : a.name

  return (
    <>
      <SiteHeader />
      <main>
        <header className={`${shell} pt-6 md:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-body">
            <Link href="/work/scinode#map" className="inline-flex items-center gap-1.5 hover:text-brand">
              <ArrowLeft className="size-4" /> SCINODE
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span>{portalNames[a.portal]}</span>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            {a.track === "researcher" && (
              <>
                <span>Researcher</span>
                <ChevronRight className="size-3.5 text-soft" aria-hidden />
              </>
            )}
            <span className="text-ink">{a.name}</span>
          </nav>
          <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-brand uppercase">SCINODE · {portalNames[a.portal]}</p>
          <h1 className="mt-4 text-[42px] leading-[0.98] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[80px] lg:leading-none">{label}</h1>
          <p className="mt-5 max-w-[720px] text-[19px] leading-snug text-body">{a.audience}</p>
          {a.tbc && <p className="mt-4 inline-block rounded-full bg-[#ece9fd] px-3 py-1 text-[12px] font-bold text-[#5b4fd1]">CONTENT TO COME</p>}
          <div className="mt-10 rounded-[20px] border border-line bg-white/60 p-5">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">
              Where it sits in the ecosystem: {a.steps.map((n) => `${n} ${ecosystem.steps.find((s) => s.n === n)?.title}`).join(" · ")}
            </p>
            <StepStrip lit={a.steps} />
          </div>
        </header>

        <div className={`${shell} mt-10`}>
          <ImageBox label={`Hero image: ${label}`} ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20`}>
          <aside className="hidden lg:block">
            <Toc items={sections} />
          </aside>
          <article className="min-w-0">
            <WireSection id="overview" n={1} eyebrow="Overview" title={`What the ${label} is for`}>
              <div className="grid gap-4 md:grid-cols-3">
                {["The user", "The job it does", "My role"].map((t) => (
                  <Placeholder key={t} label={t}>
                    <Lines n={2} />
                  </Placeholder>
                ))}
              </div>
            </WireSection>

            <WireSection id="users" n={2} eyebrow="Users & research" title="Who they are and what they need">
              <Placeholder label="Persona / research summary" hint="Who this user is, how they work today, and the key insights.">
                <Lines n={3} />
              </Placeholder>
            </WireSection>

            <WireSection id="modules" n={3} eyebrow="Modules" title="Modules I designed">
              <p className="text-[17px] text-body">Each module has its own case study.</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {a.modules.map((m, i) => (
                  <Link
                    key={m.slug}
                    href={`/work/scinode/${a.slug}/${m.slug}`}
                    className="group rounded-[20px] border border-line bg-white p-5 shadow-[0_18px_40px_-28px_rgba(16,24,40,0.45)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-28px_rgba(2,89,78,0.5)]"
                  >
                    <span className="flex items-start justify-between">
                      <span className="font-heading text-[30px] leading-none font-semibold text-brand/30">{String(i + 1).padStart(2, "0")}</span>
                      <ArrowUpRight className="size-5 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                    <span className="mt-4 block text-[19px] font-semibold text-ink">{m.name}</span>
                    <span className="mt-1.5 block text-[14.5px] leading-snug text-body">{m.summary}</span>
                    {m.tbc && <span className="mt-3 inline-block rounded-full bg-[#ece9fd] px-2 py-0.5 text-[10.5px] font-bold text-[#5b4fd1]">CONTENT TO COME</span>}
                  </Link>
                ))}
              </div>
            </WireSection>

            <WireSection id="flow" n={4} eyebrow="End-to-end flow" title="How the modules connect">
              <Placeholder label="End-to-end flowchart" hint={`From a matched opportunity to delivery, across the ${label} modules. Coded flowchart to come.`}>
                <FlowSkeleton n={a.modules.length > 1 ? a.modules.length + 2 : 5} />
              </Placeholder>
            </WireSection>

            <WireSection id="highlights" n={5} eyebrow="Design highlights" title="Design highlights">
              <div className="grid gap-6">
                <ImageBox label="Key screen" ratio="16 / 9" />
                <Placeholder label="Pointers (XYZ format)" hint="Accomplished [X] as measured by [Y], by doing [Z]. Real figures only.">
                  <Lines n={3} />
                </Placeholder>
              </div>
            </WireSection>

            <WireSection id="outcome" n={6} eyebrow="Outcome" title="Outcome">
              <Placeholder label="Outcome" hint="Real results only, or scope facts.">
                <Lines n={2} />
              </Placeholder>
            </WireSection>

            <section className="mt-20 border-t border-line pt-14">
              <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">More from SCINODE</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {others.map((o) => (
                  <Link key={o.slug} href={`/work/scinode/${o.slug}`} className="group rounded-[16px] border border-line bg-white p-4 transition-transform hover:-translate-y-0.5">
                    <span className="text-[11px] font-bold tracking-[0.12em] text-soft uppercase">{portalNames[o.portal]}</span>
                    <span className="mt-1 flex items-start justify-between gap-2 text-[17px] font-semibold text-ink">
                      {o.name}
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/work/scinode#map" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-brand">
                <ArrowLeft className="size-4" /> Back to the SCINODE ecosystem map
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
