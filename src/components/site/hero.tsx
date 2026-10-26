import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { profile } from "@/lib/content"
import { CompanyChip } from "./company-chip"
import { HeroCards } from "./hero-cards"
import { Reveal } from "./reveal"
import { Section, surface } from "./section"

export function Hero() {
  return (
    <Section>
      <Reveal>
        <Card className={`${surface} relative overflow-hidden p-6 sm:p-10`}>
          {/* Two offset dot layers + soft fade, as in the reference */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-15"
            style={{ backgroundImage: "radial-gradient(circle, rgb(156,163,175) 1.2px, transparent 1.2px)", backgroundSize: "32px 32px" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, rgb(107,114,128) 0.8px, transparent 0.8px)",
              backgroundSize: "16px 16px",
              backgroundPosition: "8px 8px",
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/10" />
          <div className="relative">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-brand">
              <span className="size-2 rounded-full bg-emerald-600 shadow-[0_0_0_3px_rgba(18,163,127,.18)]" />
              {profile.status}
            </span>

            <h1 className="text-[40px] leading-[0.98] tracking-[-0.8px] text-brand md:text-[88px] md:leading-[0.92] md:tracking-[-1.76px]">
              Hi, I&apos;m {profile.firstName}.
              <br />
              <span className="bg-gradient-to-r from-brand to-brand/70 bg-clip-text pb-[0.06em] text-transparent">
                {profile.role}.
              </span>
            </h1>

            <p className="mt-8 max-w-[791px] text-[20px] leading-[1.4] font-medium text-ink md:max-w-[1120px] md:text-[24px]">
              Product Designer turning complex B2B workflows into simple, research-backed products.
              <br className="max-md:hidden" />{" "}
              Designing R&amp;D platforms at <CompanyChip name="Scimplify" href="https://www.scimplify.com" />. Previously
              at <CompanyChip name="ABM Respiratory Care" href="https://abmrc.com/" />.
            </p>

            {/* Below lg the card fan is hidden, so show the two primary actions instead */}
            <div className="mt-6 flex flex-col gap-3 md:flex-row lg:hidden">
              <Link
                href="#work"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-base font-medium text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:w-auto"
              >
                Check out recent work <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#about"
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-brand/15 px-5 text-base font-medium text-brand transition-all hover:-translate-y-0.5 md:w-auto"
              >
                Learn more about me
              </Link>
            </div>

            <HeroCards />
          </div>
        </Card>
      </Reveal>
    </Section>
  )
}
