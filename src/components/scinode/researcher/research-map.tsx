"use client"

import { useState } from "react"
import { Quote } from "lucide-react"
import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"
import { serif } from "@/components/scinode/researcher/fonts"
import { obResearch } from "@/lib/scinode-onboarding"
import { cn } from "@/lib/utils"

// "What labs told us": a bubble map of the four findings (after a qualitative-research chart Sathi shared),
// placed by who the finding shapes (CRO → scientist) and the kind of evidence (said → measured), with
// a card per finding below: what we heard → what it means → design decision. Hover links bubble and card.

const tones = [
  { fill: "#F2D98B", ink: "#6a4d0f", soft: "#FBF1D3" }, // warm yellow
  { fill: "#B79CEC", ink: "#2B2150", soft: "#F1EBFC" }, // purple
  { fill: "#8fd3b4", ink: "#1F392D", soft: "#e4f1eb" }, // green
  { fill: "#d6c6f5", ink: "#4A307D", soft: "#F1EBFC" }, // light purple
]
// bubble position (plot coords 0–470 × 0–440) and size, one per finding
const bubbles = [
  { cx: 122, cy: 352, rx: 118, ry: 70, short: ["Prove it,", "don't describe it"] },
  { cx: 158, cy: 82, rx: 128, ry: 64, short: ["0/10 platforms", "show equipment"] },
  { cx: 262, cy: 216, rx: 128, ry: 70, short: ["Trust before", "a lab can bid"] },
  { cx: 362, cy: 352, rx: 112, ry: 70, short: ["Minutes,", "not hours"] },
]

export function ResearchMap() {
  const [on, setOn] = useState<number | null>(null)
  const ox = 70
  const oy = 20
  const W = 470
  const H = 440
  const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

  return (
    <FlowReveal className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="rounded-[22px] bg-white p-3 ring-1 ring-line sm:p-4 lg:sticky lg:top-28">
        <svg viewBox="0 0 560 530" className="w-full" role="img" aria-label="Map of the four research findings by who they shape (CRO to scientist) and type of evidence (said to measured).">
          <defs>
            <marker id="rm-ax" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 Z" fill="#9aa8a2" />
            </marker>
          </defs>
          {/* axes */}
          <g data-fl="lane" style={at(0)}>
            <line x1={ox} y1={oy + H} x2={ox + W} y2={oy + H} stroke="#1d1d1f" strokeWidth="2" />
            <line x1={ox} y1={oy} x2={ox} y2={oy + H} stroke="#1d1d1f" strokeWidth="2" />
            <text x={ox + 6} y={oy + H + 24} fontSize="17" fill="#4c6763">CRO</text>
            <text x={ox + W} y={oy + H + 24} fontSize="17" fill="#4c6763" textAnchor="end">Scientist</text>
            <line x1={ox + 120} y1={oy + H + 46} x2={ox + W - 120} y2={oy + H + 46} stroke="#9aa8a2" markerStart="url(#rm-ax)" markerEnd="url(#rm-ax)" />
            <text x={ox + W / 2} y={oy + H + 50} fontSize="17" fontWeight="700" fill="#1d1d1f" textAnchor="middle" paintOrder="stroke" stroke="#fff" strokeWidth="10">
              Who it shapes
            </text>
            <text transform={`translate(${ox - 16} ${oy + H - 6}) rotate(-90)`} fontSize="17" fill="#4c6763">Said</text>
            <text transform={`translate(${ox - 16} ${oy + 6}) rotate(-90)`} fontSize="17" fill="#4c6763" textAnchor="end">Measured</text>
            <line x1={ox - 40} y1={oy + 100} x2={ox - 40} y2={oy + H - 100} stroke="#9aa8a2" markerStart="url(#rm-ax)" markerEnd="url(#rm-ax)" />
            <text transform={`translate(${ox - 44} ${oy + H / 2}) rotate(-90)`} fontSize="17" fontWeight="700" fill="#1d1d1f" textAnchor="middle" paintOrder="stroke" stroke="#fff" strokeWidth="10">
              Evidence
            </text>
          </g>
          {/* bubbles */}
          {bubbles.map((b, i) => {
            const t = tones[i]
            const dim = on !== null && on !== i
            return (
              <g
                key={i}
                data-fl="node"
                style={at(250 + i * 160)}
                onMouseEnter={() => setOn(i)}
                onMouseLeave={() => setOn(null)}
                className="cursor-default"
              >
                <ellipse
                  cx={ox + b.cx}
                  cy={oy + b.cy}
                  rx={b.rx}
                  ry={b.ry}
                  fill={t.fill}
                  fillOpacity={dim ? 0.18 : on === i ? 0.85 : 0.55}
                  stroke={on === i ? t.ink : "none"}
                  strokeWidth="1.5"
                  style={{ transition: "fill-opacity .25s" }}
                />
              </g>
            )
          })}
          {/* labels on top of all bubbles so overlaps never hide text */}
          {bubbles.map((b, i) => {
            const t = tones[i]
            const dim = on !== null && on !== i
            return (
              <g key={`l${i}`} data-fl="label" style={at(400 + i * 160)} opacity={dim ? 0.35 : 1} className="pointer-events-none">
                <circle cx={ox + b.cx} cy={oy + b.cy - 40} r="14" fill="#fff" stroke={t.ink} strokeWidth="1.4" />
                <text x={ox + b.cx} y={oy + b.cy - 35} textAnchor="middle" fontSize="14" fontWeight="700" fill={t.ink}>
                  {i + 1}
                </text>
                {b.short.map((l, k) => (
                  <text key={l} x={ox + b.cx} y={oy + b.cy - 6 + k * 22} textAnchor="middle" fontSize="19.5" fontWeight="700" fill={t.ink}>
                    {l}
                  </text>
                ))}
                <text x={ox + b.cx} y={oy + b.cy + 42} textAnchor="middle" fontSize="12.5" fontWeight="600" letterSpacing="1" fill={t.ink} opacity="0.7">
                  {obResearch[i].method.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* one card per finding: heard → means → decision */}
      <ol className="grid gap-3">
        {obResearch.map((r, i) => {
          const t = tones[i]
          return (
            <li
              key={r.method}
              data-fl="node"
              onMouseEnter={() => setOn(i)}
              onMouseLeave={() => setOn(null)}
              className={cn(
                "grid overflow-hidden rounded-[20px] bg-white ring-1 transition-shadow",
                on === i ? "shadow-[0_18px_40px_-24px_rgba(43,33,80,0.45)] ring-2" : "ring-line"
              )}
              style={{ ...at(900 + i * 120), ...(on === i ? ({ "--tw-ring-color": t.fill } as React.CSSProperties) : {}) }}
            >
              <div className="flex items-center gap-2.5 px-4 pt-4">
                <span className="grid size-7 place-items-center rounded-full text-[12px] font-bold" style={{ background: t.fill, color: t.ink }}>
                  {i + 1}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: t.ink }}>
                  {r.method}
                </span>
              </div>
              <dl className="grid gap-0 px-4 pt-3 pb-4">
                <div className="rounded-[14px] p-3" style={{ background: t.soft }}>
                  <dt className="text-[10.5px] font-semibold tracking-[0.12em] text-soft uppercase">What we heard</dt>
                  <dd className="mt-1">
                    {r.quote && (
                      <p className={cn(serif.className, "flex gap-1.5 text-[16px] leading-snug text-ink italic")}>
                        <Quote className="mt-1 size-3.5 shrink-0 rotate-180" style={{ color: t.ink }} aria-hidden />
                        {r.quote}
                      </p>
                    )}
                    {r.stat && (
                      <p className="flex items-baseline gap-2">
                        <span className="font-heading text-[30px] leading-none font-semibold" style={{ color: t.ink }}>
                          {r.stat.value}
                        </span>
                        <span className="text-[13.5px] text-body">{r.stat.label}</span>
                      </p>
                    )}
                    {r.question && <p className={cn(serif.className, "text-[16px] leading-snug text-ink italic")}>&ldquo;{r.question}&rdquo;</p>}
                  </dd>
                </div>
                <div className="relative ml-4 border-l-2 border-dashed py-2.5 pl-4" style={{ borderColor: t.fill }}>
                  <dt className="text-[10.5px] font-semibold tracking-[0.12em] text-soft uppercase">What it means</dt>
                  <dd className="mt-0.5 text-[14.5px] leading-snug font-semibold text-ink">{r.insight}</dd>
                </div>
                <div className="rounded-[14px] bg-[#1F392D] p-3 text-white">
                  <dt className="text-[10.5px] font-semibold tracking-[0.12em] text-[#a8e6c9] uppercase">Design decision</dt>
                  <dd className="mt-1 text-[14px] leading-snug">{r.decision}</dd>
                </div>
              </dl>
            </li>
          )
        })}
      </ol>
    </FlowReveal>
  )
}
