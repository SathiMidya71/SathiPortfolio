"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Beaker, Cog, Factory, FlaskConical, GraduationCap, LayoutGrid, Microscope, Users, type LucideIcon } from "lucide-react"
import { areas, customerTeamModules, supplierTracks, type Area } from "@/lib/scinode"
import { cn } from "@/lib/utils"

// The SCINODE ecosystem as a clickable flowchart, straight on the page background:
//   SCINODE → Customer portal → one modules card: CVP (her module) | other modules (teammates)
//           → Business & admin portal (teammates)
//           → Supplier portal → Manufacturer sign-up → Manufacturer
//                             → Researcher sign-up   → CRO, Scientist
// Her work is green and clickable (opens its case study); teammates' work is dashed grey.
// Connectors draw in one by one on scroll, level by level. Below lg: an indented vertical tree.

type Node = { id: string; parent?: string; lg: string; order: number; indent: string }

// lg grid: 6 columns × 4 rows. `order` + `indent` lay out the phone tree.
const nodes: Node[] = [
  { id: "root", lg: "lg:col-span-6 lg:row-start-1", order: 0, indent: "" },
  { id: "customer", parent: "root", lg: "lg:col-start-1 lg:col-span-2 lg:row-start-2", order: 1, indent: "max-lg:pl-6" },
  { id: "customer-modules", parent: "customer", lg: "lg:col-start-1 lg:col-span-2 lg:row-start-4", order: 2, indent: "max-lg:pl-14" },
  { id: "admin", parent: "root", lg: "lg:col-start-3 lg:row-start-2", order: 4, indent: "max-lg:pl-6" },
  { id: "admin-team", parent: "admin", lg: "lg:col-start-3 lg:row-start-4", order: 5, indent: "max-lg:pl-14" },
  { id: "supplier", parent: "root", lg: "lg:col-start-4 lg:col-span-3 lg:row-start-2", order: 6, indent: "max-lg:pl-6" },
  { id: "track-manufacturer", parent: "supplier", lg: "lg:col-start-4 lg:row-start-3", order: 7, indent: "max-lg:pl-14" },
  { id: "manufacturer", parent: "track-manufacturer", lg: "lg:col-start-4 lg:row-start-4", order: 8, indent: "max-lg:pl-[5.5rem]" },
  { id: "track-researcher", parent: "supplier", lg: "lg:col-start-5 lg:col-span-2 lg:row-start-3", order: 9, indent: "max-lg:pl-14" },
  { id: "cro", parent: "track-researcher", lg: "lg:col-start-5 lg:row-start-4", order: 10, indent: "max-lg:pl-[5.5rem]" },
  { id: "scientist", parent: "track-researcher", lg: "lg:col-start-6 lg:row-start-4", order: 11, indent: "max-lg:pl-[5.5rem]" },
]
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
const edges = nodes.filter((n) => n.parent).map((n) => [n.parent!, n.id] as const)
// draw level by level: portals, then tracks/modules, then cards
const depth = (id: string): number => (byId[id].parent ? 1 + depth(byId[id].parent!) : 0)
const drawOrder = [...edges].sort((a, b) => depth(a[1]) - depth(b[1]) || byId[a[1]].order - byId[b[1]].order)
const team = new Set(["admin", "admin-team"])

const portalStyle = {
  customer: { name: "Customer Portal", icon: Users, tint: "#ece9fd", ink: "#6e62e5" },
  admin: { name: "Business & Admin Portal", icon: Cog, tint: "#f2ece3", ink: "#6b7f7c" },
  supplier: { name: "Supplier Portal", icon: FlaskConical, tint: "#e4f1eb", ink: "#02594e" },
}
const areaIcon: Record<string, LucideIcon> = { cvp: LayoutGrid, manufacturer: Factory, cro: Microscope, scientist: Beaker }
const SEG = 420

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
      const rc = (id: string) => refs.current[id]!.getBoundingClientRect()
      const lg = Math.abs(rc("customer").top - rc("supplier").top) < 4
      setPaths(
        drawOrder.map(([from, to]) => {
          const a = rc(from)
          const z = rc(to)
          if (lg) {
            const x1 = (a.left + a.right) / 2 - b.left
            const y1 = a.bottom - b.top
            const x2 = (z.left + z.right) / 2 - b.left
            const y2 = z.top - b.top
            if (Math.abs(x1 - x2) < 3) return `M${x1},${y1} L${x2},${y2}`
            // elbow just above the child so siblings share one horizontal bus
            const my = y2 - Math.min(26, (y2 - y1) / 2)
            const r = Math.min(14, Math.abs(x2 - x1) / 2, (my - y1) / 2)
            const d = x2 > x1 ? 1 : -1
            return `M${x1},${y1} L${x1},${my - r} Q${x1},${my} ${x1 + d * r},${my} L${x2 - d * r},${my} Q${x2},${my} ${x2},${my + r} L${x2},${y2}`
          }
          const x1 = a.left - b.left + 18
          const y1 = a.bottom - b.top
          const y2 = (z.top + z.bottom) / 2 - b.top
          const x2 = z.left - b.left
          return `M${x1},${y1} L${x1},${y2 - 10} Q${x1},${y2} ${x1 + 10},${y2} L${x2},${y2}`
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

  const edgeAt = (i: number) => (instant ? 0 : 300 + i * SEG)
  const popAt = (id: string) => (instant || id === "root" ? 0 : edgeAt(drawOrder.findIndex(([, t]) => t === id)) + SEG - 100)
  const pop = (id: string) =>
    ({
      opacity: shown ? 1 : 0,
      scale: shown ? "1" : "0.88",
      transition: instant ? "none" : "opacity 380ms ease, scale 480ms cubic-bezier(.34,1.56,.64,1)",
      transitionDelay: `${popAt(id)}ms`,
    }) as React.CSSProperties
  const ref = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el
  }
  const cell = (id: string, extra?: string) => cn("relative min-w-0", byId[id].lg, byId[id].indent, extra)

  const Pill = ({ id, icon: Icon, label, sub, tint, ink, muted }: { id: string; icon: LucideIcon; label: string; sub?: string; tint: string; ink: string; muted?: boolean }) => (
    <div className={cell(id, "lg:flex lg:justify-center")} style={{ order: byId[id].order }}>
      <div ref={ref(id)} className="inline-block">
        <div style={pop(id)} className="inline-flex items-center gap-2 py-1 pr-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full" style={{ background: tint, color: ink }}>
            <Icon className="size-4" strokeWidth={2} aria-hidden />
          </span>
          <span className="leading-tight">
            {sub && <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: ink }}>{sub}</span>}
            <span className={cn("block text-[14.5px] font-semibold whitespace-nowrap", muted ? "text-soft" : "text-ink")}>{label}</span>
          </span>
        </div>
      </div>
    </div>
  )

  const AreaCard = ({ a }: { a: Area }) => {
    const Icon = areaIcon[a.slug] ?? Users
    const p = portalStyle[a.portal as "customer" | "supplier"]
    return (
      <div className={cell(a.slug)} style={{ order: byId[a.slug].order }}>
        <div ref={ref(a.slug)} className="h-full">
          <Link
            href={`/work/scinode/${a.slug}`}
            style={pop(a.slug)}
            className="group relative flex h-full flex-col rounded-[16px] border border-brand/25 bg-white p-3.5 shadow-[0_14px_30px_-24px_rgba(16,24,40,0.45)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_22px_44px_-24px_rgba(2,89,78,0.5)]"
          >
            <ArrowUpRight className="absolute top-3 right-3 size-4 text-soft transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
            <span className="grid size-8 place-items-center rounded-[10px]" style={{ background: p.tint, color: p.ink }}>
              <Icon className="size-4" strokeWidth={2} aria-hidden />
            </span>
            <span className="mt-2.5 block text-[10px] font-semibold tracking-[0.1em] uppercase" style={{ color: p.ink }}>
              {a.kind}
            </span>
            <span className="mt-0.5 block font-heading text-[18px] leading-tight font-semibold text-ink">{a.name}</span>
            <span className="mt-1.5 block text-[12.5px] leading-snug text-body">{a.audience}</span>
            <span className="mt-auto flex flex-wrap gap-1 pt-2.5">
              {a.tbc ? (
                <span className="rounded-full bg-[#ece9fd] px-2 py-0.5 text-[10.5px] font-semibold text-[#5b4fd1]">Content to come</span>
              ) : (
                a.modules.map((m) => (
                  <span key={m.slug} className="rounded-full bg-[#e4f1eb] px-2 py-0.5 text-[10.5px] font-medium text-brand">
                    {m.name.replace(/ module$/, "").replace("Internal project management", "Project mgmt")}
                  </span>
                ))
              )}
            </span>
            <span className="mt-2.5 block border-t border-line pt-2 text-[11px] font-semibold text-brand">● Designed by me</span>
          </Link>
        </div>
      </div>
    )
  }

  // Customer portal: one card holding all its modules, so CVP clearly reads as part of the portal
  const CustomerModules = () => {
    const cvp = areas.find((x) => x.slug === "cvp")!
    const p = portalStyle.customer
    return (
      <div className={cell("customer-modules")} style={{ order: byId["customer-modules"].order }}>
        <div ref={ref("customer-modules")} className="h-full">
          <div style={pop("customer-modules")} className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[#6e62e5]/25 bg-white shadow-[0_14px_30px_-24px_rgba(16,24,40,0.45)]">
            <p className="flex items-center gap-2 border-b border-[#6e62e5]/15 bg-[#ece9fd]/60 px-3.5 py-2 text-[10.5px] font-semibold tracking-[0.12em] uppercase" style={{ color: p.ink }}>
              <Users className="size-3.5" strokeWidth={2.2} aria-hidden /> Customer portal modules
            </p>
            <div className="grid flex-1 sm:grid-cols-2">
              <Link href={`/work/scinode/${cvp.slug}`} className="group relative flex flex-col p-3.5 transition-colors hover:bg-[#f4faf7]">
                <ArrowUpRight className="absolute top-3 right-3 size-4 text-soft transition-[color,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
                <span className="grid size-8 place-items-center rounded-[10px]" style={{ background: p.tint, color: p.ink }}>
                  <LayoutGrid className="size-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="mt-2.5 block font-heading text-[18px] leading-tight font-semibold text-ink">{cvp.name}</span>
                <span className="mt-1.5 block text-[12.5px] leading-snug text-body">{cvp.audience}</span>
                <span className="mt-auto flex flex-wrap gap-1 pt-2.5">
                  {cvp.tbc && <span className="rounded-full bg-[#ece9fd] px-2 py-0.5 text-[10.5px] font-semibold text-[#5b4fd1]">Content to come</span>}
                </span>
                <span className="mt-2.5 block border-t border-line pt-2 text-[11px] font-semibold text-brand">● Designed by me</span>
              </Link>
              <div className="flex flex-col border-[#d6cbb9] p-3.5 max-sm:border-t max-sm:border-dashed sm:border-l sm:border-dashed">
                <span className="grid size-8 place-items-center rounded-[10px] border border-dashed border-[#d6cbb9] text-[#9aa3a1]">
                  <LayoutGrid className="size-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="mt-2.5 block font-heading text-[15px] leading-tight font-semibold text-[#8a9592]">{customerTeamModules}</span>
                <span className="mt-1.5 block text-[12.5px] leading-snug text-[#9aa3a1]">Designed by teammates. Shown for context.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const Ghost = ({ id, title }: { id: string; title: string }) => (
    <div className={cell(id)} style={{ order: byId[id].order }}>
      <div ref={ref(id)} className="h-full">
        <div style={pop(id)} className="h-full rounded-[16px] border border-dashed border-[#d6cbb9] p-3.5">
          <span className="block font-heading text-[15px] leading-tight font-semibold text-[#8a9592]">{title}</span>
          <span className="mt-1.5 block text-[12.5px] leading-snug text-[#9aa3a1]">Designed by teammates. Shown for context.</span>
        </div>
      </div>
    </div>
  )

  return (
    <div ref={wrap} className="relative">
      {size.w > 0 && paths.length === drawOrder.length && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size.w} ${size.h}`}>
          {/* grey (teammates) first so a shared trunk stays green */}
          {paths
            .map((d, i) => ({ d, i, grey: team.has(drawOrder[i][1]) }))
            .sort((x, y) => Number(y.grey) - Number(x.grey))
            .map(({ d, i, grey }) => (
              <g key={i} fill="none" strokeLinecap="round">
                <path d={d} stroke="#e2d9ca" strokeWidth={1.6} strokeDasharray="2 6" />
                <path
                  d={d}
                  stroke={grey ? "#c9c1b3" : "var(--brand)"}
                  strokeWidth={2.2}
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{ strokeDashoffset: shown ? 0 : 1, transition: instant ? "none" : `stroke-dashoffset ${SEG}ms cubic-bezier(.55,.1,.45,1) ${edgeAt(i)}ms` }}
                />
              </g>
            ))}
        </svg>
      )}

      <div className="relative flex flex-col gap-4 lg:grid lg:grid-cols-6 lg:gap-x-3 lg:gap-y-9">
        {/* root */}
        <div className={cell("root", "lg:flex lg:justify-center")} style={{ order: 0 }}>
          <div ref={ref("root")} className="inline-block">
            <div style={pop("root")} className="inline-flex items-center gap-3 rounded-full bg-brand py-2.5 pr-6 pl-2.5 text-white shadow-[0_18px_40px_-18px_rgba(2,89,78,0.8)]">
              <span className="grid size-9 place-items-center rounded-full bg-white/15 font-heading text-[14px] font-bold">S</span>
              <span>
                <span className="block font-heading text-[20px] leading-none font-semibold tracking-[-0.01em]">SCINODE</span>
                <span className="mt-1 block text-[12px] text-white/75">R&amp;D opportunity platform</span>
              </span>
            </div>
          </div>
        </div>

        {/* portals */}
        {(["customer", "admin", "supplier"] as const).map((k) => {
          const p = portalStyle[k]
          return <Pill key={k} id={k} icon={p.icon} label={p.name} tint={p.tint} ink={p.ink} muted={k === "admin"} />
        })}

        {/* supplier sign-up tracks */}
        {supplierTracks.map((t) => (
          <Pill
            key={t.key}
            id={`track-${t.key}`}
            icon={t.key === "manufacturer" ? Factory : GraduationCap}
            sub="Sign-up track"
            label={t.key === "manufacturer" ? "Manufacturer" : "Researcher"}
            tint="#e4f1eb"
            ink="#02594e"
          />
        ))}

        {/* her areas */}
        <CustomerModules />
        {areas
          .filter((a) => a.slug !== "cvp")
          .map((a) => (
          <AreaCard key={a.slug} a={a} />
        ))}

        {/* teammates' parts */}
        <Ghost id="admin-team" title="Orchestration & collaboration" />
      </div>
    </div>
  )
}
