import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ImageBox } from "@/components/scinode/wire"
import { modules, type ResearcherModule } from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// The "Modules I designed" layer of Scinode for Researchers: cards on the main page, and the pieces every
// module page shares (module switcher, draft flow).

export const moduleHref = (slug: string) => `/work/scinode/researcher/${slug}`
const nn = (i: number) => String(i + 1).padStart(2, "0")

/** Four clickable module cards on the main case study. */
export function ModuleCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {modules.map((m, i) => (
        <li key={m.slug}>
          <Link
            href={moduleHref(m.slug)}
            className="group flex h-full flex-col rounded-[24px] border border-line bg-white p-4 shadow-[0_18px_40px_-32px_rgba(16,24,40,0.5)] transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_26px_50px_-30px_rgba(2,89,78,0.45)] md:p-5"
          >
            {m.hero ? (
              <span className="relative block aspect-[16/9] overflow-hidden rounded-[14px]">
                <Image src={m.hero.src} alt="" fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </span>
            ) : (
              <ImageBox label={`Screen: ${m.title}`} ratio="16 / 9" />
            )}
            <div className="mt-4 flex items-start gap-3">
              <span className="font-heading text-[30px] leading-none font-semibold text-brand/25">{nn(i)}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-[21px] leading-tight font-semibold text-ink">{m.title}</h3>
                <p className="mt-1 text-[14.5px] leading-snug text-body">{m.tagline}</p>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e4f1eb] text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>
            <p className="mt-auto pt-4 text-[13px] font-semibold text-brand">
              Explore the module <ArrowRight className="inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Numbered switcher between the four modules (current one filled). */
export function ModuleSwitcher({ current }: { current: string }) {
  return (
    <nav aria-label="Modules" className="flex flex-wrap gap-2">
      {modules.map((m, i) => {
        const on = m.slug === current
        return (
          <Link
            key={m.slug}
            href={moduleHref(m.slug)}
            aria-current={on ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13.5px] font-semibold transition-colors",
              on ? "border-brand bg-brand text-white" : "border-line bg-white text-body hover:border-brand/40 hover:text-brand"
            )}
          >
            <span className={cn("text-[11.5px]", on ? "text-white/70" : "text-soft")}>{nn(i)}</span>
            {m.title}
          </Link>
        )
      })}
    </nav>
  )
}

/** The module's flow as connected steps; questions (ending in "?") render as decision diamonds. */
export function ModuleFlow({ m }: { m: ResearcherModule }) {
  return (
    <div>
      <ol className="flex flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center">
        {m.steps.map((s, i) => {
          const decision = s.endsWith("?")
          const first = i === 0
          return (
            <li key={s} className="flex flex-col items-center gap-3 md:flex-row">
              {decision ? (
                <span className="grid size-[104px] shrink-0 place-items-center">
                  <span className="grid size-[74px] rotate-45 place-items-center rounded-[10px] border border-[#6b7f7c]/55 bg-[#f2ece3]">
                    <span className="-rotate-45 px-1 text-center text-[12px] leading-tight font-semibold text-ink">{s}</span>
                  </span>
                </span>
              ) : (
                <span
                  className={cn(
                    "rounded-[16px] px-4 py-3 text-center text-[14px] leading-snug font-semibold md:max-w-[170px]",
                    first ? "rounded-full bg-brand text-white" : "border border-brand/30 bg-white text-ink"
                  )}
                >
                  {s}
                </span>
              )}
              {i < m.steps.length - 1 && <ArrowRight className="size-4 shrink-0 rotate-90 text-brand md:rotate-0" aria-hidden />}
            </li>
          )
        })}
      </ol>
      <p className="mt-4 inline-block rounded-full bg-[#ece9fd] px-3 py-1 text-[12px] font-semibold text-[#5b4fd1]">Draft flow, to confirm: detailed flowchart to come</p>
    </div>
  )
}
