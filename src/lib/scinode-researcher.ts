// Scinode for Researchers: ONE research-led UX case study for CROs and scientists.
// The two user types share every use case (verify, find projects, propose, run projects); only the PROFILE
// differs. So there is no CRO/Scientist switch: the difference is shown once, as "same use cases, different profile".
// Sources (all shared by Sathi): her research doc (Jun–Jul 2025, the first concept) and the PM's later docs
// (brief, deck, Scientist Onboarding PRD, Supplier Profile V2 PRD, R&D project flow PRD).
// Writing rules (Sathi): short, visual, no résumé-style bullet lists; say "CROs and scientists", never "supplier";
// no buyer research on this page. NEVER publish the internal product codename, colleagues' names or emails,
// internal system names, costing formulas, the deck's confidential numbers or competitor screenshots.
// The scientist persona is a proto-persona (labelled). PM success metrics are targets, never results.

export const meta = {
  title: "Scinode for Researchers",
  subtitle: "Designing one R&D platform for CROs and scientists",
  overview:
    "An AI-powered platform where CROs and scientists show what their labs can do, win verified R&D projects and run them, from sign-up to closure.",
  role: "Product designer: research, flows, UX and UI across all five modules.",
  timeline: "Research Jun–Jul 2025, then design and delivery",
}

/** Editorial overview (style reference from Sathi): a big statement mixing plain words and italic serif words,
 *  with pastel icon bubbles on some of them, then a "Label / value" list and a short paragraph. */
export const overview = {
  title: ["One R&D platform for", "CROs & scientists"],
  statement: [
    { t: "We help labs " },
    { t: "show their science", em: true, bubble: "lab" },
    { t: ", get " },
    { t: "matched by chemistry", em: true, bubble: "match" },
    { t: ", and run every project in " },
    { t: "one place", em: true, bubble: "flow" },
    { t: "." },
  ],
  facts: [
    { label: "Company", value: "Scimplify" },
    { label: "Users", value: "CROs & scientists" },
    { label: "Role", value: "Product designer" },
    { label: "Year", value: "2025" },
  ],
  text: "Scinode for Researchers is an AI-powered R&D platform. CROs and scientists build a verified profile, find projects that fit their chemistry, send proposals and run the work, from sign-up to closure.",
} as const

/** Problem & solution as three overlapping circles (Sathi's style reference); her three original problems. */
export const problemPair = {
  problems: [
    { title: "Invisible", text: "Labs couldn't show their equipment, team or past work online." },
    { title: "Mismatched", text: "Projects arrived that didn't fit the lab's chemistry." },
    { title: "Scattered", text: "Briefs, updates and files lived in email threads." },
  ],
  solution: "Scinode for Researchers gives every lab a verified profile, matches projects by chemistry, and runs proposals and projects in one workspace.",
}

export const objectives = [
  { title: "Finding work", text: "How do CROs and scientists find projects today?" },
  { title: "Judging fit", text: "How do they decide a project fits their lab?" },
  { title: "Building trust", text: "What makes a buyer trust a lab it has never visited?" },
  { title: "Running projects", text: "How do updates, NDAs and payments work today?" },
]

export const hmw = "How might we help CROs and scientists show what their labs can really do, get matched to the right chemistry and run projects in one place?"

/** Research methods, drawn as concentric arcs (Sathi's style reference). `detail` runs along each arc. */
export const methods = [
  { title: "Interviews", note: "2 rounds, 20 questions", detail: "2 rounds · 20 questions · CROs & scientists" },
  { title: "Competitive analysis", note: "10 platforms", detail: "10 platforms · 10 features · Gaps" },
  { title: "Affinity mapping", note: "Grouped findings", detail: "Challenges · Needs · Behaviours · Ideas" },
  { title: "Empathy map", note: "Says, thinks, does, feels", detail: "Says · Thinks · Does · Feels" },
  { title: "Personas", note: "CRO and scientist", detail: "CRO persona · Scientist proto-persona" },
  { title: "Journey map", note: "Discover to execute", detail: "Discover · Evaluate · Collaborate · Execute" },
  { title: "Card sorting", note: "Navigation", detail: "Grouping the navigation" },
]

/** User research visual (radial infographic, Sathi's style reference). Real figures only, from her research doc. */
export const researchStats = [
  { value: "98%", text: "Purity CROs and scientists are asked to hit. They need it in the brief before they can quote.", source: "From interviews" },
  { value: "10%", text: "Advance CROs ask for before they start. Milestone payments keep projects moving.", source: "From interviews" },
  { value: "0/10", text: "Competing platforms showed a lab's equipment, the thing labs most want to show.", source: "From competitive analysis" },
]
export const researchNeeds = ["Match by chemistry", "Clear briefs upfront", "Show the lab", "Track milestones"]

/** What CROs and scientists told us: one insight, one quote, one design answer. */
export const insights = [
  {
    title: "Only the right chemistry",
    quote: "Project matching should be insanely good. Don't send peptide projects to someone who does deuterium.",
    design: "Chemistry-tag matching with a fit score",
  },
  {
    title: "Yes only when confident",
    quote: "Chemistry is high risk. They only say yes if they're confident.",
    design: "A brief preview before they accept",
  },
  {
    title: "Tell us exactly what you need",
    quote: "I need to know what purity and what reports they want. I can give HPLC, not NMR.",
    design: "Purity, scale and report type upfront",
  },
  {
    title: "Show our lab, not a brochure",
    quote: "If I gave you 101% purity when you asked for 100%, show that. Showcase my quality and facilities.",
    design: "Profiles with equipment, facility and past work",
  },
  {
    title: "Updates build trust",
    quote: "We send weekly updates. That's part of trust.",
    design: "Milestones tracked in one workspace",
  },
]

export const competitors = {
  features: ["CRO profiles", "Instant quote", "Project listing", "R&D capabilities", "Equipment display", "Pricing transparency", "Knowledge hub", "NDA & docs", "Chat", "Video call"],
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

export const affinity = [
  { title: "Challenges", items: ["Vague purity or report asks", "Projects outside their chemistry", "Hard to show lab strengths", "Late payments, loose terms"] },
  { title: "Needs", items: ["Clear, structured briefs", "Check feasibility first", "A space to show infra and team", "Milestone-based payments"] },
  { title: "Behaviours", items: ["Accept only work that fits", "Send weekly milestone updates", "Plan batches in SciFinder and Excel", "Weigh scale-up even on a 2 g trial"] },
  { title: "Ideas", items: ["Filters for chemistry and infra", "Progress tracking on the platform", "Lab walkthrough videos", "Brief templates"] },
]

export const empathy = {
  says: ["We only take on work that fits our chemistry.", "Lab videos help us stand out."],
  thinks: ["Can this lead to repeat business?", "How do we stand out without a lab visit?"],
  does: ["Checks chemistry fit and scale-up", "Plans in SciFinder and Gantt charts"],
  feels: ["Frustrated by vague briefs", "Undervalued when expertise goes unseen"],
  pains: ["Incomplete briefs", "Competing on price, not capability"],
  gains: ["Clear briefs upfront", "Profiles that show real capability"],
}

export const personas = [
  {
    key: "cro",
    label: "CRO",
    name: "Dr. Rajeev Iyer",
    role: "Scientific Director & BD Lead, custom synthesis CRO",
    facts: ["15+ years", "30-member CRO", "Heterocyclic chemistry"],
    source: "Persona from my research",
    goals: ["Win projects that fit his chemistry", "Turn trial batches into scale-ups", "Show his lab without site visits"],
    pains: ["Vague briefs", "Asked for tests his lab can't run", "Competing on price"],
    // quote from the CRO interviews (also in `insights`); the words in `highlight` are coloured
    quote: "If I gave you 101% purity when you asked for 100%, show that. Showcase my quality and facilities.",
    highlight: ["show that", "my quality and facilities"],
    quoteSource: "From the CRO interviews",
    about:
      "Rajeev runs science and business development at a 30-member CRO focused on heterocyclic chemistry and new chemical entities. He screens projects for chemistry fit, sends quotes after the NDA, and shares weekly progress updates and COAs at each milestone.",
    needs: ["Briefs with purity, reports and scale", "Leads tagged by chemistry", "A lab showcase: team, videos, case studies", "Milestone payments and one update dashboard"],
    tools: ["Gantt charts", "SciFinder"],
    profileSize: { n: 8, unit: "profile sections" },
  },
  {
    key: "scientist",
    label: "Scientist",
    name: "The research scientist",
    role: "Leads a research group at an institution",
    facts: ["Publications & patents", "Research group", "Technologies at different TRLs"],
    source: "Proto-persona from the research and the onboarding requirements",
    goals: ["Show research and IP to industry", "Find projects that match expertise", "Bring the group onto the platform"],
    pains: ["Re-typing what's on Google Scholar", "Long forms, easy to abandon", "Worries about IP"],
    // no scientist interviews yet, so a goal statement instead of a quote
    quote: "Show the group's research and IP to industry, without re-typing what is already online.",
    highlight: ["research and IP", "without re-typing"],
    quoteSource: "Proto-persona: main goal, not an interview quote",
    about:
      "Heads a research group at an institution, with publications, patents and technologies at different readiness levels. Wants industry partners to find that work and the team behind it, in a profile that takes minutes, not an afternoon.",
    needs: ["Publications filled from Google Scholar and ORCID", "Time badges on every step", "Auto-save between steps", "Invite the research group"],
    tools: ["Google Scholar", "ORCID", "LinkedIn"],
    profileSize: { n: 5, unit: "onboarding steps" },
  },
] as const

/** The same use cases for both; only the profile is different. */
export const shared = ["Get verified", "Find projects", "Send proposals", "Run projects"]
export const profiles = {
  cro: ["Company profile", "Products", "Licenses & certifications", "Services & capabilities", "Equipment", "Facility & EHS", "Infrastructure", "Terms"],
  scientist: ["Professional profile", "Research group", "Technology & IP", "Lab infrastructure", "Verification"],
}

/** User journey map in the shape of the platform workflow (Discover → Execute), from the CRO and scientist side.
 *  The workflow slide's figures (experts, capabilities, partners) are confidential and NOT used. */
export const journeyMap = [
  { stage: "Discover", headline: "Find projects that fit.", points: ["Open projects and exclusive invites", "Matched by chemistry and capability", "A clear brief before you commit"] },
  { stage: "Evaluate", headline: "Say yes with confidence.", points: ["Purity, scale and reports upfront", "Check feasibility before accepting", "Compete on fit, not only price"] },
  { stage: "Collaborate", headline: "One secure workspace.", points: ["NDA-backed sharing", "Documents and data in one place", "Questions answered without email chains"] },
  { stage: "Manage", headline: "Every project at a glance.", points: ["Proposal and project status", "Milestones and timelines", "Version-controlled files"] },
  { stage: "Execute", headline: "From lab batch to scale-up.", points: ["Batches, approvals and history", "Reports, COAs and spectra per stage", "No context lost between stages"] },
]

/** Platform architecture: one flow, with the profile split by user type. */
export const flow = [
  { title: "Sign up", items: ["Account", "Email verification"] },
  { title: "Profile", items: [], split: true },
  { title: "Verification", items: ["Submit for review", "Approved or changes requested"] },
  { title: "Opportunities", items: ["Open projects", "Exclusive invites"], locked: true },
  { title: "Proposals", items: ["Submit", "Track status"], locked: true },
  { title: "Projects", items: ["Feasibility to closure", "Batches and approvals"], locked: true },
  { title: "Project management", items: ["Add experiments", "Run batch experiments", "Track every project"], locked: true },
]

/** Key design decisions: one line each; the screens come from Sathi. */
export const decisions = [
  { title: "One platform, two profiles", text: "CROs fill 8 short sections; scientists follow 5 timed steps. Everything after the profile is shared." },
  { title: "A profile that adapts", text: "One question, \"Do you have a pilot plant?\", hides the sections a CRO doesn't need." },
  { title: "Verified before access", text: "Projects and proposals unlock only after approval, with a clear status while you wait." },
  { title: "Matched by chemistry", text: "Every project shows its fit and a brief preview before a lab commits." },
  { title: "Proposals you can track", text: "From invitation to won, each step shows what to do next." },
  { title: "Lab work in one workspace", text: "Six gated stages, batch by batch, approve or retry, with full history." },
]

export const pilotLogic = [
  { section: "Lab equipment", group: "Equipment", plantOnly: false },
  { section: "Distillation equipment", group: "Equipment", plantOnly: true },
  { section: "Filter & dryer", group: "Equipment", plantOnly: true },
  { section: "Other equipment", group: "Equipment", plantOnly: false },
  { section: "ETP (effluent treatment)", group: "Facility & EHS", plantOnly: true },
  { section: "Clean room", group: "Facility & EHS", plantOnly: false },
  { section: "Fire & emergency", group: "Facility & EHS", plantOnly: false },
  { section: "Laboratory safety", group: "Facility & EHS", plantOnly: false },
]

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
    { name: "Pine Green", hex: "#2A4D3D", why: "Biochemistry, stability" },
    { name: "Graphite Purple", hex: "#4B4453", why: "Carbon, academic rigour" },
    { name: "Olive Charcoal", hex: "#3D4F46", why: "Applied research" },
    { name: "Gunmetal Teal", hex: "#2E4C52", why: "Lab equipment" },
    { name: "Ash Indigo", hex: "#394867", why: "Spectroscopy" },
    { name: "Ocean Slate", hex: "#305F72", why: "Precision instruments" },
  ],
}

/** PM targets for the profile module. Shown as targets, never as results. */
export const targets = [
  { value: 90, suffix: "%", prefix: ">", label: "profile completion" },
  { value: 80, suffix: "%", prefix: ">", label: "activation after sign-up" },
  { value: 20, suffix: " min", prefix: "<", label: "to onboard" },
  { value: 24, suffix: " h", prefix: "<", label: "to approve a profile" },
]

/** How the design evolved: first concept (research, Jun–Jul 2025) → what shipped after iterations. */
export const evolution = [
  { area: "Profile", before: "One long, flat form", after: "8 guided sections with autosave and a live completion %" },
  { area: "Relevance", before: "Every lab saw every field", after: "A pilot plant question hides what doesn't apply" },
  { area: "Forms", before: "Every equipment field required", after: "Only 2 required; long lists become search" },
  { area: "Access", before: "Browse with no checks", after: "Verification unlocks projects and proposals" },
  { area: "Scientists", before: "Squeezed into the CRO form", after: "Their own 5 timed steps" },
  { area: "Execution", before: "A weekly update module", after: "Stage-gated lab workflow with approvals" },
]

export const upcoming = [
  { title: "AI tools", text: "Retrosynthesis, literature and patent intelligence." },
  { title: "Molecule commercialisation", text: "Showcase molecules and find partners." },
  { title: "Market intelligence", text: "Reports on demand and commercial potential." },
]

/** Modules I designed: each gets its own short case study at /work/scinode/researcher/<slug>.
 *  Real content only (interview quotes, the problems, the PM's docs); everything Sathi still has to send
 *  (module research, screens, walkthrough video, results) shows as a clearly marked placeholder. */
export type ResearcherModule = {
  slug: string
  title: string
  tagline: string
  problem: string
  quotes: readonly string[]
  /** draft flow of the module, to confirm with Sathi */
  steps: readonly string[]
  /** indexes into `decisions` */
  decisionIdx: readonly number[]
  extraDecisions?: readonly { title: string; text: string }[]
}

export const modules: readonly ResearcherModule[] = [
  {
    slug: "profile-onboarding",
    title: "Profile & onboarding",
    tagline: "One sign-up, two profiles: CROs fill 8 short sections, scientists follow 5 timed steps.",
    problem: "Labs couldn't show their equipment, team or past work online, so every new partner started with emails and site visits.",
    quotes: ["If I gave you 101% purity when you asked for 100%, show that. Showcase my quality and facilities."],
    steps: ["Sign up", "CRO or scientist?", "Build the profile", "Submit for review", "Approved or changes requested"],
    decisionIdx: [0, 1, 2],
    extraDecisions: [{ title: "Forms that respect time", text: "Time badges on every step and auto-save between steps, so a long profile never feels endless." }],
  },
  {
    slug: "opportunities",
    title: "Opportunities",
    tagline: "Projects matched by chemistry, with a clear brief before a lab commits.",
    problem: "Projects arrived that didn't fit the lab's chemistry, and labs had to say yes before they knew what was really needed.",
    quotes: ["Project matching should be insanely good. Don't send peptide projects to someone who does deuterium.", "Chemistry is high risk. They only say yes if they're confident."],
    steps: ["Open projects & exclusive invites", "Brief preview", "Check the fit", "Decide to propose"],
    decisionIdx: [3],
  },
  {
    slug: "proposals",
    title: "Proposals",
    tagline: "From invitation to won, each step shows what to do next.",
    problem: "Briefs, quotes and follow-ups lived in email threads, so labs lost track of what they had sent and where it stood.",
    quotes: ["I need to know what purity and what reports they want. I can give HPLC, not NMR."],
    steps: ["Invitation", "Prepare the proposal", "Submit", "Track status", "Won or not won"],
    decisionIdx: [4],
  },
  {
    slug: "project-management",
    title: "Project management",
    tagline: "Experiments and batch experiments for every project, tracked in one workspace.",
    problem: "Updates, reports and files for a running project were scattered, so context was lost between stages.",
    quotes: ["We send weekly updates. That's part of trust."],
    steps: ["Project won", "Add experiments", "Run batch experiments", "Approve or retry", "Track every project"],
    decisionIdx: [5],
  },
]

export const getModule = (slug: string) => modules.find((m) => m.slug === slug)
