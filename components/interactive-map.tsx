"use client";

import { Button } from "@/components/ui/button";
import { MapPin, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface KnowledgeLocation {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  description: string;
  region: string;
  contributor: string;
}

const knowledgeLocations: KnowledgeLocation[] = [
  {
    id: "1",
    name: "Techniques de Semis",
    category: "Agriculture",
    lat: -18.9102,
    lng: 47.5258,
    description: "Méthodes ancestrales de semis",
    region: "Normandie",
    contributor: "Marie Dubois",
  },
  {
    id: "2",
    name: "Fromage Fermier",
    category: "Alimentation",
    lat: -18.8795,
    lng: 47.5323,
    description: "Savoir-faire fromager",
    region: "Alpes",
    contributor: "Jean Leclerc",
  },
  {
    id: "3",
    name: "Médecine des Plantes",
    category: "Santé",
    lat: -18.8826,
    lng: 47.5294,
    description: "Remèdes naturels",
    region: "Provence",
    contributor: "Sophie Martin",
  },
  {
    id: "4",
    name: "Charpente Traditionnelle",
    category: "Construction",
    lat: -18.8701,
    lng: 47.8,
    description: "Assemblages secrets",
    region: "Bretagne",
    contributor: "Pierre Bernard",
  },
  {
    id: "5",
    name: "Teinture Naturelle",
    category: "Artisanat",
    lat: -19.98,
    lng: 47.5439,
    description: "Colorants naturels",
    region: "Aquitaine",
    contributor: "Isabelle Rousseau",
  },
  {
    id: "6",
    name: "Calendrier Lunaire",
    category: "Agriculture",
    lat: -17,
    lng: 47.5151,
    description: "Cycles lunaires",
    region: "Centre-Val de Loire",
    contributor: "Thomas Aubert",
  },
];

interface InteractiveMapProps {
  onSelect?: (location: KnowledgeLocation) => void;
}

export default function InteractiveMap({ onSelect }: InteractiveMapProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedLocation, setSelectedLocation] =
    useState<KnowledgeLocation | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? prev + 0.2 : prev - 0.2;
      return Math.min(Math.max(newZoom, 0.6), 2);
    });
  };

  const handleLocationClick = (location: KnowledgeLocation) => {
    setSelectedLocation(location);
    onSelect?.(location);
  };

  export const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Agriculture: "from-green-400 to-green-600",
      Alimentation: "from-orange-400 to-orange-600",
      Santé: "from-red-400 to-red-600",
      Construction: "from-blue-400 to-blue-600",
      Artisanat: "from-purple-400 to-purple-600",
    };
    return colors[category] || "from-gray-400 to-gray-600";
  };

  return (
    <div className="w-full space-y-4">
      {/* Map Container */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
        {/* SVG Map Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Zoomed Container */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center",
          }}
        >
          {/* Knowledge Points */}
          {knowledgeLocations.map((location) => (
            <div
              key={location.id}
              className="absolute transition-all duration-300 cursor-pointer group"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredId(location.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleLocationClick(location)}
            >
              {/* Outer Glow */}
              <div
                className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${getCategoryColor(
                  location.category
                )}`}
                style={{
                  width: "48px",
                  height: "48px",
                  left: "-24px",
                  top: "-24px",
                }}
              />

              {/* Point */}
              <div
                className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${getCategoryColor(
                  location.category
                )} shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-2 border-white dark:border-slate-900 transform group-hover:scale-125`}
              >
                <MapPin className="w-6 h-6 text-white" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-lg">
                    {location.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute top-4 left-4 glass dark:bg-white/10 dark:border-white/15 p-3 rounded-lg space-y-2 z-20 text-sm">
          <p className="font-semibold text-foreground">Catégories</p>
          <div className="space-y-1">
            {[
              "Agriculture",
              "Alimentation",
              "Santé",
              "Construction",
              "Artisanat",
            ].map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(
                    cat
                  )}`}
                />
                <span className="text-xs text-foreground/70">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <Button
            size="sm"
            onClick={() => handleZoom("in")}
            className="bg-primary hover:bg-primary/90 shadow-lg"
            disabled={zoom >= 2}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => handleZoom("out")}
            className="bg-primary hover:bg-primary/90 shadow-lg"
            disabled={zoom <= 0.6}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Detail Card */}
      {selectedLocation && (
        <div className="glass dark:bg-white/8 dark:border-white/15 p-6 rounded-lg animate-fade-scale-in">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedLocation.name}
                </h3>
                <p className="text-sm text-foreground/70">
                  {selectedLocation.region}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(
                  selectedLocation.category
                )}`}
              >
                {selectedLocation.category}
              </span>
            </div>
            <p className="text-foreground/80">{selectedLocation.description}</p>
            <div className="pt-2 border-t border-primary/20 dark:border-white/10">
              <p className="text-xs text-foreground/60">
                Par {selectedLocation.contributor}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
