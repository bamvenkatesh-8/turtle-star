import { motion } from 'framer-motion'

export default function ProgressBar({ completed, total, theme }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold" style={{ fontFamily: theme?.fontFamily }}>
          {completed}/{total} done
        </span>
        <span className="text-sm font-bold">{pct}%</span>
      </div>
      <div className="h-4 rounded-full bg-white/40 overflow-hidden border-2 border-white/30">
        <motion.div
          className={`h-full rounded-full ${theme?.accent || 'bg-yellow-400'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
