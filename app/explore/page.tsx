"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"
import InteractiveMap from "@/app/components/interactive-map"

interface KnowledgeLocation {
  id: string
  name: string
  category: string
  x: number
  y: number
  description: string
  region: string
  contributor: string
}

export default function ExplorePage() {
  const [selectedLocation, setSelectedLocation] = useState<KnowledgeLocation | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 glass dark:bg-white/5 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
            <ArrowLeft className="w-5 h-5 text-primary" />
            <Leaf className="w-6 h-6 text-primary" />
          </Link>
          <h1 className="text-2xl font-bold text-primary">Arbre des Savoirs Interactif</h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="space-y-2 fade-scale-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Explorer les Savoirs</h2>
            <p className="text-lg text-foreground/70">
              Naviguez à travers une carte interactive des savoirs ancestraux connectés par région et thématique
            </p>
          </div>

          {/* Interactive Map */}
          <div className="fade-scale-in" style={{ animationDelay: "0.1s" }}>
            <InteractiveMap onSelect={setSelectedLocation} />
          </div>

          {/* Instructions */}
          <div className="glass dark:bg-white/8 dark:border-white/15 p-6 rounded-lg text-center text-foreground/80">
            <p>
              Cliquez sur un point pour découvrir les détails. Utilisez les boutons zoom pour explorer différentes
              régions.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
