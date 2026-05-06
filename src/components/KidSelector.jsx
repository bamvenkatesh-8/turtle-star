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
    <div className="min-h-screen flex flex-col bg-[#F2F2F7]">
      {/* Header / Logo */}
      <div className="pt-14 pb-8 text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-6xl mb-3"
        >
          🐢⭐
        </motion.div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Turtle Star
        </h1>
        <p className="text-gray-500 text-base mt-1">Who's doing their routine today?</p>
      </div>

      {/* Kid grid */}
      <div className="flex-1 px-4 pb-10">
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
                  className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm aspect-square hover:shadow-md hover:border-gray-200 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ '--tw-ring-color': th.accentColor }}
                >
                  <span className="text-5xl">{kid.avatar}</span>
                  <span className="font-semibold text-gray-900 text-base tracking-tight">
                    {kid.name}
                  </span>
                  {kid.currentStreak > 0 && (
                    <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 rounded-full px-2.5 py-0.5 font-medium">
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
            className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-white border-2 border-dashed border-gray-300 text-gray-400 aspect-square hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          >
            <span className="text-4xl">+</span>
            <span className="font-semibold text-sm tracking-tight">Add Child</span>
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/25 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 rounded-t-3xl px-5 pt-5 pb-3">
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
                <h2 className="text-lg font-semibold tracking-tight text-center text-gray-900">
                  Add a New Child
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
