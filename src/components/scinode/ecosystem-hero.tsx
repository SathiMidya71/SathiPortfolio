import { FlowReveal } from "@/components/scinode/researcher/flow-reveal"

// SCINODE hero, two options on the dark green grid of the Scinode for Researchers hero, each with a big
// low-contrast "SCINODE" lit by a mint spotlight, the diagram overlapping its lower half.
//   network: three portal hubs in soft glowing halos around a SCINODE core (platform-of-platforms reference)
//   bridge:  Customer and Supplier portals as two ovals joined by the Business & admin portal's two pipes
//            (innovation / business-development subsystems reference)

const at = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties
const W = 1600
const H = 900

function Defs() {
  return (
    <defs>
      <pattern id="eh-grid" width="64" height="64" patternUnits="userSpaceOnUse">
        <path d="M64 0H0V64" fill="none" stroke="#fff" strokeOpacity="0.035" />
      </pattern>
      <radialGradient id="eh-spot" cx="0.18" cy="0" r="0.62">
        <stop offset="0" stopColor="#96dcbe" stopOpacity="0.2" />
        <stop offset="0.55" stopColor="#2fae74" stopOpacity="0.06" />
        <stop offset="1" stopColor="#2fae74" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="eh-vig" cx="0.5" cy="0.5" r="0.75">
        <stop offset="0.55" stopColor="#051410" stopOpacity="0" />
        <stop offset="1" stopColor="#020a08" stopOpacity="0.8" />
      </radialGradient>
      {/* the word: bright where the spotlight falls, fading to the right */}
      <linearGradient id="eh-word" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#def8ec" stopOpacity="0.62" />
        <stop offset="0.35" stopColor="#a0dec2" stopOpacity="0.26" />
        <stop offset="1" stopColor="#d6f0e4" stopOpacity="0.07" />
      </linearGradient>
      {/* glossy spheres: lit from the top left, dark rim */}
      <radialGradient id="eh-hub" cx="0.36" cy="0.28" r="0.85">
        <stop offset="0" stopColor="#5fb59c" />
        <stop offset="0.38" stopColor="#1f5f4f" />
        <stop offset="0.85" stopColor="#0b2a22" />
        <stop offset="1" stopColor="#071c17" />
      </radialGradient>
      <radialGradient id="eh-sat" cx="0.36" cy="0.28" r="0.85">
        <stop offset="0" stopColor="#3d6a5d" />
        <stop offset="0.45" stopColor="#173a31" />
        <stop offset="1" stopColor="#081a15" />
      </radialGradient>
      <radialGradient id="eh-shine" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="eh-drop" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000" stopOpacity="0.65" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="eh-core" cx="0.38" cy="0.28" r="0.85">
        <stop offset="0" stopColor="#6fc2a7" />
        <stop offset="0.3" stopColor="#2f7a66" />
        <stop offset="0.7" stopColor="#12493c" />
        <stop offset="1" stopColor="#071c17" />
      </radialGradient>
      <radialGradient id="eh-glow">
        <stop offset="0" stopColor="#8fd3b4" stopOpacity="0.28" />
        <stop offset="1" stopColor="#8fd3b4" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="eh-halo">
        <stop offset="0" stopColor="#8fd3b4" stopOpacity="0.05" />
        <stop offset="0.7" stopColor="#8fd3b4" stopOpacity="0.015" />
        <stop offset="1" stopColor="#8fd3b4" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="eh-pipe" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#6fc2a7" />
        <stop offset="0.22" stopColor="#2f7a66" />
        <stop offset="0.7" stopColor="#123d33" />
        <stop offset="1" stopColor="#081c17" />
      </linearGradient>
      <radialGradient id="eh-oval" cx="0.38" cy="0.25" r="0.9">
        <stop offset="0" stopColor="#2b6656" />
        <stop offset="0.5" stopColor="#123a30" />
        <stop offset="1" stopColor="#06150f" />
      </radialGradient>
      <filter id="eh-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <marker id="eh-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="#a8e6c9" />
      </marker>
      <marker id="eh-arrow-lg" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="#8fd3b4" />
      </marker>
    </defs>
  )
}

function Backdrop() {
  return (
    <>
      <rect width={W} height={H} fill="#071a15" />
      <rect width={W} height={H} fill="url(#eh-grid)" />
      <rect width={W} height={H} fill="url(#eh-spot)" />
      <rect width={W} height={H} fill="url(#eh-vig)" />
      <text
        data-fl="lane"
        style={at(0)}
        x="56"
        y="268"
        textLength={W - 112}
        lengthAdjust="spacing"
        className="font-heading"
        fontSize="292"
        fontWeight="700"
        letterSpacing="-6"
        fill="url(#eh-word)"
      >
        SCINODE
      </text>
    </>
  )
}

/* ---------------- Option A: network ---------------- */

type Sat = { x: number; y: number; label: string[]; mine?: boolean }
const net = {
  core: { x: 800, y: 735 },
  portals: [
    { key: "customer", tag: "CUSTOMER PORTAL", hub: { x: 360, y: 575 }, label: ["Customer", "portal"], sats: [{ x: 178, y: 455, label: ["CVP"] }, { x: 182, y: 712, label: ["R&D", "needs"] }, { x: 430, y: 790, label: ["Manufacturing", "needs"] }] as Sat[] },
    { key: "admin", tag: "BUSINESS & ADMIN", hub: { x: 800, y: 420 }, label: ["Business &", "admin"], sats: [{ x: 630, y: 352, label: ["Orchestrate"] }, { x: 970, y: 352, label: ["Collaborate"] }] as Sat[] },
    { key: "supplier", tag: "SUPPLIER PORTAL", hub: { x: 1240, y: 575 }, label: ["Supplier", "portal"], sats: [{ x: 1422, y: 455, label: ["Manufacturer"] }, { x: 1418, y: 712, label: ["CRO"] }, { x: 1170, y: 790, label: ["Scientist"] }] as Sat[] },
  ],
}
const R = { hub: 72, sat: 48, core: 82 }
function link(a: { x: number; y: number }, ra: number, b: { x: number; y: number }, rb: number) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const d = Math.hypot(dx, dy)
  return `M${(a.x + (dx / d) * ra).toFixed(1)} ${(a.y + (dy / d) * ra).toFixed(1)} L${(b.x - (dx / d) * rb).toFixed(1)} ${(b.y - (dy / d) * rb).toFixed(1)}`
}

function Network() {
  const { core, portals } = net
  return (
    <>
      {/* soft halos instead of boxes */}
      {portals.map((p, i) => (
        <g key={p.key} data-fl="lane" style={at(150 + i * 120)}>
          <ellipse cx={p.hub.x} cy={p.hub.y + (p.key === "admin" ? -20 : 40)} rx={p.key === "admin" ? 250 : 270} ry={p.key === "admin" ? 150 : 250} fill="url(#eh-halo)" />
          <text x={p.hub.x} y={p.hub.y - (p.key === "admin" ? 160 : 200)} textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="3" fill="#a8e6c9" fillOpacity="0.55">
            {p.tag}
          </text>
        </g>
      ))}
      {portals.map((p, i) =>
        p.sats.map((s, k) => <path key={`${p.key}${k}`} data-fl="edge" style={at(500 + i * 120 + k * 60)} pathLength={1} strokeDasharray="1" d={link(s, R.sat, p.hub, R.hub + 4)} stroke="#a8e6c9" strokeOpacity="0.4" strokeWidth="2" markerEnd="url(#eh-arrow)" />)
      )}
      {[link(portals[0].hub, R.hub + 4, portals[1].hub, R.hub + 4), link(portals[1].hub, R.hub + 4, portals[2].hub, R.hub + 4), ...portals.map((p) => link(core, R.core + 6, p.hub, R.hub + 4))].map((d, i) => (
        <g key={d} data-fl="lane" style={at(900 + i * 100)}>
          <path d={d} stroke="#a8e6c9" strokeOpacity="0.32" strokeWidth="2.5" markerStart="url(#eh-arrow)" markerEnd="url(#eh-arrow)" />
          <path d={d} stroke="#e6f7ef" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" style={{ animation: "ia-flow 1.4s linear infinite" }} opacity="0.4" />
        </g>
      ))}
      {portals.map((p, i) =>
        p.sats.map((s, k) => (
          <g key={`s${p.key}${k}`} data-fl="node" style={at(650 + i * 120 + k * 60)}>
            <ellipse cx={s.x + 6} cy={s.y + R.sat + 10} rx={R.sat * 0.9} ry="12" fill="url(#eh-drop)" />
            <circle cx={s.x} cy={s.y} r={R.sat} fill="url(#eh-sat)" stroke="#a8e6c9" strokeOpacity="0.22" strokeWidth="1.5" />
            <ellipse cx={s.x - R.sat * 0.32} cy={s.y - R.sat * 0.45} rx={R.sat * 0.42} ry={R.sat * 0.22} fill="url(#eh-shine)" opacity="0.3" />
            {s.label.map((l, j) => (
              <text key={l} x={s.x} y={s.y + 5 + (j - (s.label.length - 1) / 2) * 17} textAnchor="middle" fontSize={l.length > 10 ? 13 : 15} fontWeight="600" fill="#d9ece4">
                {l}
              </text>
            ))}
          </g>
        ))
      )}
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
      <g data-fl="node" style={at(150)}>
        <circle cx={core.x} cy={core.y} r={R.core + 16} fill="none" stroke="#a8e6c9" strokeOpacity="0.3" strokeDasharray="4 8" style={{ transformOrigin: `${core.x}px ${core.y}px`, animation: "eh-spin 24s linear infinite" }} />
        <ellipse cx={core.x + 10} cy={core.y + R.core + 16} rx={R.core} ry="18" fill="url(#eh-drop)" />
        <circle cx={core.x} cy={core.y} r={R.core + 3} fill="none" stroke="#8fd3b4" strokeOpacity="0.25" strokeWidth="2" filter="url(#eh-blur)" />
        <circle cx={core.x} cy={core.y} r={R.core} fill="url(#eh-core)" stroke="#a8e6c9" strokeOpacity="0.55" strokeWidth="1.5" />
        <ellipse cx={core.x - R.core * 0.3} cy={core.y - R.core * 0.5} rx={R.core * 0.45} ry={R.core * 0.2} fill="url(#eh-shine)" opacity="0.38" />
        <text x={core.x} y={core.y + 4} textAnchor="middle" fontSize="25" fontWeight="800" letterSpacing="1.5" fill="#fff">
          SCINODE
        </text>
        <text x={core.x} y={core.y + 27} textAnchor="middle" fontSize="13" fontWeight="600" fill="#a8e6c9">
          one ecosystem
        </text>
      </g>
    </>
  )
}

/* ---------------- Option B: bridge ---------------- */

function Pipe({ x, y, w, label, dir, delay }: { x: number; y: number; w: number; label: string; dir: "right" | "left"; delay: number }) {
  const h = 50
  const r = 14
  const ax0 = dir === "right" ? x - 70 : x + w + 70
  const ax1 = dir === "right" ? x + w + 70 : x - 70
  return (
    <g data-fl="node" style={at(delay)}>
      <path d={`M${ax0} ${y + h / 2} L${ax1} ${y + h / 2}`} stroke="#a8e6c9" strokeOpacity="0.7" strokeWidth="2.5" markerEnd="url(#eh-arrow)" />
      <path d={`M${ax0} ${y + h / 2} L${ax1} ${y + h / 2}`} stroke="#e6f7ef" strokeWidth="2.5" strokeDasharray="2 14" strokeLinecap="round" style={{ animation: "ia-flow 1.4s linear infinite" }} opacity="0.7" />
      {/* cylinder */}
      <rect x={x} y={y} width={w} height={h} rx={r} ry={h / 2} fill="url(#eh-pipe)" />
      <ellipse cx={x + w / 2} cy={y + h + 12} rx={w / 2} ry="10" fill="url(#eh-drop)" />
      <ellipse cx={x + w - r} cy={y + h / 2} rx={r} ry={h / 2} fill="#2f7a66" stroke="#8fd3b4" strokeOpacity="0.6" strokeWidth="1.5" />
      <ellipse cx={x + r} cy={y + h / 2} rx={r} ry={h / 2} fill="none" stroke="#5fae92" strokeOpacity="0.6" strokeWidth="1.5" />
      <text x={x + w / 2 - 6} y={y + h / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff">
        {label}
      </text>
    </g>
  )
}

function Oval({ cx, cy, title, items }: { cx: number; cy: number; title: string[]; items: { label: string; mine?: boolean }[] }) {
  return (
    <g data-fl="node" style={at(200)}>
      <ellipse cx={cx + 14} cy={cy + 278} rx="210" ry="26" fill="url(#eh-drop)" />
      <ellipse cx={cx} cy={cy} rx="236" ry="262" fill="url(#eh-oval)" stroke="#a8e6c9" strokeOpacity="0.4" strokeWidth="1.5" />
      <ellipse cx={cx - 70} cy={cy - 170} rx="110" ry="46" fill="url(#eh-shine)" opacity="0.28" />
      <ellipse cx={cx} cy={cy} rx="250" ry="276" fill="none" stroke="#a8e6c9" strokeOpacity="0.14" strokeWidth="1.5" />
      {title.map((t, j) => (
        <text key={t} x={cx} y={cy - 120 + j * 32} textAnchor="middle" fontSize="28" fontWeight="700" fill="#fff">
          {t}
        </text>
      ))}
      {items.map((it, k) => {
        const y = cy - 22 + k * 62
        const w = it.label.length * 11 + 56
        return (
          <g key={it.label}>
            <rect x={cx - w / 2} y={y - 22} width={w} height="44" rx="22" fill="#0e2b23" stroke="#a8e6c9" strokeOpacity="0.3" strokeWidth="1.2" />
            <text x={cx} y={y + 6} textAnchor="middle" fontSize="17" fontWeight="600" fill="#d9ece4">
              {it.label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function Bridge() {
  const L = { x: 400, y: 590 }
  const Rt = { x: 1200, y: 590 }
  return (
    <>
      {/* positive network loop: curved arrows above and below */}
      <g data-fl="lane" style={at(700)}>
        <path d="M1120 360 C 1010 250, 590 250, 480 360" fill="none" stroke="#8fd3b4" strokeOpacity="0.32" strokeWidth="14" strokeLinecap="round" markerEnd="url(#eh-arrow-lg)" />
        <text x="800" y="300" textAnchor="middle" fontSize="16" fontWeight="700" letterSpacing="2" fill="#a8e6c9" fillOpacity="0.85">
          MORE LABS, BETTER MATCHES
        </text>
        <path d="M480 822 C 590 905, 1010 905, 1120 822" fill="none" stroke="#8fd3b4" strokeOpacity="0.32" strokeWidth="14" strokeLinecap="round" markerEnd="url(#eh-arrow-lg)" />
        <text x="800" y="836" textAnchor="middle" fontSize="16" fontWeight="700" letterSpacing="2" fill="#a8e6c9" fillOpacity="0.85">
          MORE PROJECTS, MORE DEMAND
        </text>
      </g>

      <Oval cx={L.x} cy={L.y} title={["Customer", "portal"]} items={[{ label: "CVP" }, { label: "R&D needs" }, { label: "Manufacturing needs" }]} />
      <Oval cx={Rt.x} cy={Rt.y} title={["Supplier", "portal"]} items={[{ label: "Manufacturer" }, { label: "CRO" }, { label: "Scientist" }]} />

      {/* Business & admin: the two pipes between the portals */}
      <g data-fl="label" style={at(500)}>
        <text x="800" y="582" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="3" fill="#a8e6c9" fillOpacity="0.7">
          BUSINESS &amp; ADMIN PORTAL
        </text>
        <text x="800" y="606" textAnchor="middle" fontSize="13" fill="#cfe3da" fillOpacity="0.6">
          orchestrate · collaborate
        </text>
      </g>
      <Pipe x={640} y={490} w={320} label="Opportunities" dir="right" delay={800} />
      <Pipe x={640} y={640} w={320} label="Proposals & delivery" dir="left" delay={1000} />

      {/* external partners */}
      <g data-fl="label" style={at(1200)}>
        {[480, 590, 700].map((y) => (
          <path key={`l${y}`} d={`M60 590 L150 ${y}`} stroke="#a8e6c9" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#eh-arrow)" />
        ))}
        <text transform="translate(40 590) rotate(-90)" textAnchor="middle" fontSize="14" fontWeight="600" letterSpacing="2" fill="#cfe3da" fillOpacity="0.7">
          PHARMA &amp; CHEMICAL COMPANIES
        </text>
        {[480, 590, 700].map((y) => (
          <path key={`r${y}`} d={`M1540 590 L1450 ${y}`} stroke="#a8e6c9" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#eh-arrow)" />
        ))}
        <text transform="translate(1568 590) rotate(90)" textAnchor="middle" fontSize="14" fontWeight="600" letterSpacing="2" fill="#cfe3da" fillOpacity="0.7">
          LABS &amp; MANUFACTURERS
        </text>
      </g>
    </>
  )
}

export function EcosystemHero({ variant = "network" }: { variant?: "network" | "bridge" }) {
  return (
    <FlowReveal key={variant} className="relative overflow-hidden rounded-[20px] md:rounded-[28px]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label={
          variant === "network"
            ? "SCINODE as one ecosystem of three portals: the Customer portal (CVP, R&D needs, manufacturing needs), the Business and admin portal (orchestrate, collaborate) and the Supplier portal (manufacturer, CRO, scientist), all connected through the SCINODE core."
            : "SCINODE as a bridge: the Customer portal and the Supplier portal joined by the Business and admin portal, with opportunities flowing to suppliers and proposals and delivery flowing back."
        }
      >
        <Defs />
        <Backdrop />
        {variant === "network" ? <Network /> : <Bridge />}
      </svg>
    </FlowReveal>
  )
}
