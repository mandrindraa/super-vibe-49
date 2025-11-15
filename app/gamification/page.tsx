"use client";

import { SecondaryHeader } from "@/components/header-secondary";
import { Card } from "@/components/ui/card";
import { VantaBackground } from "@/components/vanta-background";
import { CheckCircle, Flame, Star, Target, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Contributor {
  rank: number;
  name: string;
  username: string;
  reputation: number;
  savoirs: number;
  streak: number;
  badge: string;
}

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  reward: number;
  difficulty: "facile" | "moyen" | "difficile";
  completed: boolean;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  rarity: "commun" | "rare" | "épique" | "légendaire";
  unlocked: boolean;
}

const leaderboardData: Contributor[] = [
  {
    rank: 1,
    name: "Marie Dubois",
    username: "marie-dubois",
    reputation: 2450,
    savoirs: 8,
    streak: 15,
    badge: "🌸",
  },
  {
    rank: 2,
    name: "Jean Leclerc",
    username: "jean-leclerc",
    reputation: 1980,
    savoirs: 6,
    streak: 12,
    badge: "🔥",
  },
  {
    rank: 3,
    name: "Sophie Martin",
    username: "sophie-martin",
    reputation: 1650,
    savoirs: 5,
    streak: 8,
    badge: "🔥",
  },
  {
    rank: 4,
    name: "Pierre Bernard",
    username: "pierre-bernard",
    reputation: 1420,
    savoirs: 4,
    streak: 6,
    badge: "🌱",
  },
  {
    rank: 5,
    name: "Isabelle Rousseau",
    username: "isabelle-rousseau",
    reputation: 1200,
    savoirs: 4,
    streak: 5,
    badge: "🌱",
  },
];

const questsData: Quest[] = [
  {
    id: "1",
    title: "Votre premier savoir",
    description: "Publiez votre premier savoir ancestral",
    icon: "🌱",
    progress: 100,
    reward: 100,
    difficulty: "facile",
    completed: true,
  },
  {
    id: "2",
    title: "100 votes gagnés",
    description: "Accumulez 100 votes sur l'un de vos savoirs",
    icon: "👍",
    progress: 75,
    reward: 250,
    difficulty: "moyen",
    completed: false,
  },
  {
    id: "3",
    title: "Semaine productive",
    description: "Publiez 3 savoirs en une semaine",
    icon: "⚡",
    progress: 33,
    reward: 150,
    difficulty: "moyen",
    completed: false,
  },
  {
    id: "4",
    title: "Expert reconnu",
    description: "Accumulez 500 votes positifs",
    icon: "💎",
    progress: 45,
    reward: 500,
    difficulty: "difficile",
    completed: false,
  },
  {
    id: "5",
    title: "Contributeur loyal",
    description: "Maintenez une série de 7 jours consécutifs",
    icon: "🔥",
    progress: 60,
    reward: 200,
    difficulty: "difficile",
    completed: false,
  },
];

const achievementsData: Achievement[] = [
  {
    id: "1",
    icon: "🌱",
    title: "Semeur de mémoire",
    description: "Publiez votre premier savoir",
    rarity: "commun",
    unlocked: true,
  },
  {
    id: "2",
    icon: "🔥",
    title: "Porteur de flambeau",
    description: "Obtenez 100 votes au total",
    rarity: "rare",
    unlocked: true,
  },
  {
    id: "3",
    icon: "🌸",
    title: "Gardien du savoir",
    description: "5 savoirs avec plus de 80% d'approbation",
    rarity: "rare",
    unlocked: true,
  },
  {
    id: "4",
    icon: "💎",
    title: "Sage",
    description: "500 votes positifs",
    rarity: "épique",
    unlocked: false,
  },
  {
    id: "5",
    icon: "🕊️",
    title: "Éclaireur",
    description: "Voter régulièrement sur les savoirs d'autrui",
    rarity: "épique",
    unlocked: false,
  },
  {
    id: "6",
    icon: "👑",
    title: "Légende vivante",
    description: "Atteindre 3000 points de réputation",
    rarity: "légendaire",
    unlocked: false,
  },
];

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<
    "leaderboard" | "quests" | "achievements"
  >("leaderboard");

  return (
    <div className="min-h-screen relative">
      {/* Global background */}
      <div className="fixed inset-0 -z-20">
        <VantaBackground />
      </div>

      <SecondaryHeader text="Quêtes et Progression" />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Header Section */}
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl font-bold gradient-text">
            Défiez-vous et Explorez
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Participez à la communauté, débloquez des badges, et grimpez les
            classements en partageant vos savoirs ancestraux.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: "leaderboard", label: "Classement", icon: Trophy },
            { id: "quests", label: "Quêtes", icon: Target },
            { id: "achievements", label: "Accomplissements", icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass text-foreground hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="space-y-4">
            {leaderboardData.map((contributor) => (
              <Link
                key={contributor.rank}
                href={`/profile/${contributor.username}`}
                className="block"
              >
                <div className="glass rounded-lg p-4 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      {contributor.rank <= 3 ? (
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                            contributor.rank === 1
                              ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                              : contributor.rank === 2
                              ? "bg-gradient-to-br from-gray-300 to-gray-500"
                              : "bg-gradient-to-br from-orange-400 to-orange-600"
                          }`}
                        >
                          {contributor.rank === 1
                            ? "🥇"
                            : contributor.rank === 2
                            ? "🥈"
                            : "🥉"}
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-muted font-bold text-foreground">
                          #{contributor.rank}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {contributor.name}
                        </h3>
                        <span className="text-2xl flex-shrink-0">
                          {contributor.badge}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/60 truncate">
                        @{contributor.username}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 md:gap-6 text-right flex-shrink-0">
                      <div>
                        <p className="text-xl md:text-2xl font-bold text-primary">
                          {contributor.reputation}
                        </p>
                        <p className="text-xs text-foreground/60">Points</p>
                      </div>
                      <div>
                        <p className="text-xl md:text-2xl font-bold text-accent">
                          {contributor.savoirs}
                        </p>
                        <p className="text-xs text-foreground/60">Savoirs</p>
                      </div>
                      {contributor.streak > 0 && (
                        <div className="flex items-center gap-1 bg-red-500/20 px-2 md:px-3 py-1 rounded-lg">
                          <Flame className="w-4 h-4 text-red-500" />
                          <span className="font-bold text-red-500">
                            {contributor.streak}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Quests Tab */}
        {activeTab === "quests" && (
          <div className="grid md:grid-cols-2 gap-6">
            {questsData.map((quest) => (
              <Card
                key={quest.id}
                className="glass p-6 space-y-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{quest.icon}</div>
                    <div>
                      <h3 className="font-bold text-foreground">
                        {quest.title}
                      </h3>
                      <p className="text-sm text-foreground/70">
                        {quest.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      quest.difficulty === "facile"
                        ? "bg-green-500/20 text-green-600"
                        : quest.difficulty === "moyen"
                        ? "bg-yellow-500/20 text-yellow-600"
                        : "bg-red-500/20 text-red-600"
                    }`}
                  >
                    {quest.difficulty}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Progression</span>
                    <span className="font-bold text-foreground">
                      {quest.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${quest.progress}%` }}
                    />
                  </div>
                </div>

                {/* Reward */}
                <div className="flex items-center justify-between p-4 glass border-t border-primary/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-yellow-600">
                      {quest.reward} points
                    </span>
                  </div>
                  {quest.completed && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            {["commun", "rare", "épique", "légendaire"].map((rarity) => {
              const rarityAchievements = achievementsData.filter(
                (a) => a.rarity === rarity
              );
              return (
                <div key={rarity} className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground capitalize flex items-center gap-2">
                    <span className="text-2xl">
                      {rarity === "commun"
                        ? "⚪"
                        : rarity === "rare"
                        ? "🔵"
                        : rarity === "épique"
                        ? "🟣"
                        : "🟡"}
                    </span>
                    {rarity === "commun"
                      ? "Commun"
                      : rarity === "rare"
                      ? "Rare"
                      : rarity === "épique"
                      ? "Épique"
                      : "Légendaire"}
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    {rarityAchievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={`glass p-6 text-center space-y-3 transition-all duration-300 ${
                          achievement.unlocked
                            ? "hover:shadow-lg"
                            : "opacity-50"
                        }`}
                      >
                        <div className="text-5xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-bold text-foreground">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-foreground/70">
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.unlocked && (
                          <div className="text-xs font-semibold text-green-600 p-2 glass border-t border-primary/20">
                            Débloqué
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
