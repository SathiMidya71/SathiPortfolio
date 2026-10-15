// All site copy lives here so content can be edited without touching components.

export const profile = {
  name: "Sathi Midya",
  firstName: "Sathi",
  role: "Product Designer",
  location: "Bangalore",
  email: "virgosathi71@gmail.com",
  photo: "/sathi.jpg",
  resume: "/Sathi_Midya_Resume.pdf",
  status: "Open to Product Design roles · Bangalore",
  links: {
    linkedin: "https://linkedin.com/in/sathimidya",
    behance: "https://behance.net/virgosathi0041",
    github: "https://github.com/SathiMidya71",
    instagram: "", // add the Instagram profile URL to show it on the site
  },
  /** Shown on hover over the Instagram sticker in the journal, e.g. "@sathi.designs" */
  instagramHandle: "",
}

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Principles", href: "/#principles" },
]

// "Principles that guide my work" (after the journal). Hover or tap a principle to see its three pointers.
export const principles = {
  title: "Principles that guide my work",
  items: [
    { title: "Business first", notes: ["Users", "Business", "Impact"] },
    { title: "Research based", notes: ["Discovery", "Data", "Insights"] },
    { title: "System thinking", notes: ["Standards", "Systems", "Speed"] },
    { title: "Impact driven", notes: ["Measure", "Learn", "Improve"] },
  ],
}

// Fanned cards under the hero intro. The "video" card shows `heroVideo` once it exists.
export const heroVideo = "" // e.g. "/intro.mp4" (place the file in /public)

export type HeroCard =
  | { kind: "video" }
  | {
      kind: "card"
      title: string
      text: string
      cta: string
      href: string
      color: string
      external?: boolean
    }

export const heroCards: HeroCard[] = [
  {
    kind: "card",
    title: "Recent work",
    text: "See how I turn complex enterprise workflows into products people adopt.",
    cta: "Read Case Studies",
    href: "#work",
    color: "#ffd6ae",
  },
  { kind: "video" },
  {
    kind: "card",
    title: "Visual explorations",
    text: "UI concepts, dashboards and visual design experiments I share on Behance.",
    cta: "View My Behance",
    href: "https://behance.net/virgosathi0041",
    color: "#d9d6fe",
    external: true,
  },
  {
    kind: "card",
    title: "How I work",
    text: "Research first: interviews, usability tests and A/B experiments behind every decision.",
    cta: "See My Process",
    href: "#skills",
    color: "#b2ddff",
  },
]

// "About me" journal, below the case studies
export const journal = {
  experienceYears: "9+ years", // from the résumé: 9+ years total experience
  today: "Designing GenAI tools for chemists at Scimplify, and building them in code with Claude Code.",
}

export const about = {
  eyebrow: "A bit about me",
  headline: ["Research is how I listen.", "Design is how I answer."],
  body: "I started out designing fashion accessories in Bangalore and Milan, where I learned to sketch, prototype and obsess over details. Today I bring that same maker's mindset to digital products. I work side by side with PMs and engineers so that every screen is grounded in real user insight and tied to a business outcome.",
}

export type CaseStudy = {
  slug: string
  year: string
  title: string
  summary: string
  result: string
  tags: string[]
  cover: string // CSS background, shown behind the image (or alone until one is added)
  image?: { src: string; alt: string }
  /** Link to the full case study page */
  href?: string
  /** Logo shown instead of the year label; links to the website when `href` is set */
  logo?: { src: string; alt: string; width: number; height: number; href?: string }
  locked?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "deep-research",
    year: "Scimplify",
    title: "SCINODE Deep Research",
    summary: "Designing a GenAI product: a research workspace that takes chemists from a question to an evidence-backed decision.",
    result: "New GenAI product, concept to launch · end-to-end UX · design to code",
    tags: ["GenAI", "AI UX", "Product launch"],
    cover: "#f9f4ed",
    image: { src: "/case-studies/deep-research/thumb-purple-v2.jpg", alt: "SCINODE Deep Research home screen on a touchscreen monitor, on a deep purple backdrop with the words Deep Research behind it" },
    href: "/work/deep-research",
    // product logo; no public link yet, so no URL is shown
    logo: { src: "/logos/scinode-deep-research.svg", alt: "SCINODE Deep Research", width: 3699, height: 558 },
  },
  {
    slug: "scinode",
    year: "Scimplify",
    title: "SCINODE R&D Opportunity Platform",
    summary: "One ecosystem, three portals: customers raise R&D needs, the admin team orchestrates them, suppliers propose and deliver. The modules I designed end to end.",
    result: "3 connected portals · customer CVP + the whole supplier side · 4 user types",
    tags: ["B2B SaaS", "Ecosystem", "Chemistry R&D"],
    cover: "linear-gradient(135deg,#21463a,#0f1f19)",
    // render of the SCINODE hero (Option A · network), cropped to the card's 16:11
    image: { src: "/case-studies/scinode/scinode-thumb.jpg", alt: "SCINODE ecosystem: Customer, Business & admin and Supplier portals linked through the SCINODE core" },
    href: "/work/scinode",
  },
  {
    slug: "biwaze-vent",
    year: "ABM Respiratory Care",
    title: "BiWaze Vent Ventilator UI",
    summary: "A touchscreen interface for a life-support ventilator, designed so clinicians can read critical values and act fast.",
    result: "↓ ~30% user errors · ↓ ~25% dev time · 70+ screens",
    tags: ["Healthcare", "Medical device"],
    cover: "#000229",
    image: { src: "/case-studies/biwaze-vent/cover.jpg", alt: "BiWaze Vent: A Mechanical Ventilator, UI/UX case study cover" },
    href: "/work/biwaze-vent",
    logo: {
      src: "/logos/abm.png",
      alt: "ABM Respiratory Care",
      width: 200,
      height: 106,
      href: "https://abmrc.com/",
    },
  },
  {
    slug: "arc-connect-app",
    year: "ABM Respiratory Care",
    title: "Arc Connect Lung Health App",
    summary: "A mobile app that connects patients, caregivers and clinicians around lung therapy, with friendly illustration and motion.",
    result: "35 screens · 4 core areas · illustration & motion",
    tags: ["Healthcare", "Mobile app"],
    cover: "#eef6f2",
    image: { src: "/case-studies/arc-connect-app/hero.jpg", alt: "Arc Connect app screens" },
    href: "/work/arc-connect-app",
    logo: {
      src: "/logos/abm.png",
      alt: "ABM Respiratory Care",
      width: 200,
      height: 106,
      href: "https://abmrc.com/",
    },
  },
  {
    slug: "arc-connect-portal",
    year: "ABM Respiratory Care",
    title: "Arc Connect Web Portal",
    summary: "A web portal that helps care teams manage lung therapy patients by exception, so the patients who need attention come first.",
    result: "11 key screens · dashboard to medical record · alert rules per care site",
    tags: ["Healthcare", "Web portal"],
    cover: "#1366de",
    image: { src: "/case-studies/arc-connect-portal/hero-v2.jpg", alt: "Arc Connect Portal screens around a laptop on a blue background" },
    href: "/work/arc-connect-portal",
    logo: {
      src: "/logos/abm.png",
      alt: "ABM Respiratory Care",
      width: 200,
      height: 106,
      href: "https://abmrc.com/",
    },
  },
  {
    slug: "rnd-visibility-dashboard",
    year: "2025",
    title: "R&D Visibility Dashboard",
    summary: "A role-based dashboard that gives research, sourcing and ops teams a single view of project status.",
    result: "↑ Adoption 0% → 75% · 40% faster lookups",
    tags: ["B2B SaaS", "Dashboard"],
    cover: "linear-gradient(135deg,#02594e,#3f8f7f)",
  },
  {
    slug: "cro-onboarding",
    year: "2025",
    title: "CRO Onboarding & Design System",
    summary: "An onboarding module and component library that made partner profile setup faster and more consistent.",
    result: "↓ Setup time for 60% of users",
    tags: ["Onboarding", "Design System"],
    cover: "linear-gradient(135deg,#2f6f63,#9cc4b5)",
  },
  {
    slug: "multi-step-forms",
    year: "2024",
    title: "Smarter Multi-step Forms",
    summary: "Redesigned friction-heavy forms using usability tests and A/B experiments on mandatory fields.",
    result: "↑ 30% completion · data completeness 30% → 65%",
    tags: ["Forms", "A/B Testing"],
    cover: "linear-gradient(135deg,#344054,#02594e)",
    locked: true,
  },
]

export const experience = [
  { when: "2024 to now", company: "Scimplify", role: "Product Designer · User Research & Product Design", tag: "B2B SaaS" },
  { when: "2021 to 2024", company: "ABM Respiratory Care", role: "UI/UX Designer · User Research & Product Design", tag: "Healthcare" },
  { when: "2019 to 2021", company: "Pinnium Brands", role: "UI, Graphic & Accessories Designer", tag: "E-commerce" },
  { when: "2016 to 2019", company: "Sai Lakshmi Industries", role: "Fashion & Accessories Designer", tag: "Product Design" },
]

export const skills = [
  {
    title: "Product design",
    items: ["End-to-end UX", "Interaction design", "Information architecture", "Prototyping", "Design systems", "Responsive design", "WCAG 2.1"],
  },
  {
    title: "User research",
    items: ["User interviews", "Usability testing", "A/B testing", "Surveys", "Personas", "Journey maps", "Research synthesis"],
  },
  {
    title: "Tools",
    items: ["Figma", "FigJam", "Miro", "Maze", "Hotjar", "Google Analytics", "Adobe XD", "Illustrator"],
  },
]

// "What it's like to work with me": LinkedIn-style recommendation cards in a scattered collage.
// Sathi has asked colleagues for LinkedIn recommendations. Until they arrive:
// - status "sample": placeholder person and text (shows a "Sample" tag)
// - status "draft": real person, but text drafted for them to approve (no tag shown, at Sathi's request)
// When the real recommendation arrives, paste its exact text and date and remove `status`.
export type Recommendation = {
  name: string
  headline: string
  relation: string
  date: string
  text: string
  tone: "blue" | "orange" | "purple" | "green"
  /** Profile photo (square), shown in place of the initials */
  photo?: string
  status?: "sample" | "draft"
}

export const workingWithMe = {
  title: "What it's like to work with me",
  intro: "Kind words from the people I have designed and built with.",
  note: "Kind words from my teammates ♥",
  recommendations: [
    {
      // DRAFT for Narayanan to approve; Sathi reported to him at ABM Respiratory Care
      name: "Narayanan Krishnamurthy",
      headline: "Medical Devices | ISO 13485 | IEC 62304 | HMI · ABM Respiratory Care",
      relation: "Managed Sathi directly",
      date: "", // LinkedIn shows the date it was written; fill in when posted
      text: "Sathi's thinking is clear and her work is very structured. She designed our ventilator and patient screens with HIPAA, FDA human factors and IEC 62366 in mind from day one.",
      tone: "green",
      photo: "/recommendations/narayanan-krishnamurthy.jpg",
      status: "draft",
    },
    {
      // DRAFT for Leah to approve; US-based at ABM, she brought Sathi feedback from the US market
      name: "Leah Noaeill",
      headline: "Global Healthcare Executive | Marketing | Strategy · ABM Respiratory Care",
      relation: "Worked with Sathi but on different teams",
      date: "",
      text: "Sathi turned our US customer feedback into better designs, fast. Creative, and always on time across our portal, dashboard and mobile app.",
      tone: "blue",
      photo: "/recommendations/leah-noaeill.jpg",
      status: "draft",
    },
    {
      // DRAFT for Rohit to approve; Sathi's manager at Scimplify (Scinode)
      name: "Rohit Deshpande",
      headline: "Accelerating innovation through Scinode · Scimplify",
      relation: "Managed Sathi directly",
      date: "",
      text: "Give Sathi a problem and she's already on it. She breaks it down fast, uses AI tools smartly, and comes back with work we can ship.",
      tone: "orange",
      photo: "/recommendations/rohit-deshpande.jpg",
      status: "draft",
    },
    {
      // DRAFT for Shalinee to approve; Product Manager building Scinode at Scimplify
      name: "Shalinee Kumari",
      headline: "Product Manager | Building Scinode @ Scimplify",
      relation: "Worked with Sathi on the same team",
      date: "",
      text: "Sathi is an intuitive designer who solves problems quickly. She builds the front end herself with AI tools, so our developers can focus on the hard parts.",
      tone: "purple",
      photo: "/recommendations/shalinee-kumari.jpg",
      status: "draft",
    },
  ] satisfies Recommendation[],
}
