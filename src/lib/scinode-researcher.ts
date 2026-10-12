import type { Block } from "@/lib/case-studies/types"

// Scinode for Researchers: ONE case study for both user types, CRO and scientist, across every module.
// Sources (all shared by Sathi): the PM's brief "Scinode for Researchers", the product deck, the Scientist
// Onboarding PRD, the Supplier (CRO/CDMO) Profile V2 PRD and the R&D project flow PRD.
// Rules: never use the internal codenames from those docs (the product is "Scinode for Researchers"), never
// publish people's names or emails, internal system names, costing formulas, or the deck's platform numbers.
// Research: Sathi's own research doc (Jun–Jul 2025): 2 interview rounds with Scimplify's business and project
// teams answering for buyers and suppliers, synthesis (code → themes → JTBD → priorities → decisions), competitive
// analysis, affinity and empathy maps, personas, journey maps, card sorting, a colour study and pain → solution
// tables. The interviewees are colleagues: quotes are attributed to "supplier" / "buyer" insight, never to names.
// The CRO persona (Dr. Rajeev Iyer) is hers; the scientist persona is a proto-persona and is labelled that way.
// PRD success metrics are TARGETS, never shown as results.

export type UserKey = "cro" | "scientist"

export const users: Record<UserKey, { name: string; short: string; tint: string; ink: string }> = {
  cro: { name: "CRO", short: "CRO / CDMO lab", tint: "#e4f1eb", ink: "#02594e" },
  scientist: { name: "Scientist", short: "Research scientist", tint: "#ece9fd", ink: "#5b4fd1" },
}

export const meta = {
  title: "Scinode for Researchers",
  subtitle: "Designing one R&D platform for CROs and scientists",
  overview:
    "Scinode for Researchers is Scimplify's AI-powered platform where CROs and scientists showcase their capabilities, win verified R&D projects and run them, from sign-up to project closure.",
  role: "Product designer across 5 modules: sign-up, profile, opportunities, proposals and project management. Research, flows, UX and UI.",
  timeline: "Research Jun–Jul 2025, then design and delivery",
}

export const glance = [
  { value: "2", label: "user types, one platform" },
  { value: "20", label: "research questions, 2 interview rounds" },
  { value: "10", label: "platforms benchmarked" },
  { value: "5", label: "modules designed end to end" },
]

/** Résumé-style highlights (XYZ). Figures are scope counts or PM targets, never claimed as results. */
export const highlights = [
  "Led qualitative research with 20 questions across 2 interview rounds, coding answers into 6 supplier themes, 8 jobs-to-be-done and prioritised product decisions.",
  "Benchmarked 10 R&D and CRO platforms across 10 features to find the gaps: equipment display, pricing transparency and chemistry-first discovery.",
  "Designed one R&D platform for 2 user types, CROs and scientists, across 5 modules from sign-up to project closure.",
  "Restructured a fragmented supplier profile into 8 guided sections with autosave and live completion, targeting >90% profile completion [result needed].",
  "Removed irrelevant fields for CROs with pilot-plant logic that hides plant-only sections such as ETP, distillation and filter & dryer.",
  "Designed a 5-step scientist onboarding with time badges, autosave and optional deep-dive fields to reduce form fatigue.",
  "Gated marketplace modules behind verification with clear submitted, changes-requested and approved states, targeting <24-hour approval.",
  "Replaced email and spreadsheet tracking with a stage-gated lab workflow: batch numbering, approve or retry at every milestone, and full history.",
]

export const problem: Extract<Block, { type: "problemSolution" }> = {
  type: "problemSolution",
  problem: {
    text: "Researchers could register, but most never became active. And once a project started, the work moved back to email.",
    items: [
      { big: "Low completion", text: "A long, flat profile with fields that didn't apply. Suppliers signed up and dropped off." },
      { big: "Weak data", text: "Missing operational details and inconsistent capability data made suppliers hard for buyers to find and trust." },
      { big: "Scattered work", text: "Batch results, reports and approvals lived in emails and spreadsheet versions, with no single history." },
    ],
  },
  solution: {
    text: "One guided platform: smart onboarding, verified access, opportunities, proposals and a stage-gated project workspace.",
    chips: ["Guided onboarding", "Smart profile", "Verification", "Opportunities", "Proposals", "Stage-gated projects"],
  },
}

/** How Sathi worked. Research sessions (who, how many) are still to be confirmed by her. */
export const approach = [
  { title: "Unpack the requirements", text: "Turned the PM's feature lists into user goals, pain points and moments that matter." },
  { title: "Map roles and access", text: "Who sees what, and when: before sign-up, while pending, after approval, inside a project." },
  { title: "Define both users", text: "Proto-personas with pains and gains for the CRO and the scientist, from the same lifecycle." },
  { title: "Journey, then modules", text: "Mapped the end-to-end journey first, then designed module by module against it." },
]

export const personas: Record<
  UserKey,
  { title: string; name?: string; role?: string; facts?: string[]; source: string; who: string; brings: string[]; goals: string[]; pains: string[]; gains: string[] }
> = {
  cro: {
    title: "The CRO lab lead",
    name: "Dr. Rajeev Iyer",
    role: "Scientific Director & BD Lead, custom synthesis CRO",
    facts: ["15+ years in custom synthesis", "30-member CRO", "Heterocyclic chemistry & NCEs"],
    source: "Persona from my user research",
    who: "Screens every project for chemistry fit and market scope before he says yes. Sends weekly updates and milestone COAs, and plans in SciFinder and Gantt charts.",
    brings: ["Company profile", "Products", "Licenses & certifications", "Services & capabilities", "Equipment", "Facility & EHS"],
    goals: ["Win high-potential projects that match his chemistry", "Turn trial batches into long-term scale-ups", "Show lab and science strength without site visits"],
    pains: [
      "Vague briefs with no purity, scale or report format",
      "Asked for NMR when the lab only offers HPLC",
      "No easy way to show what makes the lab different",
      "Competing on price because value isn't visible",
    ],
    gains: [
      "Clear briefs: purity, scale, timeline, report format",
      "A rich profile: infra, team, case studies",
      "Projects matched to his chemistry",
      "Milestone tracking tied to payments",
    ],
  },
  scientist: {
    title: "The research scientist",
    source: "Proto-persona from the supplier research and the scientist onboarding requirements",
    who: "Leads or belongs to a research group at an institution, with publications, patents and technologies at different readiness levels.",
    brings: ["Professional profile", "Research group", "Technology & IP", "Publications & patents", "Lab infrastructure"],
    goals: ["Show research and IP to industry partners", "Find projects that match their expertise", "Bring their group onto the platform"],
    pains: [
      "Re-typing publications that already live on Google Scholar",
      "Long onboarding forms that are easy to abandon",
      "Hard to explain how ready a technology is for industry",
      "Worries about IP and confidentiality",
    ],
    gains: [
      "Import from LinkedIn and Google Scholar",
      "Short steps with time badges and autosave",
      "A TRL picker that explains each level",
      "NDA-backed, verified collaboration",
    ],
  },
}

export type Stage = { key: string; title: string; module: string; does: Record<UserKey, string>; pain: Record<UserKey, string>; design: string }

/** End-to-end journey across all modules. */
export const journey: Stage[] = [
  {
    key: "signup",
    title: "Sign up",
    module: "Sign-up",
    does: { cro: "Creates an account and verifies email.", scientist: "Creates an account with name, institution and website." },
    pain: { cro: "Lands on a portal with nothing to do yet.", scientist: "Unsure what the platform will ask for." },
    design: "Lands on a dashboard with one goal: complete your profile.",
  },
  {
    key: "profile",
    title: "Build profile",
    module: "Profile",
    does: { cro: "Fills company, products, certifications, equipment and EHS.", scientist: "Adds research area, group, technologies, patents and papers." },
    pain: { cro: "Sections that don't fit their lab.", scientist: "Typing what already exists online." },
    design: "Guided sections, autosave, completion % and fields that adapt.",
  },
  {
    key: "verify",
    title: "Get verified",
    module: "Profile",
    does: { cro: "Accepts terms and submits for approval.", scientist: "Submits credentials for review." },
    pain: { cro: "Waiting with no visible status.", scientist: "Waiting with no visible status." },
    design: "Clear status: submitted, changes requested or approved.",
  },
  {
    key: "find",
    title: "Find projects",
    module: "Opportunities",
    does: { cro: "Browses open projects, gets exclusive invites.", scientist: "Searches by expertise, gets matched invites." },
    pain: { cro: "Chasing clients one by one.", scientist: "Expertise stays invisible to industry." },
    design: "Open and exclusive projects in one view, matched to the profile.",
  },
  {
    key: "propose",
    title: "Propose",
    module: "Proposals",
    does: { cro: "Shares feasibility, costing and timelines.", scientist: "Shares approach, timelines and capability proof." },
    pain: { cro: "Proposals lost in email threads.", scientist: "No view of where a proposal stands." },
    design: "One structured proposal and a tracker for every stage.",
  },
  {
    key: "run",
    title: "Run the project",
    module: "Project management",
    does: { cro: "Runs batches, uploads reports, CoAs and spectra.", scientist: "Logs experiments and shares results." },
    pain: { cro: "Weekly status emails and file versions.", scientist: "Results spread across files and inboxes." },
    design: "Stage-gated workspace: batches, approvals and history in one place.",
  },
  {
    key: "close",
    title: "Close & hand over",
    module: "Project management",
    does: { cro: "Submits the tech pack and closure document.", scientist: "Submits final data and the closure note." },
    pain: { cro: "Context lost between stages.", scientist: "Context lost between stages." },
    design: "Every stage links to its source batch, so nothing is lost.",
  },
]

export const modules = [
  { name: "Sign-up & onboarding", items: ["Account and email verification", "Onboarding dashboard", "Scientist 5-step stepper"] },
  { name: "Profile", items: ["8 CRO sections, 5 scientist steps", "Adaptive fields", "Verification and approval"] },
  { name: "Opportunities", items: ["Open projects", "Exclusive invites", "Search and alerts"] },
  { name: "Proposals", items: ["Structured proposal", "Status tracker", "Feedback and approval"] },
  { name: "Project management", items: ["6 gated stages", "Batches and runs", "Approvals and history"] },
]

/** Module access by profile status (from the Profile V2 PRD). */
export const access = {
  modules: ["Dashboard", "Profile", "Projects", "Proposals", "Deep Research", "Market intelligence"],
  rows: [
    { status: "Signed up", cells: ["yes", "yes", "no", "no", "no", "no"] },
    { status: "Submitted", cells: ["yes", "read", "no", "no", "no", "no"] },
    { status: "Approved", cells: ["yes", "yes", "yes", "yes", "yes", "yes"] },
  ],
}

export const croTabs = ["Company profile", "Products", "Licenses & certifications", "Services & capabilities", "Equipment", "Facility & EHS", "Infrastructure", "Terms & conditions"]

/** Pilot plant logic: what a CRO without a pilot plant never sees. */
export const pilotLogic = [
  { section: "Lab equipment", group: "Equipment", plantOnly: false },
  { section: "Distillation equipment", group: "Equipment", plantOnly: true },
  { section: "Filter & dryer", group: "Equipment", plantOnly: true },
  { section: "Other equipment", group: "Equipment", plantOnly: false },
  { section: "ETP (effluent treatment)", group: "Facility & EHS", plantOnly: true },
  { section: "Clean room", group: "Facility & EHS", plantOnly: false },
  { section: "Fire & emergency", group: "Facility & EHS", plantOnly: false },
  { section: "Power backup", group: "Facility & EHS", plantOnly: false },
  { section: "Laboratory safety", group: "Facility & EHS", plantOnly: false },
  { section: "Waste management", group: "Facility & EHS", plantOnly: false },
]

export const scientistSteps = [
  { title: "Professional profile", text: "Designation, institution, research area, TRL and a short research statement", time: "Under 1 min" },
  { title: "Research group", text: "Group name, head scientist, invite members", time: "About 2 min" },
  { title: "Technology & IP", text: "Expertise tags, technologies with TRL, projects, patents, papers", time: "About 5 min" },
  { title: "Lab infrastructure", text: "Equipment and facilities open for collaboration", time: "About 2 min" },
  { title: "Verification", text: "Review and submit for approval", time: "Under 1 min" },
]

export const labStages = [
  { title: "Feasibility", batch: "FB-01", cta: "Mark successful" },
  { title: "Optimization", batch: "OB-07", cta: "Mark golden batch" },
  { title: "Validation", batch: "Run 1–4", cta: "Validation done" },
  { title: "Tech pack", batch: "Data + protocols", cta: "Submit tech pack" },
  { title: "Pilot scale", batch: "Scale-up batches", cta: "Mark complete" },
  { title: "Closure", batch: "Signed document", cta: "Close project" },
]

export const projectTypes = [
  { title: "Open projects", text: "Public R&D opportunities any qualified researcher or CRO can explore and propose on.", tags: ["Search by expertise", "Filter by capability"] },
  { title: "Exclusive projects", text: "Private, capability-matched opportunities sent only to selected researchers.", tags: ["Invite only", "Notification on match"] },
]

export const proposalStages = [
  { title: "Submitted", text: "Approach, feasibility, costing and timelines in one form" },
  { title: "In review", text: "Review stages and Scimplify feedback" },
  { title: "Discussion", text: "Technical and commercial talks (offline)", offline: true },
  { title: "Approved", text: "Approval progress and timeline updates" },
  { title: "PO issued", text: "The opportunity becomes an active project" },
]

/** Reusable patterns, with real microcopy from the PRDs. */
export const patterns = [
  { title: "Autosave everywhere", text: "Progress saves every few seconds, so a dropped session never loses work." },
  { title: "Completion you can see", text: "A live completion % on the dashboard and a tick on every finished section." },
  { title: "Time badges", text: "\"Takes less than 1 minute\" sets expectations and reduces form fatigue." },
  { title: "Search, then select", text: "Any list with more than 5 options becomes type-ahead search with removable chips." },
  { title: "Helpful validation", text: "\"Add at least one license or certification before continuing.\" Errors say what to do next." },
  { title: "Clear empty states", text: "Sections without data show one obvious action, like \"+ Add project\"." },
]

/** PM targets for the profile module. Shown as targets, never as results. */
export const targets = [
  { value: ">90%", label: "profile completion" },
  { value: ">80%", label: "supplier activation" },
  { value: "<20 min", label: "average onboarding time" },
  { value: "<24 h", label: "approval turnaround" },
]

export const screens = [
  "Onboarding dashboard",
  "Scientist onboarding stepper",
  "CRO profile: company and pilot plant",
  "Verification status",
  "Opportunities: open and exclusive",
  "Proposal tracker",
  "Project stages and batches",
  "Batch approval",
]

export const upcoming = [
  { title: "AI tools for researchers", text: "Retrosynthesis AI, literature analysis, patent and publication intelligence, and deep research agents." },
  { title: "Molecule commercialisation", text: "Showcase developed molecules, find partners and open licensing or execution talks." },
  { title: "Market intelligence", text: "Request reports on market trends, molecule demand and commercial potential." },
]

// ---------------- research (from Sathi's research doc, Jun–Jul 2025) ----------------

export const methods = [
  { title: "Stakeholder interviews", note: "2 rounds · 20 questions" },
  { title: "Competitive analysis", note: "10 platforms" },
  { title: "Affinity mapping", note: "Buyers & suppliers" },
  { title: "Empathy maps", note: "Buyers & suppliers" },
  { title: "Personas", note: "Buyer & CRO" },
  { title: "Journey maps", note: "Entice → Extend" },
  { title: "Card sorting", note: "Navigation" },
]

export const synthesis = [
  { title: "Organise", text: "Sorted every interview answer and quote by question." },
  { title: "Code", text: "Tagged recurring statements: chemistry fit, clear RFP inputs, NDA compliance…" },
  { title: "Theme", text: "Grouped the codes into 6 supplier themes." },
  { title: "Jobs to be done", text: "Wrote 8 supplier jobs, each tied to an insight." },
  { title: "Prioritise", text: "Ranked insights high, medium or low by impact." },
  { title: "Decide", text: "Turned each insight into a product decision." },
]

export const quotes = [
  { quote: "Project matching should be insanely good. Don't send peptide projects to someone who does deuterium.", by: "Supplier insight" },
  { quote: "Chemistry is high risk. Chances of losing are more than winning, so they only say yes if they're confident.", by: "Supplier insight" },
  { quote: "I need to know what purity and what reports they want. I can give HPLC, not NMR.", by: "Supplier insight" },
  { quote: "If I gave you 101% purity when you asked for 100%, show that. Showcase my quality and facilities.", by: "Supplier insight" },
  { quote: "It's hard to trust a CRO without knowing their equipment, team strength or prior track record.", by: "Buyer insight" },
  { quote: "We usually send Word or PPT files, then go back and forth for 2 weeks just clarifying.", by: "Buyer insight" },
]

export const themes = [
  { title: "Project fit & evaluation", text: "Suppliers accept only chemistry their lab and team can deliver.", priority: "High" },
  { title: "Proposal & RFP handling", text: "Purity, quantity, timeline and report type must be clear upfront.", priority: "High" },
  { title: "Trust & transparency", text: "Lab, team and past work shown online can replace a site visit.", priority: "High" },
  { title: "Client acquisition", text: "Suppliers market their niche chemistry to win inbound leads.", priority: "Medium" },
  { title: "Payment models", text: "Milestone payments (e.g. 10% advance) keep projects moving.", priority: "Medium" },
  { title: "Project tools", text: "Planning lives in SciFinder and Excel Gantt charts today.", priority: "Low" },
]

/** What buyers check before they trust a researcher: the profile has to answer these. */
export const trustSignals = ["Verified by the platform", "Equipment & infrastructure", "Team strength", "Certifications", "Past projects & purity", "Route-of-synthesis know-how"]

export const competitors = {
  features: ["CRO profiles", "Instant quote", "Project listing", "R&D capabilities", "Equipment display", "Pricing transparency", "Knowledge hub", "NDA & docs", "Buyer–supplier chat", "Video call"],
  rows: [
    { name: "Scinode for Researchers", ours: true, cells: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { name: "Scientist.com", cells: [1, 1, 0.5, 1, 0, 0, 1, 1, 1, 1] },
    { name: "Science Exchange", cells: [1, 1, 0, 1, 0, 0, 1, 1, 1, 1] },
    { name: "Inpart.io", cells: [1, 0, 1, 1, 0, 0, 0, 0, 0, 0] },
    { name: "PharmaOffer", cells: [1, 1, 0, 0, 0, 1, 0, 0, 0, 0] },
    { name: "PharmaCompass", cells: [0.5, 0, 0, 0, 0, 0.5, 1, 0, 0, 0] },
    { name: "India Pharma Hub", cells: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Aragen", cells: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0] },
    { name: "Analytica Chemie", cells: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
    { name: "Skanda Life Sciences", cells: [0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0] },
    { name: "Chemvedals", cells: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
  ],
}

export const empathy: Extract<Block, { type: "empathyMap" }> = {
  type: "empathyMap",
  name: "Supplier: CRO scientist or BD head",
  says: ["We only take on work that fits our chemistry and capabilities.", "Lab videos and team showcases help us stand out.", "We send weekly updates. That's part of trust."],
  thinks: ["Can this project lead to repeat business?", "How do we stand out without a lab visit?", "I hope the buyer is clear upfront, not vague."],
  does: ["Checks chemistry fit, scale-up and commercial sense", "Plans in SciFinder and Gantt charts", "Shares quotes, PI, COA and timelines after the NDA"],
  feels: ["Motivated by clear briefs and milestone payments", "Frustrated by vague RFPs and ghosting", "Undervalued when niche expertise goes unseen"],
  pains: ["Incomplete briefs delay quoting", "Unrealistic asks for the lab's setup", "Competing on price, not capability"],
  gains: ["Upfront clarity on purity, timeline and reports", "Profiles with infra, team and case studies", "Chemistry-tagged project matching"],
}

/** Sathi's supplier journey map (Entice → Extend). */
export const journeyMap = [
  { phase: "Entice", touch: "LinkedIn, email or a referral", delight: "A clear promise: pre-vetted buyer leads", opportunity: "Stories of CROs winning work on the platform" },
  { phase: "Enter", touch: "Website, then sign up", delight: "Easy infra upload and chemistry tagging", opportunity: "Autofill the profile from existing decks" },
  { phase: "Engage", touch: "Onboarding, case studies, NDA, matched projects", delight: "Leads that match their chemistry; infra videos build trust", opportunity: "Smart routing of relevant projects" },
  { phase: "Exit", touch: "Proposal, COA, milestone updates", delight: "Milestone dashboard tied to payments", opportunity: "One-click COA sharing, milestone reminders" },
  { phase: "Extend", touch: "Feedback, impact, repeat invites", delight: "Project portfolio and performance badges", opportunity: "Auto-invites for similar projects" },
]

/** Supplier pain → their suggestion → the design answer (from Sathi's pain point table). */
export const painToDesign = [
  { pain: "Mismatched leads waste CRO time", ask: "Filter leads by chemistry, infra and volume", design: "Chemistry-tag matching, preferred project types and a match score on every project" },
  { pain: "Incomplete briefs from buyers", ask: "Structured fields for buyers", design: "A guided brief with purity %, scale, IP sensitivity and documentation, plus a brief preview" },
  { pain: "Unsure if the buyer is serious", ask: "Show buyer verification", design: "Verified buyer badges with company type and location" },
  { pain: "Rebuilding every proposal from scratch", ask: "Templates and duplication", design: "Reusable proposal templates, versioning and saved documents" },
  { pain: "Scope shifts after the project starts", ask: "Fix milestones at proposal stage", design: "Milestones defined in the proposal, approved digitally, changed only by request" },
  { pain: "Hard to show capabilities", ask: "Upload infra, past projects, certifications", design: "A structured profile: equipment, facility, certifications, walkthrough videos and case studies" },
  { pain: "Manual NDA exchanges slow things down", ask: "Digitise NDA and compliance", design: "Template NDAs, one-click signing and a history per project" },
]

/** Proposal tracker, from the supplier's side. */
export const proposalFlow = [
  { status: "New invitation", text: "Project brief, CAS, scope, budget and deadline", actions: ["View brief", "Accept", "Decline"] },
  { status: "Draft", text: "Milestones, pricing, route of synthesis, documents. Autosaved", actions: ["Edit proposal"] },
  { status: "Submitted", text: "Time stamp, version history and attachments", actions: ["Withdraw", "Message buyer"] },
  { status: "Under review", text: "Buyer questions show as \"Action required\"", actions: ["View messages", "Amend"] },
  { status: "Won", text: "Moves to active projects", actions: ["Start work"], tone: "won" },
  { status: "Not selected", text: "Shows the reason, if shared", actions: ["Improve proposal"], tone: "lost" },
]

/** Colour study: competitors lean blue, so the brand needed its own identity. */
export const colourStudy = {
  competitors: [
    { name: "Scientist.com", hex: "#30499E" },
    { name: "PharmaCompass", hex: "#30499E" },
    { name: "Inpart.io", hex: "#30499E" },
    { name: "India Pharma Hub", hex: "#372A82" },
    { name: "PharmaOffer", hex: "#62AFC0" },
    { name: "Science Exchange", hex: "#9E43DC" },
  ],
  explored: [
    { name: "Pine Green", hex: "#2A4D3D", why: "Plant-based biochemistry, stability" },
    { name: "Graphite Purple", hex: "#4B4453", why: "Carbon structures, academic rigour" },
    { name: "Olive Charcoal", hex: "#3D4F46", why: "Earthy, elemental, applied research" },
    { name: "Gunmetal Teal", hex: "#2E4C52", why: "Lab equipment, analytical sciences" },
    { name: "Ash Indigo", hex: "#394867", why: "Spectroscopy, complex molecules" },
    { name: "Ocean Slate", hex: "#305F72", why: "Solvents, precision instruments" },
  ],
}

// ---------------- research framing ----------------

export const objectives = [
  "Understand how CROs and scientists find work today, and how they decide a project fits their lab.",
  "Learn what information they need upfront to propose with confidence.",
  "Find what builds trust between buyers and researchers without a lab visit.",
  "Map how projects run today: updates, payments, NDAs and the tools they use.",
]

export const hmw = "How might we help researchers show their real capability, get matched to the right chemistry, and run projects without email chains?"

/** Desk research (secondary, quantitative): market estimates collected in the research doc. */
export const market = [
  { label: "Indian CRO market", from: "$2B", to: "$3.01B", cagr: "10.75%" },
  { label: "Global CRO market", from: "$84.08B", to: "$122B", cagr: "9.75%" },
]
export const marketYears = ["2026", "2030"]

export const userGroups = [
  { title: "Suppliers", note: "Our researchers", items: ["CROs", "Scientists", "Contract laboratory services"] },
  { title: "Buyers", note: "Who they work for", items: ["Pharma & chemical companies", "Academic & research institutes", "Medical device & diagnostics", "Government & non-profits", "Big CROs, scientist groups, startups"] },
]

/** Affinity map, supplier side. */
export const affinity = [
  {
    title: "Challenges",
    items: ["Unclear purity, quantity or report expectations", "Projects that don't fit their chemistry or infra", "Hard to show lab strengths to new buyers", "Payment delays and loose terms", "Juggling handoffs across many projects"],
  },
  {
    title: "Needs",
    items: ["Structured RFQ inputs from buyers", "Check feasibility before accepting", "A space to show chemistry, infra, team and past work", "Milestone-based payments (e.g. 10-20-70)", "Timeline and task planning"],
  },
  {
    title: "Behaviours",
    items: ["Accept only work that fits their chemistry and setup", "Send milestone updates and reports to build trust", "Plan batches in SciFinder and Excel", "Avoid proposals with vague specs", "Weigh scale-up potential even on a 2 g trial"],
  },
  {
    title: "Suggestions",
    items: ["Filters for chemistry class and infra capability", "Weekly progress and delivery tracking", "Lab-side timeline and checkpoint tools", "Mandatory brief templates", "Team profiles and lab walkthrough videos"],
  },
]

/** How the design moved from the first concept (Jun–Jul 2025) to what shipped with the PM's specs. */
export const iterations = [
  {
    area: "Profile",
    before: "One long, flat supplier profile. Low completion, missing fields and bugs across tabs.",
    after: "8 guided sections with autosave, a tick per section and a live completion %. Utility renamed Infrastructure; lab safety and waste management folded into Facility & EHS.",
  },
  {
    area: "Relevance",
    before: "Every supplier saw every field, plant or no plant.",
    after: "One pilot plant question in Company profile hides ETP, distillation and filter & dryer for CROs.",
  },
  {
    area: "Testing fixes",
    before: "Equipment couldn't save because every field was mandatory; long dropdowns were hard to scan.",
    after: "Only category and asset type are required; any list over 5 options becomes search and select; errors say what to add.",
  },
  {
    area: "Access",
    before: "Suppliers could register and browse with no checks.",
    after: "Verification gates projects, proposals and AI tools; status shows submitted, changes requested or approved.",
  },
  {
    area: "Scientists",
    before: "Scientists squeezed into the CRO form.",
    after: "Their own 5-step onboarding with time badges, research group invites, TRL and IP portfolio.",
  },
  {
    area: "Execution",
    before: "Early idea: a weekly update module.",
    after: "A stage-gated lab workflow: batches, golden batch, validation runs, approve or retry at every milestone.",
  },
]
