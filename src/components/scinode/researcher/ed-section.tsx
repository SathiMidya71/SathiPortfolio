import { serif } from "@/components/scinode/researcher/fonts"
import { cn } from "@/lib/utils"

// Editorial section (Sathi's style reference): italic serif "[0n]" index on the left, a small label and a
// light title whose second part is italic serif on the right, then the content (in the column beside the TOC).

export function EdHead({ n, label, title }: { n: number; label: string; title: readonly [string, string] }) {
  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,4fr)] md:items-start">
      <p className={cn(serif.className, "pt-6 text-[40px] leading-none text-ink/60 italic md:text-[48px]")}>[{String(n).padStart(2, "0")}]</p>
      <div>
        <p className="text-[16px] text-soft">{label}</p>
        <h2 className="mt-1 font-sans text-[34px] leading-[1.1] font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[40px] xl:text-[44px]">
          {title[0]} <span className={cn(serif.className, "text-ink/60 italic")}>{title[1]}</span>
        </h2>
      </div>
    </div>
  )
}

export function EdSection({ id, n, label, title, children }: { id: string; n: number; label: string; title: readonly [string, string]; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-24 lg:pt-32">
      <EdHead n={n} label={label} title={title} />
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 md:mt-16">{children}</div>
    </section>
  )
}
