import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import KidProfileForm from './KidProfileForm'
import { UI_THEMES } from '../data/themes'

export default function KidSelector({ kids, onSelectKid, onAddKid }) {
  const [showForm, setShowForm] = useState(false)

  function handleAdd(data) {
    onAddKid(data)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Title */}
      <div className="pt-14 pb-8 text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-7xl mb-3"
        >
          🐢⭐
        </motion.div>
        <h1
          className="text-5xl font-bold text-white drop-shadow-lg"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Turtle Star
        </h1>
        <p className="text-white/50 text-lg mt-2">Who's doing their routine today?</p>
      </div>

      {/* Kid grid */}
      <div className="flex-1 px-6 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <AnimatePresence>
            {kids.map((kid) => {
              const th = UI_THEMES[kid.uiTheme] || UI_THEMES.cartoonish
              return (
                <motion.button
                  key={kid.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectKid(kid)}
                  className="flex flex-col items-center gap-3 p-5 rounded-3xl border border-white/15
                             bg-white/10 backdrop-blur-sm hover:bg-white/18 hover:border-white/30
                             active:scale-95 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${th.accentColor}30, ${th.accentColor}15)`,
                    borderColor: `${th.accentColor}40`,
                  }}
                >
                  <span className="text-6xl">{kid.avatar}</span>
                  <span
                    className="font-bold text-white text-lg drop-shadow"
                    style={{ fontFamily: th.fontFamily }}
                  >
                    {kid.name}
                  </span>
                  {kid.currentStreak > 0 && (
                    <span className="text-xs bg-white/15 text-white/80 rounded-full px-2.5 py-1">
                      🔥 {kid.currentStreak} days
                    </span>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>

          {/* Add Kid */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex flex-col items-center gap-3 p-5 rounded-3xl border-2 border-dashed
                       border-white/25 text-white/50 hover:border-white/50 hover:text-white/80
                       hover:bg-white/5 active:scale-95 transition-all"
          >
            <span className="text-5xl">➕</span>
            <span className="font-bold text-lg" style={{ fontFamily: "'Fredoka One', cursive" }}>
              Add Kid
            </span>
          </motion.button>
        </div>
      </div>

      {/* Add kid modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="bg-[#1e1040] border border-white/15 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#1e1040] border-b border-white/10 rounded-t-3xl px-5 pt-5 pb-3">
                <h2
                  className="text-xl font-bold text-center text-white"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  Add a New Kid ✨
                </h2>
              </div>
              <KidProfileForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
