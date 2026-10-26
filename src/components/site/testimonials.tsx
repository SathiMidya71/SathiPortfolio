import Image from "next/image"
import { profile, workingWithMe, type Recommendation } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { Section } from "./section"

// "What it's like to work with me": LinkedIn-style recommendation cards scattered around Sathi's
// photo and a sticky note, like a pinboard. From xl up the pieces are placed absolutely with tilts;
// below that they stack in one column. Hover straightens and lifts a piece.

const tones: Record<Recommendation["tone"], { border: string; avatar: string; ink: string }> = {
  blue: { border: "#5aa9e6", avatar: "#b2ddff", ink: "#1666c4" },
  orange: { border: "#f0857f", avatar: "#ffd6ae", ink: "#9a4a12" },
  purple: { border: "#b79cec", avatar: "#e9defd", ink: "#4a307d" },
  green: { border: "#7fb8a4", avatar: "#d6ece3", ink: "#02594e" },
}

// desktop placement (xl): left/top in %, width in %, tilt in degrees
const spots = [
  { left: "2%", top: "3%", width: "37%", rotate: 4, z: 3 },
  { left: "62%", top: "1%", width: "35%", rotate: 5, z: 7 },
  { left: "60%", top: "45%", width: "33%", rotate: -4, z: 6 },
  { left: "20%", top: "62%", width: "38%", rotate: 5, z: 4 },
]

function LinkedInMark() {
  return (
    <span aria-label="LinkedIn recommendation" role="img" className="grid size-6 shrink-0 place-items-center rounded-[5px] bg-[#0a66c2]">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="#fff" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5Z" />
      </svg>
    </span>
  )
}

function RecCard({ r }: { r: Recommendation }) {
  const t = tones[r.tone]
  const initials = r.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
  return (
    <figure className="rounded-[14px] border-[3px] bg-white p-4 shadow-[0_16px_40px_-12px_rgba(2,89,78,0.22)] sm:p-5" style={{ borderColor: t.border }}>
      <figcaption className="flex items-start gap-3">
        {r.photo ? (
          <Image src={r.photo} alt={r.name} width={88} height={88} className="size-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-full text-[15px] font-bold" style={{ background: t.avatar, color: t.ink }}>
            {initials}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-[15px] leading-snug font-semibold text-ink">{r.name}</span>
            {r.status === "sample" && <span className="shrink-0 rounded-full border border-dashed border-[#c9bfae] px-1.5 text-[10px] font-semibold tracking-wide text-soft uppercase">{r.status}</span>}
          </span>
          <span className="block text-[13px] leading-snug text-body">{r.headline}</span>
          <span className="block text-[12px] text-soft">
            {[r.date, r.relation].filter(Boolean).join(" · ")}
          </span>
        </span>
        <LinkedInMark />
      </figcaption>
      <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">{r.text}</blockquote>
    </figure>
  )
}

function Polaroid() {
  return (
    <div className="relative bg-white p-3 pb-10 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.35)]">
      <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-3 bg-[#bfe3d3]/85" />
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image src={profile.photo} alt={profile.name} fill sizes="(min-width: 1280px) 300px, 60vw" className="object-cover object-top" />
      </div>
      <p className="absolute inset-x-0 bottom-2.5 text-center font-hand text-[22px] leading-none font-bold text-ink">the team&apos;s designer</p>
    </div>
  )
}

function StickyNote() {
  return (
    <div className="relative bg-[#fff1a8] px-5 pt-7 pb-6 shadow-[0_14px_28px_-12px_rgba(90,70,0,0.45)]">
      <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-white/70" />
      <p className="font-hand text-[28px] leading-[1] font-bold text-[#4a3a10]">{workingWithMe.note}</p>
    </div>
  )
}

/** One collage piece: absolutely placed and tilted from xl up, a tilted block in the column below. */
function Piece({ spot, mobileRotate, className, children, delay }: { spot?: (typeof spots)[number]; mobileRotate: number; className?: string; children: React.ReactNode; delay: number }) {
  return (
    <div
      className={cn("group/piece w-full max-w-[460px] hover:z-20! xl:absolute xl:top-[var(--t)] xl:left-[var(--l)] xl:w-[var(--w)] xl:max-w-none", className)}
      style={{ ...(spot && { "--l": spot.left, "--t": spot.top, "--w": spot.width, zIndex: spot.z }) } as React.CSSProperties}
    >
      <Reveal delay={delay}>
        <div
          className="transition-[rotate,scale] duration-300 ease-out group-hover/piece:scale-[1.03] group-hover/piece:rotate-0 xl:[rotate:var(--rd)]"
          style={{ rotate: `${mobileRotate}deg`, "--rd": `${spot?.rotate ?? mobileRotate}deg` } as React.CSSProperties}
        >
          {children}
        </div>
      </Reveal>
    </div>
  )
}

export function Testimonials() {
  const recs = workingWithMe.recommendations
  return (
    <Section id="kind-words">
      <div className="mx-auto w-full overflow-hidden rounded-[20px] bg-white/75 p-6 shadow-[0_1px_2px_rgba(16,24,40,0.05)] md:p-10">
        <div className="space-y-4 text-center">
          <h2 className="text-[30px] leading-[1.02] tracking-[-0.02em] text-brand md:text-[60px] md:leading-none">{workingWithMe.title}</h2>
          <p className="text-[18px] leading-[1.35] font-medium text-body md:text-[22px]">{workingWithMe.intro}</p>
        </div>

        <div className="relative mt-10 flex flex-col items-center gap-6 xl:block xl:h-[620px]">
          {recs.map((r, i) => (
            <Piece key={i} spot={spots[i]} mobileRotate={i % 2 ? -1.5 : 1.5} delay={i * 90}>
              <RecCard r={r} />
            </Piece>
          ))}
          {/* photo and sticky note only on the large collage */}
          <Piece spot={{ left: "38.5%", top: "5%", width: "22%", rotate: -7, z: 10 }} mobileRotate={-4} className="hidden xl:block" delay={120}>
            <Polaroid />
          </Piece>
          <Piece spot={{ left: "2%", top: "54%", width: "17%", rotate: -10, z: 2 }} mobileRotate={-4} className="hidden xl:block" delay={240}>
            <StickyNote />
          </Piece>
        </div>
      </div>
    </Section>
  )
}
