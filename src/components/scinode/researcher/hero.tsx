import Image from "next/image"

// Hero for Scinode for Researchers, in the style of Sathi's reference (a huge, low-contrast brand word lit by a soft
// spotlight, partly hidden behind the screen). Her laptop mockup, with the grid background extended upward so the
// word fits above the lid. Layers: the image, a mint spotlight, the word, then the same image clipped to the traced
// laptop outline (% of the 2000×1422 image), so the lid covers the bottom of the letters on the right.
const src = "/case-studies/scinode/researcher-hero-v2.jpg"
const laptop =
  "polygon(23.6% 43.39%, 24.3% 41.98%, 72.9% 23.98%, 74.2% 24.54%, 74.75% 25.67%, 83% 71.38%, 89.3% 69.55%, 89.4% 71.38%, 27.3% 94.66%, 26.85% 93.88%, 32.6% 90.51%)"

export function ResearcherHero() {
  return (
    <div className="relative overflow-hidden rounded-[20px] md:rounded-[28px] [container-type:inline-size]" style={{ aspectRatio: "2000 / 1422" }}>
      <Image src={src} alt="" fill priority sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" />
      {/* spotlight */}
      <div
        aria-hidden
        className="absolute rounded-full blur-[4cqw]"
        style={{ left: "6%", top: "-22%", width: "46%", height: "78%", background: "radial-gradient(closest-side, rgba(150,220,190,0.55), rgba(47,174,116,0.18) 60%, transparent)" }}
      />
      {/* the word: faint on the dark grid, brighter where the spotlight falls */}
      <p
        aria-hidden
        className="absolute font-heading leading-none font-bold tracking-[-0.04em] whitespace-nowrap select-none"
        style={{
          left: "3%",
          top: "0.5cqw",
          fontSize: "27.5cqw",
          backgroundImage: "radial-gradient(ellipse 34% 60% at 27% 35%, rgba(222,248,236,0.9) 0%, rgba(160,222,194,0.5) 40%, rgba(255,255,255,0.075) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Scinode
      </p>
      <Image src={src} alt="Scinode for Researchers dashboard on a laptop" fill sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" style={{ clipPath: laptop }} />
    </div>
  )
}
