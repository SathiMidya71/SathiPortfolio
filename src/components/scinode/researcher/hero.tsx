import Image from "next/image"

// Hero for Scinode for Researchers: Sathi's laptop mockup with a huge "Scinode for Researchers" title tucked
// behind the screen. Layers: the full image, the title, then the same image clipped to the laptop outline
// (image coordinates in %, traced on the 2000×1422 original), so the lid hides the bottom of the letters.
const src = "/case-studies/scinode/researcher-hero.jpg"
const laptop =
  "polygon(23.6% 26.16%, 24.3% 24.75%, 72.9% 6.75%, 74.2% 7.31%, 74.75% 8.44%, 83% 54.15%, 89.3% 52.32%, 89.4% 54.15%, 27.3% 77.43%, 26.85% 76.65%, 32.6% 73.28%)"

export function ResearcherHero() {
  return (
    <div className="relative overflow-hidden rounded-[20px] md:rounded-[28px] [container-type:inline-size]" style={{ aspectRatio: "2000 / 1422" }}>
      <Image src={src} alt="" fill priority sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" />
      {/* the title runs parallel to the lid's top edge, its lower part tucked behind the screen */}
      <p
        aria-hidden
        className="absolute font-heading leading-[0.92] font-bold tracking-[-0.03em] whitespace-nowrap select-none"
        style={{
          left: "24.3%",
          top: "24.75%",
          fontSize: "5.9cqw",
          transformOrigin: "0 100%",
          transform: "translateY(-100%) rotate(-14.75deg) translateY(0.7cqw)",
          color: "#a9dcc3",
          textShadow: "0 0 3cqw rgba(47,174,116,0.35)",
        }}
      >
        Scinode
        <br />
        for Researchers
      </p>
      <Image src={src} alt="Scinode for Researchers dashboard on a laptop" fill sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" style={{ clipPath: laptop }} />
    </div>
  )
}
