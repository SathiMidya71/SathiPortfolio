import type { PortalTone } from "@/components/scinode/researcher/pm-module"
import type { ContextFact, ContextProblem } from "@/components/scinode/researcher/onboarding-module"
import type { ResearchItem } from "@/components/scinode/researcher/research-map"

// The two modules unique to Scinode for Manufacturers, on the same templates as the researcher modules:
// 01 Profile & onboarding (template of the researcher onboarding module) and 03 Orders & execution (template
// of Project management). 02 Opportunities & proposals is the shared supplier page.
// REAL: the flows, stages and rules from the PM's lifecycle notes, and the platform figures (public marketing
// numbers, Sathi confirmed). DRAFT: wording Claude wrote from those notes for Sathi to confirm. SAMPLE: placeholder
// content (quotes, decisions, delivered lines) until she sends hers. Sections listed in `draft` / `sample` get a tag.
// Never publish internal codenames, client or colleague names; use generic terms.

export type LaneStep = { lane: string; text: readonly string[]; sub?: string; gate?: boolean }
export type LaneFlowData = {
  id: string
  lanes: readonly { name: string; tone: PortalTone }[]
  steps: readonly LaneStep[]
  end: { lane: string; text: string; sub: string }
  label: string
}

// ---------------- 01 Profile & onboarding ----------------

export const onboarding = {
  slug: "profile-onboarding",
  n: 1,
  title: "Profile & onboarding",
  tagline: "A facility profile buyers can trust, and a partner NDA when the first order lands",
  draft: new Set(["context", "flow"]),
  sample: new Set(["research", "walkthrough", "impact"]),
  sections: [
    { id: "context", label: "Context" },
    { id: "research", label: "Research" },
    { id: "flow", label: "Onboarding flow" },
    { id: "walkthrough", label: "Walkthrough" },
    { id: "screens", label: "Key screens" },
    { id: "impact", label: "Success metrics" },
  ],
  context:
    "Designed manufacturer onboarding for a B2B chemical marketplace: one facility profile with products, capabilities and capacity, an admin verification gate, and a partner NDA on the first purchase order.",
  facts: [
    { n: "500+", label: "Manufacturers\nonboarded" },
    { n: "130+", label: "Chemistries\nmapped" },
    { n: "1", label: "Approval\ngate" },
    { n: "1", label: "Partner\nNDA" },
  ] satisfies ContextFact[],
  problems: [
    { title: "Invisible to global buyers", text: "Plants were known only to a narrow, mostly domestic network.", fix: "A verified facility profile buyers anywhere can find" },
    { title: "Capacity nobody could see", text: "Idle reactors and lines weren't listed anywhere, so demand couldn't find them.", fix: "Products, capabilities and capacity as structured fields, used for matching" },
    { title: "Compliance across regions", text: "Licences and certifications were checked again, by email, for every buyer.", fix: "Certifications uploaded once and reviewed by an admin" },
  ] satisfies ContextProblem[],
  research: [
    {
      method: "Stakeholder interviews",
      quote: "Plants have capacity, but buyers abroad don't know they exist. (sample wording)",
      insight: "Visibility is the first problem, not price.",
      decision: "A facility profile built for discovery: location, chemistries, capacity and products.",
    },
    {
      method: "Platform data",
      stat: { value: "130+", label: "chemistries mapped to match plants to projects" },
      insight: "Matching only works when capabilities are structured.",
      decision: "Chemistries and capabilities picked from lists, never typed as free text.",
    },
    {
      method: "Research objective",
      question: "What makes a global buyer trust a plant it has never visited?",
      insight: "Trust has to be shown before a plant can quote.",
      decision: "An admin verifies every profile; Opportunities unlock only after approval.",
    },
    {
      method: "Product docs review",
      question: "When does a manufacturer become a partner, and why then?",
      insight: "The legal step belongs where commitment happens, not at sign-up.",
      decision: "The partner NDA appears with the first purchase order, not in the sign-up form.",
    },
  ] satisfies ResearchItem[],
  flow: {
    id: "mob",
    lanes: [
      { name: "Manufacturer", tone: "res" },
      { name: "Scinode", tone: "lead" },
      { name: "Admin", tone: "admin" },
    ],
    steps: [
      { lane: "Manufacturer", text: ["Sign up / log in"], sub: "one account" },
      { lane: "Scinode", text: ["Manufacturer", "platform opens"], sub: "Dashboard + Profile only" },
      { lane: "Manufacturer", text: ["Build the", "facility profile"], sub: "products, capabilities, capacity" },
      { lane: "Manufacturer", text: ["Add licences &", "certifications"] },
      { lane: "Manufacturer", text: ["Accept terms", "and submit"], sub: "profile turns read-only" },
      { lane: "Admin", text: ["Review profile"], sub: "approve or request changes", gate: true },
      { lane: "Scinode", text: ["Opportunities", "unlock"] },
      { lane: "Manufacturer", text: ["First PO:", "sign partner NDA"], sub: "benefits shown with it" },
    ],
    end: { lane: "Scinode", text: "Partner supplier", sub: "ready for orders" },
    label:
      "Manufacturer onboarding: sign up, the manufacturer platform opens with only the dashboard and profile, the manufacturer builds the facility profile, adds licences and certifications, accepts the terms and submits; an admin reviews the profile; on approval opportunities unlock; with the first purchase order the manufacturer signs the partner NDA and becomes a partner supplier.",
  } satisfies LaneFlowData,
  decisions: [
    { title: "One profile, built for matching", text: "Facility, products, capabilities and capacity are the fields matching runs on." },
    { title: "Capacity as data", text: "Reactors and lines are listed with capacity, so idle capacity can meet demand." },
    { title: "Verified before visible", text: "An admin reviews each profile before any opportunity unlocks." },
    { title: "NDA at the first PO", text: "The partner agreement arrives with real work, not as a sign-up hurdle." },
  ],
  screens: ["Sign up", "Facility profile", "Products & capacity", "Licences & certifications", "Submitted for review", "Partner NDA"],
  delivered: [
    "Designed a facility profile with products, capabilities and capacity as structured fields, so plants can be matched to projects by chemistry and fit.",
    "Designed a verification flow that keeps Opportunities locked until an admin approves the profile. [metric needed]",
    "Moved the partner NDA from sign-up to the first purchase order, so manufacturers commit when there is real work. [metric needed]",
  ],
  results: [
    { n: "500+", label: "Manufacturers onboarded" },
    { n: "97%", label: "Satisfaction rate" },
  ],
} as const

// ---------------- 03 Orders & execution ----------------

export const orders = {
  slug: "orders-execution",
  n: 3,
  title: "Orders & execution",
  tagline: "One order, tracked from the purchase order to delivery in every portal",
  draft: new Set(["context", "users"]),
  sample: new Set(["decisions", "impact"]),
  sections: [
    { id: "context", label: "Context" },
    { id: "users", label: "Who uses it" },
    { id: "po", label: "From PO to order" },
    { id: "stages", label: "Order stages" },
    { id: "decisions", label: "Key decisions" },
    { id: "screens", label: "Key screens" },
    { id: "impact", label: "Success metrics" },
  ],
  context:
    "Designed order execution for manufacturers: after the purchase order, one order record tracked across the supplier, admin and customer portals, through manufacturing, logistics and shipment to delivery.",
  facts: [
    { n: "3", label: "Portals" },
    { n: "4", label: "Order stages" },
    { n: "1", label: "Order record" },
    { n: "70+", label: "Live programmes" },
  ],
  problems: [
    { title: "Status by phone", text: "After the PO, order status was chased by phone and email.", fix: "One order timeline every portal sees" },
    { title: "Duplicate proposals", text: "Delivered projects stayed listed and kept inviting proposals.", fix: "Delivered projects leave active listings automatically" },
    { title: "No record of changes", text: "Who updated what lived in separate inboxes.", fix: "A full audit trail from proposal to delivery" },
  ],
  surfaces: [
    { key: "res", name: "Scinode for Manufacturers", roles: ["Manufacturer"], job: "Sees every update on its orders, from production to shipment" },
    { key: "admin", name: "Admin portal", roles: ["Scimplify admin"], job: "Raises the order and adds manufacturing, logistics and shipment updates" },
    { key: "cust", name: "Customer portal", roles: ["Customer"], job: "Tracks the order and confirms delivery" },
  ] satisfies { key: PortalTone; name: string; roles: string[]; job: string }[],
  surfacesNote: "One order record: what the admin updates shows up in the manufacturer and customer portals at once.",
  po: {
    id: "ord",
    lanes: [
      { name: "Manufacturer", tone: "res" },
      { name: "Admin", tone: "admin" },
      { name: "Customer", tone: "cust" },
    ],
    steps: [
      { lane: "Customer", text: ["Confirms the", "agreed price"] },
      { lane: "Admin", text: ["Sends the PO to", "the manufacturer"] },
      { lane: "Manufacturer", text: ["Shares the", "proforma invoice"] },
      { lane: "Customer", text: ["Raises the PO"] },
      { lane: "Admin", text: ["Order placed", "in My Orders"], sub: "synced to all three portals", gate: true },
      { lane: "Admin", text: ["Adds manufacturing,", "logistics, shipment"], sub: "stage by stage" },
      { lane: "Customer", text: ["Tracks the order"], sub: "manufacturer sees the same" },
    ],
    end: { lane: "Admin", text: "Delivered", sub: "delisted, inventory updated" },
    label:
      "From purchase order to order: the customer confirms the price, the admin sends the PO to the manufacturer, the manufacturer shares the proforma invoice, the customer raises the PO, the order is placed in My Orders and synced to all three portals, the admin adds manufacturing, logistics and shipment updates, the customer and manufacturer track it until it is delivered.",
  } satisfies LaneFlowData,
  stages: [
    { name: "Order placed", note: "PO and proforma invoice attached" },
    { name: "Manufacturing details", note: "Production updates from the plant" },
    { name: "Logistics", note: "Packing, documents and dispatch" },
    { name: "Shipment tracking", note: "Live shipment status to delivery" },
  ],
  everyStage: ["Updates added by the admin", "Seen by manufacturer & customer", "Documents attached", "Full history"],
  afterDelivery: ["Project leaves active listings", "Shows under Completed (admin can keep it listed)", "Inventory updated", "Audit trail via the timeline"],
  decisions: [
    { title: "One order, three portals", text: "Manufacturer, admin and customer see the same order record, each with their own actions." },
    { title: "A timeline, not a status label", text: "Four stages with dates and updates, so nobody asks where an order is." },
    { title: "Delivered means delisted", text: "Completed projects leave active listings, so no one proposes on finished work." },
    { title: "Every change on record", text: "Each update keeps who made it and when, from proposal to delivery." },
  ],
  screens: ["My Orders", "Order details", "Manufacturing details", "Logistics", "Shipment tracking", "Completed orders"],
  delivered: [
    "Designed one order record shared by the manufacturer, admin and customer portals, replacing status calls and emails. [metric needed]",
    "Structured execution into 4 tracked stages, from order placed to shipment, each with updates, documents and history.",
    "Delisted delivered projects automatically to prevent duplicate proposals on finished work. [metric needed]",
  ],
  results: [
    { n: "70+", label: "Live manufacturing programmes" },
    { n: "10+", label: "Projects per manufacturer" },
  ],
} as const

export const mfgModules = [onboarding, orders] as const
export const getMfgModule = (slug: string) => mfgModules.find((m) => m.slug === slug)
