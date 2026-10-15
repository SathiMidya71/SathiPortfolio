"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/** Sticky "On this page" nav that highlights the section currently in view. */
export function Toc({ items, before }: { items: { id: string; label: string }[]; before?: React.ReactNode }) {
  const [active, setActive] = useState(items[0]?.id)
  const box = useRef<HTMLDivElement>(null)

  // On long pages the sidebar scrolls: keep the active item in view without moving the page
  useEffect(() => {
    const c = box.current
    const a = c?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!c || !a || c.scrollHeight <= c.clientHeight) return
    const top = a.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop
    if (top < c.scrollTop + 40 || top > c.scrollTop + c.clientHeight - 60) c.scrollTo({ top: top - c.clientHeight / 2, behavior: "smooth" })
  }, [active])

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    els.forEach((el) => io.observe(el))
    // Past the last section (e.g. "More work"), keep the last item active
    const onScroll = () => {
      const last = els[els.length - 1]
      if (last && last.getBoundingClientRect().bottom < window.innerHeight * 0.3) setActive(last.id)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [items])

  return (
    <div ref={box} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
      {before}
      <nav aria-label="On this page">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">On this page</p>
        <ul className="grid gap-1 border-l border-line">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 text-[15px] transition-colors",
                  active === item.id ? "border-brand font-semibold text-brand" : "border-transparent text-body hover:text-ink"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
