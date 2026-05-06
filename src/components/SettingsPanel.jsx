import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import KidProfileForm from './KidProfileForm'
import { UI_THEMES } from '../data/themes'

export default function SettingsPanel({
  kid,
  onUpdateKid,
  onDeleteKid,
  onOpenEditRoutine,
  onBack,
  onHome,
  muted,
  onToggleMute,
}) {
  const theme = UI_THEMES[kid.uiTheme] || UI_THEMES.cartoonish
  const accentColor = theme.accentColor
  const [editingKid, setEditingKid] = useState(false)

  function handleSaveKid(data) {
    onUpdateKid(kid.id, data)
    setEditingKid(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 lg:max-w-3xl lg:mx-auto lg:shadow-xl">
      <Header onBack={onBack} onHome={onHome} title="Settings" theme={theme} />

      <div className="flex-1 overflow-y-auto py-2">

        {/* Profile section */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Profile</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm mx-4 overflow-hidden divide-y divide-gray-100">
          {/* Kid profile row */}
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="text-4xl">{kid.avatar}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-base">{kid.name}</div>
              <div className="text-sm text-gray-500">⭐ {kid.totalStars} stars · 🔥 {kid.currentStreak} day streak</div>
            </div>
            <button
              onClick={() => setEditingKid((v) => !v)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2"
              style={editingKid
                ? { backgroundColor: '#F3F4F6', color: '#6B7280' }
                : { backgroundColor: `${accentColor}15`, color: accentColor }
              }
            >
              {editingKid ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* Inline edit form */}
          <AnimatePresence>
            {editingKid && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <KidProfileForm kid={kid} onSave={handleSaveKid} onCancel={() => setEditingKid(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Routines section */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Routines</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm mx-4 overflow-hidden">
          <button
            onClick={onOpenEditRoutine}
            className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-300"
          >
            <span className="text-2xl">📋</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Manage Routines & Tasks</div>
              <div className="text-sm text-gray-500">Add, remove, or reorder tasks</div>
            </div>
            <span className="text-gray-300 text-xl">›</span>
          </button>
        </div>

        {/* Sound section */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Preferences</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm mx-4 overflow-hidden divide-y divide-gray-100">
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="text-2xl">{muted ? '🔇' : '🔊'}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Sounds</div>
              <div className="text-sm text-gray-500">{muted ? 'Off' : 'On'}</div>
            </div>
            <button
              onClick={onToggleMute}
              className="w-12 h-7 rounded-full transition-colors duration-200 relative flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: muted ? '#D1D5DB' : accentColor, '--tw-ring-color': accentColor }}
            >
              <div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200"
                style={{ transform: muted ? 'translateX(2px)' : 'translateX(22px)' }}
              />
            </button>
          </div>
        </div>

        {/* Danger section */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Danger Zone</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm mx-4 mb-8 overflow-hidden">
          <button
            onClick={() => {
              if (confirm(`Delete ${kid.name}'s profile and all data?`)) onDeleteKid(kid.id)
            }}
            className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-red-50 active:bg-red-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-300"
          >
            <span className="text-2xl">🗑️</span>
            <span className="font-medium text-red-500">Delete {kid.name}'s Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
