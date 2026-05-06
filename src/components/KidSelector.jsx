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
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-200 to-purple-200 flex flex-col">
      {/* App title */}
      <div className="pt-10 pb-6 text-center px-4">
        <div className="text-6xl mb-2">🐢⭐</div>
        <h1 className="text-4xl font-bold text-white drop-shadow-md" style={{ fontFamily: "'Fredoka One', cursive" }}>
          Turtle Star
        </h1>
        <p className="text-blue-100 text-lg mt-1">Who's doing their routine today?</p>
      </div>

      {/* Kid grid */}
      <div className="flex-1 px-4 pb-6">
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
                  className={`flex flex-col items-center gap-2 p-5 rounded-3xl shadow-lg border-4 border-white/50 active:shadow-md transition-shadow`}
                  style={{ background: th.colors.primary }}
                >
                  <span className="text-5xl">{kid.avatar}</span>
                  <span
                    className="font-bold text-white text-lg drop-shadow"
                    style={{ fontFamily: th.fontFamily }}
                  >
                    {kid.name}
                  </span>
                  {kid.currentStreak > 0 && (
                    <span className="text-xs bg-white/30 text-white rounded-full px-2 py-0.5">
                      🔥 {kid.currentStreak}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>

          {/* Add Kid button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex flex-col items-center gap-2 p-5 rounded-3xl border-4 border-dashed border-white/60 text-white hover:bg-white/20 active:bg-white/30 transition-colors"
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
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white rounded-t-3xl px-4 pt-4 pb-2 border-b">
                <h2 className="text-xl font-bold text-center" style={{ fontFamily: "'Fredoka One', cursive" }}>
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
