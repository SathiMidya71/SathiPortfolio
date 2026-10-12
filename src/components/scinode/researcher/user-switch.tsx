"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Beaker, CircleAlert, Microscope, Sparkles, Target, type LucideIcon } from "lucide-react"
import { journey, personas, profileFields, users, type UserKey } from "@/lib/scinode-researcher"
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

// ---------------- persona ----------------

function Persona({ k }: { k: UserKey }) {
  const p = personas[k]
  const u = users[k]
  const Icon = icons[k]
  const cols: { title: string; icon: LucideIcon; items: string[] }[] = [
    { title: "Goals", icon: Target, items: p.goals },
    { title: "Frustrations", icon: CircleAlert, items: p.frustrations },
    { title: "Needs", icon: Sparkles, items: p.needs },
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
              Proto-persona · {u.name}
            </p>
            <h3 className="mt-1 font-heading text-[28px] leading-tight font-semibold text-ink">{p.title}</h3>
          </div>
        </div>
        <div>
        <p className="text-[16px] leading-relaxed text-body">{p.who}</p>
        <p className="mt-6 text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">Brings to the profile</p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {p.brings.map((b) => (
            <li key={b} className="rounded-full px-3 py-1 text-[13px] font-medium" style={{ background: u.tint, color: u.ink }}>
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[12.5px] leading-snug text-soft">Built from the product brief and the supplier value proposition. To be validated with researchers.</p>
        </div>
      </div>
      <div className="grid gap-6 border-t border-line pt-7 sm:grid-cols-3 sm:gap-8">
        {cols.map((c) => (
          <div key={c.title}>
            <p className="flex items-center gap-2 font-heading text-[17px] font-semibold text-ink">
              <c.icon className="size-4.5" style={{ color: u.ink }} strokeWidth={2} aria-hidden /> {c.title}
            </p>
            <ul className="mt-3 grid gap-2.5">
              {c.items.map((it) => (
                <li key={it} className="border-l-2 pl-3 text-[14.5px] leading-snug text-body" style={{ borderColor: `${u.ink}55` }}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}

export function PersonaView() {
  return <ForUser cro={<Persona k="cro" />} scientist={<Persona k="scientist" />} />
}

// ---------------- journey ----------------

const phases = [
  { name: "Onboard", span: 2 },
  { name: "Find", span: 1 },
  { name: "Propose", span: 2 },
  { name: "Deliver", span: 3 },
] as const

function Journey({ k }: { k: UserKey }) {
  const u = users[k]
  return (
    <div>
      {/* lg: phases on top, 8 stages on one line */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-8 gap-3">
          {phases.map((ph) => (
            <p key={ph.name} className="border-b-2 pb-2 text-[12px] font-semibold tracking-[0.12em] uppercase" style={{ gridColumn: `span ${ph.span}`, color: u.ink, borderColor: `${u.ink}33` }}>
              {ph.name}
            </p>
          ))}
        </div>
        <ol className="relative mt-6 grid grid-cols-8 gap-3">
          <span aria-hidden className="absolute top-4 right-[6%] left-[6%] border-t-2 border-dashed" style={{ borderColor: `${u.ink}55` }} />
          {journey.map((s, i) => (
            <li key={s.key} className="relative">
              <span className="relative grid size-8 place-items-center rounded-full font-heading text-[13px] font-bold text-white ring-4 ring-cream" style={{ background: u.ink }}>
                {i + 1}
              </span>
              <p className="mt-3 font-heading text-[16px] leading-tight font-semibold text-ink">{s.title}</p>
              <p className="mt-1.5 text-[13.5px] leading-snug text-body">{s[k]}</p>
              {s.offline && <p className="mt-2 rounded-[10px] border border-dashed border-[#d6cbb9] px-2 py-1 text-[11.5px] leading-snug text-soft">{s.offline}</p>}
            </li>
          ))}
        </ol>
      </div>
      {/* phones and tablets: vertical timeline */}
      <ol className="relative grid gap-6 pl-12 lg:hidden">
        <span aria-hidden className="absolute top-2 bottom-2 left-4 border-l-2 border-dashed" style={{ borderColor: `${u.ink}55` }} />
        {journey.map((s, i) => (
          <li key={s.key} className="relative">
            <span className="absolute top-0 -left-12 grid size-8 place-items-center rounded-full font-heading text-[13px] font-bold text-white ring-4 ring-cream" style={{ background: u.ink }}>
              {i + 1}
            </span>
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: u.ink }}>
              {s.phase}
            </p>
            <p className="font-heading text-[18px] leading-tight font-semibold text-ink">{s.title}</p>
            <p className="mt-1 text-[14.5px] leading-snug text-body">{s[k]}</p>
            {s.offline && <p className="mt-2 inline-block rounded-full border border-dashed border-[#d6cbb9] px-2 py-0.5 text-[12px] text-soft">{s.offline}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function JourneyView() {
  return <ForUser cro={<Journey k="cro" />} scientist={<Journey k="scientist" />} />
}

// ---------------- profile field map (highlights what the active user brings) ----------------

export function ProfileFields() {
  const { user } = useUser()
  const u = users[user]
  const brings = new Set(personas[user].brings)
  const group = (title: string, items: string[]) => (
    <div>
      <p className="text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">{title}</p>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((f) => {
          const on = brings.has(f)
          return (
            <li
              key={f}
              className="rounded-full border px-3 py-1 text-[13px] font-medium transition-colors duration-300"
              style={on ? { background: u.tint, color: u.ink, borderColor: "transparent" } : { borderColor: "var(--line)", color: "var(--body)", background: "white" }}
            >
              {f}
            </li>
          )
        })}
      </ul>
    </div>
  )
  return (
    <div className="grid gap-5">
      {group("Organisation", profileFields.organisation)}
      {group("Science", profileFields.science)}
      <p className="flex items-center gap-2 text-[13px] text-soft">
        <span className="size-2.5 rounded-full" style={{ background: u.ink }} aria-hidden /> Highlighted: what a {u.name.toLowerCase()} typically brings
      </p>
      <div className="border-t border-line pt-4">
        <p className="text-[12px] font-semibold tracking-[0.1em] text-soft uppercase">A complete profile unlocks</p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {profileFields.unlocks.map((f) => (
            <li key={f} className="rounded-full bg-brand px-3 py-1 text-[13px] font-medium text-white">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
