"use client"

import { useEffect, useRef, useState } from "react"
import { Cog, FlaskConical, Puzzle, Rocket, Target, Users, type LucideIcon } from "lucide-react"
import { ecosystem } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// SCINODE "How it works", in the layout of Sathi's reference board but cleaner: three portal
// columns (soft tinted bands, no nested boxes) with white step cards, and real arrows showing the
// flow: 01 → 02, 02 → 03, 02 → 04, 04 → 05, 05 → 03 (proposal back into collaboration), 03 → 06.
// Arrows draw in one by one on scroll and each card fades in as its arrow arrives. Sathi's steps
// are marked "Designed by me". Built to fit one screen at desktop. Phones: columns stack, no arrows.

const cols: { key: "customer" | "admin" | "supplier"; side: string; name: string; icon: LucideIcon; band: string; tint: string; ink: string }[] = [
  { key: "customer", side: "Customer side", name: "Customer Portal", icon: Users, band: "rgba(110,98,229,0.06)", tint: "#ece9fd", ink: "#6e62e5" },
  { key: "admin", side: "Business & admin side", name: "Business & Admin Portal", icon: Cog, band: "rgba(107,127,124,0.08)", tint: "#f2ece3", ink: "#6b7f7c" },
  { key: "supplier", side: "Supplier side", name: "Supplier Portal", icon: FlaskConical, band: "rgba(2,89,78,0.06)", tint: "#e4f1eb", ink: "#02594e" },
]
const valueIcons: LucideIcon[] = [Puzzle, Target, Rocket]

// lg placement of each step card (row 1 = column headers); `order` = stacking order on phones
const pos: Record<string, string> = {
  "01": "lg:col-start-1 lg:row-start-2 max-lg:order-2",
  "02": "lg:col-start-2 lg:row-start-2 max-lg:order-4",
  "03": "lg:col-start-2 lg:row-start-3 max-lg:order-5",
  "04": "lg:col-start-3 lg:row-start-2 max-lg:order-7",
  "05": "lg:col-start-3 lg:row-start-3 max-lg:order-8",
  "06": "lg:col-start-2 lg:row-start-4 max-lg:order-9",
}
const colOrder = ["max-lg:order-1", "max-lg:order-3", "max-lg:order-6"]
// arrows in draw order: [from, to, leaves from, arrives at]
const arrows: [string, string, "r" | "b" | "l", "l" | "t" | "r"][] = [
  ["01", "02", "r", "l"],
  ["02", "03", "b", "t"],
  ["02", "04", "r", "l"],
  ["04", "05", "b", "t"],
  ["05", "03", "l", "r"],
  ["03", "06", "b", "t"],
]
const SEG = 520

export function Ecosystem({ highlight = [], className }: { highlight?: string[]; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  const [lines, setLines] = useState<{ d: string; head: string }[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [lg, setLg] = useState(false)
  const [shown, setShown] = useState(false)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const measure = () => {
      const b = el.getBoundingClientRect()
      setSize({ w: b.width, h: b.height })
      const isLg = window.matchMedia("(min-width: 1024px)").matches
      setLg(isLg)
      if (!isLg) return
      const R = (n: string) => {
        const r = refs.current[n]!.getBoundingClientRect()
        return { l: r.left - b.left, r: r.right - b.left, t: r.top - b.top, b: r.bottom - b.top, cx: (r.left + r.right) / 2 - b.left, cy: (r.top + r.bottom) / 2 - b.top }
      }
      setLines(
        arrows.map(([f, t, fs, ts]) => {
          const a = R(f)
          const z = R(t)
          const gap = 5
          let x2: number, y2: number, d: string, ang: number
          if (fs === "b") {
            const x = a.cx
            x2 = x
            y2 = z.t - gap
            d = `M${x},${a.b + gap} L${x2},${y2}`
            ang = Math.PI / 2
          } else {
            const x1 = fs === "r" ? a.r + gap : a.l - gap
            const y1 = a.cy
            x2 = ts === "l" ? z.l - gap : z.r + gap
            y2 = z.cy
            const mx = (x1 + x2) / 2
            d = Math.abs(y1 - y2) < 3 ? `M${x1},${y1} L${x2},${y2}` : `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
            ang = x2 > x1 ? 0 : Math.PI
          }
          const L = 9
          const head = `M${x2 - L * Math.cos(ang - 0.45)},${y2 - L * Math.sin(ang - 0.45)} L${x2},${y2} L${x2 - L * Math.cos(ang + 0.45)},${y2 - L * Math.sin(ang + 0.45)}`
          return { d, head }
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
      { rootMargin: "0px 0px -25% 0px" }
    )
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const arrowAt = (i: number) => (instant ? 0 : 450 + i * SEG)
  // a card appears when the first arrow into it finishes (01 first)
  const cardAt = (n: string) => {
    if (instant) return 0
    if (n === "01") return 150
    const i = arrows.findIndex(([, t]) => t === n)
    return arrowAt(i) + SEG - 120
  }

  return (
    <div className={cn("relative [container-type:inline-size]", className)}>
      {/* title */}
      <p aria-hidden className="overflow-hidden font-heading text-[11.2cqw] leading-[0.95] font-bold tracking-[-0.05em] whitespace-nowrap text-brand/[0.07] lg:text-[7cqw]">
        {ecosystem.title}
      </p>
      <p className="relative -mt-[5cqw] max-w-[760px] text-[18px] leading-snug text-ink md:text-[19px] lg:-mt-[3.2cqw]">{ecosystem.intro}</p>

      <div ref={wrap} className="relative mt-6">
        {/* arrows */}
        {lg && size.w > 0 && lines.length === arrows.length && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`}>
            {lines.map((l, i) => (
              <g key={i} fill="none" stroke="var(--brand)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path
                  d={l.d}
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{ strokeDashoffset: shown ? 0 : 1, transition: instant ? "none" : `stroke-dashoffset ${SEG}ms cubic-bezier(.55,.1,.45,1) ${arrowAt(i)}ms` }}
                />
                <path d={l.head} style={{ opacity: shown ? 1 : 0, transition: instant ? "none" : `opacity 150ms ${arrowAt(i) + SEG - 60}ms` }} />
              </g>
            ))}
          </svg>
        )}

        <div className="relative flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-x-16 lg:gap-y-7">
          {/* column bands behind rows 1–3 (lg) */}
          {cols.map((c, i) => (
            <div
              key={`band-${c.key}`}
              aria-hidden
              className={cn("hidden rounded-[24px] lg:row-start-1 lg:row-end-4 lg:block", ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3"][i])}
              style={{ background: c.band }}
            />
          ))}

          {/* column headers */}
          {cols.map((c, i) => (
            <div key={c.key} className={cn("relative lg:row-start-1 lg:px-4 lg:pt-4", ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3"][i], colOrder[i], i > 0 && "max-lg:mt-5")}>
              <span className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-[11px]" style={{ background: c.tint, color: c.ink }}>
                  <c.icon className="size-5" strokeWidth={1.9} aria-hidden />
                </span>
                <span>
                  <span className="block text-[10.5px] font-semibold tracking-[0.14em] uppercase" style={{ color: c.ink }}>
                    {c.side}
                  </span>
                  <span className="block font-heading text-[17px] leading-tight font-semibold text-ink">{c.name}</span>
                </span>
              </span>
              <p className="mt-2 text-[13px] leading-snug text-body">{ecosystem.portals.find((p) => p.key === c.key)?.text}</p>
            </div>
          ))}

          {/* step cards */}
          {ecosystem.steps.map((s) => {
            const me = highlight.includes(s.n)
            const final = s.n === "06"
            return (
              <div
                key={s.n}
                ref={(el) => {
                  refs.current[s.n] = el
                }}
                className={cn(pos[s.n], "relative z-10 lg:px-3", final && "lg:pt-1")}
              >
                <div
                  className={cn(
                    "relative rounded-[14px] border bg-white px-3.5 py-3 shadow-[0_12px_28px_-22px_rgba(16,24,40,0.45)] transition-[opacity,translate] duration-500",
                    me ? "border-brand/35" : "border-line",
                    final && "border-brand/45 bg-[#f4faf7]"
                  )}
                  style={{ opacity: shown ? 1 : 0, translate: shown ? "0 0" : "0 10px", transitionDelay: `${cardAt(s.n)}ms` }}
                >
                  <p className="flex items-center gap-2.5">
                    <span className={cn("grid size-7 shrink-0 place-items-center rounded-full font-heading text-[12px] font-bold", me || final ? "bg-brand text-white" : "bg-sand text-soft")}>{s.n}</span>
                    <span className="min-w-0 flex-1 text-[14px] leading-tight font-semibold text-ink">{s.title}</span>
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-body">{s.text}</p>
                  {me && <span className="absolute -top-2.5 right-3 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">Designed by me</span>}
                  {final && <span className="absolute -top-2.5 right-3 rounded-full bg-[#e4f1eb] px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] text-brand uppercase">Execution</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* value propositions */}
      <div className="mt-6 grid gap-6 border-t border-line pt-5 md:grid-cols-3">
        {ecosystem.values.map((v, i) => {
          const I = valueIcons[i]
          return (
            <div key={v.title} className="flex gap-3">
              <I className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
              <div>
                <p className="text-[15px] font-semibold text-ink">{v.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-body">{v.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Small 01–06 strip with the given steps lit, for area and module pages. */
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
