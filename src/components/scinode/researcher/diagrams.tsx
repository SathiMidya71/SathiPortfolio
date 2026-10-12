import { BadgeCheck, Beaker, Bell, Briefcase, ClipboardList, FileText, FlaskConical, Globe, Lock, Microscope, Milestone, Search, TrendingUp, UserRound, Users, type LucideIcon } from "lucide-react"
import { projectTypes, proposalStages, upcoming, verificationSteps, workspace } from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// Coded diagrams for the Scinode for Researchers case study. All on the page background or a single white
// card (no nested containers), in the site palette: brand green, purple and neutral sand.

const green = "#02594e"
const purple = "#5b4fd1"

/** Decision 1: two user types join one sign-up and one lifecycle. */
export function OneSignup() {
  const chip = (name: string, Icon: LucideIcon, tint: string, ink: string) => (
    <span className="flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 shadow-[0_10px_24px_-18px_rgba(16,24,40,0.5)]">
      <span className="grid size-9 place-items-center rounded-full" style={{ background: tint, color: ink }}>
        <Icon className="size-4.5" strokeWidth={2} aria-hidden />
      </span>
      <span className="text-[15px] font-semibold text-ink">{name}</span>
    </span>
  )
  return (
    <div className="relative grid place-items-center gap-0 py-4">
      <div className="flex flex-wrap justify-center gap-4">
        {chip("CRO", Microscope, "#e4f1eb", green)}
        {chip("Scientist", Beaker, "#ece9fd", purple)}
      </div>
      <svg aria-hidden viewBox="0 0 200 50" className="h-14 w-[220px]" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M60 2 C60 30 100 20 100 48" stroke={green} />
        <path d="M140 2 C140 30 100 20 100 48" stroke={purple} />
      </svg>
      <span className="rounded-full bg-brand px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_16px_34px_-18px_rgba(2,89,78,0.8)]">Researcher sign-up</span>
      <svg aria-hidden viewBox="0 0 10 40" className="h-10 w-3" fill="none">
        <path d="M5 0 V40" stroke={green} strokeWidth="2" strokeDasharray="3 5" />
      </svg>
      <div className="flex flex-wrap justify-center gap-1.5">
        {["Profile", "Verify", "Find", "Propose", "Track", "Convert", "Run", "Report"].map((s, i) => (
          <span key={s} className="flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[12.5px] font-medium text-body">
            <span className="font-heading text-[11px] font-bold text-brand">{i + 1}</span> {s}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-soft">One shared lifecycle, role-specific content</p>
    </div>
  )
}

/** Decision 3: the 4-step verification stepper. */
export function VerificationStepper() {
  return (
    <ol className="relative grid gap-5 pl-12">
      <span aria-hidden className="absolute top-3 bottom-3 left-[19px] border-l-2 border-dashed border-brand/30" />
      {verificationSteps.map((s, i) => {
        const last = i === verificationSteps.length - 1
        return (
          <li key={s.title} className="relative">
            <span className={cn("absolute top-0 -left-12 grid size-10 place-items-center rounded-full ring-4 ring-cream", last ? "bg-brand text-white" : "border-2 border-brand/30 bg-white text-brand")}>
              {last ? <BadgeCheck className="size-5" strokeWidth={2} aria-hidden /> : <span className="font-heading text-[14px] font-bold">{i + 1}</span>}
            </span>
            <p className="pt-1 font-heading text-[17px] font-semibold text-ink">{s.title}</p>
            <p className="mt-0.5 text-[14.5px] leading-snug text-body">{s.text}</p>
            {i === 1 && <span className="mt-2 inline-block rounded-full bg-[#ece9fd] px-2.5 py-0.5 text-[12px] font-semibold text-[#5b4fd1]">Status shown to the researcher while pending</span>}
          </li>
        )
      })}
    </ol>
  )
}

/** Decision 4: open and exclusive projects. */
export function ProjectTypes() {
  const icons: LucideIcon[] = [Globe, Lock]
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projectTypes.map((t, i) => {
        const Icon = icons[i]
        const exclusive = i === 1
        return (
          <div key={t.title} className={cn("relative rounded-[22px] border bg-white p-5", exclusive ? "border-[#5b4fd1]/30" : "border-line")}>
            {exclusive && (
              <span className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#5b4fd1] px-2.5 py-1 text-[11px] font-bold text-white">
                <Bell className="size-3" aria-hidden /> New match
              </span>
            )}
            <span className="grid size-10 place-items-center rounded-[12px]" style={{ background: exclusive ? "#ece9fd" : "#e4f1eb", color: exclusive ? purple : green }}>
              <Icon className="size-5" strokeWidth={1.9} aria-hidden />
            </span>
            <p className="mt-4 font-heading text-[19px] font-semibold text-ink">{t.title}</p>
            <p className="mt-1.5 text-[14.5px] leading-snug text-body">{t.text}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {t.tags.map((g) => (
                <li key={g} className="flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[12px] font-medium text-body">
                  <Search className="size-3" aria-hidden /> {g}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

/** Decision 5: the proposal tracker, with the offline stage shown honestly. */
export function ProposalTracker() {
  return (
    <div>
      <ol className="grid gap-4 sm:grid-cols-5 sm:gap-2">
        {proposalStages.map((s, i) => {
          const done = i < 4
          const last = i === proposalStages.length - 1
          return (
            <li key={s.title} className="relative flex gap-3 sm:block">
              <div className="flex items-center sm:mb-3">
                <span
                  className={cn(
                    "relative z-10 grid size-9 shrink-0 place-items-center rounded-full font-heading text-[13px] font-bold",
                    s.offline ? "border-2 border-dashed border-[#c9c1b3] bg-white text-soft" : last ? "bg-[#5b4fd1] text-white" : done ? "bg-brand text-white" : "bg-sand text-soft"
                  )}
                >
                  {i + 1}
                </span>
                {i < proposalStages.length - 1 && <span aria-hidden className={cn("hidden h-0.5 flex-1 sm:block", s.offline || proposalStages[i + 1].offline ? "border-t-2 border-dashed border-[#c9c1b3]" : "bg-brand/40")} />}
              </div>
              <div>
                <p className={cn("font-heading text-[16px] font-semibold", s.offline ? "text-soft" : "text-ink")}>{s.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-body">{s.text}</p>
              </div>
            </li>
          )
        })}
      </ol>
      <p className="mt-5 flex items-center gap-2 text-[13px] text-soft">
        <span className="inline-block w-6 border-t-2 border-dashed border-[#c9c1b3]" aria-hidden /> Happens offline, shown as a stage so the status never goes dark
      </p>
    </div>
  )
}

/** Decision 6: the project workspace. */
export function Workspace() {
  const icons: LucideIcon[] = [TrendingUp, FlaskConical, FileText, Milestone, Users]
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
      {workspace.map((w, i) => {
        const Icon = icons[i]
        return (
          <div key={w.title}>
            <span className="grid size-10 place-items-center rounded-[12px] bg-[#e4f1eb] text-brand">
              <Icon className="size-5" strokeWidth={1.9} aria-hidden />
            </span>
            <p className="mt-3 font-heading text-[17px] font-semibold text-ink">{w.title}</p>
            <p className="mt-0.5 text-[13.5px] leading-snug text-body">{w.text}</p>
          </div>
        )
      })}
      <div className="flex flex-col justify-center rounded-[16px] border-2 border-dashed border-[#d6cbb9] p-4">
        <p className="text-[13px] font-semibold text-soft line-through decoration-[#c9c1b3]">Weekly email updates</p>
        <p className="mt-1 text-[13px] text-soft">Replaced by one shared workspace</p>
      </div>
    </div>
  )
}

/** What I designed: the module map, with upcoming modules greyed. */
const modules: { name: string; icon: LucideIcon; items: string[] }[] = [
  { name: "Profile", icon: UserRound, items: ["Sign up", "Organisation & science profile", "Verification status"] },
  { name: "Opportunities", icon: Briefcase, items: ["Open projects", "Exclusive projects", "Search & alerts"] },
  { name: "Proposals", icon: ClipboardList, items: ["Submit proposal", "Track status", "Feedback & approval"] },
  { name: "Project management", icon: FlaskConical, items: ["Experiments & batches", "Reports & milestones", "Deliverables"] },
]

export function ModuleMap() {
  return (
    <div>
      <div className="flex justify-center">
        <span className="rounded-full bg-brand px-5 py-2.5 text-[16px] font-semibold text-white shadow-[0_16px_34px_-18px_rgba(2,89,78,0.8)]">Scinode for Researchers</span>
      </div>
      {/* connectors for 4 equal columns (lg) */}
      <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="hidden h-10 w-full lg:block" fill="none">
        <path d="M50 0 V5 M12.5 5 H87.5 M12.5 5 V10 M37.5 5 V10 M62.5 5 V10 M87.5 5 V10" stroke={green} strokeOpacity="0.5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4">
        {modules.map((m) => (
          <div key={m.name} className="rounded-[20px] border border-brand/25 bg-white p-5 shadow-[0_14px_30px_-24px_rgba(16,24,40,0.45)]">
            <span className="grid size-10 place-items-center rounded-[12px] bg-[#e4f1eb] text-brand">
              <m.icon className="size-5" strokeWidth={1.9} aria-hidden />
            </span>
            <p className="mt-3 font-heading text-[19px] font-semibold text-ink">{m.name}</p>
            <ul className="mt-2.5 grid gap-1.5">
              {m.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-[14px] text-body">
                  <span className="size-1.5 rounded-full bg-brand/50" aria-hidden /> {it}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-2.5 text-[12px] font-semibold text-brand">● Designed by me</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">Upcoming</span>
        {upcoming.map((u) => (
          <span key={u.title} className="rounded-full border border-dashed border-[#d6cbb9] px-3 py-1 text-[13px] text-soft">
            {u.title}
          </span>
        ))}
      </div>
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
