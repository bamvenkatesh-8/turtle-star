export default function StreakBadge({ streak, theme }) {
  if (!streak) return null
  return (
    <div
      className="flex items-center gap-1 bg-orange-100 border-2 border-orange-300 rounded-xl px-3 py-1"
      style={{ fontFamily: theme?.fontFamily }}
    >
      <span className="text-xl">🔥</span>
      <span className="font-bold text-orange-600 text-sm">{streak} day{streak !== 1 ? 's' : ''}!</span>
    </div>
  )
}
