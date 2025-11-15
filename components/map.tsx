"use client";

import L, { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

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
    lat: -20.9102,
    lng: 43.5258,
    description: "Méthodes ancestrales de semis",
    region: "Normandie",
    contributor: "Marie Dubois",
  },
  {
    id: "2",
    name: "Fromage Fermier",
    category: "Alimentation",
    lat: -18.8795,
    lng: 47.88,
    description: "Savoir-faire fromager",
    region: "Alpes",
    contributor: "Jean Leclerc",
  },
  {
    id: "3",
    name: "Médecine des Plantes",
    category: "Santé",
    lat: -18.8826,
    lng: 48.5294,
    description: "Remèdes naturels",
    region: "Provence",
    contributor: "Sophie Martin",
  },
  {
    id: "4",
    name: "Charpente Traditionnelle",
    category: "Construction",
    lat: -18.8701,
    lng: 46.8,
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

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Agriculture: "from-green-400 to-green-600",
    Alimentation: "from-orange-400 to-orange-600",
    Santé: "from-red-400 to-red-600",
    Construction: "from-blue-400 to-blue-600",
    Artisanat: "from-purple-400 to-purple-600",
  };
  return colors[category] || "from-gray-400 to-gray-600";
};

const DefaultIcon = L.icon({
  iconUrl: "/leaf-green1.png",
  iconSize: [20, 30], // size of the icon
  iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 0], // the same for the shadow
  popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 6,
};

export default function Map({ zoom = defaults.zoom, posix }: MapProps) {
  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      attributionControl={false}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreet</a> contributors'
      />
      {knowledgeLocations.map((selectedLocation) => (
        <Marker
          position={[selectedLocation.lat, selectedLocation.lng]}
          key={crypto.randomUUID()}
        >
          <Popup>
            {/* <div className="glass dark:bg-white/8 dark:border-white/15 p-6 rounded-lg animate-fade-scale-in"> */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-background">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-sm  text-foreground dark:text-background/70">
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
              <p className="text-foreground dark:text-background/80">
                {selectedLocation.description}
              </p>
              <div className="border-t border-primary/20 dark:border-white/10">
                <p className="text-xs text-foreground dark:text-background/60">
                  Par {selectedLocation.contributor}
                </p>
                <a href={`/detail/${selectedLocation.id}`}>
                  <Link></Link>
                </a>
              </div>
            </div>
            {/* </div> */}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
