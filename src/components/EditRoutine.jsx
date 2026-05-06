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
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full max-w-md max-h-[70vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-3 border-b border-gray-100 sticky top-0 bg-white">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
          <h3 className="font-semibold text-base text-center text-gray-900 mb-3 tracking-tight">Choose an Image</h3>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:border-blue-400 transition-all"
          />
        </div>
        <div className="grid grid-cols-4 gap-2 p-4 overflow-y-auto" style={{ maxHeight: '55vh' }}>
          {filtered.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all duration-150 hover:bg-gray-50 active:scale-95 focus-visible:outline-none"
              style={{
                borderColor: selected === item.key ? '#007AFF' : '#E5E7EB',
                backgroundColor: selected === item.key ? '#EFF6FF' : '#F9FAFB',
              }}
            >
              <div className="w-12 h-12">
                <TaskImage imageKey={item.key} className="w-full h-full" />
              </div>
              <span className="text-xs text-center text-gray-500 leading-tight">{item.label}</span>
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
  const accentColor = theme.accentColor
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 lg:max-w-3xl lg:mx-auto lg:shadow-xl">
      <Header onBack={onBack} onHome={onHome} title="Edit Routines" theme={theme} />

      <div className="flex-1 overflow-y-auto">
        {/* Routine tabs */}
        <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-white border-b border-gray-100 scrollbar-none">
          {routines.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoutineId(r.id)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 focus-visible:outline-none"
              style={selectedRoutineId === r.id
                ? { backgroundColor: accentColor, color: '#fff' }
                : { backgroundColor: '#F3F4F6', color: '#4B5563' }
              }
            >
              {r.name}
            </button>
          ))}
          <button
            onClick={() => setShowAddRoutine(true)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:text-gray-500 transition-all duration-150"
          >
            + New
          </button>
        </div>

        <div className="px-4 py-4">
          {/* Add routine form */}
          <AnimatePresence>
            {showAddRoutine && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                <div className="flex gap-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
                  <input
                    type="text"
                    placeholder="Routine name..."
                    value={newRoutineName}
                    onChange={(e) => setNewRoutineName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddRoutine()}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all"
                  />
                  <button
                    onClick={handleAddRoutine}
                    className="px-4 py-2 rounded-xl font-semibold text-white text-sm active:scale-95 transition-all duration-150"
                    style={{ backgroundColor: accentColor }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddRoutine(false)}
                    className="px-3 py-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedRoutine && (
            <>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-gray-900 tracking-tight">{selectedRoutine.name}</h3>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${selectedRoutine.name}"?`)) {
                      onDeleteRoutine(selectedRoutine.id)
                      setSelectedRoutineId(routines.find((r) => r.id !== selectedRoutine.id)?.id || null)
                    }
                  }}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors font-medium focus-visible:outline-none"
                >
                  Delete
                </button>
              </div>

              {/* Task list */}
              <div className="space-y-2 mb-4">
                {tasks.map((task, idx) => (
                  <div key={task.id} className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 shadow-sm p-3">
                    <div className="w-10 h-10 flex-shrink-0">
                      <TaskImage imageKey={task.imageKey} className="w-full h-full" />
                    </div>
                    <span className="flex-1 font-medium text-gray-900 text-sm">{task.label}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveTask(idx, -1)}
                        disabled={idx === 0}
                        className="w-8 h-8 rounded-lg bg-gray-100 disabled:opacity-30 text-gray-600 text-sm hover:bg-gray-200 active:scale-95 transition-all duration-150 focus-visible:outline-none"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveTask(idx, 1)}
                        disabled={idx === tasks.length - 1}
                        className="w-8 h-8 rounded-lg bg-gray-100 disabled:opacity-30 text-gray-600 text-sm hover:bg-gray-200 active:scale-95 transition-all duration-150 focus-visible:outline-none"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-500 text-sm hover:bg-red-100 active:scale-95 transition-all duration-150 focus-visible:outline-none"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <p className="text-gray-400 text-center py-6 text-sm">No tasks yet. Add one below!</p>
                )}
              </div>

              {/* Add task */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setShowImagePicker(true)}
                    className="w-12 h-12 flex-shrink-0 rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                  >
                    <TaskImage imageKey={newTaskImage} className="w-full h-full" />
                  </button>
                  <input
                    type="text"
                    placeholder="New task name..."
                    value={newTaskLabel}
                    onChange={(e) => setNewTaskLabel(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:border-blue-400 transition-all"
                  />
                  <button
                    onClick={handleAddTask}
                    disabled={!newTaskLabel.trim()}
                    className="px-4 py-2 rounded-xl font-semibold text-white text-sm disabled:opacity-30 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{ backgroundColor: accentColor, '--tw-ring-color': accentColor }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
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
