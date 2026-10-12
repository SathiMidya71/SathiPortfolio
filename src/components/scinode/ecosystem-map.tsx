"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Beaker, Cog, Factory, FlaskConical, Microscope, Users, type LucideIcon } from "lucide-react"
import { areas, type PortalKey } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// The SCINODE ecosystem as a clickable flowchart, straight on the page background:
// SCINODE → three portals → the user areas. Sathi's areas (CVP, Manufacturer, CRO, Scientist) are
// cards that open their own case study; the business & admin portal (designed by teammates) is shown
// greyed for context. On scroll the connectors draw in one by one (root → portals → areas), each
// card popping in as its line arrives. Below lg it becomes an indented vertical tree.

type NodeId = "root" | PortalKey | string

const portals: { key: Exclude<PortalKey, "internal">; name: string; side: string; icon: LucideIcon; tint: string; ink: string; mine: boolean }[] = [
  { key: "customer", name: "Customer Portal", side: "Customer side", icon: Users, tint: "#ece9fd", ink: "#6e62e5", mine: true },
  { key: "admin", name: "Business & Admin Portal", side: "Business & admin side", icon: Cog, tint: "#f2ece3", ink: "#6b7f7c", mine: false },
  { key: "supplier", name: "Supplier Portal", side: "Supplier side", icon: FlaskConical, tint: "#e4f1eb", ink: "#02594e", mine: true },
]

const areaIcon: Record<string, LucideIcon> = { cvp: Users, manufacturer: Factory, cro: Microscope, scientist: Beaker }

// lg grid: 5 columns. Portals sit above their areas; supplier spans its three areas.
const portalCol: Record<string, string> = { customer: "lg:col-start-1", admin: "lg:col-start-2", supplier: "lg:col-start-3 lg:col-span-3" }
const areaCol: Record<string, string> = { cvp: "lg:col-start-1", manufacturer: "lg:col-start-3", cro: "lg:col-start-4", scientist: "lg:col-start-5" }
// phones: each portal sits right above its own areas
const mobileOrder: Record<string, string> = {
  customer: "max-lg:order-1",
  cvp: "max-lg:order-2",
  admin: "max-lg:order-3",
  "admin-team": "max-lg:order-4",
  supplier: "max-lg:order-5",
  manufacturer: "max-lg:order-6",
  cro: "max-lg:order-7",
  scientist: "max-lg:order-8",
}

// draw order: root→portals, then portals→areas
const edges: [NodeId, NodeId][] = [
  ["root", "customer"],
  ["root", "admin"],
  ["root", "supplier"],
  ["customer", "cvp"],
  ["admin", "admin-team"],
  ["supplier", "manufacturer"],
  ["supplier", "cro"],
  ["supplier", "scientist"],
]
const SEG = 520

export function EcosystemMap() {
  const wrap = useRef<HTMLDivElement>(null)
  const refs = useRef<Record<string, HTMLElement | null>>({})
  const [paths, setPaths] = useState<string[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [shown, setShown] = useState(false)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const measure = () => {
      const b = el.getBoundingClientRect()
      setSize({ w: b.width, h: b.height })
      // side-by-side layout when the portals share a row
      const lg = Math.abs(refs.current.customer!.getBoundingClientRect().top - refs.current.supplier!.getBoundingClientRect().top) < 4
      setPaths(
        edges.map(([from, to]) => {
          const a = refs.current[from]!.getBoundingClientRect()
          const z = refs.current[to]!.getBoundingClientRect()
          if (lg) {
            // bottom-centre of parent → top-centre of child, with rounded elbows in between
            const x1 = (a.left + a.right) / 2 - b.left
            const y1 = a.bottom - b.top
            const x2 = (z.left + z.right) / 2 - b.left
            const y2 = z.top - b.top
            if (Math.abs(x1 - x2) < 3) return `M${x1},${y1} L${x2},${y2}`
            const my = (y1 + y2) / 2
            const r = Math.min(18, Math.abs(x2 - x1) / 2, (y2 - y1) / 2)
            const d = x2 > x1 ? 1 : -1
            return `M${x1},${y1} L${x1},${my - r} Q${x1},${my} ${x1 + d * r},${my} L${x2 - d * r},${my} Q${x2},${my} ${x2},${my + r} L${x2},${y2}`
          }
          // phones: tree line down the left gutter of the parent, then across into the child
          const x1 = a.left - b.left + 22
          const y1 = a.bottom - b.top
          const y2 = (z.top + z.bottom) / 2 - b.top
          const x2 = z.left - b.left
          return `M${x1},${y1} L${x1},${y2 - 12} Q${x1},${y2} ${x1 + 12},${y2} L${x2},${y2}`
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
    // tall on phones, so trigger as soon as the top is well into view
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

  const edgeDelay = (i: number) => (instant ? 0 : 350 + i * SEG)
  const popDelay = (id: NodeId) => {
    if (instant) return 0
    if (id === "root") return 0
    const i = edges.findIndex(([, to]) => to === id)
    return edgeDelay(i) + SEG - 100
  }
  const pop = (id: NodeId) =>
    ({
      opacity: shown ? 1 : 0,
      scale: shown ? "1" : "0.85",
      transition: instant ? "none" : "opacity 420ms ease, scale 520ms cubic-bezier(.34,1.56,.64,1)",
      transitionDelay: `${popDelay(id)}ms`,
    }) as React.CSSProperties
  const ref = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el
  }

  return (
    <div ref={wrap} className="relative">
      {size.w > 0 && paths.length === edges.length && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`}>
          {paths.map((d, i) => {
            const grey = edges[i][0] === "admin" || edges[i][1] === "admin"
            return (
              <g key={i} fill="none" strokeLinecap="round">
                <path d={d} stroke="#e2d9ca" strokeWidth={2} strokeDasharray="2 6" />
                <path
                  d={d}
                  stroke={grey ? "#c9c1b3" : "var(--brand)"}
                  strokeWidth={2.4}
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{ strokeDashoffset: shown ? 0 : 1, transition: instant ? "none" : `stroke-dashoffset ${SEG}ms cubic-bezier(.55,.1,.45,1) ${edgeDelay(i)}ms` }}
                />
              </g>
            )
          })}
        </svg>
      )}

      <div className="relative grid gap-y-5 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-12">
        {/* root */}
        <div className="lg:col-span-5 lg:flex lg:justify-center">
          <div ref={ref("root")} className="inline-block">
          <div style={pop("root")} className="inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-6 pl-2.5 text-white shadow-[0_18px_40px_-18px_rgba(2,89,78,0.8)]">
            <span className="grid size-10 place-items-center rounded-full bg-white/15 font-heading text-[15px] font-bold">S</span>
            <span>
              <span className="block font-heading text-[22px] leading-none font-semibold tracking-[-0.01em]">SCINODE</span>
              <span className="mt-1 block text-[12.5px] text-white/75">R&amp;D opportunity platform</span>
            </span>
          </div>
          </div>
        </div>

        {/* portals */}
        {portals.map((p) => (
          <div key={p.key} className={cn("lg:row-start-2 lg:flex lg:justify-center", portalCol[p.key], mobileOrder[p.key], "max-lg:pl-6")}>
            <div ref={ref(p.key)} className="inline-block">
              <div style={pop(p.key)} className="inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5" >
                <span className="grid size-8 shrink-0 place-items-center rounded-full" style={{ background: p.tint, color: p.ink }}>
                  <p.icon className="size-4" strokeWidth={2} aria-hidden />
                </span>
                <span className={cn("text-[15px] font-semibold whitespace-nowrap", p.mine ? "text-ink" : "text-soft")}>{p.name}</span>
              </div>
            </div>
          </div>
        ))}

        {/* areas */}
        {areas.map((a) => {
          const Icon = areaIcon[a.slug] ?? Users
          const p = portals.find((x) => x.key === a.portal)!
          return (
            <div key={a.slug} className={cn("min-w-0 lg:row-start-3", areaCol[a.slug], mobileOrder[a.slug], "max-lg:pl-14")}>
              <div ref={ref(a.slug)} className="h-full">
              <Link
                href={`/work/scinode/${a.slug}`}
                style={pop(a.slug)}
                className="group relative flex h-full flex-col rounded-[18px] border border-line bg-white p-4 shadow-[0_14px_32px_-24px_rgba(16,24,40,0.45)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_22px_44px_-24px_rgba(2,89,78,0.5)]"
              >
                <span className="flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-[11px]" style={{ background: p.tint, color: p.ink }}>
                    <Icon className="size-[18px]" strokeWidth={1.9} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 pr-4 font-heading text-[18px] leading-tight font-semibold text-ink">{a.name}</span>
                  <ArrowUpRight className="absolute top-3 right-3 size-4 text-soft transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
                </span>
                <span className="mt-2.5 block text-[13.5px] leading-snug text-body">{a.audience}</span>
                <span className="mt-auto flex flex-wrap gap-1 pt-3">
                  {a.tbc ? (
                    <span className="rounded-full bg-[#ece9fd] px-2 py-0.5 text-[11px] font-semibold text-[#5b4fd1]">Content to come</span>
                  ) : (
                    a.modules.map((m) => (
                      <span key={m.slug} className="rounded-full bg-[#e4f1eb] px-2 py-0.5 text-[11px] font-medium text-brand">
                        {m.name.replace(/ module$/, "").replace("Internal project management", "Project management")}
                      </span>
                    ))
                  )}
                </span>
              </Link>
              </div>
            </div>
          )
        })}

        {/* admin: teammates */}
        <div className={cn("min-w-0 lg:col-start-2 lg:row-start-3 max-lg:pl-14", mobileOrder["admin-team"])}>
          <div ref={ref("admin-team")} className="h-full">
            <div style={pop("admin-team")} className="h-full rounded-[18px] border border-dashed border-[#d6cbb9] p-4">
              <span className="block font-heading text-[17px] leading-tight font-semibold text-[#8a9592]">Orchestration &amp; collaboration</span>
              <span className="mt-2.5 block text-[13.5px] leading-snug text-[#9aa3a1]">Designed by teammates. Shown for context.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
