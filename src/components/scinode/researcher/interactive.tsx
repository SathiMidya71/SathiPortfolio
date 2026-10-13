"use client"

import { useState } from "react"
import { ArrowRight, EyeOff } from "lucide-react"
import { evolution, pilotLogic } from "@/lib/scinode-researcher"
import { cn } from "@/lib/utils"

// Interactive pieces of the Scinode for Researchers case study.

/** One question in the CRO profile reshapes the form: try "Yes" and "No". */
export function PilotPlantToggle() {
  const [plant, setPlant] = useState(false)
  return (
    <div className="rounded-[24px] border border-line bg-white p-5 md:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-heading text-[18px] font-semibold text-ink">Do you have a pilot plant?</p>
        <div role="radiogroup" aria-label="Pilot plant" className="inline-flex rounded-full bg-sand p-1">
          {[
            { v: false, l: "No" },
            { v: true, l: "Yes" },
          ].map((o) => (
            <button
              key={o.l}
              role="radio"
              aria-checked={plant === o.v}
              onClick={() => setPlant(o.v)}
              className={cn("rounded-full px-5 py-1.5 text-[14px] font-semibold transition-colors", plant === o.v ? "bg-brand text-white" : "text-body hover:text-ink")}
            >
              {o.l}
            </button>
          ))}
        </div>
        <span className="text-[13px] text-soft">Try it</span>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {["Equipment", "Facility & EHS"].map((g) => (
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
    </div>
  )
}

/** First concept vs what shipped: flip all cards with one switch. */
export function EvolutionFlip() {
  const [shipped, setShipped] = useState(false)
  return (
    <div>
      <div role="tablist" aria-label="Version" className="inline-flex rounded-full border border-line bg-white p-1">
        {[
          { v: false, l: "First concept" },
          { v: true, l: "What shipped" },
        ].map((o) => (
          <button
            key={o.l}
            role="tab"
            aria-selected={shipped === o.v}
            onClick={() => setShipped(o.v)}
            className={cn("rounded-full px-5 py-2 text-[14.5px] font-semibold transition-colors", shipped === o.v ? "bg-brand text-white" : "text-body hover:text-ink")}
          >
            {o.l}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {evolution.map((e, i) => (
          <li key={e.area} className="[perspective:1200px]">
            <button
              onClick={() => setShipped((s) => !s)}
              aria-label={`${e.area}: ${shipped ? e.after : e.before}`}
              className="relative block h-[170px] w-full text-left transition-transform duration-700 [transform-style:preserve-3d]"
              style={{ transform: shipped ? "rotateY(180deg)" : "none", transitionDelay: `${i * 60}ms` }}
            >
              {/* front: first concept */}
              <span className="absolute inset-0 flex flex-col rounded-[20px] border-2 border-dashed border-[#d6cbb9] bg-[#fbf8f3] p-5 [backface-visibility:hidden]">
                <span className="text-[11.5px] font-semibold tracking-[0.12em] text-soft uppercase">{e.area}</span>
                <span className="mt-auto font-heading text-[21px] leading-snug font-semibold text-soft">{e.before}</span>
              </span>
              {/* back: shipped */}
              <span className="absolute inset-0 flex flex-col rounded-[20px] bg-brand p-5 text-white shadow-[0_20px_40px_-24px_rgba(2,89,78,0.8)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[0.12em] text-white/70 uppercase">
                  {e.area} <ArrowRight className="size-3" aria-hidden /> shipped
                </span>
                <span className="mt-auto font-heading text-[19px] leading-snug font-semibold">{e.after}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13px] text-soft">Tap a card or the switch to flip between the first concept and the shipped design.</p>
    </div>
  )
}
