"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Phone layout of a persona: a compact header (round portrait beside name and role, facts inline,
// the quote), then goals / frustrations / needs as tabs, so the card fits about one screen.

type Persona = {
  name: string
  role: string
  goals: string[]
  frustrations: string[]
  about?: string
  facts?: { label: string; value: string }[]
  needs?: string[]
  quote?: string
  photo?: { src: string; alt: string; width: number; height: number }
}

export function PersonaMobile({ p }: { p: Persona }) {
  const tabs = [
    { key: "goals", label: "Goals", items: p.goals, tone: "var(--tone-green)" },
    { key: "frustrations", label: "Frustrations", items: p.frustrations, tone: "var(--tone-orange)" },
    ...(p.needs ? [{ key: "needs", label: "Needs", items: p.needs, tone: "var(--tone-purple-ink)" }] : []),
  ]
  const [tab, setTab] = useState(tabs[0].key)
  const cur = tabs.find((t) => t.key === tab)!
  return (
    <article className="rounded-[22px] bg-white/60 p-4 ring-1 ring-line">
      <div className="flex items-center gap-3.5">
        {p.photo && (
          <Image src={p.photo.src} alt={p.photo.alt} width={p.photo.width} height={p.photo.height} sizes="72px" className="size-[72px] shrink-0 rounded-full object-cover object-[38%_30%] ring-4 ring-white" />
        )}
        <div className="min-w-0">
          <h4 className="font-heading text-[21px] leading-tight font-semibold text-ink">{p.name}</h4>
          <p className="text-[14px] leading-snug font-medium text-[var(--tone-purple-ink)]">{p.role}</p>
        </div>
      </div>

      {p.facts && (
        <dl className="mt-4 grid grid-cols-2 gap-2">
          {p.facts.map((f) => (
            <div key={f.label} className="rounded-[14px] bg-white px-3 py-2">
              <dt className="text-[10.5px] font-semibold tracking-[0.08em] text-soft uppercase">{f.label}</dt>
              <dd className="text-[14.5px] font-semibold text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {p.quote && <blockquote className="mt-4 rounded-2xl bg-white px-4 py-3 font-heading text-[16px] leading-snug font-semibold text-ink">“{p.quote}”</blockquote>}
      {p.about && <p className="mt-3 text-[14.5px] leading-relaxed text-body">{p.about}</p>}

      <div role="tablist" aria-label={`${p.name}: goals, frustrations and needs`} className="mt-5 flex gap-1 rounded-full bg-[#f2ece3] p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            id={`pm-tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls="pm-panel"
            onClick={() => setTab(t.key)}
            className={cn("min-h-[44px] flex-1 rounded-full px-2 text-[14px] font-semibold transition-colors", tab === t.key ? "bg-white text-ink shadow-sm" : "text-soft")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul id="pm-panel" role="tabpanel" aria-labelledby={`pm-tab-${tab}`} className="mt-4 grid gap-2.5 px-1">
        {cur.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[15px] leading-snug text-ink">
            <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full" style={{ background: cur.tone }} />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}
