import { PhotosView } from "./arc-portal"
import { AnnotatedScreenView } from "./annotated-screen"
import { ArcPortalArchitecture } from "./arc-portal-architecture"
import { ComponentBoardView } from "./component-board"
import { PhotoBannerView, PhotoTabletsView, SplitView, StatementView, StatsPanelView, TabletVideoView } from "./portal-layout"
import Image from "next/image"
import { Roboto } from "next/font/google"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"
import { ArcUserFlow } from "./arc-user-flow"
import {
  FlowView,
  InsightsView,
  JourneyView,
  PrincipleView,
  RichPersona,
  ShiftView,
  SpecsView,
  CycleView,
  FinaleView,
  LessonsView,
  StatsView,
  StepsView,
  TreeView,
  TypeHierarchyView,
} from "./deep-research/blocks"
import { DrFragmented, DrUserFlow } from "./deep-research/diagrams"
import { KioskStageView } from "./deep-research/kiosk-stage"
import { EmpathyMapView } from "./deep-research/empathy-map"
import { MarkedImageView } from "./deep-research/marked-image"
import { MediaView } from "./deep-research/media"
import { PegboardView } from "./deep-research/pegboard"
import { PersonaBoard } from "./deep-research/persona-board"
import { PersonaMobile } from "./deep-research/persona-mobile"
import { ColorStageView, DrJourneyMap, ProblemSolutionView } from "./deep-research/showcase"
import { DesignSystemView } from "./design-system"
import { HomeBoardView, IllustrationsView, ShowcaseView, PhoneFlowView, VideoView } from "./mobile-blocks"
import { ProcessTimeline } from "./process-timeline"
import { FindingsView, InterviewsView, PerspectiveView, QuotesView } from "./research-blocks"
import { VentilatorProblemVisual, problemTones } from "./ventilator-problem-visual"

// Only used to preview the project's own typeface in the visual-system block
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] })

const text = "max-w-[720px]"
const glass = "glass rounded-[20px] shadow-[0_1px_2px_rgba(16,24,40,0.03)]"
const personaTints = ["#ffd6ae", "#d9d6fe", "#b2ddff", "#c8ead8"]

/** True when dark text reads better than white on this background. */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return 0.299 * r + 0.587 * g + 0.114 * b > 150
}

function Num({ n }: { n: number }) {
  return <span className="font-heading text-sm font-semibold text-faint tabular-nums">{String(n).padStart(2, "0")}</span>
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      if (block.emphasis)
        return (
          <p className="max-w-[880px] font-heading text-[24px] leading-[1.2] font-normal tracking-[-0.02em] text-ink md:text-[42px] md:leading-[1.15]">
            {block.text} <span className="font-semibold text-brand">{block.emphasis}</span>
          </p>
        )
      return <p className={cn(text, "text-[21px] leading-[1.45] font-medium text-ink md:text-2xl")}>{block.text}</p>

    case "p":
      return <p className={cn(text, "text-lg leading-[1.65] text-ink/90 md:text-xl")}>{block.text}</p>

    case "h3":
      return <h3 className={cn("mt-6 text-[22px] leading-tight text-ink md:text-[26px]", block.spaced && "mt-16 md:mt-24")}>{block.text}</h3>

    case "list":
      return (
        <ul className={cn(text, "grid gap-3")}>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-[1.6] text-ink/90 md:text-xl">
              <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      )

    case "figure":
      return (
        <figure className="my-4">
          <div
            className={cn(
              "overflow-hidden rounded-[20px] ring-1 ring-black/5",
              block.dark ? "bg-[#000229]" : "bg-sand"
            )}
          >
            <Image
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width}
              height={block.image.height}
              sizes="(min-width: 1200px) 860px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {block.caption && <figcaption className="mt-3 text-[15px] font-medium text-soft">{block.caption}</figcaption>}
        </figure>
      )

    case "cards":
      return (
        <div className={cn("grid gap-4 sm:grid-cols-2", block.items.length === 3 && "md:grid-cols-3")}>
          {block.items.map((c, i) => (
            <div key={c.title} className={cn(glass, "flex flex-col gap-3 p-6")}>
              <Num n={i + 1} />
              <h4 className="text-[19px] leading-snug font-semibold text-ink">{c.title}</h4>
              <p className="text-base leading-relaxed text-body">{c.text}</p>
            </div>
          ))}
        </div>
      )

    case "interviews":
      return <InterviewsView block={block} />

    case "quotes":
      return <QuotesView block={block} />

    case "perspective":
      return <PerspectiveView block={block} />

    case "problemVisual":
      return (
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ol className="grid gap-6">
            {block.items.map((c, i) => (
              <li key={c.title} className="grid grid-cols-[28px_1fr] gap-x-3">
                <span
                  className="mt-0.5 grid size-7 place-items-center rounded-full text-[11px] font-bold text-white"
                  style={{ background: problemTones[i % problemTones.length].stroke }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-[18px] leading-snug font-semibold text-ink">{c.title}</h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-body md:text-base">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="max-lg:-order-1 max-lg:mx-auto max-lg:w-full max-lg:max-w-[480px]">
            <VentilatorProblemVisual />
          </div>
        </div>
      )

    case "findings":
      return <FindingsView block={block} />

    case "chips":
      return (
        <ul className="flex flex-wrap gap-2">
          {block.items.map((c, i) => (
            <li
              key={c}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
            >
              <span aria-hidden className="size-2.5 rounded-full" style={{ background: personaTints[i % personaTints.length] }} />
              {c}
            </li>
          ))}
        </ul>
      )

    case "personas":
      if (block.layout === "board")
        return (
          <div className="grid gap-4">
            {block.items.map((p) => (
              <div key={p.name}>
                <div className="hidden md:block">
                  <PersonaBoard p={p} />
                </div>
                <div className="md:hidden">
                  <PersonaMobile p={p} />
                </div>
              </div>
            ))}
          </div>
        )
      if (block.items.some((p) => p.about || p.quote))
        return (
          <div className="grid gap-4">
            {block.items.map((p) => (
              <RichPersona key={p.name} p={p} />
            ))}
          </div>
        )
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {block.items.map((p, i) => (
            <article key={p.name} className={cn(glass, "p-6")}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-full text-sm font-bold text-ink"
                  style={{ background: personaTints[i % personaTints.length] }}
                >
                  {p.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div>
                  <h4 className="text-[18px] leading-tight font-semibold text-ink">{p.name}</h4>
                  <p className="text-sm font-medium text-brand">{p.role}</p>
                </div>
              </div>
              {[
                { label: "Goals", items: p.goals },
                { label: "Frustrations", items: p.frustrations },
              ].map((g) => (
                <div key={g.label} className="mt-5">
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">{g.label}</p>
                  <ul className="grid gap-1.5">
                    {g.items.map((item) => (
                      <li key={item} className="flex gap-2 text-[15px] leading-snug text-body">
                        <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-body/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      )

    case "quadrants":
      return (
        <div className="grid overflow-hidden rounded-[20px] bg-line sm:grid-cols-2" style={{ gap: 1 }}>
          {block.items.map((q) => (
            <div key={q.title} className="bg-white/80 p-6 sm:p-7">
              <p className="mb-3 font-heading text-xl font-semibold text-brand">{q.title}</p>
              <ul className="grid gap-2">
                {q.items.map((item) => (
                  <li key={item} className="text-[15px] leading-snug text-body md:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )

    case "phases":
      return <ProcessTimeline block={block} />

    case "visualSystem":
      return (
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
            <div className={cn("grid gap-3", block.colors.length > 3 ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-3")}>
              {block.colors.map((c) => (
                <div
                  key={c.hex}
                  className={cn(
                    "flex flex-col justify-end rounded-[16px] p-4 ring-1 ring-black/5",
                    block.colors.length > 3 ? "min-h-28" : "min-h-44",
                    isLight(c.hex) ? "text-ink" : "text-white"
                  )}
                  style={{ background: c.hex }}
                >
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="font-mono text-xs opacity-80">{c.hex}</p>
                </div>
              ))}
            </div>
            <div className={cn(roboto.className, "flex min-h-44 flex-col justify-between rounded-[16px] bg-[#000229] p-5 text-white")}>
              <span className="text-[56px] leading-none font-medium md:text-[72px]">Aa</span>
              {block.scale && (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {block.scale.map((px) => (
                    <span key={px} style={{ fontSize: Math.min(px, 36) }} className="leading-none font-medium">
                      {px}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <span className="font-bold">{block.typeface.name}</span>
                <span className="opacity-70">{block.typeface.weights}</span>
              </div>
            </div>
          </div>
          {block.icons && (
            <div className="overflow-hidden rounded-[16px] bg-[#232323] ring-1 ring-black/5">
              <Image
                src={block.icons.src}
                alt={block.icons.alt}
                width={block.icons.width}
                height={block.icons.height}
                sizes="(min-width: 1200px) 860px, 100vw"
                className="mx-auto h-auto w-full max-w-[640px]"
              />
            </div>
          )}
        </div>
      )

    case "designSystem":
      return <DesignSystemView block={block} />

    case "diagram":
      if (block.name === "dr-user-flow") return <DrUserFlow />
      if (block.name === "dr-fragmented") return <DrFragmented />
      if (block.name === "dr-journey-map") return <DrJourneyMap />
      if (block.name === "arc-portal-architecture") return <ArcPortalArchitecture />
      return <ArcUserFlow />

    case "annotatedScreen":
      return <AnnotatedScreenView block={block} />

    case "split":
      return <SplitView block={block} />

    case "tabletVideo":
      return <TabletVideoView block={block} />

    case "statement":
      return <StatementView block={block} />

    case "photoTablets":
      return <PhotoTabletsView block={block} />

    case "photoBanner":
      return <PhotoBannerView block={block} />

    case "statsPanel":
      return <StatsPanelView block={block} />

    case "componentBoard":
      return <ComponentBoardView block={block} />

    case "photos":
      return <PhotosView block={block} />

    case "flow":
      return <FlowView block={block} />

    case "principle":
      return <PrincipleView block={block} />

    case "shift":
      return <ShiftView block={block} />

    case "insights":
      return <InsightsView block={block} />

    case "journey":
      return <JourneyView block={block} />

    case "tree":
      return <TreeView block={block} />

    case "specs":
      return <SpecsView block={block} />

    case "typeHierarchy":
      return <TypeHierarchyView block={block} />

    case "palette":
      return <ColorStageView block={block} />

    case "kioskStage":
      return <KioskStageView block={block} />

    case "cycle":
      return <CycleView block={block} />

    case "markedImage":
      return <MarkedImageView block={block} />

    case "empathyMap":
      return <EmpathyMapView block={block} />

    case "lessons":
      return <LessonsView block={block} />

    case "finale":
      return <FinaleView block={block} />

    case "pegboard":
      return <PegboardView block={block} />

    case "stats":
      return <StatsView block={block} />

    case "media":
      return <MediaView block={block} />

    case "problemSolution":
      return <ProblemSolutionView block={block} />

    case "steps":
      return <StepsView block={block} />

    case "phoneFlow":
      return <PhoneFlowView block={block} />

    case "illustrations":
      return <IllustrationsView block={block} />

    case "video":
      return <VideoView block={block} />

    case "homeBoard":
      return <HomeBoardView block={block} />

    case "showcase":
      return <ShowcaseView block={block} />
  }
}
