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
  const [editingKid, setEditingKid] = useState(false)

  function handleSaveKid(data) {
    onUpdateKid(kid.id, data)
    setEditingKid(false)
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg} lg:max-w-3xl lg:mx-auto lg:my-0 lg:shadow-2xl`} style={{ fontFamily: theme.fontFamily }}>
      <Header
        onBack={onBack}
        onHome={onHome}
        title="Settings"
        theme={theme}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Kid profile */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="flex items-center gap-3 p-4">
            <span className="text-4xl">{kid.avatar}</span>
            <div className="flex-1">
              <div className="font-bold text-lg text-gray-800">{kid.name}</div>
              <div className="text-sm text-gray-500">⭐ {kid.totalStars} stars · 🔥 {kid.currentStreak} day streak</div>
            </div>
            <button
              onClick={() => setEditingKid((v) => !v)}
              className="px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-bold text-sm hover:bg-purple-200"
            >
              {editingKid ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <AnimatePresence>
            {editingKid && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-gray-100"
              >
                <KidProfileForm
                  kid={kid}
                  onSave={handleSaveKid}
                  onCancel={() => setEditingKid(false)}
                  theme={theme}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edit routines */}
        <button
          onClick={onOpenEditRoutine}
          className="w-full bg-white rounded-3xl shadow p-4 flex items-center gap-3 text-left hover:bg-gray-50 active:scale-98"
        >
          <span className="text-3xl">📋</span>
          <div>
            <div className="font-bold text-gray-800">Manage Routines & Tasks</div>
            <div className="text-sm text-gray-500">Add, remove, or reorder tasks</div>
          </div>
          <span className="ml-auto text-gray-400 text-xl">›</span>
        </button>

        {/* Sound toggle */}
        <div className="bg-white rounded-3xl shadow p-4 flex items-center gap-3">
          <span className="text-3xl">{muted ? '🔇' : '🔊'}</span>
          <div className="flex-1">
            <div className="font-bold text-gray-800">Sounds</div>
            <div className="text-sm text-gray-500">{muted ? 'Sounds are off' : 'Sounds are on'}</div>
          </div>
          <button
            onClick={onToggleMute}
            className={`w-14 h-8 rounded-full transition-colors relative ${
              muted ? 'bg-gray-300' : 'bg-green-400'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                muted ? 'left-1' : 'left-7'
              }`}
            />
          </button>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-3xl shadow p-4">
          <h3 className="font-bold text-gray-600 mb-3">Danger Zone</h3>
          <button
            onClick={() => {
              if (confirm(`Delete ${kid.name}'s profile and all data?`)) {
                onDeleteKid(kid.id)
              }
            }}
            className="w-full py-3 rounded-2xl border-2 border-red-200 text-red-500 font-bold hover:bg-red-50"
          >
            🗑️ Delete {kid.name}'s Profile
          </button>
        </div>
      </div>
    </div>
  )
}
