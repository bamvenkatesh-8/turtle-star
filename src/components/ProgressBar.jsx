import { motion } from 'framer-motion'

export default function ProgressBar({ completed, total, theme }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-white/80" style={{ fontFamily: theme?.fontFamily }}>
          {completed}/{total} tasks done
        </span>
        <span className="text-sm font-bold text-white/80">{pct}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/15 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${theme?.accentGrad || 'from-purple-400 to-blue-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
