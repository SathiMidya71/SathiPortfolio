import type { Metadata } from "next"
import { Toc } from "@/components/case-study/toc"
import { serif } from "@/components/scinode/researcher/fonts"
import { OpportunitiesSections, opSections } from "@/components/scinode/suppliers/opportunities-module"
import { KeepExploring, ScinodeMap, Trail } from "@/components/scinode/wayfinding"
import { ImageBox } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { cn } from "@/lib/utils"

// Opportunities & proposals: one module page shared by every supplier user type. It is listed under both
// Scinode for Researchers and Scinode for Manufacturers; `?from=manufacturer` keeps the reader's platform
// in the breadcrumb, case study map and "Keep exploring" (default: researchers).

export const metadata: Metadata = {
  title: "Opportunities & proposals · Scinode for Researchers & Manufacturers | Sathi Midya",
  description:
    "UX case study: the opportunity-to-purchase-order journey shared by CROs, scientists and manufacturers, with an adaptive proposal form and versioned quote negotiation.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const slug = "opportunities-proposals"

export default async function OpportunitiesProposalsPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const from = (await searchParams).from === "manufacturer" ? "manufacturer" : "researcher"
  return (
    <>
      <SiteHeader />
      <main style={{ "--tone-purple": "#B79CEC", "--tone-purple-ink": "#6B4CB8", "--accent-purple": "#F1EBFC", "--on-purple": "#2B2150", "--tone-orange": "#1F392D" } as React.CSSProperties}>
        <header className={`${shell} pt-6 md:pt-10`}>
          <Trail platform={from} module={slug} />
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F1EBFC] px-3 py-1 text-[12.5px] font-semibold text-[#4A307D]">
            Shared module · CROs, scientists and manufacturers
          </p>
          <h1 className="mt-3 font-sans text-[32px] leading-[1.08] font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[52px] md:leading-[1.05] lg:text-[60px]">
            Opportunities &amp; proposals
          </h1>
          <p className={cn(serif.className, "mt-3 max-w-[760px] text-[22px] leading-snug text-ink/60 italic md:text-[26px]")}>
            From a matched opportunity to a purchase order, with Scimplify mediating every step.
          </p>
        </header>

        <div className={`${shell} mt-8`}>
          <ImageBox label="Hero screen: Opportunities & proposals" ratio="16 / 7" />
        </div>

        <div className={`${shell} mt-10 lg:mt-14 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14`}>
          <aside className="hidden lg:block">
            <Toc items={opSections} before={<ScinodeMap platform={from} module={slug} />} />
          </aside>
          <article className="min-w-0">
            <OpportunitiesSections />
            <KeepExploring platform={from} module={slug} />
          </article>
        </div>
      </main>
      <div className="mt-16">
        <SiteFooter />
      </div>
    </>
  )
}
