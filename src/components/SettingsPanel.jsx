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

  const card = 'bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl'

  return (
    <div className="min-h-screen flex flex-col lg:max-w-3xl lg:mx-auto lg:shadow-2xl" style={{ fontFamily: theme.fontFamily }}>
      <Header onBack={onBack} onHome={onHome} title="Settings" theme={theme} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Kid profile */}
        <div className={card}>
          <div className="flex items-center gap-3 p-4">
            <span className="text-4xl">{kid.avatar}</span>
            <div className="flex-1">
              <div className="font-bold text-lg text-white">{kid.name}</div>
              <div className="text-sm text-white/50">⭐ {kid.totalStars} stars · 🔥 {kid.currentStreak} day streak</div>
            </div>
            <button
              onClick={() => setEditingKid((v) => !v)}
              className="px-4 py-2 rounded-xl font-bold text-sm transition-all"
              style={{
                background: editingKid ? 'rgba(255,255,255,0.1)' : `${theme.accentColor}30`,
                color: editingKid ? 'rgba(255,255,255,0.6)' : theme.accentColor,
                border: `1px solid ${editingKid ? 'rgba(255,255,255,0.15)' : theme.accentColor + '50'}`,
              }}
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
                className="overflow-hidden border-t border-white/10"
              >
                <KidProfileForm kid={kid} onSave={handleSaveKid} onCancel={() => setEditingKid(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edit routines */}
        <button
          onClick={onOpenEditRoutine}
          className={`w-full ${card} p-4 flex items-center gap-3 text-left hover:bg-white/12 transition-all`}
        >
          <span className="text-3xl">📋</span>
          <div className="flex-1">
            <div className="font-bold text-white">Manage Routines & Tasks</div>
            <div className="text-sm text-white/50">Add, remove, or reorder tasks</div>
          </div>
          <span className="text-white/30 text-xl">›</span>
        </button>

        {/* Sound toggle */}
        <div className={`${card} p-4 flex items-center gap-3`}>
          <span className="text-3xl">{muted ? '🔇' : '🔊'}</span>
          <div className="flex-1">
            <div className="font-bold text-white">Sounds</div>
            <div className="text-sm text-white/50">{muted ? 'Off' : 'On'}</div>
          </div>
          <button
            onClick={onToggleMute}
            className={`w-14 h-8 rounded-full transition-colors relative ${muted ? 'bg-white/20' : ''}`}
            style={{ background: muted ? undefined : theme.accentColor }}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${muted ? 'left-1' : 'left-7'}`}
            />
          </button>
        </div>

        {/* Delete */}
        <div className={`${card} p-4`}>
          <p className="text-white/40 text-xs font-bold uppercase tracking-wide mb-3">Danger Zone</p>
          <button
            onClick={() => {
              if (confirm(`Delete ${kid.name}'s profile and all data?`)) onDeleteKid(kid.id)
            }}
            className="w-full py-3 rounded-xl border border-red-500/40 text-red-400 font-bold hover:bg-red-500/10 transition-all"
          >
            🗑️ Delete {kid.name}'s Profile
          </button>
        </div>
      </div>
    </div>
  )
}
