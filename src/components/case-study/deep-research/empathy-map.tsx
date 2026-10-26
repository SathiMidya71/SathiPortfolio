import Image from "next/image"
import { Brain, Hand, Heart, MessageCircle } from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"
import { EmpathyMobile } from "./empathy-mobile"

// Empathy map drawn like a whiteboard: a dashed cross with the persona's portrait in the middle,
// handwritten quadrant labels, and pains / gains underneath.

type EmpathyBlock = Extract<Block, { type: "empathyMap" }>

const quads = [
  { key: "says", label: "Says", icon: MessageCircle, tint: "#f3eefc", ink: "#6b4cb8" },
  { key: "thinks", label: "Thinks", icon: Brain, tint: "#e6f2fe", ink: "#1666c4" },
  { key: "does", label: "Does", icon: Hand, tint: "#e4f1eb", ink: "#02594e" },
  { key: "feels", label: "Feels", icon: Heart, tint: "#fdeee0", ink: "#9a4a12" },
] as const

export function EmpathyMapView({ block }: { block: EmpathyBlock }) {
  return (
    <>
    {/* phones: one quadrant at a time */}
    <div className="md:hidden">
      <EmpathyMobile name={block.name} photo={block.photo} says={block.says} thinks={block.thinks} does={block.does} feels={block.feels} pains={block.pains} gains={block.gains} />
    </div>
    <div className="max-md:hidden">
      <div className="relative">
        {/* portrait at the centre of the cross */}
        {block.photo && (
          <div className="relative z-10 mx-auto mb-8 w-32 md:absolute md:top-1/2 md:left-1/2 md:mb-0 md:w-36 md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="relative">
              <span aria-hidden className="absolute -inset-2 rounded-full border-2 border-dashed border-[#b79cec] bg-cream" />
              <Image src={block.photo.src} alt={block.photo.alt} width={block.photo.width} height={block.photo.height} sizes="144px" className="relative aspect-square w-full rounded-full object-cover" />
            </div>
            <p className="relative mt-3 text-center font-hand text-[24px] leading-none font-bold text-ink md:absolute md:inset-x-[-40px] md:-bottom-9">{block.name}</p>
          </div>
        )}
        <div className="grid md:grid-cols-2">
          {quads.map((q, i) => {
            const Icon = q.icon
            const items = block[q.key]
            const right = i % 2 === 1
            const bottom = i > 1
            return (
              <section
                key={q.key}
                className={cn(
                  "border-dashed border-[#d6cbb9] py-8 md:px-10 md:py-12",
                  i > 0 && "max-md:border-t-2",
                  right && "md:border-l-2 md:pr-0",
                  !right && "md:pl-0",
                  bottom && "md:border-t-2",
                  // keep text clear of the central portrait
                  !bottom && "md:pb-24",
                  bottom && "md:pt-24",
                  !right && "md:pr-24",
                  right && "md:pl-24"
                )}
              >
                <p className={cn("flex items-center gap-2.5", right && "md:flex-row-reverse md:text-right")}>
                  <span className="grid size-10 place-items-center rounded-full" style={{ background: q.tint, color: q.ink }}>
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="font-hand text-[38px] leading-none font-bold" style={{ color: q.ink }}>
                    {q.label}
                  </span>
                </p>
                <ul className={cn("mt-5 grid gap-2.5", right && "md:justify-items-end")}>
                  {items.map((t) => (
                    <li
                      key={t}
                      className={cn(
                        "w-fit max-w-[340px] px-4 py-2.5 text-[15.5px] leading-snug text-ink",
                        q.key === "says" ? "rounded-2xl rounded-bl-md bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]" : "rounded-xl",
                        right && "md:text-right"
                      )}
                      style={q.key === "says" ? undefined : { background: q.tint }}
                    >
                      {q.key === "says" ? `“${t}”` : t}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>

      {/* pains and gains */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          { label: "Pains", items: block.pains, tone: "var(--tone-orange)", tint: "#f2c39b" },
          { label: "Gains", items: block.gains, tone: "var(--tone-green)", tint: "#a9d3bf" },
        ].map((g) => (
          <div key={g.label} className="rounded-[18px] border-2 border-dashed p-6" style={{ borderColor: g.tint }}>
            <p className="font-hand text-[32px] leading-none font-bold" style={{ color: g.tone }}>
              {g.label}
            </p>
            <ul className="mt-4 grid gap-2">
              {g.items.map((t) => (
                <li key={t} className="flex gap-2.5 text-[15.5px] leading-snug text-ink">
                  <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full" style={{ background: g.tone }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
