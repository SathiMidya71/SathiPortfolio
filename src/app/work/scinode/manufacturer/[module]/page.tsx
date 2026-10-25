import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Toc } from "@/components/case-study/toc"
import { MfgOnboardingSections, MfgOrdersSections, mfgOnboardingSections, mfgOrdersSections } from "@/components/scinode/manufacturer/module-sections"
import { serif } from "@/components/scinode/researcher/fonts"
import { KeepExploring, ScinodeMap, Trail } from "@/components/scinode/wayfinding"
import { ImageBox } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { getMfgModule, mfgModules } from "@/lib/scinode-manufacturer-modules"
import { getPlatform } from "@/lib/scinode-nav"
import { cn } from "@/lib/utils"

// A module of Scinode for Manufacturers, on the same page template as the researcher modules (header,
// module pills, hero, TOC with the case study map, sections, keep exploring). 02 Opportunities & proposals
// is the shared supplier page, so it isn't generated here.

type Params = { params: Promise<{ module: string }> }

export function generateStaticParams() {
  return mfgModules.map((m) => ({ module: m.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const m = getMfgModule((await params).module)
  return m ? { title: `${m.title} · Scinode for Manufacturers | Sathi Midya`, description: m.tagline } : {}
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"

function ModulePills({ current }: { current: string }) {
  const p = getPlatform("manufacturer")
  return (
    <nav aria-label="Modules" className="flex flex-wrap gap-2">
      {p?.modules.map((m, i) => {
        const on = m.slug === current
        return (
          <Link
            key={m.slug}
            href={m.href}
            aria-current={on ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors",
              on ? "border-brand bg-brand text-white" : "border-line bg-white text-body hover:border-brand/40 hover:text-brand"
            )}
          >
            <span className={cn("text-[11.5px]", on ? "text-white/70" : "text-soft")}>{String(i + 1).padStart(2, "0")}</span>
            {m.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default async function ManufacturerModulePage({ params }: Params) {
  const m = getMfgModule((await params).module)
  if (!m) notFound()
  const onboarding = m.slug === "profile-onboarding"

  return (
    <>
      <SiteHeader />
      <main style={{ "--tone-purple": "#B79CEC", "--tone-purple-ink": "#6B4CB8", "--accent-purple": "#F1EBFC", "--on-purple": "#2B2150", "--tone-orange": "#1F392D" } as React.CSSProperties}>
        <header className={`${shell} pt-6 md:pt-10`}>
          <Trail platform="manufacturer" module={m.slug} />
          <h1 className="mt-8 font-sans text-[38px] leading-[1.05] font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[52px] lg:text-[60px]">{m.title}</h1>
          <p className={cn(serif.className, "mt-3 max-w-[760px] text-[22px] leading-snug text-ink/60 italic md:text-[26px]")}>{m.tagline}</p>
          <div className="mt-6">
            <ModulePills current={m.slug} />
          </div>
        </header>

        <div className={`${shell} mt-8`}>
          <ImageBox label={`Hero screen: ${m.title}`} ratio="16 / 7" />
        </div>

        <div className={`${shell} mt-10 lg:mt-14 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14`}>
          <aside className="hidden lg:block">
            <Toc items={onboarding ? mfgOnboardingSections : mfgOrdersSections} before={<ScinodeMap platform="manufacturer" module={m.slug} />} />
          </aside>
          <article className="min-w-0">
            {onboarding ? <MfgOnboardingSections /> : <MfgOrdersSections />}
            <KeepExploring platform="manufacturer" module={m.slug} />
          </article>
        </div>
      </main>
      <div className="mt-16">
        <SiteFooter />
      </div>
    </>
  )
}
