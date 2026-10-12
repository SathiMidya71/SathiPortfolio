"use client"

import { useEffect, useRef, useState } from "react"
import { Cog, FlaskConical, Rocket, Puzzle, Target, Users, type LucideIcon } from "lucide-react"
import { ecosystem, type PortalKey } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// SCINODE "Platform Ecosystem": a dark board with the three portals, steps 01–05 inside them and
// step 06 (execution) below, joined by dashed connectors that draw in on scroll and then keep
// flowing. Steps covered by Sathi's modules glow ("Designed by me"). Below lg the columns stack and
// the connectors are hidden. `compact` drops the title, journey and value props (used as a strip).

const portalIcon: Partial<Record<PortalKey, { icon: LucideIcon; bg: string; fg: string }>> = {
  customer: { icon: Users, bg: "#2b2558", fg: "#b79cec" },
  admin: { icon: Cog, bg: "#163a4a", fg: "#6ce3ff" },
  supplier: { icon: FlaskConical, bg: "#3b2a16", fg: "#ffb27a" },
}
const valueIcons = [
  { icon: Puzzle, bg: "#2b2558", fg: "#b79cec" },
  { icon: Target, bg: "#3b1f1f", fg: "#ff8a80" },
  { icon: Rocket, bg: "#16334a", fg: "#7ab8ff" },
]

// connectors as [from, to, from side, to side]
const links: [string, string, "r" | "b" | "l", "l" | "t" | "r"][] = [
  ["01", "02", "r", "l"],
  ["02", "03", "b", "t"],
  ["02", "04", "r", "l"],
  ["04", "05", "b", "t"],
  ["05", "03", "l", "r"],
  ["03", "06", "b", "t"],
]

export function Ecosystem({ highlight = [], className }: { highlight?: string[]; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  const [paths, setPaths] = useState<string[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => {
      const b = el.getBoundingClientRect()
      setSize({ w: b.width, h: b.height })
      const r = (n: string) => {
        const e = refs.current[n]!.getBoundingClientRect()
        return { l: e.left - b.left, r: e.right - b.left, t: e.top - b.top, b: e.bottom - b.top, cx: (e.left + e.right) / 2 - b.left, cy: (e.top + e.bottom) / 2 - b.top }
      }
      setPaths(
        links.map(([f, t, fs, ts]) => {
          const a = r(f)
          const z = r(t)
          const p1 = fs === "r" ? [a.r, a.cy] : fs === "l" ? [a.l, a.cy] : [a.cx, a.b]
          const p2 = ts === "l" ? [z.l, z.cy] : ts === "r" ? [z.r, z.cy] : [z.cx, z.t]
          if (fs === "b") return `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`
          const dx = (p2[0] - p1[0]) / 2
          return `M${p1[0]},${p1[1]} C${p1[0] + dx},${p1[1]} ${p2[0] - dx},${p2[1]} ${p2[0]},${p2[1]}`
        })
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) setShown(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { threshold: 0.2 }
    )
    if (!reduce) io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const steps = ecosystem.steps
  const Step = ({ n, wide }: { n: string; wide?: boolean }) => {
    const s = steps.find((x) => x.n === n)!
    const me = highlight.includes(n)
    const i = Number(n)
    return (
      <div
        ref={(el) => {
          refs.current[n] = el
        }}
        className={cn(
          "relative rounded-[14px] border px-4 py-3.5 transition-[opacity,translate] duration-700",
          me ? "border-[#7fd4a8] bg-[#1b3328] shadow-[0_0_0_5px_rgba(127,212,168,0.12),0_0_36px_-6px_rgba(127,212,168,0.55)]" : "border-[#7fd4a8]/25 bg-[#1b3328]",
          wide && "bg-gradient-to-br from-[#21463a] to-[#173126]"
        )}
        style={{ opacity: shown ? 1 : 0, translate: shown ? "0 0" : "0 14px", transitionDelay: `${150 + i * 110}ms` }}
      >
        {me && <span className="absolute -top-2.5 right-3 rounded-full bg-[#7fd4a8] px-2 py-0.5 text-[10.5px] font-extrabold text-[#0f1f19]">● Designed by me</span>}
        <p className="flex items-baseline gap-3">
          <span className="font-heading text-[28px] leading-none font-bold text-[#7fd4a8]">{n}</span>
          <span className="text-[13.5px] font-semibold tracking-[0.06em] text-white uppercase">{s.title}</span>
        </p>
        <p className="mt-1.5 text-[13.5px] leading-[1.45] text-[#b9cdc2]">{s.text}</p>
      </div>
    )
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-[28px] bg-[#0f1f19] px-5 py-8 text-[#e7efe9] [container-type:inline-size] sm:px-10 sm:py-11", className)}
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <p aria-hidden className="font-heading text-[11cqw] leading-[0.9] font-bold tracking-[-0.04em] whitespace-nowrap text-[#6eb48c]/15">
        {ecosystem.title}
      </p>
      <p className="relative -mt-[4.5cqw] max-w-[820px] text-[16px] leading-snug text-[#cfe0d6] sm:text-[19px]">{ecosystem.intro}</p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {ecosystem.journey.map((j, i) => (
          <span key={j} className="flex items-center gap-2">
            <span className="rounded-full border border-[#b79cec]/50 px-3 py-1.5 text-[11.5px] font-semibold tracking-[0.06em] text-[#d9ccf6] uppercase">{j}</span>
            {i < ecosystem.journey.length - 1 && <span className="text-[#7fd4a8]">→</span>}
          </span>
        ))}
      </div>

      <div ref={box} className="relative mt-8">
        {size.w > 0 && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox={`0 0 ${size.w} ${size.h}`}>
            {paths.map((d, i) => (
              <g key={i} fill="none" stroke="#7fd4a8" strokeWidth={2}>
                <path d={d} strokeOpacity={0.3} pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: shown ? 0 : 1, transition: `stroke-dashoffset 800ms ease ${600 + i * 140}ms` }} />
                <path d={d} strokeDasharray="5 7" className="motion-safe:animate-[ia-flow_1.4s_linear_infinite]" style={{ opacity: shown ? 1 : 0, transition: `opacity 400ms ${1300 + i * 140}ms` }} />
              </g>
            ))}
          </svg>
        )}
        <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr_1fr] lg:gap-7">
          {ecosystem.portals.map((p) => {
            const I = portalIcon[p.key]!
            return (
              <div key={p.key} className="rounded-[20px] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-[11.5px] font-bold tracking-[0.16em] text-[#8fb3a1] uppercase">{p.side}</p>
                <p className="mt-2 flex items-center gap-2.5 text-[20px] font-bold text-white">
                  <span className="grid size-9 place-items-center rounded-[11px]" style={{ background: I.bg, color: I.fg }}>
                    <I.icon className="size-5" aria-hidden />
                  </span>
                  {p.name}
                </p>
                <p className="mt-2 mb-4 text-[14px] leading-[1.45] text-[#b9cdc2] lg:min-h-[42px]">{p.text}</p>
                <div className="grid gap-4">
                  {ecosystem.steps
                    .filter((s) => s.portal === p.key)
                    .map((s) => (
                      <Step key={s.n} n={s.n} />
                    ))}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mx-auto mt-6 lg:mt-8 lg:w-[58%]">
          <p className="mb-2 text-[11.5px] font-bold tracking-[0.16em] text-[#7fd4a8] uppercase">Execution &amp; delivery · From opportunity to execution</p>
          <Step n="06" wide />
        </div>
      </div>

      <div className="mt-9 grid gap-6 border-t border-white/10 pt-7 md:grid-cols-3">
        {ecosystem.values.map((v, i) => {
          const I = valueIcons[i]
          return (
            <div key={v.title} className="flex gap-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-[11px]" style={{ background: I.bg, color: I.fg }}>
                <I.icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold tracking-[0.07em] text-white uppercase">{v.title}</p>
                <p className="mt-1 text-[14px] leading-[1.45] text-[#b9cdc2]">{v.text}</p>
              </div>
            </div>
          )
        })}
      </div>
      {highlight.length > 0 && (
        <p className="mt-6 text-[13px] text-[#8fb3a1]">
          <span className="text-[#7fd4a8]">●</span> Glowing steps are the parts I designed. The rest of the platform was designed by teammates.
        </p>
      )}
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
