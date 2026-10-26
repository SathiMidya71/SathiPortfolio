import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import type { WorkCard } from "@/lib/case-studies/types"
import { profile } from "@/lib/content"

// Brand marks in their official colours
function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#1769FF" />
      <g transform="translate(2.4 2.4) scale(0.8)" fill="#fff">
        <path d="M8.2 11.3c.9-.4 1.4-1.1 1.4-2.1C9.6 7.3 8.2 6.5 6.4 6.5H1.5v11h5.1c1.9 0 3.6-.9 3.6-3 0-1.3-.6-2.2-2-2.2Zm-4.4-2.9h2.1c.8 0 1.5.2 1.5 1.1 0 .8-.6 1.1-1.3 1.1H3.8V8.4Zm2.3 7.1H3.8v-2.6h2.4c.9 0 1.6.4 1.6 1.4s-.8 1.2-1.7 1.2Zm11.3-6.3c-2.4 0-4 1.8-4 4.2 0 2.5 1.5 4.2 4 4.2 1.9 0 3.1-.9 3.7-2.7h-1.9c-.2.7-1 1-1.7 1-1.3 0-2-.8-2-2.1h5.7c.1-2.6-1.3-4.6-3.8-4.6Zm-1.9 3.3c.1-1.1.8-1.7 1.8-1.7 1.1 0 1.6.6 1.7 1.7h-3.5Zm-.6-5.6h4.4v1.1h-4.4V6.6Z" />
      </g>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.1 9.6v8.1H4.6V9.6h2.5ZM5.85 5.5a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9ZM9.6 9.6H12v1.1h.03c.34-.64 1.15-1.3 2.37-1.3 2.53 0 3 1.67 3 3.83v4.47h-2.5v-3.96c0-.95-.02-2.16-1.32-2.16-1.32 0-1.52 1.03-1.52 2.1v4.02H9.6V9.6Z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  )
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#4285F4" d="M2 18.5V6.8l4 3v9.7H3.5A1.5 1.5 0 0 1 2 18.5Z" />
      <path fill="#34A853" d="M18 19.5V9.8l4-3v11.7a1.5 1.5 0 0 1-1.5 1.5H18Z" />
      <path fill="#FBBC04" d="M18 9.8V5l1.6-1.2A1.5 1.5 0 0 1 22 5v1.8l-4 3Z" />
      <path fill="#EA4335" d="M6 9.8V5l6 4.5L18 5v4.8l-6 4.5-6-4.5Z" />
      <path fill="#C5221F" d="M2 6.8V5a1.5 1.5 0 0 1 2.4-1.2L6 5v4.8l-4-3Z" />
    </svg>
  )
}

export function MoreWork({ heading, items }: { heading: string; items: WorkCard[] }) {
  const socials = [
    { label: "Behance", href: profile.links.behance, icon: <BehanceIcon /> },
    { label: "LinkedIn", href: profile.links.linkedin, icon: <LinkedInIcon /> },
    { label: "Instagram", href: profile.links.instagram, icon: <InstagramIcon /> },
    { label: profile.email, href: `mailto:${profile.email}`, icon: <GmailIcon /> },
  ].filter((s) => s.href)

  return (
    <section className="mt-14 border-t border-line pt-10 md:mt-24 md:pt-14" aria-labelledby="more-work">
      <h2 id="more-work" className="text-[26px] leading-tight tracking-[-0.02em] text-ink md:text-[40px]">
        {heading}
      </h2>

      {items.length > 0 && (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((w) => (
            <li key={w.href}>
              <Link
                href={w.href}
                {...(w.external ? { target: "_blank", rel: "noopener" } : {})}
                className="group block rounded-[20px] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                <div className="relative aspect-[808/632] overflow-hidden rounded-[20px] bg-sand ring-1 ring-black/5">
                  <Image
                    src={w.thumbnail.src}
                    alt={w.thumbnail.alt}
                    fill
                    sizes="(min-width: 1200px) 420px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
                <p className="mt-4 text-[13px] font-medium text-soft">{w.meta}</p>
                <h3 className="mt-1 text-xl leading-snug text-ink transition-colors group-hover:text-[var(--tone-purple)]">
                  {w.title}
                  {w.external && <span className="sr-only"> (opens Behance in a new tab)</span>}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">{w.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Contact banner */}
      <div
        className="relative mt-14 overflow-hidden rounded-[28px] px-6 py-10 sm:px-10 md:py-12"
        style={{ background: "linear-gradient(120deg, #eeecfd 0%, #e6f2fe 55%, #fdeee0 100%)" }}
      >
        {/* soft decorative orbs */}
        <span aria-hidden className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-[var(--tone-purple)]/15 blur-2xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-20 left-1/3 size-48 rounded-full bg-[var(--tone-blue)]/15 blur-2xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[460px]">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--tone-purple)] uppercase">Let&apos;s talk</p>
            <p className="mt-3 font-heading text-[24px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink md:text-[34px] md:leading-[1.1]">
              Let&apos;s design something people can rely on.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-body">
              Open to Product Designer roles and collaborations. See more of my work or say hello.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                  className="group/pill inline-flex h-11 items-center gap-2.5 rounded-full bg-white/85 pr-5 pl-2.5 text-sm font-medium text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-black/5 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tone-purple)] hover:text-white hover:shadow-[0_8px_20px_rgba(110,98,229,0.35)] hover:ring-transparent focus-visible:ring-2 focus-visible:ring-[var(--tone-purple)] focus-visible:outline-none"
                >
                  <span className="grid size-7 place-items-center rounded-full bg-white">{s.icon}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link href="/#work" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-[var(--tone-purple)]">
        <ArrowLeft className="size-4" aria-hidden /> Back to all work
      </Link>
    </section>
  )
}
