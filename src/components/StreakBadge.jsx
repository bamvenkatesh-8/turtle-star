export default function StreakBadge({ streak }) {
  if (!streak) return null
  return (
    <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-xl px-3 py-1.5">
      <span className="text-base">🔥</span>
      <span className="font-semibold text-orange-600 text-sm">{streak} day{streak !== 1 ? 's' : ''}!</span>
    </div>
  )
}
