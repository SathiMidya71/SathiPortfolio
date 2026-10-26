import Image from "next/image"
import { Brain, Hand, Heart, MessageCircle } from "lucide-react"

// Phone layout of the empathy map, same shape as the SCINODE one: a white 2×2 card (Says / Thinks /
// Does / Feels) with the persona's portrait where the lines cross, then pains and gains. Everything
// visible at once, no tapping.

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
  return (
    <div className="grid gap-3">
      <div className="relative grid grid-cols-2 grid-rows-[1fr_1fr] gap-px overflow-hidden rounded-[22px] bg-line">
        {quads.map((q, i) => {
          const Icon = q.icon
          return (
            <div key={q.key} className={i < 2 ? "bg-white px-3.5 pt-4 pb-10" : "bg-white px-3.5 pt-11 pb-4"}>
              <p className="flex items-center gap-2 font-heading text-[17px] font-semibold" style={{ color: q.ink }}>
                <span className="grid size-7 shrink-0 place-items-center rounded-full" style={{ background: q.tint }}>
                  <Icon className="size-3.5" aria-hidden />
                </span>
                {q.label}
              </p>
              <ul className="mt-2.5 grid gap-2">
                {p[q.key].map((t) => (
                  <li key={t} className="text-[14px] leading-snug text-body">
                    {q.key === "says" ? `“${t}”` : t}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        {p.photo && (
          <Image
            src={p.photo.src}
            alt={p.photo.alt}
            width={p.photo.width}
            height={p.photo.height}
            sizes="56px"
            className="absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-[0_0_0_4px_white,0_0_0_6px_#b79cec]"
          />
        )}
      </div>
      <p className="text-center font-hand text-[20px] leading-none font-bold text-ink">{p.name}</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Pains", items: p.pains, tone: "#9a4a12", tint: "#fdeee0" },
          { label: "Gains", items: p.gains, tone: "#02594e", tint: "#e4f1eb" },
        ].map((g) => (
          <div key={g.label} className="rounded-[18px] p-3.5" style={{ background: g.tint }}>
            <p className="font-heading text-[17px] font-semibold" style={{ color: g.tone }}>
              {g.label}
            </p>
            <ul className="mt-2 grid gap-1.5">
              {g.items.map((t) => (
                <li key={t} className="text-[14px] leading-snug text-ink">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
