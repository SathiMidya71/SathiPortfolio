import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { pmCosting, pmEveryStage, pmExperiment, pmImpact, pmLanes, pmStages } from "@/lib/scinode-pm"
import { cn } from "@/lib/utils"

// Success metrics: what Sathi delivered (text, left and right) beside analytical tiles (centre, 2×2),
// after a "success metrics" slide reference, in the site greens. Every chart figure is counted from the designed flows
// (pmCosting, pmExperiment, pmStages), not invented; the product manager's target sits under each.

const ink = { d: "#1F392D", m: "#02594e", a: "#3f8f7f", l: "#93c4b4" }
const ramp = [ink.d, ink.m, ink.a, ink.l]
const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties
const axis = { fontSize: 9, fill: "#6b7f7c" } as const

const short: Record<string, string> = {
  "Super admin": "Super admin",
  "Project manager": "Project mgr",
  "Group leader": "Group leader",
  "Procurement head": "Procurement",
}

/** Steps each role owns across both phases (costing 1–8, experiment 9–21). */
function StepsPerRole() {
  const steps = [...pmCosting.map((s) => s.lane), ...pmExperiment.filter((s) => s.n).map((s) => s.lane)]
  const roles = ["Group leader", "Super admin", "Project manager", "Procurement head"] as const
  const counts = roles.map((r) => steps.filter((l) => l === r).length)
  const max = 12
  const x0 = 22
  const w = 196
  const bw = 30
  const gap = (w - bw * roles.length) / roles.length
  const y = (v: number) => 90 - (v / max) * 78
  return (
    <svg viewBox="0 0 220 116" className="w-full" aria-hidden>
      {[0, 4, 8, 12].map((v) => (
        <g key={v}>
          <line x1={x0} x2={218} y1={y(v)} y2={y(v)} stroke="#c3dcd1" strokeWidth="0.75" strokeDasharray={v ? "2 3" : undefined} />
          <text x={x0 - 6} y={y(v) + 3} textAnchor="end" {...axis}>
            {v}
          </text>
        </g>
      ))}
      {counts.map((c, i) => {
        const x = x0 + gap / 2 + i * (bw + gap)
        return (
          <g key={roles[i]} data-fl="node" style={at(250 + i * 120)}>
            <rect x={x} y={y(c)} width={bw} height={90 - y(c)} rx="4" fill={ramp[i]} />
            <text x={x + bw / 2} y={y(c) - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={ink.d}>
              {c}
            </text>
            {short[roles[i]].split(" ").map((w, k) => (
              <text key={w} x={x + bw / 2} y={102 + k * 9} textAnchor="middle" {...axis}>
                {w}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

/** The 8 costing steps as a relay between the 4 roles. */
function CostingRelay() {
  const rows = [...pmLanes]
  const x = (i: number) => 52 + i * 23.5
  const y = (lane: string) => 14 + rows.indexOf(lane as (typeof rows)[number]) * 24
  const pts = pmCosting.map((s, i) => `${x(i)},${y(s.lane)}`).join(" ")
  return (
    <svg viewBox="0 0 220 112" className="w-full" aria-hidden>
      {rows.map((r) => (
        <g key={r}>
          <line x1="48" x2="218" y1={y(r)} y2={y(r)} stroke="#c3dcd1" strokeWidth="0.75" strokeDasharray="2 3" />
          <text x="44" y={y(r) + 3} textAnchor="end" {...axis}>
            {short[r]}
          </text>
        </g>
      ))}
      <polyline data-fl="edge" style={at(300)} pathLength={1} strokeDasharray="1" points={pts} fill="none" stroke={ink.a} strokeWidth="1.6" strokeLinejoin="round" />
      {pmCosting.map((s, i) => (
        <g key={i} data-fl="node" style={at(300 + i * 90)}>
          <circle cx={x(i)} cy={y(s.lane)} r="5" fill={i === pmCosting.length - 1 ? ink.d : ink.m} stroke="#e4f1eb" strokeWidth="1.5" />
          <text x={x(i)} y="108" textAnchor="middle" {...axis}>
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  )
}

/** Every stage shares the same four features: a 6 × 4 matrix, all filled. */
function StageMatrix() {
  const stageShort = ["Costing", "Lab", "Optim.", "Valid.", "Pilot", "Close"]
  const featShort = ["Remarks", "Files", "History", "Assignee"]
  const cw = 24
  const ch = 17
  const x0 = 58
  return (
    <svg viewBox="0 0 220 112" className="w-full" aria-hidden>
      {featShort.map((f, r) => (
        <text key={f} x={x0 - 6} y={8 + r * (ch + 4) + ch / 2 + 3} textAnchor="end" {...axis}>
          {f}
        </text>
      ))}
      {pmStages.map((st, c) =>
        pmEveryStage.map((_, r) => (
          <rect
            key={`${c}-${r}`}
            data-fl="node"
            style={at(250 + (c * 4 + r) * 30)}
            x={x0 + c * (cw + 3)}
            y={8 + r * (ch + 4)}
            width={cw}
            height={ch}
            rx="3.5"
            fill={ramp[r]}
          >
            <title>{`${st.name}: ${pmEveryStage[r]}`}</title>
          </rect>
        ))
      )}
      {stageShort.map((s, c) => (
        <text key={s} x={x0 + c * (cw + 3) + cw / 2} y="104" textAnchor="middle" fontSize="8" fill="#6b7f7c">
          {s}
        </text>
      ))}
    </svg>
  )
}

/** The three approval gates of phase 2 as a segmented gauge, needle at "all on record". */
function GateGauge() {
  const gates = pmExperiment.filter((s) => s.gate)
  const names = ["Feasibility", "Optimisation", "Validation"]
  const cx = 110
  const cy = 92
  const R = 70
  const r = 40
  const seg = (k: number, n: number) => {
    const a0 = Math.PI + (k / n) * Math.PI + 0.02
    const a1 = Math.PI + ((k + 1) / n) * Math.PI - 0.02
    const p = (a: number, rad: number) => `${cx + rad * Math.cos(a)} ${cy + rad * Math.sin(a)}`
    return `M${p(a0, R)} A${R} ${R} 0 0 1 ${p(a1, R)} L${p(a1, r)} A${r} ${r} 0 0 0 ${p(a0, r)} Z`
  }
  return (
    <svg viewBox="0 0 220 112" className="w-full" aria-hidden>
      {gates.map((g, k) => (
        <g key={g.n} data-fl="node" style={at(250 + k * 160)}>
          <path d={seg(k, gates.length)} fill={[ink.d, ink.m, ink.a][k]} />
          <text
            x={cx + 55 * Math.cos(Math.PI + ((k + 0.5) / gates.length) * Math.PI)}
            y={cy + 55 * Math.sin(Math.PI + ((k + 0.5) / gates.length) * Math.PI) + 3}
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="700"
            fill="#fff"
          >
            {k + 1}
          </text>
          <text
            x={cx + 76 * Math.cos(Math.PI + ((k + 0.5) / gates.length) * Math.PI)}
            y={cy + 76 * Math.sin(Math.PI + ((k + 0.5) / gates.length) * Math.PI) + (k === 1 ? -2 : 3)}
            textAnchor={k === 0 ? "end" : k === 2 ? "start" : "middle"}
            {...axis}
          >
            {names[k]}
          </text>
        </g>
      ))}
      <g data-fl="node" style={at(800)}>
        <line x1={cx} y1={cy} x2={cx + 62} y2={cy - 6} stroke="#1F392D" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="6" fill="#1F392D" />
      </g>
    </svg>
  )
}

const tiles = {
  workspace: { label: "Steps mapped per role", big: "21", unit: "steps · 4 roles", Chart: StepsPerRole },
  costing: { label: "Paper-costing relay", big: "8", unit: "hand-offs · 1 flow", Chart: CostingRelay },
  template: { label: "Shared in every stage", big: "6 × 4", unit: "stages × features", Chart: StageMatrix },
  approvals: { label: "Approval gates", big: "3", unit: "gates · remarks on all", Chart: GateGauge },
} as const

export function SuccessMetrics() {
  // lg layout: text | tile | tile | text, two rows, like the reference slide
  const place = [
    { text: "lg:col-start-1 lg:row-start-1 lg:text-right", tile: "lg:col-start-2 lg:row-start-1" },
    { text: "lg:col-start-4 lg:row-start-1", tile: "lg:col-start-3 lg:row-start-1" },
    { text: "lg:col-start-1 lg:row-start-2 lg:text-right", tile: "lg:col-start-2 lg:row-start-2" },
    { text: "lg:col-start-4 lg:row-start-2", tile: "lg:col-start-3 lg:row-start-2" },
  ]
  return (
    <FlowReveal className="grid gap-5">
      <div className="grid items-center gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,0.95fr)] lg:gap-y-4">
        {pmImpact.map((d, i) => {
          const t = tiles[d.key]
          return [
            <div key={`${d.key}-text`} className={cn("max-md:mt-4", place[i].text)} data-fl="label" style={at(150 + i * 120)}>
              <h3 className="font-heading text-[17px] leading-tight font-semibold text-ink">{d.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-snug text-body">{d.text}</p>
            </div>,
            <figure
              key={`${d.key}-tile`}
              data-fl="node"
              style={at(i * 120)}
              className={cn("flex flex-col rounded-[18px] bg-[#e4f1eb] p-4", place[i].tile)}
            >
              <figcaption className="flex items-baseline justify-between gap-2">
                <span className="text-[10.5px] font-semibold tracking-[0.1em] text-brand uppercase">{t.label}</span>
              </figcaption>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="font-heading text-[30px] leading-none font-semibold text-[#1F392D]">{t.big}</span>
                <span className="text-[11.5px] text-brand">{t.unit}</span>
              </p>
              <div className="mt-3">
                <t.Chart />
              </div>
              <p className="mt-3 flex items-baseline gap-1.5 rounded-[10px] bg-white/80 px-2.5 py-1.5 text-[11.5px] leading-snug text-body">
                <span className="shrink-0 font-semibold text-[#1F392D]">Target {d.target.value}</span>
                <span>{d.target.label}</span>
              </p>
            </figure>,
          ]
        })}
      </div>
      <p className="text-[12.5px] text-soft">
        Figures in the tiles are counted from the designed flows. Targets were set by the product manager and are not results yet.
      </p>
    </FlowReveal>
  )
}
