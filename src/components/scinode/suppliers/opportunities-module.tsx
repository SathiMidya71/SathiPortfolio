import { ArrowDown, ArrowRight, Check, Filter, Lock, Globe2, MessagesSquare, RotateCcw, Users } from "lucide-react"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { ImageBox } from "@/components/scinode/wire"
import {
  opAccess,
  opContext,
  opDashboard,
  opDecisions,
  opFacts,
  opFilters,
  opForms,
  opImpact,
  opPains,
  opPlatform,
  opQuoteLoop,
  opRule,
  opStages,
  opTypes,
} from "@/lib/scinode-opportunities"
import { cn } from "@/lib/utils"

// Opportunities & proposals: one module page shared by CROs, scientists and manufacturers.
// Palette as the other Scinode modules: site greens, Sathi's purple #B79CEC family, warm yellow.

export const opSections = [
  { id: "context", label: "Context" },
  { id: "pains", label: "Same flow, different pains" },
  { id: "opportunities", label: "Opportunities" },
  { id: "journey", label: "The journey" },
  { id: "proposal-form", label: "Adaptive proposal form" },
  { id: "tracking", label: "Tracking a proposal" },
  { id: "decisions", label: "Key decisions" },
  { id: "impact", label: "Results" },
]

const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties
const darkGrid = {
  backgroundColor: "#0f2c24",
  backgroundImage:
    "radial-gradient(60% 90% at 8% 0%, rgba(150,220,190,0.28), transparent 60%), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 48px 48px, 48px 48px",
} as const
const mint = { backgroundImage: "linear-gradient(180deg,#e6f7ef 0%,#8fd3b4 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } as const

function ContextBoard() {
  return (
    <div className="relative overflow-hidden rounded-[24px] p-5 text-white sm:p-7" style={darkGrid}>
      <dl className="grid grid-cols-2 gap-y-5 md:grid-cols-4">
        {opFacts.map((f, i) => (
          <div key={f.label} className={cn("pr-4", i > 0 && "md:border-l md:border-white/10 md:pl-6", i % 2 === 1 && "max-md:border-l max-md:border-white/10 max-md:pl-4")}>
            <dd className="font-heading text-[52px] leading-[0.9] font-semibold tracking-[-0.04em] md:text-[64px]" style={mint}>
              {f.n}
            </dd>
            <dt className="mt-2 text-[12px] font-semibold tracking-[0.12em] text-white/55 uppercase">{f.label}</dt>
          </div>
        ))}
      </dl>
      <div className="mt-7 flex gap-4 rounded-[16px] bg-white/[0.06] p-4 ring-1 ring-white/10 sm:p-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#B79CEC]/25 text-[#e4d7f8]" aria-hidden>
          <MessagesSquare className="size-5" />
        </span>
        <div>
          <p className="text-[16px] font-semibold">{opRule.title}</p>
          <p className="mt-1 text-[14px] leading-snug text-white/65">{opRule.text}</p>
        </div>
      </div>
    </div>
  )
}

function Pains() {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
      {opPains.map((p, i) => {
        const card = (
          <div key={p.who} className={cn("rounded-[22px] p-5", i === 0 ? "bg-[#F1EBFC]" : "bg-[#FBF1D3]")}>
            <p className={cn("text-[11.5px] font-semibold tracking-[0.12em] uppercase", i === 0 ? "text-[#4A307D]" : "text-[#8A6514]")}>{p.who}</p>
            <p className="mt-0.5 text-[12px] text-soft">{p.source}</p>
            <ul className="mt-4 grid gap-2">
              {p.pains.map((x) => (
                <li key={x} className="flex items-start gap-2 text-[14.5px] leading-snug text-ink">
                  <span className={cn("mt-[0.45em] size-1.5 shrink-0 rounded-full", i === 0 ? "bg-[#6B4CB8]" : "bg-[#C9A23F]")} />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-black/[0.06] pt-3 text-[13.5px] font-semibold text-ink">Needs: {p.needs}</p>
          </div>
        )
        return i === 0 ? (
          [
            card,
            <div key="mid" className="flex items-center justify-center md:flex-col">
              <span className="rounded-full bg-[#1F392D] px-3 py-1.5 text-center text-[12px] font-semibold text-white">
                Same flow
              </span>
            </div>,
          ]
        ) : (
          card
        )
      })}
    </div>
  )
}

function Opportunities() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        {opTypes.map((t, i) => (
          <div key={t.title} className="rounded-[20px] bg-white p-5 ring-1 ring-line">
            <p className="flex items-center justify-between gap-2">
              <span className="font-heading text-[20px] font-semibold text-ink">{t.title}</span>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold", i === 0 ? "bg-[#FBF1D3] text-[#8A6514]" : "bg-[#F1EBFC] text-[#4A307D]")}>{t.form}</span>
            </p>
            <p className="mt-2 text-[14.5px] leading-snug text-body">{t.text}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="grid grid-cols-2 gap-3">
          {opAccess.map((a, i) => (
            <div key={a.title} className={cn("rounded-[18px] p-4", i === 0 ? "bg-[#e4f1eb]" : "text-white")} style={i === 1 ? darkGrid : undefined}>
              {i === 0 ? <Globe2 className="size-5 text-brand" aria-hidden /> : <Lock className="size-5 text-[#a8e6c9]" aria-hidden />}
              <p className={cn("mt-2 text-[15px] font-semibold", i === 0 ? "text-ink" : "text-white")}>{a.title}</p>
              <p className={cn("mt-0.5 text-[13px] leading-snug", i === 0 ? "text-body" : "text-white/65")}>{a.text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[18px] bg-white p-4 ring-1 ring-line">
          <p className="flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.12em] text-soft uppercase">
            <Filter className="size-3.5" aria-hidden /> Filters
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {opFilters.map((f) => (
              <li key={f} className="rounded-full bg-[#f7f3ec] px-3 py-1.5 text-[13px] font-medium text-ink">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ---------- Journey swimlane: User · Scimplify · Customer ---------- */

const lanes = [
  { name: "User", sub: "CRO, scientist or manufacturer", tint: "#e4f1eb", ink: "#02594e" },
  { name: "Scimplify", sub: "admin, the mediator", tint: "#F1EBFC", ink: "#4A307D" },
  { name: "Customer", sub: "", tint: "#FBF1D3", ink: "#8A6514" },
] as const
type JN = { col: number; lines: string[]; dark?: boolean }
const jNodes: JN[] = [
  { col: 2, lines: ["Raises an R&D or", "manufacturing request"] },
  { col: 1, lines: ["Adds scope, sets", "open or exclusive"] },
  { col: 0, lines: ["Sees a matched", "opportunity"] },
  { col: 0, lines: ["Submits a proposal", "(adaptive form)"] },
  { col: 1, lines: ["Reviews, books", "talk to an expert"] },
  { col: 2, lines: ["Negotiates and", "confirms the price"] },
  { col: 1, lines: ["Shares a quote", "(versioned)"] },
  { col: 0, lines: ["Accepts the quote"] },
  { col: 1, lines: ["Raises the", "purchase order"] },
  { col: 0, lines: ["Project starts"], dark: true },
]
function Journey() {
  const W = 1000
  const colW = W / 3
  const head = 58
  const rowH = 66
  const nW = colW - 70
  const nH = 46
  const H = head + jNodes.length * rowH + 10
  const P = jNodes.map((n, i) => ({ x: colW * n.col + colW / 2, y: head + i * rowH + rowH / 2 }))
  const link = (a: (typeof P)[0], b: (typeof P)[0]) =>
    a.x === b.x ? `M${a.x} ${a.y + nH / 2} L${b.x} ${b.y - nH / 2 - 2}` : `M${a.x + (b.x > a.x ? nW / 2 : -nW / 2)} ${a.y} L${b.x} ${a.y} L${b.x} ${b.y - nH / 2 - 2}`
  const step = 200
  return (
    <FlowReveal>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden w-full md:block" role="img" aria-label="Opportunity to purchase order: the customer raises a request; Scimplify adds scope and sets visibility; the user sees a matched opportunity and submits a proposal; Scimplify reviews and books a call with an expert; the customer negotiates and confirms the price; Scimplify shares versioned quotes; the user accepts or asks for a revision; Scimplify raises the purchase order and the project starts.">
        <defs>
          <marker id="jr-h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#02594e" />
          </marker>
          <marker id="jr-y" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#8A6514" />
          </marker>
        </defs>
        {lanes.map((l, i) => (
          <g key={l.name} data-fl="lane" style={at(i * 60)}>
            <rect x={i * colW + 4} y="0" width={colW - 8} height={H} rx="18" fill={l.tint} opacity="0.75" />
            <text x={i * colW + colW / 2} y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill={l.ink}>
              {l.name}
            </text>
            {l.sub && (
              <text x={i * colW + colW / 2} y="47" textAnchor="middle" fontSize="11" fill={l.ink} opacity="0.7">
                {l.sub}
              </text>
            )}
          </g>
        ))}
        {P.slice(1).map((p, i) => (
          <path key={i} d={link(P[i], p)} data-fl="edge" style={at(300 + i * step + 140)} pathLength={1} strokeDasharray="1" fill="none" stroke="#02594e" strokeOpacity="0.75" strokeWidth="1.6" strokeLinejoin="round" markerEnd="url(#jr-h)" />
        ))}
        {/* revise loop: user → back to Scimplify's quote */}
        <g>
          <path
            d={`M${P[7].x + nW / 2} ${P[7].y + 8} L${P[6].x + 50} ${P[7].y + 8} L${P[6].x + 50} ${P[6].y + nH / 2 + 2}`}
            data-fl="edge"
            data-dash
            style={at(300 + 7 * step + 220)}
            fill="none"
            stroke="#8A6514"
            strokeWidth="1.6"
            strokeDasharray="6 5"
            markerEnd="url(#jr-y)"
          />
          <text data-fl="label" style={at(300 + 7 * step + 380)} x={P[6].x + 58} y={(P[6].y + P[7].y) / 2 + 6} textAnchor="start" fontSize="11.5" fontWeight="600" fill="#8A6514">
            Revise
          </text>
        </g>
        {jNodes.map((n, i) => {
          const { x, y } = P[i]
          const l = lanes[n.col]
          return (
            <g key={i} data-fl="node" style={at(300 + i * step)}>
              <rect x={x - nW / 2} y={y - nH / 2} width={nW} height={nH} rx="12" fill={n.dark ? "#1F392D" : "#fff"} stroke={n.dark ? "none" : l.ink} strokeOpacity="0.45" strokeWidth="1.3" />
              <circle cx={x - nW / 2 + 2} cy={y - nH / 2 + 2} r="10" fill={n.dark ? "#8fd3b4" : l.ink} />
              <text x={x - nW / 2 + 2} y={y - nH / 2 + 6} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={n.dark ? "#1F392D" : "#fff"}>
                {i + 1}
              </text>
              {n.lines.map((t, k) => (
                <text key={t} x={x} y={y + 4 + (k - (n.lines.length - 1) / 2) * 15} textAnchor="middle" fontSize="13" fontWeight={n.dark ? 700 : 500} fill={n.dark ? "#fff" : "#344054"}>
                  {t}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
      <ol className="grid gap-2 md:hidden">
        {jNodes.map((n, i) => {
          const l = lanes[n.col]
          return (
            <li key={i} data-fl="node" style={at(i * 70)} className={cn("flex items-start gap-3 rounded-[14px] p-3", n.dark ? "bg-[#1F392D] text-white" : "border border-line bg-white")}>
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: n.dark ? "#3f8f7f" : l.ink }}>
                {i + 1}
              </span>
              <span>
                <span className="block text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: n.dark ? "#a8e6c9" : l.ink }}>
                  {l.name}
                </span>
                <span className="text-[14px]">{n.lines.join(" ")}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </FlowReveal>
  )
}

/* ---------- Adaptive proposal form ---------- */

function ProposalForm() {
  const tone: Record<string, { bg: string; ink: string }> = {
    RFQ: { bg: "#FBF1D3", ink: "#8A6514" },
    "Contract manufacturing": { bg: "#e4f1eb", ink: "#02594e" },
    "Co-development": { bg: "#F1EBFC", ink: "#4A307D" },
  }
  return (
    <FlowReveal className="grid gap-5">
      {/* the route */}
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {["Create a proposal", "Catalogue or capability?", "Pick engagement types", "One question if more than one", "Exactly one form"].map((s, i, arr) => (
          <li key={s} data-fl="node" style={at(i * 140)} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
            <span className={cn("w-full rounded-[14px] px-3 py-2.5 text-center text-[13px] font-semibold", i === arr.length - 1 ? "bg-[#1F392D] text-white" : "bg-white text-ink ring-1 ring-line")}>{s}</span>
            {i < arr.length - 1 && <ArrowRight className="size-4 shrink-0 rotate-90 text-soft md:rotate-0" aria-hidden />}
          </li>
        ))}
      </ol>

      {/* combinations → question → one form */}
      <div className="grid gap-3 md:grid-cols-3">
        {opForms.combos.map((c, i) => (
          <div key={c.pick} data-fl="node" style={at(700 + i * 140)} className="rounded-[20px] bg-white p-4 ring-1 ring-line">
            <p className="text-[11.5px] font-semibold tracking-[0.12em] text-soft uppercase">If the project allows</p>
            <p className="mt-1 font-heading text-[18px] font-semibold text-ink">{c.pick}</p>
            <div className="mt-3 rounded-[12px] bg-[#f7f3ec] p-3 text-[13.5px] font-medium text-ink">“{c.question}”</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[12.5px]">
              {[
                ["Yes", c.yes],
                ["No", c.no],
              ].map(([k, f]) => (
                <div key={k} className="rounded-[12px] p-2.5" style={{ background: tone[f].bg, color: tone[f].ink }}>
                  <span className="block text-[11px] font-semibold opacity-75">{k} →</span>
                  <span className="font-semibold">{f} form</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* the three forms */}
      <div className="grid gap-3 md:grid-cols-3">
        {opForms.forms.map((f, i) => {
          const t = tone[f.name]
          return (
            <div key={f.key} data-fl="node" style={{ ...at(1200 + i * 120), background: t.bg }} className="rounded-[20px] p-4">
              <p className="font-heading text-[17px] font-semibold" style={{ color: t.ink }}>
                {f.name} form
              </p>
              <ul className="mt-2 grid gap-1">
                {f.fields.map((x) => (
                  <li key={x} className="flex items-center gap-2 text-[13px] text-ink">
                    <Check className="size-3.5 shrink-0" style={{ color: t.ink }} strokeWidth={3} aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <p className="text-[12.5px] text-soft">Behind the scenes the system keeps the project type, every engagement type selected, the answer and the final form, so reporting stays accurate.</p>
    </FlowReveal>
  )
}

/* ---------- Tracking ---------- */

function Stages({ title, stages, tint, ink }: { title: string; stages: readonly string[]; tint: string; ink: string }) {
  return (
    <div className="rounded-[20px] bg-white p-4 ring-1 ring-line">
      <p className="text-[11.5px] font-semibold tracking-[0.12em] uppercase" style={{ color: ink }}>
        {title}
      </p>
      <ol className="mt-3 grid gap-0">
        {stages.map((s, i) => (
          <li key={s} className="relative flex items-center gap-3 pb-3 last:pb-0">
            {i < stages.length - 1 && <span className="absolute top-7 left-[13px] h-[calc(100%-1.25rem)] w-0.5" style={{ background: tint }} aria-hidden />}
            <span className="grid size-7 shrink-0 place-items-center rounded-full text-[11.5px] font-bold" style={{ background: i === stages.length - 1 ? "#1F392D" : tint, color: i === stages.length - 1 ? "#fff" : ink }}>
              {i + 1}
            </span>
            <span className="text-[14px] font-medium text-ink">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Tracking() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-4">
        {opDashboard.map((d, i) => (
          <div key={d} className="rounded-[16px] p-4 text-white" style={darkGrid}>
            <span className="block h-1.5 w-8 rounded-full" style={{ background: ["#8fd3b4", "#B79CEC", "#F2D98B", "#a8e6c9"][i] }} />
            <p className="mt-3 text-[13.5px] font-semibold">{d}</p>
          </div>
        ))}
      </div>
      <p className="-mt-1 text-[12.5px] text-soft">The proposal dashboard: one count per outcome, above a searchable list sorted by date and type.</p>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)]">
        <Stages title="Capability proposal" stages={opStages.capability} tint="#e4f1eb" ink="#02594e" />
        <Stages title="Catalogue proposal" stages={opStages.catalogue} tint="#FBF1D3" ink="#8A6514" />
        <div className="rounded-[20px] bg-[#F1EBFC] p-4">
          <p className="flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.12em] text-[#4A307D] uppercase">
            <RotateCcw className="size-3.5" aria-hidden /> Quote negotiation loop
          </p>
          <ol className="mt-3 grid gap-2">
            {opQuoteLoop.map((q, i) => (
              <li key={i} className="grid gap-1">
                <span className="flex items-start gap-2 rounded-[12px] bg-white p-2.5 text-[13px] text-ink">
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", q.who === "User" ? "bg-[#e4f1eb] text-brand" : "bg-[#4A307D] text-white")}>{q.who}</span>
                  {q.text}
                </span>
                {i < opQuoteLoop.length - 1 && <ArrowDown className="mx-auto size-3.5 text-[#6B4CB8]" aria-hidden />}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[12.5px] font-medium text-[#4A307D]">Repeats until one side accepts; every version stays visible.</p>
        </div>
      </div>
    </div>
  )
}

function Decisions() {
  return (
    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
      {opDecisions.map((d, k) => (
        <div key={d.title} className="grid content-start gap-4">
          <div className="flex items-start gap-3">
            <span className="font-heading text-[30px] leading-none font-semibold text-[#B79CEC]">{String(k + 1).padStart(2, "0")}</span>
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

function Impact() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {opPlatform.map((m) => (
          <div key={m.label} className="rounded-[20px] p-5 text-white" style={darkGrid}>
            <p className="font-heading text-[40px] leading-none font-semibold tracking-[-0.03em]" style={mint}>
              {m.value}
            </p>
            <p className="mt-2 text-[14px] font-semibold">{m.label}</p>
            <p className="mt-0.5 text-[12.5px] text-white/60">{m.note}</p>
          </div>
        ))}
      </div>
      <p className="-mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#e4f1eb] px-3 py-1 text-[12px] font-semibold text-brand">
        <Users className="size-3.5" aria-hidden /> Scinode for Manufacturers platform figures
      </p>
      <div>
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#6B4CB8] uppercase">What I delivered</p>
        <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
          {opImpact.map((x) => (
            <li key={x} className="flex gap-2.5 rounded-[16px] bg-white p-4 text-[14.5px] leading-snug text-ink ring-1 ring-line">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function OpportunitiesSections() {
  return (
    <>
      <EdSection id="context" label="Context" title={["From opportunity", "to purchase order"]}>
        <p className="max-w-[820px] font-heading text-[22px] leading-snug font-medium text-ink md:text-[26px]">{opContext}</p>
        <ContextBoard />
      </EdSection>
      <EdSection id="pains" label="Same flow, different pains" title={["Three users,", "one journey"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">CROs, scientists and manufacturers follow the same steps, but they come to them with different worries.</p>
        <Pains />
      </EdSection>
      <EdSection id="opportunities" label="Opportunities" title={["Matched,", "not broadcast"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">Users don&apos;t search a marketplace. Scimplify shortlists opportunities for them from their profile.</p>
        <Opportunities />
      </EdSection>
      <EdSection id="journey" label="The journey" title={["Scimplify in", "the middle"]}>
        <Journey />
      </EdSection>
      <EdSection id="proposal-form" label="Adaptive proposal form" title={["One question,", "one form"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">A project can allow RFQ, contract manufacturing and co-development. Instead of showing every form, the user answers one question.</p>
        <ProposalForm />
      </EdSection>
      <EdSection id="tracking" label="Tracking a proposal" title={["Every stage,", "every version"]}>
        <Tracking />
      </EdSection>
      <EdSection id="decisions" label="Key decisions" title={["Where requirements became", "interface"]}>
        <Decisions />
      </EdSection>
      <EdSection id="impact" label="Results" title={["What I delivered,", "and the platform today"]}>
        <Impact />
      </EdSection>
    </>
  )
}
