import Link from "next/link"
import { ArrowRight, ArrowUpLeft, ChevronRight, Compass, LayoutGrid, MapPin } from "lucide-react"
import { getPlatform, platforms, scinodeHome, type NavPlatform } from "@/lib/scinode-nav"
import { cn } from "@/lib/utils"

// Wayfinding for the nested SCINODE case study (Work → SCINODE → platform → module), so a reader
// always knows where they are, how they got there and what else they can open:
//   Trail          breadcrumb at the top of every page (+ "Module 2 of 4")
//   ScinodeMap     "You are here" map in the desktop sidebar, above "On this page"
//   KeepExploring  end-of-page block: module rail, next step, up a level, other platforms

const nn = (i: number) => String(i + 1).padStart(2, "0")

type Where = { platform?: string; module?: string }

function resolve({ platform, module }: Where) {
  const p = platform ? getPlatform(platform) : undefined
  const mi = p && module ? p.modules.findIndex((m) => m.slug === module) : -1
  return { p, mi, m: p && mi >= 0 ? p.modules[mi] : undefined }
}

/** Breadcrumb: Work › SCINODE › Platform › Module, with the position inside the platform. */
export function Trail(where: Where & { className?: string }) {
  const { p, mi, m } = resolve(where)
  const crumbs: { label: string; href?: string }[] = [
    { label: "All work", href: "/#work" },
    { label: scinodeHome.name, href: p ? scinodeHome.href : undefined },
  ]
  if (p) crumbs.push({ label: p.name, href: m ? p.href : undefined })
  if (m) crumbs.push({ label: m.title })
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-2", where.className)}>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-[13.5px] font-medium text-body">
          {crumbs.map((c, i) => (
            <li key={c.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 text-soft/70" aria-hidden />}
              {c.href ? (
                <Link href={c.href} className="rounded-full px-1.5 py-0.5 transition-colors hover:bg-white hover:text-brand">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="rounded-full bg-white px-2.5 py-0.5 text-ink ring-1 ring-line">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {p && m && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e4f1eb] px-3 py-1 text-[12.5px] font-semibold text-brand">
          <MapPin className="size-3.5" aria-hidden />
          Module {mi + 1} of {p.modules.length}
        </span>
      )}
    </div>
  )
}

/** Sidebar map of the whole case study with the current platform opened and the current page marked. */
export function ScinodeMap(where: Where) {
  const { p: current, m: here } = resolve(where)
  return (
    <div className="mb-8 border-b border-line pb-7">
      <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">
        <Compass className="size-3.5" aria-hidden /> Case study map
      </p>
      <ul className="grid gap-0.5 text-[13.5px]">
        <li>
          <Link href={scinodeHome.href} className="block rounded-[8px] px-2 py-1 text-body transition-colors hover:bg-white hover:text-brand">
            Ecosystem overview
          </Link>
        </li>
        {platforms.map((p) => {
          const open = current?.key === p.key
          const onPlatform = open && !here
          return (
            <li key={p.key}>
              <Link
                href={p.href}
                aria-current={onPlatform ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-[8px] px-2 py-1 transition-colors hover:bg-white hover:text-brand",
                  open ? "font-semibold text-ink" : "text-body",
                  onPlatform && "bg-white ring-1 ring-line"
                )}
              >
                {p.name}
                {p.tbc && <span className="text-[10px] font-semibold tracking-[0.06em] text-soft uppercase">soon</span>}
              </Link>
              {open && p.modules.length > 0 && (
                <ol className="mt-0.5 mb-1 ml-3 grid gap-0.5 border-l border-line pl-2">
                  {p.modules.map((m, i) => {
                    const on = here?.slug === m.slug
                    return (
                      <li key={m.slug}>
                        <Link
                          href={m.href}
                          aria-current={on ? "page" : undefined}
                          className={cn(
                            "flex items-start gap-2 rounded-[8px] px-2 py-1 text-[13px] leading-snug transition-colors",
                            on ? "bg-brand font-semibold text-white" : "text-body hover:bg-white hover:text-brand"
                          )}
                        >
                          <span className={cn("tabular-nums", on ? "text-white/70" : "text-soft")}>{nn(i)}</span>
                          {m.title}
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** End of page: every module of this platform, the next step, a way up, and the other platforms. */
export function KeepExploring(where: Where) {
  const { p, mi, m } = resolve(where)
  if (!p) return null
  const last = m && mi === p.modules.length - 1
  const next = m && !last ? p.modules[mi + 1] : !m ? p.modules[0] : undefined
  const others = platforms.filter((x) => x.key !== p.key)

  return (
    <section aria-labelledby="keep-exploring" className="mt-20 rounded-[28px] border border-line bg-white/70 p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">Keep exploring</p>
          <h2 id="keep-exploring" className="mt-1.5 font-heading text-[26px] leading-tight font-semibold text-ink md:text-[30px]">
            {m ? `${p.name}: all ${p.modules.length} modules` : `The modules of ${p.name}`}
          </h2>
        </div>
        <Trail {...where} />
      </div>

      {/* Module rail: where you are among the platform's modules */}
      {p.modules.length > 0 && (
        <ol
          className="mt-6 grid gap-2 md:grid-cols-[repeat(var(--n),minmax(0,1fr))] md:gap-3"
          style={{ "--n": p.modules.length } as React.CSSProperties}
        >
          {p.modules.map((x, i) => {
            const on = m?.slug === x.slug
            return (
              <li key={x.slug}>
                <Link
                  href={x.href}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "group flex h-full flex-col rounded-[18px] border p-4 transition-[transform,border-color,box-shadow] duration-200",
                    on
                      ? "border-brand bg-[#e4f1eb] shadow-[inset_0_0_0_1px_rgba(2,89,78,0.4)]"
                      : "border-line bg-white hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_16px_30px_-22px_rgba(2,89,78,0.6)]"
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-heading text-[22px] leading-none font-semibold text-brand/30">{nn(i)}</span>
                    {on ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10.5px] font-semibold text-white">
                        <MapPin className="size-3" aria-hidden /> You&rsquo;re here
                      </span>
                    ) : x.tbc ? (
                      <span className="text-[10px] font-semibold tracking-[0.06em] text-soft uppercase">soon</span>
                    ) : (
                      <ArrowRight className="size-4 text-soft transition-transform group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                    )}
                  </span>
                  <span className="mt-2 text-[15.5px] leading-tight font-semibold text-ink md:mt-3">{x.title}</span>
                  <span className="mt-1 line-clamp-1 text-[12.5px] leading-snug text-body md:line-clamp-2">{x.summary}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      )}

      {/* Next step, up a level, other platforms */}
      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)]">
        {next ? (
          <Link href={next.href} className="group flex flex-col justify-between rounded-[18px] bg-brand p-5 text-white transition-transform hover:-translate-y-0.5">
            <span className="text-[11.5px] font-bold tracking-[0.12em] text-white/65 uppercase">{m ? "Next module" : "Start with module 01"}</span>
            <span className="mt-3 flex items-center justify-between gap-3 text-[19px] leading-tight font-semibold">
              {next.title}
              <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        ) : (
          <Link href={scinodeHome.platformsHref} className="group flex flex-col justify-between rounded-[18px] bg-brand p-5 text-white transition-transform hover:-translate-y-0.5">
            <span className="text-[11.5px] font-bold tracking-[0.12em] text-white/65 uppercase">{last ? `All ${p.modules.length} modules seen` : "Next"}</span>
            <span className="mt-3 flex items-center justify-between gap-3 text-[19px] leading-tight font-semibold">
              Explore another platform
              <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        )}

        <Link
          href={m ? p.href : scinodeHome.href}
          className="group flex flex-col justify-between rounded-[18px] border border-line bg-white p-5 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-brand/40"
        >
          <span className="text-[11.5px] font-bold tracking-[0.12em] text-soft uppercase">Up a level</span>
          <span className="mt-3 flex items-center gap-2 text-[17px] leading-tight font-semibold text-ink">
            <ArrowUpLeft className="size-4 shrink-0 text-brand" aria-hidden />
            {m ? `${p.name} overview` : "SCINODE ecosystem"}
          </span>
        </Link>

        <div className="rounded-[18px] border border-line bg-white p-5">
          <span className="flex items-center gap-1.5 text-[11.5px] font-bold tracking-[0.12em] text-soft uppercase">
            <LayoutGrid className="size-3.5" aria-hidden /> Other platforms
          </span>
          <span className="mt-3 flex flex-wrap gap-2">
            {others.map((o: NavPlatform) => (
              <Link
                key={o.key}
                href={o.href}
                className="inline-flex items-center gap-1 rounded-full border border-brand/20 px-3 py-1 text-[13px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                {o.name}
              </Link>
            ))}
            {m && (
              <Link
                href={scinodeHome.href}
                className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-[13px] font-semibold text-body transition-colors hover:border-brand/40 hover:text-brand"
              >
                Ecosystem
              </Link>
            )}
          </span>
        </div>
      </div>
    </section>
  )
}
