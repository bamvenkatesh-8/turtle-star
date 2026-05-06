export default function RoutineFilter({ routines, selectedId, onSelect, theme }) {
  const accentColor = theme?.accentColor || '#007AFF'

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-white border-b border-gray-100 scrollbar-none">
      <button
        onClick={() => onSelect(null)}
        className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        style={!selectedId
          ? { backgroundColor: accentColor, color: '#fff' }
          : { backgroundColor: '#F3F4F6', color: '#4B5563', border: '1px solid #E5E7EB' }
        }
      >
        All Tasks
      </button>
      {routines.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r.id)}
          className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          style={selectedId === r.id
            ? { backgroundColor: accentColor, color: '#fff' }
            : { backgroundColor: '#F3F4F6', color: '#4B5563', border: '1px solid #E5E7EB' }
          }
        >
          {r.name}
        </button>
      ))}
    </div>
  )
}
