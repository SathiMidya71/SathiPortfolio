import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Factory, GraduationCap, LayoutGrid, type LucideIcon } from "lucide-react"
import { BlockView } from "@/components/case-study/blocks"
import { Ecosystem } from "@/components/scinode/ecosystem"
import { ImageBox } from "@/components/scinode/wire"
import { Trail } from "@/components/scinode/wayfinding"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { EcosystemMap } from "@/components/scinode/ecosystem-map"
import { EcosystemHero } from "@/components/scinode/ecosystem-hero"
import { cn } from "@/lib/utils"
import { areas, litSteps, problem, visualLanguage } from "@/lib/scinode"

// SCINODE ecosystem page (low-fidelity architecture). The ecosystem diagram uses Sathi's real copy;
// the problem and visual language are drafted from it (to confirm); header facts are scope only.

export const metadata: Metadata = {
  title: "SCINODE R&D Opportunity Platform | Case Study | Sathi Midya",
  description: "SCINODE connects customers, a business and admin team, and suppliers in one R&D ecosystem. The modules I designed, end to end.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const label = "mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

// the parts she designed, each opening its own case study
const workCards: { eyebrow: string; title: string; text: string; icon: LucideIcon; logo?: { src: string; alt: string; h?: number }; image: string; tint: string; ink: string; href?: string; links?: { label: string; href: string }[] }[] = [
  { eyebrow: "Customer portal · module", title: "CVP", text: "The customer module I designed inside the customer portal.", icon: LayoutGrid, logo: { src: "/case-studies/scinode/logo-customers.png", alt: "Scinode by Scimplify", h: 200 }, image: "CVP image", tint: "#ece9fd", ink: "#6e62e5", href: "/work/scinode/cvp" },
  { eyebrow: "Supplier portal · sign-up", title: "Manufacturer", text: "Sign-up and portal for manufacturers who take on scale-up and production work.", icon: Factory, logo: { src: "/case-studies/scinode/logo-manufacturers.png", alt: "Scinode for Manufacturers by Scimplify" }, image: "Manufacturer image", tint: "#e4f1eb", ink: "#02594e", href: "/work/scinode/manufacturer" },
  {
    eyebrow: "Supplier portal · sign-up",
    title: "Researcher",
    text: "One sign-up and one case study for two user types: CROs that run R&D projects, and independent scientists.",
    icon: GraduationCap,
    logo: { src: "/case-studies/scinode/logo-researchers.png", alt: "Scinode for Researchers by Scimplify" },
    image: "Researcher image",
    tint: "#e4f1eb",
    ink: "#02594e",
    href: "/work/scinode/researcher",
    links: [
      { label: "CRO", href: "/work/scinode/researcher?user=cro" },
      { label: "Scientist", href: "/work/scinode/researcher?user=scientist" },
    ],
  },
]

export default function ScinodePage() {
  return (
    <>
      <SiteHeader />
      <main style={{ "--tone-purple": "#B79CEC", "--tone-purple-ink": "#6B4CB8", "--accent-purple": "#F1EBFC", "--on-purple": "#2B2150", "--tone-orange": "#1F392D" } as React.CSSProperties}>
        <header className={`${shell} pt-6 md:pt-10`}>
          <Trail />
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
                Designed the CVP module in the customer portal and the whole supplier side.
              </dd>
            </div>
            <div>
              <dt className={label}>Team</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#ece9fd] px-1 text-[#5b4fd1]">Placeholder</span> Designers, PM, engineering
              </dd>
            </div>
            <div>
              <dt className={label}>Timeline</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#ece9fd] px-1 text-[#5b4fd1]">Placeholder</span> Year · duration
              </dd>
            </div>
          </dl>
          {/* project at a glance: scope facts only */}
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 md:grid-cols-4">
            {[
              ["3", "connected portals"],
              ["6", "steps from request to delivery"],
              ["2", "supplier sign-up tracks"],
              [String(areas.length), "user areas I designed"],
            ].map(([v, l]) => (
              <li key={l}>
                <p className="font-heading text-[40px] leading-none font-semibold text-brand md:text-[48px]">{v}</p>
                <p className="mt-2 text-[14.5px] text-body">{l}</p>
              </li>
            ))}
          </ul>
        </header>

        <div className={`${shell} mt-12 lg:mt-16`}>
          <EcosystemHero />
        </div>

        {/* the problem: above the ecosystem */}
        <section id="problem" className={`${shell} mt-20 scroll-mt-24 lg:mt-28`}>
          <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">The problem</p>
          <h2 className="mt-3 max-w-[820px] text-[32px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">R&amp;D needs get stuck between request and delivery</h2>
          <div className="mt-10">
            <BlockView block={problem} />
          </div>
        </section>

        {/* how it works: one row, full width, fits one screen */}
        <section id="ecosystem" className={`${shell} mt-24 scroll-mt-24 lg:mt-32`}>
          <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">How it works</p>
          <Ecosystem highlight={litSteps} className="mt-2" />
        </section>

        {/* the clickable ecosystem map, full width */}
        <section id="map" className={`${shell} mt-24 scroll-mt-28 lg:mt-32`}>
          <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">Ecosystem map</p>
          <h2 className="mt-3 text-[32px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">What I designed, by user</h2>
          <p className="mt-4 max-w-[720px] text-[17px] leading-relaxed text-body">
            In the customer portal I designed the CVP module. On the supplier side I designed everything: suppliers sign up as a manufacturer or as a researcher (a CRO or a scientist), and each has its own case study. Click a green card to open it.
          </p>
          <div className="mt-12">
            <EcosystemMap />
          </div>
        </section>

        {/* visual language, shared with Deep Research */}
        <section id="visual-language" className={`${shell} mt-24 scroll-mt-28 lg:mt-32`}>
          <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">Visual language</p>
          <h2 className="mt-3 text-[32px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">One visual language across all portals</h2>
          <p className="mt-4 max-w-[720px] text-[17px] leading-relaxed text-body">
            SCINODE uses the same type and colours as SCINODE Deep Research, so the customer, admin and supplier portals feel like one product family.
          </p>
          <div className="mt-10 grid gap-12">
            {visualLanguage.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        </section>

        {/* the case studies she designed */}
        <section id="my-work" className={`${shell} mt-24 scroll-mt-28 lg:mt-32`}>
          <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">Case studies</p>
          <h2 className="mt-3 text-[32px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">Explore what I designed</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {workCards.map((c) => (
              <article
                key={c.title}
                className="group relative flex flex-col rounded-[22px] border border-line bg-white p-6 shadow-[0_18px_40px_-28px_rgba(16,24,40,0.45)] transition-[translate,box-shadow,border-color] duration-300 has-[a:hover]:-translate-y-1 has-[a:hover]:border-brand/40 has-[a:hover]:shadow-[0_26px_50px_-28px_rgba(2,89,78,0.5)]"
              >
                {c.logo ? (
                  <span className="flex h-11 items-center">
                    <Image src={c.logo.src} alt={c.logo.alt} width={800} height={c.logo.h ?? 249} className={cn("w-auto", c.logo.h ? "h-9" : "h-11")} />
                  </span>
                ) : (
                  <span className="grid size-11 place-items-center rounded-[13px]" style={{ background: c.tint, color: c.ink }}>
                    <c.icon className="size-5" strokeWidth={1.9} aria-hidden />
                  </span>
                )}
                {/* image placeholder until Sathi sends the card images */}
                <ImageBox label={c.image} ratio="16 / 10" className="mt-5" />
                <p className="mt-5 text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: c.ink }}>
                  {c.eyebrow}
                </p>
                <h3 className="mt-1.5 font-heading text-[26px] leading-tight font-semibold text-ink">
                  {c.href ? (
                    <Link href={c.href} className="after:absolute after:inset-0 after:rounded-[22px] focus-visible:outline-none">
                      {c.title}
                    </Link>
                  ) : (
                    c.title
                  )}
                </h3>
                <p className="mt-2 text-[15px] leading-snug text-body">{c.text}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                  {c.links ? (
                    c.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-white px-3.5 py-1.5 text-[14px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                      >
                        {l.label} <ArrowUpRight className="size-4" aria-hidden />
                      </Link>
                    ))
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                      View case study <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </>
  )
}

