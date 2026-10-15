// Project management module (internal R&D projects) of Scinode for Researchers, from the PM's PRD.
// Publishing rules: no internal system names (the leadership system is "Leadership dashboard", the admin
// system is "Admin portal"), no colleagues' names (roles only), no costing formula, no design links.
// Success metrics are the PM's TARGETS, never results; impact lines keep [metric needed] until Sathi has data.

export const pmFacts = [
  { n: "3", label: "Portals connected" },
  { n: "6", label: "User roles" },
  { n: "6", label: "Project stages" },
  { n: "8", label: "Hand-offs in paper costing" },
]

export const pmContext =
  "When leadership hands a project to the internal R&D team, the work moves through three tools and six roles: leadership assigns it, admins plan and approve it, and group leaders, chemists and procurement run it in the lab. I designed how one project travels across all three, so everyone sees the same truth."

export const pmProblems = [
  { title: "Data silos", text: "Project data lived in separate systems that didn't talk to each other." },
  { title: "Manual tracking", text: "Progress, costs and documents moved by email and spreadsheets." },
  { title: "Little visibility", text: "Leadership couldn't see R&D progress or cost without asking." },
]

/** The three surfaces and who uses each. */
export const pmSurfaces = [
  { key: "lead", name: "Leadership dashboard", roles: ["Leadership"], job: "Assigns projects to R&D and sees the whole pipeline" },
  { key: "admin", name: "Admin portal", roles: ["Super admin", "Project manager"], job: "Plans, assigns, checks costs and approves stages" },
  { key: "res", name: "Scinode for Researchers", roles: ["Group leader", "Chemist", "Procurement head"], job: "Runs the lab work, adds data, prices and files" },
] as const

/** Role-based access, from the PRD's technical considerations. 1 = yes, 0.5 = limited, 0 = no */
export const pmActions = ["View progress", "Create & edit project", "Assign work", "Update stage data", "Upload files", "Comment", "Approve"]
export const pmRoles = [
  { role: "Leadership", surface: "lead", cells: [1, 0, 1, 0, 0, 0, 0] },
  { role: "Super admin", surface: "admin", cells: [1, 1, 1, 0, 1, 1, 1] },
  { role: "Project manager", surface: "admin", cells: [1, 1, 1, 0.5, 1, 1, 0] },
  { role: "Group leader", surface: "res", cells: [1, 0, 1, 1, 1, 1, 0] },
  { role: "Procurement head", surface: "res", cells: [1, 0, 1, 1, 1, 0, 0] },
  { role: "Chemist", surface: "res", cells: [1, 0, 0, 0.5, 0, 0, 0] },
] as const

/** Paper costing: the multi-user hand-off, step by step (lane = role). */
export const pmCosting = [
  { lane: "Super admin", text: ["Upload raw material", "sheet + target prices"] },
  { lane: "Group leader", text: ["Assign to", "procurement"] },
  { lane: "Procurement head", text: ["Add actual", "market prices"] },
  { lane: "Project manager", text: ["Validate", "the prices"] },
  { lane: "Group leader", text: ["Add reactor &", "job-work charges"] },
  { lane: "Group leader", text: ["Add analytical", "costs"] },
  { lane: "Project manager", text: ["Compile the", "final cost"] },
  { lane: "Super admin", text: ["Approve", "(optional PI upload)"] },
] as const
export const pmLanes = ["Super admin", "Project manager", "Group leader", "Procurement head"] as const

/**
 * Phase 2 (from Sathi's "IONS Experiment Flow" chart): from costing synced to project completed.
 * The group leader runs feasibility, optimisation and validation in IONS; the project manager approves
 * every hand-off from the super admin portal. Steps continue the costing numbering (9–21).
 */
export const pmExperimentPhases = ["Kick-off", "Lab-scale feasibility", "Process optimisation", "Process validation"] as const
export const pmExperiment: readonly {
  n?: number
  lane: "Super admin" | "Group leader" | "Leadership dashboard"
  text: readonly string[]
  sub?: string
  gate?: boolean
  dark?: boolean
  phase: number
}[] = [
  { lane: "Leadership dashboard", text: ["Costing synced"], sub: "end of phase 1", dark: true, phase: 0 },
  { n: 9, lane: "Super admin", text: ["Mark experiment as", "started, tag the GL"], phase: 0 },
  { n: 10, lane: "Group leader", text: ["Accept the task"], sub: "day 1", phase: 0 },
  { n: 11, lane: "Group leader", text: ["Run feasibility", "experiments"], sub: "stages in parallel or one by one", phase: 1 },
  { n: 12, lane: "Group leader", text: ["Create a batch and", "fill in the run data"], sub: "one batch per run", phase: 1 },
  { n: 13, lane: "Group leader", text: ["Mark batches for", "optimisation"], sub: "then close feasibility", phase: 1 },
  { n: 14, lane: "Super admin", text: ["Review marked", "batches"], gate: true, phase: 1 },
  { n: 15, lane: "Group leader", text: ["Optimise each parent", "batch with children"], sub: "Feasibility 1 → Optimisation 15", phase: 2 },
  { n: 16, lane: "Group leader", text: ["Mark one", "golden batch"], sub: "remarks required", phase: 2 },
  { n: 17, lane: "Super admin", text: ["Review the", "golden batch"], gate: true, phase: 2 },
  { n: 18, lane: "Group leader", text: ["Run validation on", "the golden batch"], sub: "up to 6 runs, stop early", phase: 3 },
  { n: 19, lane: "Group leader", text: ["Send validation", "for approval"], sub: "remarks required", phase: 3 },
  { n: 20, lane: "Super admin", text: ["Approve", "validation"], gate: true, phase: 3 },
  { n: 21, lane: "Super admin", text: ["Close project", "as Completed"], phase: 3 },
  { lane: "Leadership dashboard", text: ["Project completed"], sub: "synced for leadership", dark: true, phase: 3 },
]

/** The six stages of an internal R&D project. */
export const pmStages = [
  { name: "Paper costing", phase: "Evaluation", note: "Costs gathered across roles and approved" },
  { name: "Lab-scale feasibility", phase: "Execution", note: "Group leader adds chemists and batches" },
  { name: "Optimization", phase: "Execution", note: "Pick batches, add remarks and files" },
  { name: "Validation", phase: "Execution", note: "Choose which stage or batch to validate" },
  { name: "Pilot scale", phase: "Execution", note: "Same structure as earlier stages" },
  { name: "Project closure", phase: "Execution", note: "Signed document; summary sent to leadership" },
]
export const pmEveryStage = ["Remarks & rationale", "Attachments (Doc, Excel, PDF)", "Full history", "Assignee & notifications"]

/** What the project list shows, grouped. */
export const pmFields = [
  { group: "Identity", items: ["Project code", "Project name", "Source (CRM, BU, MI)"] },
  { group: "People", items: ["Project manager", "Current assignee"] },
  { group: "Progress", items: ["Current stage", "Project status", "Live yield from the lab"] },
  { group: "Cost", items: ["Project expense"] },
  { group: "Time", items: ["Target start & finish", "Actual start & finish"] },
]

export const pmCollab = [
  { title: "Comments in the stage", text: "Admins, PMs and group leaders talk inside the stage, not over email." },
  { title: "A notification for every hand-off", text: "Each assignment or upload tells the next person it's their turn." },
  { title: "Versioned history", text: "Every update and comment is kept and visible to the super admin." },
]

/** Design decisions drawn from the PRD; screens come from Sathi. */
export const pmDecisions = [
  { title: "One project, three views", text: "Each role sees the same project in the tool they already use, with only the actions they're allowed." },
  { title: "Always know whose turn it is", text: "\"Current assignee\" is on every project and every stage, so hand-offs never get lost." },
  { title: "One stage template, six times", text: "Remarks, files, history and assignee work the same in every stage, so people learn it once." },
  { title: "Status that updates itself", text: "Dates set \"On track\" or \"Delayed\" automatically; only admins can put a project on hold, with a reason." },
]

/** The PM's success targets (not results). */
export const pmTargets = [
  { value: 100, unit: "%", label: "Sync between systems without manual work" },
  { value: 60, unit: "%", label: "Less manual coordination", prefix: "≥" },
  { value: 1, unit: "h", label: "Lag for leadership to see progress", prefix: "<" },
  { value: 48, unit: "h", label: "Average time to assign or approve in paper costing", prefix: "<" },
  { value: 80, unit: "%", label: "Active projects using comments", prefix: "≥" },
]

/** ATS-friendly impact lines (XYZ). Y stays a placeholder until there are real results. */
export const pmImpact = [
  "Designed a role-based project workspace connecting 3 portals for 6 user roles, as measured by [metric needed], by mapping every hand-off from leadership assignment to project closure.",
  "Turned an 8-step, 4-role paper-costing process into one guided hand-off flow, as measured by [metric needed], by making the current assignee and next action visible at every step.",
  "Standardised 6 R&D stages into one reusable stage template, as measured by [metric needed], by giving every stage the same remarks, files, history and notifications.",
]

/** Key screens of the internal project flow, captured from Sathi's product recording (Oct 2026). */
const pmScreenDir = "/case-studies/scinode/modules/project-management/screens"
export const pmScreens = [
  { src: `${pmScreenDir}/01-projects.jpg`, title: "Internal projects", caption: "Every internal project in one list, with costs, dates and status." },
  { src: `${pmScreenDir}/02-overview.jpg`, title: "Project overview", caption: "Ownership, timeline, budget and overall completion at a glance." },
  { src: `${pmScreenDir}/03-paper-costing.jpg`, title: "Paper costing", caption: "Raw material sheets and costs gathered across roles before lab work starts." },
  { src: `${pmScreenDir}/04-feasibility-batches.jpg`, title: "Lab-scale feasibility", caption: "Each lab run is a batch, tracked stage by stage in the Experiment Workspace." },
  { src: `${pmScreenDir}/05-create-batch.jpg`, title: "Create a batch", caption: "A guided batch form that flags missing fields before it can be saved." },
  { src: `${pmScreenDir}/06-select-raw-materials.jpg`, title: "Select raw materials", caption: "Raw materials come from the costing sheet and are added to the batch." },
  { src: `${pmScreenDir}/07-mark-for-optimisation.jpg`, title: "Mark for optimisation", caption: "The group leader picks the batches worth optimising." },
  { src: `${pmScreenDir}/08-optimisation.jpg`, title: "Process optimisation", caption: "Every optimisation batch sits under its parent feasibility batch." },
  { src: `${pmScreenDir}/09-batch-details.jpg`, title: "Batch details", caption: "Results, files and the admin's remarks on one batch." },
  { src: `${pmScreenDir}/10-tech-pack.jpg`, title: "Tech pack", caption: "The final tech pack: product data, structure and description." },
] as const
