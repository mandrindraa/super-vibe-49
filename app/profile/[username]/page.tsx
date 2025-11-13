"use client";

import BadgeShowcase from "@/components/badge-showcase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Award,
  Globe,
  MapPin,
  Share2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

interface Contributor {
  username: string;
  name: string;
  bio: string;
  region: string;
  website?: string;
  avatar: string;
  joinedDate: string;
  totalVotes: number;
  knowledgeCount: number;
  reputationScore: number;
  badges: string[];
  publications: any[];
}

const contributors: Record<string, Contributor> = {
  "marie-dubois": {
    username: "marie-dubois",
    name: "Marie Dubois",
    bio: "Passionnée par l'agriculture ancestrale et la transmission des savoirs de mes grands-parents.",
    region: "Normandie",
    website: "www.mariedubois.com",
    avatar: "M",
    joinedDate: "2023-06-15",
    totalVotes: 245,
    knowledgeCount: 8,
    reputationScore: 2450,
    badges: ["🌱", "🔥", "🌸", "💎"],
    publications: [
      {
        id: "1",
        title: "Techniques de Semis Ancestrales",
        votes: 45,
        era: "XVIIIe siècle",
      },
      {
        id: "6",
        title: "Calendrier Lunaire Agricole",
        votes: 32,
        era: "Antiquité",
      },
      {
        id: "11",
        title: "Rotation des Cultures",
        votes: 28,
        era: "Renaissance",
      },
    ],
  },
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const contributor =
    contributors[params.username] || contributors["marie-dubois"];
  const [isFollowing, setIsFollowing] = useState(false);

  const contributorBadges = [
    {
      icon: "🌱",
      name: "Semeur de mémoire",
      description: "1er savoir publié",
      unlocked: true,
    },
    {
      icon: "🔥",
      name: "Porteur de flambeau",
      description: "+100 votes",
      unlocked: true,
    },
    {
      icon: "🌸",
      name: "Gardien du savoir",
      description: "5 savoirs +80%",
      unlocked: true,
    },
    { icon: "💎", name: "Sage", description: "+500 votes", unlocked: true },
    {
      icon: "🕊️",
      name: "Éclaireur",
      description: "Votes fréquents",
      unlocked: false,
    },
  ];

  const reputationTiers = [
    { min: 0, max: 100, label: "Apprenti", color: "from-blue-400 to-blue-600" },
    {
      min: 100,
      max: 500,
      label: "Contributeur",
      color: "from-green-400 to-green-600",
    },
    {
      min: 500,
      max: 1000,
      label: "Expert",
      color: "from-purple-400 to-purple-600",
    },
    {
      min: 1000,
      max: 2500,
      label: "Maître",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      min: 2500,
      max: Number.POSITIVE_INFINITY,
      label: "Sage",
      color: "from-red-400 to-red-600",
    },
  ];

  const getCurrentTier = () => {
    return (
      reputationTiers.find(
        (tier) =>
          contributor.reputationScore >= tier.min &&
          contributor.reputationScore < tier.max
      ) || reputationTiers[reputationTiers.length - 1]
    );
  };

  const currentTier = getCurrentTier();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 glass dark:bg-white/5 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Link>
          <h1 className="text-xl font-bold text-primary">
            Profil Contributeur
          </h1>
          <div className="w-12" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Profile Header */}
        <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentTier.color} flex items-center justify-center text-4xl text-white shadow-lg`}
            >
              {contributor.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  {contributor.name}
                </h1>
                <p className="text-foreground/60">@{contributor.username}</p>
              </div>

              <p className="text-foreground/80 max-w-2xl">{contributor.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                {contributor.region && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {contributor.region}
                  </div>
                )}
                {contributor.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {contributor.website}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Membre depuis{" "}
                  {new Date(contributor.joinedDate).toLocaleDateString("fr-FR")}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`${
                    isFollowing ? "bg-accent" : "bg-primary"
                  } hover:opacity-90 text-primary-foreground transition-all`}
                >
                  {isFollowing ? "Suivi" : "Suivre"}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reputation Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Reputation Score */}
          <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground">Score de Réputation</h3>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>

            <div className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {contributor.reputationScore}
              </div>

              <div
                className={`inline-block px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${currentTier.color}`}
              >
                {currentTier.label}
              </div>

              {/* Tier Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-foreground/70">
                  <span>Vers le prochain niveau</span>
                  <span>{contributor.reputationScore % 500}/500</span>
                </div>
                <div className="w-full h-2 bg-muted dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{
                      width: `${
                        ((contributor.reputationScore % 500) / 500) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-foreground">Statistiques</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foreground/70">Savoirs Publiés</span>
                <span className="font-bold text-lg text-primary">
                  {contributor.knowledgeCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Votes Reçus</span>
                <span className="font-bold text-lg text-accent">
                  {contributor.totalVotes}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Moyenne par Savoir</span>
                <span className="font-bold text-lg text-primary">
                  {Math.round(
                    contributor.totalVotes / contributor.knowledgeCount
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Taux d'Approbation</span>
                <span className="font-bold text-lg text-green-500">87%</span>
              </div>
            </div>
          </div>

          {/* Contribution Timeline */}
          <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-foreground">Activité</h3>
            <div className="space-y-3">
              {[
                { date: "Aujourd'hui", action: "+15 votes" },
                { date: "Hier", action: "Nouveau savoir" },
                { date: "Il y a 3j", action: "+45 votes" },
                { date: "Il y a 1 semaine", action: "Badge débloqué" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-foreground/60">{item.date}</span>
                  <span className="font-medium text-foreground">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-8 mb-8">
          <BadgeShowcase badges={contributorBadges} />
        </div>

        {/* Publications */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Publications</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {contributor.publications.map((pub: any) => (
              <Link key={pub.id} href={`/detail/${pub.id}`}>
                <Card className="h-full cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 glass dark:bg-white/8 dark:border-white/10 overflow-hidden">
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-foreground text-lg hover:text-primary transition-colors">
                        {pub.title}
                      </h3>
                      <span className="text-xs bg-primary/10 dark:bg-primary/20 text-primary px-2 py-1 rounded">
                        {pub.era}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-primary/20 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">👍</span>
                        <span className="font-bold text-foreground">
                          {pub.votes}
                        </span>
                      </div>
                      <span className="text-xs text-foreground/60">
                        Savoir #{pub.id}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
