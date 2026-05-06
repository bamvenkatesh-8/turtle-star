export const BADGES = [
  { id: 'first-star', label: 'First Star', emoji: '⭐', minStars: 1 },
  { id: 'good-start', label: 'Good Start', emoji: '🌟', minStars: 10 },
  { id: 'rising-star', label: 'Rising Star', emoji: '💫', minStars: 25 },
  { id: 'superstar', label: 'Superstar', emoji: '🌠', minStars: 50 },
  { id: 'champion', label: 'Champion', emoji: '🏆', minStars: 100 },
  { id: 'legend', label: 'Legend', emoji: '👑', minStars: 200 },
]

export function getEarnedBadges(totalStars) {
  return BADGES.filter((b) => totalStars >= b.minStars)
}

export function getNextBadge(totalStars) {
  return BADGES.find((b) => totalStars < b.minStars) || null
}
