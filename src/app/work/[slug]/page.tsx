import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { BlockView } from "@/components/case-study/blocks"
import { ImpactMetrics } from "@/components/case-study/impact-metrics"
import { MoreWork } from "@/components/case-study/more-work"
import { Toc } from "@/components/case-study/toc"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { caseStudyPages, getCaseStudy } from "@/lib/case-studies"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return caseStudyPages.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug)
  if (!cs) return {}
  return {
    title: cs.seo.title,
    description: cs.seo.description,
    openGraph: { title: cs.seo.title, description: cs.seo.description, images: [cs.hero.src] },
  }
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const label = "mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

export default async function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudy((await params).slug)
  if (!cs) notFound()

  const toc = [{ id: "impact-overview", label: cs.impactTitle ?? "Impact overview" }, ...cs.sections.map((s) => ({ id: s.id, label: s.nav }))]
  // Other case studies from the same company, shown in "More from …"
  const others = caseStudyPages.filter((c) => c.slug !== cs.slug && c.company === cs.company)

  return (
    <>
      <SiteHeader />
      <main
        style={
          cs.accent
            ? ({
                "--tone-purple": cs.accent.purple,
                "--tone-purple-ink": cs.accent.purpleInk,
                "--accent-purple": cs.accent.purpleSoft,
                "--on-purple": cs.accent.onPurple,
              } as React.CSSProperties)
            : undefined
        }
      >
        {/* ---------- Header ---------- */}
        <header className={`${shell} pt-6 md:pt-10`}>
          <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-brand">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-brand uppercase">{cs.eyebrow}</p>
          <h1 className="mt-4 text-[34px] leading-[1.02] tracking-[-0.02em] text-brand md:text-[64px] md:leading-[0.98] lg:text-[84px] lg:leading-none">
            {cs.title[0]}
            <br />
            <span className="bg-gradient-to-r from-brand to-brand/70 bg-clip-text pb-[0.06em] text-transparent">{cs.title[1]}</span>
          </h1>

          <dl className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-[minmax(0,400px)_1fr_1fr_1fr] lg:gap-10">
            <div>
              <dt className={label}>Overview</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{cs.meta.overview}</dd>
            </div>
            <div>
              <dt className={label}>My role</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{cs.meta.role}</dd>
            </div>
            <div>
              <dt className={label}>Team</dt>
              <dd>
                <div className="flex">
                  {cs.meta.team.map((m, i) => (
                    <span
                      key={m.initials}
                      title={m.label}
                      className={`grid size-10 place-items-center rounded-full border-2 border-cream text-[11px] font-bold text-white ${i ? "-ml-2" : ""} ${i === 0 ? "bg-brand" : "bg-[#182230]"}`}
                    >
                      {m.initials}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-snug text-body">{cs.meta.team.map((m) => m.label).join(" · ")}</p>
              </dd>
            </div>
            <div>
              <dt className={label}>Timeline</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{cs.meta.timeline}</dd>
            </div>
          </dl>
        </header>

        {/* ---------- Hero image ---------- */}
        <div className={`${shell} mt-12 lg:mt-16`}>
          <div
            className="relative overflow-hidden rounded-[24px]"
            style={{
              background: cs.hero.background ?? "var(--sand)",
              // Transparent cut-outs sit on the page in a 16:9 stage; full images keep their own ratio
              aspectRatio: cs.hero.background === "transparent" ? "16 / 9" : `${cs.hero.width} / ${cs.hero.height}`,
            }}
          >
            <Image
              src={cs.hero.src}
              alt={cs.hero.alt}
              fill
              priority
              sizes="(min-width: 1200px) 1120px, 100vw"
              className={cs.hero.background === "transparent" ? "object-contain" : "object-cover"}
            />
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20`}>
          <aside className="hidden lg:block">
            <Toc items={toc} />
          </aside>

          <article className="min-w-0">
            <section id="impact-overview" className="scroll-mt-28">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-ink md:text-[28px]">
                {cs.impactTitle ?? "Impact overview"}
              </h2>
              <ImpactMetrics items={cs.impact} />
            </section>

            {cs.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="mt-12 scroll-mt-28 border-t border-line pt-10 md:mt-24 md:pt-14">
                <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">
                  {String(i + 1).padStart(2, "0")} · {section.nav}
                </p>
                {section.title && (
                  <h2 className="mt-3 max-w-[760px] text-[26px] leading-[1.12] tracking-[-0.02em] text-ink md:text-[44px] md:leading-[1.08]">
                    {section.title}
                  </h2>
                )}
                <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 md:mt-8 md:gap-7">
                  {section.blocks.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {/* ---------- More work ---------- */}
            <MoreWork
              heading={cs.moreWork?.heading ?? "More case studies"}
              items={[
                ...others.map((o) => ({
                  title: o.title.join(" "),
                  meta: o.eyebrow.split(" · ").slice(1).join(" · ") || o.company,
                  summary: o.meta.overview,
                  thumbnail: o.hero,
                  href: `/work/${o.slug}`,
                })),
                ...(cs.moreWork?.items ?? []),
              ]}
            />
          </article>
        </div>
      </main>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </>
  )
}
