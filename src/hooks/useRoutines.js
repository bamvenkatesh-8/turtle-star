import { useState, useEffect } from 'react'
import { PREBUILT_ROUTINES } from '../data/prebuiltRoutines'

const ROUTINES_KEY = 'turtlestar_routines'
const TASKS_KEY = 'turtlestar_tasks'

function loadRoutines() {
  try {
    const raw = localStorage.getItem(ROUTINES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useRoutines() {
  const [routines, setRoutines] = useState(loadRoutines)
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines))
  }, [routines])

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  }, [tasks])

  function seedRoutinesForKid(kidId) {
    const newRoutines = []
    const newTasks = []
    PREBUILT_ROUTINES.forEach((r) => {
      const routineId = `${kidId}_${r.type}_${Date.now()}_${Math.random()}`
      newRoutines.push({ id: routineId, kidId, name: r.name, type: r.type })
      r.tasks.forEach((t, idx) => {
        newTasks.push({
          id: `${routineId}_task_${idx}`,
          routineId,
          label: t.label,
          imageKey: t.imageKey,
          order: idx,
        })
      })
    })
    setRoutines((prev) => [...prev, ...newRoutines])
    setTasks((prev) => [...prev, ...newTasks])
  }

  function getRoutinesForKid(kidId) {
    return routines.filter((r) => r.kidId === kidId)
  }

  function getTasksForRoutine(routineId) {
    return tasks
      .filter((t) => t.routineId === routineId)
      .sort((a, b) => a.order - b.order)
  }

  function addRoutine(kidId, name, type = 'custom') {
    const routineId = `${kidId}_${type}_${Date.now()}`
    const newRoutine = { id: routineId, kidId, name, type }
    setRoutines((prev) => [...prev, newRoutine])
    return newRoutine
  }

  function deleteRoutine(routineId) {
    setRoutines((prev) => prev.filter((r) => r.id !== routineId))
    setTasks((prev) => prev.filter((t) => t.routineId !== routineId))
  }

  function addTask(routineId, label, imageKey = 'placeholder') {
    const existingTasks = tasks.filter((t) => t.routineId === routineId)
    const newTask = {
      id: `task_${Date.now()}_${Math.random()}`,
      routineId,
      label,
      imageKey,
      order: existingTasks.length,
    }
    setTasks((prev) => [...prev, newTask])
    return newTask
  }

  function updateTask(taskId, updates) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    )
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  function reorderTasks(routineId, orderedIds) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.routineId !== routineId) return t
        const idx = orderedIds.indexOf(t.id)
        return idx >= 0 ? { ...t, order: idx } : t
      })
    )
  }

  function deleteAllForKid(kidId) {
    const kidRoutineIds = routines
      .filter((r) => r.kidId === kidId)
      .map((r) => r.id)
    setRoutines((prev) => prev.filter((r) => r.kidId !== kidId))
    setTasks((prev) => prev.filter((t) => !kidRoutineIds.includes(t.routineId)))
  }

  return {
    routines,
    tasks,
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
  }
}
