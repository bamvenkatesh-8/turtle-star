import { motion } from 'framer-motion'

export default function ProgressBar({ completed, total, theme }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const accentColor = theme?.accentColor || '#007AFF'

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          {completed}/{total} tasks done
        </span>
        <span className="text-sm font-semibold text-gray-400">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accentColor }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
