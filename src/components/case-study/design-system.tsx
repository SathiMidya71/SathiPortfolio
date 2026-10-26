import Image from "next/image"
import { Roboto } from "next/font/google"
import {
  ChevronLeft,
  CirclePlus,
  House,
  Lock,
  Mail,
  MailOpen,
  Monitor,
  Ruler,
  Settings,
  Share2,
  Tablet,
  User,
  type LucideIcon,
} from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })

type DesignSystemBlock = Extract<Block, { type: "designSystem" }>

// Lucide equivalents of the app's icon set
export const iconMap = {
  home: House,
  share: Share2,
  invitations: MailOpen,
  back: ChevronLeft,
  mail: Mail,
  device: Tablet,
  lock: Lock,
  units: Ruler,
  profile: User,
  "device-details": Monitor,
  add: CirclePlus,
  settings: Settings,
} satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof iconMap

const ALPHABET = "Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz"
const eyebrow = "text-[11px] font-semibold tracking-[0.14em] text-soft uppercase"

function HexPill({ hex, name }: { hex: string; name: string }) {
  return (
    <span className="inline-flex flex-col items-center rounded-full border border-line bg-white/70 px-3.5 py-1.5 leading-tight">
      <span className="text-[11px] font-medium text-soft">{name}</span>
      <span className="font-mono text-[12px] font-semibold text-ink">{hex}</span>
    </span>
  )
}

export function DesignSystemView({ block }: { block: DesignSystemBlock }) {
  const gradient = `linear-gradient(100deg, ${block.brand.map((b) => b.hex).slice(0, 3).join(", ")})`
  const primary = block.icons.filter((i) => i.primary)
  const secondary = block.icons.filter((i) => !i.primary)
  const weights = { Regular: 400, Medium: 500, Bold: 700 } as Record<string, number>

  return (
    <div className="grid gap-20">
      {/* ---------- Typography ---------- */}
      <section className={roboto.className} aria-label="Typography">
        <p className={cn(eyebrow, "font-sans")}>Typography</p>
        <div className="mt-6 text-center">
          <p
            className="bg-clip-text text-[48px] leading-none font-bold tracking-[-0.03em] text-transparent sm:text-[96px]"
            style={{ backgroundImage: gradient }}
          >
            {block.typeface}
          </p>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-lg text-body">
            {block.weights.map((w, i) => (
              <span key={w} className="inline-flex items-center gap-4">
                {i > 0 && <span className="text-soft/60">×</span>}
                <span style={{ fontWeight: weights[w] ?? 400 }}>{w}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="mt-12 grid items-end gap-6 md:grid-cols-[auto_1fr] md:gap-10">
          <span className="text-[110px] leading-[0.78] font-medium tracking-[-0.04em] text-ink sm:text-[180px]">Aa</span>
          <p className="max-w-[420px] pb-2 text-xl leading-relaxed text-body">{ALPHABET}</p>
        </div>

        {/* scale as a timeline: equal spacing, each label at its real size */}
        <div className="relative mt-12">
          <span aria-hidden className="absolute inset-x-0 top-[5px] h-px bg-ink/20" />
          <ol className="relative flex justify-between">
            {[...block.scale].reverse().map((px) => (
              <li key={px} className="flex flex-col items-center gap-3">
                <span className="size-[11px] rounded-full border-2 border-cream bg-ink" />
                <span className="leading-none font-medium text-ink tabular-nums" style={{ fontSize: Math.max(12, px * 0.75) }}>
                  {px}
                  <span className="text-[0.55em] text-soft"> px</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Colour ---------- */}
      <section aria-label="Colour">
        <p className={eyebrow}>Colour</p>
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
            {block.brand.map((c) => (
              <li key={c.hex} className="flex flex-col items-center">
                {c.image && (
                  <>
                    <span className="relative h-[150px] w-[64px] overflow-hidden rounded-full ring-1 ring-black/10 sm:h-[180px] sm:w-[76px]">
                      <Image
                        src={c.image.src}
                        alt={c.image.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                        style={{ objectPosition: c.image.position ?? "center" }}
                      />
                    </span>
                    <span aria-hidden className="h-8 w-px bg-ink/25" />
                  </>
                )}
                <span
                  className="size-[104px] rounded-full ring-1 ring-black/10 sm:size-[120px]"
                  style={{ background: c.hex }}
                />
                <span className="mt-4">
                  <HexPill hex={c.hex} name={c.name} />
                </span>
              </li>
            ))}
          </ul>

          <div className="lg:pb-0">
            <p className={cn(eyebrow, "mb-4 text-center lg:text-left")}>Neutrals</p>
            <ul className="flex justify-center gap-4">
              {block.neutrals.map((c) => (
                <li key={c.hex} className="flex flex-col items-center gap-3">
                  <span className="size-16 rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
                  <HexPill hex={c.hex} name={c.name} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Icons ---------- */}
      <section aria-label="Icons">
        <p className={eyebrow}>Icons</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {primary.map((ic) => {
              const Icon = iconMap[ic.icon]
              return (
                <li key={ic.icon} className="flex flex-col items-center gap-2">
                  <span
                    className="grid size-16 place-items-center rounded-full sm:size-[72px]"
                    style={{ background: block.brand.find((b) => b.name === "Sky")?.hex ?? "#6CE3FF" }}
                  >
                    <Icon className="size-6 text-black" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-[12px] font-medium text-body">{ic.label}</span>
                </li>
              )
            })}
          </ul>
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {secondary.map((ic) => {
              const Icon = iconMap[ic.icon]
              return (
                <li key={ic.icon} className="flex flex-col items-center gap-2">
                  <span className="grid size-16 place-items-center rounded-full border-[1.5px] border-[#3798BF]/50 bg-white/60 sm:size-[72px]">
                    <Icon className="size-6 text-black" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-[12px] font-medium text-body">{ic.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}
