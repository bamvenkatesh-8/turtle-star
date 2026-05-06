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

  const accent = UI_THEMES[uiTheme]?.accentColor || '#007AFF'

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-6">
      {/* Name */}
      <div>
        <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
          Kid's Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:border-blue-400 transition-all"
          autoFocus
          maxLength={20}
        />
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
          Choose Avatar
        </label>
        <div className="flex flex-wrap gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              className="relative text-3xl rounded-2xl border-2 flex items-center justify-center transition-all duration-150 hover:bg-gray-100 active:scale-95 focus-visible:outline-none"
              style={{
                width: 52, height: 52,
                borderColor: avatar === a ? accent : '#E5E7EB',
                backgroundColor: avatar === a ? `${accent}15` : '#F9FAFB',
                transform: avatar === a ? 'scale(1.08)' : 'scale(1)',
                boxShadow: avatar === a ? `0 0 0 3px ${accent}30` : 'none',
              }}
            >
              {a}
              {avatar === a && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: accent }}
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
        <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
          App Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(UI_THEMES).map((th) => {
            const selected = uiTheme === th.id
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => setUiTheme(th.id)}
                className="relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-150 active:scale-95 focus-visible:outline-none overflow-hidden"
                style={{
                  borderColor: selected ? th.accentColor : (th.isDark ? 'rgba(255,255,255,0.20)' : '#E5E7EB'),
                  background: th.isDark ? th.pageBg : (selected ? `${th.accentColor}12` : '#F9FAFB'),
                  boxShadow: selected ? `0 0 0 3px ${th.accentColor}25` : 'none',
                }}
              >
                {selected && (
                  <span
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: th.accentColor }}
                  >
                    ✓
                  </span>
                )}
                <span className="text-3xl">{th.emoji}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: th.isDark ? '#FFFFFF' : '#374151' }}
                >
                  {th.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Celebration Theme */}
      <div>
        <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
          Celebration Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(CELEBRATION_THEMES).map((ct) => {
            const selected = celebrationTheme === ct.id
            return (
              <button
                key={ct.id}
                type="button"
                onClick={() => setCelebrationTheme(ct.id)}
                className="relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-150 hover:bg-gray-50 active:scale-95 focus-visible:outline-none"
                style={{
                  borderColor: selected ? accent : '#E5E7EB',
                  backgroundColor: selected ? `${accent}12` : '#F9FAFB',
                  boxShadow: selected ? `0 0 0 3px ${accent}25` : 'none',
                }}
              >
                {selected && (
                  <span
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ backgroundColor: accent }}
                  >
                    ✓
                  </span>
                )}
                <span className="text-3xl">{ct.emoji}</span>
                <span className="text-xs font-semibold text-gray-600 text-center leading-tight">{ct.name}</span>
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
            className="flex-1 py-3 rounded-xl bg-gray-100 font-semibold text-gray-600 hover:bg-gray-200 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 py-3 rounded-xl font-semibold text-white disabled:opacity-40 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: accent, '--tw-ring-color': accent }}
        >
          {kid ? 'Save Changes' : 'Add Kid'}
        </button>
      </div>
    </form>
  )
}
