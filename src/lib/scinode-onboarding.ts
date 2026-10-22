// Profile & onboarding module of Scinode for Researchers, written as a research-led case study.
// Research (quotes, stats, personas) comes from Sathi's CRO interviews and competitive analysis
// (scinode-researcher.ts). The PM's PRDs (Supplier Profile V2, Scientist Onboarding) are background
// only: their KPIs appear as targets, never as results. The scientist persona is a proto-persona.
// Section counts, the old form's 32 fields, the heuristics and the platform figures (200 CRO logins,
// 97 scientists) come from Sathi's "SCINODE Onboarding" case study video.

export const obContext =
  "Led end-to-end UX for supplier onboarding on a B2B R&D marketplace: two research-led profile paths for CROs and scientists, adaptive forms, and a verification flow that unlocks the core modules only after approval."

export const obFacts = [
  { n: "2", label: "Profile paths" },
  { n: "8", label: "CRO sections" },
  { n: "4", label: "Scientist sections" },
  { n: "1", label: "Approval gate" },
]

/** What was broken before, and the fix designed for it. */
export const obProblems = [
  { title: "One long, flat form", text: "All 32 fields sat on a single page, with no grouping and no sense of progress, so suppliers dropped off during onboarding.", fix: "Tab-based sections, a Discovery Score and section counters, with autosave" },
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
    decision: "4 short sections with autosave, and ORCID, H-index and Google Scholar fields instead of re-typing.",
  },
]

/** The two profile paths (personas are on the Scinode for Researchers page). */
export const obPaths = [
  {
    key: "cro",
    who: "CRO / CDMO",
    path: ["Company profile", "Products", "Services & capabilities", "Equipments", "Terms & conditions", "Licence & certifications", "Facility & EHS", "Utility"],
    pathLabel: "8 sections: 5 onboarding + 3 enrichment",
  },
  {
    key: "scientist",
    who: "Scientist",
    path: ["Profile", "Industrial capabilities", "Compliance & declaration", "Track record"],
    pathLabel: "4 sections: 3 onboarding + 1 enrichment",
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

/** The onboarding journey. */
export const obJourney = ["Sign up", "Verify email", "Build profile", "Accept terms & submit", "Admin review", "Marketplace unlocked"]

/** PM targets for the module (from the PRD), not results. */
export const obTargets = [
  { value: 90, prefix: ">", unit: "%", label: "Profile completion", kind: "pct" as const },
  { value: 80, prefix: ">", unit: "%", label: "Supplier activation", kind: "pct" as const },
  { value: 20, prefix: "<", unit: " min", label: "Onboarding time", kind: "time" as const, max: 60 },
  { value: 24, prefix: "<", unit: " h", label: "Approval time", kind: "time" as const, max: 72 },
]

/** ATS-style lines: action, scope, how. Numbers match the case study video. */
export const obImpact = [
  "Restructured a 32-field, single-page sign-up form into tab-based profiles: 8 sections for CROs (5 onboarding + 3 enrichment) and 4 for scientists (3 + 1).",
  "Designed one shared structure for both profiles: Discovery Score, Onboarding → Profile Enrichment groups, section counters and \"What you fill in · Why this matters\" guidance.",
  "Grounded every decision in 5 of Nielsen's heuristics: visibility of status, match with the real world, consistency, recognition over recall, and minimalist design.",
  "Designed a verification flow that gates Opportunities, Projects and Project management behind admin approval to build buyer trust.",
]

/** Live platform figures shown at the end of the case study video (results, not targets). */
export const obResults = [
  { n: 200, label: "CRO logins" },
  { n: 97, label: "Scientists on the platform" },
]

/** Old form vs new structure, as shown in the video. */
export const obStructure = {
  before: { fields: 32, pages: 1, sections: 0 },
  profiles: [
    { who: "CRO / CDMO", onboarding: 5, enrichment: 3 },
    { who: "Scientist", onboarding: 3, enrichment: 1 },
  ],
}

/** Nielsen heuristics the redesign leans on (from the video). */
export const obHeuristics = [
  { code: "H1", name: "Visibility of system status", where: "Active tab and Discovery Score" },
  { code: "H2", name: "Match the real world", where: "ORCID, H-index, service catalogues CROs sell" },
  { code: "H4", name: "Consistency & standards", where: "Shared patterns across both profiles" },
  { code: "H6", name: "Recognition over recall", where: "Labels say what to fill in and why" },
  { code: "H8", name: "Aesthetic & minimalist design", where: "A dense form becomes focused groups" },
]

/** The four design decisions from the video's rationale slide. */
export const obDecisions = [
  { title: "Flat form → grouped tabs", text: "32 fields on one page became short, focused sections.", h: "H8" },
  { title: "Descriptive labels & guidance", text: "Each section says what you fill in and why it matters.", h: "H6" },
  { title: "Active tab & Discovery Score", text: "Users always see where they are and how complete they are.", h: "H1" },
  { title: "Shared patterns, both profiles", text: "Different content, same structure for CROs and scientists.", h: "H4" },
]

const obScreenDir = "/case-studies/scinode/modules/profile-onboarding/screens"
/** Key screens: three from the scientist profile, three from the CRO profile. */
export const obScreens = [
  { src: `${obScreenDir}/01-researcher-profile.jpg`, title: "Scientist · Profile", caption: "Name, institution and research domains, with the Discovery Score beside the form." },
  { src: `${obScreenDir}/02-researcher-capabilities.jpg`, title: "Scientist · Industrial capabilities", caption: "R&D stages and industries picked from chips instead of typed in." },
  { src: `${obScreenDir}/03-researcher-track-record.jpg`, title: "Scientist · Track record", caption: "The optional enrichment section: technologies, projects, patents and publications." },
  { src: `${obScreenDir}/04-cro-company-profile.jpg`, title: "CRO · Company profile", caption: "The first of 5 onboarding sections, with 3 more under Profile Enrichment." },
  { src: `${obScreenDir}/05-cro-services.jpg`, title: "CRO · Services & capabilities", caption: "Service catalogues grouped the way CROs sell them." },
  { src: `${obScreenDir}/06-cro-equipment.jpg`, title: "CRO · Equipments", caption: "The same add-item drawer pattern used across both profiles." },
] as const
