"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { ArrowRight, Beaker, CircleAlert, EyeOff, Microscope, Sparkles, Target, type LucideIcon } from "lucide-react"
import { journey, personas, pilotLogic, users, type UserKey } from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// Scinode for Researchers: one case study, two user types. A CRO / Scientist switch at the top (and a
// floating copy once it scrolls away) changes every user-specific part of the page: persona, journey and
// the profile fields each user brings. Both versions stay in the HTML (one is `hidden`), so all text is
// readable by search engines and ATS parsers. `?user=scientist` in the URL opens the scientist view.

const Ctx = createContext<{ user: UserKey; setUser: (u: UserKey) => void }>({ user: "cro", setUser: () => {} })
const useUser = () => useContext(Ctx)
const icons: Record<UserKey, LucideIcon> = { cro: Microscope, scientist: Beaker }
const keys: UserKey[] = ["cro", "scientist"]

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserKey>("cro")
  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get("user")
    if (u === "cro" || u === "scientist") setUserState(u)
  }, [])
  const setUser = (u: UserKey) => {
    setUserState(u)
    const url = new URL(window.location.href)
    url.searchParams.set("user", u)
    window.history.replaceState(null, "", url)
  }
  return <Ctx.Provider value={{ user, setUser }}>{children}</Ctx.Provider>
}

function Segmented({ size = "lg" }: { size?: "lg" | "sm" }) {
  const { user, setUser } = useUser()
  return (
    <div role="tablist" aria-label="Show the case study for" className={cn("inline-flex rounded-full border border-line bg-white p-1", size === "lg" ? "shadow-[0_14px_34px_-24px_rgba(16,24,40,0.5)]" : "")}>
      {keys.map((k) => {
        const on = user === k
        const Icon = icons[k]
        return (
          <button
            key={k}
            role="tab"
            aria-selected={on}
            onClick={() => setUser(k)}
            className={cn(
              "flex items-center gap-2 rounded-full font-semibold transition-colors duration-300",
              size === "lg" ? "px-5 py-2.5 text-[15px] md:px-6" : "px-4 py-2 text-[14px]",
              on ? "text-white" : "text-body hover:text-ink"
            )}
            style={on ? { background: users[k].ink } : undefined}
          >
            <Icon className="size-4" strokeWidth={2} aria-hidden />
            {users[k].name}
          </button>
        )
      })}
    </div>
  )
}

/** The switch under the page header, plus a floating copy at the bottom once the header switch scrolls away. */
export function UserSwitch() {
  const ref = useRef<HTMLDivElement>(null)
  const [floating, setFloating] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setFloating(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <>
      <div ref={ref} className="flex flex-wrap items-center gap-4">
        <span className="text-[15px] font-medium text-body">View the case study as</span>
        <Segmented />
      </div>
      <div
        className={cn(
          "fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-line bg-white/95 py-1 pr-1 pl-4 shadow-[0_18px_44px_-18px_rgba(16,24,40,0.45)] backdrop-blur transition-[opacity,translate] duration-300",
          floating ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        aria-hidden={!floating}
      >
        <span className="hidden text-[13px] font-medium text-soft sm:inline">Viewing as</span>
        <Segmented size="sm" />
      </div>
    </>
  )
}

/** Renders one child per user; the inactive one stays in the HTML but hidden. */
export function ForUser({ cro, scientist }: { cro: React.ReactNode; scientist: React.ReactNode }) {
  const { user } = useUser()
  return (
    <>
      <div hidden={user !== "cro"} className="animate-in fade-in duration-500">
        {cro}
      </div>
      <div hidden={user !== "scientist"} className="animate-in fade-in duration-500">
        {scientist}
      </div>
    </>
  )
}

/** A small tag naming the active user, for section headers. */
export function UserTag() {
  const { user } = useUser()
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold" style={{ background: users[user].tint, color: users[user].ink }}>
      {users[user].name} view
    </span>
  )
}

// ---------------- persona (goals, pains, gains) ----------------

function Persona({ k }: { k: UserKey }) {
  const p = personas[k]
  const u = users[k]
  const Icon = icons[k]
  const cols: { title: string; icon: LucideIcon; items: string[]; tone: string }[] = [
    { title: "Goals", icon: Target, items: p.goals, tone: u.ink },
    { title: "Pain points", icon: CircleAlert, items: p.pains, tone: "#b4533a" },
    { title: "Gains", icon: Sparkles, items: p.gains, tone: "#02594e" },
  ]
  return (
    <article className="grid gap-8 rounded-[28px] border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgba(16,24,40,0.5)] md:p-9">
      <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div className="flex items-center gap-4 self-start">
          <span className="relative grid size-20 shrink-0 place-items-center rounded-full" style={{ background: u.tint, color: u.ink }}>
            <span aria-hidden className="absolute -inset-2 rounded-full border-2 border-dashed" style={{ borderColor: `${u.ink}40` }} />
            <Icon className="size-9" strokeWidth={1.6} aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: u.ink }}>
              {p.name ? `Persona · ${u.name}` : `Proto-persona · ${u.name}`}
            </p>
            <h3 className="mt-1 font-heading text-[28px] leading-tight font-semibold text-ink">{p.name ?? p.title}</h3>
            {p.role && <p className="mt-1 text-[14px] leading-snug text-body">{p.role}</p>}
          </div>
        </div>
        <div>
          {p.facts && (
            <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
              {p.facts.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink">
                  <span className="size-1.5 rounded-full" style={{ background: u.ink }} aria-hidden /> {f}
                </li>
              ))}
            </ul>
          )}
          <p className="text-[16px] leading-relaxed text-body">{p.who}</p>
          <p className="mt-5 text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">Brings to the platform</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {p.brings.map((b) => (
              <li key={b} className="rounded-full px-3 py-1 text-[13px] font-medium" style={{ background: u.tint, color: u.ink }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid gap-6 border-t border-line pt-7 sm:grid-cols-3 sm:gap-8">
        {cols.map((c) => (
          <div key={c.title}>
            <p className="flex items-center gap-2 font-heading text-[17px] font-semibold text-ink">
              <c.icon className="size-4.5" style={{ color: c.tone }} strokeWidth={2} aria-hidden /> {c.title}
            </p>
            <ul className="mt-3 grid gap-2.5">
              {c.items.map((it) => (
                <li key={it} className="border-l-2 pl-3 text-[14.5px] leading-snug text-body" style={{ borderColor: `${c.tone}55` }}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="-mt-2 text-[12.5px] leading-snug text-soft">{p.source}{p.name ? "" : ". To be validated with scientists"}.</p>
    </article>
  )
}

export function PersonaView() {
  return <ForUser cro={<Persona k="cro" />} scientist={<Persona k="scientist" />} />
}

// ---------------- journey: what they do → pain → design response, per stage ----------------

function Journey({ k }: { k: UserKey }) {
  const u = users[k]
  const rows: { label: string; get: (s: (typeof journey)[number]) => string; tone: string }[] = [
    { label: "They do", get: (s) => s.does[k], tone: u.ink },
    { label: "Pain point", get: (s) => s.pain[k], tone: "#b4533a" },
    { label: "I designed", get: (s) => s.design, tone: "#02594e" },
  ]
  return (
    <div>
      {/* lg: one column per stage, three rows */}
      <div className="hidden lg:block">
        <ol className="relative grid grid-cols-7 gap-3">
          <span aria-hidden className="absolute top-4 right-[7%] left-[7%] border-t-2 border-dashed" style={{ borderColor: `${u.ink}55` }} />
          {journey.map((s, i) => (
            <li key={s.key} className="relative">
              <span className="relative grid size-8 place-items-center rounded-full font-heading text-[13px] font-bold text-white ring-4 ring-cream" style={{ background: u.ink }}>
                {i + 1}
              </span>
              <p className="mt-3 font-heading text-[16px] leading-tight font-semibold text-ink">{s.title}</p>
              <p className="mt-0.5 text-[11px] font-semibold tracking-[0.08em] text-soft uppercase">{s.module}</p>
            </li>
          ))}
        </ol>
        {rows.map((r) => (
          <div key={r.label} className="mt-5 border-t border-line pt-4">
            <p className="mb-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: r.tone }}>
              {r.label}
            </p>
            <div className="grid grid-cols-7 gap-3">
              {journey.map((s) => (
                <p key={s.key} className="text-[13px] leading-snug text-body">
                  {r.get(s)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* phones and tablets: vertical timeline */}
      <ol className="relative grid gap-7 pl-12 lg:hidden">
        <span aria-hidden className="absolute top-2 bottom-2 left-4 border-l-2 border-dashed" style={{ borderColor: `${u.ink}55` }} />
        {journey.map((s, i) => (
          <li key={s.key} className="relative">
            <span className="absolute top-0 -left-12 grid size-8 place-items-center rounded-full font-heading text-[13px] font-bold text-white ring-4 ring-cream" style={{ background: u.ink }}>
              {i + 1}
            </span>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">{s.module}</p>
            <p className="font-heading text-[18px] leading-tight font-semibold text-ink">{s.title}</p>
            <dl className="mt-2 grid gap-1.5">
              {rows.map((r) => (
                <div key={r.label} className="text-[14.5px] leading-snug">
                  <dt className="inline font-semibold" style={{ color: r.tone }}>
                    {r.label}:{" "}
                  </dt>
                  <dd className="inline text-body">{r.get(s)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function JourneyView() {
  return <ForUser cro={<Journey k="cro" />} scientist={<Journey k="scientist" />} />
}

// ---------------- CRO profile: the pilot plant question reshapes the form ----------------

export function PilotPlantToggle() {
  const [plant, setPlant] = useState(false)
  const groups = ["Equipment", "Facility & EHS"]
  return (
    <div className="rounded-[24px] border border-line bg-white p-5 md:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-heading text-[18px] font-semibold text-ink">Do you have a pilot plant?</p>
        <div role="radiogroup" aria-label="Pilot plant" className="inline-flex rounded-full bg-sand p-1">
          {[
            { v: false, l: "No (CRO)" },
            { v: true, l: "Yes (CDMO)" },
          ].map((o) => (
            <button
              key={o.l}
              role="radio"
              aria-checked={plant === o.v}
              onClick={() => setPlant(o.v)}
              className={cn("rounded-full px-4 py-1.5 text-[14px] font-semibold transition-colors", plant === o.v ? "bg-brand text-white" : "text-body hover:text-ink")}
            >
              {o.l}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-soft">Try it</span>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g}>
            <p className="text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">{g}</p>
            <ul className="mt-2.5 grid gap-1.5">
              {pilotLogic
                .filter((x) => x.group === g)
                .map((x) => {
                  const hidden = x.plantOnly && !plant
                  return (
                    <li
                      key={x.section}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-[10px] border px-3 py-2 text-[14px] transition-all duration-300",
                        hidden ? "border-dashed border-[#d6cbb9] text-soft line-through decoration-[#c9c1b3]" : "border-line bg-[#f7fbf9] font-medium text-ink"
                      )}
                    >
                      {x.section}
                      {hidden ? <EyeOff className="size-4 shrink-0" aria-label="hidden" /> : <span className="size-2 shrink-0 rounded-full bg-brand" aria-hidden />}
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 text-[13.5px] text-body">
        <ArrowRight className="size-4 text-brand" aria-hidden />
        One answer in Company profile decides which sections appear later. A CRO without a plant never sees ETP, distillation or filter & dryer.
      </p>
    </div>
  )
}
