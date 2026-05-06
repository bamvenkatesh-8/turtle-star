export default function ViewModeToggle({ mode, onChange }) {
  return (
    <div className="flex bg-white/15 rounded-xl overflow-hidden border border-white/10">
      <button
        onClick={() => onChange('card')}
        className={`px-3 py-2 text-lg transition-all ${
          mode === 'card' ? 'bg-white/30 text-white' : 'text-white/50 hover:text-white hover:bg-white/15'
        }`}
        aria-label="Card view"
      >
        🃏
      </button>
      <button
        onClick={() => onChange('list')}
        className={`px-3 py-2 text-lg transition-all ${
          mode === 'list' ? 'bg-white/30 text-white' : 'text-white/50 hover:text-white hover:bg-white/15'
        }`}
        aria-label="List view"
      >
        📋
      </button>
    </div>
  )
}
