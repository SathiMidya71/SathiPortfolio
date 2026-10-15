"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Plays a flowchart's build-in once: when it scrolls into view, or as soon as the mouse enters it.
 * Children mark their parts with `data-fl="lane" | "node" | "edge"` and a `--d` delay (see globals.css).
 * Reduced motion shows everything at once.
 */
export function FlowReveal({ className, children }: { className?: string; children: React.ReactNode }) {
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
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn("flow-reveal", className)} data-on={on || undefined} onMouseEnter={() => setOn(true)}>
      {children}
    </div>
  )
}
