import { useState } from 'react'
import { UI_THEMES } from '../data/themes'
import { CELEBRATION_THEMES } from '../data/celebrationThemes'

const AVATARS = ['😊', '🐻', '🦁', '🐸', '🦊', '🐼', '🐨', '🐰', '🐯', '🐮', '🐱', '🐶', '🦄', '🐲', '⭐', '🌟']

export default function KidProfileForm({ kid, onSave, onCancel }) {
  const [name, setName] = useState(kid?.name || '')
  const [avatar, setAvatar] = useState(kid?.avatar || '😊')
  const [uiTheme, setUiTheme] = useState(kid?.uiTheme || 'cartoonish')
  const [celebrationTheme, setCelebrationTheme] = useState(kid?.celebrationTheme || 'unicorn')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), avatar, uiTheme, celebrationTheme })
  }

  const accent = UI_THEMES[uiTheme]?.accentColor || '#a78bfa'

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-6" style={{ fontFamily: UI_THEMES[uiTheme]?.fontFamily }}>
      {/* Name */}
      <div>
        <label className="block font-bold mb-2 text-white/70 text-sm uppercase tracking-wide">Kid's Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name..."
          className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-lg text-white
                     placeholder:text-white/30 focus:border-white/50 focus:bg-white/15 focus:outline-none transition-all"
          autoFocus
          maxLength={20}
        />
      </div>

      {/* Avatar */}
      <div>
        <label className="block font-bold mb-3 text-white/70 text-sm uppercase tracking-wide">Choose Avatar</label>
        <div className="flex flex-wrap gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              className="relative text-3xl w-13 h-13 rounded-2xl border-2 transition-all flex items-center justify-center"
              style={{
                width: 52, height: 52,
                borderColor: avatar === a ? accent : 'rgba(255,255,255,0.15)',
                background: avatar === a ? `${accent}30` : 'rgba(255,255,255,0.08)',
                boxShadow: avatar === a ? `0 0 14px ${accent}60` : 'none',
                transform: avatar === a ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {a}
              {avatar === a && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: accent }}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* UI Theme */}
      <div>
        <label className="block font-bold mb-3 text-white/70 text-sm uppercase tracking-wide">App Theme</label>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(UI_THEMES).map((th) => {
            const selected = uiTheme === th.id
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => setUiTheme(th.id)}
                className="relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all"
                style={{
                  borderColor: selected ? th.accentColor : 'rgba(255,255,255,0.15)',
                  background: selected ? `${th.accentColor}25` : 'rgba(255,255,255,0.08)',
                  boxShadow: selected ? `0 0 16px ${th.accentColor}50` : 'none',
                }}
              >
                {selected && (
                  <span
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: th.accentColor }}
                  >
                    ✓
                  </span>
                )}
                <span className="text-3xl">{th.emoji}</span>
                <span className="text-xs font-bold text-white/80">{th.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Celebration Theme */}
      <div>
        <label className="block font-bold mb-3 text-white/70 text-sm uppercase tracking-wide">Celebration Theme</label>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(CELEBRATION_THEMES).map((ct) => {
            const selected = celebrationTheme === ct.id
            return (
              <button
                key={ct.id}
                type="button"
                onClick={() => setCelebrationTheme(ct.id)}
                className="relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all"
                style={{
                  borderColor: selected ? accent : 'rgba(255,255,255,0.15)',
                  background: selected ? `${accent}25` : 'rgba(255,255,255,0.08)',
                  boxShadow: selected ? `0 0 16px ${accent}50` : 'none',
                }}
              >
                {selected && (
                  <span
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: accent }}
                  >
                    ✓
                  </span>
                )}
                <span className="text-3xl">{ct.emoji}</span>
                <span className="text-xs font-bold text-white/70 text-center leading-tight">{ct.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border border-white/20 font-bold text-white/70 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 py-3 rounded-2xl font-bold text-white disabled:opacity-40 transition-all active:scale-95"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
        >
          {kid ? 'Save Changes' : 'Add Kid ✨'}
        </button>
      </div>
    </form>
  )
}
