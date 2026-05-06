export default function Header({ onBack, onHome, title, theme, rightSlot }) {
  const font = theme?.fontFamily ? `font-[${theme.fontFamily}]` : ''
  return (
    <header
      className={`sticky top-0 z-40 flex items-center gap-2 px-3 py-2 shadow-md ${theme?.header || 'bg-purple-500'}`}
    >
      {/* Left: Back + Home */}
      <div className="flex items-center gap-1 min-w-[88px]">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 transition-transform text-white text-xl font-bold"
            aria-label="Go back"
          >
            ←
          </button>
        )}
        {onHome && (
          <button
            onClick={onHome}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 transition-transform text-xl"
            aria-label="Go home"
          >
            🏠
          </button>
        )}
      </div>

      {/* Center: title */}
      <div className="flex-1 text-center">
        <span
          className={`text-lg font-bold text-white truncate ${theme?.headerText || 'text-white'}`}
          style={{ fontFamily: theme?.fontFamily }}
        >
          {title}
        </span>
      </div>

      {/* Right slot */}
      <div className="min-w-[88px] flex justify-end">{rightSlot}</div>
    </header>
  )
}
