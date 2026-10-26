import Image from "next/image"

// Phone layout of a persona: compact header (round portrait beside name and role, facts as two tiles,
// the quote), then goals, frustrations and needs all visible as short lists. No tapping.

type Persona = {
  name: string
  role: string
  goals: string[]
  frustrations: string[]
  about?: string
  facts?: { label: string; value: string }[]
  needs?: string[]
  quote?: string
  photo?: { src: string; alt: string; width: number; height: number }
}

export function PersonaMobile({ p }: { p: Persona }) {
  const groups = [
    { label: "Goals", items: p.goals, tone: "#02594e", tint: "#e4f1eb" },
    { label: "Frustrations", items: p.frustrations, tone: "#9a4a12", tint: "#fdeee0" },
  ]
  return (
    <article className="rounded-[22px] bg-white/60 p-4 ring-1 ring-line">
      <div className="flex items-center gap-3.5">
        {p.photo && (
          <Image src={p.photo.src} alt={p.photo.alt} width={p.photo.width} height={p.photo.height} sizes="72px" className="size-[72px] shrink-0 rounded-full object-cover object-[38%_30%] ring-4 ring-white" />
        )}
        <div className="min-w-0">
          <h4 className="font-heading text-[21px] leading-tight font-semibold text-ink">{p.name}</h4>
          <p className="text-[15px] leading-snug font-medium text-[var(--tone-purple-ink)]">{p.role}</p>
        </div>
      </div>

      {p.facts && (
        <dl className="mt-3.5 grid grid-cols-2 gap-2">
          {p.facts.map((f) => (
            <div key={f.label} className="rounded-[14px] bg-white px-3 py-2">
              <dt className="text-[11px] font-semibold tracking-[0.08em] text-soft uppercase">{f.label}</dt>
              <dd className="text-[15px] font-semibold text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {p.quote && <blockquote className="mt-3.5 rounded-2xl bg-white px-4 py-3 font-heading text-[16px] leading-snug font-semibold text-ink">“{p.quote}”</blockquote>}
      {p.about && <p className="mt-3 text-[15px] leading-relaxed text-body">{p.about}</p>}

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {groups.map((g) => (
          <div key={g.label} className="rounded-[16px] p-3" style={{ background: g.tint }}>
            <p className="text-[12px] font-semibold tracking-[0.08em] uppercase" style={{ color: g.tone }}>
              {g.label}
            </p>
            <ul className="mt-2 grid gap-1.5">
              {g.items.map((item) => (
                <li key={item} className="text-[14px] leading-snug text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {p.needs && (
        <div className="mt-3">
          <p className="text-[12px] font-semibold tracking-[0.08em] text-[var(--tone-purple-ink)] uppercase">Needs</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {p.needs.map((n) => (
              <li key={n} className="rounded-full bg-[#f3eefc] px-3 py-1.5 text-[14px] font-medium text-[#4a307d]">
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
