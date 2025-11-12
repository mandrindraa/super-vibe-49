"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Badge {
  name: string
  icon: string
  description: string
  condition: string
}

const BADGES: Badge[] = [
  { name: "Graine", icon: "🌱", description: "1er savoir publié", condition: "1_published" },
  { name: "Flamme", icon: "🔥", description: "+100 votes au total", condition: "100_votes" },
  { name: "Fleur", icon: "🌸", description: "5 savoirs avec +80%", condition: "5_high_quality" },
  { name: "Sage", icon: "💎", description: "+500 votes positifs", condition: "500_votes" },
  { name: "Éclaireur", icon: "🕊️", description: "Votes fréquents", condition: "frequent_voter" },
]

interface VotingSystemProps {
  knowledgeId: string
  initialVotes?: number
  onVoteChange?: (newVotes: number) => void
}

export default function VotingSystem({ knowledgeId, initialVotes = 0, onVoteChange }: VotingSystemProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleVote = (direction: "up" | "down") => {
    setShowAnimation(true)

    if (userVote === direction) {
      // Remove vote
      setVotes((prev) => (direction === "up" ? prev - 1 : prev + 1))
      setUserVote(null)
    } else if (userVote === null) {
      // Add vote
      setVotes((prev) => (direction === "up" ? prev + 1 : prev - 1))
      setUserVote(direction)
    } else {
      // Change vote
      setVotes((prev) => (direction === "up" ? prev + 2 : prev - 2))
      setUserVote(direction)
    }

    setTimeout(() => setShowAnimation(false), 600)
    onVoteChange?.(votes)
  }

  // Calculate badge based on votes
  const getBadge = (): Badge | null => {
    if (votes >= 500) return BADGES[3] // Sage
    if (votes >= 100) return BADGES[1] // Flamme
    return null
  }

  const badge = getBadge()
  const approvalRate = votes > 0 ? Math.round((votes / (votes + Math.abs(Math.min(0, votes)))) * 100) : 0

  return (
    <div className="space-y-4">
      {/* Vote Buttons */}
      <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Approuvez-vous ce savoir ?</span>
          <span
            className={`text-2xl font-bold ${votes > 0 ? "text-green-500" : votes < 0 ? "text-red-500" : "text-muted-foreground"}`}
          >
            {votes > 0 ? "+" : ""}
            {votes}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => handleVote("up")}
            variant={userVote === "up" ? "default" : "outline"}
            size="sm"
            className={`flex-1 transition-all duration-300 ${userVote === "up" ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Utile
          </Button>
          <Button
            onClick={() => handleVote("down")}
            variant={userVote === "down" ? "default" : "outline"}
            size="sm"
            className={`flex-1 transition-all duration-300 ${userVote === "down" ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            Contestable
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="text-xs text-foreground/70 flex justify-between">
            <span>Taux d'approbation</span>
            <span className="font-semibold">{approvalRate}%</span>
          </div>
          <div className="w-full h-2 bg-muted dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${Math.min(approvalRate, 100)}%` }}
            />
          </div>
        </div>

        {/* Vote Count Details */}
        <div className="text-xs text-foreground/60">
          {votes > 0
            ? `${votes} vote${votes > 1 ? "s" : ""} positif${votes > 1 ? "s" : ""}`
            : votes < 0
              ? `${Math.abs(votes)} vote${Math.abs(votes) > 1 ? "s" : ""} contesté${Math.abs(votes) > 1 ? "s" : ""}`
              : "Aucun vote"}
        </div>
      </div>

      {/* Badge Display */}
      {badge && (
        <div
          className={`glass dark:bg-white/8 dark:border-white/15 rounded-lg p-4 space-y-3 animate-fade-scale-in border-l-4 border-yellow-500`}
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">{badge.icon}</div>
            <div>
              <p className="font-bold text-foreground">Badge débloqué : {badge.name}</p>
              <p className="text-sm text-foreground/70">{badge.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Growth Visualization */}
      <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Croissance du savoir
          </span>
        </div>

        <div className="relative h-24 bg-gradient-to-t from-primary/10 to-transparent dark:from-primary/5 rounded-lg overflow-hidden">
          {/* Animated Growth Chart */}
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(107, 114, 28)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(107, 114, 28)" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Growth curve - simple animated line */}
            <polyline
              points="0,80 20,75 40,70 60,65 80,55 100,45 120,35 140,25 160,15 180,8 200,5"
              fill="none"
              stroke="rgb(107, 114, 28)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              className="animate-draw-path"
            />

            {/* Area under curve */}
            <polygon
              points="0,80 20,75 40,70 60,65 80,55 100,45 120,35 140,25 160,15 180,8 200,5 200,100 0,100"
              fill="url(#growthGradient)"
              className="animate-fade-in"
            />
          </svg>

          {/* Milestone badges */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-2 pointer-events-none">
            {[0, 50, 100, 200, 500].map(
              (milestone) =>
                votes >= milestone && (
                  <div
                    key={milestone}
                    className="text-xs font-bold text-primary animate-bounce"
                    style={{ animationDelay: `${milestone * 0.1}s` }}
                  >
                    {milestone}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
