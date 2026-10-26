import Image from "next/image"
import { ArrowRight, ChartLine, Database, FastForward, MousePointerClick, Recycle } from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"
import { inter } from "./fonts"

// Block renderers added for the Deep Research case study. They are generic (driven by data),
// so later case studies can reuse them.

type B<T extends Block["type"]> = Extract<Block, { type: T }>

const tones = ["var(--tone-green)", "var(--tone-purple)", "var(--tone-blue)", "var(--tone-orange)"]
/** Text colour on each tone fill */
/** Text colour for tone-coloured labels on the soft tints */
const inkTones = ["var(--tone-green)", "var(--tone-purple-ink)", "var(--tone-blue)", "var(--tone-orange)"]
const onTones = ["#fff", "var(--on-purple)", "#fff", "#fff"]
const softTones = ["#e4f1eb", "#f3eefc", "#e6f2fe", "#fdeee0"]
const label = "text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

/* ---------------- Flow: A → B → C ---------------- */

export function FlowView({ block }: { block: B<"flow"> }) {
  return (
    <div>
      {block.label && <p className={cn(label, "mb-3")}>{block.label}</p>}
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
        {block.items.map((item, i) => (
          <li key={`${item}-${i}`} className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-black/[0.04]">
              <span aria-hidden className="size-2 rounded-full" style={{ background: tones[i % tones.length] }} />
              {item}
            </span>
            {i < block.items.length - 1 && <ArrowRight aria-hidden className="size-4 text-soft" />}
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------------- Principle / pull quote ---------------- */

export function PrincipleView({ block }: { block: B<"principle"> }) {
  return (
    <figure className="relative max-w-[760px] overflow-hidden rounded-[20px] bg-white/75 py-6 pr-6 pl-7 md:py-7 md:pr-8 md:pl-9">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-[var(--tone-purple)]" />
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--tone-purple-ink)] uppercase">{block.label ?? "Design principle"}</p>
      <blockquote className="mt-2 font-heading text-[22px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink md:text-[26px]">
        {block.text}
      </blockquote>
    </figure>
  )
}

/* ---------------- Shift: from → to ---------------- */

export function ShiftView({ block }: { block: B<"shift"> }) {
  return (
    <div>
      {block.label && <p className={cn(label, "mb-3")}>{block.label}</p>}
      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-[18px] border border-dashed border-soft/40 p-5 md:p-6">
          <p className={label}>From</p>
          <p className="mt-2 text-lg leading-snug font-medium text-body md:text-xl">{block.from}</p>
        </div>
        <span aria-hidden className="grid place-items-center text-brand">
          <ArrowRight className="size-6 max-md:rotate-90" />
        </span>
        <div className="rounded-[18px] bg-brand p-5 text-white md:p-6">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-white/70 uppercase">To</p>
          <p className="mt-2 text-lg leading-snug font-semibold md:text-xl">{block.to}</p>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Insights bento ---------------- */

export function InsightsView({ block }: { block: B<"insights"> }) {
  const [first, ...rest] = block.items
  return (
    <ol className="grid gap-px bg-line md:grid-cols-3">
      {first && (
        <li className="grid gap-8 bg-cream pb-8 md:col-span-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:pb-10">
          <div>
            <Badge n={1} />
            <h4 className="mt-4 text-[22px] leading-snug font-semibold text-ink">{first.title}</h4>
            <p className="mt-2 text-base leading-relaxed text-body md:text-[17px]">{first.text}</p>
          </div>
          {first.trail && (
            <ol className="relative grid gap-2.5 pl-6" aria-label="How one question evolves">
              <span aria-hidden className="absolute top-3 bottom-3 left-[7px] w-px bg-[var(--tone-purple)]/30" />
              {first.trail.map((q, i) => (
                <li key={q} className="relative" style={{ marginLeft: `${Math.min(i, 4) * 14}px` }}>
                  <span
                    aria-hidden
                    className="absolute top-1/2 -left-6 size-3.5 -translate-y-1/2 rounded-full border-2 border-cream"
                    style={{ background: i === first.trail!.length - 1 ? "var(--tone-purple)" : "#d9caf7" }}
                  />
                  <span className="inline-block rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-[15px] leading-snug text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                    “{q}”
                  </span>
                </li>
              ))}
            </ol>
          )}
        </li>
      )}
      {rest.map((f, i) => (
        <li key={f.title} className={cn("flex flex-col bg-cream py-8 md:pt-10 md:pb-0", i > 0 && "md:pl-7", i < rest.length - 1 && "md:pr-7")}>
          <Badge n={i + 2} />
          <h4 className="mt-4 text-[19px] leading-snug font-semibold text-ink">{f.title}</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-body md:text-base">{f.text}</p>
          {f.chips && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {f.chips.map((c, k) => (
                <li
                  key={c}
                  className="rounded-full px-2.5 py-1 text-[13px] font-semibold"
                  style={{ background: softTones[(i + 1 + k) % softTones.length], color: inkTones[(i + 1 + k) % tones.length] }}
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

function Badge({ n }: { n: number }) {
  return (
    <span
      className="grid size-8 place-items-center rounded-full text-[12px] font-bold"
      style={{ background: tones[(n - 1) % tones.length], color: onTones[(n - 1) % tones.length] }}
    >
      {String(n).padStart(2, "0")}
    </span>
  )
}

/* ---------------- Rich persona ---------------- */

type Persona = B<"personas">["items"][number]

export function RichPersona({ p }: { p: Persona }) {
  const groups = [
    { label: "Goals", items: p.goals, tone: "var(--tone-green)" },
    { label: "Frustrations", items: p.frustrations, tone: "var(--tone-orange)" },
  ]
  return (
    <article className="overflow-hidden rounded-[24px] ring-1 ring-line">
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* identity */}
        <div className="flex flex-col gap-6 p-6 md:p-8">
          {p.photo && (
            <Image
              src={p.photo.src}
              alt={p.photo.alt}
              width={p.photo.width}
              height={p.photo.height}
              sizes="(min-width: 1024px) 360px, 100vw"
              className="aspect-[4/3] w-full rounded-[18px] object-cover object-[38%_30%] shadow-[0_12px_30px_-14px_rgba(40,30,60,0.45)]"
            />
          )}
          <div className="flex items-center gap-4">
            {!p.photo && (
            <span aria-hidden className="grid size-16 place-items-center rounded-full bg-[var(--tone-purple)] font-heading text-xl font-bold text-[var(--on-purple)]">
              {p.name
                .replace(/^Dr\.?\s*/, "")
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
            )}
            <div>
              <h4 className="font-heading text-[24px] leading-tight font-semibold text-ink">{p.name}</h4>
              <p className="text-[15px] font-medium text-[var(--tone-purple-ink)]">{p.role}</p>
            </div>
          </div>
          {p.facts && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              {p.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] font-semibold tracking-[0.1em] text-soft uppercase">{f.label}</dt>
                  <dd className="mt-0.5 text-[15px] leading-snug font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {p.about && <p className="text-[15px] leading-relaxed text-body">{p.about}</p>}
          {p.quote && (
            <blockquote className="mt-auto rounded-2xl bg-white p-4 font-heading text-lg leading-snug font-semibold text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
              “{p.quote}”
            </blockquote>
          )}
        </div>
        {/* goals, frustrations, needs */}
        <div className="grid content-start gap-7 border-line p-6 max-lg:border-t md:p-8 lg:border-l">
          {groups.map((g) => (
            <div key={g.label}>
              <p className={cn(label, "mb-3")}>{g.label}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] leading-snug text-ink">
                    <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full" style={{ background: g.tone }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {p.needs && (
            <div>
              <p className={cn(label, "mb-3")}>Needs</p>
              <ul className="flex flex-wrap gap-2">
                {p.needs.map((n, i) => (
                  <li
                    key={n}
                    className="rounded-full px-3.5 py-1.5 text-sm font-semibold"
                    style={{ background: softTones[i % softTones.length], color: inkTones[i % tones.length] }}
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

/* ---------------- Journey map ---------------- */

const journeyRows = [
  { key: "goal", label: "User goal" },
  { key: "action", label: "User action" },
  { key: "response", label: "Product response" },
  { key: "pain", label: "Pain point" },
] as const

export function JourneyView({ block }: { block: B<"journey"> }) {
  return (
    <>
      {/* Desktop: stages as columns, scrolls sideways if needed */}
      <div className="hidden md:block">
        <table className="w-full table-fixed border-separate border-spacing-0 text-left text-[12.5px] leading-snug">
          <thead>
            <tr>
              <th className="w-[84px]" />
              {block.stages.map((s, i) => (
                <th key={s.stage} scope="col" className="px-1 pb-3 align-bottom">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 flex-1 rounded-full" style={{ background: tones[i % tones.length] }} />
                  </span>
                  <span className="mt-2 block text-[11px] font-semibold text-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block font-heading text-[16px] font-semibold text-ink">{s.stage}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {journeyRows.map((r) => (
              <tr key={r.key}>
                <th scope="row" className={cn(label, "border-t border-line py-3 pr-2 align-top !text-[9.5px] !tracking-[0.08em]")}>
                  {r.label}
                </th>
                {block.stages.map((s) => (
                  <td key={s.stage} className="border-t border-line px-1 py-3 align-top">
                    <span className={cn("block rounded-lg p-1.5 hyphens-auto", r.key === "pain" ? "bg-[#fdeee0] text-[#9a4a12]" : r.key === "response" ? "bg-white font-medium text-ink" : "text-body")}>
                      {s[r.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile: one card per stage */}
      <ol className="grid gap-3 md:hidden">
        {block.stages.map((s, i) => (
          <li key={s.stage} className="rounded-[18px] bg-white/80 p-5">
            <p className="flex items-center gap-2 font-heading text-lg font-semibold text-ink">
              <span className="size-2.5 rounded-full" style={{ background: tones[i % tones.length] }} />
              {String(i + 1).padStart(2, "0")} · {s.stage}
            </p>
            <dl className="mt-3 grid gap-2 text-[14px] leading-snug">
              {journeyRows.map((r) => (
                <div key={r.key} className="grid grid-cols-[110px_1fr] gap-2">
                  <dt className="text-soft">{r.label}</dt>
                  <dd className={r.key === "pain" ? "font-medium text-[#9a4a12]" : "text-ink"}>{s[r.key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </>
  )
}

/* ---------------- Information architecture tree ---------------- */

export function TreeView({ block }: { block: B<"tree"> }) {
  const n = block.groups.length
  return (
    <div className="rounded-[24px] bg-white/60 p-5 ring-1 ring-black/[0.03] md:p-8">
      <div className="flex justify-center">
        <span className="rounded-full bg-brand px-5 py-2.5 font-heading text-lg font-semibold text-white shadow-sm">{block.root}</span>
      </div>
      {/* connector: root down to a bar spanning the group columns */}
      <div aria-hidden className="mx-auto hidden h-6 w-px bg-brand/40 md:block" />
      <div className="relative">
        <div className={cn("grid gap-6 md:gap-4", n === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
          {block.groups.map((g, i) => (
            <div key={g.title} className="relative md:pt-6">
              {/* branch lines (desktop) */}
              <span aria-hidden className="absolute top-0 left-1/2 hidden h-6 w-px bg-brand/40 md:block" />
              <span
                aria-hidden
                className={cn("absolute top-0 hidden h-px bg-brand/40 md:block", i === 0 ? "left-1/2 right-[-0.5rem]" : i === n - 1 ? "right-1/2 left-[-0.5rem]" : "-right-2 -left-2")}
              />
              <div className="h-full rounded-[16px] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                  <span className="size-2.5 rounded-full" style={{ background: tones[i % tones.length] }} />
                  {g.title}
                </p>
                {g.note && <p className="mt-1 text-[13px] text-soft">{g.note}</p>}
                <ul className="mt-3 grid gap-1 border-l border-line pl-3">
                  {g.items.map((item) => (
                    <li key={item} className="relative text-[14px] leading-snug text-body">
                      <span aria-hidden className="absolute top-1/2 -left-3 h-px w-2 bg-line" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Screen specifications ---------------- */

export function SpecsView({ block }: { block: B<"specs"> }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {block.items.map((s, i) => (
        <li key={s.name} className="flex flex-col rounded-[18px] bg-white/80 p-5 ring-1 ring-black/[0.03]">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--tone-purple-ink)] uppercase">Screen {String(i + 1).padStart(2, "0")}</p>
          <h4 className="mt-1 font-heading text-[19px] leading-tight font-semibold text-ink">{s.name}</h4>
          <p className="mt-2 text-[14px] leading-snug text-body">
            <span className="font-semibold text-ink">Purpose: </span>
            {s.purpose}
          </p>
          {s.layout && (
            <div className="mt-3 flex h-7 overflow-hidden rounded-md text-[10px] font-semibold text-white" aria-label={s.layout}>
              <span className="grid flex-[7] place-items-center bg-[var(--tone-purple)]">70% Workspace</span>
              <span className="grid flex-[3] place-items-center bg-ink">30% AI</span>
            </div>
          )}
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {s.elements.map((e) => (
              <li key={e} className="rounded-md bg-sand px-2 py-0.5 text-[12.5px] text-ink">
                {e}
              </li>
            ))}
          </ul>
          {s.cta && (
            <p className="mt-auto flex items-center gap-1.5 pt-4 text-[13px] text-soft">
              <MousePointerClick className="size-4 text-[var(--tone-purple-ink)]" aria-hidden />
              Primary CTA
              <span className="rounded-full bg-[var(--tone-purple)] px-2.5 py-0.5 text-[12px] font-semibold text-[var(--on-purple)]">{s.cta}</span>
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}

/* ---------------- Typography ---------------- */

export function TypeHierarchyView({ block }: { block: B<"typeHierarchy"> }) {
  return (
    <div className={cn(inter.className, "grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]")}>
      <ol className="divide-y divide-line rounded-[20px] bg-white/80 px-5 md:px-7">
        {block.levels.map((l) => {
          const px = Math.min(parseInt(l.size, 10) || 14, 44)
          const weight = /bold/i.test(l.weight) ? 700 : /semi/i.test(l.weight) ? 600 : /medium/i.test(l.weight) ? 500 : 400
          return (
            <li key={l.name} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_150px] sm:items-center">
              <div className="min-w-0">
                <p className="truncate leading-tight text-[#171717]" style={{ fontSize: px, fontWeight: weight }}>
                  {l.name}
                </p>
                <p className="mt-1 text-[13px] text-[#6B6B6B]">{l.use}</p>
              </div>
              <p className="text-[13px] text-[#6B6B6B] tabular-nums sm:text-right">
                <span className="font-semibold text-[#171717]">{l.size}</span>
                <br className="max-sm:hidden" />
                <span className="sm:hidden"> · </span>
                {l.weight}
              </p>
            </li>
          )
        })}
      </ol>
      <div className="flex flex-col gap-4 rounded-[20px] bg-[#171717] p-6 text-white">
        <p className="text-[64px] leading-none font-semibold tracking-[-0.03em] md:text-[88px]">Aa</p>
        <div>
          <p className="text-xl font-semibold">{block.font}</p>
          <p className="mt-1 text-[13px] text-white/60">Regular · Medium · Semibold · Bold</p>
        </div>
        <p className="text-[26px] font-medium tracking-tight tabular-nums">0123456789</p>
        {block.samples && (
          <dl className="mt-auto grid gap-3 border-t border-white/15 pt-4">
            {block.samples.map((s) => (
              <div key={s.label}>
                <dt className="text-[10px] font-semibold tracking-[0.12em] text-white/50 uppercase">{s.label}</dt>
                <dd className="mt-0.5 font-mono text-[12.5px] break-all text-white/90">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}

/* ---------------- Vertical steps ---------------- */

export function StepsView({ block }: { block: B<"steps"> }) {
  return (
    <ol
      className="grid gap-x-10 md:grid-flow-col md:grid-cols-2"
      style={{ gridTemplateRows: `repeat(${Math.ceil(block.items.length / 2)}, auto)` }}
    >
      {block.items.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[40px_1fr] gap-x-4 pb-7">
          {/* connector (not after the last step of each column on desktop) */}
          {i < block.items.length - 1 && (
            <span
              aria-hidden
              className={cn("absolute top-10 bottom-1 left-[19px] w-px bg-line", i === Math.ceil(block.items.length / 2) - 1 && "md:hidden")}
            />
          )}
          <span
            className="relative grid size-10 place-items-center rounded-full font-heading text-sm font-bold"
            style={{ background: tones[i % tones.length], color: onTones[i % tones.length] }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-1.5">
            <p className="font-heading text-[20px] leading-tight font-semibold text-ink">{s.title}</p>
            <p className="mt-1 text-[15px] leading-snug text-body">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ---------------- Stat cards ---------------- */

export function StatsView({ block }: { block: B<"stats"> }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", block.items.length > 4 && "lg:grid-cols-3", block.items.length === 3 && "sm:grid-cols-3")}>
      {block.items.map((st, i) => (
        <li
          key={st.label}
          className={cn("flex flex-col justify-between gap-6 rounded-[22px] p-6 md:p-8", i === 0 ? "bg-[#1f392d] text-white" : "bg-white/80 text-[#1f392d] ring-1 ring-black/[0.04]")}
        >
          <p className={cn("font-heading leading-none font-bold tracking-[-0.03em]", block.items.length > 4 ? "text-[52px] md:text-[64px]" : "text-[48px] md:text-[84px]")}>{st.value}</p>
          <p className={cn("text-[17px] leading-snug md:text-lg", i === 0 ? "text-white/85" : "text-body")}>{st.label}</p>
        </li>
      ))}
    </ul>
  )
}

/* ---------------- Cycle (presentation-board loop) ---------------- */

const cycleIcons = { database: Database, recycle: Recycle, trend: ChartLine, forward: FastForward }
// Pastels shared with the sticky notes: [circle fill, icon/ink]
const cyclePaper = [
  ["#e9defd", "#3a2a63"],
  ["#d9f3e5", "#1f4634"],
  ["#fde3cf", "#5a3418"],
  ["#d9ecfd", "#1d3f5f"],
] as const

export function CycleView({ block }: { block: B<"cycle"> }) {
  const n = block.items.length
  return (
    <div className="relative mt-4">
      <ol className="relative grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-6">
        {block.items.map((c, i) => {
          const Icon = cycleIcons[c.icon]
          const [fill, ink] = cyclePaper[i % cyclePaper.length]
          const last = i === n - 1
          return (
            <li key={c.title} className="relative">
              {/* huge faint numeral behind */}
              <span aria-hidden className="pointer-events-none block font-heading text-[80px] leading-[0.8] font-bold md:text-[104px] tracking-[-0.06em] text-[#ebe3d6] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* icon disc overlapping the numeral */}
              <span
                className="relative -mt-9 ml-[118px] grid size-14 place-items-center rounded-full shadow-[0_10px_24px_-10px_rgba(40,30,50,0.35)] ring-4 ring-cream"
                style={{ background: fill, color: ink }}
              >
                <Icon className="size-6" strokeWidth={1.8} aria-hidden />
              </span>
              {/* dotted connector to the next step (desktop) */}
              {!last && (
                <svg aria-hidden viewBox="0 0 100 20" className="absolute top-[70px] left-[188px] hidden h-5 w-[calc(100%-176px)] lg:block" preserveAspectRatio="none">
                  <line x1="0" y1="10" x2="94" y2="10" stroke="#c9bfae" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M92,4 L99,10 L92,16" fill="none" stroke="#c9bfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </svg>
              )}
              <h4 className={cn("mt-6 font-heading text-[23px] leading-[1.15] font-semibold tracking-[-0.01em]", last ? "text-brand" : "text-ink")}>{c.title}</h4>
              <p className="mt-2 max-w-[260px] text-[15.5px] leading-snug text-body">{c.text}</p>
            </li>
          )
        })}
      </ol>
      {/* return arc: the loop starts again (desktop) */}
      <div aria-hidden className="relative mt-8 hidden h-14 lg:block">
        <svg viewBox="0 0 1000 56" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M880,0 C880,44 860,48 820,48 L180,48 C140,48 120,44 120,8" fill="none" stroke="#1f392d" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute top-[6px] left-[12%] -translate-x-1/2 text-[#1f392d]/60">
          <svg viewBox="0 0 12 12" className="size-3"><path d="M1,8 L6,2 L11,8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-cream px-4 font-hand text-[24px] leading-none font-bold text-[#1f392d]">
          and the loop starts again, smarter
        </span>
      </div>
    </div>
  )
}

/* ---------------- Lessons (editorial, no cards) ---------------- */

export function LessonsView({ block }: { block: B<"lessons"> }) {
  return (
    <ol className="grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
      {block.items.map((l, i) => (
        <li key={l.title} className={cn(i > 0 && "md:pl-10", i < block.items.length - 1 && "md:pr-10")}>
          <span aria-hidden className="block font-heading text-[72px] leading-[0.8] font-bold tracking-[-0.06em] text-[#ebe3d6] md:text-[112px]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="-mt-5 font-heading text-[26px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink md:text-[32px]">{l.title}</h4>
          <p className="mt-3 max-w-[380px] text-[17px] leading-relaxed text-body">{l.text}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------------- Finale ---------------- */

const finaleTones = ["text-ink", "text-brand", "text-[var(--tone-purple-ink)]"]

export function FinaleView({ block }: { block: B<"finale"> }) {
  return (
    <div className="relative mt-10 border-t border-line pt-14 md:mt-16 md:pt-20">
      <p className="font-heading text-[40px] leading-[1.02] font-semibold tracking-[-0.035em] md:text-[64px]">
        {block.lines.map((line, i) => (
          <span key={line} className={cn("block", finaleTones[i % finaleTones.length])}>
            {line}
          </span>
        ))}
      </p>
      {block.sign && (
        <p className="mt-10 flex items-center gap-3 font-hand text-[34px] leading-none font-bold text-[#2e7fd6] md:text-[42px]">
          <svg aria-hidden viewBox="0 0 60 24" className="h-6 w-14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M2,14 C14,4 22,22 34,12 S52,6 58,10" />
          </svg>
          {block.sign}
        </p>
      )}
    </div>
  )
}
