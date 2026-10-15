import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"

// SCINODE hero: "one ecosystem, three portals" as a platform-of-platforms network (after a reference Sathi shared),
// on the dark green grid of the Scinode for Researchers hero. Each portal is a hub in its own muted dashed region,
// its parts orbit it as satellites (the ones Sathi designed glow mint), and a SCINODE core links all three.

type Sat = { x: number; y: number; label: string[]; mine?: boolean }
type Portal = { key: string; tag: string; hub: { x: number; y: number }; label: string[]; box: [number, number, number, number]; sats: Sat[] }

const portals: Portal[] = [
  {
    key: "customer",
    tag: "Customer portal",
    hub: { x: 330, y: 410 },
    label: ["Customer", "portal"],
    box: [70, 150, 520, 520],
    sats: [
      { x: 170, y: 262, label: ["CVP"], mine: true },
      { x: 150, y: 540, label: ["R&D", "needs"] },
      { x: 360, y: 595, label: ["Manufacturing", "needs"] },
    ],
  },
  {
    key: "admin",
    tag: "Business & admin portal",
    hub: { x: 800, y: 215 },
    label: ["Business &", "admin"],
    box: [600, 40, 400, 300],
    sats: [
      { x: 668, y: 118, label: ["Orchestrate"] },
      { x: 932, y: 118, label: ["Collaborate"] },
    ],
  },
  {
    key: "supplier",
    tag: "Supplier portal",
    hub: { x: 1270, y: 410 },
    label: ["Supplier", "portal"],
    box: [1010, 150, 520, 520],
    sats: [
      { x: 1430, y: 262, label: ["Manufacturer"], mine: true },
      { x: 1450, y: 540, label: ["CRO"], mine: true },
      { x: 1240, y: 595, label: ["Scientist"], mine: true },
    ],
  },
]
const core = { x: 800, y: 575 }
const R = { hub: 74, sat: 50, core: 88 }

/** Line between two circles, trimmed to their edges. */
function link(a: { x: number; y: number }, ra: number, b: { x: number; y: number }, rb: number) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const d = Math.hypot(dx, dy)
  const ux = dx / d
  const uy = dy / d
  return `M${(a.x + ux * ra).toFixed(1)} ${(a.y + uy * ra).toFixed(1)} L${(b.x - ux * rb).toFixed(1)} ${(b.y - uy * rb).toFixed(1)}`
}
const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

export function EcosystemHero() {
  return (
    <FlowReveal className="relative overflow-hidden rounded-[20px] md:rounded-[28px]">
      <svg
        viewBox="0 0 1600 800"
        className="block w-full"
        role="img"
        aria-label="SCINODE as one ecosystem of three portals: the Customer portal (CVP, R&D needs, manufacturing needs), the Business and admin portal (orchestrate, collaborate) and the Supplier portal (manufacturer, CRO, scientist), all connected through the SCINODE core."
      >
        <defs>
          <pattern id="eh-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0V64" fill="none" stroke="#fff" strokeOpacity="0.05" />
          </pattern>
          <radialGradient id="eh-spot" cx="0.16" cy="0" r="0.6">
            <stop offset="0" stopColor="#96dcbe" stopOpacity="0.32" />
            <stop offset="0.55" stopColor="#2fae74" stopOpacity="0.08" />
            <stop offset="1" stopColor="#2fae74" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eh-vig" cx="0.5" cy="0.45" r="0.75">
            <stop offset="0.55" stopColor="#051410" stopOpacity="0" />
            <stop offset="1" stopColor="#051410" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id="eh-hub" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#3f8f7f" />
            <stop offset="1" stopColor="#1d5a4c" />
          </radialGradient>
          <radialGradient id="eh-core" cx="0.4" cy="0.32" r="0.8">
            <stop offset="0" stopColor="#c9f0dd" />
            <stop offset="0.55" stopColor="#8fd3b4" />
            <stop offset="1" stopColor="#3f8f7f" />
          </radialGradient>
          <radialGradient id="eh-glow">
            <stop offset="0" stopColor="#8fd3b4" stopOpacity="0.45" />
            <stop offset="1" stopColor="#8fd3b4" stopOpacity="0" />
          </radialGradient>
          <marker id="eh-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#a8e6c9" />
          </marker>
        </defs>

        {/* background */}
        <rect width="1600" height="800" fill="#0f2c24" />
        <rect width="1600" height="800" fill="url(#eh-grid)" />
        <rect width="1600" height="800" fill="url(#eh-spot)" />
        <rect width="1600" height="800" fill="url(#eh-vig)" />

        {/* portal regions: muted dashed boxes with a small tag */}
        {portals.map((p, i) => {
          const [x, y, w, h] = p.box
          return (
            <g key={p.key} data-fl="lane" style={at(i * 120)}>
              <rect x={x} y={y} width={w} height={h} rx="22" fill="#fff" fillOpacity="0.025" stroke="#a8e6c9" strokeOpacity="0.28" strokeWidth="1.5" strokeDasharray="10 7 2 7" />
              <rect x={x + 18} y={y - 15} width={p.tag.length * 8.6 + 26} height="30" rx="15" fill="#123a30" stroke="#a8e6c9" strokeOpacity="0.35" />
              <text x={x + 31} y={y + 5} fontSize="14" fontWeight="600" letterSpacing="0.5" fill="#a8e6c9" fillOpacity="0.85">
                {p.tag}
              </text>
            </g>
          )
        })}

        {/* connectors: satellites → hubs, hubs ↔ core, hub ↔ hub */}
        {portals.map((p, i) =>
          p.sats.map((s, k) => (
            <path key={`${p.key}${k}`} data-fl="edge" style={at(500 + i * 120 + k * 60)} pathLength={1} strokeDasharray="1" d={link(s, R.sat, p.hub, R.hub + 4)} stroke="#a8e6c9" strokeOpacity="0.4" strokeWidth="2" markerEnd="url(#eh-arrow)" />
          ))
        )}
        {[
          link(portals[0].hub, R.hub + 4, portals[1].hub, R.hub + 4),
          link(portals[1].hub, R.hub + 4, portals[2].hub, R.hub + 4),
          ...portals.map((p) => link(core, R.core + 6, p.hub, R.hub + 4)),
        ].map((d, i) => (
          <g key={d} data-fl="lane" style={at(900 + i * 100)}>
            <path d={d} stroke="#a8e6c9" strokeOpacity="0.55" strokeWidth="3" markerStart="url(#eh-arrow)" markerEnd="url(#eh-arrow)" />
            {/* data flowing along the link */}
            <path d={d} stroke="#e6f7ef" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" style={{ animation: "ia-flow 1.4s linear infinite" }} opacity="0.7" />
          </g>
        ))}

        {/* satellites */}
        {portals.map((p, i) =>
          p.sats.map((s, k) => (
            <g key={`s${p.key}${k}`} data-fl="node" style={at(650 + i * 120 + k * 60)}>
              {s.mine && <circle cx={s.x} cy={s.y} r={R.sat + 16} fill="url(#eh-glow)" />}
              <circle cx={s.x} cy={s.y} r={R.sat} fill={s.mine ? "#e4f1eb" : "#2a4a40"} stroke={s.mine ? "#a8e6c9" : "#a8e6c9"} strokeOpacity={s.mine ? 0.9 : 0.35} strokeWidth="2" />
              {s.label.map((l, j) => (
                <text
                  key={l}
                  x={s.x}
                  y={s.y + 5 + (j - (s.label.length - 1) / 2) * 17}
                  textAnchor="middle"
                  fontSize={l.length > 10 ? 13 : 15}
                  fontWeight="600"
                  fill={s.mine ? "#1F392D" : "#cfe3da"}
                >
                  {l}
                </text>
              ))}
            </g>
          ))
        )}

        {/* hubs */}
        {portals.map((p, i) => (
          <g key={`h${p.key}`} data-fl="node" style={at(300 + i * 120)}>
            <circle cx={p.hub.x} cy={p.hub.y} r={R.hub + 10} fill="none" stroke="#a8e6c9" strokeOpacity="0.18" strokeWidth="1.5" />
            <circle cx={p.hub.x} cy={p.hub.y} r={R.hub} fill="url(#eh-hub)" stroke="#a8e6c9" strokeOpacity="0.5" strokeWidth="1.5" />
            {p.label.map((l, j) => (
              <text key={l} x={p.hub.x} y={p.hub.y + 7 + (j - (p.label.length - 1) / 2) * 22} textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff">
                {l}
              </text>
            ))}
          </g>
        ))}

        {/* core */}
        <g data-fl="node" style={at(150)}>
          <circle cx={core.x} cy={core.y} r={R.core + 60} fill="url(#eh-glow)" />
          <circle cx={core.x} cy={core.y} r={R.core + 16} fill="none" stroke="#a8e6c9" strokeOpacity="0.3" strokeDasharray="4 8" style={{ transformOrigin: `${core.x}px ${core.y}px`, animation: "eh-spin 24s linear infinite" }} />
          <circle cx={core.x} cy={core.y} r={R.core} fill="url(#eh-core)" />
          <text x={core.x} y={core.y + 4} textAnchor="middle" fontSize="26" fontWeight="800" letterSpacing="1.5" fill="#0f2c24">
            SCINODE
          </text>
          <text x={core.x} y={core.y + 28} textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#1F392D" fillOpacity="0.8">
            one ecosystem
          </text>
        </g>

        {/* legend */}
        <g data-fl="label" style={at(1500)}>
          <circle cx="92" cy="740" r="9" fill="#e4f1eb" stroke="#a8e6c9" strokeWidth="2" />
          <text x="110" y="745" fontSize="15" fill="#cfe3da">
            Designed by me
          </text>
          <circle cx="262" cy="740" r="9" fill="#2a4a40" stroke="#a8e6c9" strokeOpacity="0.35" strokeWidth="2" />
          <text x="280" y="745" fontSize="15" fill="#cfe3da" fillOpacity="0.75">
            Rest of the ecosystem
          </text>
        </g>
      </svg>
    </FlowReveal>
  )
}
