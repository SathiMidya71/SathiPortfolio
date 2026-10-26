import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { profile } from "@/lib/content"
import { CopyEmailButton } from "./copy-email-button"
import { Reveal } from "./reveal"
import { Section, btnPill, surface } from "./section"

export function Contact() {
  const links = [
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "Behance", href: profile.links.behance },
    { label: "Resume", href: profile.resume },
  ]
  return (
    <Section id="contact">
      <Reveal>
        <Card className={`${surface} items-center px-6 py-10 text-center sm:px-10 sm:py-14`}>
          <p className="text-[19px] font-medium text-ink sm:text-2xl">Let&apos;s work together</p>
          <h2 className="mt-4 mb-4 text-[30px] leading-[1.05] tracking-[-0.8px] text-brand md:text-[48px] md:leading-none md:tracking-[-1.28px] lg:text-[64px]">
            Have a product problem worth solving?
          </h2>
          <p className="mx-auto mb-7 max-w-[520px] text-lg text-body">
            I&apos;m open to Product Designer roles and collaborations. Let&apos;s talk about how research-led design can
            move your metrics.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CopyEmailButton />
            {links.map((l) => (
              <Button key={l.label} asChild variant="outline" className={btnPill}>
                <a href={l.href} target="_blank" rel="noopener">
                  {l.label}
                </a>
              </Button>
            ))}
          </div>
        </Card>
      </Reveal>
    </Section>
  )
}
