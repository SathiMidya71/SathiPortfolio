import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"

// Onboarding as a swimlane flowchart, in the same style as the Project management costing flow:
// one sign-up, a split into the CRO and scientist profiles, one admin review, then the marketplace.

const lanes = [
  { name: "CRO / CDMO", tint: "#e4f1eb", ink: "#02594e" },
  { name: "Scientist", tint: "#F1EBFC", ink: "#4A307D" },
  { name: "Scinode", tint: "#f2ece3", ink: "#56635f" },
  { name: "Admin", tint: "#FBF1D3", ink: "#8A6514" },
] as const

type N = { col: number; row: number; lines: string[]; sub?: string; kind?: "diamond" | "gate" | "dark" }
const nodes: N[] = [
  { col: 2, row: 0, lines: ["Sign up / log in"], sub: "one account for everyone" },
  { col: 2, row: 1, lines: ["Choose", "profile"], kind: "diamond" },
  { col: 0, row: 2, lines: ["Lands on the", "CRO platform"], sub: "only Dashboard + Profile open" },
  { col: 1, row: 2, lines: ["Lands on the", "scientist platform"], sub: "only Dashboard + Profile open" },
  { col: 0, row: 3, lines: ["Company profile"], sub: "8 tabs, pilot plant shapes the form" },
  { col: 1, row: 3, lines: ["Researcher profile"], sub: "5 guided steps, autosave" },
  { col: 2, row: 4, lines: ["Sign the NDA"], sub: "mandatory to send proposals" },
  { col: 2, row: 5, lines: ["Accept terms", "and submit"], sub: "profile turns read-only" },
  { col: 3, row: 6, lines: ["Review profile"], kind: "gate" },
  { col: 2, row: 7, lines: ["Modules unlocked"], sub: "Opportunities · Projects · Project mgmt", kind: "dark" },
]

const W = 1000
const colW = W / lanes.length
const head = 56
const rowH = 78
const nodeW = colW - 40
const nodeH = 52
const H = head + 8 * rowH + 16
const cx = (c: number) => colW * c + colW / 2
const cy = (r: number) => head + r * rowH + rowH / 2
const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties
const step = 230

function edge(d: string, delay: number, opts: { dash?: boolean; color?: string; label?: string; lx?: number; ly?: number; anchor?: "start" | "middle" | "end" } = {}) {
  const color = opts.color ?? "#02594e"
  return (
    <g key={d}>
      {opts.dash ? (
        <path d={d} data-fl="edge" data-dash style={at(delay)} fill="none" stroke={color} strokeWidth="1.6" strokeDasharray="6 5" markerEnd={`url(#ob-${color === "#8A6514" ? "y" : "g"})`} />
      ) : (
        <path d={d} data-fl="edge" style={at(delay)} pathLength={1} strokeDasharray="1" fill="none" stroke={color} strokeOpacity="0.8" strokeWidth="1.6" strokeLinejoin="round" markerEnd="url(#ob-g)" />
      )}
      {opts.label && (
        <text data-fl="label" style={at(delay + 180)} x={opts.lx} y={opts.ly} textAnchor={opts.anchor ?? "middle"} fontSize="11.5" fontWeight="600" fill={color} paintOrder="stroke" stroke="#f7f3ec" strokeWidth="4" strokeLinejoin="round">
          {opts.label}
        </text>
      )}
    </g>
  )
}

export function OnboardingFlow() {
  const P = nodes.map((n) => ({ x: cx(n.col), y: cy(n.row) }))
  const top = (i: number) => P[i].y - nodeH / 2 - 2
  const bot = (i: number) => P[i].y + nodeH / 2
  const dia = 30 // half-diagonal of decision diamonds

  return (
    <FlowReveal className="grid gap-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden w-full md:block" role="img" aria-label="Onboarding flow: one sign-up or log-in, then the user chooses a profile and lands on the CRO or the scientist platform, each with its own profile (8 tabs for CROs, 5 guided steps for scientists); both sign the mandatory NDA, accept the terms and submit; an admin reviews and either requests changes or approves, which unlocks Opportunities, Projects and Project management.">
        <defs>
          <marker id="ob-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#02594e" />
          </marker>
          <marker id="ob-y" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#8A6514" />
          </marker>
        </defs>

        {lanes.map((l, i) => (
          <g key={l.name} data-fl="lane" style={at(i * 60)}>
            <rect x={i * colW + 4} y="0" width={colW - 8} height={H} rx="18" fill={l.tint} opacity="0.75" />
            <text x={cx(i)} y="34" textAnchor="middle" fontSize="14" fontWeight="700" fill={l.ink}>
              {l.name}
            </text>
          </g>
        ))}

        {/* edges */}
        {edge(`M${P[0].x} ${bot(0)} L${P[1].x} ${P[1].y - dia - 2}`, 350 + 140)}
        {edge(`M${P[1].x - dia} ${P[1].y} L${P[2].x} ${P[1].y} L${P[2].x} ${top(2)}`, 350 + step + 140, { label: "CRO / CDMO", lx: P[2].x + 8, ly: P[1].y + 22, anchor: "start" })}
        {edge(`M${P[1].x - dia} ${P[1].y} L${P[3].x} ${P[1].y} L${P[3].x} ${top(3)}`, 350 + step + 140, { label: "Scientist", lx: P[3].x + 8, ly: P[1].y + 22, anchor: "start" })}
        {edge(`M${P[2].x} ${bot(2)} L${P[4].x} ${top(4)}`, 350 + 3 * step + 140)}
        {edge(`M${P[3].x} ${bot(3)} L${P[5].x} ${top(5)}`, 350 + 3 * step + 140)}
        {edge(`M${P[4].x} ${bot(4)} L${P[4].x} ${P[6].y} L${P[6].x - nodeW / 2 - 2} ${P[6].y}`, 350 + 5 * step + 140)}
        {edge(`M${P[5].x} ${bot(5)} L${P[5].x} ${P[6].y - 0.01}`, 350 + 5 * step + 140)}
        {edge(`M${P[6].x} ${bot(6)} L${P[7].x} ${top(7)}`, 350 + 6 * step + 140)}
        {edge(`M${P[7].x + nodeW / 2} ${P[7].y} L${P[8].x} ${P[7].y} L${P[8].x} ${top(8) - 6}`, 350 + 7 * step + 140, { label: "Email to admin", lx: (P[7].x + P[8].x) / 2 + 30, ly: P[7].y - 7 })}
        {edge(`M${P[8].x - nodeW / 2} ${P[8].y + 8} L${P[7].x + 24} ${P[8].y + 8} L${P[7].x + 24} ${bot(7) + 2}`, 350 + 8 * step + 140, {
          dash: true,
          color: "#8A6514",
          label: "Changes requested",
          lx: P[8].x - nodeW / 2 - 8,
          ly: P[8].y + 24,
          anchor: "end",
        })}
        {edge(`M${P[8].x} ${bot(8) + 6} L${P[8].x} ${P[9].y} L${P[9].x + nodeW / 2 + 2} ${P[9].y}`, 350 + 8 * step + 260, { label: "Approved", lx: P[8].x + 8, ly: P[9].y - 8, anchor: "start" })}

        {/* nodes */}
        {nodes.map((n, i) => {
          const { x, y } = P[i]
          const l = lanes[n.col]
          const d = at(350 + i * step)
          if (n.kind === "diamond") {
            return (
              <g key={i} data-fl="node" style={d}>
                <rect x={x - dia} y={y - dia} width={dia * 2} height={dia * 2} rx="8" transform={`rotate(45 ${x} ${y})`} fill="#fff" stroke={l.ink} strokeOpacity="0.6" strokeWidth="1.4" />
                {n.lines.map((t, k) => (
                  <text key={t} x={x} y={y + 4 + (k - (n.lines.length - 1) / 2) * 13} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#344054">
                    {t}
                  </text>
                ))}
              </g>
            )
          }
          const dark = n.kind === "dark"
          const gate = n.kind === "gate"
          const h = gate ? nodeH + 12 : nodeH
          return (
            <g key={i} data-fl="node" style={d}>
              <rect x={x - nodeW / 2} y={y - h / 2} width={nodeW} height={h} rx="12" fill={dark ? "#1F392D" : "#fff"} stroke={dark ? "none" : l.ink} strokeOpacity={gate ? 0.9 : 0.45} strokeWidth={gate ? 1.6 : 1.3} />
              {n.lines.map((t, k) => (
                <text
                  key={t}
                  x={x}
                  y={y + (n.sub || gate ? -6 : 4) + (k - (n.lines.length - 1) / 2) * 15}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight={dark ? 700 : 500}
                  fill={dark ? "#fff" : "#344054"}
                >
                  {t}
                </text>
              ))}
              {n.sub && (
                <text x={x} y={y + 14 + (n.lines.length - 1) * 7} textAnchor="middle" fontSize="10.5" fill={dark ? "#a8e6c9" : "#6b7f7c"}>
                  {n.sub}
                </text>
              )}
              {gate && (
                <g>
                  <rect x={x - 66} y={y + 6} width="60" height="19" rx="9.5" fill="#dcebe3" />
                  <text x={x - 36} y={y + 19.5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1F5544">
                    Approve
                  </text>
                  <rect x={x + 6} y={y + 6} width="60" height="19" rx="9.5" fill="#FBF1D3" />
                  <text x={x + 36} y={y + 19.5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8A6514">
                    Changes
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {/* phones: the same flow as a list */}
      <ol className="grid gap-2 md:hidden">
        {[
          ["Scinode", "Sign up or log in (one account for everyone)"],
          ["Scinode", "Choose the profile: CRO / CDMO or scientist"],
          ["CRO / CDMO", "Land on the CRO platform; fill the company profile (8 tabs, pilot plant shapes the form)"],
          ["Scientist", "Land on the scientist platform; fill the researcher profile (5 guided steps)"],
          ["Scinode", "Sign the NDA (mandatory before sending proposals)"],
          ["Scinode", "Accept terms and submit (profile turns read-only)"],
          ["Admin", "Review: approve, or request changes"],
          ["Scinode", "Modules unlocked: Opportunities, Projects, Project management"],
        ].map(([lane, text], i) => {
          const l = lanes.find((x) => x.name === lane)!
          return (
            <li key={text} data-fl="node" style={at(i * 90)} className="flex items-start gap-3 rounded-[14px] border border-line bg-white p-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white" style={{ background: l.ink }}>
                {i + 1}
              </span>
              <span>
                <span className="block text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: l.ink }}>
                  {lane}
                </span>
                <span className="text-[14px] text-ink">{text}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </FlowReveal>
  )
}
