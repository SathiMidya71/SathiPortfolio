import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { about, profile } from "@/lib/content"
import { Journal } from "./journal"
import { Reveal } from "./reveal"
import { TornPaper } from "./torn-paper"
import { Section, btnPill, surface } from "./section"

/** About me as an opening journal (below the case studies). */
export function AboutJournal() {
  return (
    <TornPaper className="my-12 py-10 md:my-28 md:py-24">
      <Section id="about" className="mb-0!">
        <p className="mb-8 text-center font-hand text-[34px] leading-none font-bold text-brand md:mb-12 md:text-[44px]">{about.eyebrow}</p>
        <Journal />
      </Section>
    </TornPaper>
  )
}

/** Previous card layout, kept for reference; not rendered. */
export function About() {
  return (
    <Section id="about-card">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Card className={`${surface} h-full p-6 sm:p-10`}>
            <p className="mb-5 text-[19px] leading-[1.3] font-medium text-ink sm:text-2xl">{about.eyebrow}</p>
            <h2 className="mb-6 text-[30px] leading-[1.05] tracking-[-0.8px] text-brand md:text-[48px] md:leading-none md:tracking-[-1.28px] lg:text-[64px]">
              {about.headline[0]}
              <br />
              <span className="text-ink">{about.headline[1]}</span>
            </h2>
            <p className="mb-7 max-w-[560px] text-lg leading-relaxed text-body">{about.body}</p>
            <Button asChild variant="outline" className={`${btnPill} self-start`}>
              <Link href="#contact">
                Learn more about me <ArrowRight />
              </Link>
            </Button>
          </Card>
        </Reveal>
        <Reveal delay={100}>
          <Card className={`${surface} relative h-full min-h-[380px] overflow-hidden`}>
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover object-[center_20%]"
            />
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
