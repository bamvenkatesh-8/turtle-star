export default function Header({ onBack, onHome, title, theme, rightSlot }) {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200">
      {/* Left: Back + Home */}
      <div className="flex items-center gap-1 min-w-[88px]">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-150 text-gray-700 text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            aria-label="Go back"
          >
            ←
          </button>
        )}
        {onHome && (
          <button
            onClick={onHome}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-150 text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            aria-label="Go home"
          >
            🏠
          </button>
        )}
      </div>

      {/* Center: title */}
      <div className="flex-1 text-center">
        <span className="text-base font-semibold text-gray-900 tracking-tight truncate">
          {title}
        </span>
      </div>

      {/* Right slot */}
      <div className="min-w-[88px] flex justify-end">{rightSlot}</div>
    </header>
  )
}
