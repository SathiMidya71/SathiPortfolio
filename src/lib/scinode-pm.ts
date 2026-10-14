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
