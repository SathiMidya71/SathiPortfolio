import { ArrowRight, UserRound, BadgeCheck, Bell, Check, Clock, FlaskConical, Globe, Lock, RotateCcw, Sparkles, X, type LucideIcon } from "lucide-react"
import {
  access,
  affinity,
  hmw,
  iterations,
  market,
  marketYears,
  objectives,
  userGroups,
  colourStudy,
  competitors,
  croTabs,
  journeyMap,
  labStages,
  methods,
  modules,
  painToDesign,
  patterns,
  projectTypes,
  proposalFlow,
  scientistSteps,
  synthesis,
  targets,
  themes,
  trustSignals,
  upcoming,
} from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// Coded visuals for the Scinode for Researchers case study. Page background or one white card at most
// (no nested containers), site palette only: brand green, purple, neutral sand.

const green = "#02594e"
const purple = "#5b4fd1"
const eyebrow = "text-[12px] font-semibold tracking-[0.1em] text-soft uppercase"

// ---------------- research ----------------

export function Methods() {
  return (
    <ul className="flex flex-wrap gap-2">
      {methods.map((m) => (
        <li key={m.title} className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-3.5 pl-1.5">
          <span className="grid size-6 place-items-center rounded-full bg-[#e4f1eb] text-brand">
            <Check className="size-3.5" strokeWidth={2.6} aria-hidden />
          </span>
          <span className="text-[14px] font-semibold text-ink">{m.title}</span>
          <span className="text-[13px] text-soft">{m.note}</span>
        </li>
      ))}
    </ul>
  )
}

export function Synthesis() {
  return (
    <ol className="grid gap-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
      {synthesis.map((s, i) => (
        <li key={s.title} className="relative">
          <div className="flex items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand font-heading text-[13px] font-bold text-white">{i + 1}</span>
            {i < synthesis.length - 1 && <span aria-hidden className="hidden h-0.5 flex-1 border-t-2 border-dashed border-brand/30 lg:block" />}
          </div>
          <p className="mt-3 font-heading text-[16px] font-semibold text-ink">{s.title}</p>
          <p className="mt-1 text-[13.5px] leading-snug text-body">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function Themes() {
  const dot: Record<string, string> = { High: green, Medium: purple, Low: "#c9c1b3" }
  return (
    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {themes.map((t, i) => (
        <div key={t.title} className="border-t-2 pt-4" style={{ borderColor: `${dot[t.priority]}55` }}>
          <div className="flex items-center justify-between gap-2">
            <p className="font-heading text-[13px] font-bold text-soft">Theme {i + 1}</p>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: t.priority === "Low" ? "#8a9592" : dot[t.priority] }}>
              <span className="size-2 rounded-full" style={{ background: dot[t.priority] }} aria-hidden /> {t.priority} priority
            </span>
          </div>
          <p className="mt-2 font-heading text-[19px] leading-tight font-semibold text-ink">{t.title}</p>
          <p className="mt-1.5 text-[14.5px] leading-snug text-body">{t.text}</p>
        </div>
      ))}
    </div>
  )
}

export function TrustSignals() {
  return (
    <div className="rounded-[22px] bg-[#ece9fd]/60 p-5 md:p-6">
      <p className="font-heading text-[18px] font-semibold text-ink">What buyers check before they trust a researcher</p>
      <p className="mt-1 text-[14.5px] text-body">From the buyer interviews. Every one of these became a profile section.</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {trustSignals.map((t) => (
          <li key={t} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13.5px] font-medium text-[#4a3fb0]">
            <BadgeCheck className="size-4" aria-hidden /> {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CompetitorMatrix() {
  const mark = (v: number, ours?: boolean) =>
    v === 1 ? (
      <span className={cn("mx-auto grid size-5 place-items-center rounded-full", ours ? "bg-brand text-white" : "bg-[#e4f1eb] text-brand")}>
        <Check className="size-3" strokeWidth={3} aria-label="yes" />
      </span>
    ) : v === 0.5 ? (
      <span className="mx-auto block size-2.5 rounded-full border-2 border-brand/50" aria-label="partly" />
    ) : (
      <span className="mx-auto block h-0.5 w-2.5 rounded bg-[#d6cbb9]" aria-label="no" />
    )
  return (
    <div>
      <div className="overflow-x-auto rounded-[20px] border border-line bg-white">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="sticky left-0 bg-white px-4 py-3 text-[12px] font-semibold text-soft">Platform</th>
              {competitors.features.map((f) => (
                <th key={f} className="px-2 py-3 text-center align-bottom text-[11.5px] leading-tight font-semibold text-soft">
                  {f}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.rows.map((r) => (
              <tr key={r.name} className={cn("border-b border-line last:border-0", r.ours && "bg-[#f4faf7]")}>
                <td className={cn("sticky left-0 px-4 py-2.5 text-[13.5px] whitespace-nowrap", r.ours ? "bg-[#f4faf7] font-semibold text-brand" : "bg-white text-ink")}>
                  {r.name}
                  {r.ours && <span className="ml-1.5 text-[11px] font-medium text-soft">(proposed)</span>}
                </td>
                {r.cells.map((v, i) => (
                  <td key={i} className="px-2 py-2.5 text-center">
                    {mark(v, r.ours)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] text-soft">No platform showed equipment, and almost none showed pricing. That became our gap to own.</p>
    </div>
  )
}

export function JourneyMapBoard() {
  const rows: { label: string; key: "touch" | "delight" | "opportunity"; tone: string }[] = [
    { label: "Touchpoints", key: "touch", tone: "#6b7f7c" },
    { label: "Delights", key: "delight", tone: green },
    { label: "Opportunities", key: "opportunity", tone: purple },
  ]
  return (
    <div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-3">
          <span />
          {journeyMap.map((j, i) => (
            <p key={j.phase} className="flex items-center gap-2 border-b-2 border-brand/30 pb-2 font-heading text-[18px] font-semibold text-ink">
              <span className="font-heading text-[12px] font-bold text-brand">{String(i + 1).padStart(2, "0")}</span> {j.phase}
            </p>
          ))}
          {rows.map((r) => (
            <div key={r.key} className="contents">
              <p className="pt-3 text-[11.5px] font-semibold tracking-[0.1em] uppercase" style={{ color: r.tone }}>
                {r.label}
              </p>
              {journeyMap.map((j) => (
                <p key={j.phase} className="border-t border-line pt-3 text-[13.5px] leading-snug text-body">
                  {j[r.key]}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ol className="grid gap-6 lg:hidden">
        {journeyMap.map((j, i) => (
          <li key={j.phase} className="border-l-2 border-brand/30 pl-4">
            <p className="font-heading text-[18px] font-semibold text-ink">
              <span className="mr-1.5 text-[12px] font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
              {j.phase}
            </p>
            <dl className="mt-1.5 grid gap-1">
              {rows.map((r) => (
                <div key={r.key} className="text-[14.5px] leading-snug">
                  <dt className="inline font-semibold" style={{ color: r.tone }}>
                    {r.label}:{" "}
                  </dt>
                  <dd className="inline text-body">{j[r.key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function PainToDesign() {
  return (
    <div>
      <div className="hidden grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,6fr)] gap-6 border-b border-line pb-2 md:grid">
        {["Pain point", "What they asked for", "How I designed for it"].map((h, i) => (
          <p key={h} className="text-[11.5px] font-semibold tracking-[0.1em] uppercase" style={{ color: [ "#b4533a", "#6b7f7c", green][i] }}>
            {h}
          </p>
        ))}
      </div>
      <ul className="divide-y divide-line">
        {painToDesign.map((r) => (
          <li key={r.pain} className="grid gap-1.5 py-4 md:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,6fr)] md:gap-6">
            <p className="font-heading text-[16px] leading-snug font-semibold text-ink">{r.pain}</p>
            <p className="text-[14.5px] leading-snug text-soft italic">&ldquo;{r.ask}&rdquo;</p>
            <p className="flex gap-2 text-[14.5px] leading-snug text-ink">
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden /> {r.design}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------------- structure ----------------

export function ModuleMap() {
  return (
    <div>
      <div className="flex justify-center">
        <span className="rounded-full bg-brand px-5 py-2.5 text-[16px] font-semibold text-white shadow-[0_16px_34px_-18px_rgba(2,89,78,0.8)]">Scinode for Researchers</span>
      </div>
      <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="hidden h-10 w-full lg:block" fill="none">
        <path d="M50 0 V5 M10 5 H90 M10 5 V10 M30 5 V10 M50 5 V10 M70 5 V10 M90 5 V10" stroke={green} strokeOpacity="0.5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-5">
        {modules.map((m, i) => (
          <li key={m.name} className="rounded-[18px] border border-brand/25 bg-white p-4 shadow-[0_14px_30px_-24px_rgba(16,24,40,0.45)]">
            <span className="font-heading text-[13px] font-bold text-brand/40">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1 font-heading text-[17px] leading-tight font-semibold text-ink">{m.name}</p>
            <ul className="mt-2.5 grid gap-1.5">
              {m.items.map((it) => (
                <li key={it} className="flex gap-2 text-[13px] leading-snug text-body">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand/50" aria-hidden /> {it}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function AccessGate() {
  const cell = (v: string) =>
    v === "yes" ? (
      <span className="mx-auto grid size-6 place-items-center rounded-full bg-[#e4f1eb] text-brand">
        <Check className="size-3.5" strokeWidth={3} aria-label="open" />
      </span>
    ) : v === "read" ? (
      <span className="mx-auto block w-fit rounded-full bg-sand px-2 py-0.5 text-[11px] font-semibold text-soft">Read only</span>
    ) : (
      <span className="mx-auto grid size-6 place-items-center rounded-full bg-sand text-[#a59c8c]">
        <Lock className="size-3" aria-label="locked" />
      </span>
    )
  return (
    <div className="overflow-x-auto rounded-[20px] border border-line bg-white">
      <table className="w-full min-w-[620px] border-collapse">
        <thead>
          <tr className="border-b border-line">
            <th className="px-4 py-3 text-left text-[12px] font-semibold text-soft">Profile status</th>
            {access.modules.map((m) => (
              <th key={m} className="px-2 py-3 text-center text-[12px] font-semibold text-soft">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {access.rows.map((r, i) => (
            <tr key={r.status} className={cn("border-b border-line last:border-0", i === 2 && "bg-[#f4faf7]")}>
              <td className={cn("px-4 py-3 text-[14px] font-semibold", i === 2 ? "text-brand" : "text-ink")}>{r.status}</td>
              {r.cells.map((c, j) => (
                <td key={j} className="px-2 py-3 text-center">
                  {cell(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------- module visuals ----------------

/** CRO: the first screen after sign-up is a dashboard with one job. */
export function CroOnboarding() {
  const done = 3
  const pct = Math.round((done / croTabs.length) * 100)
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className="grid gap-6 rounded-[24px] border border-line bg-white p-5 md:grid-cols-[220px_minmax(0,1fr)] md:p-7">
      <div className="flex flex-col items-center justify-center rounded-[18px] bg-[#f4faf7] p-5 text-center">
        <svg viewBox="0 0 80 80" className="size-28 -rotate-90" aria-hidden>
          <circle cx="40" cy="40" r={r} fill="none" stroke="#e4f1eb" strokeWidth="8" />
          <circle cx="40" cy="40" r={r} fill="none" stroke={green} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(c * pct) / 100} ${c}`} />
        </svg>
        <p className="-mt-[74px] mb-[46px] font-heading text-[24px] font-bold text-brand">{pct}%</p>
        <p className="text-[14px] font-semibold text-ink">Profile complete</p>
        <span className="mt-3 rounded-full bg-brand px-4 py-1.5 text-[13px] font-semibold text-white">Complete profile</span>
      </div>
      <div>
        <p className={eyebrow}>8 guided sections · autosaved</p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {croTabs.map((t, i) => (
            <li key={t} className="flex items-center gap-2 text-[14px] text-ink">
              {i < done ? (
                <span className="grid size-5 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3} aria-label="done" />
                </span>
              ) : (
                <span className="size-5 rounded-full border-2 border-[#d6cbb9]" aria-label="to do" />
              )}
              {t}
            </li>
          ))}
        </ul>
        <p className={cn(eyebrow, "mt-5")}>Unlocks after approval</p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {["Projects", "Proposals", "Deep Research", "Market intelligence"].map((m) => (
            <li key={m} className="flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-[13px] text-soft">
              <Lock className="size-3" aria-hidden /> {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Scientist: five short steps with time badges. */
export function ScientistStepper() {
  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {scientistSteps.map((s, i) => (
        <li key={s.title} className={cn("rounded-[18px] border p-4", i === 0 ? "border-[#5b4fd1]/40 bg-white shadow-[0_14px_30px_-24px_rgba(91,79,209,0.6)]" : "border-line bg-white/70")}>
          <div className="flex items-center gap-2">
            <span className={cn("grid size-7 place-items-center rounded-full font-heading text-[12px] font-bold", i === 0 ? "bg-[#5b4fd1] text-white" : "bg-[#ece9fd] text-[#5b4fd1]")}>{i + 1}</span>
            <span className="h-1 flex-1 rounded-full" style={{ background: i === 0 ? purple : "#ece9fd" }} aria-hidden />
          </div>
          <p className="mt-3 font-heading text-[16px] leading-tight font-semibold text-ink">{s.title}</p>
          <p className="mt-1 text-[13px] leading-snug text-body">{s.text}</p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#ece9fd] px-2 py-0.5 text-[11.5px] font-semibold text-[#5b4fd1]">
            <Clock className="size-3" aria-hidden /> {s.time}
          </span>
        </li>
      ))}
    </ol>
  )
}

/** Scientist profile: import instead of re-typing, and a TRL picker that explains itself. */
export function ScientistProfile() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-[22px] border border-line bg-white p-5">
        <p className={eyebrow}>Fill less, import more</p>
        <ul className="mt-3 grid gap-2">
          {[
            { icon: UserRound, l: "Import from LinkedIn" },
            { icon: Globe, l: "Import from Google Scholar" },
            { icon: Sparkles, l: "ORCID sync (planned)" },
          ].map((x) => (
            <li key={x.l} className="flex items-center gap-2.5 rounded-[12px] border border-line px-3 py-2 text-[14px] font-medium text-ink">
              <x.icon className="size-4 text-[#5b4fd1]" aria-hidden /> {x.l}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-soft">Publications and profile details fill in, so scientists only review and confirm.</p>
      </div>
      <div className="rounded-[22px] border border-line bg-white p-5">
        <p className={eyebrow}>Technology readiness (TRL)</p>
        <div className="mt-3 flex gap-1">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className={cn("grid h-9 flex-1 place-items-center rounded-[8px] text-[13px] font-bold", i < 4 ? "bg-[#5b4fd1] text-white" : "bg-[#ece9fd] text-[#5b4fd1]")}>
              {i + 1}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[14px] text-ink">
          <span className="font-semibold">TRL 4:</span> validated in the lab
        </p>
        <p className="mt-1 text-[13px] text-soft">Each level carries a short description, so a scientist can tell industry exactly how ready a technology is.</p>
      </div>
    </div>
  )
}

/** Opportunities: open and exclusive projects, matched by chemistry. */
export function Opportunities() {
  const icons: LucideIcon[] = [Globe, Lock]
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {projectTypes.map((t, i) => {
          const Icon = icons[i]
          const ex = i === 1
          return (
            <div key={t.title} className={cn("relative rounded-[22px] border bg-white p-5", ex ? "border-[#5b4fd1]/30" : "border-line")}>
              {ex && (
                <span className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#5b4fd1] px-2.5 py-1 text-[11px] font-bold text-white">
                  <Bell className="size-3" aria-hidden /> New match
                </span>
              )}
              <span className="grid size-10 place-items-center rounded-[12px]" style={{ background: ex ? "#ece9fd" : "#e4f1eb", color: ex ? purple : green }}>
                <Icon className="size-5" strokeWidth={1.9} aria-hidden />
              </span>
              <p className="mt-4 font-heading text-[19px] font-semibold text-ink">{t.title}</p>
              <p className="mt-1.5 text-[14.5px] leading-snug text-body">{t.text}</p>
            </div>
          )
        })}
      </div>
      {/* a matched project card */}
      <div className="flex flex-wrap items-center gap-4 rounded-[22px] border border-brand/25 bg-white p-5">
        <div className="relative grid size-16 shrink-0 place-items-center">
          <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="20" cy="20" r="16" fill="none" stroke="#e4f1eb" strokeWidth="4" />
            <circle cx="20" cy="20" r="16" fill="none" stroke={green} strokeWidth="4" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 16 * 0.86} 200`} />
          </svg>
          <span className="font-heading text-[14px] font-bold text-brand">86%</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold tracking-[0.1em] text-soft uppercase">Example match · brief preview</p>
          <p className="font-heading text-[17px] font-semibold text-ink">Custom synthesis, heterocyclic intermediate</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {["≥98% purity", "100 g → 10 kg", "HPLC + COA", "NDA required"].map((x) => (
              <li key={x} className="rounded-full bg-sand px-2.5 py-0.5 text-[12.5px] text-body">
                {x}
              </li>
            ))}
          </ul>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-[#e4f1eb] px-3 py-1 text-[12.5px] font-semibold text-brand">
          <BadgeCheck className="size-3.5" aria-hidden /> Verified buyer
        </span>
      </div>
      <p className="-mt-2 text-[13px] text-soft">Illustrative card. The match score, brief preview and buyer badge come from the supplier research.</p>
    </div>
  )
}

/** Proposals: the tracker from the supplier's side. */
export function ProposalFlow() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {proposalFlow.map((p, i) => {
        const won = p.tone === "won"
        const lost = p.tone === "lost"
        return (
          <li key={p.status} className={cn("rounded-[18px] border bg-white p-4", won ? "border-brand/40" : lost ? "border-dashed border-[#d6cbb9]" : "border-line")}>
            <div className="flex items-center gap-2">
              <span className={cn("grid size-7 place-items-center rounded-full font-heading text-[12px] font-bold", won ? "bg-brand text-white" : lost ? "bg-sand text-soft" : "bg-[#e4f1eb] text-brand")}>
                {won ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : lost ? <X className="size-3.5" aria-hidden /> : i + 1}
              </span>
              <p className={cn("font-heading text-[16px] font-semibold", lost ? "text-soft" : "text-ink")}>{p.status}</p>
              {p.status === "Under review" && <span className="ml-auto rounded-full bg-[#ece9fd] px-2 py-0.5 text-[11px] font-bold text-[#5b4fd1]">Action required</span>}
            </div>
            <p className="mt-2 text-[13.5px] leading-snug text-body">{p.text}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.actions.map((a) => (
                <li key={a} className="rounded-full border border-line px-2.5 py-0.5 text-[12px] font-medium text-ink">
                  {a}
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ol>
  )
}

/** Project management: 6 gated stages, and the same two choices at every milestone. */
export function LabWorkflow() {
  return (
    <div className="grid gap-8">
      <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {labStages.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="flex items-center gap-2">
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-full font-heading text-[13px] font-bold", i < 2 ? "bg-brand text-white" : "border-2 border-brand/30 bg-white text-brand")}>{i + 1}</span>
              {i < labStages.length - 1 && <span aria-hidden className="hidden h-0.5 flex-1 border-t-2 border-dashed border-brand/30 lg:block" />}
            </div>
            <p className="mt-3 font-heading text-[16px] font-semibold text-ink">{s.title}</p>
            <p className="mt-0.5 font-mono text-[12.5px] text-soft">{s.batch}</p>
          </li>
        ))}
      </ol>
      <div className="grid items-center gap-4 rounded-[24px] border border-line bg-white p-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:p-6">
        <div>
          <p className={eyebrow}>At every milestone</p>
          <p className="mt-1 font-heading text-[18px] font-semibold text-ink">Batch FB-02 · Feasibility</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-[13px] font-semibold text-white">
              <Check className="size-3.5" aria-hidden /> Mark successful
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[13px] font-semibold text-ink">
              <RotateCcw className="size-3.5" aria-hidden /> Try new batch
            </span>
          </div>
        </div>
        <ArrowRight className="hidden size-6 text-brand/40 md:block" aria-hidden />
        <div>
          <p className={eyebrow}>Review</p>
          <p className="mt-1 text-[14.5px] leading-snug text-body">The reviewer gets an email and an in-app alert, opens the data, files and remarks, then decides.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#e4f1eb] px-3 py-1 text-[13px] font-semibold text-brand">Approve → next stage</span>
            <span className="rounded-full bg-sand px-3 py-1 text-[13px] font-semibold text-body">Reject with remarks → retry</span>
          </div>
        </div>
      </div>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Batch numbering", d: "FB-01, FB-02 … then OB-07: every batch keeps its source reference." },
          { t: "Golden batch", d: "The best optimised condition is marked and carried into validation." },
          { t: "Milestone files", d: "Batch reports, CoAs and spectra upload to the stage, not to email." },
          { t: "Full history", d: "Every comment, file and decision is versioned and visible." },
        ].map((x) => (
          <li key={x.t} className="border-l-2 border-brand/30 pl-3">
            <p className="text-[14.5px] font-semibold text-ink">{x.t}</p>
            <p className="mt-0.5 text-[13.5px] leading-snug text-body">{x.d}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Patterns() {
  return (
    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {patterns.map((p, i) => (
        <div key={p.title}>
          <p className="font-heading text-[40px] leading-none font-semibold text-brand/15">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-2 font-heading text-[18px] font-semibold text-ink">{p.title}</p>
          <p className="mt-1 text-[14.5px] leading-snug text-body">{p.text}</p>
        </div>
      ))}
    </div>
  )
}

export function ColourStudy() {
  return (
    <div className="grid gap-8">
      <div>
        <p className={eyebrow}>Competitors lean blue</p>
        <ul className="mt-3 flex flex-wrap gap-3">
          {colourStudy.competitors.map((c) => (
            <li key={c.name} className="flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pr-3.5 pl-1.5">
              <span className="size-7 rounded-full" style={{ background: c.hex }} aria-hidden />
              <span className="text-[13.5px] font-medium text-ink">{c.name}</span>
              <span className="font-mono text-[12px] text-soft">{c.hex}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={eyebrow}>Explored: colours drawn from the lab</p>
        <ul className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colourStudy.explored.map((c) => (
            <li key={c.name}>
              <span className="block aspect-[4/3] rounded-[16px] shadow-[0_14px_30px_-20px_rgba(16,24,40,0.5)]" style={{ background: c.hex }} aria-hidden />
              <p className="mt-2 text-[14px] font-semibold text-ink">{c.name}</p>
              <p className="font-mono text-[12px] text-soft">{c.hex}</p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-body">{c.why}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="flex items-start gap-2 text-[14.5px] leading-snug text-ink">
        <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
        The direction settled on a deep green and purple, shared across the Scinode family, so researchers recognise it next to Scinode Deep Research.
      </p>
    </div>
  )
}

export function Targets() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
        {targets.map((t) => (
          <li key={t.label} className="border-t-2 border-dashed border-brand/30 pt-4">
            <p className="font-heading text-[40px] leading-none font-semibold text-brand md:text-[46px]">{t.value}</p>
            <p className="mt-2 text-[14.5px] text-body">{t.label}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-soft">
        <FlaskConical className="size-4" aria-hidden /> Targets set with the PM for the profile module. Results to come.
      </p>
    </div>
  )
}

export function Upcoming() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {upcoming.map((u, i) => (
        <div key={u.title} className="border-t-2 border-dashed border-[#d6cbb9] pt-5">
          <p className="font-heading text-[44px] leading-none font-semibold text-brand/15">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-3 font-heading text-[19px] font-semibold text-ink">{u.title}</p>
          <p className="mt-1.5 text-[14.5px] leading-snug text-body">{u.text}</p>
        </div>
      ))}
    </div>
  )
}

// ---------------- research framing ----------------

export function Objectives() {
  return (
    <div className="grid gap-8">
      <ol className="grid gap-x-10 gap-y-5 md:grid-cols-2">
        {objectives.map((o, i) => (
          <li key={o} className="flex gap-4">
            <span className="w-14 shrink-0 font-heading text-[40px] leading-none font-semibold text-brand/20">{String(i + 1).padStart(2, "0")}</span>
            <p className="pt-1 text-[16.5px] leading-snug text-ink">{o}</p>
          </li>
        ))}
      </ol>
      <div className="border-l-4 border-[#5b4fd1] pl-5">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#5b4fd1] uppercase">How might we</p>
        <p className="mt-1.5 font-heading text-[24px] leading-snug font-semibold text-ink md:text-[28px]">{hmw}</p>
      </div>
    </div>
  )
}

export function Market() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-5 md:grid-cols-2">
        {market.map((m) => (
          <div key={m.label} className="rounded-[22px] border border-line bg-white p-5 md:p-6">
            <p className={eyebrow}>{m.label}</p>
            <div className="mt-4 flex items-end gap-3">
              <div>
                <p className="text-[12px] text-soft">{marketYears[0]}</p>
                <p className="font-heading text-[30px] leading-none font-semibold text-ink">{m.from}</p>
              </div>
              <div className="mb-3 h-0.5 flex-1 bg-gradient-to-r from-brand/20 to-brand" aria-hidden />
              <div className="text-right">
                <p className="text-[12px] text-soft">{marketYears[1]}</p>
                <p className="font-heading text-[40px] leading-none font-semibold text-brand">{m.to}</p>
              </div>
            </div>
            <p className="mt-4 text-[14px] text-body">
              Growing at a <span className="font-semibold text-ink">{m.cagr} CAGR</span>
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {userGroups.map((g) => (
          <div key={g.title}>
            <p className="font-heading text-[19px] font-semibold text-ink">
              {g.title} <span className="text-[14px] font-normal text-soft">· {g.note}</span>
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <li key={it} className={cn("rounded-full px-3 py-1 text-[13px] font-medium", g.title === "Suppliers" ? "bg-[#e4f1eb] text-brand" : "bg-sand text-body")}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Affinity() {
  const tones = [
    { bg: "#fbefe9", ink: "#b4533a" },
    { bg: "#e4f1eb", ink: green },
    { bg: "#f2ece3", ink: "#6b7f7c" },
    { bg: "#ece9fd", ink: purple },
  ]
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {affinity.map((col, i) => (
        <div key={col.title}>
          <p className="font-heading text-[17px] font-semibold" style={{ color: tones[i].ink }}>
            {col.title}
          </p>
          <ul className="mt-3 grid gap-2">
            {col.items.map((it, j) => (
              <li
                key={it}
                className="rounded-[6px] px-3 py-2.5 text-[13.5px] leading-snug text-ink shadow-[0_8px_18px_-14px_rgba(16,24,40,0.5)]"
                style={{ background: tones[i].bg, rotate: `${((i + j) % 3) - 1}deg` }}
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function Iterations() {
  return (
    <div>
      <div className="hidden grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)] gap-6 border-b border-line pb-2 md:grid">
        <span />
        <p className="text-[11.5px] font-semibold tracking-[0.1em] text-soft uppercase">First concept</p>
        <p className="text-[11.5px] font-semibold tracking-[0.1em] text-brand uppercase">After iterations</p>
      </div>
      <ul className="divide-y divide-line">
        {iterations.map((r) => (
          <li key={r.area} className="grid gap-2 py-4 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
            <p className="font-heading text-[16px] font-semibold text-ink">{r.area}</p>
            <p className="text-[14.5px] leading-snug text-soft">{r.before}</p>
            <p className="flex gap-2 text-[14.5px] leading-snug text-ink">
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden /> {r.after}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
