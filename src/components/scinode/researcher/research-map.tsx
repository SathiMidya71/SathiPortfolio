import { ArrowDown, Quote } from "lucide-react"
import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { serif } from "@/components/scinode/researcher/fonts"
import { obResearch } from "@/lib/scinode-onboarding"
import { cn } from "@/lib/utils"

// "What labs told us": four findings as four columns, each read top to bottom:
// what we heard → what it means → what I designed. Row labels sit on the left on desktop.

const tones = [
  { fill: "#F2D98B", ink: "#6a4d0f", soft: "#FBF1D3" }, // warm yellow
  { fill: "#B79CEC", ink: "#2B2150", soft: "#F1EBFC" }, // purple
  { fill: "#8fd3b4", ink: "#1F392D", soft: "#e4f1eb" }, // green
  { fill: "#d6c6f5", ink: "#4A307D", soft: "#F1EBFC" }, // light purple
]
const rows = ["What we heard", "What it means", "What I designed"]
const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

export type ResearchItem = {
  method: string
  quote?: string
  stat?: { value: string; label: string }
  question?: string
  insight: string
  decision: string
}

export function ResearchMap({ items = obResearch }: { items?: readonly ResearchItem[] }) {
  return (
    <FlowReveal className="grid gap-3 lg:grid-cols-[110px_repeat(4,minmax(0,1fr))] lg:gap-x-3 lg:gap-y-0">
      {/* row labels (desktop) */}
      {rows.map((r, k) => (
        <p
          key={r}
          className="lg:[grid-column:var(--c)] lg:[grid-row:var(--r)] hidden self-center pr-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase lg:block"
          style={{ "--c": 1, "--r": k + 2 } as React.CSSProperties}
        >
          {r}
        </p>
      ))}

      {items.map((r, i) => {
        const t = tones[i]
        const col = { "--c": i + 2 } as React.CSSProperties
        return (
          <div key={r.method} className="contents">
            {/* header */}
            <div data-fl="node" style={{ ...at(i * 120), ...col, "--r": 1 } as React.CSSProperties} className="lg:[grid-column:var(--c)] lg:[grid-row:var(--r)] flex items-center gap-2 pb-3 max-lg:mt-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold" style={{ background: t.fill, color: t.ink }}>
                {i + 1}
              </span>
              <span className="text-[11px] leading-tight font-semibold tracking-[0.1em] uppercase" style={{ color: t.ink }}>
                {r.method}
              </span>
            </div>

            {/* heard */}
            <div data-fl="node" style={{ ...at(i * 120 + 100), ...col, "--r": 2, background: t.soft } as React.CSSProperties} className="lg:[grid-column:var(--c)] lg:[grid-row:var(--r)] rounded-[18px] p-4">
              <p className="mb-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-soft uppercase lg:hidden">{rows[0]}</p>
              {r.quote && (
                <p className={cn(serif.className, "text-[15.5px] leading-snug text-ink italic")}>
                  <Quote className="mr-1 mb-1 inline size-3.5 rotate-180" style={{ color: t.ink }} aria-hidden />
                  {r.quote}
                </p>
              )}
              {r.stat && (
                <p>
                  <span className="block font-heading text-[40px] leading-none font-semibold" style={{ color: t.ink }}>
                    {r.stat.value}
                  </span>
                  <span className="mt-1.5 block text-[13.5px] leading-snug text-body">{r.stat.label}</span>
                </p>
              )}
              {r.question && <p className={cn(serif.className, "text-[15.5px] leading-snug text-ink italic")}>&ldquo;{r.question}&rdquo;</p>}
            </div>

            {/* means */}
            <div data-fl="node" style={{ ...at(i * 120 + 250), ...col, "--r": 3 } as React.CSSProperties} className="lg:[grid-column:var(--c)] lg:[grid-row:var(--r)] flex flex-col items-center py-2 text-center">
              <ArrowDown className="size-4" style={{ color: t.ink }} aria-hidden />
              <p className="mt-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-soft uppercase lg:hidden">{rows[1]}</p>
              <p className="my-1.5 text-[14.5px] leading-snug font-semibold text-ink">{r.insight}</p>
              <ArrowDown className="size-4" style={{ color: t.ink }} aria-hidden />
            </div>

            {/* designed */}
            <div data-fl="node" style={{ ...at(i * 120 + 400), ...col, "--r": 4 } as React.CSSProperties} className="lg:[grid-column:var(--c)] lg:[grid-row:var(--r)] rounded-[18px] bg-[#1F392D] p-4 text-white">
              <p className="mb-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-[#a8e6c9] uppercase lg:hidden">{rows[2]}</p>
              <p className="text-[14px] leading-snug">{r.decision}</p>
            </div>
          </div>
        )
      })}
    </FlowReveal>
  )
}
