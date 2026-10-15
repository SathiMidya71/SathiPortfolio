"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Product demo that plays only when clicked (no autoplay). Shows the poster with a large play
 * button; clicking the video toggles play/pause. It pauses itself when scrolled out of view.
 * Nothing loads until the first click.
 */
export function DemoVideo({
  src,
  poster,
  width,
  height,
  label,
  cta = "demo",
  placement = "center",
}: {
  src: string
  poster?: string
  width: number
  height: number
  label: string
  /** Word on the play button: "Play demo", "Play walkthrough"… */
  cta?: string
  /** Where the play button sits while paused; "bottom" keeps a title card on the poster readable */
  placement?: "center" | "bottom"
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    setStarted(true)
    if (v.paused) void v.play().catch(() => {})
    else v.pause()
  }

  return (
    <div className="group relative">
      <video
        ref={ref}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="block h-auto w-full cursor-pointer"
      >
        {/* H.264 first; a VP9 copy sits beside each clip for browsers without H.264 */}
        <source src={src} type="video/mp4" />
        <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      </video>

      {/* Large play button while paused */}
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play ${cta}: ${label}`}
          className={cn("absolute inset-0 grid bg-black/10", placement === "bottom" ? "place-items-end justify-center pb-[6%]" : "place-items-center", "transition-colors hover:bg-black/20 focus-visible:outline-none")}
        >
          <span className="flex items-center gap-2.5 rounded-full bg-[#1f392d] py-3 pr-6 pl-4 text-[15px] font-semibold text-white shadow-[0_12px_32px_-8px_rgba(31,57,45,0.6)] ring-4 ring-white/70 transition-transform group-hover:scale-105 group-focus-within:ring-white">
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#1f392d]">
              <Play className="size-4 translate-x-px fill-current" aria-hidden />
            </span>
            {started ? `Resume ${cta}` : `Play ${cta}`}
          </span>
        </button>
      )}

      {/* Small pause control while playing */}
      {playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Pause demo"
          className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <Pause className="size-4" aria-hidden />
        </button>
      )}
    </div>
  )
}
