"use client";

import { SecondaryHeader } from "@/components/header-secondary";
import { VantaBackground } from "@/components/vanta-background";
import dynamic from "next/dynamic";

interface KnowledgeLocation {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  description: string;
  region: string;
  contributor: string;
}

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function ExplorePage() {
  return (
    <div className="min-h-screen relative">
      {/* Global background */}
      <div className="fixed inset-0 -z-20">
        <VantaBackground />
      </div>

      <SecondaryHeader text="Arbre des Savoirs Interactif" />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="space-y-2 fade-scale-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Explorer les Savoirs
            </h2>
            <p className="text-lg text-foreground/70">
              Naviguez à travers une carte interactive des savoirs ancestraux
              connectés par région et thématique
            </p>
          </div>

          {/* Interactive Map */}
          <div className="fade-scale-in" style={{ animationDelay: "0.1s" }}>
            <Map posix={[-18.8792, 47.5079]} />
          </div>

          {/* Instructions */}
          <div className="glass p-6 rounded-lg text-center text-foreground/80">
            <p>
              Cliquez sur un point pour découvrir les détails. Utilisez les
              boutons zoom pour explorer différentes régions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
