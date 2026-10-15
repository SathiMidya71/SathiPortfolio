// Profile & onboarding module of Scinode for Researchers, written as a research-led case study.
// Research (quotes, stats, personas) comes from Sathi's CRO interviews and competitive analysis
// (scinode-researcher.ts). The PM's PRDs (Supplier Profile V2, Scientist Onboarding) are background
// only: their KPIs appear as targets, never as results. The scientist persona is a proto-persona.

export const obContext =
  "Led end-to-end UX for supplier onboarding on a B2B R&D marketplace: two research-led profile paths for CROs and scientists, adaptive forms, and a verification flow that unlocks the core modules only after approval."

export const obFacts = [
  { n: "2", label: "Profile paths" },
  { n: "8", label: "CRO profile tabs" },
  { n: "5", label: "Scientist steps" },
  { n: "1", label: "Approval gate" },
]

/** What was broken before, and the fix designed for it. */
export const obProblems = [
  { title: "Profiles left half-done", text: "Suppliers signed up, then dropped off before finishing their profile.", fix: "A completion widget on the dashboard and a progress mark on every tab" },
  { title: "Thin, inconsistent data", text: "Capabilities were typed in free text, so buyers couldn't compare labs.", fix: "Structured fields, searchable tags and duplicate checks" },
  { title: "No trust signal", text: "Anyone could reach the marketplace without a review.", fix: "Admin approval before Opportunities, Projects and Project management unlock" },
]

/** Research → insight → design decision. Quotes are from the CRO interviews. */
export const obResearch = [
  {
    method: "CRO interviews",
    quote: "If I gave you 101% purity when you asked for 100%, show that. Showcase my quality and facilities.",
    insight: "Labs want to prove what they can do, not describe it.",
    decision: "A profile built on evidence: equipment, facility & EHS, certifications and products, not a free-text bio.",
  },
  {
    method: "Competitive analysis",
    stat: { value: "0/10", label: "competing platforms showed a lab's equipment" },
    insight: "The thing labs most want to show is missing everywhere else.",
    decision: "Equipment gets its own tab, with make, capacity, material and automation for every asset.",
  },
  {
    method: "Research objective",
    question: "What makes a buyer trust a lab it has never visited?",
    insight: "Trust has to be earned before a lab can bid.",
    decision: "Every profile is reviewed by an admin; Opportunities, Projects and Project management unlock only after approval.",
  },
  {
    method: "Scientist needs",
    question: "Long forms, easy to abandon. Re-typing what's already on Google Scholar.",
    insight: "Scientists give the platform minutes, not hours.",
    decision: "5 short steps with time badges, autosave, and ORCID and Google Scholar links instead of re-typing.",
  },
]

/** The two profile paths (personas are on the Scinode for Researchers page). */
export const obPaths = [
  {
    key: "cro",
    who: "CRO / CDMO",
    path: ["Company profile", "Products", "Licences & certifications", "Services & capabilities", "Equipment", "Facility & EHS", "Infrastructure", "Terms & conditions"],
    pathLabel: "8 tabs, filled in any order",
  },
  {
    key: "scientist",
    who: "Scientist",
    path: ["Professional profile", "Research group", "Technology & IP", "Lab infrastructure", "Verification"],
    pathLabel: "5 guided steps, one at a time",
  },
]

/** Who can open what, at each onboarding status (from the access rules). */
export const obAccess = {
  modules: ["Dashboard", "Profile", "Opportunities", "Projects", "Project management"],
  states: [
    { name: "Signed up", note: "Build your profile", open: ["Dashboard", "Profile"] },
    { name: "Submitted", note: "Profile read-only while in review", open: ["Dashboard"], readOnly: ["Profile"] },
    { name: "Approved", note: "Modules unlocked", open: ["Dashboard", "Profile", "Opportunities", "Projects", "Project management"] },
  ],
}

/** Navigation cleanup, from the design review. */
export const obTabs = {
  before: ["Company profile", "Products", "Licences", "Services", "Equipment", "Facility & EHS", "Laboratory safety", "Waste management", "Utility", "Terms"],
  merged: ["Laboratory safety", "Waste management"],
  renamed: { from: "Utility", to: "Infrastructure" },
}

/** The onboarding journey. */
export const obJourney = ["Sign up", "Verify email", "Build profile", "Accept terms & submit", "Admin review", "Marketplace unlocked"]

/** PM targets for the module (from the PRD), not results. */
export const obTargets = [
  { value: 90, prefix: ">", unit: "%", label: "Profile completion", kind: "pct" as const },
  { value: 80, prefix: ">", unit: "%", label: "Supplier activation", kind: "pct" as const },
  { value: 20, prefix: "<", unit: " min", label: "Onboarding time", kind: "time" as const, max: 60 },
  { value: 24, prefix: "<", unit: " h", label: "Approval time", kind: "time" as const, max: 72 },
]

/** ATS-style lines: action, scope, how. */
export const obImpact = [
  "Designed two onboarding paths for CROs and scientists from interview research, replacing one generic sign-up form.",
  "Introduced adaptive forms: one pilot-plant question hides up to 3 sections a CRO doesn't need.",
  "Simplified the profile from 10 tabs to 8 by merging safety and waste into Facility & EHS.",
  "Designed a verification flow that gates Opportunities, Projects and Project management behind admin approval to build buyer trust.",
]
