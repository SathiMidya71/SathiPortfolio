"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type GalleryScreen = { src: string; title: string; caption: string }

/**
 * One big screen with a row of thumbnails underneath. It moves to the next screen every `interval`
 * ms; the progress bar on the active thumbnail drives the timing (CSS animation), so hovering the big
 * screen freezes it mid-way and leaving resumes from there. Also pauses while off screen or when the
 * tab is hidden. Reduced motion: no auto-rotate, thumbnails still work.
 */
export function ScreenGallery({
  screens,
  width,
  height,
  interval = 4500,
}: {
  screens: readonly GalleryScreen[]
  width: number
  height: number
  interval?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const [still, setStill] = useState(false)

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    const onVis = () => setVisible(!document.hidden && el.getBoundingClientRect().top < window.innerHeight)
    document.addEventListener("visibilitychange", onVis)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  const running = visible && !hover && !still
  const next = () => setI((n) => (n + 1) % screens.length)
  const s = screens[i]

  return (
    <div ref={ref} className="grid gap-5">
      {/* Big screen: hover pauses the rotation */}
      <figure
        className="relative overflow-hidden rounded-[18px] bg-white ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(16,24,40,0.06),0_12px_28px_-8px_rgba(16,24,40,0.14),0_40px_80px_-24px_rgba(31,57,45,0.28)]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-roledescription="carousel"
        aria-label="Project management screens"
      >
        <div className="relative" style={{ aspectRatio: `${width} / ${height}` }}>
          {screens.map((x, k) => (
            <Image
              key={x.src}
              src={x.src}
              alt={`${x.title}: ${x.caption}`}
              fill
              sizes="(min-width: 1200px) 880px, 100vw"
              priority={k === 0}
              className={cn("object-cover object-top transition-opacity duration-700 ease-out", k === i ? "opacity-100" : "opacity-0")}
              aria-hidden={k !== i}
            />
          ))}
          {hover && !still && (
            <span className="absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px] font-semibold text-white backdrop-blur">Paused</span>
          )}
        </div>
      </figure>

      {/* Title and caption of the current screen */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1" aria-live="polite">
        <p className="text-[17px] text-ink">
          <span className="font-semibold">{s.title}</span>
          <span className="text-body"> · {s.caption}</span>
        </p>
        <p className="font-heading text-[14px] font-semibold text-soft tabular-nums">
          {String(i + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </p>
      </div>

      {/* Thumbnails: click to jump; the active one carries the progress bar */}
      <ol className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-10 sm:overflow-visible sm:px-0 sm:pb-0">
        {screens.map((x, k) => (
          <li key={x.src} className="w-[84px] shrink-0 snap-start sm:w-auto">
            <button
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show ${x.title}`}
              title={`${String(k + 1).padStart(2, "0")} ${x.title}`}
              aria-current={k === i ? "true" : undefined}
              className={cn(
                "group relative block w-full overflow-hidden rounded-[7px] bg-white text-left ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                k === i ? "ring-2 ring-brand" : "opacity-70 ring-black/[0.08] hover:opacity-100"
              )}
            >
              <span className="relative block" style={{ aspectRatio: `${width} / ${height}` }}>
                <Image src={x.src} alt="" fill sizes="96px" className="object-cover object-top" />
              </span>
              {k === i && !still && (
                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/70">
                  <span
                    key={i}
                    className="block h-full origin-left bg-brand"
                    style={{ animation: `gal-progress ${interval}ms linear forwards`, animationPlayState: running ? "running" : "paused" }}
                    onAnimationEnd={next}
                  />
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
