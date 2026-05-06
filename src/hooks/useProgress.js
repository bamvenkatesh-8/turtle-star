import { useState, useEffect } from 'react'

const PROGRESS_KEY = 'turtlestar_progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function today() {
  return new Date().toISOString().split('T')[0]
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  }, [progress])

  function getOrCreateEntry(kidId, routineId) {
    const date = today()
    return (
      progress.find(
        (p) => p.kidId === kidId && p.routineId === routineId && p.date === date
      ) || null
    )
  }

  function getEntry(kidId, routineId, date) {
    return (
      progress.find(
        (p) => p.kidId === kidId && p.routineId === routineId && p.date === date
      ) || null
    )
  }

  function toggleTask(kidId, routineId, taskId, totalTaskCount) {
    const date = today()
    setProgress((prev) => {
      const existing = prev.find(
        (p) => p.kidId === kidId && p.routineId === routineId && p.date === date
      )
      let completedTaskIds
      let wasCompleted = false
      if (existing) {
        wasCompleted = existing.fullyCompleted
        if (existing.completedTaskIds.includes(taskId)) {
          completedTaskIds = existing.completedTaskIds.filter((id) => id !== taskId)
        } else {
          completedTaskIds = [...existing.completedTaskIds, taskId]
        }
      } else {
        completedTaskIds = [taskId]
      }
      const fullyCompleted = completedTaskIds.length === totalTaskCount
      const isChecking = !existing?.completedTaskIds.includes(taskId)

      if (existing) {
        return prev.map((p) =>
          p.kidId === kidId && p.routineId === routineId && p.date === date
            ? { ...p, completedTaskIds, fullyCompleted }
            : p
        )
      } else {
        return [
          ...prev,
          {
            id: `${kidId}_${routineId}_${date}`,
            kidId,
            routineId,
            date,
            completedTaskIds,
            fullyCompleted,
          },
        ]
      }
    })

    // Return info for the caller to handle star updates
    const existing = progress.find(
      (p) => p.kidId === kidId && p.routineId === routineId && p.date === date
    )
    const wasChecked = existing?.completedTaskIds.includes(taskId)
    const willBeCompleted =
      !wasChecked &&
      ((existing?.completedTaskIds.length ?? 0) + 1 === totalTaskCount)
    const wasFullyCompleted = existing?.fullyCompleted ?? false
    const isUnchecking = wasChecked

    return {
      isChecking: !wasChecked,
      willBeCompleted,
      wasFullyCompleted: isUnchecking ? wasFullyCompleted : false,
    }
  }

  function getProgressForDate(kidId, date) {
    return progress.filter((p) => p.kidId === kidId && p.date === date)
  }

  function getProgressForDateRange(kidId, startDate, endDate) {
    return progress.filter(
      (p) => p.kidId === kidId && p.date >= startDate && p.date <= endDate
    )
  }

  function deleteAllForKid(kidId) {
    setProgress((prev) => prev.filter((p) => p.kidId !== kidId))
  }

  return {
    progress,
    getOrCreateEntry,
    getEntry,
    toggleTask,
    getProgressForDate,
    getProgressForDateRange,
    deleteAllForKid,
  }
}
