const base = {
  bg: 'bg-transparent',
  card: 'bg-white rounded-2xl shadow-sm',
  header: 'bg-white/80 backdrop-blur-md border-b border-gray-200',
  headerText: 'text-gray-900',
  text: 'text-gray-900',
  textSecondary: 'text-gray-500',
  separator: 'border-gray-200',
  input: 'bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400',
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
}

export const UI_THEMES = {
  cartoonish: {
    ...base,
    id: 'cartoonish',
    name: 'Sky',
    emoji: '🌊',
    accentColor: '#007AFF',
    accentGrad: 'from-blue-500 to-indigo-500',
    headerGrad: 'from-blue-500 to-indigo-500',
  },
  friendly: {
    ...base,
    id: 'friendly',
    name: 'Coral',
    emoji: '🍊',
    accentColor: '#FF9F0A',
    accentGrad: 'from-orange-400 to-pink-500',
    headerGrad: 'from-orange-400 to-pink-500',
  },
  character: {
    ...base,
    id: 'character',
    name: 'Mint',
    emoji: '🌿',
    accentColor: '#34C759',
    accentGrad: 'from-green-400 to-teal-500',
    headerGrad: 'from-green-400 to-teal-500',
  },
}

export const DEFAULT_THEME = 'cartoonish'
