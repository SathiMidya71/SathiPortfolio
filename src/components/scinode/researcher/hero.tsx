import Image from "next/image"

// Hero for Scinode for Researchers, in the style of Sathi's reference (a big, low-contrast name on one line lit by a soft
// spotlight, partly hidden behind the screen). Her laptop mockup, with the grid background extended upward so the
// word fits above the lid. Layers: the image, a mint spotlight, the word, then the same image clipped to the traced
// laptop outline (% of the 2000×1262 image), so the lid covers the bottom of the letters in "Researchers".
const src = "/case-studies/scinode/researcher-hero-v3.jpg"
const laptop =
  "polygon(23.6% 36.21%, 24.3% 34.63%, 72.9% 14.34%, 74.2% 14.98%, 74.75% 16.24%, 83% 67.75%, 89.3% 65.69%, 89.4% 67.75%, 27.3% 93.98%, 26.85% 93.11%, 32.6% 89.3%)"

export function ResearcherHero() {
  return (
    <div className="relative overflow-hidden rounded-[20px] md:rounded-[28px] [container-type:inline-size]" style={{ aspectRatio: "2000 / 1262" }}>
      <Image src={src} alt="" fill priority sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" />
      {/* spotlight */}
      <div
        aria-hidden
        className="absolute rounded-full blur-[4cqw]"
        style={{ left: "2%", top: "-38%", width: "44%", height: "90%", background: "radial-gradient(closest-side, rgba(150,220,190,0.55), rgba(47,174,116,0.18) 60%, transparent)" }}
      />
      {/* the word: faint on the dark grid, brighter where the spotlight falls */}
      <p
        aria-hidden
        className="absolute font-heading leading-none font-bold tracking-[-0.035em] whitespace-nowrap select-none"
        style={{
          left: "2.6%",
          top: "4.1cqw",
          fontSize: "9.2cqw",
          fontVariationSettings: "\"opsz\" 96",
          backgroundImage: "radial-gradient(ellipse 22% 120% at 14% 30%, rgba(222,248,236,0.9) 0%, rgba(160,222,194,0.5) 40%, rgba(214,240,228,0.16) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Scinode for Researchers
      </p>
      <Image src={src} alt="Scinode for Researchers dashboard on a laptop" fill sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" style={{ clipPath: laptop }} />
    </div>
  )
}
