"use client"

import { useEffect, useRef, useState } from "react"
import { Cog, FlaskConical, Puzzle, Rocket, Target, Users, type LucideIcon } from "lucide-react"
import { ecosystem, type PortalKey } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// SCINODE "Platform Ecosystem", presented like a Behance board straight on the page background:
// a huge faint title, the three portals as column headers, and the six steps as one journey line
// that draws itself step by step (01 → 06) when scrolled into view; each step's node pops in as the
// line reaches it. Steps Sathi designed are filled brand green with a "Designed by me" tag.
// On phones the steps become a vertical timeline (same line, measured from the nodes).

const portalStyle: Record<"customer" | "admin" | "supplier", { icon: LucideIcon; tint: string; ink: string }> = {
  customer: { icon: Users, tint: "#ece9fd", ink: "#6e62e5" },
  admin: { icon: Cog, tint: "#e3f3fa", ink: "#1f86ad" },
  supplier: { icon: FlaskConical, tint: "#fdeee0", ink: "#c2621c" },
}
const valueIcons: LucideIcon[] = [Puzzle, Target, Rocket]

// lg grid placement for each step (3 columns = portals, rows go down the journey)
// staggered so every connector runs through empty space: same-column moves go straight down the
// node gutter, column changes drop into the row gap and come into the next node from above
const place: Record<string, string> = {
  "01": "lg:col-start-1 lg:row-start-2",
  "02": "lg:col-start-2 lg:row-start-3",
  "03": "lg:col-start-2 lg:row-start-4",
  "04": "lg:col-start-3 lg:row-start-5",
  "05": "lg:col-start-3 lg:row-start-6",
  "06": "lg:col-start-2 lg:row-start-7",
}

const SEG = 650 // ms to draw one segment

export function Ecosystem({ highlight = [], className }: { highlight?: string[]; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const nodes = useRef<Record<string, HTMLSpanElement | null>>({})
  const [pts, setPts] = useState<[number, number][]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [shown, setShown] = useState(false)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const measure = () => {
      const b = el.getBoundingClientRect()
      setSize({ w: b.width, h: b.height })
      setPts(
        ecosystem.steps.map((s) => {
          const r = nodes.current[s.n]!.getBoundingClientRect()
          return [(r.left + r.right) / 2 - b.left, (r.top + r.bottom) / 2 - b.top]
        })
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true)
      setShown(true)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { rootMargin: "0px 0px -30% 0px" }
    )
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  // straight down the node gutter, or: down into the gap above the next node, across, then down
  const seg = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
    if (Math.abs(x1 - x2) < 4) return `M${x1},${y1} L${x2},${y2}`
    const gy = y2 - 58
    const r = 22
    const dir = x2 > x1 ? 1 : -1
    return `M${x1},${y1} L${x1},${gy - r} Q${x1},${gy} ${x1 + dir * r},${gy} L${x2 - dir * r},${gy} Q${x2},${gy} ${x2},${gy + r} L${x2},${y2}`
  }
  const delay = (i: number) => (instant ? 0 : 300 + i * SEG) // when segment i starts drawing
  const nodeDelay = (i: number) => (instant ? 0 : i === 0 ? 200 : delay(i - 1) + SEG - 120)

  return (
    <div className={cn("relative [container-type:inline-size]", className)}>
      {/* title */}
      <div className="relative">
        <p aria-hidden className="overflow-hidden font-heading text-[12.5cqw] leading-[0.95] font-bold tracking-[-0.05em] whitespace-nowrap text-brand/[0.07]">
          {ecosystem.title}
        </p>
        <p className="relative -mt-[5.5cqw] max-w-[760px] text-[18px] leading-snug text-ink md:text-[22px]">{ecosystem.intro}</p>
      </div>

      {/* journey */}
      <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold tracking-[0.12em] text-soft uppercase">
        {ecosystem.journey.map((j, i) => (
          <span key={j} className="flex items-center gap-2">
            {j}
            {i < ecosystem.journey.length - 1 && <span className="text-brand">→</span>}
          </span>
        ))}
      </p>

      <div ref={wrap} className="relative mt-12">
        {/* the journey line */}
        {size.w > 0 && pts.length === 6 && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`}>
            {pts.slice(1).map((p, i) => {
              const d = seg(pts[i], p)
              return (
                <g key={i} fill="none" strokeLinecap="round">
                  <path d={d} stroke="#d9cfbf" strokeWidth={2} strokeDasharray="2 7" />
                  <path
                    d={d}
                    stroke="var(--brand)"
                    strokeWidth={2.5}
                    pathLength={1}
                    strokeDasharray="1 1"
                    style={{ strokeDashoffset: shown ? 0 : 1, transition: instant ? "none" : `stroke-dashoffset ${SEG}ms cubic-bezier(.55,.1,.45,1) ${delay(i)}ms` }}
                  />
                </g>
              )
            })}
          </svg>
        )}

        <div className="relative grid gap-9 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-[88px]">
          {/* portal headers (lg) */}
          {ecosystem.portals.map((p, i) => {
            const st = portalStyle[p.key as "customer" | "admin" | "supplier"]
            return (
              <div key={p.key} className={cn("hidden lg:row-start-1 lg:block", ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3"][i])}>
                <span className="grid size-14 place-items-center rounded-[18px]" style={{ background: st.tint, color: st.ink }}>
                  <st.icon className="size-7" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="mt-4 text-[12px] font-semibold tracking-[0.14em] uppercase" style={{ color: st.ink }}>
                  {p.side}
                </p>
                <p className="mt-1 font-heading text-[26px] leading-tight font-semibold text-ink">{p.name}</p>
                <p className="mt-2 text-[15.5px] leading-snug text-body">{p.text}</p>
              </div>
            )
          })}

          {/* steps */}
          {ecosystem.steps.map((s, i) => {
            const me = highlight.includes(s.n)
            const pk = s.portal === "execution" ? null : (s.portal as "customer" | "admin" | "supplier")
            const st = pk ? portalStyle[pk] : null
            const final = s.portal === "execution"
            // steps sit one row lower on lg, under the portal headers
            const lgPlace = place[s.n]
            return (
              <div key={s.n} className={cn("relative flex gap-4", lgPlace, final && "lg:col-span-1")}>
                <span
                  ref={(el) => {
                    nodes.current[s.n] = el
                  }}
                  className={cn(
                    "relative z-10 grid shrink-0 place-items-center rounded-full font-heading font-bold transition-[scale,opacity] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]",
                    final ? "size-16 text-[20px]" : "size-14 text-[18px]",
                    me ? "bg-brand text-white shadow-[0_0_0_7px_rgba(2,89,78,0.12)]" : "border-2 border-[#d9cfbf] bg-cream text-soft"
                  )}
                  style={{ scale: shown ? "1" : "0.4", opacity: shown ? 1 : 0, transitionDelay: `${nodeDelay(i)}ms` }}
                >
                  {s.n}
                </span>
                <div
                  className="pt-1 transition-[opacity,translate] duration-500"
                  style={{ opacity: shown ? 1 : 0, translate: shown ? "0 0" : "0 10px", transitionDelay: `${nodeDelay(i) + 120}ms` }}
                >
                  <p className="flex flex-wrap items-center gap-2">
                    {st && (
                      <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold lg:hidden" style={{ background: st.tint, color: st.ink }}>
                        {ecosystem.portals.find((p) => p.key === pk)?.name}
                      </span>
                    )}
                    {final && <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-semibold text-body">Execution &amp; delivery</span>}
                    {me && <span className="rounded-full bg-[#e4f1eb] px-2 py-0.5 text-[11px] font-bold text-brand">Designed by me</span>}
                  </p>
                  <p className="mt-1.5 text-[17px] leading-tight font-semibold text-ink">{s.title}</p>
                  <p className="mt-1.5 text-[15px] leading-snug text-body">{s.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* value propositions */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {ecosystem.values.map((v, i) => {
          const I = valueIcons[i]
          return (
            <div key={v.title}>
              <I className="size-7 text-brand" strokeWidth={1.6} aria-hidden />
              <p className="mt-3 text-[17px] font-semibold text-ink">{v.title}</p>
              <p className="mt-1.5 text-[15px] leading-snug text-body">{v.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Small 01–06 strip with the given steps lit, for module pages. */
export function StepStrip({ lit }: { lit: string[] }) {
  return (
    <div className="flex gap-1.5">
      {ecosystem.steps.map((s) => {
        const on = lit.includes(s.n)
        return (
          <span key={s.n} title={s.title} className={cn("flex-1 rounded-[10px] px-2 py-2 text-center", on ? "bg-brand text-white" : "bg-sand text-soft")}>
            <span className="block text-[13px] font-bold">{s.n}</span>
            <span className="hidden text-[11px] leading-tight sm:block">{s.title}</span>
          </span>
        )
      })}
    </div>
  )
}

export type { PortalKey }
