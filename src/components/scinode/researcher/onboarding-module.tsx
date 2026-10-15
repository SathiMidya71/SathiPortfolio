import Link from "next/link"
import { ArrowRight, Check, Eye, Lock, LockOpen, Save } from "lucide-react"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { PilotPlantToggle } from "@/components/scinode/researcher/interactive"
import { OnboardingFlow } from "@/components/scinode/researcher/onboarding-flow"
import { ResearchMap } from "@/components/scinode/researcher/research-map"
import { obAccess, obContext, obFacts, obImpact, obProblems, obTabs, obTargets } from "@/lib/scinode-onboarding"
import { cn } from "@/lib/utils"

// Profile & onboarding module page: research → insight → design decision → how it's measured.
// Palette: Sathi's purple #B79CEC (tints #F1EBFC/#E4D7F8, tones #6B4CB8/#4A307D/#2B2150), the site greens, and a warm
// yellow (#FBF1D3 tint, #F2D98B, #8A6514 tone). Dark boards echo the Scinode for Researchers hero.

export const onboardingSections = [
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "paths", label: "Onboarding flow" },
  { id: "decisions", label: "Key decisions" },
  { id: "impact", label: "Success metrics" },
]

const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties
const darkGrid = {
  backgroundColor: "#0f2c24",
  backgroundImage:
    "radial-gradient(60% 90% at 8% 0%, rgba(150,220,190,0.28), transparent 60%), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 48px 48px, 48px 48px",
} as const
const mint = { backgroundImage: "linear-gradient(180deg,#e6f7ef 0%,#8fd3b4 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } as const

/** Radial diagram (after Sathi's reference): the four scope facts as nodes, their values as pills,
 *  a rounded shape drawn from the values, and the three problems with their fixes beside it. */
function ContextBoard() {
  const C = 250
  const ring = [48, 88, 128, 168]
  const nodeR = 44
  const nodeAt = 200
  // top, right, bottom, left
  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ]
  // an even rounded diamond, as in the reference; the values sit on its points
  const reach = obFacts.map(() => 118)
  const pts = dirs.map(([dx, dy], i) => [C + dx * reach[i], C + dy * reach[i]])
  // rounded quadrilateral: corners softened with quadratic curves
  const k = 0.38
  const mid = (p: number[], q: number[], t: number) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
  let d = ""
  pts.forEach((p, i) => {
    const prev = pts[(i + 3) % 4]
    const next = pts[(i + 1) % 4]
    const a1 = mid(p, prev, k)
    const b1 = mid(p, next, k)
    d += `${i ? "L" : "M"}${a1[0].toFixed(1)},${a1[1].toFixed(1)} Q${p[0]},${p[1]} ${b1[0].toFixed(1)},${b1[1].toFixed(1)} `
  })
  d += "Z"
  const label = (s: string) => s.replace("CRO profile tabs", "CRO profile\ntabs").replace("Scientist steps", "Scientist\nsteps").replace("Approval gate", "Approval\ngate").split("\n")

  return (
    <FlowReveal
      className="grid items-center gap-6 rounded-[24px] p-4 ring-1 ring-line sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8"
    >
      <div
        className="rounded-[18px] bg-white/70"
        style={{
          backgroundImage: "linear-gradient(rgba(107,76,184,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(107,76,184,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <svg viewBox="-14 -14 528 528" className="mx-auto w-full max-w-[470px]" role="img" aria-label={`Supplier onboarding at a glance: ${obFacts.map((f) => `${f.n} ${f.label.toLowerCase()}`).join(", ")}.`}>
          <g data-fl="lane" style={at(0)}>
            {ring.map((r) => (
              <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="#6B4CB8" strokeOpacity="0.18" />
            ))}
            <line x1={C} y1={C - nodeAt} x2={C} y2={C + nodeAt} stroke="#6B4CB8" strokeOpacity="0.16" />
            <line x1={C - nodeAt} y1={C} x2={C + nodeAt} y2={C} stroke="#6B4CB8" strokeOpacity="0.16" />
          </g>
          <path data-fl="edge" style={at(300)} pathLength={1} strokeDasharray="1" d={d} fill="none" stroke="#6B4CB8" strokeWidth="3.5" strokeLinejoin="round" />
          <path data-fl="lane" style={at(700)} d={d} fill="#B79CEC" fillOpacity="0.16" />
          <text x={C} y={C - 6} textAnchor="middle" className="font-heading" fontSize="25" fontWeight="600" fill="#1d1d1f">
            Supplier
          </text>
          <text x={C} y={C + 24} textAnchor="middle" className="font-heading" fontSize="25" fontWeight="600" fill="#1d1d1f">
            onboarding
          </text>
          {obFacts.map((f, i) => {
            const [dx, dy] = dirs[i]
            const nx = C + dx * nodeAt
            const ny = C + dy * nodeAt
            const px = pts[i][0]
            const py = pts[i][1]
            const lines = label(f.label)
            return (
              <g key={f.label} data-fl="node" style={at(450 + i * 140)}>
                <circle cx={nx} cy={ny} r={nodeR} fill={["#E4D7F8", "#d9ecdf", "#FBF1D3", "#E4D7F8"][i]} />
                {lines.map((l, j) => (
                  <text key={l} x={nx} y={ny + 4 + (j - (lines.length - 1) / 2) * 14} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={["#2B2150", "#1F392D", "#6a4d0f", "#2B2150"][i]}>
                    {l}
                  </text>
                ))}
                <rect x={px - 21} y={py - 13} width="42" height="26" rx="13" fill="#fff" stroke="#4A307D" strokeWidth="1.2" />
                <text x={px} y={py + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#2B2150">
                  {f.n}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div>
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#8A6514] uppercase">The problem</p>
        <ol className="mt-3 grid gap-3">
          {obProblems.map((p, i) => (
            <li key={p.title} data-fl="node" style={at(900 + i * 150)} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 border-t border-line pt-3">
              <span className="font-heading text-[22px] leading-none font-semibold text-[#C9A23F] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[16px] font-semibold text-ink">{p.title}</p>
                <p className="mt-0.5 text-[13.5px] leading-snug text-body">{p.text}</p>
                <p className="mt-2 flex items-start gap-2 rounded-[12px] bg-[#e4f1eb] px-3 py-2 text-[13px] leading-snug font-medium text-[#1F392D]">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-brand" strokeWidth={3} aria-hidden />
                  {p.fix}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </FlowReveal>
  )
}

/** Modules unlocking as the onboarding status moves on. */
function AccessUnlock() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {obAccess.states.map((st, i) => {
        const last = i === obAccess.states.length - 1
        return (
          <div key={st.name} className={cn("rounded-[20px] p-4", last ? "text-white" : "bg-white ring-1 ring-line")} style={last ? darkGrid : undefined}>
            <p className={cn("text-[11px] font-semibold tracking-[0.12em] uppercase", last ? "text-[#a8e6c9]" : "text-soft")}>
              {String(i + 1).padStart(2, "0")} · {st.name}
            </p>
            <p className={cn("mt-1 text-[14px] font-semibold", last ? "text-white" : "text-ink")}>{st.note}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {obAccess.modules.map((m) => {
                const open = st.open.includes(m)
                const ro = st.readOnly?.includes(m)
                return (
                  <li
                    key={m}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium",
                      open && (last ? "bg-[#8fd3b4]/20 text-[#c9f0dd]" : "bg-[#e4f1eb] text-brand"),
                      ro && "bg-[#FBF1D3] text-[#8A6514]",
                      !open && !ro && (last ? "text-white/35" : "text-soft/70 ring-1 ring-line ring-dashed")
                    )}
                  >
                    {open ? <LockOpen className="size-3" aria-hidden /> : ro ? <Eye className="size-3" aria-hidden /> : <Lock className="size-3" aria-hidden />}
                    {m}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

/** Completion widget + autosave, coded. */
function CompletionMock() {
  const tabs = ["Company profile", "Products", "Licences & certifications", "Services & capabilities", "Equipment"]
  const done = 3
  const pct = 62
  const r = 30
  const c = 2 * Math.PI * r
  return (
    <div className="grid gap-4 rounded-[22px] bg-white p-5 ring-1 ring-line sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 76 76" className="size-[84px]" aria-hidden>
          <circle cx="38" cy="38" r={r} fill="none" stroke="#F1EBFC" strokeWidth="8" />
          <circle cx="38" cy="38" r={r} fill="none" stroke="#B79CEC" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(c * pct) / 100} ${c}`} transform="rotate(-90 38 38)" />
          <text x="38" y="43" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2B2150">
            {pct}%
          </text>
        </svg>
        <div>
          <p className="text-[15px] font-semibold text-ink">Profile strength</p>
          <p className="text-[12.5px] text-body">3 more tabs to submit</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-[12px] font-semibold text-white">
            Complete profile <ArrowRight className="size-3" aria-hidden />
          </span>
        </div>
      </div>
      <ul className="grid gap-1.5 sm:border-l sm:border-line sm:pl-5">
        {tabs.map((t, i) => (
          <li key={t} className="flex items-center gap-2 text-[13px]">
            <span className={cn("grid size-4 place-items-center rounded-full", i < done ? "bg-brand text-white" : "ring-1 ring-line")}>{i < done && <Check className="size-2.5" strokeWidth={4} aria-hidden />}</span>
            <span className={i < done ? "text-ink" : "text-body"}>{t}</span>
            {i === done && <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-soft"><Save className="size-3" aria-hidden />Saved just now</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** 10 tabs → 8. */
function TabCleanup() {
  return (
    <div className="rounded-[22px] bg-white p-5 ring-1 ring-line">
      <div className="flex flex-wrap gap-1.5">
        {obTabs.before.map((t) => {
          const merged = obTabs.merged.includes(t)
          const renamed = t === obTabs.renamed.from
          return (
            <span
              key={t}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12.5px] font-medium",
                merged ? "bg-[#F1EBFC] text-[#6B4CB8] line-through decoration-[#6B4CB8]/50" : renamed ? "bg-[#f7f3ec] text-ink" : "bg-[#f7f3ec] text-body"
              )}
            >
              {renamed ? (
                <>
                  <span className="text-soft line-through">{obTabs.renamed.from}</span>
                  <ArrowRight className="size-3 text-brand" aria-hidden />
                  <span className="font-semibold text-brand">{obTabs.renamed.to}</span>
                </>
              ) : (
                t
              )}
              {t === "Facility & EHS" && <span className="ml-1 rounded-full bg-[#6B4CB8] px-1.5 text-[10px] font-semibold text-white">+2</span>}
            </span>
          )
        })}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[13px] text-body">
        <span className="font-heading text-[22px] font-semibold text-[#6B4CB8]">10</span>
        <ArrowRight className="size-4 text-soft" aria-hidden />
        <span className="font-heading text-[22px] font-semibold text-brand">8</span>
        tabs. Safety and waste now live inside Facility &amp; EHS.
      </p>
    </div>
  )
}

const decisions = [
  { title: "One question shapes the form", text: "\"Do you have a pilot plant?\" decides what a lab sees. CROs without one skip up to 3 sections they can't fill.", visual: <PilotPlantToggle /> },
  { title: "Verified before modules unlock", text: "New suppliers see only their dashboard and profile. Opportunities, Projects and Project management unlock after an admin approves.", visual: <AccessUnlock /> },
  { title: "Progress you can see", text: "A completion score on the dashboard, a mark on every tab and autosave, so a long profile can be finished in parts.", visual: <CompletionMock /> },
  { title: "Fewer, clearer tabs", text: "Related sections were grouped and labels made plain, so each tab holds one clear topic.", visual: <TabCleanup /> },
]

function Decisions() {
  return (
    <div className="grid gap-12">
      {decisions.map((d, i) => (
        <div key={d.title} className="grid gap-4">
          <div className="flex items-start gap-3">
            <span className="font-heading text-[30px] leading-none font-semibold text-[#B79CEC]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-sans text-[21px] leading-tight text-[#1d1d1f] md:text-[22px]">{d.title}</h3>
              <p className="mt-1 max-w-[640px] text-[14.5px] leading-snug text-body">{d.text}</p>
            </div>
          </div>
          {d.visual}
        </div>
      ))}
    </div>
  )
}

function Impact() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {obTargets.map((t) => {
          const frac = t.kind === "pct" ? t.value / 100 : t.value / (t.max ?? 1)
          return (
            <div key={t.label} className="rounded-[20px] p-5 text-white" style={darkGrid}>
              <p className="text-[11px] font-semibold tracking-[0.12em] text-white/55 uppercase">{t.label}</p>
              <p className="mt-2 font-heading text-[40px] leading-none font-semibold tracking-[-0.03em]" style={mint}>
                {t.prefix}
                {t.value}
                {t.unit}
              </p>
              <div className="relative mt-4 h-2 rounded-full bg-white/10">
                <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3f8f7f] to-[#8fd3b4]" style={{ width: `${frac * 100}%` }} />
                <span className="absolute -top-1 h-4 w-0.5 rounded bg-white" style={{ left: `${frac * 100}%` }} />
              </div>
              <p className="mt-2 text-[11px] text-white/45">{t.kind === "pct" ? "Target, out of 100%" : `Target, on a ${t.max}${t.unit.trim()} scale`}</p>
            </div>
          )
        })}
      </div>
      <p className="-mt-2 inline-block w-fit rounded-full bg-[#FBF1D3] px-3 py-1 text-[12px] font-semibold text-[#8A6514]">Targets set with the product manager; results to follow after launch</p>

      <div>
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#6B4CB8] uppercase">What I delivered</p>
        <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
          {obImpact.map((x) => (
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

/** All sections of the Profile & onboarding module page. */
export function OnboardingSections() {
  return (
    <>
      <EdSection id="context" label="Context" title={["Onboarding that", "earns trust"]}>
        <p className="max-w-[820px] font-heading text-[22px] leading-snug font-medium text-ink md:text-[26px]">{obContext}</p>
        <ContextBoard />
      </EdSection>

      <EdSection id="research" label="Research" title={["What labs told us,", "and what I designed"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">Each decision traces back to something we heard or saw in interviews, the competitive review or the persona research.</p>
        <ResearchMap />
      </EdSection>

      <EdSection id="paths" label="Onboarding flow" title={["Two users,", "two ways in"]}>
        <p className="max-w-[680px] text-[16px] leading-snug text-body">
          CROs and scientists sign up the same way, then follow a profile built for how they work.{" "}
          <Link href="/work/scinode/researcher#personas" className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
            Meet the personas
          </Link>
        </p>
        <OnboardingFlow />
      </EdSection>

      <EdSection id="decisions" label="Key decisions" title={["Where research became", "interface"]}>
        <Decisions />
      </EdSection>

      <EdSection id="impact" label="Success metrics" title={["What I delivered,", "and how it's measured"]}>
        <Impact />
      </EdSection>
    </>
  )
}
