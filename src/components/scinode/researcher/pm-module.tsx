import { ArrowLeftRight, ArrowRight, Check, EyeOff, LayoutDashboard, Link2, Mails, Minus, Unlink, Users, Workflow } from "lucide-react"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { FilmStage } from "@/components/scinode/researcher/film-stage"
import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { SuccessMetrics } from "@/components/scinode/researcher/success-metrics"
import { ScreenGallery } from "@/components/scinode/researcher/screen-gallery"
import {
  pmActions,
  pmContext,
  pmCosting,
  pmDecisions,
  pmExperiment,
  pmExperimentPhases,
  pmFacts,
  pmLanes,
  pmProblems,
  pmRoles,
  pmScreens,
  pmSurfaces,
} from "@/lib/scinode-pm"
import { cn } from "@/lib/utils"

// Project management module page: the internal R&D project across three portals and six roles.
// Site palette only: leadership = deep green, admin portal = neutral sand, researchers = brand green.

export const pmSections = [
  { id: "context", label: "Context" },
  { id: "users", label: "Who uses it" },
  { id: "costing", label: "Paper costing" },
  { id: "stages", label: "Experiment flow" },
  { id: "decisions", label: "Key decisions" },
  { id: "walkthrough", label: "Key screens" },
  { id: "impact", label: "Success metrics" },
]

const tone = {
  lead: { ink: "#1F392D", tint: "#dfe8e3", label: "text-[#1F392D]" },
  admin: { ink: "#6b7f7c", tint: "#f2ece3", label: "text-[#56635f]" },
  res: { ink: "#02594e", tint: "#e4f1eb", label: "text-brand" },
} as const
const laneTone: Record<string, keyof typeof tone> = { "Super admin": "admin", "Project manager": "admin", "Group leader": "res", "Procurement head": "res" }

/** Build-in timing for the flowcharts (see FlowReveal): lanes first, then one step every `step` ms. */
const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties
const flowStart = 350

/** Context board: the scope in big numbers and each problem with its fix, on the hero's dark green grid. */
function ContextBoard() {
  const icons = [
    { before: Unlink, after: Link2 },
    { before: Mails, after: Workflow },
    { before: EyeOff, after: LayoutDashboard },
  ]
  return (
    <div
      className="relative overflow-hidden rounded-[24px] p-5 text-white sm:p-7"
      style={{
        backgroundColor: "#0f2c24",
        backgroundImage:
          "radial-gradient(60% 90% at 8% 0%, rgba(150,220,190,0.28), transparent 60%), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
      }}
    >
      <dl className="grid grid-cols-2 gap-y-5 md:grid-cols-4">
        {pmFacts.map((f, i) => (
          <div key={f.label} className={cn("pr-4", i > 0 && "md:border-l md:border-white/10 md:pl-6", i % 2 === 1 && "max-md:border-l max-md:border-white/10 max-md:pl-4")}>
            <dd
              className="font-heading text-[52px] leading-[0.9] font-semibold tracking-[-0.04em] md:text-[64px]"
              style={{ backgroundImage: "linear-gradient(180deg,#e6f7ef 0%,#8fd3b4 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              {f.n}
            </dd>
            <dt className="mt-2 text-[12px] font-semibold tracking-[0.12em] text-white/55 uppercase">{f.label}</dt>
          </div>
        ))}
      </dl>

      <ul className="mt-7 grid gap-3 md:grid-cols-3">
        {pmProblems.map((p, i) => {
          const { before: Before, after: After } = icons[i]
          return (
            <li key={p.title} className="flex flex-col rounded-[16px] bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur-sm">
              <span className="flex items-center gap-2" aria-hidden>
                <span className="grid size-9 place-items-center rounded-[10px] bg-[#A0583A]/25 text-[#f1b79c]">
                  <Before className="size-4" />
                </span>
                <ArrowRight className="size-3.5 text-white/40" />
                <span className="grid size-9 place-items-center rounded-[10px] bg-[#8fd3b4]/20 text-[#a8e6c9]">
                  <After className="size-4" />
                </span>
              </span>
              <p className="mt-3 text-[15.5px] font-semibold">{p.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-white/60">{p.text}</p>
              <p className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3 text-[13px] leading-snug font-medium text-[#a8e6c9]">
                <Check className="mt-0.5 size-3.5 shrink-0" strokeWidth={3} aria-hidden />
                {p.fix}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Surfaces() {
  return (
    <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_40px_1fr_40px_1fr]">
      {pmSurfaces.map((s, i) => {
        const t = tone[s.key]
        return (
          <div key={s.key} className="contents">
            <div className="rounded-[22px] p-5" style={{ background: t.tint }}>
              <p className={cn("text-[11.5px] font-semibold tracking-[0.12em] uppercase", t.label)}>Portal {i + 1}</p>
              <h3 className="mt-1 font-heading text-[19px] leading-tight font-semibold text-ink">{s.name}</h3>
              <p className="mt-1.5 text-[13.5px] leading-snug text-body">{s.job}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.roles.map((r) => (
                  <li key={r} className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[12.5px] font-semibold" style={{ color: t.ink }}>
                    <Users className="size-3.5" aria-hidden /> {r}
                  </li>
                ))}
              </ul>
            </div>
            {i < pmSurfaces.length - 1 && (
              <div className="grid place-items-center py-1 lg:py-0" aria-hidden>
                <span className="grid size-9 place-items-center rounded-full bg-brand text-white">
                  <ArrowLeftRight className="size-4 rotate-90 lg:rotate-0" />
                </span>
              </div>
            )}
          </div>
        )
      })}
      <p className="text-[12.5px] text-soft lg:col-span-5">Two-way sync: what admins approve and the lab updates shows up for leadership automatically.</p>
    </div>
  )
}

function AccessMatrix() {
  return (
    <div className="overflow-x-auto rounded-[20px] border border-line bg-white lg:overflow-visible">
      <table className="w-full min-w-[720px] table-fixed border-collapse text-left lg:min-w-0">
        <thead>
          <tr className="border-b border-line">
            <th className="w-[150px] px-4 py-3 text-[12px] font-semibold text-soft">Role</th>
            {pmActions.map((a) => (
              <th key={a} className="px-1 py-3 text-center text-[11.5px] leading-tight font-semibold text-soft">
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pmRoles.map((r) => {
            const t = tone[r.surface]
            return (
              <tr key={r.role} className="border-b border-line last:border-0">
                <td className="px-4 py-2.5 text-[13.5px] font-semibold text-ink">
                  <span className="mr-2 inline-block size-2.5 rounded-full align-middle" style={{ background: t.ink }} aria-hidden />
                  {r.role}
                </td>
                {r.cells.map((c, i) => (
                  <td key={i} className="px-1 py-2.5 text-center">
                    {c === 1 ? (
                      <span className="mx-auto grid size-6 place-items-center rounded-full text-white" style={{ background: t.ink }} aria-label="yes">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                    ) : c === 0.5 ? (
                      <span className="mx-auto grid size-6 place-items-center rounded-full border-2 text-[10px] font-bold" style={{ borderColor: t.ink, color: t.ink }} aria-label="limited">
                        ½
                      </span>
                    ) : (
                      <Minus className="mx-auto size-3.5 text-[#cfc6b8]" aria-label="no" />
                    )}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** Vertical swimlane of the paper-costing hand-off (md+): roles as columns, steps flowing down;
 *  a numbered list on phones. */
function CostingLanes() {
  const cols = [...pmLanes, "Leadership dashboard"]
  const W = 1000
  const colW = W / cols.length
  const head = 54
  const rowH = 62
  const nodeW = colW - 28
  const nodeH = 44
  const H = head + (pmCosting.length + 1) * rowH + 8
  const cx = (lane: string) => colW * cols.indexOf(lane) + colW / 2
  const pos = pmCosting.map((s, i) => ({ x: cx(s.lane), y: head + i * rowH + rowH / 2 }))
  const end = { x: cx("Leadership dashboard"), y: head + pmCosting.length * rowH + rowH / 2 }
  const link = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    a.x === b.x ? `M${a.x} ${a.y + nodeH / 2} L${b.x} ${b.y - nodeH / 2 - 2}` : `M${a.x + (b.x > a.x ? nodeW / 2 : -nodeW / 2)} ${a.y} L${b.x} ${a.y} L${b.x} ${b.y - nodeH / 2 - 2}`
  const step = 240
  const nodeAt = (i: number) => flowStart + i * step
  return (
    <FlowReveal>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden w-full md:block" role="img" aria-label="Paper costing hand-off: super admin, group leader, procurement head, project manager and group leaders build the cost in turn; the super admin approves and it syncs to the leadership dashboard.">
        <defs>
          <marker id="pc-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#02594e" />
          </marker>
        </defs>
        {cols.map((c, i) => {
          const t = c === "Leadership dashboard" ? tone.lead : tone[laneTone[c]]
          return (
            <g key={c} data-fl="lane" style={at(i * 60)}>
              <rect x={i * colW + 4} y="0" width={colW - 8} height={H} rx="18" fill={t.tint} opacity={c === "Leadership dashboard" ? 0.55 : 0.7} />
              <text x={i * colW + colW / 2} y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill={t.ink}>
                {c}
              </text>
            </g>
          )
        })}
        {pos.slice(1).map((p, i) => (
          <path key={i} d={link(pos[i], p)} data-fl="edge" style={at(nodeAt(i) + 140)} pathLength={1} strokeDasharray="1" fill="none" stroke="#02594e" strokeOpacity="0.75" strokeWidth="1.6" strokeLinejoin="round" markerEnd="url(#pc-head)" />
        ))}
        <path d={link(pos[pos.length - 1], end)} data-fl="edge" data-dash style={at(nodeAt(pos.length - 1) + 140)} fill="none" stroke="#1F392D" strokeWidth="1.6" strokeDasharray="5 5" markerEnd="url(#pc-head)" />
        {pmCosting.map((s, i) => {
          const p = pos[i]
          const t = tone[laneTone[s.lane]]
          return (
            <g key={i} data-fl="node" style={at(nodeAt(i))}>
              <rect x={p.x - nodeW / 2} y={p.y - nodeH / 2} width={nodeW} height={nodeH} rx="12" fill="#fff" stroke={t.ink} strokeOpacity="0.45" strokeWidth="1.3" />
              <circle cx={p.x - nodeW / 2 + 2} cy={p.y - nodeH / 2 + 2} r="11" fill={t.ink} />
              <text x={p.x - nodeW / 2 + 2} y={p.y - nodeH / 2 + 6.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
                {i + 1}
              </text>
              {s.text.map((line, k) => (
                <text key={k} x={p.x} y={p.y - 3 + k * 15} textAnchor="middle" fontSize="13" fill="#344054">
                  {line}
                </text>
              ))}
            </g>
          )
        })}
        <g data-fl="node" style={at(nodeAt(pos.length))}>
          <rect x={end.x - nodeW / 2} y={end.y - nodeH / 2} width={nodeW} height={nodeH} rx="12" fill="#1F392D" />
          <text x={end.x} y={end.y - 3} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
            Costing synced
          </text>
          <text x={end.x} y={end.y + 13} textAnchor="middle" fontSize="11.5" fill="#ffffff" opacity="0.75">
            for leadership
          </text>
        </g>
      </svg>
      <ol className="grid gap-2 md:hidden">
        {pmCosting.map((s, i) => {
          const t = tone[laneTone[s.lane]]
          return (
            <li key={i} data-fl="node" style={at(i * 90)} className="flex items-start gap-3 rounded-[14px] border border-line bg-white p-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: t.ink }}>
                {i + 1}
              </span>
              <span>
                <span className="block text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: t.ink }}>
                  {s.lane}
                </span>
                <span className="text-[14px] text-ink">{s.text.join(" ")}</span>
              </span>
            </li>
          )
        })}
        <li data-fl="node" style={at(pmCosting.length * 90)} className="rounded-[14px] bg-[#1F392D] p-3 text-[14px] font-semibold text-white">
          Approved costing synced to the leadership dashboard
        </li>
      </ol>
    </FlowReveal>
  )
}

/** Phase 2: from costing synced to project completed (Sathi's IONS experiment flow), same board as phase 1. */
function ExperimentFlow() {
  const cols = [...pmLanes, "Leadership dashboard"] as const
  const idle = ["Project manager", "Procurement head"]
  const W = 1000
  const colW = W / cols.length
  const nodeW = colW - 28
  const head = 54
  const gap = 22
  const phaseGap = 44
  const reject = "#A0583A"
  const cx = (lane: string) => colW * cols.indexOf(lane as (typeof cols)[number]) + colW / 2
  const heightOf = (s: (typeof pmExperiment)[number]) => Math.max(44, 18 + s.text.length * 15 + (s.sub ? 14 : 0) + (s.gate ? 26 : 0))

  // Lay the steps out top to bottom; a new phase adds a labelled separator
  let y = head + 20
  const seps: { y: number; label: string }[] = []
  const box = pmExperiment.map((s, i) => {
    if (i === 0 || s.phase !== pmExperiment[i - 1].phase) {
      seps.push({ y: y + 6, label: pmExperimentPhases[s.phase] })
      y += phaseGap
    }
    const h = heightOf(s)
    const b = { x: cx(s.lane), top: y, h, cy: y + h / 2 }
    y += h + gap
    return b
  })
  const H = y + 4

  type B = (typeof box)[number]
  const link = (a: B, b: B) =>
    a.x === b.x
      ? `M${a.x} ${a.top + a.h} L${b.x} ${b.top - 2}`
      : `M${a.x + (b.x > a.x ? nodeW / 2 : -nodeW / 2)} ${a.cy} L${b.x} ${a.cy} L${b.x} ${b.top - 2}`
  // Rejected: up the left side of the super admin lane, back into the group leader's step
  const back = (from: B, to: B) => `M${from.x - 52} ${from.top} L${from.x - 52} ${to.cy} L${to.x - nodeW / 2 - 2} ${to.cy}`

  const step = 220
  const nodeAt = (i: number) => flowStart + i * step
  const edges: { from: number; to: number; label?: string; dash?: boolean }[] = [
    { from: 0, to: 1, dash: true },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6, label: "Sent to PM" },
    { from: 6, to: 7, label: "Approved" },
    { from: 7, to: 8 },
    { from: 8, to: 9, label: "Sent to PM" },
    { from: 9, to: 10, label: "Approved" },
    { from: 10, to: 11 },
    { from: 11, to: 12, label: "Sent to PM" },
    { from: 12, to: 13, label: "Approved" },
    { from: 13, to: 14, dash: true },
  ]
  const rejects = [
    { from: 6, to: 4, label: "Rejected · stays in feasibility" },
    { from: 9, to: 7, label: "Rejected · back to optimisation" },
  ]
  const labelPos = (a: B, b: B) =>
    a.x === b.x ? { x: a.x + 10, y: a.top + a.h + gap / 2 + 4, anchor: "start" as const } : { x: (a.x + b.x) / 2, y: a.cy - 7, anchor: "middle" as const }
  const label = { fontSize: 11.5, fontWeight: 600, paintOrder: "stroke", stroke: "#f7f3ec", strokeWidth: 4, strokeLinejoin: "round" } as const

  return (
    <FlowReveal className="grid gap-4">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-soft" aria-hidden>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full" style={{ background: tone.admin.ink }} />
          Super admin step (PM in the admin portal)
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-full" style={{ background: tone.res.ink }} />
          Group leader step (IONS portal and lab)
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="30" height="8" viewBox="0 0 30 8"><line x1="1" y1="4" x2="29" y2="4" stroke={reject} strokeWidth="2" strokeDasharray="5 4" /></svg>
          Rejected, goes back
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="30" height="8" viewBox="0 0 30 8"><line x1="1" y1="4" x2="29" y2="4" stroke="#1F392D" strokeWidth="2" strokeDasharray="5 4" /></svg>
          Synced automatically
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="hidden w-full md:block"
        role="img"
        aria-label="Phase 2, from costing synced to project completed: the group leader runs feasibility, optimisation and validation in IONS, and the project manager approves or rejects each hand-off in the admin portal before the project closes and syncs to leadership."
      >
        <defs>
          <marker id="ex-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#02594e" />
          </marker>
          <marker id="ex-back" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill={reject} />
          </marker>
        </defs>
        {cols.map((c, i) => {
          const t = c === "Leadership dashboard" ? tone.lead : tone[laneTone[c]]
          return (
            <g key={c} data-fl="lane" style={at(i * 60)}>
              <rect x={i * colW + 4} y="0" width={colW - 8} height={H} rx="18" fill={t.tint} opacity={c === "Leadership dashboard" ? 0.55 : 0.7} />
              <text x={i * colW + colW / 2} y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill={t.ink}>
                {c}
              </text>
              {idle.includes(c) && (
                <text x={i * colW + colW / 2} y="50" textAnchor="middle" fontSize="11.5" fontStyle="italic" fill="#6b7f7c">
                  No action in this phase
                </text>
              )}
            </g>
          )
        })}
        {seps.map((sp, i) => (
          <g key={sp.label} data-fl="lane" style={at(200 + i * 60)}>
            {i > 0 && <line x1="10" x2={W - 10} y1={sp.y} y2={sp.y} stroke="#9aa8a2" strokeWidth="1" strokeDasharray="2 5" />}
            <rect x="14" y={sp.y + 8} width={sp.label.length * 6.6 + 20} height="22" rx="11" fill="#fff" stroke="#02594e" strokeOpacity="0.25" />
            <text x="24" y={sp.y + 23} fontSize="11.5" fontWeight="700" letterSpacing="0.06em" fill="#02594e">
              {sp.label.toUpperCase()}
            </text>
          </g>
        ))}
        {edges.map((e) => {
          const a = box[e.from]
          const b = box[e.to]
          const d = at(nodeAt(e.from) + 140)
          const lp = labelPos(a, b)
          return (
            <g key={`${e.from}-${e.to}`}>
              {e.dash ? (
                <path d={link(a, b)} data-fl="edge" data-dash style={d} fill="none" stroke="#1F392D" strokeWidth="1.6" strokeDasharray="5 5" markerEnd="url(#ex-head)" />
              ) : (
                <path d={link(a, b)} data-fl="edge" style={d} pathLength={1} strokeDasharray="1" fill="none" stroke="#02594e" strokeOpacity="0.75" strokeWidth="1.6" strokeLinejoin="round" markerEnd="url(#ex-head)" />
              )}
              {e.label && (
                <text data-fl="label" style={at(nodeAt(e.from) + 320)} x={lp.x} y={lp.y} textAnchor={lp.anchor} fill="#02594e" {...label}>
                  {e.label}
                </text>
              )}
            </g>
          )
        })}
        {rejects.map((r) => {
          const a = box[r.from]
          const b = box[r.to]
          return (
            <g key={r.label}>
              <path d={back(a, b)} data-fl="edge" data-dash style={at(nodeAt(r.from) + 200)} fill="none" stroke={reject} strokeWidth="1.6" strokeDasharray="6 5" markerEnd="url(#ex-back)" />
              <text data-fl="label" style={at(nodeAt(r.from) + 360)} x={(a.x - 52 + b.x - nodeW / 2) / 2} y={b.cy - 7} textAnchor="middle" fill={reject} {...label}>
                {r.label}
              </text>
            </g>
          )
        })}
        {pmExperiment.map((s, i) => {
          const b = box[i]
          const left = b.x - nodeW / 2
          if (s.dark) {
            return (
              <g key={i} data-fl="node" style={at(nodeAt(i))}>
                <rect x={left} y={b.top} width={nodeW} height={b.h} rx="12" fill="#1F392D" />
                <text x={b.x} y={b.cy - 3} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
                  {s.text[0]}
                </text>
                <text x={b.x} y={b.cy + 13} textAnchor="middle" fontSize="11.5" fill="#fff" opacity="0.75">
                  {s.sub}
                </text>
              </g>
            )
          }
          const t = tone[laneTone[s.lane]]
          const lineY = (k: number) => b.top + 21 + k * 15
          return (
            <g key={i} data-fl="node" style={at(nodeAt(i))}>
              <rect
                x={left}
                y={b.top}
                width={nodeW}
                height={b.h}
                rx="12"
                fill="#fff"
                stroke={s.gate ? "#02594e" : t.ink}
                strokeOpacity={s.gate ? 0.9 : 0.45}
                strokeWidth={s.gate ? 1.6 : 1.3}
              />
              <circle cx={left + 2} cy={b.top + 2} r="11" fill={t.ink} />
              <text x={left + 2} y={b.top + 6.5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
                {s.n}
              </text>
              {s.text.map((line, k) => (
                <text key={k} x={b.x} y={lineY(k)} textAnchor="middle" fontSize="13" fill="#344054">
                  {line}
                </text>
              ))}
              {s.sub && (
                <text x={b.x} y={lineY(s.text.length) - 1} textAnchor="middle" fontSize="10.5" fill="#6b7f7c">
                  {s.sub}
                </text>
              )}
              {s.gate && (
                <g>
                  <rect x={b.x - 66} y={b.top + b.h - 28} width="60" height="19" rx="9.5" fill="#dcebe3" />
                  <text x={b.x - 36} y={b.top + b.h - 14.5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1F5544">
                    Approve
                  </text>
                  <rect x={b.x + 6} y={b.top + b.h - 28} width="60" height="19" rx="9.5" fill="#f3e2d9" />
                  <text x={b.x + 36} y={b.top + b.h - 14.5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8C4527">
                    Reject
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>
      <ol className="grid gap-2 md:hidden">
        {pmExperiment.map((s, i) => {
          const newPhase = i === 0 || s.phase !== pmExperiment[i - 1].phase
          if (s.dark) {
            return (
              <li key={i} data-fl="node" style={at(i * 80)} className="grid gap-2">
                {newPhase && <span className="mt-2 text-[11.5px] font-bold tracking-[0.08em] text-brand uppercase">{pmExperimentPhases[s.phase]}</span>}
                <span className="rounded-[14px] bg-[#1F392D] p-3 text-[14px] font-semibold text-white">
                  {s.text.join(" ")} <span className="font-normal opacity-75">· {s.sub}</span>
                </span>
              </li>
            )
          }
          const t = tone[laneTone[s.lane]]
          return (
            <li key={i} data-fl="node" style={at(i * 80)} className="grid gap-2">
              {newPhase && <span className="mt-2 text-[11.5px] font-bold tracking-[0.08em] text-brand uppercase">{pmExperimentPhases[s.phase]}</span>}
              <span className="flex items-start gap-3 rounded-[14px] border bg-white p-3" style={{ borderColor: s.gate ? "#02594e" : "var(--color-line)" }}>
                <span className="grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: t.ink }}>
                  {s.n}
                </span>
                <span>
                  <span className="block text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: t.ink }}>
                    {s.lane}
                  </span>
                  <span className="text-[14px] text-ink">{s.text.join(" ")}</span>
                  {s.sub && <span className="block text-[12.5px] text-soft">{s.sub}</span>}
                  {s.gate && <span className="mt-1 block text-[12.5px] font-semibold text-[#8C4527]">Approve, or reject and send back</span>}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </FlowReveal>
  )
}

function Decisions() {
  const dir = "/case-studies/scinode/modules/project-management"
  return (
    <div className="grid gap-14">
      {/* Walkthrough film: full width of the content column, beside the page navigation */}
      <FilmStage
        src={`${dir}/experiment-workspace.mp4`}
        poster={`${dir}/experiment-workspace-poster.jpg`}
        width={1920}
        height={1080}
        label="Experiment Workspace walkthrough: designing the R&D execution flow, from the first lab batch to a closed project"
      />

      <div className="grid gap-x-8 gap-y-8 pt-4 md:grid-cols-2 xl:grid-cols-4">
        {pmDecisions.map((d, k) => (
          <div key={d.title} className="flex items-start gap-3 border-t border-line pt-5">
            <span className="font-heading text-[28px] leading-none font-semibold text-brand/20">{String(k + 1).padStart(2, "0")}</span>
            <div>
              <h4 className="font-sans text-[18px] leading-tight text-[#1d1d1f]">{d.title}</h4>
              <p className="mt-1 text-[14px] leading-snug text-body">{d.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** All sections of the Project management module page. */
export function ProjectManagementSections() {
  return (
    <>
      <EdSection id="context" label="Context" title={["Three portals,", "one project"]}>
        <p className="max-w-[820px] font-heading text-[22px] leading-snug font-medium text-ink md:text-[26px]">{pmContext}</p>
        <ContextBoard />
      </EdSection>

      <EdSection id="users" label="Who uses it" title={["Six roles,", "the right view each"]}>
        <Surfaces />
        <AccessMatrix />
        <p className="-mt-3 text-[12.5px] text-soft">● can do it · ½ limited · – no access. Role-based access from the product requirements.</p>
      </EdSection>

      <EdSection id="costing" label="Paper costing" title={["Costing before", "the first experiment"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">Before any lab work starts, the project&rsquo;s cost is built up by four roles in turn. Each step assigns the next person, so the costing never stalls in someone&rsquo;s inbox.</p>
        <CostingLanes />
      </EdSection>

      <EdSection id="stages" label="Experiment flow" title={["From costing", "to closure"]}>
        <div className="grid gap-2">
          <p className="text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">Phase 2 · continues from costing synced</p>
          <p className="max-w-[680px] text-[16px] leading-snug text-body">
            Once costing is synced, the project manager starts the experiment from the super admin portal, and the group leader takes it through feasibility,
            optimisation and validation. Every move to the next phase needs the project manager&rsquo;s approval, with remarks on both sides.
          </p>
        </div>
        <ExperimentFlow />
      </EdSection>

      <EdSection id="decisions" label="Key decisions" title={["Where requirements became", "interface"]}>
        <Decisions />
      </EdSection>

      <EdSection id="walkthrough" label="Key screens" title={["The screens", "behind the flow"]}>
        <ScreenGallery screens={pmScreens} width={2272} height={1080} />
      </EdSection>

      <EdSection id="impact" label="Success metrics" title={["What I delivered,", "and how it's measured"]}>
        <SuccessMetrics />
      </EdSection>
    </>
  )
}
