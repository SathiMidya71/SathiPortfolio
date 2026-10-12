import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, ChevronRight } from "lucide-react"
import { BlockView } from "@/components/case-study/blocks"
import { Toc } from "@/components/case-study/toc"
import { ModuleMap, OneSignup, ProjectTypes, ProposalTracker, Upcoming, VerificationStepper, Workspace } from "@/components/scinode/researcher/diagrams"
import { JourneyView, PersonaView, ProfileFields, UserProvider, UserSwitch, UserTag } from "@/components/scinode/researcher/user-switch"
import { ImageBox, WireSection } from "@/components/scinode/wire"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { decisions, glance, highlights, meta, problem } from "@/lib/scinode-researcher"

// Scinode for Researchers: ONE case study for the researcher sign-up and its two user types (CRO and
// scientist), with a CRO / Scientist switch that changes the persona, journey and profile fields.
// Content is drawn from the PM's product brief and the product deck (see scinode-researcher.ts).

export const metadata: Metadata = {
  title: "Scinode for Researchers | CRO & Scientist Case Study | Sathi Midya",
  description:
    "UX case study: designing Scinode for Researchers, one sign-up for CROs and scientists covering profile, verification, project discovery, proposals and project management.",
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const label = "mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "users", label: "Users" },
  { id: "journey", label: "User journey" },
  { id: "modules", label: "What I designed" },
  { id: "decisions", label: "Key decisions" },
  { id: "screens", label: "Key screens" },
  { id: "next", label: "What's next" },
]

const visuals = [<OneSignup key="1" />, <ProfileFields key="2" />, <VerificationStepper key="3" />, <ProjectTypes key="4" />, <ProposalTracker key="5" />, <Workspace key="6" />]

const screens = ["Sign up and profile", "Verification status", "Opportunities: open and exclusive", "Proposal form", "Proposal tracker", "Project workspace"]

export default function ResearcherPage() {
  return (
    <UserProvider>
      <SiteHeader />
      <main style={{ "--tone-purple": "#B79CEC", "--tone-purple-ink": "#6B4CB8", "--accent-purple": "#F1EBFC", "--on-purple": "#2B2150", "--tone-orange": "#1F392D" } as React.CSSProperties}>
        <header className={`${shell} pt-6 md:pt-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-body">
            <Link href="/work/scinode#map" className="inline-flex items-center gap-1.5 hover:text-brand">
              <ArrowLeft className="size-4" /> SCINODE
            </Link>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span>Supplier portal</span>
            <ChevronRight className="size-3.5 text-soft" aria-hidden />
            <span className="text-ink">Researcher sign-up</span>
          </nav>
          <Image src="/case-studies/scinode/logo-researchers.png" alt="Scinode for Researchers by Scimplify" width={800} height={249} className="mt-10 h-14 w-auto" priority />
          <h1 className="mt-6 text-[42px] leading-[0.98] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[80px] lg:leading-none">
            {meta.title}
            <br />
            <span className="mt-3 block text-[0.55em] leading-tight text-ink/80">{meta.subtitle}</span>
          </h1>
          <dl className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-[minmax(0,420px)_1fr_1fr_1fr] lg:gap-10">
            <div>
              <dt className={label}>Overview</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{meta.overview}</dd>
            </div>
            <div>
              <dt className={label}>My role</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{meta.role}</dd>
            </div>
            <div>
              <dt className={label}>Team</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#ece9fd] px-1 text-[#5b4fd1]">Placeholder</span> PM, engineering
              </dd>
            </div>
            <div>
              <dt className={label}>Timeline</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">
                <span className="rounded bg-[#ece9fd] px-1 text-[#5b4fd1]">Placeholder</span> Year · duration
              </dd>
            </div>
          </dl>
          <div className="mt-10">
            <UserSwitch />
          </div>
        </header>

        <div className={`${shell} mt-10`}>
          <ImageBox label="Hero image: Scinode for Researchers" ratio="16 / 8" />
        </div>

        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20`}>
          <aside className="hidden lg:block">
            <Toc items={sections} />
          </aside>
          <article className="min-w-0">
            <WireSection id="overview" n={1} eyebrow="Overview" title="Designing one sign-up for two kinds of researchers">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
                {glance.map((g) => (
                  <li key={g.label}>
                    <p className="font-heading text-[44px] leading-none font-semibold text-brand md:text-[52px]">{g.value}</p>
                    <p className="mt-2 text-[14.5px] text-body">{g.label}</p>
                  </li>
                ))}
              </ul>
              <div>
                <h3 className="text-[13px] font-semibold tracking-[0.12em] text-soft uppercase">Highlights</h3>
                <ul className="mt-4 grid gap-3.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[16.5px] leading-snug text-ink">
                      <Check className="mt-0.5 size-5 shrink-0 text-brand" strokeWidth={2.4} aria-hidden />
                      <span>
                        {h.split("[metric needed]").map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="rounded bg-[#ece9fd] px-1 text-[0.9em] font-semibold text-[#5b4fd1]">[metric needed]</span>}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </WireSection>

            <WireSection id="problem" n={2} eyebrow="The problem" title="Good science, lost between emails, PDFs and calls">
              <BlockView block={problem} />
            </WireSection>

            <WireSection id="users" n={3} eyebrow="Users" title="Two user types, one sign-up">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-[620px] text-[17px] leading-relaxed text-body">
                  Researchers sign up as a CRO or as an independent scientist. They share one flow, but bring different things and need different things from it.
                </p>
                <UserTag />
              </div>
              <PersonaView />
            </WireSection>

            <WireSection id="journey" n={4} eyebrow="User journey" title="From sign-up to a reported project, in 8 stages">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-[620px] text-[17px] leading-relaxed text-body">One shared lifecycle. Switch between CRO and scientist to see what each user does at every stage.</p>
                <UserTag />
              </div>
              <JourneyView />
            </WireSection>

            <WireSection id="modules" n={5} eyebrow="What I designed" title="Four modules, end to end">
              <ModuleMap />
            </WireSection>

            <WireSection id="decisions" n={6} eyebrow="Key decisions" title="Six decisions that shaped the experience">
              <div className="grid gap-16 md:gap-20">
                {decisions.map((d, i) => (
                  <div key={d.title} className="grid gap-8">
                    <div className="grid gap-x-10 gap-y-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
                      <div>
                        <p className="font-heading text-[44px] leading-none font-semibold text-brand/15">{String(i + 1).padStart(2, "0")}</p>
                        <h3 className="mt-2 font-heading text-[26px] leading-tight font-semibold text-ink md:text-[30px]">{d.title}</h3>
                        <p className="mt-3 text-[16px] leading-relaxed text-body">{d.text}</p>
                      </div>
                      <ul className="grid content-end gap-2">
                        {d.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-[15px] leading-snug text-ink">
                            <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.4} aria-hidden /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-dashed border-[#d6cbb9] pt-8">{visuals[i]}</div>
                  </div>
                ))}
              </div>
            </WireSection>

            <WireSection id="screens" n={7} eyebrow="Key screens" title="Key screens">
              <p className="text-[17px] text-body">Screens to come. Each slot shows the screen that will go here.</p>
              <div className="grid gap-5 md:grid-cols-2">
                {screens.map((s) => (
                  <ImageBox key={s} label={s} ratio="16 / 10" />
                ))}
              </div>
            </WireSection>

            <WireSection id="next" n={8} eyebrow="What's next" title="Coming next for researchers">
              <Upcoming />
            </WireSection>

            <section className="mt-20 border-t border-line pt-14">
              <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">More from SCINODE</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { name: "Manufacturer", kind: "Supplier portal", href: "/work/scinode/manufacturer" },
                  { name: "CVP", kind: "Customer portal", href: "/work/scinode/cvp" },
                  { name: "Ecosystem map", kind: "SCINODE", href: "/work/scinode#map" },
                ].map((o) => (
                  <Link key={o.name} href={o.href} className="group rounded-[16px] border border-line bg-white p-4 transition-transform hover:-translate-y-0.5">
                    <span className="text-[11px] font-bold tracking-[0.12em] text-soft uppercase">{o.kind}</span>
                    <span className="mt-1 flex items-start justify-between gap-2 text-[17px] font-semibold text-ink">
                      {o.name}
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </UserProvider>
  )
}
