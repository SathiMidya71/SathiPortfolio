import { ArrowLeftRight, Bell, Check, Clock3, FileText, History, MessageSquare, Minus, PauseCircle, Users } from "lucide-react"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { ImageBox } from "@/components/scinode/wire"
import {
  pmActions,
  pmCollab,
  pmContext,
  pmCosting,
  pmDecisions,
  pmEveryStage,
  pmFacts,
  pmFields,
  pmImpact,
  pmLanes,
  pmProblems,
  pmRoles,
  pmStages,
  pmSurfaces,
  pmTargets,
} from "@/lib/scinode-pm"
import { cn } from "@/lib/utils"

// Project management module page: the internal R&D project across three portals and six roles.
// Site palette only: leadership = deep green, admin portal = neutral sand, researchers = brand green.

export const pmSections = [
  { id: "context", label: "Context" },
  { id: "users", label: "Who uses it" },
  { id: "costing", label: "Paper costing" },
  { id: "stages", label: "Six stages" },
  { id: "tracking", label: "Tracking" },
  { id: "collaboration", label: "Collaboration" },
  { id: "decisions", label: "Key decisions" },
  { id: "walkthrough", label: "Walkthrough" },
  { id: "targets", label: "Targets" },
  { id: "impact", label: "Impact" },
]

const tone = {
  lead: { ink: "#1F392D", tint: "#dfe8e3", label: "text-[#1F392D]" },
  admin: { ink: "#6b7f7c", tint: "#f2ece3", label: "text-[#56635f]" },
  res: { ink: "#02594e", tint: "#e4f1eb", label: "text-brand" },
} as const
const laneTone: Record<string, keyof typeof tone> = { "Super admin": "admin", "Project manager": "admin", "Group leader": "res", "Procurement head": "res" }

function Facts() {
  return (
    <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {pmFacts.map((f) => (
        <div key={f.label} className="rounded-[20px] border border-line bg-white px-5 py-4">
          <dt className="sr-only">{f.label}</dt>
          <dd>
            <span className="block font-heading text-[40px] leading-none font-semibold text-brand">{f.n}</span>
            <span className="mt-1.5 block text-[13.5px] leading-snug text-body">{f.label}</span>
          </dd>
        </div>
      ))}
    </dl>
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
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden w-full md:block" role="img" aria-label="Paper costing hand-off: super admin, group leader, procurement head, project manager and group leaders build the cost in turn; the super admin approves and it syncs to the leadership dashboard.">
        <defs>
          <marker id="pc-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#02594e" />
          </marker>
        </defs>
        {cols.map((c, i) => {
          const t = c === "Leadership dashboard" ? tone.lead : tone[laneTone[c]]
          return (
            <g key={c}>
              <rect x={i * colW + 4} y="0" width={colW - 8} height={H} rx="18" fill={t.tint} opacity={c === "Leadership dashboard" ? 0.55 : 0.7} />
              <text x={i * colW + colW / 2} y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill={t.ink}>
                {c}
              </text>
            </g>
          )
        })}
        {pos.slice(1).map((p, i) => (
          <path key={i} d={link(pos[i], p)} fill="none" stroke="#02594e" strokeOpacity="0.75" strokeWidth="1.6" strokeLinejoin="round" markerEnd="url(#pc-head)" />
        ))}
        <path d={link(pos[pos.length - 1], end)} fill="none" stroke="#1F392D" strokeWidth="1.6" strokeDasharray="5 5" markerEnd="url(#pc-head)" />
        {pmCosting.map((s, i) => {
          const p = pos[i]
          const t = tone[laneTone[s.lane]]
          return (
            <g key={i}>
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
        <rect x={end.x - nodeW / 2} y={end.y - nodeH / 2} width={nodeW} height={nodeH} rx="12" fill="#1F392D" />
        <text x={end.x} y={end.y - 3} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
          Costing synced
        </text>
        <text x={end.x} y={end.y + 13} textAnchor="middle" fontSize="11.5" fill="#ffffff" opacity="0.75">
          for leadership
        </text>
      </svg>
      <ol className="grid gap-2 md:hidden">
        {pmCosting.map((s, i) => {
          const t = tone[laneTone[s.lane]]
          return (
            <li key={i} className="flex items-start gap-3 rounded-[14px] border border-line bg-white p-3">
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
        <li className="rounded-[14px] bg-[#1F392D] p-3 text-[14px] font-semibold text-white">Approved costing synced to the leadership dashboard</li>
      </ol>
    </>
  )
}

function Stages() {
  return (
    <div className="grid gap-6">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {pmStages.map((s, i) => {
          const evalPhase = s.phase === "Evaluation"
          return (
            <li key={s.name} className="relative flex flex-col rounded-[18px] border bg-white p-4" style={{ borderColor: evalPhase ? "#d8cdbd" : "rgba(2,89,78,0.3)" }}>
              <span className="flex items-center justify-between gap-2">
                <span className="font-heading text-[22px] leading-none font-semibold text-brand/25">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold" style={{ background: evalPhase ? "#f2ece3" : "#e4f1eb", color: evalPhase ? "#56635f" : "#02594e" }}>
                  {s.phase}
                </span>
              </span>
              <span className="mt-2.5 font-heading text-[15.5px] leading-tight font-semibold text-ink">{s.name}</span>
              <span className="mt-1.5 text-[12.5px] leading-snug text-body">{s.note}</span>
            </li>
          )
        })}
      </ol>
      <div className="rounded-[20px] bg-[#e4f1eb] p-5">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-brand uppercase">Every stage has</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pmEveryStage.map((x, i) => {
            const Icon = [MessageSquare, FileText, History, Bell][i]
            return (
              <li key={x} className="flex items-center gap-2.5 text-[14px] font-semibold text-ink">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-brand">
                  <Icon className="size-4" aria-hidden />
                </span>
                {x}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Tracking() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="rounded-[22px] border border-line bg-white p-5">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-soft uppercase">The project list shows</p>
        <dl className="mt-3 grid gap-3">
          {pmFields.map((f) => (
            <div key={f.group} className="grid gap-1.5 sm:grid-cols-[90px_minmax(0,1fr)] sm:items-start">
              <dt className="pt-1 text-[13px] font-semibold text-ink">{f.group}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {f.items.map((x) => (
                  <span key={x} className="rounded-full bg-[#f2ece3] px-2.5 py-1 text-[12.5px] text-body">
                    {x}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-[22px] bg-[#1F392D] p-5 text-white">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-white/60 uppercase">How status is set</p>
        <div className="mt-4 flex items-center gap-2 text-[13.5px]">
          <Clock3 className="size-4 shrink-0 text-[#9fd4bc]" aria-hidden /> Target vs actual dates
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="rounded-[12px] bg-white/10 px-3 py-2 text-center text-[13.5px] font-semibold text-[#9fd4bc]">On track</span>
          <span className="rounded-[12px] bg-white/10 px-3 py-2 text-center text-[13.5px] font-semibold text-[#d9c3a5]">Delayed</span>
        </div>
        <p className="mt-2 text-[12px] text-white/60">Set automatically</p>
        <div className="mt-4 flex items-center gap-2 rounded-[12px] border border-white/15 px-3 py-2 text-[13.5px]">
          <PauseCircle className="size-4 shrink-0 text-[#cfc6f7]" aria-hidden /> On hold, with a reason
        </div>
        <p className="mt-2 text-[12px] text-white/60">Only super admins and PMs can pause a project</p>
      </div>
    </div>
  )
}

function Collaboration() {
  const icons = [MessageSquare, Bell, History]
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {pmCollab.map((c, i) => {
        const Icon = icons[i]
        return (
          <li key={c.title} className="rounded-[20px] border border-line bg-white p-5">
            <span className="grid size-10 place-items-center rounded-full bg-[#e4f1eb] text-brand">
              <Icon className="size-[18px]" aria-hidden />
            </span>
            <p className="mt-3 font-heading text-[17px] leading-tight font-semibold text-ink">{c.title}</p>
            <p className="mt-1.5 text-[14px] leading-snug text-body">{c.text}</p>
          </li>
        )
      })}
    </ul>
  )
}

function Decisions() {
  return (
    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
      {pmDecisions.map((d, k) => (
        <div key={d.title} className="grid content-start gap-4">
          <div className="flex items-start gap-3">
            <span className="font-heading text-[32px] leading-none font-semibold text-brand/20">{String(k + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-sans text-[21px] leading-tight text-[#1d1d1f] md:text-[22px]">{d.title}</h3>
              <p className="mt-1 text-[14.5px] leading-snug text-body">{d.text}</p>
            </div>
          </div>
          <ImageBox label={`Screen: ${d.title}`} ratio="16 / 10" />
        </div>
      ))}
    </div>
  )
}

function Ring({ value, unit, prefix }: { value: number; unit: string; prefix?: string }) {
  // percentages fill to their value; time targets show a full ring
  const frac = unit === "%" ? value / 100 : 1
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 84 84" className="size-[92px]" aria-hidden>
      <circle cx="42" cy="42" r={r} fill="none" stroke="#e4f1eb" strokeWidth="8" />
      <circle cx="42" cy="42" r={r} fill="none" stroke="#02594e" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${c * frac} ${c}`} transform="rotate(-90 42 42)" />
      <text x="42" y="47" textAnchor="middle" className="font-heading" fontSize="17" fontWeight="700" fill="#1d1d1f">
        {prefix}
        {value}
        {unit}
      </text>
    </svg>
  )
}

function Targets() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {pmTargets.map((t) => (
          <li key={t.label} className="flex flex-col items-center rounded-[20px] border border-line bg-white p-4 text-center">
            <Ring value={t.value} unit={t.unit} prefix={t.prefix} />
            <p className="mt-2 text-[13px] leading-snug text-body">{t.label}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 inline-block rounded-full bg-[#ece9fd] px-3 py-1 text-[12px] font-semibold text-[#5b4fd1]">Targets set by the product manager, not results yet</p>
    </div>
  )
}

function Impact() {
  return (
    <div className="grid gap-4">
      <ul className="grid gap-3">
        {pmImpact.map((x) => (
          <li key={x} className="flex gap-3 rounded-[16px] border border-line bg-white p-4 text-[15px] leading-snug text-ink">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden />
            <span>
              {x.split(/(\[metric needed\])/).map((part, i) =>
                part === "[metric needed]" ? (
                  <span key={i} className="rounded-md bg-[#ece9fd] px-1.5 py-0.5 text-[13px] font-semibold text-[#5b4fd1]">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** All sections of the Project management module page. */
export function ProjectManagementSections() {
  return (
    <>
      <EdSection id="context" label="Context" title={["Three portals,", "one project"]}>
        <p className="max-w-[760px] font-heading text-[22px] leading-snug font-medium text-ink md:text-[25px]">{pmContext}</p>
        <Facts />
        <div className="grid gap-4 md:grid-cols-3">
          {pmProblems.map((p, i) => (
            <div key={p.title} className="rounded-[20px] border-2 border-dashed border-[#d6cbb9] p-5">
              <span className="rounded-full bg-[#ece9fd] px-2.5 py-1 text-[11.5px] font-semibold text-[#5b4fd1]">Problem {String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-heading text-[18px] font-semibold text-ink">{p.title}</p>
              <p className="mt-1 text-[14px] leading-snug text-body">{p.text}</p>
            </div>
          ))}
        </div>
      </EdSection>

      <EdSection id="users" label="Who uses it" title={["Six roles,", "the right view each"]}>
        <Surfaces />
        <AccessMatrix />
        <p className="-mt-3 text-[12.5px] text-soft">● can do it · ½ limited · – no access. Role-based access from the product requirements.</p>
      </EdSection>

      <EdSection id="costing" label="Paper costing" title={["Eight hand-offs,", "one clear flow"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">Before any lab work starts, the project&rsquo;s cost is built up by four roles in turn. Each step assigns the next person, so the costing never stalls in someone&rsquo;s inbox.</p>
        <CostingLanes />
      </EdSection>

      <EdSection id="stages" label="Six stages" title={["From costing", "to closure"]}>
        <Stages />
      </EdSection>

      <EdSection id="tracking" label="Tracking" title={["Every project", "at a glance"]}>
        <Tracking />
      </EdSection>

      <EdSection id="collaboration" label="Collaboration" title={["Talk where", "the work is"]}>
        <Collaboration />
      </EdSection>

      <EdSection id="decisions" label="Key decisions" title={["Where requirements became", "interface"]}>
        <Decisions />
      </EdSection>

      <EdSection id="walkthrough" label="Walkthrough" title={["See it", "in action"]}>
        <ImageBox label="Walkthrough video: an internal project from assignment to closure (under 90 seconds)" ratio="16 / 9" />
      </EdSection>

      <EdSection id="targets" label="Targets" title={["What success", "looks like"]}>
        <Targets />
      </EdSection>

      <EdSection id="impact" label="Impact" title={["What I", "delivered"]}>
        <Impact />
      </EdSection>
    </>
  )
}
