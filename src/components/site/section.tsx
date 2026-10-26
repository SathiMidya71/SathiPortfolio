import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("mb-10 scroll-mt-24 max-sm:mb-6", className)}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-[120px]">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string
  title: string
  aside?: React.ReactNode
}) {
  return (
    <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="mb-2 text-[19px] leading-[1.3] font-medium text-ink sm:text-2xl">{eyebrow}</p>
        <h2 className="text-[30px] leading-[1.05] tracking-[-0.6px] text-brand md:text-[48px] md:leading-none md:tracking-[-1px] lg:text-[64px] lg:leading-[62.72px]">
          {title}
        </h2>
      </div>
      {aside}
    </Reveal>
  )
}

/** Frosted white card used throughout the page. */
export const surface =
  "glass rounded-[20px] ring-0 py-0 gap-0 shadow-[0_1px_2px_rgba(16,24,40,0.03)] backdrop-blur-sm"

/** Button style overrides matching the reference (black 8px CTA, outlined pill). */
export const btnPrimary = "h-10 rounded-lg px-3.5 text-sm font-semibold"
export const btnPill =
  "h-10 rounded-full border-line bg-transparent px-5 text-base font-medium text-brand hover:bg-white hover:text-brand"
