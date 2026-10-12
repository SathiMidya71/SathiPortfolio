"use client"

import { useEffect, useRef, useState } from "react"
import { Cog, FlaskConical, Puzzle, Rocket, Target, Truck, Users, type LucideIcon } from "lucide-react"
import { ecosystem } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// SCINODE "How the ecosystem works", designed to fit one screen: a faint big title, coloured portal
// bands across the top (Customer over 01, Business & admin over 02–03, Supplier over 04–05,
// Execution over 06), then the six steps in ONE row joined by a line that draws left to right step
// by step, each node popping as the line reaches it. Sathi's steps are filled brand green.
// Straight on the page background, no containers. Phones: a vertical timeline.

const bands: { key: string; label: string; name: string; span: number; icon: LucideIcon; tint: string; ink: string }[] = [
  { key: "customer", label: "Customer side", name: "Customer Portal", span: 1, icon: Users, tint: "#ece9fd", ink: "#6e62e5" },
  { key: "admin", label: "Business & admin side", name: "Business & Admin Portal", span: 2, icon: Cog, tint: "#f2ece3", ink: "#6b7f7c" },
  { key: "supplier", label: "Supplier side", name: "Supplier Portal", span: 2, icon: FlaskConical, tint: "#e4f1eb", ink: "#02594e" },
  { key: "execution", label: "Execution", name: "Delivery", span: 1, icon: Truck, tint: "#f2ece3", ink: "#6b7f7c" },
]
const bandOf = Object.fromEntries(bands.map((b) => [b.key, b])) as Record<string, (typeof bands)[number]>
const valueIcons: LucideIcon[] = [Puzzle, Target, Rocket]
const SEG = 560 // ms from one node to the next

export function Ecosystem({ highlight = [], className }: { highlight?: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true)
      setShown(true)
      return
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
    return () => io.disconnect()
  }, [])

  const nodeAt = (i: number) => (instant ? 0 : 250 + i * SEG)
  const grow = (axis: "x" | "y", start: number, dur: number) =>
    ({
      scale: shown ? "1 1" : axis === "x" ? "0 1" : "1 0",
      transition: instant ? "none" : `scale ${dur}ms linear ${start}ms`,
    }) as React.CSSProperties
  const steps = ecosystem.steps

  return (
    <div ref={ref} className={cn("relative [container-type:inline-size]", className)}>
      {/* title */}
      <p aria-hidden className="overflow-hidden font-heading text-[12.5cqw] leading-[0.95] font-bold tracking-[-0.05em] whitespace-nowrap text-brand/[0.07] max-lg:text-[11.2cqw] lg:text-[9.5cqw]">
        {ecosystem.title}
      </p>
      <p className="relative -mt-[5.5cqw] max-w-[760px] text-[18px] leading-snug text-ink md:text-[21px] lg:-mt-[4.2cqw]">{ecosystem.intro}</p>

      {/* portal bands (lg) */}
      <div className="mt-10 hidden grid-cols-6 gap-3 lg:grid">
        {bands.map((b) => (
          <div key={b.key} className="rounded-[16px] px-4 py-3" style={{ gridColumn: `span ${b.span}`, background: b.tint }}>
            <p className="flex items-center gap-2.5">
              <b.icon className="size-5 shrink-0" style={{ color: b.ink }} strokeWidth={1.9} aria-hidden />
              <span className="min-w-0">
                <span className="block text-[10.5px] font-semibold tracking-[0.12em] uppercase" style={{ color: b.ink }}>
                  {b.label}
                </span>
                <span className="block truncate text-[15px] font-semibold text-ink">{b.name}</span>
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* the journey */}
      <ol className="mt-6 grid lg:mt-8 lg:grid-cols-6">
        {steps.map((s, i) => {
          const me = highlight.includes(s.n)
          const band = bandOf[s.portal] ?? bandOf.execution
          const last = i === steps.length - 1
          const out = nodeAt(i) + 100 // outgoing line starts just after this node pops
          return (
            <li key={s.n} className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:px-3 lg:pb-0 lg:text-center">
              {/* phones: vertical line down to the next node */}
              {!last && (
                <span aria-hidden className="absolute top-14 bottom-0 left-[27px] w-[2.5px] bg-[#e2d9ca] lg:hidden">
                  <span className="absolute inset-0 origin-top bg-brand" style={grow("y", out, SEG - 120)} />
                </span>
              )}
              {/* lg: outgoing half (node → right edge) and incoming half (left edge → node) */}
              {!last && (
                <span aria-hidden className="absolute top-[27px] right-0 left-[calc(50%+30px)] hidden h-[2.5px] bg-[#e2d9ca] lg:block">
                  <span className="absolute inset-0 origin-left bg-brand" style={grow("x", out, (SEG - 120) / 2)} />
                </span>
              )}
              {i > 0 && (
                <span aria-hidden className="absolute top-[27px] right-[calc(50%+30px)] left-0 hidden h-[2.5px] bg-[#e2d9ca] lg:block">
                  <span className="absolute inset-0 origin-left bg-brand" style={grow("x", nodeAt(i - 1) + 100 + (SEG - 120) / 2, (SEG - 120) / 2)} />
                </span>
              )}

              <span
                className={cn(
                  "relative z-10 grid size-14 shrink-0 place-items-center rounded-full font-heading text-[18px] font-bold transition-[scale,opacity] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]",
                  me ? "bg-brand text-white shadow-[0_0_0_7px_rgba(2,89,78,0.12)]" : "border-2 border-[#d9cfbf] bg-cream text-soft"
                )}
                style={{ scale: shown ? "1" : "0.4", opacity: shown ? 1 : 0, transitionDelay: `${nodeAt(i)}ms` }}
              >
                {s.n}
              </span>

              <div
                className="min-w-0 pt-1 transition-[opacity,translate] duration-500 lg:pt-4"
                style={{ opacity: shown ? 1 : 0, translate: shown ? "0 0" : "0 10px", transitionDelay: `${nodeAt(i) + 100}ms` }}
              >
                <p className="flex flex-wrap items-center gap-1.5 lg:justify-center">
                  <span className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold lg:hidden" style={{ background: band.tint, color: band.ink }}>
                    {band.name}
                  </span>
                  {me && <span className="rounded-full bg-[#e4f1eb] px-2 py-0.5 text-[10.5px] font-bold text-brand">Designed by me</span>}
                </p>
                <p className="mt-1.5 text-[16px] leading-tight font-semibold text-ink lg:mt-2 lg:text-[15.5px]">{s.title}</p>
                <p className="mt-1.5 text-[14.5px] leading-snug text-body lg:text-[13.5px]">{s.text}</p>
              </div>
            </li>
          )
        })}
      </ol>

      {/* value propositions */}
      <div className="mt-10 grid gap-6 border-t border-line pt-7 md:grid-cols-3 lg:mt-12">
        {ecosystem.values.map((v, i) => {
          const I = valueIcons[i]
          return (
            <div key={v.title} className="flex gap-3.5">
              <I className="mt-0.5 size-6 shrink-0 text-brand" strokeWidth={1.7} aria-hidden />
              <div>
                <p className="text-[15.5px] font-semibold text-ink">{v.title}</p>
                <p className="mt-1 text-[14px] leading-snug text-body">{v.text}</p>
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
