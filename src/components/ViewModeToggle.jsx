export default function ViewModeToggle({ mode, onChange }) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-0.5 gap-0.5">
      <button
        onClick={() => onChange('card')}
        className={`px-3 py-1.5 text-sm rounded-[10px] transition-all duration-150 ${
          mode === 'card'
            ? 'bg-white shadow-sm text-gray-900 font-semibold'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="Card view"
      >
        🃏
      </button>
      <button
        onClick={() => onChange('list')}
        className={`px-3 py-1.5 text-sm rounded-[10px] transition-all duration-150 ${
          mode === 'list'
            ? 'bg-white shadow-sm text-gray-900 font-semibold'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        aria-label="List view"
      >
        📋
      </button>
    </div>
  )
}
