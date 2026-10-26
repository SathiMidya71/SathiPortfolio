"use client"

import { useState } from "react"
import Image from "next/image"
import { Brain, Hand, Heart, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Phone layout of the empathy map: one quadrant at a time. The four quadrants form a 2×2 picker
// (the shape of the map), the chosen one's notes show below; pains and gains share a toggle.

type Quad = "says" | "thinks" | "does" | "feels"
const quads = [
  { key: "says", label: "Says", icon: MessageCircle, tint: "#f3eefc", ink: "#6b4cb8" },
  { key: "thinks", label: "Thinks", icon: Brain, tint: "#e6f2fe", ink: "#1666c4" },
  { key: "does", label: "Does", icon: Hand, tint: "#e4f1eb", ink: "#02594e" },
  { key: "feels", label: "Feels", icon: Heart, tint: "#fdeee0", ink: "#9a4a12" },
] as const

type Props = {
  name: string
  photo?: { src: string; alt: string; width: number; height: number }
  says: readonly string[]
  thinks: readonly string[]
  does: readonly string[]
  feels: readonly string[]
  pains: readonly string[]
  gains: readonly string[]
}

export function EmpathyMobile(p: Props) {
  const [q, setQ] = useState<Quad>("says")
  const [pg, setPg] = useState<"pains" | "gains">("pains")
  const cur = quads.find((x) => x.key === q)!
  const items = p[q]
  return (
    <div>
      {/* who the map is about */}
      <div className="flex items-center gap-3">
        {p.photo && (
          <span className="relative size-14 shrink-0">
            <span aria-hidden className="absolute -inset-1 rounded-full border-2 border-dashed border-[#b79cec]" />
            <Image src={p.photo.src} alt={p.photo.alt} width={p.photo.width} height={p.photo.height} sizes="56px" className="size-14 rounded-full object-cover" />
          </span>
        )}
        <div>
          <p className="font-hand text-[24px] leading-none font-bold text-ink">{p.name}</p>
          <p className="mt-1 text-[13px] text-soft">Tap a quadrant to read it</p>
        </div>
      </div>

      {/* 2×2 quadrant picker */}
      <div role="tablist" aria-label="Empathy map quadrants" className="mt-5 grid grid-cols-2 gap-2">
        {quads.map((x) => {
          const on = x.key === q
          const Icon = x.icon
          return (
            <button
              key={x.key}
              role="tab"
              id={`em-tab-${x.key}`}
              aria-selected={on}
              aria-controls="em-panel"
              onClick={() => setQ(x.key)}
              className={cn("flex min-h-[52px] items-center gap-2.5 rounded-[16px] border-2 px-3 py-2 text-left transition-colors", on ? "bg-white" : "border-transparent")}
              style={{ background: on ? "#fff" : x.tint, borderColor: on ? x.ink : "transparent" }}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full" style={{ background: on ? x.tint : "#ffffffaa", color: x.ink }}>
                <Icon className="size-4" strokeWidth={1.9} aria-hidden />
              </span>
              <span className="font-hand text-[24px] leading-none font-bold" style={{ color: x.ink }}>
                {x.label}
              </span>
              <span className="ml-auto text-[12px] font-semibold text-soft">{p[x.key].length}</span>
            </button>
          )
        })}
      </div>

      {/* the chosen quadrant */}
      <ul id="em-panel" role="tabpanel" aria-labelledby={`em-tab-${q}`} className="mt-4 grid gap-2">
        {items.map((t) => (
          <li
            key={t}
            className={cn("px-4 py-3 text-[15px] leading-snug text-ink", q === "says" ? "rounded-2xl rounded-bl-md bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]" : "rounded-xl")}
            style={q === "says" ? undefined : { background: cur.tint }}
          >
            {q === "says" ? `“${t}”` : t}
          </li>
        ))}
      </ul>

      {/* pains and gains */}
      <div className="mt-6 rounded-[18px] border-2 border-dashed border-[#e6dccd] p-4">
        <div role="tablist" aria-label="Pains and gains" className="grid grid-cols-2 gap-1 rounded-full bg-[#f2ece3] p-1">
          {(["pains", "gains"] as const).map((k) => (
            <button
              key={k}
              role="tab"
              id={`pg-tab-${k}`}
              aria-selected={pg === k}
              aria-controls="pg-panel"
              onClick={() => setPg(k)}
              className={cn("min-h-[44px] rounded-full text-[15px] font-semibold capitalize transition-colors", pg === k ? "bg-white text-ink shadow-sm" : "text-soft")}
            >
              {k}
            </button>
          ))}
        </div>
        <ul id="pg-panel" role="tabpanel" aria-labelledby={`pg-tab-${pg}`} className="mt-4 grid gap-2">
          {p[pg].map((t) => (
            <li key={t} className="flex gap-2.5 text-[15px] leading-snug text-ink">
              <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full" style={{ background: pg === "pains" ? "var(--tone-orange)" : "var(--tone-green)" }} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
