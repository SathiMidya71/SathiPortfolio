import { Atom, FileText, FlaskConical, History, House, ScrollText, Sparkles, Waypoints, type LucideIcon } from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"
import { DrUserFlow } from "./diagrams"
import { inter } from "./fonts"

// Presentation-style blocks for Deep Research, modelled on Sathi's reference boards:
// a problem / solution split, a pill-and-connector product journey, and a colour stage.

type B<T extends Block["type"]> = Extract<Block, { type: T }>

const purple = "#B79CEC"
const onPurple = "#2B2150"
// Boards sit straight on the page background (no tinted container)
const stage = "transparent"

/* ---------------- Problem and solution ---------------- */

/** Glossy hexagon (a benzene ring), drawn in SVG. */
function GlossyRing({ id }: { id: string }) {
  const pts = Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k - Math.PI / 2
    return `${150 + 112 * Math.cos(a)},${150 + 112 * Math.sin(a)}`
  }).join(" ")
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2d6fa" />
          <stop offset="0.45" stopColor={purple} />
          <stop offset="1" stopColor="#8a6cd4" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-core`} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e4e2ef" />
        </radialGradient>
      </defs>
      <polygon points={pts} fill="none" stroke={`url(#${id}-body)`} strokeWidth="46" strokeLinejoin="round" />
      <polygon points={pts} fill="none" stroke={`url(#${id}-shine)`} strokeWidth="18" strokeLinejoin="round" transform="translate(-4 -6)" />
      <circle cx="150" cy="150" r="62" fill={`url(#${id}-core)`} />
    </svg>
  )
}

export function ProblemSolutionView({ block }: { block: B<"problemSolution"> }) {
  return (
    <div className="relative overflow-hidden py-4 md:py-6" style={{ background: stage }}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_200px_minmax(0,1fr)] lg:items-center lg:gap-8">
        {/* Problem */}
        <div>
          <p className="flex items-center gap-2.5 font-heading text-[26px] font-semibold text-ink">
            <span className="size-3 rounded-full bg-soft" aria-hidden /> Problem
          </p>
          <p className="mt-3 max-w-[380px] text-[16px] leading-relaxed text-body">{block.problem.text}</p>
          <ol className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 md:mt-8 md:gap-7">
            {block.problem.items.map((it) => (
              <li key={it.big}>
                <p className="font-heading text-[26px] leading-none font-normal tracking-[-0.03em] whitespace-nowrap text-ink md:text-[34px] xl:text-[40px]">{it.big}</p>
                <p className="mt-2 max-w-[360px] text-[15.5px] leading-relaxed text-body">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Centre: sharp on the problem side, blurred on the solution side */}
        <div className="relative mx-auto aspect-square w-[180px] lg:w-[200px]" aria-hidden>
          <div className="absolute inset-0 [clip-path:inset(0_50%_0_0)]">
            <GlossyRing id="ring-a" />
          </div>
          <div className="absolute inset-0 blur-[10px] [clip-path:inset(-20%_-20%_-20%_50%)]">
            <GlossyRing id="ring-b" />
          </div>
        </div>

        {/* Solution */}
        <div className="flex flex-col items-center text-center lg:items-center">
          <div className="relative">
            <span className="grid size-24 place-items-center rounded-[26px] text-[#2B2150] shadow-[0_18px_40px_-14px_rgba(120,90,200,0.55)]" style={{ background: `linear-gradient(145deg,#d9caf7,${purple} 55%,#9b7fe0)` }}>
              <FlaskConical className="size-11" strokeWidth={1.8} aria-hidden />
            </span>
            <span className="absolute -top-2 -right-2 grid size-8 place-items-center rounded-full bg-[var(--tone-orange)] text-[13px] font-bold text-white ring-4 ring-[#f4f2f6]">
              <Sparkles className="size-4" aria-hidden />
            </span>
          </div>
          <p className="mt-7 flex items-center gap-2.5 font-heading text-[26px] font-semibold text-ink">
            <span className="size-3 rounded-full" style={{ background: purple }} aria-hidden /> Solution
          </p>
          <p className="mt-3 max-w-[400px] text-[16px] leading-relaxed text-body">{block.solution.text}</p>
          <ul className="mt-7 flex max-w-[420px] flex-wrap justify-center gap-2">
            {block.solution.chips.map((c, i) => (
              <li
                key={c}
                className={cn(
                  "rounded-full px-4 py-2 text-[14px] font-medium",
                  i === 0 ? "text-[#2B2150]" : "bg-white text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
                )}
                style={i === 0 ? { background: purple } : undefined}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Product journey (pill nodes + connectors) ---------------- */

type Pill = { label: string; icon?: LucideIcon; y: number; kind?: "active" | "plain" | "tint" }

const col1: Pill[] = [
  { label: "Research Home", icon: House, y: 250, kind: "active" },
  { label: "History", icon: History, y: 350 },
]
const col2: Pill[] = [
  { label: "Ask a question", icon: Sparkles, y: 110, kind: "active" },
  { label: "Generate Routes", icon: Waypoints, y: 205 },
  { label: "Literature", icon: FileText, y: 300 },
  { label: "Patents & Prior Art", icon: ScrollText, y: 395 },
  { label: "Molecule Builder", icon: Atom, y: 490 },
]
const col3: Pill[] = [
  { label: "Resolve molecule", y: 92, kind: "tint" },
  { label: "Compare routes", y: 175, kind: "tint" },
  { label: "Modify path", y: 258, kind: "tint" },
  { label: "Scale quantities", y: 341, kind: "tint" },
  { label: "Sources & evidence", y: 424, kind: "tint" },
  { label: "Save to Research Vault", y: 507, kind: "tint" },
]

const MID = 300
const H = 56

function PillNode({ p, x, w }: { p: Pill; x: number; w: number }) {
  const fill = p.kind === "active" ? purple : p.kind === "tint" ? "#f3eefc" : "#f6f5f8"
  const stroke = p.kind === "active" ? "none" : p.kind === "tint" ? "#d6c6f5" : "#d9d7e0"
  const color = p.kind === "active" ? onPurple : "#171717"
  const textW = p.label.length * 9.9 + (p.icon ? 30 : 0)
  const tx = x + (w - textW) / 2
  return (
    <g>
      <rect x={x} y={p.y - H / 2} width={w} height={H} rx={H / 2} fill={fill} stroke={stroke} strokeWidth={1.4} />
      {p.icon && <p.icon x={tx} y={p.y - 10} width={20} height={20} color={color} strokeWidth={1.8} />}
      <text x={tx + (p.icon ? 30 : 0)} y={p.y + 6.5} fontSize={18} fontWeight={500} fill={color}>
        {p.label}
      </text>
    </g>
  )
}

/** Rounded elbow from a bus at busX (on the middle line) to a pill edge at (x, y). */
function elbow(busX: number, x: number, y: number, r = 14) {
  if (Math.abs(y - MID) < 1) return `M${busX},${MID} H${x}`
  const dir = y < MID ? -1 : 1
  return `M${busX},${MID} V${y - dir * r} Q${busX},${y} ${busX + (x > busX ? r : -r)},${y} H${x}`
}

export function DrJourneyMap() {
  const c1 = { x: 186, w: 200 }
  const c2 = { x: 482, w: 226 }
  const c3 = { x: 798, w: 236 }
  const dots = [134, 432, 752]
  return (
    <figure className="overflow-hidden py-4 md:py-6" style={{ background: stage }}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end">
        <div>
          <span className="inline-block rounded-full px-3.5 py-1.5 text-[13px] font-medium" style={{ background: purple, color: onPurple }}>
            Product journey
          </span>
          <p className="mt-5 font-heading text-[32px] leading-none font-normal tracking-[-0.03em] text-ink md:text-[56px]">User flow</p>
        </div>
        <figcaption className="text-[16px] leading-relaxed text-body md:text-[17px]">
          Conversation first. One question opens the investigation, quick actions jump straight into a scientific workflow, and every path ends in evidence and the Research Vault.
        </figcaption>
      </div>

      {/* Desktop diagram */}
      <svg viewBox="0 0 1040 600" className={cn(inter.className, "mt-10 hidden h-auto w-full md:block")} role="img" aria-label="User flow: Research Home or History, then ask a question or use a quick action (Generate Routes, Literature, Patents and Prior Art, Molecule Builder), leading to resolve molecule, compare routes, modify path, scale quantities, sources and evidence, and save to Research Vault">
        {/* faint circuit pattern */}
        <g stroke="#B79CEC" strokeOpacity="0.06" strokeWidth="1.5" fill="none">
          <path d="M0,80 H120 l40,40 H300 M0,520 H110 l50,-50 H280 M720,40 v60 l40,40 M1040,575 H930 l-40,-40" />
          <circle cx="330" cy="120" r="10" />
          <circle cx="300" cy="470" r="10" />
          <circle cx="920" cy="140" r="10" />
          <circle cx="1080" cy="520" r="10" />
        </g>
        <g stroke="#c9c6d3" strokeWidth="1.6" fill="none">
          {/* start → dot */}
          <line x1={84} y1={MID} x2={dots[0]} y2={MID} />
          {/* dot → col1 → dot */}
          {col1.map((p) => (
            <g key={p.label}>
              <path d={elbow(dots[0] + 28, c1.x, p.y)} />
              <path d={elbow(c1.x + c1.w + 18, c1.x + c1.w, p.y)} />
            </g>
          ))}
          <line x1={dots[0]} x2={dots[0] + 28} y1={MID} y2={MID} />
          <line x1={c1.x + c1.w + 18} x2={dots[1]} y1={MID} y2={MID} />
          {/* dot → col2 → dot */}
          {col2.map((p) => (
            <g key={p.label}>
              <path d={elbow(dots[1] + 30, c2.x, p.y)} />
              <path d={elbow(c2.x + c2.w + 20, c2.x + c2.w, p.y)} />
            </g>
          ))}
          <line x1={dots[1]} x2={dots[1] + 30} y1={MID} y2={MID} />
          <line x1={c2.x + c2.w + 20} x2={dots[2]} y1={MID} y2={MID} />
          {/* dot → col3 */}
          {col3.map((p) => (
            <path key={p.label} d={elbow(dots[2] + 30, c3.x, p.y)} />
          ))}
          <line x1={dots[2]} x2={dots[2] + 30} y1={MID} y2={MID} />
        </g>
        {dots.map((x) => (
          <circle key={x} cx={x} cy={MID} r={8} fill="#171717" />
        ))}
        {/* start mark */}
        <circle cx={44} cy={MID} r={36} fill="#171717" />
        <FlaskConical x={26} y={MID - 18} width={36} height={36} color="#fff" strokeWidth={1.8} />
        <circle cx={82} cy={MID} r={6} fill="#171717" />
        {col1.map((p) => (
          <PillNode key={p.label} p={p} x={c1.x} w={c1.w} />
        ))}
        {col2.map((p) => (
          <PillNode key={p.label} p={p} x={c2.x} w={c2.w} />
        ))}
        {col3.map((p) => (
          <PillNode key={p.label} p={p} x={c3.x} w={c3.w} />
        ))}
      </svg>

      {/* Phone: the same flow as stacked lanes */}
      <div className="mt-8 md:hidden">
        <DrUserFlow />
      </div>
    </figure>
  )
}

/* ---------------- Colour stage ---------------- */

const toneVar = { green: "var(--tone-green)", purple, blue: "var(--tone-blue)", orange: "var(--tone-orange)" }

export function ColorStageView({ block }: { block: B<"palette"> }) {
  const colour = (c: (typeof block.items)[number]) => c.hex ?? (c.tone ? toneVar[c.tone] : "#ccc")
  // Large swatches: the featured colours (in order); small dots: the rest
  const order = block.items.filter((c) => c.featured).slice(0, 4)
  const neutrals = block.items.filter((c) => !order.includes(c))
  const sizes = ["34%", "22%", "26%", "18%"]

  return (
    <div className={cn(inter.className, "relative overflow-hidden rounded-[28px] px-5 pt-10 sm:px-10 md:pt-14")} style={{ background: stage }}>
      <div className="relative z-10 grid gap-5 md:ml-[38%]">
        <p className="font-heading text-[34px] leading-none font-normal tracking-[-0.03em] text-[#555] md:text-[64px]">Colour</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="flex shrink-0 items-center gap-1 self-start rounded-full bg-white/70 p-1 shadow-sm">
            {neutrals.map((c) => (
              <span key={c.name} title={`${c.name} ${c.hex ?? ""}`} className="size-6 rounded-full ring-1 ring-black/10" style={{ background: colour(c) }} />
            ))}
            {order.map((c) => (
              <span key={c.name} title={c.name} className="size-6 rounded-full" style={{ background: colour(c) }} />
            ))}
          </span>
          {block.intro && <p className="text-[16px] leading-relaxed text-[#6B6B6B] md:text-[17px]">{block.intro}</p>}
        </div>
      </div>

      {/* concentric half circles */}
      <div className="relative mt-10 md:mt-6">
        <div aria-hidden className="absolute bottom-0 left-1/2 aspect-square w-[118%] -translate-x-1/2 translate-y-1/2 rounded-full border-[40px] border-white/60 md:w-[78%] md:border-[70px]" />
        <div aria-hidden className="absolute bottom-0 left-1/2 aspect-square w-[40%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,#f8dccb_0%,transparent_70%)] opacity-70" />
        <ul className="relative flex items-end justify-center gap-2 pt-20 pb-8 sm:gap-4 md:pt-24 md:pb-12">
          {order.map((c, i) => (
            <li key={c.name} className="flex flex-col items-start gap-2" style={{ width: sizes[i] }}>
              <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-medium whitespace-nowrap text-[#171717] shadow-sm sm:px-3 sm:py-1.5 sm:text-[14px]">
                {c.hex ?? c.name}
              </span>
              <span className="block aspect-square w-full rounded-[22%] shadow-[0_18px_40px_-20px_rgba(23,23,23,0.45)]" style={{ background: colour(c) }} />
            </li>
          ))}
        </ul>
      </div>

      {/* what each colour does */}
      <dl className="relative -mx-5 grid bg-white/80 sm:-mx-10 sm:grid-cols-2 lg:grid-cols-4">
        {[...order, ...neutrals].map((c) => (
          <div key={c.name} className="flex gap-3 border-t border-black/[0.05] px-5 py-4 sm:px-6">
            <span className="mt-0.5 size-4 shrink-0 rounded-[5px] ring-1 ring-black/10" style={{ background: colour(c) }} />
            <div>
              <dt className="text-[13px] font-semibold text-[#171717]">{c.name}</dt>
              <dd className="font-mono text-[12px] text-[#6B6B6B]">{c.hex ?? "Hex to confirm"}</dd>
              <dd className="mt-0.5 text-[12.5px] leading-snug text-[#6B6B6B]">{c.use}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
