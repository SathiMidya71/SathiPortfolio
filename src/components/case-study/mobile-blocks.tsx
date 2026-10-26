import Image from "next/image"
import type { Block, Tone } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"
import { LoopVideo } from "./loop-video"

type PhoneFlowBlock = Extract<Block, { type: "phoneFlow" }>
type IllustrationsBlock = Extract<Block, { type: "illustrations" }>
type VideoBlock = Extract<Block, { type: "video" }>
type HomeBoardBlock = Extract<Block, { type: "homeBoard" }>
type ShowcaseBlock = Extract<Block, { type: "showcase" }>

const tones: Record<Tone, { stroke: string }> = {
  green: { stroke: "var(--tone-green)" },
  purple: { stroke: "var(--tone-purple)" },
  orange: { stroke: "var(--tone-orange)" },
  blue: { stroke: "var(--tone-blue)" },
}

/** A flow of phone screens on a soft tinted stage, with numbered steps. */
export function PhoneFlowView({ block }: { block: PhoneFlowBlock }) {
  const tone = tones[block.tone]
  return (
    <figure>
      <figcaption className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-10">
        <h3 className="shrink-0 text-[22px] leading-tight font-semibold text-ink md:text-2xl">{block.title}</h3>
        <p className="max-w-[460px] text-[15px] leading-relaxed text-body">{block.text}</p>
      </figcaption>
      {/* Horizontal scroll on small screens, centred row on larger ones */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-8 pb-2 sm:mx-0 sm:px-0 md:justify-center md:gap-8 md:overflow-visible">
        {block.screens.map((s, i) => (
          <div
            key={s.image.src}
            className={cn(
              "flex w-[180px] shrink-0 snap-center flex-col items-center gap-3",
              block.screens.length > 3 ? "md:w-[172px]" : "md:w-[200px]"
            )}
          >
            <Image
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.width}
              height={s.image.height}
              sizes="200px"
              className="h-auto w-full drop-shadow-[0_18px_28px_rgba(16,24,40,0.18)]"
            />
            <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <span
                className="grid size-5 place-items-center rounded-full text-[10px] font-bold text-white"
                style={{ background: tone.stroke }}
              >
                {i + 1}
              </span>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </figure>
  )
}

/** Illustration components as a sticker sheet: cut-outs on soft tinted blobs, gently tilted. */
const tilts = ["-3deg", "2.5deg", "-2deg", "3deg", "-2.5deg"]
const blobs = [
  "48% 52% 44% 56% / 55% 45% 55% 45%",
  "56% 44% 52% 48% / 46% 56% 44% 54%",
  "50% 50% 46% 54% / 52% 48% 52% 48%",
  "44% 56% 50% 50% / 50% 44% 56% 50%",
  "53% 47% 55% 45% / 47% 53% 47% 53%",
]

export function IllustrationsView({ block }: { block: IllustrationsBlock }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-6">
      {block.items.map((it, i) => (
        <li
          key={it.name}
          className={cn("group flex flex-col items-center text-center", i < 2 ? "md:col-span-3" : "md:col-span-2", i === 0 && "col-span-2")}
        >
          <div className="relative grid aspect-[5/4] w-full place-items-center">
            <span
              aria-hidden
              className="absolute inset-[6%] transition-transform duration-500 group-hover:scale-105"
              style={{ background: it.background, borderRadius: blobs[i % blobs.length] }}
            />
            <Image
              src={it.image.src}
              alt={it.image.alt}
              width={it.image.width}
              height={it.image.height}
              sizes="(min-width: 768px) 360px, 50vw"
              className="relative h-auto max-h-[86%] w-auto max-w-[82%] object-contain drop-shadow-[0_14px_22px_rgba(16,24,40,0.16)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0!"
              style={{ rotate: tilts[i % tilts.length] }}
            />
          </div>
          <p className="mt-3 text-[15px] font-semibold text-ink">{it.name}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[12px] font-medium text-body ring-1 ring-black/5">
            <span className="size-1.5 rounded-full" style={{ background: "var(--tone-green)" }} />
            {it.usedIn}
          </p>
        </li>
      ))}
    </ul>
  )
}

/** Muted looping video, used for the converted Behance GIFs. */
export function VideoView({ block }: { block: VideoBlock }) {
  return (
    <figure className={cn(block.layout === "phone" ? "mx-auto w-full max-w-[300px]" : "w-full")}>
      <div
        className="overflow-hidden rounded-[22px] ring-1 ring-black/5"
        style={{ background: block.background ?? "#232323" }}
      >
        <LoopVideo
          className="block h-auto w-full"
          src={block.src}
          poster={block.poster}
          width={block.width}
          height={block.height}
          aria-label={block.caption}
        />
      </div>
      {block.caption && <figcaption className="mt-3 text-center text-[15px] font-medium text-soft">{block.caption}</figcaption>}
    </figure>
  )
}

const edgeFade =
  "linear-gradient(to right, transparent, #000 2.4%, #000 97.6%, transparent), linear-gradient(to bottom, transparent, #000 2.8%, #000 97.2%, transparent)"

/** Presentation video with coded label, display word and paragraph, on a matching dark container. */
export function ShowcaseView({ block }: { block: ShowcaseBlock }) {
  const dark = Boolean(block.background)
  return (
    <figure
      className={cn(dark && "overflow-hidden rounded-[24px] px-6 py-10 sm:px-10 md:py-12")}
      style={dark ? { background: block.background } : undefined}
    >
      {block.display ? (
        <>
          <h3 className="sr-only">{block.title}</h3>
          {block.eyebrow && (
            <p className={cn("flex items-center gap-2 text-[15px] font-medium", dark ? "text-white" : "text-ink")}>
              <span aria-hidden className="size-2.5 rounded-full" style={{ background: "#A9D158" }} />
              {block.eyebrow}
            </p>
          )}
          <p
            aria-hidden
            className={cn(
              "mt-1 text-[48px] leading-[0.95] font-normal tracking-[-0.03em] select-none sm:text-[96px] md:text-[120px]",
              dark ? "text-white/[0.08]" : "text-ink/[0.07]"
            )}
          >
            {block.display}
          </p>
        </>
      ) : (
        <h3 className="text-[22px] leading-tight font-semibold text-ink md:text-2xl">{block.title}</h3>
      )}
      <div className="mt-6 grid items-center gap-8 md:grid-cols-[1.6fr_1fr] md:gap-10">
        <LoopVideo
          className="mx-auto block h-auto w-full max-w-[620px]"
          // The video carries a margin of its own background; feathering it hides any small
          // colour shift between how browsers render video and the CSS container colour.
          style={
            dark
              ? {
                  maskImage: edgeFade,
                  WebkitMaskImage: edgeFade,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }
              : undefined
          }
          src={block.video.src}
          poster={block.video.poster}
          width={block.video.width}
          height={block.video.height}
          aria-label={block.video.label}
        />
        <figcaption
          className={cn("flex flex-col gap-4 text-[15px] leading-relaxed md:text-right", dark ? "text-white/75" : "text-body")}
        >
          {block.text.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </figcaption>
      </div>
    </figure>
  )
}

/** Home screen board: phone recording + coded copy on a white card. */
export function HomeBoardView({ block }: { block: HomeBoardBlock }) {
  return (
    <figure className="overflow-hidden rounded-[24px] bg-white px-6 py-10 ring-1 ring-black/5 sm:px-10 md:py-12">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <LoopVideo
          className="mx-auto block h-auto w-full max-w-[340px]"
          src={block.video.src}
          poster={block.video.poster}
          width={block.video.width}
          height={block.video.height}
          aria-label={block.video.label}
        />
        <div className="flex flex-col items-center text-center">
          <h3 className="text-[40px] leading-none font-normal tracking-[-0.03em] text-[#2b2b2b] md:text-[72px]">{block.title}</h3>
          <Image
            src={block.illustration.src}
            alt={block.illustration.alt}
            width={block.illustration.width}
            height={block.illustration.height}
            sizes="220px"
            className="mt-6 h-auto w-[200px] md:w-[220px]"
          />
          <p className="mt-4 text-[24px] leading-tight font-bold tracking-[0.01em] uppercase md:text-[26px]">
            {block.tagline.map((t) => (
              <span key={t.text} style={{ color: t.color }}>
                {t.text}
              </span>
            ))}
          </p>
          <p className="mt-3 max-w-[300px] text-[15px] leading-snug text-[#7a7a7a]">{block.subtitle}</p>
          <p className="mt-5 max-w-[400px] text-[14px] leading-relaxed text-[#3a3a3a]">{block.text}</p>
        </div>
      </div>
    </figure>
  )
}
