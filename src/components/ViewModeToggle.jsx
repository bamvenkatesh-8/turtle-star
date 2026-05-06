export default function ViewModeToggle({ mode, onChange }) {
  return (
    <div className="flex bg-white/20 rounded-xl overflow-hidden">
      <button
        onClick={() => onChange('card')}
        className={`px-3 py-2 text-lg transition-colors ${
          mode === 'card' ? 'bg-white text-gray-800' : 'text-white hover:bg-white/20'
        }`}
        aria-label="Card view"
      >
        🃏
      </button>
      <button
        onClick={() => onChange('list')}
        className={`px-3 py-2 text-lg transition-colors ${
          mode === 'list' ? 'bg-white text-gray-800' : 'text-white hover:bg-white/20'
        }`}
        aria-label="List view"
      >
        📋
      </button>
    </div>
  )
}
