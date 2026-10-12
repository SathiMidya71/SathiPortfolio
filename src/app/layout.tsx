import type { Metadata } from "next"
import { Bricolage_Grotesque, Caveat, Figtree } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

// Free stand-ins for the reference site's fonts: Bricolage Grotesque ≈ Acorn, Figtree ≈ Roobert
const heading = Bricolage_Grotesque({
  variable: "--font-heading-face",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
})

// Handwritten annotations (e.g. the note above the intro video)
const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["600", "700"],
})

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sathi Midya | Product Designer",
  description:
    "Sathi Midya is a Product Designer in Bangalore who designs research-led experiences for B2B SaaS and healthcare products.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" className={`${heading.variable} ${figtree.variable} ${hand.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster position="bottom-center" theme="light" />
      </body>
    </html>
  )
}
