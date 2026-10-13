import {
  ArrowRight,
  Beaker,
  Brain,
  Check,
  Compass,
  FileWarning,
  Hand,
  Heart,
  Layers,
  LayoutGrid,
  Lock,
  Map as MapIcon,
  MessageCircle,
  MessagesSquare,
  Microscope,
  Puzzle,
  Route,
  Search,
  ShieldCheck,
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
  objectives,
  overview,
  personas,
  problemPair,
  researchNeeds,
  researchStats,
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

// ---------------- competitive analysis ----------------

export function Competitors() {
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
      {/* the comparison matrix: fits the column on desktop, scrolls inside its own box on small screens */}
      <div className="overflow-x-auto rounded-[20px] bg-white lg:overflow-visible">
      <table className="w-full min-w-[760px] table-fixed border-collapse text-left lg:min-w-0">
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

// ---------------- editorial overview (Sathi's style reference) ----------------

const bubbles: Record<string, { icon: LucideIcon; bg: string; pos: string }> = {
  lab: { icon: Microscope, bg: "radial-gradient(circle at 35% 30%, #fff4ec 0%, #f6d3bd 60%, #efc0a3 100%)", pos: "-top-5 -left-3 md:-top-9 md:-left-7" },
  match: { icon: Puzzle, bg: "radial-gradient(circle at 35% 30%, #f6f4ff 0%, #d9d4fb 60%, #c6befa 100%)", pos: "-top-6 -right-4 md:-top-9 md:-right-6" },
  flow: { icon: Layers, bg: "radial-gradient(circle at 35% 30%, #f1fbf5 0%, #cfeedd 60%, #b5e3ca 100%)", pos: "-bottom-2 -right-7 md:-bottom-4 md:-right-12" },
}

export function EditorialOverview({ serifClass }: { serifClass: string }) {
  return (
    <div>
      {/* label · title */}
      <div>
        <div>
          <p className="text-[16px] text-soft">Overview</p>
          <h2 className="mt-1 font-sans text-[34px] leading-[1.1] font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[40px] xl:text-[44px]">
            {overview.title[0]} <span className={cn(serifClass, "text-ink/60 italic")}>{overview.title[1]}</span>
          </h2>
        </div>
      </div>

      {/* the statement */}
      <p className="mt-16 max-w-[1100px] font-sans text-[40px] leading-[1.18] font-medium tracking-[-0.03em] text-[#1d1d1f] md:mt-20 md:text-[56px] lg:text-[60px]">
        {overview.statement.map((s, i) => {
          if (!("em" in s)) return <span key={i}>{s.t}</span>
          const b = bubbles[s.bubble]
          return (
            <span key={i} className="relative inline-block">
              <span className={cn(serifClass, "font-normal tracking-[-0.01em] text-[#8a8a8a] italic")}>{s.t}</span>
              <span
                aria-hidden
                className={cn("absolute grid size-9 place-items-center rounded-full opacity-90 shadow-[0_12px_28px_-14px_rgba(16,24,40,0.45)] md:size-[72px]", b.pos)}
                style={{ background: b.bg }}
              >
                <b.icon className="size-4 text-ink/70 md:size-7" strokeWidth={1.6} />
              </span>
            </span>
          )
        })}
      </p>

      {/* facts + paragraph */}
      <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:items-start">
        <dl className="grid gap-3">
          {overview.facts.map((f) => (
            <div key={f.label} className="flex gap-3 text-[17px] md:text-[19px]">
              <dt className="text-soft">{f.label} /</dt>
              <dd className="text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-[17px] leading-relaxed text-soft md:text-[18px]">{overview.text}</p>
      </div>
    </div>
  )
}

// ---------------- user research: radial infographic (Sathi's style reference) ----------------

const needIcons: LucideIcon[] = [Puzzle, FileWarning, Microscope, Route]

export function UserNeeds() {
  // fixed-aspect stage so the half circle, dashed arc and connectors line up at every desktop width
  const W = 860
  const H = 860
  const cx = 560
  const cy = 330
  const R = 230
  const Rd = 290
  const inner = 146
  const stripes = Array.from({ length: 64 }, (_, i) => {
    const a = Math.PI / 2 + (Math.PI * (i + 0.5)) / 64
    return { x1: cx + inner * Math.cos(a), y1: cy - inner * Math.sin(a), x2: cx + R * Math.cos(a), y2: cy - R * Math.sin(a) }
  })
  const lineY = [cy - Rd, cy, cy + Rd]
  const lineEnd = [cx, cx - Rd, cx]
  return (
    <div>
      {/* desktop */}
      <div className="relative hidden lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* glow behind the cards */}
        <div aria-hidden className="absolute rounded-full bg-[radial-gradient(circle,#2fae74_0%,#7fcfa8_45%,transparent_70%)] opacity-80 blur-2xl" style={{ left: `${((cx - R) / W) * 100}%`, top: `${((cy - R) / H) * 100}%`, width: `${((2 * R) / W) * 100}%`, height: `${((2 * R) / H) * 100}%` }} />
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="un-core" cx="100%" cy="50%" r="100%">
              <stop offset="0" stopColor="#7fcfa8" stopOpacity="0.9" />
              <stop offset="1" stopColor="#cfeedd" stopOpacity="0.9" />
            </radialGradient>
            <linearGradient id="un-line" gradientUnits="userSpaceOnUse" x1="170" y1="0" x2={cx} y2="0">
              <stop offset="0" stopColor={green} stopOpacity="0" />
              <stop offset="1" stopColor={green} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* left half disc */}
          <path d={`M${cx},${cy - R} A${R},${R} 0 0 0 ${cx},${cy + R} Z`} fill="url(#un-core)" />
          {stripes.map((s, i) => (
            <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#2fae74" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
          ))}
          <path d={`M${cx},${cy - inner} A${inner},${inner} 0 0 0 ${cx},${cy + inner} Z`} fill="#cfeedd" opacity="0.85" />
          {/* dashed arc */}
          <path d={`M${cx},${cy - Rd} A${Rd},${Rd} 0 0 0 ${cx},${cy + Rd}`} fill="none" stroke={green} strokeWidth="2" strokeDasharray="6 7" opacity="0.6" />
          {/* connectors */}
          {lineY.map((y, i) => (
            <g key={i}>
              <line x1={180} y1={y} x2={lineEnd[i]} y2={y} stroke="url(#un-line)" strokeWidth="3" />
              <circle cx={lineEnd[i]} cy={y} r="9" fill={green} />
            </g>
          ))}
        </svg>
        {/* stats */}
        {researchStats.map((s, i) => (
          <div key={s.value} className="absolute left-0 w-[30%]" style={{ top: `${((lineY[i] - 32) / H) * 100}%` }}>
            <p className="font-sans text-[56px] leading-none font-normal tracking-[-0.03em] text-[#1d1d1f] xl:text-[60px]">{s.value}</p>
            <p className="mt-4 text-[15px] leading-snug text-soft">{s.text}</p>
            <span className="mt-3 inline-block rounded-full bg-white px-3.5 py-1.5 text-[13px] text-ink shadow-[0_8px_20px_-14px_rgba(16,24,40,0.4)]">{s.source}</span>
          </div>
        ))}
        {/* needs */}
        <ul className="absolute right-0 grid w-[30%] grid-rows-4 gap-4" style={{ top: `${((cy - Rd) / H) * 100}%`, bottom: `${((H - cy - Rd) / H) * 100}%` }}>
          {researchNeeds.map((n, i) => {
            const Icon = needIcons[i]
            return (
              <li key={n} className="relative flex items-end rounded-[24px] bg-white/55 p-4 backdrop-blur-md shadow-[0_18px_40px_-30px_rgba(16,24,40,0.45)]">
                <span className="absolute top-3.5 right-3.5 grid size-11 place-items-center rounded-full bg-brand text-white">
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="max-w-[65%] font-sans text-[19px] leading-tight text-[#1d1d1f]">{n}</p>
              </li>
            )
          })}
        </ul>
      </div>

      {/* phones and tablets */}
      <div className="grid gap-10 lg:hidden">
        {researchStats.map((s) => (
          <div key={s.value} className="border-l-2 border-brand/30 pl-5">
            <p className="font-sans text-[56px] leading-none tracking-[-0.03em] text-[#1d1d1f]">{s.value}</p>
            <p className="mt-3 text-[16px] leading-relaxed text-soft">{s.text}</p>
            <span className="mt-3 inline-block rounded-full bg-white px-3.5 py-1.5 text-[13.5px] text-ink">{s.source}</span>
          </div>
        ))}
        <ul className="grid grid-cols-2 gap-3">
          {researchNeeds.map((n, i) => {
            const Icon = needIcons[i]
            return (
              <li key={n} className="relative flex min-h-[130px] items-end rounded-[22px] bg-[#e4f1eb] p-4">
                <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-brand text-white">
                  <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="max-w-[75%] text-[17px] leading-tight text-[#1d1d1f]">{n}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/** Three short quotes under the research visual. */
export function ResearchQuotes({ serifClass }: { serifClass: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {insights.slice(0, 4).filter((_, i) => i !== 1).map((q) => (
        <figure key={q.title} className="border-t border-line pt-5">
          <blockquote className={cn(serifClass, "text-[24px] leading-snug text-ink italic")}>&ldquo;{q.quote}&rdquo;</blockquote>
          <figcaption className="mt-3 text-[13px] text-soft">From interviews · {q.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}

// ---------------- problem & solution: three overlapping circles (Sathi's style reference) ----------------

export function ProblemVenn() {
  // three circles (r=250) around a centre point; the solution sits where all three overlap
  const W = 860
  const H = 780
  const G = { x: 430, y: 350 }
  const r = 250
  const d = 127 // centre-to-circle distance
  const angles = [210, 330, 90] // top-left, top-right, bottom
  const centres = angles.map((a) => ({ x: G.x + d * Math.cos((a * Math.PI) / 180), y: G.y + d * Math.sin((a * Math.PI) / 180) }))
  // each problem sits in the part of its circle that no other circle covers
  const labels = angles.map((a, i) => {
    const dist = i === 2 ? 268 : 292
    return { x: G.x + dist * Math.cos((a * Math.PI) / 180), y: G.y + dist * Math.sin((a * Math.PI) / 180) }
  })
  const px = (x: number) => `${(x / W) * 100}%`
  const py = (y: number) => `${(y / H) * 100}%`
  const Pill = ({ children, solid }: { children: React.ReactNode; solid?: boolean }) => (
    <span className={cn("inline-block rounded-full px-3.5 py-1 text-[13px] font-semibold", solid ? "bg-white text-brand shadow-[0_8px_20px_-12px_rgba(0,0,0,0.5)]" : "bg-[#ece9fd] text-[#5b4fd1]")}>{children}</span>
  )
  const Problem = ({ i }: { i: number }) => (
    <>
      <Pill>Problem {String(i + 1).padStart(2, "0")}</Pill>
      <p className="mt-3 font-heading text-[22px] leading-tight font-semibold text-ink">{problemPair.problems[i].title}</p>
      <p className="mt-2 text-[14.5px] leading-snug text-body">{problemPair.problems[i].text}</p>
    </>
  )
  return (
    <div>
      {/* md and up: three circles */}
      <div className="relative mx-auto hidden w-full max-w-[860px] md:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            {centres.map((c, i) => (
              <clipPath key={i} id={`pv3-c${i}`}>
                <circle cx={c.x} cy={c.y} r={r} />
              </clipPath>
            ))}
            <linearGradient id="pv3-lens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b6b5d" />
              <stop offset="1" stopColor="#02594e" />
            </linearGradient>
            <filter id="pv3-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>
          {centres.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={r} fill="none" stroke="#b9ae9c" strokeWidth="1.5" strokeDasharray="7 8" />
          ))}
          {/* the shared centre: a rect clipped by all three circles */}
          <g clipPath="url(#pv3-c0)">
            <g clipPath="url(#pv3-c1)">
              <g clipPath="url(#pv3-c2)">
                <rect x="0" y="0" width={W} height={H} fill="#2fae74" opacity="0.35" filter="url(#pv3-glow)" />
                <rect x="0" y="0" width={W} height={H} fill="url(#pv3-lens)" />
              </g>
            </g>
          </g>
        </svg>
        {labels.map((l, i) => (
          <div key={i} className="absolute w-[21%] -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: px(l.x), top: py(l.y) }}>
            <Problem i={i} />
          </div>
        ))}
        <div className="absolute w-[24%] -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: px(G.x), top: py(G.y + 6) }}>
          <Pill solid>Solution</Pill>
          <p className="mt-2.5 text-[13px] leading-snug text-white/90 xl:text-[13.5px]">{problemPair.solution}</p>
        </div>
      </div>

      {/* phones: stacked */}
      <div className="grid gap-4 md:hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-[28px] border border-dashed border-[#b9ae9c] p-6 text-center">
            <Problem i={i} />
          </div>
        ))}
        <div className="rounded-[28px] bg-brand p-6 text-center shadow-[0_20px_44px_-24px_rgba(2,89,78,0.8)]">
          <Pill solid>Solution</Pill>
          <p className="mt-4 text-[15px] leading-relaxed text-white/90">{problemPair.solution}</p>
        </div>
      </div>
    </div>
  )
}

// ---------------- research methods as concentric arcs (Sathi's style reference) ----------------

export function MethodArcs() {
  const W = 860
  const H = 940
  const cx = 140
  const cy = 660
  const core = 112
  // inner rings are nearly round, outer ones flatter, so they all stay below the labels
  const ks = methods.map((_, i) => 0.92 - i * 0.05)
  const step = 86
  const radii = methods.map((_, i) => 172 + i * step)
  const icons: LucideIcon[] = [MessagesSquare, LayoutGrid, StickyNote, Heart, Users, MapIcon, Layers]
  const top = 70
  const arc = (rx: number, k: number) => {
    const ry = rx * k
    const a = (58 * Math.PI) / 180
    // bottom-right → top-right through the rightmost point, so text reads upwards with its top toward the centre
    return `M${cx + rx * Math.cos(a)},${cy + ry * Math.sin(a)} A${rx},${ry} 0 0 0 ${cx + rx * Math.cos(a)},${cy - ry * Math.sin(a)}`
  }
  return (
    <div>
      {/* md and up */}
      <div className="relative hidden w-full overflow-hidden md:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Seven research methods">
          <defs>
            {radii.map((r, i) => (
              <linearGradient key={i} id={`ma-fade-${i}`} gradientUnits="userSpaceOnUse" x1={cx - r * 0.2} y1="0" x2={cx + r * 0.7} y2="0">
                <stop offset="0" stopColor="#7d958e" stopOpacity="0" />
                <stop offset="1" stopColor="#7d958e" stopOpacity="0.75" />
              </linearGradient>
            ))}
            {radii.map((r, i) => (
              <path key={i} id={`ma-path-${i}`} d={arc(r - 20, ks[i])} />
            ))}
            <radialGradient id="ma-core" cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.7" stopColor="#fbfdfc" />
              <stop offset="1" stopColor="#e4f1eb" />
            </radialGradient>
            <radialGradient id="ma-halo">
              <stop offset="0.6" stopColor="#7fcfa8" stopOpacity="0.35" />
              <stop offset="1" stopColor="#7fcfa8" stopOpacity="0" />
            </radialGradient>
            <filter id="ma-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#02594e" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* rings, fading out to the left */}
          {radii.map((r, i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * ks[i]} fill="none" stroke={`url(#ma-fade-${i})`} strokeWidth="1.2" />
          ))}

          {/* vertical lines + labels + icons */}
          {methods.map((m, i) => {
            const x = cx + radii[i]
            const Icon = icons[i]
            return (
              <g key={m.title}>
                <line x1={x} y1={top} x2={x} y2={cy} stroke="#7d958e" strokeOpacity="0.55" strokeWidth="1.2" />
                <circle cx={x} cy={top - 26} r="20" fill={i === 0 ? green : "#e4f1eb"} />
                <Icon x={x - 10} y={top - 36} width={20} height={20} color={i === 0 ? "#ffffff" : green} strokeWidth={1.8} />
                <text x={x - 9} y={top + 10} transform={`rotate(-90 ${x - 9} ${top + 10})`} textAnchor="end" className="fill-ink text-[15px] font-semibold">
                  {m.title}
                </text>
              </g>
            )
          })}

          {/* details along each arc */}
          {methods.map((m, i) => (
            <text key={m.title} className="fill-soft text-[12.5px]" letterSpacing="0.2">
              <textPath href={`#ma-path-${i}`} startOffset="50%" textAnchor="middle">
                {m.detail}
              </textPath>
            </text>
          ))}

          {/* core: white with a soft mint edge, a green glow and fine rings (no solid fill) */}
          <circle cx={cx} cy={cy} r={core + 34} fill="url(#ma-halo)" />
          <circle cx={cx} cy={cy} r={core} fill="url(#ma-core)" filter="url(#ma-shadow)" />
          <circle cx={cx} cy={cy} r={core} fill="none" stroke="#7fcfa8" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={core - 12} fill="none" stroke="#2fae74" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx={cx} cy={cy} r={core + 14} fill="none" stroke="#7fcfa8" strokeOpacity="0.5" strokeWidth="1" />
          <image href="/case-studies/scinode/logo-researchers.png" x={cx - 80} y={cy - 25} width="160" height="50" preserveAspectRatio="xMidYMid meet" />
        </svg>
      </div>

      {/* phones */}
      <ol className="relative grid gap-5 pl-14 md:hidden">
        <span aria-hidden className="absolute top-3 bottom-3 left-[21px] w-px bg-[#7d958e]/50" />
        {methods.map((m, i) => {
          const Icon = icons[i]
          return (
            <li key={m.title} className="relative">
              <span className={cn("absolute top-0 -left-14 grid size-11 place-items-center rounded-full", i === 0 ? "bg-brand text-white" : "bg-[#e4f1eb] text-brand")}>
                <Icon className="size-5" strokeWidth={1.8} aria-hidden />
              </span>
              <p className="pt-1 text-[17px] font-semibold text-ink">{m.title}</p>
              <p className="mt-0.5 text-[14px] text-soft">{m.detail}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
