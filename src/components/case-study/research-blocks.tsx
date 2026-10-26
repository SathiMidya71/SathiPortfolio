import { Source_Serif_4 } from "next/font/google"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Editorial serif for verbatim quotes
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["500", "600"] })

type InterviewsBlock = Extract<Block, { type: "interviews" }>
type QuotesBlock = Extract<Block, { type: "quotes" }>
type PerspectiveBlock = Extract<Block, { type: "perspective" }>

export function InterviewsView({ block }: { block: InterviewsBlock }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-line p-5 sm:flex-row sm:items-center sm:gap-6">
      <div className="shrink-0">
        <p className="font-heading text-[36px] leading-none font-semibold text-brand md:text-[44px]">{block.total}</p>
        <p className="mt-1 max-w-[180px] text-sm text-body">{block.totalLabel}</p>
      </div>
      <ul className="flex flex-wrap gap-2 sm:border-l sm:border-line sm:pl-6">
        {block.groups.map((g) => (
          <li key={g.label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink">
            {g.count && <span className="font-semibold text-brand">{g.count}</span>}
            {g.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function QuotesView({ block }: { block: QuotesBlock }) {
  // Two independent columns, right one offset, for a conversation-like stagger
  const cols = [block.items.filter((_, i) => i % 2 === 0), block.items.filter((_, i) => i % 2 === 1)]
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-start">
      {cols.map((col, c) => (
        <div key={c} className={cn("grid gap-4", c === 1 && "md:mt-14")}>
          {col.map((q) => (
            <blockquote key={q.quote} className="rounded-[18px] bg-white/80 p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-7">
              <p className={cn(serif.className, "text-[20px] leading-[1.45] font-semibold text-ink md:text-[22px]")}>
                “{q.quote}”
              </p>
              <footer className={cn(serif.className, "mt-3 text-base text-body")}>— {q.by}</footer>
            </blockquote>
          ))}
        </div>
      ))}
    </div>
  )
}

export function PerspectiveView({ block }: { block: PerspectiveBlock }) {
  return (
    <aside className="rounded-[20px] border-l-4 border-brand bg-white/70 p-6 md:p-7">
      <p className="text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">Stakeholder perspective</p>
      <p className="mt-1 font-heading text-xl font-semibold text-ink">{block.from}</p>
      <p className="mt-1 text-sm text-body">{block.context}</p>
      <ul className="mt-4 grid gap-3">
        {block.items.map((item) => (
          <li key={item} className={cn(serif.className, "text-lg leading-snug text-ink")}>
            “{item}”
          </li>
        ))}
      </ul>
    </aside>
  )
}

/* ---------------- Key findings (bento) ---------------- */

type FindingsBlock = Extract<Block, { type: "findings" }>
type Visual = NonNullable<FindingsBlock["items"][number]["visual"]>

const findingTones = [
  { stroke: "var(--tone-green)", soft: "#e4f1eb" },
  { stroke: "var(--tone-orange)", soft: "#fdeee0" },
  { stroke: "var(--tone-purple)", soft: "#eeecfd" },
  { stroke: "var(--tone-blue)", soft: "#e6f2fe" },
  { stroke: "var(--tone-green)", soft: "#e4f1eb" },
]

/** Small illustrative vignette for each finding. Decorative only. */
function FindingArt({ kind, color }: { kind: Visual; color: string }) {
  const ink = "var(--ink)"
  switch (kind) {
    case "distance":
      return (
        <svg viewBox="0 0 240 90" className="h-full w-full" aria-hidden>
          <rect x="150" y="14" width="74" height="58" rx="8" fill="#182230" />
          <text x="187" y="56" textAnchor="middle" fontSize="30" fontWeight="700" fill="#fff">17</text>
          <text x="160" y="28" fontSize="8" fill="#cbd5e1">PIP</text>
          <circle cx="26" cy="45" r="13" fill="#fff" stroke={ink} strokeWidth="1.5" />
          <path d="M18,45 q8,-8 16,0 q-8,8 -16,0 Z" fill="none" stroke={ink} strokeWidth="1.3" />
          <circle cx="26" cy="45" r="2.5" fill={color} />
          <line x1="46" x2="140" y1="45" y2="45" stroke={color} strokeWidth="2" strokeDasharray="4 5" />
          <path d="M134,40 l7,5 l-7,5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <rect x="72" y="58" width="44" height="18" rx="9" fill="#fff" stroke={ink} strokeWidth="1" />
          <text x="94" y="71" textAnchor="middle" fontSize="10" fontWeight="700" fill={ink}>10 ft</text>
        </svg>
      )
    case "alarm":
      return (
        <svg viewBox="0 0 240 90" className="h-full w-full" aria-hidden>
          {[34, 24].map((r) => (
            <circle key={r} cx="80" cy="45" r={r} fill={color} opacity={r === 34 ? 0.12 : 0.22} />
          ))}
          <path d="M66,56 h28 l-4,-6 v-10 a10,10 0 0 0 -20,0 v10 Z" fill="#fff" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="80" cy="60" r="3" fill={ink} />
          <path d="M50,30 q-6,15 0,30 M110,30 q6,15 0,30" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <rect x="138" y="30" width="86" height="30" rx="15" fill="#fff" stroke={ink} strokeWidth="1.2" />
          <path d="M152,41 h5 l6,-5 v18 l-6,-5 h-5 Z" fill={ink} />
          <path d="M168,39 l8,12 M176,39 l-8,12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <text x="184" y="49" fontSize="10" fontWeight="700" fill={ink}>Silence?</text>
        </svg>
      )
    case "waveform": {
      let fast = "M10,45"
      for (let x = 10; x < 120; x += 10) fast += ` l3,-18 l3,30 l4,-12`
      return (
        <svg viewBox="0 0 240 90" className="h-full w-full" aria-hidden>
          <path d={fast} fill="none" stroke={ink} strokeOpacity="0.45" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M128,45 l10,0" stroke={color} strokeWidth="2" />
          <path d="M134,40 l6,5 l-6,5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path
            d="M150,52 q8,-26 18,-2 t18,0 t18,0 t18,0"
            fill="none"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )
    }
    case "navigation":
      return (
        <svg viewBox="0 0 240 90" className="h-full w-full" aria-hidden>
          {["Menu", "Settings", "Alarms", "Limits"].map((label, i) => (
            <g key={label}>
              <rect x={8 + i * 58} y={30 + (i % 2) * 8} width="48" height="22" rx="11" fill="#fff" stroke={ink} strokeWidth="1.1" />
              <text x={32 + i * 58} y={45 + (i % 2) * 8} textAnchor="middle" fontSize="9" fontWeight="600" fill={ink}>
                {label}
              </text>
              {i < 3 && <path d={`M${58 + i * 58},${41 + (i % 2) * 8} l6,${i % 2 ? -4 : 4}`} stroke={color} strokeWidth="1.8" strokeLinecap="round" />}
            </g>
          ))}
          <circle cx="226" cy="20" r="9" fill={color} opacity="0.2" />
          <text x="226" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>?</text>
        </svg>
      )
    case "settings":
      return (
        <svg viewBox="0 0 240 90" className="h-full w-full" aria-hidden>
          {[0, 1].map((i) => (
            <g key={i}>
              <text x="14" y={34 + i * 30} fontSize="9" fontWeight="600" fill={ink}>{i ? "FiO2" : "PEEP"}</text>
              <rect x="50" y={27 + i * 30} width="150" height="8" rx="4" fill="#fff" stroke={ink} strokeWidth="1" />
              <rect x="50" y={27 + i * 30} width={i ? 64 : 104} height="8" rx="4" fill={color} />
              <circle cx={i ? 114 : 154} cy={31 + i * 30} r="7" fill="#fff" stroke={ink} strokeWidth="1.4" />
            </g>
          ))}
          <path d="M218,22 l-8,14 h8 l-6,14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
  }
}

export function FindingsView({ block }: { block: FindingsBlock }) {
  // Bento grid drawn with separator lines only: the 1px gaps show the line colour, cells use the
  // page colour, and there is no outer container. Static content, nothing reads as clickable.
  const n = block.items.length
  const lastRow = (i: number) => (n > 2 ? i >= 2 : true)
  return (
    <ol className="grid gap-px bg-line md:grid-cols-6">
      {block.items.map((f, i) => {
        const tone = findingTones[i % findingTones.length]
        return (
          <li
            key={f.title}
            className={cn(
              "flex flex-col bg-cream py-7",
              i === 0 && "pt-0",
              i === n - 1 && "pb-0",
              i < 2 ? "md:col-span-3" : "md:col-span-2",
              // inner padding only, so the outer edges stay flush with the page text
              "md:px-7",
              (i === 0 || i === 2) && "md:pl-0",
              (i === 1 || i === n - 1) && "md:pr-0",
              i < 2 ? "md:pt-0" : "md:pt-7",
              lastRow(i) ? "md:pb-0" : "md:pb-7"
            )}
          >
            {f.visual && (
              <div className="relative h-28 rounded-[14px] py-3 pr-4 pl-12" style={{ background: tone.soft }}>
                <FindingArt kind={f.visual} color={tone.stroke} />
                <span
                  className="absolute top-3 left-3 grid size-7 place-items-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: tone.stroke }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            )}
            <h4 className="mt-5 text-[17px] leading-snug font-semibold text-ink">{f.title}</h4>
            <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-body">{f.text}</p>
            <dl className="mt-4 grid gap-1 border-t border-dashed border-line pt-3 text-[13px] leading-snug">
              {f.source && (
                <div className="flex gap-1.5">
                  <dt className="shrink-0 text-soft">Heard from:</dt>
                  <dd className="text-body">{f.source.split(", ").join(" · ")}</dd>
                </div>
              )}
              {f.principle && (
                <div className="flex gap-1.5">
                  <dt className="shrink-0 text-soft">Shaped:</dt>
                  <dd className="font-semibold text-ink">{f.principle}</dd>
                </div>
              )}
            </dl>
          </li>
        )
      })}
    </ol>
  )
}
