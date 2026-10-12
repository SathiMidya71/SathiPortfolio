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

export type ScinodeModule = {
  slug: string
  name: string
  portal: PortalKey
  /** Ecosystem steps this module covers (lights them up). TBC: placement to be confirmed by Sathi. */
  steps: string[]
  summary: string
  /** true until Sathi confirms what the module is called and where it sits */
  tbc?: boolean
}

// Modules Sathi designed end to end. Names, portals and steps are her first notes; marked TBC.
export const scinodeModules: ScinodeModule[] = [
  { slug: "cvp", name: "CVP", portal: "customer", steps: ["01"], summary: "Placeholder: what CVP stands for and the job it does for customers.", tbc: true },
  { slug: "dashboard", name: "Dashboard", portal: "admin", steps: ["02"], summary: "Placeholder: the overview the admin team starts their day from.", tbc: true },
  { slug: "opportunity", name: "Opportunity module", portal: "admin", steps: ["02", "03"], summary: "Placeholder: how incoming demand becomes a structured opportunity.", tbc: true },
  { slug: "proposal", name: "Proposal module", portal: "admin", steps: ["05"], summary: "Placeholder: how proposals are reviewed and committed.", tbc: true },
  { slug: "experiment-management", name: "Internal experiment management", portal: "internal", steps: ["06"], summary: "Placeholder: how internal experiments are planned and tracked.", tbc: true },
]

/** Modules designed by teammates, shown greyed out for context only (no page). Placeholder names. */
export const teamModules: { name: string; portal: PortalKey }[] = [
  { name: "Other customer modules", portal: "customer" },
  { name: "Supplier modules", portal: "supplier" },
]

export const getScinodeModule = (slug: string) => scinodeModules.find((m) => m.slug === slug)
