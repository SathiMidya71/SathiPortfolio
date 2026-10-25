// Opportunities & proposals: one module shared by every supplier user type (CROs, scientists and
// manufacturers). Sources: Sathi's flow notes, the PM's proposal specs, CRO interviews (researchers) and
// stakeholder interviews with Scimplify's business team and PM (manufacturers; proxy research, labelled so).
// Platform figures are Scinode for Manufacturers' public marketing numbers. Never publish client names,
// colleague names or internal codenames; use generic terms ("users", "a manufacturer", "a customer").

export const opContext =
  "Designed the end-to-end opportunity-to-purchase-order journey for CROs, scientists and manufacturers on a B2B R&D marketplace: matched opportunities, an adaptive proposal form, versioned quote negotiation and admin-mediated approvals."

export const opFacts = [
  { n: "3", label: "User types" },
  { n: "2", label: "Opportunity types" },
  { n: "5", label: "Proposal stages" },
  { n: "1", label: "Mediator" },
]

/** The rule that shapes the whole module. */
export const opRule = {
  title: "Suppliers never talk to the customer directly",
  text: "Scimplify sits in the middle: it shortlists opportunities, reviews every proposal, negotiates price with the customer and raises the purchase order. The platform keeps every side in sync, so nobody has to chase an email.",
}

/** Same flow, different pains. */
export const opPains = [
  {
    who: "CROs & scientists",
    source: "From CRO interviews",
    pains: ["Projects outside their chemistry", "Vague briefs: purity, reports, scale", "Quotes and follow-ups lost in email"],
    needs: "Clear briefs and a fit check before they commit",
  },
  {
    who: "Manufacturers",
    source: "From stakeholder interviews (business team & PM)",
    pains: ["Idle reactors: utilisation around 30%", "No steady order pipeline to plan production", "Limited reach beyond domestic buyers"],
    needs: "A steady flow of orders that match their plant",
  },
]

/** How opportunities reach a user. */
export const opTypes = [
  { title: "Catalogue", text: "Generated from the products in the user's profile. Scimplify shortlists the relevant ones.", form: "RFQ-style quote" },
  { title: "Capability", text: "Matched to what the user can do: their profile's chemistry, equipment and capacity, analysed by Scimplify.", form: "Form by engagement type" },
]
export const opAccess = [
  { title: "Open", text: "Visible to every onboarded user." },
  { title: "Exclusive", text: "Shown only to selected users (premium access)." },
]
export const opFilters = ["Project type", "Industry", "Geography", "Required certifications", "Proposal deadline"]

/** The adaptive proposal form: engagement types → (one question) → exactly one form. */
export const opForms = {
  forms: [
    { key: "rfq", name: "RFQ", fields: ["Quantity", "Cost per unit", "Timeline", "Shipment & packaging", "Payment terms", "Specification"] },
    { key: "cmo", name: "Contract manufacturing", fields: ["Why you're a great fit", "Specification", "Process notes", "Terms"] },
    { key: "codev", name: "Co-development", fields: ["Why you're a great fit", "Terms", "Supporting documents"] },
  ],
  combos: [
    { pick: "RFQ + CMO", question: "Already manufacturing and can supply it?", yes: "RFQ", no: "Contract manufacturing" },
    { pick: "RFQ + Co-development", question: "Do you already have the capability to manufacture it?", yes: "RFQ", no: "Co-development" },
    { pick: "CMO + Co-development", question: "How would you like to engage?", yes: "Contract manufacturing", no: "Co-development" },
  ],
}

/** Proposal stages by type. */
export const opStages = {
  capability: ["Submitted", "Talk to an expert", "Submit quote", "Quote accepted", "PO issued"],
  catalogue: ["Submitted", "Under review", "Reviewed", "Quote accepted", "PO issued"],
}

/** The quote negotiation loop (inside the review stage). */
export const opQuoteLoop = [
  { who: "User", text: "Submits a quote" },
  { who: "Scimplify", text: "Accepts, rejects with a reason, or revises" },
  { who: "User", text: "Accepts the revised quote, or revises again" },
  { who: "Scimplify", text: "Reviews the user's revision" },
]

/** Proposal dashboard tiles (labels only; no figures shown). */
export const opDashboard = ["Proposals sent", "Quotes accepted", "Dropped or cancelled", "Purchase orders issued"]

export const opDecisions = [
  { title: "One question instead of three forms", text: "When a project allows more than one engagement type, the user answers one question and sees exactly one form, never a stack of forms." },
  { title: "Every quote version stays visible", text: "Revisions from Scimplify and from the user sit side by side, so the negotiation is never a guessing game." },
  { title: "A timeline instead of a status label", text: "Each proposal opens into numbered stages with the next action, from submission to purchase order." },
  { title: "A human when it matters", text: "Talk to an expert puts a Scimplify specialist in the loop; if the user doesn't book, Scimplify schedules the call." },
]

/** Scinode for Manufacturers platform figures (public marketing numbers). */
export const opPlatform = [
  { value: "400+", label: "Listed projects", note: "matched by chemistry, capacity and plant fit" },
  { value: "70+", label: "Live manufacturing programmes", note: "running the proposal-to-project workflow" },
  { value: "500+", label: "Manufacturers onboarded", note: "facilities worldwide" },
  { value: "97%", label: "Satisfaction rate", note: "among onboarded manufacturers" },
]

export const opImpact = [
  "Designed one opportunity-to-purchase-order flow shared by CROs, scientists and manufacturers, removing three separate journeys.",
  "Replaced stacked proposal forms with one qualifying question that routes users to a single RFQ, contract manufacturing or co-development form.",
  "Introduced a versioned quote negotiation loop so users and Scimplify can revise, accept or reject without leaving the platform.",
  "Turned proposal status into a five-stage timeline with the next action at every step, through to the purchase order.",
]
