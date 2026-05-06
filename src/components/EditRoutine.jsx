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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full max-w-md max-h-[70vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-2 border-b sticky top-0 bg-white">
          <h3 className="font-bold text-lg text-center mb-2">Choose an Image</h3>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-4 gap-2 p-4 overflow-y-auto" style={{ maxHeight: '55vh' }}>
          {filtered.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 ${
                selected === item.key
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div className="w-12 h-12">
                <TaskImage imageKey={item.key} className="w-full h-full" />
              </div>
              <span className="text-xs text-center text-gray-600 leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EditRoutine({
  kid,
  routines,
  getTasksForRoutine,
  onAddRoutine,
  onDeleteRoutine,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onReorderTasks,
  onBack,
  onHome,
}) {
  const theme = UI_THEMES[kid.uiTheme] || UI_THEMES.cartoonish
  const [selectedRoutineId, setSelectedRoutineId] = useState(routines[0]?.id || null)
  const [newTaskLabel, setNewTaskLabel] = useState('')
  const [newTaskImage, setNewTaskImage] = useState('placeholder')
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
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

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg} lg:max-w-3xl lg:mx-auto lg:shadow-2xl`} style={{ fontFamily: theme.fontFamily }}>
      <Header
        onBack={onBack}
        onHome={onHome}
        title="Edit Routines"
        theme={theme}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Routine selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {routines.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoutineId(r.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm border-2 transition-all ${
                selectedRoutineId === r.id
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400'
              }`}
            >
              {r.name}
            </button>
          ))}
          <button
            onClick={() => setShowAddRoutine(true)}
            className="flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm border-2 border-dashed border-gray-400 text-gray-500 hover:border-purple-400"
          >
            + New
          </button>
        </div>

        {/* Add routine form */}
        <AnimatePresence>
          {showAddRoutine && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex gap-2 bg-white rounded-2xl p-3 border-2 border-purple-200">
                <input
                  type="text"
                  placeholder="Routine name..."
                  value={newRoutineName}
                  onChange={(e) => setNewRoutineName(e.target.value)}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddRoutine()}
                />
                <button onClick={handleAddRoutine} className="px-4 py-2 bg-purple-500 text-white rounded-xl font-bold">
                  Add
                </button>
                <button onClick={() => setShowAddRoutine(false)} className="px-3 py-2 text-gray-400 rounded-xl">
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedRoutine && (
          <>
            {/* Delete routine */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-gray-700">{selectedRoutine.name} Tasks</h3>
              <button
                onClick={() => {
                  if (confirm(`Delete "${selectedRoutine.name}"?`)) {
                    onDeleteRoutine(selectedRoutine.id)
                    setSelectedRoutineId(routines.find((r) => r.id !== selectedRoutine.id)?.id || null)
                  }
                }}
                className="text-sm text-red-400 hover:text-red-600"
              >
                🗑️ Delete routine
              </button>
            </div>

            {/* Task list */}
            <div className="space-y-2 mb-4">
              {tasks.map((task, idx) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 bg-white rounded-2xl p-2 border-2 border-gray-200"
                >
                  <div className="w-10 h-10 flex-shrink-0">
                    <TaskImage imageKey={task.imageKey} className="w-full h-full" />
                  </div>
                  <span className="flex-1 font-medium text-gray-700 text-sm">{task.label}</span>
                  <div className="flex gap-1">
                    <button onClick={() => moveTask(idx, -1)} disabled={idx === 0} className="w-8 h-8 rounded-lg bg-gray-100 disabled:opacity-30 text-sm">↑</button>
                    <button onClick={() => moveTask(idx, 1)} disabled={idx === tasks.length - 1} className="w-8 h-8 rounded-lg bg-gray-100 disabled:opacity-30 text-sm">↓</button>
                    <button onClick={() => onDeleteTask(task.id)} className="w-8 h-8 rounded-lg bg-red-100 text-red-500 text-sm hover:bg-red-200">✕</button>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-gray-400 text-center py-4">No tasks yet. Add one below!</p>
              )}
            </div>

            {/* Add task */}
            <div className="bg-white rounded-2xl p-3 border-2 border-purple-200 space-y-2">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setShowImagePicker(true)}
                  className="w-12 h-12 flex-shrink-0 rounded-xl border-2 border-gray-300 hover:border-purple-400"
                >
                  <TaskImage imageKey={newTaskImage} className="w-full h-full" />
                </button>
                <input
                  type="text"
                  placeholder="New task name..."
                  value={newTaskLabel}
                  onChange={(e) => setNewTaskLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm"
                />
                <button
                  onClick={handleAddTask}
                  disabled={!newTaskLabel.trim()}
                  className="px-4 py-2 bg-purple-500 text-white rounded-xl font-bold disabled:opacity-40 text-sm"
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
