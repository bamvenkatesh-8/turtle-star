import { motion } from 'framer-motion'

export default function ProgressBar({ completed, total, theme }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const accentColor = theme?.accentColor || '#007AFF'

  return (
    <div
      className="px-4 py-3 border-b"
      style={{ background: theme?.sectionBg || '#FFFFFF', borderColor: theme?.headerBorder || '#E5E7EB' }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold" style={{ color: theme?.textPrimary || '#374151' }}>
          {completed}/{total} tasks done
        </span>
        <span className="text-sm font-semibold" style={{ color: theme?.textSecondary || '#9CA3AF' }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: theme?.trackBg || '#E5E7EB' }}>
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
