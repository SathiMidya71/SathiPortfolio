import { Check, CircleDot, PlayCircle, Sparkles } from "lucide-react"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { ContextBoard } from "@/components/scinode/researcher/onboarding-module"
import { PmContextBoard, Surfaces, tone } from "@/components/scinode/researcher/pm-module"
import { ResearchMap } from "@/components/scinode/researcher/research-map"
import { ImageBox } from "@/components/scinode/wire"
import { type LaneFlowData, onboarding, orders } from "@/lib/scinode-manufacturer-modules"
import { cn } from "@/lib/utils"

// Scinode for Manufacturers module pages, on the same templates and visuals as the researcher modules:
// Profile & onboarding follows the researcher onboarding page, Orders & execution follows Project management.
// Screens, the walkthrough film and results come later from Sathi; until then they're placeholders.

const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties
const flowStart = 350
const darkGrid = {
  backgroundColor: "#0f2c24",
  backgroundImage:
    "radial-gradient(60% 90% at 8% 0%, rgba(150,220,190,0.28), transparent 60%), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 48px 48px, 48px 48px",
} as const
const mint = { backgroundImage: "linear-gradient(180deg,#e6f7ef 0%,#8fd3b4 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } as const

/** Marks content still to confirm (draft, written from her notes) or to replace (sample). */
function Tag({ id, m }: { id: string; m: { draft: ReadonlySet<string>; sample: ReadonlySet<string> } }) {
  const kind = m.sample.has(id) ? "Sample content, to replace" : m.draft.has(id) ? "Draft from the PM notes, to confirm" : null
  if (!kind) return null
  return (
    <p className="-mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FBF1D3] px-3 py-1 text-[12px] font-semibold text-[#8A6514]">
      <Sparkles className="size-3.5" aria-hidden /> {kind}
    </p>
  )
}

/** Vertical swimlane in the style of the Project management costing flow: lanes as columns, one numbered
 *  step per row with elbow arrows, a dark end node; a numbered list on phones. Gates get a thicker outline. */
function LaneFlow({ data }: { data: LaneFlowData }) {
  const { lanes, steps, end } = data
  const W = 1000
  const colW = W / lanes.length
  const head = 54
  const rowH = 74
  const nodeW = Math.min(colW - 40, 250)
  const nodeH = 56
  const H = head + (steps.length + 1) * rowH + 8
  const ti = (lane: string) => tone[lanes.find((l) => l.name === lane)?.tone ?? "admin"]
  const cx = (lane: string) => colW * lanes.findIndex((l) => l.name === lane) + colW / 2
  const pos = steps.map((s, i) => ({ x: cx(s.lane), y: head + i * rowH + rowH / 2 }))
  const endP = { x: cx(end.lane), y: head + steps.length * rowH + rowH / 2 }
  const link = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    a.x === b.x ? `M${a.x} ${a.y + nodeH / 2} L${b.x} ${b.y - nodeH / 2 - 2}` : `M${a.x + (b.x > a.x ? nodeW / 2 : -nodeW / 2)} ${a.y} L${b.x} ${a.y} L${b.x} ${b.y - nodeH / 2 - 2}`
  const step = 240
  const nodeAt = (i: number) => flowStart + i * step
  const marker = `${data.id}-head`
  return (
    <FlowReveal>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden w-full md:block" role="img" aria-label={data.label}>
        <defs>
          <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#02594e" />
          </marker>
        </defs>
        {lanes.map((l, i) => {
          const t = tone[l.tone]
          return (
            <g key={l.name} data-fl="lane" style={at(i * 60)}>
              <rect x={i * colW + 4} y="0" width={colW - 8} height={H} rx="18" fill={t.tint} opacity="0.7" />
              <text x={i * colW + colW / 2} y="32" textAnchor="middle" fontSize="14" fontWeight="700" fill={t.ink}>
                {l.name}
              </text>
            </g>
          )
        })}
        {[...pos.slice(1), endP].map((p, i) => (
          <path
            key={i}
            d={link(pos[i], p)}
            data-fl="edge"
            style={at(nodeAt(i) + 140)}
            pathLength={1}
            strokeDasharray="1"
            fill="none"
            stroke="#02594e"
            strokeOpacity="0.75"
            strokeWidth="1.6"
            strokeLinejoin="round"
            markerEnd={`url(#${marker})`}
          />
        ))}
        {steps.map((s, i) => {
          const p = pos[i]
          const t = ti(s.lane)
          const lines = s.sub ? [...s.text, s.sub] : s.text
          return (
            <g key={i} data-fl="node" style={at(nodeAt(i))}>
              <rect x={p.x - nodeW / 2} y={p.y - nodeH / 2} width={nodeW} height={nodeH} rx="12" fill={s.gate ? t.tint : "#fff"} stroke={t.ink} strokeOpacity={s.gate ? 0.9 : 0.45} strokeWidth={s.gate ? 2 : 1.3} />
              <circle cx={p.x - nodeW / 2 + 2} cy={p.y - nodeH / 2 + 2} r="11" fill={t.ink} />
              <text x={p.x - nodeW / 2 + 2} y={p.y - nodeH / 2 + 6.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">
                {i + 1}
              </text>
              {lines.map((line, k) => {
                const sub = !!s.sub && k === lines.length - 1
                return (
                  <text key={k} x={p.x} y={p.y + 4.5 + (k - (lines.length - 1) / 2) * 15} textAnchor="middle" fontSize={sub ? 11.5 : 13} fill={sub ? t.ink : "#344054"} opacity={sub ? 0.8 : 1}>
                    {line}
                  </text>
                )
              })}
            </g>
          )
        })}
        <g data-fl="node" style={at(nodeAt(steps.length))}>
          <rect x={endP.x - nodeW / 2} y={endP.y - nodeH / 2} width={nodeW} height={nodeH} rx="12" fill="#1F392D" />
          <text x={endP.x} y={endP.y - 3} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
            {end.text}
          </text>
          <text x={endP.x} y={endP.y + 13} textAnchor="middle" fontSize="11.5" fill="#ffffff" opacity="0.75">
            {end.sub}
          </text>
        </g>
      </svg>
      <ol className="grid gap-2 md:hidden">
        {steps.map((s, i) => {
          const t = ti(s.lane)
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
                {s.sub && <span className="block text-[12.5px] text-soft">{s.sub}</span>}
              </span>
            </li>
          )
        })}
        <li data-fl="node" style={at(steps.length * 90)} className="rounded-[14px] bg-[#1F392D] p-3 text-[14px] font-semibold text-white">
          {end.text} <span className="font-normal text-white/70">· {end.sub}</span>
        </li>
      </ol>
    </FlowReveal>
  )
}

/** Walkthrough film placeholder, then the decisions as numbered columns (as on the researcher modules). */
function Decisions({ items, film }: { items: readonly { title: string; text: string }[]; film: string }) {
  return (
    <div className="grid gap-14">
      <div className="relative">
        <ImageBox label={`Walkthrough film: ${film} (to come)`} ratio="16 / 9" />
        <PlayCircle className="pointer-events-none absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-[130%] text-brand/30" aria-hidden />
      </div>
      <div className="grid gap-x-8 gap-y-8 pt-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((d, k) => (
          <div key={d.title} className="flex items-start gap-3 border-t border-line pt-5">
            <span className="font-heading text-[28px] leading-none font-semibold text-[#B79CEC]">{String(k + 1).padStart(2, "0")}</span>
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

/** Screen slots until Sathi sends the screens (they'll go into the same ScreenGallery as the other modules). */
function ScreenSlots({ names }: { names: readonly string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {names.map((n, i) => (
        <figure key={n} className="grid gap-2">
          <ImageBox label={`Screen ${i + 1}: ${n}`} ratio="16 / 10" />
          <figcaption className="text-[13.5px] font-semibold text-ink">{n}</figcaption>
        </figure>
      ))}
    </div>
  )
}

/** Results (platform figures) on the dark board, then what I delivered, then targets still to come. */
function Metrics({ results, delivered }: { results: readonly { n: string; label: string }[]; delivered: readonly string[] }) {
  return (
    <div className="grid gap-8">
      <div className="rounded-[24px] p-5 text-white sm:p-7" style={darkGrid}>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-white/55 uppercase">Platform figures</p>
        <dl className="mt-3 grid grid-cols-2 gap-6">
          {results.map((r, i) => (
            <div key={r.label} className={cn(i > 0 && "border-l border-white/10 pl-6")}>
              <dd className="font-heading text-[56px] leading-[0.9] font-semibold tracking-[-0.04em] md:text-[72px]" style={mint}>
                {r.n}
              </dd>
              <dt className="mt-2 text-[13px] font-semibold text-white/70">{r.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[11.5px] text-white/45">Scinode for Manufacturers platform figures, not outcomes of one design change</p>
      </div>

      <div className="grid gap-3">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#6B4CB8] uppercase">What I delivered</p>
        <FlowReveal className="grid gap-3 md:grid-cols-3">
          {delivered.map((x, i) => (
            <p key={x} data-fl="node" style={at(i * 120)} className="flex gap-2 rounded-[18px] bg-[#e4f1eb] p-4 text-[13.5px] leading-snug text-ink">
              <Check className="mt-0.5 size-3.5 shrink-0 text-brand" strokeWidth={3} aria-hidden />
              <span>
                {x.replace(" [metric needed]", "")}
                {x.includes("[metric needed]") && <span className="mt-1.5 block w-fit rounded-full bg-[#FBF1D3] px-2 py-0.5 text-[11px] font-semibold text-[#8A6514]">[metric needed]</span>}
              </span>
            </p>
          ))}
        </FlowReveal>
      </div>

      <p className="inline-block w-fit rounded-full bg-[#ece9fd] px-3 py-1 text-[12px] font-semibold text-[#5b4fd1]">Targets for this module: to come from the product manager</p>
    </div>
  )
}

export const mfgOnboardingSections = [...onboarding.sections]

/** Manufacturer · Profile & onboarding: same sections as the researcher onboarding module. */
export function MfgOnboardingSections() {
  const m = onboarding
  return (
    <>
      <EdSection id="context" label="Context" title={["Onboarding that", "earns trust"]}>
        <Tag id="context" m={m} />
        <p className="max-w-[820px] font-heading text-[22px] leading-snug font-medium text-ink md:text-[26px]">{m.context}</p>
        <ContextBoard facts={m.facts} problems={m.problems} centre={["Manufacturer", "onboarding"]} />
      </EdSection>

      <EdSection id="research" label="Research" title={["What we heard,", "and what I designed"]}>
        <Tag id="research" m={m} />
        <p className="max-w-[680px] text-[16px] leading-snug text-body">
          From stakeholder interviews with Scimplify&rsquo;s business team and product manager, who work with manufacturers every day, plus the product docs and platform data.
        </p>
        <ResearchMap items={m.research} />
      </EdSection>

      <EdSection id="flow" label="Onboarding flow" title={["From sign-up", "to partner"]}>
        <Tag id="flow" m={m} />
        <p className="max-w-[680px] text-[16px] leading-snug text-body">One account, one facility profile, one admin review. The partner NDA waits for the first purchase order.</p>
        <LaneFlow data={m.flow} />
      </EdSection>

      <EdSection id="walkthrough" label="Walkthrough" title={["From a contact list", "to a verified profile"]}>
        <Tag id="walkthrough" m={m} />
        <Decisions items={m.decisions} film="manufacturer onboarding" />
      </EdSection>

      <EdSection id="screens" label="Key screens" title={["The screens", "behind the flow"]}>
        <ScreenSlots names={m.screens} />
      </EdSection>

      <EdSection id="impact" label="Success metrics" title={["What I delivered,", "and how it's measured"]}>
        <Tag id="impact" m={m} />
        <Metrics results={m.results} delivered={m.delivered} />
      </EdSection>
    </>
  )
}

export const mfgOrdersSections = [...orders.sections]

/** Manufacturer · Orders & execution: same sections and visuals as the Project management module. */
export function MfgOrdersSections() {
  const m = orders
  return (
    <>
      <EdSection id="context" label="Context" title={["Three portals,", "one order"]}>
        <Tag id="context" m={m} />
        <p className="max-w-[820px] font-heading text-[22px] leading-snug font-medium text-ink md:text-[26px]">{m.context}</p>
        <PmContextBoard facts={m.facts} problems={m.problems} />
      </EdSection>

      <EdSection id="users" label="Who uses it" title={["Three roles,", "one order record"]}>
        <Tag id="users" m={m} />
        <Surfaces surfaces={m.surfaces} note={m.surfacesNote} />
      </EdSection>

      <EdSection id="po" label="From PO to order" title={["From the purchase order", "to My Orders"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">
          Scimplify sits in the middle: the price is agreed with the customer, the PO and proforma invoice are exchanged, and the order appears in every portal at once.
        </p>
        <LaneFlow data={m.po} />
      </EdSection>

      <EdSection id="stages" label="Order stages" title={["Four stages,", "tracked to delivery"]}>
        <FlowReveal className="grid gap-6">
          <ol className="grid gap-3 md:grid-cols-4">
            {m.stages.map((s, i) => (
              <li key={s.name} data-fl="node" style={at(i * 140)} className="relative rounded-[20px] bg-[#e4f1eb] p-4">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-[13px] font-bold text-white">{i + 1}</span>
                <p className="mt-3 font-heading text-[18px] leading-tight font-semibold text-[#1F392D]">{s.name}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-body">{s.note}</p>
              </li>
            ))}
          </ol>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { title: "Every stage has", items: m.everyStage },
              { title: "After delivery", items: m.afterDelivery },
            ].map((g, k) => (
              <div key={g.title} data-fl="node" style={at(700 + k * 150)} className="rounded-[20px] border border-line bg-white p-4">
                <p className="text-[11.5px] font-semibold tracking-[0.12em] text-brand uppercase">{g.title}</p>
                <ul className="mt-2 grid gap-1.5">
                  {g.items.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-[14px] text-ink">
                      <CircleDot className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FlowReveal>
      </EdSection>

      <EdSection id="decisions" label="Key decisions" title={["Where requirements became", "interface"]}>
        <Tag id="decisions" m={m} />
        <Decisions items={m.decisions} film="orders & execution" />
      </EdSection>

      <EdSection id="screens" label="Key screens" title={["The screens", "behind the flow"]}>
        <ScreenSlots names={m.screens} />
      </EdSection>

      <EdSection id="impact" label="Success metrics" title={["What I delivered,", "and how it's measured"]}>
        <Tag id="impact" m={m} />
        <Metrics results={m.results} delivered={m.delivered} />
      </EdSection>
    </>
  )
}
