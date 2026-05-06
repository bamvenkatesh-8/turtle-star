import { useState } from 'react'
import { UI_THEMES } from '../data/themes'
import { CELEBRATION_THEMES } from '../data/celebrationThemes'

const AVATARS = ['😊', '🐻', '🦁', '🐸', '🦊', '🐼', '🐨', '🐰', '🐯', '🐮', '🐱', '🐶', '🦄', '🐲', '⭐', '🌟']

export default function KidProfileForm({ kid, onSave, onCancel, theme }) {
  const [name, setName] = useState(kid?.name || '')
  const [avatar, setAvatar] = useState(kid?.avatar || '😊')
  const [uiTheme, setUiTheme] = useState(kid?.uiTheme || 'cartoonish')
  const [celebrationTheme, setCelebrationTheme] = useState(kid?.celebrationTheme || 'unicorn')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), avatar, uiTheme, celebrationTheme })
  }

  const t = theme || UI_THEMES.cartoonish

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-5" style={{ fontFamily: t.fontFamily }}>
      {/* Name */}
      <div>
        <label className="block font-bold mb-1 text-gray-700">Kid's Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name..."
          className="w-full border-3 border-gray-300 rounded-2xl px-4 py-3 text-lg focus:border-purple-400 focus:outline-none"
          autoFocus
          maxLength={20}
        />
      </div>

      {/* Avatar */}
      <div>
        <label className="block font-bold mb-2 text-gray-700">Choose Avatar</label>
        <div className="flex flex-wrap gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              className={`text-3xl w-12 h-12 rounded-xl transition-all ${
                avatar === a
                  ? 'bg-purple-200 border-3 border-purple-500 scale-110'
                  : 'bg-gray-100 border-3 border-transparent hover:bg-gray-200'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* UI Theme */}
      <div>
        <label className="block font-bold mb-2 text-gray-700">App Theme</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(UI_THEMES).map((th) => (
            <button
              key={th.id}
              type="button"
              onClick={() => setUiTheme(th.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-3 transition-all ${
                uiTheme === th.id
                  ? 'border-purple-500 bg-purple-50 scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-400'
              }`}
            >
              <span className="text-2xl">{th.emoji}</span>
              <span className="text-xs font-bold text-gray-600">{th.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Celebration Theme */}
      <div>
        <label className="block font-bold mb-2 text-gray-700">Celebration Theme</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(CELEBRATION_THEMES).map((ct) => (
            <button
              key={ct.id}
              type="button"
              onClick={() => setCelebrationTheme(ct.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-3 transition-all ${
                celebrationTheme === ct.id
                  ? 'border-purple-500 bg-purple-50 scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-400'
              }`}
            >
              <span className="text-2xl">{ct.emoji}</span>
              <span className="text-xs font-bold text-gray-600 text-center leading-tight">{ct.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-2xl border-3 border-gray-300 font-bold text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!name.trim()}
          className="flex-1 py-3 rounded-2xl bg-purple-500 text-white font-bold disabled:opacity-40 hover:bg-purple-600 active:scale-95 transition-all"
        >
          {kid ? 'Save' : 'Add Kid ✨'}
        </button>
      </div>
    </form>
  )
}
