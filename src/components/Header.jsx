export default function Header({ onBack, onHome, title, theme, rightSlot }) {
  const btnClass = theme?.isDark
    ? 'bg-white/10 hover:bg-white/20 text-white focus-visible:ring-white/40'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 focus-visible:ring-gray-400'

  return (
    <header
      className="sticky top-0 z-40 flex items-center gap-2 px-4 py-3 backdrop-blur-md border-b"
      style={{ background: theme?.headerBg || 'rgba(255,255,255,0.80)', borderColor: theme?.headerBorder || '#E5E5EA' }}
    >
      {/* Left: Back + Home */}
      <div className="flex items-center gap-1 min-w-[88px]">
        {onBack && (
          <button
            onClick={onBack}
            className={`flex items-center justify-center w-10 h-10 rounded-xl active:scale-95 transition-all duration-150 text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${btnClass}`}
            aria-label="Go back"
          >
            ←
          </button>
        )}
        {onHome && (
          <button
            onClick={onHome}
            className={`flex items-center justify-center w-10 h-10 rounded-xl active:scale-95 transition-all duration-150 text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${btnClass}`}
            aria-label="Go home"
          >
            🏠
          </button>
        )}
      </div>

      {/* Center: title */}
      <div className="flex-1 text-center">
        <span
          className="text-base font-semibold tracking-tight truncate"
          style={{ color: theme?.textPrimary || '#1C1C1E' }}
        >
          {title}
        </span>
      </div>

      {/* Right slot */}
      <div className="min-w-[88px] flex justify-end">{rightSlot}</div>
    </header>
  )
}
