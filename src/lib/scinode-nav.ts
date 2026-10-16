import { areas } from "@/lib/scinode"
import { modules as researcherModules } from "@/lib/scinode-researcher"

// Wayfinding for the SCINODE case study: Work → SCINODE (ecosystem) → platform → module.
// One map of every page, so each page can show where the reader is and what else to explore.

export type NavModule = { slug: string; title: string; summary: string; href: string; tbc?: boolean }
export type NavPlatform = { key: string; name: string; kind: string; href: string; modules: NavModule[]; tbc?: boolean }

export const scinodeHome = { name: "SCINODE", href: "/work/scinode", platformsHref: "/work/scinode#my-work" }

const areaPlatform = (slug: string, name: string): NavPlatform => {
  const a = areas.find((x) => x.slug === slug)!
  return {
    key: slug,
    name,
    kind: a.portal === "customer" ? "Customer portal" : "Supplier portal",
    href: `/work/scinode/${slug}`,
    tbc: a.tbc,
    modules: a.modules.map((m) => ({ slug: m.slug, title: m.name, summary: m.summary, href: `/work/scinode/${slug}/${m.slug}`, tbc: m.tbc })),
  }
}

/** The platforms Sathi designed, in the order of the SCINODE page's "Explore what I designed" cards. */
export const platforms: NavPlatform[] = [
  areaPlatform("cvp", "CVP"),
  areaPlatform("manufacturer", "Scinode for Manufacturers"),
  {
    key: "researcher",
    name: "Scinode for Researchers",
    kind: "Supplier portal",
    href: "/work/scinode/researcher",
    modules: researcherModules.map((m) => ({ slug: m.slug, title: m.title, summary: m.tagline, href: `/work/scinode/researcher/${m.slug}` })),
  },
]

/** CRO and scientist pages belong to the researcher platform. */
const platformOf: Record<string, string> = { cro: "researcher", scientist: "researcher" }
export const getPlatform = (key: string) => platforms.find((p) => p.key === (platformOf[key] ?? key))
