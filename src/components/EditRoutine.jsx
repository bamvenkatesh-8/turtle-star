import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import TaskImage from './TaskImage'
import { UI_THEMES } from '../data/themes'
import { TASK_IMAGE_LIBRARY } from '../data/taskImageLibrary'

function ImagePicker({ selected, onSelect, onClose }) {
  const [search, setSearch] = useState('')
  const filtered = TASK_IMAGE_LIBRARY.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-[#1e1040] border border-white/15 rounded-t-3xl w-full max-w-md max-h-[70vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-3 border-b border-white/10 sticky top-0 bg-[#1e1040]">
          <h3 className="font-bold text-lg text-center text-white mb-2">Choose an Image</h3>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40"
          />
        </div>
        <div className="grid grid-cols-4 gap-2 p-4 overflow-y-auto" style={{ maxHeight: '55vh' }}>
          {filtered.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl border transition-all"
              style={{
                borderColor: selected === item.key ? '#a78bfa' : 'rgba(255,255,255,0.1)',
                background: selected === item.key ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.05)',
              }}
            >
              <div className="w-12 h-12">
                <TaskImage imageKey={item.key} className="w-full h-full" />
              </div>
              <span className="text-xs text-center text-white/60 leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EditRoutine({
  kid, routines, getTasksForRoutine,
  onAddRoutine, onDeleteRoutine,
  onAddTask, onUpdateTask, onDeleteTask, onReorderTasks,
  onBack, onHome,
}) {
  const theme = UI_THEMES[kid.uiTheme] || UI_THEMES.cartoonish
  const [selectedRoutineId, setSelectedRoutineId] = useState(routines[0]?.id || null)
  const [newTaskLabel, setNewTaskLabel] = useState('')
  const [newTaskImage, setNewTaskImage] = useState('placeholder')
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [newRoutineName, setNewRoutineName] = useState('')
  const [showAddRoutine, setShowAddRoutine] = useState(false)

  const selectedRoutine = routines.find((r) => r.id === selectedRoutineId)
  const tasks = selectedRoutineId ? getTasksForRoutine(selectedRoutineId) : []

  function handleAddTask() {
    if (!newTaskLabel.trim() || !selectedRoutineId) return
    onAddTask(selectedRoutineId, newTaskLabel.trim(), newTaskImage)
    setNewTaskLabel('')
    setNewTaskImage('placeholder')
  }

  function moveTask(idx, dir) {
    const newOrder = [...tasks]
    const swap = idx + dir
    if (swap < 0 || swap >= newOrder.length) return
    ;[newOrder[idx], newOrder[swap]] = [newOrder[swap], newOrder[idx]]
    onReorderTasks(selectedRoutineId, newOrder.map((t) => t.id))
  }

  function handleAddRoutine() {
    if (!newRoutineName.trim()) return
    const r = onAddRoutine(kid.id, newRoutineName.trim())
    setSelectedRoutineId(r.id)
    setNewRoutineName('')
    setShowAddRoutine(false)
  }

  const card = 'bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl'

  return (
    <div className="min-h-screen flex flex-col lg:max-w-3xl lg:mx-auto lg:shadow-2xl" style={{ fontFamily: theme.fontFamily }}>
      <Header onBack={onBack} onHome={onHome} title="Edit Routines" theme={theme} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Routine tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {routines.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoutineId(r.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm border transition-all"
              style={{
                background: selectedRoutineId === r.id ? theme.accentColor : 'rgba(255,255,255,0.08)',
                borderColor: selectedRoutineId === r.id ? theme.accentColor : 'rgba(255,255,255,0.15)',
                color: selectedRoutineId === r.id ? 'white' : 'rgba(255,255,255,0.6)',
              }}
            >
              {r.name}
            </button>
          ))}
          <button
            onClick={() => setShowAddRoutine(true)}
            className="flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm border-2 border-dashed border-white/25 text-white/50 hover:border-white/50 hover:text-white/80 transition-all"
          >
            + New
          </button>
        </div>

        {/* Add routine form */}
        <AnimatePresence>
          {showAddRoutine && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
              <div className={`flex gap-2 ${card} p-3`}>
                <input
                  type="text"
                  placeholder="Routine name..."
                  value={newRoutineName}
                  onChange={(e) => setNewRoutineName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddRoutine()}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white placeholder:text-white/30 focus:outline-none"
                />
                <button onClick={handleAddRoutine} className="px-4 py-2 rounded-xl font-bold text-white text-sm" style={{ background: theme.accentColor }}>Add</button>
                <button onClick={() => setShowAddRoutine(false)} className="px-3 py-2 text-white/40 hover:text-white rounded-xl">✕</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedRoutine && (
          <>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-white">{selectedRoutine.name}</h3>
              <button
                onClick={() => {
                  if (confirm(`Delete "${selectedRoutine.name}"?`)) {
                    onDeleteRoutine(selectedRoutine.id)
                    setSelectedRoutineId(routines.find((r) => r.id !== selectedRoutine.id)?.id || null)
                  }
                }}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                🗑️ Delete
              </button>
            </div>

            {/* Task list */}
            <div className="space-y-2 mb-4">
              {tasks.map((task, idx) => (
                <div key={task.id} className={`flex items-center gap-2 ${card} p-2`}>
                  <div className="w-10 h-10 flex-shrink-0">
                    <TaskImage imageKey={task.imageKey} className="w-full h-full" />
                  </div>
                  <span className="flex-1 font-medium text-white/80 text-sm">{task.label}</span>
                  <div className="flex gap-1">
                    <button onClick={() => moveTask(idx, -1)} disabled={idx === 0} className="w-8 h-8 rounded-lg bg-white/10 disabled:opacity-20 text-white text-sm hover:bg-white/20 transition-all">↑</button>
                    <button onClick={() => moveTask(idx, 1)} disabled={idx === tasks.length - 1} className="w-8 h-8 rounded-lg bg-white/10 disabled:opacity-20 text-white text-sm hover:bg-white/20 transition-all">↓</button>
                    <button onClick={() => onDeleteTask(task.id)} className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-all">✕</button>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && <p className="text-white/40 text-center py-4">No tasks yet. Add one below!</p>}
            </div>

            {/* Add task */}
            <div className={`${card} p-3`}>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setShowImagePicker(true)}
                  className="w-12 h-12 flex-shrink-0 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 transition-all"
                >
                  <TaskImage imageKey={newTaskImage} className="w-full h-full" />
                </button>
                <input
                  type="text"
                  placeholder="New task name..."
                  value={newTaskLabel}
                  onChange={(e) => setNewTaskLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40"
                />
                <button
                  onClick={handleAddTask}
                  disabled={!newTaskLabel.trim()}
                  className="px-4 py-2 rounded-xl font-bold text-white text-sm disabled:opacity-30 transition-all"
                  style={{ background: theme.accentColor }}
                >
                  Add
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showImagePicker && (
        <ImagePicker
          selected={newTaskImage}
          onSelect={(key) => { setNewTaskImage(key); setShowImagePicker(false) }}
          onClose={() => setShowImagePicker(false)}
        />
      )}
    </div>
  )
}
