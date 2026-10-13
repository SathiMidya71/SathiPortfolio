import {
  ArrowRight,
  Beaker,
  Brain,
  Check,
  Compass,
  Eye,
  FileWarning,
  Hand,
  Heart,
  Layers,
  LayoutGrid,
  Lock,
  MailWarning,
  Map as MapIcon,
  MessageCircle,
  MessagesSquare,
  Microscope,
  Puzzle,
  Route,
  Search,
  ShieldCheck,
  Shuffle,
  Sparkles,
  StickyNote,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react"
import {
  affinity,
  colourStudy,
  competitors,
  empathy,
  flow,
  hmw,
  insights,
  journeyMap,
  methods,
  metrics,
  objectives,
  personas,
  problems,
  profiles,
  shared,
  targets,
  upcoming,
} from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// Coded visuals for the Scinode for Researchers case study: visual first, very little text.
// Site palette only (brand green, purple, neutral sand), on the page background or a single white card.

const green = "#02594e"
const purple = "#5b4fd1"

// ---------------- overview: metric cards with small visuals ----------------

function MetricCard({ value, label, children }: { value: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-[24px] border border-line bg-white p-5 shadow-[0_18px_40px_-30px_rgba(16,24,40,0.45)]">
      <div className="flex h-16 items-center">{children}</div>
      <p className="mt-4 font-heading text-[46px] leading-none font-semibold text-brand">{value}</p>
      <p className="mt-2 text-[14.5px] leading-snug text-body">{label}</p>
    </div>
  )
}

export function Metrics() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <MetricCard {...metrics.users}>
        <div className="flex items-center">
          <span className="grid size-11 place-items-center rounded-full bg-[#e4f1eb] text-brand ring-4 ring-white">
            <Microscope className="size-5" aria-hidden />
          </span>
          <span className="-ml-3 grid size-11 place-items-center rounded-full bg-[#ece9fd] text-[#5b4fd1] ring-4 ring-white">
            <Beaker className="size-5" aria-hidden />
          </span>
          <ArrowRight className="mx-2 size-4 text-soft" aria-hidden />
          <span className="grid size-11 place-items-center rounded-full bg-brand text-white">
            <Layers className="size-5" aria-hidden />
          </span>
        </div>
      </MetricCard>
      <MetricCard {...metrics.modules}>
        <div className="flex w-full gap-1">
          {metrics.modules.items.map((m, i) => (
            <span key={m} className="h-9 flex-1 rounded-[8px]" style={{ background: green, opacity: 0.35 + i * 0.16 }} title={m} />
          ))}
        </div>
      </MetricCard>
      <MetricCard {...metrics.questions}>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="size-3 rounded-full" style={{ background: i < 10 ? green : purple, opacity: 0.8 }} />
          ))}
        </div>
      </MetricCard>
      <MetricCard {...metrics.gap}>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="h-7 w-3 rounded-[4px] border-2 border-dashed border-[#d6cbb9]" />
          ))}
        </div>
      </MetricCard>
    </div>
  )
}

// ---------------- problem ----------------

export function Problems() {
  const icons: LucideIcon[] = [Eye, Shuffle, MailWarning]
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {problems.map((p, i) => {
        const Icon = icons[i]
        return (
          <div key={p.title} className="flex gap-4 rounded-[24px] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(16,24,40,0.45)] md:block md:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-[#fbefe9] text-[#b4533a]">
              <Icon className="size-6" strokeWidth={1.8} aria-hidden />
            </span>
            <div>
              <p className="font-heading text-[24px] leading-none font-semibold text-ink md:mt-5 md:text-[30px]">{p.title}</p>
              <p className="mt-2 text-[15px] leading-snug text-body md:mt-3 md:text-[15.5px]">{p.text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------------- objectives ----------------

export function Objectives() {
  const icons: LucideIcon[] = [Search, Puzzle, ShieldCheck, Route]
  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {objectives.map((o, i) => {
          const Icon = icons[i]
          return (
            <div key={o.title} className="rounded-[22px] border border-line bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-full bg-[#e4f1eb] text-brand">
                  <Icon className="size-5" strokeWidth={1.9} aria-hidden />
                </span>
                <span className="font-heading text-[28px] leading-none font-semibold text-brand/15">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-4 font-heading text-[19px] font-semibold text-ink">{o.title}</p>
              <p className="mt-1 text-[14px] leading-snug text-body">{o.text}</p>
            </div>
          )
        })}
      </div>
      <div className="relative overflow-hidden rounded-[28px] bg-[#ece9fd] px-6 py-8 md:px-10 md:py-10">
        <Sparkles className="absolute top-6 right-6 size-8 text-[#5b4fd1]/30" aria-hidden />
        <p className="text-[12px] font-semibold tracking-[0.14em] text-[#5b4fd1] uppercase">How might we</p>
        <p className="mt-3 max-w-[860px] font-heading text-[26px] leading-snug font-semibold text-[#2B2150] md:text-[32px]">{hmw}</p>
      </div>
    </div>
  )
}

// ---------------- methods ----------------

export function Methods() {
  const icons: LucideIcon[] = [MessagesSquare, LayoutGrid, StickyNote, Heart, Users, MapIcon, Layers]
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {methods.map((m, i) => {
        const Icon = icons[i]
        const lead = i === 0
        return (
          <li key={m.title} className={cn("flex flex-col items-center rounded-[22px] p-4 text-center", lead ? "bg-brand text-white" : "border border-line bg-white")}>
            <span className={cn("grid size-12 place-items-center rounded-full", lead ? "bg-white/15" : "bg-[#e4f1eb] text-brand")}>
              <Icon className="size-6" strokeWidth={1.8} aria-hidden />
            </span>
            <p className={cn("mt-3 text-[14.5px] leading-tight font-semibold", lead ? "text-white" : "text-ink")}>{m.title}</p>
            <p className={cn("mt-1 text-[12.5px] leading-snug", lead ? "text-white/75" : "text-soft")}>{m.note}</p>
          </li>
        )
      })}
    </ul>
  )
}

// ---------------- what CROs and scientists told us ----------------

export function Insights() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {insights.map((it, i) => (
        <article key={it.title} className={cn("flex flex-col rounded-[24px] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(16,24,40,0.45)]", i === 0 && "lg:col-span-2")}>
          <MessageCircle className="size-7 text-[#5b4fd1]/40" aria-hidden />
          <p className={cn("mt-3 font-serif leading-[1.35] text-ink", i === 0 ? "text-[24px] md:text-[28px]" : "text-[19px]")}>&ldquo;{it.quote}&rdquo;</p>
          <div className="mt-auto pt-5">
            <p className="text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">{it.title}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#e4f1eb] px-3 py-1.5 text-[13.5px] font-semibold text-brand">
              <ArrowRight className="size-3.5" aria-hidden /> {it.design}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

// ---------------- competitive analysis ----------------

export function Competitors() {
  const others = competitors.rows.filter((r) => !("ours" in r && r.ours))
  const coverage = competitors.features.map((f, i) => ({ f, n: others.reduce((s, r) => s + (r.cells[i] === 1 ? 1 : 0), 0) }))
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
    <div className="grid gap-8">
      {/* how many of the 10 competitors offer each feature */}
      <ul className="grid gap-2.5">
        {coverage
          .slice()
          .sort((a, b) => a.n - b.n)
          .map((c) => (
            <li key={c.f} className="grid grid-cols-[130px_minmax(0,1fr)_44px] items-center gap-3 sm:grid-cols-[170px_minmax(0,1fr)_56px]">
              <span className="text-[14px] text-ink">{c.f}</span>
              <span className="h-3 overflow-hidden rounded-full bg-sand">
                <span className="block h-full rounded-full" style={{ width: `${Math.max(c.n * 10, 2)}%`, background: c.n < 2 ? "#b4533a" : green }} />
              </span>
              <span className={cn("text-right font-heading text-[15px] font-semibold", c.n < 2 ? "text-[#b4533a]" : "text-ink")}>{c.n}/10</span>
            </li>
          ))}
      </ul>
      {/* full matrix on large screens */}
      <table className="hidden w-full table-fixed border-collapse rounded-[20px] bg-white text-left lg:table">
        <thead>
          <tr className="border-b border-line">
            <th className="w-[170px] px-4 py-3 text-[12px] font-semibold text-soft">Platform</th>
            {competitors.features.map((f) => (
              <th key={f} className="px-1 py-3 text-center align-bottom text-[11px] leading-tight font-semibold text-soft">
                {f}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {competitors.rows.map((r) => {
            const ours = "ours" in r && r.ours
            return (
              <tr key={r.name} className={cn("border-b border-line last:border-0", ours && "bg-[#f4faf7]")}>
                <td className={cn("truncate px-4 py-2.5 text-[13.5px]", ours ? "font-semibold text-brand" : "text-ink")}>{ours ? "Scinode (ours)" : r.name}</td>
                {r.cells.map((v, i) => (
                  <td key={i} className="px-1 py-2.5 text-center">
                    {mark(v, ours)}
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

// ---------------- affinity mapping ----------------

export function Affinity() {
  const tones = [
    { bg: "#fbefe9", ink: "#b4533a" },
    { bg: "#e4f1eb", ink: green },
    { bg: "#f2ece3", ink: "#6b7f7c" },
    { bg: "#ece9fd", ink: purple },
  ]
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {affinity.map((col, i) => (
        <div key={col.title}>
          <p className="font-heading text-[18px] font-semibold" style={{ color: tones[i].ink }}>
            {col.title}
          </p>
          <ul className="mt-3 grid gap-2.5">
            {col.items.map((it, j) => (
              <li
                key={it}
                className="rounded-[4px] px-3 py-3 text-[14px] leading-snug text-ink shadow-[0_10px_20px_-14px_rgba(16,24,40,0.55)]"
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

// ---------------- empathy map (compact, one viewport) ----------------

export function Empathy() {
  const quads: { title: string; icon: LucideIcon; items: readonly string[]; tone: string; tint: string }[] = [
    { title: "Says", icon: MessageCircle, items: empathy.says, tone: purple, tint: "#ece9fd" },
    { title: "Thinks", icon: Brain, items: empathy.thinks, tone: "#4a6a8a", tint: "#e9eef4" },
    { title: "Does", icon: Hand, items: empathy.does, tone: green, tint: "#e4f1eb" },
    { title: "Feels", icon: Heart, items: empathy.feels, tone: "#b4533a", tint: "#fbefe9" },
  ]
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-[26px] bg-line">
        {quads.map((q) => (
          <div key={q.title} className="bg-white p-5">
            <p className="flex items-center gap-2 font-heading text-[18px] font-semibold" style={{ color: q.tone }}>
              <span className="grid size-8 place-items-center rounded-full" style={{ background: q.tint }}>
                <q.icon className="size-4" aria-hidden />
              </span>
              {q.title}
            </p>
            <ul className="mt-3 grid gap-1.5">
              {q.items.map((t) => (
                <li key={t} className="text-[14px] leading-snug text-body">
                  {q.title === "Says" ? `“${t}”` : t}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-white shadow-[0_0_0_6px_white]">
          <Microscope className="size-7" aria-hidden />
        </span>
      </div>
      <div className="grid gap-4">
        {[
          { title: "Pains", items: empathy.pains, tone: "#b4533a", tint: "#fbefe9" },
          { title: "Gains", items: empathy.gains, tone: green, tint: "#e4f1eb" },
        ].map((b) => (
          <div key={b.title} className="rounded-[22px] p-5" style={{ background: b.tint }}>
            <p className="font-heading text-[18px] font-semibold" style={{ color: b.tone }}>
              {b.title}
            </p>
            <ul className="mt-2 grid gap-1.5">
              {b.items.map((t) => (
                <li key={t} className="text-[14px] leading-snug text-ink">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------- personas, side by side, plus "same use cases, different profile" ----------------

export function Personas() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {personas.map((p) => {
          const cro = p.key === "cro"
          const ink = cro ? green : purple
          const tint = cro ? "#e4f1eb" : "#ece9fd"
          const Icon = cro ? Microscope : Beaker
          return (
            <article key={p.key} className="flex flex-col rounded-[26px] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(16,24,40,0.45)]">
              <div className="flex items-center gap-4">
                <span className="relative grid size-16 shrink-0 place-items-center rounded-full" style={{ background: tint, color: ink }}>
                  <span aria-hidden className="absolute -inset-1.5 rounded-full border-2 border-dashed" style={{ borderColor: `${ink}40` }} />
                  <Icon className="size-7" strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: ink }}>
                    {p.label}
                  </p>
                  <h3 className="font-heading text-[22px] leading-tight font-semibold text-ink">{p.name}</h3>
                  <p className="text-[13.5px] leading-snug text-body">{p.role}</p>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.facts.map((f) => (
                  <li key={f} className="rounded-full px-2.5 py-1 text-[12.5px] font-medium" style={{ background: tint, color: ink }}>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-5 border-t border-line pt-4">
                {[
                  { t: "Goals", icon: Target, items: p.goals, tone: ink },
                  { t: "Pain points", icon: FileWarning, items: p.pains, tone: "#b4533a" },
                ].map((c) => (
                  <div key={c.t}>
                    <p className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                      <c.icon className="size-4" style={{ color: c.tone }} aria-hidden /> {c.t}
                    </p>
                    <ul className="mt-2 grid gap-1.5">
                      {c.items.map((x) => (
                        <li key={x} className="text-[13.5px] leading-snug text-body">
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-auto pt-4 text-[12px] text-soft">{p.source}</p>
            </article>
          )
        })}
      </div>
      {/* the one real difference */}
      <div className="grid items-stretch gap-4 rounded-[26px] border border-line bg-white p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:p-7">
        <div className="rounded-[18px] bg-brand p-5 text-white">
          <p className="text-[12px] font-semibold tracking-[0.12em] text-white/70 uppercase">Same for both</p>
          <ul className="mt-3 grid gap-2">
            {shared.map((s) => (
              <li key={s} className="flex items-center gap-2 text-[15.5px] font-semibold">
                <Check className="size-4" strokeWidth={3} aria-hidden /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.12em] text-soft uppercase">Only the profile is different</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {[
              { l: "CRO profile", items: profiles.cro, ink: green, tint: "#e4f1eb", note: "8 sections" },
              { l: "Scientist profile", items: profiles.scientist, ink: purple, tint: "#ece9fd", note: "5 steps" },
            ].map((c) => (
              <div key={c.l}>
                <p className="font-heading text-[16px] font-semibold" style={{ color: c.ink }}>
                  {c.l} <span className="text-[12.5px] font-medium text-soft">· {c.note}</span>
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {c.items.map((x) => (
                    <li key={x} className="rounded-full px-2.5 py-1 text-[12.5px] font-medium" style={{ background: c.tint, color: c.ink }}>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------- user journey map (platform workflow shape) ----------------

export function JourneyMap() {
  const icons: LucideIcon[] = [Compass, Puzzle, MessagesSquare, LayoutGrid, Sparkles]
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      {journeyMap.map((j, i) => {
        const Icon = icons[i]
        return (
          <li key={j.stage}>
            <div className="relative">
              <span aria-hidden className="absolute inset-0 translate-x-1 translate-y-1 rounded-[14px] bg-[#7fcfa8]" />
              <p className="relative flex items-center justify-between rounded-[14px] border-2 border-brand bg-white px-4 py-2.5 font-heading text-[18px] font-semibold text-ink">
                {j.stage}
                <ArrowRight className="size-5 text-brand" aria-hidden />
              </p>
            </div>
            <p className="mt-5 flex items-start gap-2 font-heading text-[17px] leading-snug font-semibold text-ink">
              <Icon className="mt-0.5 size-4.5 shrink-0 text-brand" aria-hidden /> {j.headline}
            </p>
            <ul className="relative mt-3 grid gap-2.5 pl-4">
              <span aria-hidden className="absolute top-1.5 bottom-1.5 left-[3px] w-0.5 rounded bg-[#7fcfa8]" />
              {j.points.map((p) => (
                <li key={p} className="relative text-[14px] leading-snug text-body">
                  <span aria-hidden className="absolute top-[7px] -left-4 size-2 rounded-full bg-[#2fae74]" />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ol>
  )
}

// ---------------- platform architecture: one flow, two profiles ----------------

export function Architecture() {
  const Node = ({ title, items, locked }: { title: string; items: readonly string[]; locked?: boolean }) => (
    <div className={cn("relative h-full rounded-[18px] border bg-white p-4", locked ? "border-dashed border-brand/40" : "border-brand/30")}>
      {locked && <Lock className="absolute top-3 right-3 size-3.5 text-brand/60" aria-label="unlocks after verification" />}
      <p className="pr-4 font-heading text-[15px] leading-tight font-semibold break-words text-ink">{title}</p>
      <ul className="mt-2 grid gap-1">
        {items.map((x) => (
          <li key={x} className="text-[12.5px] leading-snug text-body">
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <div>
      <ol className="grid items-stretch gap-3 lg:grid-cols-[repeat(6,minmax(0,1fr))]">
        {flow.map((f, i) => (
          <li key={f.title} className="relative">
            {f.split ? (
              <div className="grid h-full gap-2">
                <div className="rounded-[18px] bg-[#e4f1eb] p-3.5">
                  <p className="font-heading text-[15px] font-semibold text-brand">CRO profile</p>
                  <p className="text-[12px] text-brand/80">8 sections</p>
                </div>
                <div className="rounded-[18px] bg-[#ece9fd] p-3.5">
                  <p className="font-heading text-[15px] font-semibold text-[#5b4fd1]">Scientist profile</p>
                  <p className="text-[12px] text-[#5b4fd1]/80">5 steps</p>
                </div>
              </div>
            ) : (
              <Node title={f.title} items={f.items} locked={"locked" in f && f.locked} />
            )}
            {i < flow.length - 1 && (
              <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full bg-brand text-white lg:grid">
                <ArrowRight className="size-3.5" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-soft">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-[4px] bg-[#e4f1eb]" /> <span className="size-3 rounded-[4px] bg-[#ece9fd]" /> The only step that differs by user
        </span>
        <span className="flex items-center gap-1.5">
          <Lock className="size-3.5" aria-hidden /> Unlocks after verification
        </span>
      </div>
    </div>
  )
}

// ---------------- visual direction ----------------

export function ColourStudy() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">Competitors lean blue</p>
        <div className="mt-3 flex h-14 overflow-hidden rounded-[16px]">
          {colourStudy.competitors.map((c) => (
            <span key={c.name} className="flex-1" style={{ background: c.hex }} title={`${c.name} ${c.hex}`} />
          ))}
        </div>
        <p className="mt-2 text-[13px] text-soft">{colourStudy.competitors.map((c) => c.name).join(" · ")}</p>
      </div>
      <div>
        <p className="text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">Explored: colours from the lab</p>
        <ul className="mt-3 grid grid-cols-3 gap-4 lg:grid-cols-6">
          {colourStudy.explored.map((c) => (
            <li key={c.name}>
              <span className="block aspect-square rounded-full shadow-[0_14px_30px_-18px_rgba(16,24,40,0.6)]" style={{ background: c.hex }} aria-hidden />
              <p className="mt-2 text-[13.5px] font-semibold text-ink">{c.name}</p>
              <p className="text-[12px] text-soft">{c.why}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ---------------- outcome: targets as rings ----------------

export function Targets() {
  const r = 30
  const c = 2 * Math.PI * r
  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {targets.map((t) => {
          const pct = t.suffix === "%" ? t.value : 100
          return (
            <li key={t.label} className="flex items-center gap-4 rounded-[22px] border border-line bg-white p-4">
              <svg viewBox="0 0 72 72" className="size-16 shrink-0 -rotate-90" aria-hidden>
                <circle cx="36" cy="36" r={r} fill="none" stroke="#e4f1eb" strokeWidth="7" />
                <circle cx="36" cy="36" r={r} fill="none" stroke={green} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(c * pct) / 100} ${c}`} strokeOpacity={t.suffix === "%" ? 1 : 0.35} />
              </svg>
              <div>
                <p className="font-heading text-[26px] leading-none font-semibold text-brand">
                  {t.prefix}
                  {t.value}
                  {t.suffix}
                </p>
                <p className="mt-1 text-[13.5px] leading-snug text-body">{t.label}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-[13px] text-soft">Targets set with the PM. Results to come.</p>
    </div>
  )
}

export function Upcoming() {
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {upcoming.map((u) => (
        <li key={u.title} className="rounded-[20px] border-2 border-dashed border-[#d6cbb9] p-5">
          <p className="font-heading text-[18px] font-semibold text-ink">{u.title}</p>
          <p className="mt-1 text-[14px] leading-snug text-body">{u.text}</p>
        </li>
      ))}
    </ul>
  )
}
