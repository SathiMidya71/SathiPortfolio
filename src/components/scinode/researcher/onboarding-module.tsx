import Link from "next/link"
import { Check } from "lucide-react"
import { EdSection } from "@/components/scinode/researcher/ed-section"
import { FilmStage } from "@/components/scinode/researcher/film-stage"
import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { OnboardingFlow } from "@/components/scinode/researcher/onboarding-flow"
import { ResearchMap } from "@/components/scinode/researcher/research-map"
import { ScreenGallery } from "@/components/scinode/researcher/screen-gallery"
import {
  obContext,
  obDecisions,
  obFacts,
  obHeuristics,
  obImpact,
  obProblems,
  obResults,
  obScreens,
  obStructure,
  obTargets,
} from "@/lib/scinode-onboarding"
import { cn } from "@/lib/utils"

// Profile & onboarding module page: research → insight → design decision → how it's measured.
// Palette: Sathi's purple #B79CEC (tints #F1EBFC/#E4D7F8, tones #6B4CB8/#4A307D/#2B2150), the site greens, and a warm
// yellow (#FBF1D3 tint, #F2D98B, #8A6514 tone). Dark boards echo the Scinode for Researchers hero.

export const onboardingSections = [
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "paths", label: "Onboarding flow" },
  { id: "walkthrough", label: "Walkthrough" },
  { id: "screens", label: "Key screens" },
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
export type ContextFact = { n: string; label: string }
export type ContextProblem = { title: string; text: string; fix: string }

export function ContextBoard({
  facts = obFacts,
  problems = obProblems,
  centre = ["Supplier", "onboarding"],
}: { facts?: readonly ContextFact[]; problems?: readonly ContextProblem[]; centre?: [string, string] } = {}) {
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
  const reach = facts.map(() => 118)
  const centreSize = Math.max(...centre.map((w) => w.length)) > 10 ? 21 : 25
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
  // "\n" in a label sets its line break; otherwise the researcher labels break as before
  const label = (s: string) => s.includes("\n") ? s.split("\n") : s.replace("CRO sections", "CRO\nsections").replace("Scientist sections", "Scientist\nsections").replace("Approval gate", "Approval\ngate").split("\n")

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
        <svg viewBox="-14 -14 528 528" className="mx-auto w-full max-w-[470px]" role="img" aria-label={`${centre.join(" ")} at a glance: ${facts.map((f) => `${f.n} ${f.label.replace("\n", " ").toLowerCase()}`).join(", ")}.`}>
          <g data-fl="lane" style={at(0)}>
            {ring.map((r) => (
              <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="#6B4CB8" strokeOpacity="0.18" />
            ))}
            <line x1={C} y1={C - nodeAt} x2={C} y2={C + nodeAt} stroke="#6B4CB8" strokeOpacity="0.16" />
            <line x1={C - nodeAt} y1={C} x2={C + nodeAt} y2={C} stroke="#6B4CB8" strokeOpacity="0.16" />
          </g>
          <path data-fl="edge" style={at(300)} pathLength={1} strokeDasharray="1" d={d} fill="none" stroke="#6B4CB8" strokeWidth="3.5" strokeLinejoin="round" />
          <path data-fl="lane" style={at(700)} d={d} fill="#B79CEC" fillOpacity="0.16" />
          <text x={C} y={C - 6} textAnchor="middle" className="font-heading" fontSize={centreSize} fontWeight="600" fill="#1d1d1f">
            {centre[0]}
          </text>
          <text x={C} y={C + 24} textAnchor="middle" className="font-heading" fontSize={centreSize} fontWeight="600" fill="#1d1d1f">
            {centre[1]}
          </text>
          {facts.map((f, i) => {
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
          {problems.map((p, i) => (
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

/** The case study film, then the four decisions it walks through (each tied to a heuristic). */
function Walkthrough() {
  const dir = "/case-studies/scinode/modules/profile-onboarding"
  return (
    <div className="grid gap-14">
      <FilmStage
        src={`${dir}/onboarding-walkthrough.mp4`}
        poster={`${dir}/onboarding-walkthrough-poster.jpg`}
        width={1920}
        height={1080}
        label="SCINODE onboarding walkthrough: from one long, flat form to structured profiles for researchers and CROs"
      />

      <div className="grid gap-x-8 gap-y-8 pt-4 md:grid-cols-2 xl:grid-cols-4">
        {obDecisions.map((d, k) => (
          <div key={d.title} className="flex items-start gap-3 border-t border-line pt-5">
            <span className="font-heading text-[28px] leading-none font-semibold text-[#B79CEC]">{String(k + 1).padStart(2, "0")}</span>
            <div>
              <h4 className="font-sans text-[18px] leading-tight text-[#1d1d1f]">{d.title}</h4>
              <p className="mt-1 text-[14px] leading-snug text-body">{d.text}</p>
              <span className="mt-2 inline-block rounded-full bg-[#e4f1eb] px-2 py-0.5 text-[11px] font-semibold text-brand">
                {d.h} · {obHeuristics.find((x) => x.code === d.h)?.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** 32 fields on one page → grouped sections. Dots are fields, blocks are sections. */
function FormToSections() {
  const { before, profiles } = obStructure
  const cro = profiles[0]
  return (
    <svg viewBox="0 0 220 104" className="w-full" aria-hidden>
      {Array.from({ length: before.fields }, (_, i) => (
        <circle key={i} data-fl="node" style={at(200 + i * 18)} cx={10 + (i % 4) * 12} cy={10 + Math.floor(i / 4) * 11} r="3.6" fill="#93c4b4" />
      ))}
      <text x="4" y="101" fontSize="9" fill="#6b7f7c">
        {before.fields} fields · {before.pages} page
      </text>
      <path data-fl="edge" style={at(800)} pathLength={1} strokeDasharray="1" d="M66 46 L96 46" stroke="#02594e" strokeWidth="1.6" fill="none" />
      <path data-fl="node" style={at(900)} d="M93 42 L99 46 L93 50 Z" fill="#02594e" />
      {Array.from({ length: cro.onboarding + cro.enrichment }, (_, i) => {
        const enrich = i >= cro.onboarding
        return (
          <rect
            key={i}
            data-fl="node"
            style={at(1000 + i * 90)}
            x={108 + (i % 4) * 27}
            y={14 + Math.floor(i / 4) * 34}
            width="23"
            height="28"
            rx="5"
            fill={enrich ? "#F2D98B" : "#02594e"}
          />
        )
      })}
      <text x="160" y="101" textAnchor="middle" fontSize="9" fill="#6b7f7c">
        {cro.onboarding} onboarding + {cro.enrichment} enrichment
      </text>
    </svg>
  )
}

/** Both profiles as stacked bars: onboarding (green) + enrichment (yellow). */
function ProfileBars() {
  const unit = 22
  return (
    <svg viewBox="0 0 220 104" className="w-full" aria-hidden>
      {obStructure.profiles.map((p, r) => {
        const y = 18 + r * 44
        return (
          <g key={p.who}>
            <text x="0" y={y - 5} fontSize="9.5" fontWeight="700" fill="#1F392D">
              {p.who}
            </text>
            {Array.from({ length: p.onboarding + p.enrichment }, (_, i) => (
              <rect
                key={i}
                data-fl="node"
                style={at(250 + r * 400 + i * 70)}
                x={i * unit}
                y={y}
                width={unit - 3}
                height="18"
                rx="4"
                fill={i < p.onboarding ? "#02594e" : "#F2D98B"}
              />
            ))}
            <text x={(p.onboarding + p.enrichment) * unit + 4} y={y + 13} fontSize="10" fontWeight="700" fill="#1F392D">
              {p.onboarding} + {p.enrichment}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** The five heuristics as a row of codes. */
function HeuristicChips() {
  return (
    <ul className="grid gap-1.5">
      {obHeuristics.map((h, i) => (
        <li key={h.code} data-fl="node" style={at(250 + i * 110)} className="flex items-baseline gap-2 text-[11.5px] leading-snug">
          <span className="shrink-0 rounded-[5px] bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">{h.code}</span>
          <span className="text-ink">{h.name}</span>
        </li>
      ))}
    </ul>
  )
}

function Impact() {
  const total = (p: { onboarding: number; enrichment: number }) => p.onboarding + p.enrichment
  const [cro, sci] = obStructure.profiles
  const tiles = [
    { label: "Flat form to sections", big: `${obStructure.before.fields} → ${total(cro)}`, unit: "fields → CRO sections", body: <FormToSections /> },
    { label: "Two profiles, one structure", big: `${total(cro)} · ${total(sci)}`, unit: "sections, CRO · scientist", body: <ProfileBars /> },
    { label: "Heuristics applied", big: String(obHeuristics.length), unit: "Nielsen heuristics", body: <HeuristicChips /> },
  ]
  return (
    <div className="grid gap-8">
      {/* Results: live platform figures */}
      <div className="rounded-[24px] p-5 text-white sm:p-7" style={darkGrid}>
        <p className="text-[11px] font-semibold tracking-[0.12em] text-white/55 uppercase">Results so far</p>
        <dl className="mt-3 grid grid-cols-2 gap-6">
          {obResults.map((r, i) => (
            <div key={r.label} className={cn(i > 0 && "border-l border-white/10 pl-6")}>
              <dd className="font-heading text-[56px] leading-[0.9] font-semibold tracking-[-0.04em] md:text-[72px]" style={mint}>
                {r.n}
              </dd>
              <dt className="mt-2 text-[13px] font-semibold text-white/70">{r.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[11.5px] text-white/45">Current platform figures</p>
      </div>

      {/* What I delivered: each line sits in the tile that measures it; the verification line spans below */}
      <div className="grid gap-3">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#6B4CB8] uppercase">What I delivered</p>
        <FlowReveal className="grid gap-3 md:grid-cols-3">
          {tiles.map((t, i) => (
            <figure key={t.label} data-fl="node" style={at(i * 120)} className="flex flex-col rounded-[18px] bg-[#e4f1eb] p-4">
              <figcaption className="text-[10.5px] font-semibold tracking-[0.1em] text-brand uppercase">{t.label}</figcaption>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                <span className="font-heading text-[30px] leading-none font-semibold whitespace-nowrap text-[#1F392D]">{t.big}</span>
                <span className="text-[11.5px] text-brand">{t.unit}</span>
              </p>
              <div className="mt-3 mb-4">{t.body}</div>
              <p className="mt-auto flex gap-2 border-t border-[#c3dcd1] pt-3 text-[13.5px] leading-snug text-ink">
                <Check className="mt-0.5 size-3.5 shrink-0 text-brand" strokeWidth={3} aria-hidden />
                {obImpact[i]}
              </p>
            </figure>
          ))}
          {obImpact.slice(tiles.length).map((x, k) => (
            <p
              key={x}
              data-fl="node"
              style={at((tiles.length + k) * 120)}
              className="flex gap-2 rounded-[18px] bg-[#e4f1eb] px-4 py-3 text-[13.5px] leading-snug text-ink md:col-span-3"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-brand" strokeWidth={3} aria-hidden />
              {x}
            </p>
          ))}
        </FlowReveal>
      </div>

      {/* Targets from the PRD */}
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {obTargets.map((t) => {
            const frac = t.kind === "pct" ? t.value / 100 : t.value / (t.max ?? 1)
            return (
              <div key={t.label} className="rounded-[20px] bg-white p-5 ring-1 ring-line">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">{t.label}</p>
                <p className="mt-2 font-heading text-[34px] leading-none font-semibold tracking-[-0.03em] text-[#1F392D]">
                  {t.prefix}
                  {t.value}
                  {t.unit}
                </p>
                <div className="relative mt-4 h-2 rounded-full bg-[#e4f1eb]">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3f8f7f] to-[#8fd3b4]" style={{ width: `${frac * 100}%` }} />
                </div>
                <p className="mt-2 text-[11px] text-soft">{t.kind === "pct" ? "Target, out of 100%" : `Target, on a ${t.max}${t.unit.trim()} scale`}</p>
              </div>
            )
          })}
        </div>
        <p className="inline-block w-fit rounded-full bg-[#FBF1D3] px-3 py-1 text-[12px] font-semibold text-[#8A6514]">Targets set with the product manager; not results yet</p>
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

      <EdSection id="walkthrough" label="Walkthrough" title={["From a flat form", "to structured profiles"]}>
        <Walkthrough />
      </EdSection>

      <EdSection id="screens" label="Key screens" title={["Two profiles,", "one structure"]}>
        <ScreenGallery screens={obScreens} width={2272} height={1080} label="Profile and onboarding screens" />
      </EdSection>

      <EdSection id="impact" label="Success metrics" title={["What I delivered,", "and how it's measured"]}>
        <Impact />
      </EdSection>
    </>
  )
}
