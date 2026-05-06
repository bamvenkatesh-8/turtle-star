import { useState, useEffect } from 'react'

const STORAGE_KEY = 'turtlestar_kids'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(kids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kids))
}

export function useKids() {
  const [kids, setKids] = useState(load)

  useEffect(() => {
    save(kids)
  }, [kids])

  function addKid(kidData) {
    const kid = {
      id: Date.now().toString(),
      name: kidData.name,
      avatar: kidData.avatar || '😊',
      uiTheme: kidData.uiTheme || 'cartoonish',
      celebrationTheme: kidData.celebrationTheme || 'unicorn',
      taskViewMode: 'card',
      totalStars: 0,
      currentStreak: 0,
      lastCompletedDate: null,
    }
    setKids((prev) => [...prev, kid])
    return kid
  }

  function updateKid(id, updates) {
    setKids((prev) =>
      prev.map((k) => (k.id === id ? { ...k, ...updates } : k))
    )
  }

  function deleteKid(id) {
    setKids((prev) => prev.filter((k) => k.id !== id))
  }

  function addStars(kidId, count) {
    setKids((prev) =>
      prev.map((k) =>
        k.id === kidId ? { ...k, totalStars: k.totalStars + count } : k
      )
    )
  }

  function removeStars(kidId, count) {
    setKids((prev) =>
      prev.map((k) =>
        k.id === kidId
          ? { ...k, totalStars: Math.max(0, k.totalStars - count) }
          : k
      )
    )
  }

  function markRoutineCompleted(kidId) {
    const today = new Date().toISOString().split('T')[0]
    setKids((prev) =>
      prev.map((k) => {
        if (k.id !== kidId) return k
        const lastDate = k.lastCompletedDate
        let newStreak = k.currentStreak
        if (lastDate === today) {
          // already completed today, no streak change
        } else if (lastDate) {
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split('T')[0]
          newStreak = lastDate === yesterday ? k.currentStreak + 1 : 1
        } else {
          newStreak = 1
        }
        return { ...k, currentStreak: newStreak, lastCompletedDate: today }
      })
    )
  }

  return { kids, addKid, updateKid, deleteKid, addStars, removeStars, markRoutineCompleted }
}
