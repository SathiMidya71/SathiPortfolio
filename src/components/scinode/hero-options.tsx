"use client"

import { useState } from "react"
import { EcosystemHero } from "@/components/scinode/ecosystem-hero"
import { cn } from "@/lib/utils"

// TEMPORARY: lets Sathi compare the two SCINODE hero options. Remove once she picks one.
export function HeroOptions() {
  const [v, setV] = useState<"network" | "bridge">("network")
  return (
    <div className="grid gap-3">
      <div role="tablist" aria-label="Hero option" className="inline-flex w-fit rounded-full border border-line bg-white p-1 text-[13px] font-semibold">
        {(
          [
            ["network", "Option A · Network"],
            ["bridge", "Option B · Bridge"],
          ] as const
        ).map(([k, l]) => (
          <button key={k} role="tab" aria-selected={v === k} onClick={() => setV(k)} className={cn("rounded-full px-4 py-1.5 transition-colors", v === k ? "bg-brand text-white" : "text-body hover:text-brand")}>
            {l}
          </button>
        ))}
      </div>
      <EcosystemHero variant={v} />
    </div>
  )
}
