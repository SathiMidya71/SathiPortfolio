import { ImageIcon, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"

// Low-fidelity wireframe pieces for SCINODE pages that are still waiting for content.
// Everything here is deliberately grey and dashed so it reads as "placeholder", not final design.

/** A dashed box saying what will go here. */
export function Placeholder({ label, hint, className, children }: { label: string; hint?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("rounded-[18px] border-2 border-dashed border-[#d6cbb9] bg-white/50 p-5", className)}>
      <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] text-[#5b4fd1] uppercase">
        <span className="rounded-full bg-[#ece9fd] px-2 py-0.5">Placeholder</span>
        {label}
      </p>
      {hint && <p className="mt-2 text-[14.5px] leading-snug text-soft">{hint}</p>}
      {children}
    </div>
  )
}

/** Grey bars standing in for paragraphs. */
export function Lines({ n = 3, className }: { n?: number; className?: string }) {
  const widths = ["100%", "94%", "88%", "97%", "72%", "90%"]
  return (
    <div className={cn("mt-4 grid gap-2.5", className)} aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="h-2.5 rounded-full bg-[#e9e2d6]" style={{ width: i === n - 1 ? "60%" : widths[i % widths.length] }} />
      ))}
    </div>
  )
}

/** A crossed image frame. */
export function ImageBox({ label = "Image", ratio = "16 / 9", className }: { label?: string; ratio?: string; className?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-[14px] bg-[#efe9df]", className)} style={{ aspectRatio: ratio }}>
      <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,0 L100,100 M100,0 L0,100" stroke="#ddd3c3" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="relative flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[12.5px] font-medium text-soft">
        <ImageIcon className="size-3.5" aria-hidden /> {label}
      </span>
    </div>
  )
}

/** Generic flow skeleton: n boxes joined by arrows. */
export function FlowSkeleton({ n = 5, label = "Module workflow (to come)" }: { n?: number; label?: string }) {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="grid h-12 w-28 place-items-center rounded-[10px] border-2 border-dashed border-[#d6cbb9] bg-white text-[12px] text-soft">Step {i + 1}</span>
            {i < n - 1 && <span className="text-soft">→</span>}
          </span>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[13px] text-soft">
        <Workflow className="size-4" aria-hidden /> {label}
      </p>
    </div>
  )
}

/** Numbered section wrapper used on the SCINODE pages. */
export function WireSection({ id, n, eyebrow, title, children }: { id: string; n: number; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-20 scroll-mt-28 border-t border-line pt-14 md:mt-24">
      <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">
        {String(n).padStart(2, "0")} · {eyebrow}
      </p>
      <h2 className="mt-3 max-w-[760px] text-[32px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">{title}</h2>
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-7">{children}</div>
    </section>
  )
}
