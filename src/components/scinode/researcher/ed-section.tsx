import { serif } from "@/components/scinode/researcher/fonts"
import { cn } from "@/lib/utils"

// Editorial section (Sathi's style reference, without the "[0n]" index at her request): a small label and a
// light title whose second part is italic serif, then the content (in the column beside the TOC).

export function EdHead({ label, title }: { label: string; title: readonly [string, string] }) {
  return (
    <div>
      <div>
        <p className="text-[16px] text-soft">{label}</p>
        <h2 className="mt-1 font-sans text-[34px] leading-[1.1] font-normal tracking-[-0.02em] text-[#1d1d1f] md:text-[40px] xl:text-[44px]">
          {title[0]} <span className={cn(serif.className, "text-ink/60 italic")}>{title[1]}</span>
        </h2>
      </div>
    </div>
  )
}

export function EdSection({ id, label, title, children }: { id: string; n?: number; label: string; title: readonly [string, string]; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-24 lg:pt-32">
      <EdHead label={label} title={title} />
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 md:mt-16">{children}</div>
    </section>
  )
}
