// SCINODE: an R&D opportunity platform with three connected portals. This is a separate
// platform from SCINODE Deep Research (which keeps its own case study).
// The ecosystem copy below is Sathi's own wording. Everything marked TBC is a placeholder:
// the pages are low-fidelity wireframes until she sends the real content, screens and flows.

export type PortalKey = "customer" | "admin" | "supplier" | "internal"

export type Step = { n: string; title: string; text: string; portal: PortalKey | "execution" }

export const ecosystem = {
  title: "Platform Ecosystem",
  intro: "Scinode is not one app. It is three connected portals that move an R&D need from first request to a delivered project.",
  journey: ["Customer demand", "Business orchestration", "Supplier matching", "Project execution", "Delivery"],
  portals: [
    { key: "customer", side: "Customer side", name: "Customer Portal", text: "Turn scientific and manufacturing needs into actionable opportunities." },
    { key: "admin", side: "Business & admin side", name: "Business & Admin Portal", text: "Orchestrate opportunities, manage collaboration and drive them towards execution." },
    { key: "supplier", side: "Supplier side", name: "Supplier Portal", text: "Connect demand with the right scientific expertise and execution capabilities." },
  ] as { key: PortalKey; side: string; name: string; text: string }[],
  steps: [
    { n: "01", portal: "customer", title: "Create an opportunity", text: "Customers share their R&D challenges, scientific requirements or manufacturing needs to start a collaboration." },
    { n: "02", portal: "admin", title: "Orchestrate opportunities", text: "Structure incoming demand, assess requirements and define the path from business need to execution." },
    { n: "03", portal: "admin", title: "Manage collaboration", text: "Coordinate discussions, align customer expectations with supplier capabilities, and move opportunities towards agreement." },
    { n: "04", portal: "supplier", title: "Match demand to capabilities", text: "Identify and engage the right researchers, CROs and manufacturers by expertise, capacity and project needs." },
    { n: "05", portal: "supplier", title: "Propose & commit", text: "Suppliers evaluate opportunities, submit proposals, and align on scope, timelines and deliverables." },
    { n: "06", portal: "execution", title: "Initiate & track execution", text: "Convert agreed opportunities into active projects, track progress, and keep continuity from first discussion to delivery." },
  ] as Step[],
  values: [
    { title: "Integrated R&D ecosystem", text: "Connect customers, scientific expertise and manufacturing capabilities through one platform." },
    { title: "End-to-end opportunity orchestration", text: "Structure demand, coordinate stakeholders, and move opportunities from first requirements to committed projects." },
    { title: "Continuity from demand to delivery", text: "Bridge the gap between finding the right partner and running real-world R&D and manufacturing projects." },
  ],
}

export const portalNames: Record<PortalKey, string> = {
  customer: "Customer portal",
  admin: "Business & admin portal",
  supplier: "Supplier portal",
  internal: "Internal tools",
}

// ---------------- hierarchy: SCINODE → portal → area (user type) → modules ----------------
// Sathi designed the customer-side CVP and the WHOLE supplier side (Manufacturer, CRO, Scientist).
// The business & admin portal was designed by teammates (shown for context only).
// Everything marked tbc is a placeholder until she sends content.

export type AreaModule = { slug: string; name: string; summary: string; tbc?: boolean }

export type Area = {
  slug: string
  name: string
  portal: PortalKey
  /** who this area is for (one line) */
  audience: string
  /** ecosystem steps this area covers */
  steps: string[]
  /** supplier sign-up track the area belongs to (suppliers sign up as a manufacturer or as a researcher) */
  track?: "manufacturer" | "researcher"
  /** what kind of thing it is, shown on its card */
  kind: string
  modules: AreaModule[]
  tbc?: boolean
}

export const areas: Area[] = [
  {
    slug: "cvp",
    name: "CVP",
    portal: "customer",
    kind: "Customer module",
    audience: "Placeholder: customers who raise R&D and manufacturing needs.",
    steps: ["01"],
    modules: [{ slug: "overview", name: "CVP modules", summary: "Placeholder: the CVP modules and flows.", tbc: true }],
    tbc: true,
  },
  {
    slug: "manufacturer",
    name: "Manufacturer",
    portal: "supplier",
    track: "manufacturer",
    kind: "Manufacturer portal",
    audience: "Manufacturers who take on scale-up and production work.",
    steps: ["04", "05", "06"],
    modules: [{ slug: "modules", name: "Manufacturer modules", summary: "Placeholder: modules and flows for manufacturers.", tbc: true }],
    tbc: true,
  },
  {
    slug: "cro",
    name: "CRO",
    portal: "supplier",
    track: "researcher",
    kind: "Researcher · CRO",
    audience: "Contract research organisations that run R&D projects for customers.",
    steps: ["04", "05", "06"],
    modules: [
      { slug: "opportunity", name: "Opportunity module", summary: "Placeholder: how a CRO finds and reviews matched opportunities.", tbc: true },
      { slug: "proposal", name: "Proposal module", summary: "Placeholder: how a CRO prepares and sends a proposal.", tbc: true },
      {
        slug: "project-management",
        name: "Internal project management",
        summary: "Placeholder: how a CRO tracks its projects by adding experiments and batch experiments.",
        tbc: true,
      },
    ],
  },
  {
    slug: "scientist",
    name: "Scientist",
    portal: "supplier",
    track: "researcher",
    kind: "Researcher · Scientist",
    audience: "Independent researchers who take on scientific work.",
    steps: ["04", "05", "06"],
    modules: [{ slug: "modules", name: "Scientist modules", summary: "Placeholder: modules and flows for scientists.", tbc: true }],
    tbc: true,
  },
]

/** Supplier sign-up tracks: a supplier signs up either as a manufacturer or as a researcher (CRO or scientist). */
export const supplierTracks = [
  { key: "manufacturer", name: "Manufacturer sign-up" },
  { key: "researcher", name: "Researcher sign-up" },
] as const

/** Customer portal modules designed by teammates (context only). Placeholder until Sathi names them. */
export const customerTeamModules = "Other customer modules"

export const getArea = (slug: string) => areas.find((a) => a.slug === slug)
export const getAreaModule = (area: string, mod: string) => getArea(area)?.modules.find((m) => m.slug === mod)

/** Steps covered by Sathi's work (customer CVP + supplier side), lit on the journey diagram. */
export const litSteps = ["01", "04", "05"]
