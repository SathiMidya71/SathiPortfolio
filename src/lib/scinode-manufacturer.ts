import type { PlatformData } from "@/components/scinode/researcher/diagrams"
import * as researcher from "@/lib/scinode-researcher"

// Scinode for Manufacturers: same case study template as Scinode for Researchers (same sections, same visuals).
// REAL content, from the PM's notes and the product deck (Sathi, Oct 2026): the idle-capacity problem and root
// causes, the Onboard → Match → Execute → Scale journey, the platform figures (public marketing numbers) and the
// research method (stakeholder interviews with Scimplify's business team and PM, who work with manufacturers
// daily: proxy research, labelled so). Everything else is SAMPLE content, flagged in `sample` below and shown
// with a "Sample content" tag on the page, until Sathi sends the real material.
// Never publish internal codenames, client names or colleague names; use generic terms.

/** Sections whose content is still sample (shows a "Sample content, to replace" tag). */
export const sample = new Set(["objectives", "methods", "competitors", "affinity", "empathy", "personas", "evolution", "next"])

export const meta = {
  title: "Scinode for Manufacturers",
  subtitle: "Turning idle plant capacity into a steady flow of global orders",
}

const overview = {
  title: ["One platform for", "manufacturers"],
  statement: [
    { t: "We help manufacturers " },
    { t: "fill idle capacity", em: true, bubble: "lab" },
    { t: ", get " },
    { t: "matched to global demand", em: true, bubble: "match" },
    { t: ", and run every order in " },
    { t: "one place", em: true, bubble: "flow" },
    { t: "." },
  ],
  facts: [
    { label: "Company", value: "Scimplify" },
    { label: "Users", value: "Manufacturers (CMO / CDMO)" },
    { label: "Role", value: "Product designer" },
    { label: "Year", value: "[to confirm]" },
  ],
  text: "Scinode for Manufacturers aligns project opportunities with a plant's chemistries, capabilities and capacity, and runs proposals, compliance and execution in a single workflow, from requirement to production.",
}

const problemPair = {
  problems: [
    { title: "Idle capacity", text: "Reactors and lines sat unused; utilisation was stuck around 30%." },
    { title: "Irregular demand", text: "No steady pipeline of orders, so production was hard to plan." },
    { title: "Limited reach", text: "A narrow buyer network kept plants away from global demand." },
  ],
  solution: "Scinode for Manufacturers brings a steady flow of matched, verified projects, live demand to plan against, and one workflow from proposal to purchase order.",
}

const objectives = [
  { title: "Filling capacity", text: "How do manufacturers find new orders today?" },
  { title: "Judging fit", text: "How do they decide a project fits their plant and capacity?" },
  { title: "Building trust", text: "What makes a global buyer trust a plant it has never visited?" },
  { title: "Running orders", text: "How do POs, logistics and shipments work today?" },
]

const hmw = "How might we keep a manufacturer's plant running at capacity, with projects that fit it, from buyers it could never reach alone?"

const methods = [
  { title: "Stakeholder interviews", note: "Business team & PM", detail: "Business team · PM · daily contact with manufacturers" },
  { title: "Product docs review", note: "Specs and flows", detail: "Proposal specs · lifecycle · access rules" },
  { title: "Affinity mapping", note: "Grouped findings", detail: "Challenges · Root causes · Needs · Ideas" },
  { title: "Empathy map", note: "Says, thinks, does, feels", detail: "Says · Thinks · Does · Feels" },
  { title: "Proto-persona", note: "Plant head", detail: "Manufacturer proto-persona" },
  { title: "Journey map", note: "Onboard to scale", detail: "Onboard · Match · Execute · Scale" },
]

const researchStats = [
  { value: "30%", text: "Typical plant utilisation before the platform: large parts of the infrastructure sat idle.", source: "From stakeholder interviews" },
  { value: "500+", text: "Manufacturers onboarded on the platform, facilities worldwide and growing.", source: "Platform figure" },
  { value: "130+", text: "Core chemistry domains mapped, so projects can be matched to a plant's strengths.", source: "Platform figure" },
]
const researchNeeds = ["A steady order flow", "Match by plant & capacity", "Reach global buyers", "Track orders to delivery"]

// Stakeholder observations, phrased as quotes; SAMPLE wording until Sathi confirms what was said.
const insights = [
  { title: "Idle reactors cost money", quote: "When the reactors sit idle, every unit we make costs more.", design: "A steady flow of matched projects" },
  { title: "Fit before price", quote: "We can take the project if it matches our chemistry and our capacity.", design: "Matching by chemistry, capability and capacity" },
  { title: "Beyond local buyers", quote: "Our customers are mostly domestic. We need buyers we can't reach ourselves.", design: "Global opportunities, open or exclusive" },
  { title: "Know where the order is", quote: "Once the PO is in, we want one place to see production, logistics and shipment.", design: "Orders tracked from production to shipment" },
]

const competitors = {
  features: ["Plant profiles", "Capacity display", "Project matching", "Proposal workflow", "Quote negotiation", "PO in platform", "Order tracking", "Compliance docs", "Global buyers", "Analytics"],
  rows: [
    { name: "Scinode for Manufacturers", ours: true, cells: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { name: "Marketplace A", cells: [1, 0.5, 0, 0.5, 0, 0, 0, 1, 1, 0] },
    { name: "Marketplace B", cells: [1, 0, 0.5, 0, 0, 0, 0, 0.5, 1, 0] },
    { name: "Directory C", cells: [1, 0, 0, 0, 0, 0, 0, 0, 0.5, 0] },
    { name: "Sourcing tool D", cells: [0.5, 0, 1, 1, 0.5, 0, 0, 0, 1, 0.5] },
  ],
}

const affinity = [
  { title: "Challenges", items: ["Idle capacity, around 30% utilisation", "Rising per-unit costs", "Frequent downtime"] },
  { title: "Root causes", items: ["No steady demand pipeline", "No live market signals to plan", "Limited buyer reach"] },
  { title: "Needs", items: ["Projects that fit the plant", "Predictable order flow", "Compliance across regions"] },
  { title: "Ideas", items: ["Match by chemistry and capacity", "Live demand data for planning", "One flow from proposal to PO"] },
]

const empathy = {
  says: ["We have capacity; we need the right projects.", "Our buyers are mostly local."],
  thinks: ["Will this order keep the reactors busy?", "Can we trust a buyer we've never met?"],
  does: ["Chases orders through brokers and contacts", "Plans production week by week"],
  feels: ["Anxious about idle lines", "Overlooked by global buyers"],
  pains: ["Irregular orders", "Rising cost per unit"],
  gains: ["A steady pipeline", "Global visibility"],
}

const personas = [
  {
    key: "manufacturer",
    label: "Manufacturer",
    name: "The plant head",
    role: "Runs operations and business at a mid-size contract manufacturer",
    facts: ["Multi-purpose plant", "Reactors and pilot lines", "Domestic buyers today"],
    source: "Proto-persona from stakeholder interviews (sample)",
    goals: ["Keep the plant running at capacity", "Win projects that fit the plant", "Reach buyers abroad"],
    pains: ["Idle reactors", "Irregular orders", "Rising per-unit costs"],
    quote: "Our plant has capacity. We just need the right projects, from buyers we can't reach on our own.",
    highlight: ["capacity", "the right projects"],
    quoteSource: "Proto-persona: main goal, not an interview quote",
    about:
      "Runs a multi-purpose plant with reactors and pilot lines that are often under-used. Wants a steady flow of projects that match the plant's chemistry and capacity, and one place to quote, receive the PO and track the order to shipment.",
    needs: ["Projects matched to plant and capacity", "A clear brief before quoting", "Quotes and POs in one flow", "Order tracking to shipment"],
    tools: ["ERP", "Excel", "Email"],
    profileSize: { n: 6, unit: "profile tabs (sample)" },
  },
]

const journeyMap = [
  { stage: "Onboard", headline: "Show the plant.", points: ["Register the facility and capabilities", "Products and capacity in one profile", "Verified before projects unlock"] },
  { stage: "Match", headline: "Projects that fit.", points: ["Matched to chemistry, capacity and plant fit", "Open projects and exclusive invites", "A clear brief before quoting"] },
  { stage: "Execute", headline: "Deliver with support.", points: ["Proposal, quote and PO in one flow", "Compliance and operational support", "Production, logistics and shipment tracked"] },
  { stage: "Scale", headline: "Grow with every order.", points: ["Repeat engagements", "A global footprint", "Data to plan the next order"] },
]

const evolution = [
  { area: "Proposals", before: "One generic proposal form", after: "One question routes to an RFQ, CMO or co-development form" },
  { area: "Quotes", before: "Prices agreed by email", after: "Versioned quotes with accept, revise or reject" },
  { area: "Orders", before: "PO status asked for by phone", after: "Orders tracked from production to shipment" },
]

const upcoming = [
  { title: "AI insights", text: "Data and analytics that encourage repeat engagement." },
  { title: "Live demand signals", text: "Market demand to plan production against." },
  { title: "Two-sided participation", text: "Manufacturers also reach the customer side." },
]

// Platform figures (public marketing numbers): shown as results.
const targets = [
  { value: 80, suffix: "%", prefix: "", label: "capacity utilisation, up from about 30%" },
  { value: 50, suffix: "%", prefix: "", label: "less downtime" },
  { value: 97, suffix: "%", prefix: "", label: "satisfaction among onboarded manufacturers" },
  { value: 10, suffix: "+", prefix: "", label: "projects per manufacturer on average" },
]

/** Manufacturers reuse the Researchers visuals; the shapes match, the literal types don't. */
export const manufacturerData = {
  ...researcher,
  overview,
  problemPair,
  objectives,
  hmw,
  methods,
  researchStats,
  researchNeeds,
  insights,
  competitors,
  affinity,
  empathy,
  personas,
  shared: ["Get verified", "Find projects", "Send proposals", "Deliver orders"],
  profiles: { cro: [], scientist: [] },
  journeyMap,
  targets,
  targetsNote: "Scinode for Manufacturers platform figures.",
  quoteSource: "From stakeholder interviews (sample wording)",
  evolution,
  upcoming,
} as unknown as PlatformData

export { evolution as manufacturerEvolution }

/** End-to-end architecture for manufacturers (from the PM's lifecycle notes). */
export const architecture = [
  { title: "Sign up", items: ["Account", "Email verification"] },
  { title: "Profile", items: ["Facility & capabilities", "Products & capacity"] },
  { title: "Verification", items: ["Submit for review", "Approved or changes requested"] },
  { title: "Opportunities", items: ["Catalogue & capability", "Open or exclusive"], locked: true },
  { title: "Proposal & quote", items: ["Adaptive form", "Versioned quotes"], locked: true },
  { title: "Purchase order", items: ["PO issued", "First PO: partner NDA"], locked: true },
  { title: "Orders & execution", items: ["Production", "Logistics", "Shipment tracking"], locked: true },
]
