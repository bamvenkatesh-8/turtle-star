export default function RoutineFilter({ routines, selectedId, onSelect, theme }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
          !selectedId
            ? `bg-white text-gray-900 border-white shadow-md`
            : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
        }`}
        style={{ fontFamily: theme?.fontFamily }}
      >
        All Tasks
      </button>
      {routines.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm transition-all border ${
            selectedId === r.id
              ? `bg-white text-gray-900 border-white shadow-md`
              : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
          }`}
          style={{ fontFamily: theme?.fontFamily }}
        >
          {r.name}
        </button>
      ))}
    </div>
  )
}
