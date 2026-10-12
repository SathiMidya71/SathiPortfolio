import type { Block } from "@/lib/case-studies/types"

// Scinode for Researchers: one case study for the researcher sign-up and its two user types, CRO and scientist.
// Source: the PM's product brief ("Scinode for Researchers") and the Scimplify product deck, both shared by Sathi.
// Never use the internal codename from the deck; the product is "Scinode for Researchers".
// The deck is marked confidential: its platform numbers, funding and revenue are NOT used until Sathi confirms.
// Personas are proto-personas built from the brief (no user research yet), and are labelled that way.

export type UserKey = "cro" | "scientist"

export const users: Record<UserKey, { name: string; short: string; tint: string; ink: string }> = {
  cro: { name: "CRO", short: "Contract research organisation", tint: "#e4f1eb", ink: "#02594e" },
  scientist: { name: "Scientist", short: "Independent scientist", tint: "#ece9fd", ink: "#5b4fd1" },
}

export const meta = {
  title: "Scinode for Researchers",
  subtitle: "One sign-up, two user types: CROs and scientists",
  overview:
    "Scinode for Researchers is Scimplify's AI-powered workspace where CROs and scientists find verified R&D projects, send proposals and run the work, from sign-up to reporting.",
  role: "Product designer for the researcher sign-up: profile, verification, opportunities, proposals and project management.",
}

/** Scope facts only (counted from the product brief). */
export const glance = [
  { value: "2", label: "user types on one sign-up" },
  { value: "8", label: "stages from profile to reporting" },
  { value: "11", label: "profile fields for matching" },
  { value: "4", label: "modules I designed" },
]

/** Résumé-style highlights in XYZ format. Figures are scope counts from the brief; outcomes wait for real data. */
export const highlights = [
  "Designed one researcher sign-up for 2 user types, CROs and scientists, by mapping a shared 8-stage lifecycle with role-specific profiles and journeys.",
  "Structured researcher profiles into 11 capability fields, enabling capability-based project matching and exclusive invitations.",
  "Built a 4-step verification flow that unlocks projects only after Scimplify approves scientific, compliance and operational checks.",
  "Moved proposal handling from email into the platform, cutting fragmented follow-ups by [metric needed], by designing structured submission and status tracking.",
  "Replaced weekly email updates with one project workspace for progress, reports, experiments and milestones, improving visibility by [metric needed].",
]

export const problem: Extract<Block, { type: "problemSolution" }> = {
  type: "problemSolution",
  problem: {
    text: "R&D work is slow, fragmented and hard to predict. Good researchers stay invisible to the projects that need them.",
    items: [
      { big: "Slow discovery", text: "Finding the right scientific partner takes weeks or months." },
      { big: "Scattered talks", text: "Proposals, updates and decisions move across emails, PDFs and calls." },
      { big: "No visibility", text: "Researchers' capabilities stay under-exposed, and project status lives in weekly emails." },
    ],
  },
  solution: {
    text: "Scinode for Researchers: one verified workspace from discovery to proposal to project execution.",
    chips: ["Profile", "Verification", "Open & exclusive projects", "Proposals", "Project management"],
  },
}

/** Proto-personas, built from the product brief and the supplier value proposition. */
export const personas: Record<
  UserKey,
  /** `brings` uses the exact profile field names, so the field map can highlight them */
  { title: string; who: string; brings: string[]; goals: string[]; frustrations: string[]; needs: string[] }
> = {
  cro: {
    title: "The CRO partner",
    who: "A contract research organisation with a lab team, infrastructure and certifications, running R&D projects for many customers.",
    brings: ["Organisation information", "Team expertise", "Instrumentation and infrastructure", "Certifications and compliance", "Capacity and scale"],
    goals: ["Receive verified, high-value project requests", "Show capabilities to a global audience", "Win proposals with clear scope and timelines"],
    frustrations: ["Time and effort spent on client acquisition", "Proposals lost in long email threads", "Weekly status emails for every project"],
    needs: ["Capability-based matching", "One place to track every proposal", "A shared workspace for running projects"],
  },
  scientist: {
    title: "The independent scientist",
    who: "A researcher with deep expertise in a domain, looking for projects that fit their science and a path to commercialise their work.",
    brings: ["Scientific expertise", "Research domains", "Molecules worked on", "Product categories"],
    goals: ["Find projects aligned to their expertise", "Collaborate with international customers and scientists", "Commercialise developed molecules"],
    frustrations: ["Expertise is hard to discover globally", "Feasibility asks lack structure", "Worries about confidentiality and IP clarity"],
    needs: ["Exclusive, capability-matched invitations", "Secure, NDA-backed collaboration", "Clear proposal and project status"],
  },
}

export type Stage = { key: string; title: string; phase: "Onboard" | "Find" | "Propose" | "Deliver"; cro: string; scientist: string; offline?: string }

/** The shared lifecycle: Profile → Verification → Discovery → Proposal → Tracking → Conversion → Execution → Reporting. */
export const journey: Stage[] = [
  { key: "profile", phase: "Onboard", title: "Sign up & profile", cro: "Adds organisation details, team, infrastructure and certifications.", scientist: "Adds expertise, research domains and molecules worked on." },
  { key: "verify", phase: "Onboard", title: "Verification", cro: "Scimplify verifies the organisation, compliance and capabilities.", scientist: "Scimplify validates scientific capabilities before access opens." },
  { key: "discover", phase: "Find", title: "Find projects", cro: "Browses open projects and gets exclusive invites for its capabilities.", scientist: "Searches projects by expertise and gets alerts for exclusive matches." },
  { key: "propose", phase: "Propose", title: "Send proposal", cro: "Shares feasibility, costing, timelines and capability proof.", scientist: "Shares a scientific approach, timelines and capability proof." },
  { key: "track", phase: "Propose", title: "Track proposal", cro: "Follows status, review stages and Scimplify feedback.", scientist: "Follows status, review stages and Scimplify feedback.", offline: "Technical and commercial talks happen offline" },
  { key: "convert", phase: "Deliver", title: "Become a project", cro: "Receives the PO; the opportunity becomes an active project.", scientist: "Receives the PO; the opportunity becomes an active project." },
  { key: "execute", phase: "Deliver", title: "Run the project", cro: "Adds experiments and batch experiments, milestones and deliverables.", scientist: "Shares experiment updates and keeps the timeline current." },
  { key: "report", phase: "Deliver", title: "Report & collaborate", cro: "Uploads reports; stakeholders see progress without weekly emails.", scientist: "Uploads reports and talks to stakeholders in one place." },
]

/** Profile fields from the brief, grouped. */
export const profileFields = {
  organisation: ["Organisation information", "Team expertise", "Geographic presence", "Capacity and scale", "Certifications and compliance"],
  science: ["Scientific expertise", "Product categories", "Research domains", "Molecules worked on", "R&D and manufacturing capabilities", "Instrumentation and infrastructure"],
  unlocks: ["Capability-based matching", "Exclusive project invitations", "Collaboration discovery", "Partner validation", "Proposal qualification"],
}

export const verificationSteps = [
  { title: "Submit profile", text: "The researcher completes the profile and submits it." },
  { title: "Scimplify review", text: "Scimplify verifies the organisation and scientific capabilities." },
  { title: "Compliance checks", text: "Compliance, capability and operational checks run." },
  { title: "Access unlocked", text: "The profile is approved and projects open up." },
]

export const projectTypes = [
  { title: "Open projects", text: "Public R&D opportunities any qualified researcher or CRO can explore and propose on.", tags: ["Search by expertise", "Filter by capability"] },
  { title: "Exclusive projects", text: "Private, capability-matched opportunities sent only to selected researchers.", tags: ["Invite only", "Notification on match"] },
]

/** Proposal lifecycle as the researcher sees it. */
export const proposalStages = [
  { title: "Submitted", text: "Approach, feasibility, costing and timelines in one form" },
  { title: "In review", text: "Review stages and Scimplify feedback" },
  { title: "Discussion", text: "Technical and commercial talks (offline)", offline: true },
  { title: "Approved", text: "Approval progress and timeline updates" },
  { title: "PO issued", text: "The opportunity becomes an active project" },
]

export const workspace = [
  { title: "Progress", text: "Update project progress and execution timelines" },
  { title: "Experiments", text: "Add experiments and batch experiments" },
  { title: "Reports", text: "Upload scientific reports" },
  { title: "Milestones", text: "Track milestones and deliverables" },
  { title: "Stakeholders", text: "Collaborate and keep communication in one place" },
]

export const decisions = [
  {
    title: "One sign-up, two user types",
    text: "CROs and scientists share one account flow and one lifecycle. The profile adapts to who they are, so each user only fills what describes them.",
    points: ["Shared lifecycle keeps the product simple to build and learn", "Role-specific profile and journey content", "One switch between CRO and scientist across the whole experience"],
  },
  {
    title: "Profile first, because it powers matching",
    text: "The profile is the foundation for matching, invitations and proposal qualification, so I structured it into clear groups instead of one long form.",
    points: ["11 fields in two groups: organisation and science", "Shows what a complete profile unlocks", "Progress saved step by step"],
  },
  {
    title: "Verification before access",
    text: "Every CRO and scientist is verified before they see projects. I made the wait visible, so a pending profile never feels like a dead end.",
    points: ["4 clear steps with status", "Explains what Scimplify checks and why", "Projects unlock the moment the profile is approved"],
  },
  {
    title: "Open and exclusive projects, side by side",
    text: "Researchers explore public projects and receive private, capability-matched invites. Both live in one opportunities view, marked clearly.",
    points: ["Search and filter by expertise and capability", "Exclusive invites stand out and trigger a notification", "Commercial and scientific fit visible before proposing"],
  },
  {
    title: "Proposals in the platform, not in email",
    text: "Submission and tracking moved into one structured flow. Offline technical and commercial talks are shown as a stage, so status never goes dark.",
    points: ["Feasibility, costing, timelines and capability proof in one form", "Status, review stages and feedback in one tracker", "Approval turns into a project with a PO"],
  },
  {
    title: "A project workspace instead of weekly emails",
    text: "Once a proposal is approved, the researcher runs the project in one workspace that replaces separate weekly email updates.",
    points: ["Experiments and batch experiments", "Reports, milestones and deliverables", "Stakeholder communication in one thread"],
  },
]

export const upcoming = [
  { title: "AI tools for researchers", text: "Retrosynthesis AI, literature analysis, patent and publication intelligence, and deep research agents." },
  { title: "Molecule commercialisation", text: "Showcase developed molecules, find partners and open licensing or execution talks." },
  { title: "Market intelligence", text: "Request reports on market trends, molecule demand and commercial potential." },
]
