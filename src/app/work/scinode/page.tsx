import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Toc } from "@/components/case-study/toc"
import { Ecosystem } from "@/components/scinode/ecosystem"
import { ImageBox, Lines, Placeholder, WireSection } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { portalNames, scinodeModules, teamModules, type PortalKey } from "@/lib/scinode"

// SCINODE ecosystem page (low-fidelity architecture). The ecosystem diagram uses Sathi's real copy;
// every other section is a placeholder until she sends content.

export const metadata: Metadata = {
  title: "SCINODE R&D Opportunity Platform | Case Study | Sathi Midya",
  description: "SCINODE connects customers, a business and admin team, and suppliers in one R&D ecosystem. The modules I designed, end to end.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const label = "mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"
const lit = [...new Set(scinodeModules.flatMap((m) => m.steps))]

const sections = [
  { id: "glance", label: "Project at a glance" },
  { id: "problem", label: "The problem" },
  { id: "ecosystem", label: "How it works" },
  { id: "role", label: "My role" },
  { id: "modules", label: "Modules I designed" },
  { id: "design-system", label: "Design system" },
  { id: "learnings", label: "Learnings" },
]

const portalOrder: PortalKey[] = ["customer", "admin", "supplier", "internal"]

export default function ScinodePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <header className={`${shell} pt-6 md:pt-10`}>
          <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-brand">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-brand uppercase">Scimplify · R&amp;D opportunity platform</p>
          <h1 className="mt-4 text-[42px] leading-[0.98] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[84px] lg:leading-none">
            SCINODE
            <br />
            <span className="bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">one ecosystem, three portals</span>
          </h1>
          <dl className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-[minmax(0,400px)_1fr_1fr_1fr] lg:gap-10">
            <div>
              <dt className={label}>Overview</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                SCINODE connects customers with R&amp;D needs, the Scimplify business and admin team, and suppliers who can deliver, in one platform.
              </dd>
            </div>
            <div>
              <dt className={label}>My role</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#fff1e6] px-1 text-[#b8461a]">Placeholder</span> Role title and the modules I owned end to end.
              </dd>
            </div>
            <div>
              <dt className={label}>Team</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#fff1e6] px-1 text-[#b8461a]">Placeholder</span> Designers, PM, engineering
              </dd>
            </div>
            <div>
              <dt className={label}>Timeline</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#fff1e6] px-1 text-[#b8461a]">Placeholder</span> Year · duration
              </dd>
            </div>
          </dl>
        </header>

        <div className={`${shell} mt-12 lg:mt-16`}>
          <ImageBox label="Hero image: SCINODE across its three portals" ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20`}>
          <aside className="hidden lg:block">
            <Toc items={sections} />
          </aside>
          <article className="min-w-0">
            <WireSection id="glance" n={1} eyebrow="Project at a glance" title="Project at a glance">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  ["3", "connected portals"],
                  ["6", "steps from request to delivery"],
                  [String(scinodeModules.length), "modules I designed"],
                  ["?", "placeholder fact"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-[18px] border-2 border-dashed border-[#d6cbb9] bg-white/50 p-5">
                    <p className="font-heading text-[40px] leading-none font-semibold text-brand">{v}</p>
                    <p className="mt-2 text-[14px] text-soft">{l}</p>
                  </div>
                ))}
              </div>
            </WireSection>

            <WireSection id="problem" n={2} eyebrow="The problem" title="Why R&D sourcing is slow">
              <Placeholder label="Problem statement" hint="Why finding and working with the right R&D partner is hard today: unclear needs, scattered suppliers, conversations lost between email and calls.">
                <Lines n={4} />
              </Placeholder>
            </WireSection>

            <WireSection id="ecosystem" n={3} eyebrow="How it works" title="How the ecosystem works">
              <Ecosystem highlight={lit} />
            </WireSection>

            <WireSection id="role" n={4} eyebrow="My role" title="My part of the ecosystem">
              <Placeholder label="My role" hint="One honest line: I designed these modules end to end; the other modules were designed by teammates.">
                <Lines n={2} />
              </Placeholder>
            </WireSection>

            <WireSection id="modules" n={5} eyebrow="Modules I designed" title="Modules I designed">
              <p className="text-[17px] text-body">Green modules open their own page. Grey ones were designed by teammates and are shown for context.</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {portalOrder.map((pk) => {
                  const mine = scinodeModules.filter((m) => m.portal === pk)
                  const team = teamModules.filter((m) => m.portal === pk)
                  return (
                    <div key={pk} className="rounded-[20px] border-2 border-dashed border-[#d6cbb9] p-4">
                      <p className="text-[11.5px] font-bold tracking-[0.14em] text-soft uppercase">{portalNames[pk]}</p>
                      <div className="mt-3 grid gap-3">
                        {mine.map((m) => (
                          <Link
                            key={m.slug}
                            href={`/work/scinode/${m.slug}`}
                            className="group rounded-[14px] border-2 border-brand bg-[#e4f1eb] p-3.5 transition-transform hover:-translate-y-0.5"
                          >
                            <span className="flex items-start justify-between gap-2 text-[15px] font-semibold text-brand">
                              {m.name}
                              <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                            </span>
                            <span className="mt-1 block text-[12.5px] text-body">Steps {m.steps.join(", ")}</span>
                            {m.tbc && <span className="mt-1.5 inline-block rounded-full bg-[#fff1e6] px-2 py-0.5 text-[10.5px] font-bold text-[#b8461a]">TO CONFIRM</span>}
                          </Link>
                        ))}
                        {team.map((m) => (
                          <span key={m.name} className="rounded-[14px] border border-line bg-white/40 p-3.5 text-[14px] text-[#9aa3a1]">
                            {m.name}
                            <span className="mt-1 block text-[12px]">Designed by teammates</span>
                          </span>
                        ))}
                        {mine.length + team.length === 0 && <span className="text-[13px] text-soft">None yet</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </WireSection>

            <WireSection id="design-system" n={6} eyebrow="Design system" title="One visual language across all portals">
              <div className="grid gap-4 md:grid-cols-3">
                {["Typography", "Colour", "Components"].map((t) => (
                  <Placeholder key={t} label={t} className="min-h-[160px]">
                    <Lines n={2} />
                  </Placeholder>
                ))}
              </div>
            </WireSection>

            <WireSection id="learnings" n={7} eyebrow="Learnings" title="What I learned">
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <Placeholder key={i} label={`Learning ${i}`} hint={i === 1 ? "Designing one part of a connected system: hand-offs between portals and shared states." : undefined}>
                    <Lines n={2} />
                  </Placeholder>
                ))}
              </div>
            </WireSection>
          </article>
        </div>
      </main>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </>
  )
}

