"use client"

import { useState } from "react"
import { SmilePlus } from "lucide-react"

interface Reaction {
  emoji: string
  label: string
  count: number
  userReacted: boolean
}

interface ReactionsBarProps {
  onReactionClick?: (emoji: string) => void
}

const reactionOptions = [
  { emoji: "👍", label: "Utile" },
  { emoji: "❤️", label: "J'aime" },
  { emoji: "🔥", label: "C'est chaud !" },
  { emoji: "🎓", label: "Instructif" },
  { emoji: "💯", label: "Parfait" },
  { emoji: "🤔", label: "Intéressant" },
]

export default function ReactionsBar({ onReactionClick }: ReactionsBarProps) {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "👍", label: "Utile", count: 24, userReacted: false },
    { emoji: "❤️", label: "J'aime", count: 15, userReacted: false },
    { emoji: "🔥", label: "C'est chaud !", count: 8, userReacted: false },
  ])
  const [showPicker, setShowPicker] = useState(false)

  const handleReaction = (emoji: string) => {
    const existingReaction = reactions.find((r) => r.emoji === emoji)

    if (existingReaction) {
      if (existingReaction.userReacted) {
        setReactions(reactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count - 1, userReacted: false } : r)))
      } else {
        setReactions(reactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1, userReacted: true } : r)))
      }
    } else {
      const newReaction = reactionOptions.find((r) => r.emoji === emoji)
      if (newReaction) {
        setReactions([...reactions, { ...newReaction, count: 1, userReacted: true }])
      }
    }

    onReactionClick?.(emoji)
    setShowPicker(false)
  }

  return (
    <div className="glass dark:bg-white/8 dark:border-white/15 rounded-lg p-4 space-y-4">
      <h4 className="font-semibold text-foreground text-sm">Réactions</h4>

      {/* Reaction Pills */}
      <div className="flex flex-wrap gap-2">
        {reactions.map((reaction) => (
          <button
            key={reaction.emoji}
            onClick={() => handleReaction(reaction.emoji)}
            className={`px-3 py-2 rounded-full text-sm transition-all duration-200 flex items-center gap-1 ${
              reaction.userReacted
                ? "bg-primary/20 dark:bg-primary/30 border-2 border-primary scale-110"
                : "bg-muted dark:bg-white/10 hover:bg-muted/80 dark:hover:bg-white/15 border border-primary/20 dark:border-white/10"
            }`}
          >
            <span className="text-base">{reaction.emoji}</span>
            <span className={reaction.userReacted ? "font-bold text-primary" : "text-foreground/70"}>
              {reaction.count}
            </span>
          </button>
        ))}

        {/* Add Reaction Button */}
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="px-3 py-2 rounded-full text-sm transition-all duration-200 bg-muted dark:bg-white/10 hover:bg-muted/80 dark:hover:bg-white/15 border border-primary/20 dark:border-white/10 flex items-center gap-1"
          >
            <SmilePlus className="w-4 h-4" />
          </button>

          {/* Emoji Picker */}
          {showPicker && (
            <div className="absolute top-full left-0 mt-2 glass dark:bg-white/8 dark:border-white/15 rounded-lg p-3 shadow-lg z-10 grid grid-cols-3 gap-2 w-48">
              {reactionOptions.map((option) => (
                <button
                  key={option.emoji}
                  onClick={() => handleReaction(option.emoji)}
                  className="p-2 hover:bg-primary/20 dark:hover:bg-primary/30 rounded transition-colors text-xl"
                  title={option.label}
                >
                  {option.emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
