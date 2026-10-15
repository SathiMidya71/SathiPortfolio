"use client"

import { useEffect, useRef, useState } from "react"
import { DemoVideo } from "@/components/case-study/deep-research/demo-video"
import { cn } from "@/lib/utils"

/**
 * A big, click-to-play walkthrough film on a 3D stage: it waits tilted back in perspective and
 * settles flat as it scrolls into view, framed by a white bezel with a layered, deep shadow and a
 * soft floor shadow. Never autoplays (DemoVideo plays on click and pauses when scrolled away).
 */
export function FilmStage(props: { src: string; poster: string; width: number; height: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOn(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative [perspective:2200px]">
      {/* floor shadow */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-[8%] -bottom-10 h-16 rounded-[50%] bg-[#1F392D]/25 blur-2xl transition-opacity duration-1000",
          on ? "opacity-100" : "opacity-40"
        )}
      />
      <div
        className={cn(
          "relative origin-bottom rounded-[22px] bg-white p-1.5 ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-[30px] sm:p-2.5",
          "shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_16px_-4px_rgba(16,24,40,0.10),0_30px_60px_-12px_rgba(16,24,40,0.22),0_70px_120px_-30px_rgba(31,57,45,0.38)]",
          on ? "[transform:none]" : "[transform:rotateX(16deg)_scale(0.94)_translateY(24px)]"
        )}
      >
        <div className="overflow-hidden rounded-[16px] sm:rounded-[22px]">
          <DemoVideo {...props} cta="walkthrough" placement="bottom" />
        </div>
      </div>
    </div>
  )
}
