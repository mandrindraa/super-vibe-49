"use client"

interface Badge {
  icon: string
  name: string
  description: string
  unlocked: boolean
}

interface BadgeShowcaseProps {
  badges: Badge[]
}

export default function BadgeShowcase({ badges }: BadgeShowcaseProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Badges Communautaires</h3>

      <div className="grid grid-cols-5 gap-3">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-110 ${
              badge.unlocked ? "opacity-100" : "opacity-40"
            }`}
          >
            {/* Badge Circle */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${
                badge.unlocked
                  ? "bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-yellow-500/50"
                  : "bg-muted dark:bg-white/10"
              }`}
            >
              {badge.icon}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-32">
              <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2 py-1 rounded text-xs font-semibold text-center whitespace-normal shadow-lg">
                <p className="font-bold">{badge.name}</p>
                <p className="text-xs opacity-90">{badge.description}</p>
              </div>
            </div>

            {/* Lock Icon */}
            {!badge.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
