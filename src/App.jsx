import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import KidSelector from './components/KidSelector'
import RoutineView from './components/RoutineView'
import HistoryView from './components/HistoryView'
import EditRoutine from './components/EditRoutine'
import SettingsPanel from './components/SettingsPanel'
import CelebrationModal from './components/CelebrationModal'
import { useKids } from './hooks/useKids'
import { useRoutines } from './hooks/useRoutines'
import { useProgress } from './hooks/useProgress'
import { useSound } from './hooks/useSound'

// Screens: 'home' | 'dashboard' | 'routine' | 'history' | 'settings' | 'edit-routine'
export default function App() {
  const [screen, setScreen] = useState('home')
  const [activeKidId, setActiveKidId] = useState(null)
  const [celebration, setCelebration] = useState(null)
  const [muted, setMuted] = useState(() => localStorage.getItem('turtlestar_muted') === 'true')

  const { kids, addKid, updateKid, deleteKid, addStars, removeStars, markRoutineCompleted } = useKids()
  const {
    seedRoutinesForKid,
    getRoutinesForKid,
    getTasksForRoutine,
    addRoutine,
    deleteRoutine,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    deleteAllForKid,
  } = useRoutines()
  const {
    toggleTask,
    getProgressForDate,
    deleteAllForKid: deleteProgressForKid,
  } = useProgress()
  const { playDing, playFanfare, setMuted: setSoundMuted } = useSound()

  const activeKid = kids.find((k) => k.id === activeKidId)

  function handleSelectKid(kid) {
    setActiveKidId(kid.id)
    setScreen('routine')
  }

  function handleAddKid(data) {
    const kid = addKid(data)
    seedRoutinesForKid(kid.id)
  }

  function handleToggleTask(kidId, routineId, taskId, totalCount) {
    const { isChecking, willBeCompleted, wasFullyCompleted } = toggleTask(
      kidId,
      routineId,
      taskId,
      totalCount
    )
    const kid = kids.find((k) => k.id === kidId)
    if (!kid) return

    if (isChecking) {
      addStars(kidId, 1)
      playDing()
      if (willBeCompleted) {
        addStars(kidId, 3)
        markRoutineCompleted(kidId)
        setTimeout(() => {
          setCelebration({
            kidName: kid.name,
            celebrationThemeId: kid.celebrationTheme || 'unicorn',
            routineId,
          })
        }, 300)
      }
    } else {
      removeStars(kidId, 1)
      if (wasFullyCompleted) {
        removeStars(kidId, 3)
      }
    }
  }

  function handleDeleteKid(kidId) {
    deleteAllForKid(kidId)
    deleteProgressForKid(kidId)
    deleteKid(kidId)
    setScreen('home')
  }

  function handleToggleMute() {
    const newMuted = !muted
    setMuted(newMuted)
    setSoundMuted(newMuted)
  }

  function goHome() {
    setScreen('home')
    setActiveKidId(null)
  }

  const routines = activeKid ? getRoutinesForKid(activeKid.id) : []
  const today = new Date().toISOString().split('T')[0]
  const todayProgress = activeKid ? getProgressForDate(activeKid.id, today) : []

  return (
    <div className="max-w-7xl mx-auto w-full min-h-screen">
      {/* Celebration — rendered via portal on document.body, bypasses stacking contexts */}
      {celebration && (
        <CelebrationModal
          kidName={celebration.kidName}
          celebrationThemeId={celebration.celebrationThemeId}
          onClose={() => setCelebration(null)}
          playFanfare={playFanfare}
        />
      )}

      {screen === 'home' && (
        <KidSelector
          kids={kids}
          onSelectKid={handleSelectKid}
          onAddKid={handleAddKid}
        />
      )}

      {screen === 'routine' && activeKid && (
        <RoutineView
          kid={activeKid}
          routines={routines}
          getTasksForRoutine={getTasksForRoutine}
          todayProgress={todayProgress}
          onToggleTask={handleToggleTask}
          onBack={goHome}
          onHome={goHome}
          onOpenSettings={() => setScreen('settings')}
          onOpenHistory={() => setScreen('history')}
        />
      )}

      {screen === 'history' && activeKid && (
        <HistoryView
          kid={activeKid}
          routines={routines}
          getTasksForRoutine={getTasksForRoutine}
          getProgressForDate={getProgressForDate}
          onBack={() => setScreen('routine')}
          onHome={goHome}
        />
      )}

      {screen === 'settings' && activeKid && (
        <SettingsPanel
          kid={activeKid}
          onUpdateKid={updateKid}
          onDeleteKid={handleDeleteKid}
          onOpenEditRoutine={() => setScreen('edit-routine')}
          onBack={() => setScreen('routine')}
          onHome={goHome}
          muted={muted}
          onToggleMute={handleToggleMute}
        />
      )}

      {screen === 'edit-routine' && activeKid && (
        <EditRoutine
          kid={activeKid}
          routines={routines}
          getTasksForRoutine={getTasksForRoutine}
          onAddRoutine={addRoutine}
          onDeleteRoutine={deleteRoutine}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onReorderTasks={reorderTasks}
          onBack={() => setScreen('settings')}
          onHome={goHome}
        />
      )}
    </div>
  )
}
