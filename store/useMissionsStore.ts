import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Mission {
  id: string
  title: string
  description: string
  goal: number
  progress: number
  reward: { coins: number; xp: number }
  completed: boolean
  claimed: boolean
}

interface MissionsState {
  missions: Mission[]
  lastResetDate: string | null
  updateProgress: (missionId: string, amount?: number) => void
  claimReward: (missionId: string) => { coins: number; xp: number } | null
  resetIfNewDay: () => void
  loadFromStorage: () => Promise<void>
  saveToStorage: () => Promise<void>
}

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'quiz_complete',
    title: 'Quiz Master',
    description: 'Responda 3 quizzes hoje',
    goal: 3,
    progress: 0,
    reward: { coins: 150, xp: 50 },
    completed: false,
    claimed: false,
  },
  {
    id: 'correct_answers',
    title: 'Craque do Conhecimento',
    description: 'Acerte 10 perguntas hoje',
    goal: 10,
    progress: 0,
    reward: { coins: 200, xp: 80 },
    completed: false,
    claimed: false,
  },
  {
    id: 'perfect_quiz',
    title: 'Quiz Perfeito',
    description: 'Tire nota máxima em 1 quiz',
    goal: 1,
    progress: 0,
    reward: { coins: 300, xp: 100 },
    completed: false,
    claimed: false,
  },
]

export const useMissionsStore = create<MissionsState>((set, get) => ({
  missions: DEFAULT_MISSIONS,
  lastResetDate: null,

  updateProgress: (missionId, amount = 1) => {
    set((s) => ({
      missions: s.missions.map((m) => {
        if (m.id !== missionId || m.completed) return m
        const newProgress = Math.min(m.progress + amount, m.goal)
        return { ...m, progress: newProgress, completed: newProgress >= m.goal }
      }),
    }))
    get().saveToStorage()
  },

  claimReward: (missionId) => {
    const mission = get().missions.find((m) => m.id === missionId)
    if (!mission || !mission.completed || mission.claimed) return null
    set((s) => ({
      missions: s.missions.map((m) => (m.id === missionId ? { ...m, claimed: true } : m)),
    }))
    get().saveToStorage()
    return mission.reward
  },

  resetIfNewDay: () => {
    const today = new Date().toDateString()
    if (get().lastResetDate === today) return
    set({ missions: DEFAULT_MISSIONS.map((m) => ({ ...m })), lastResetDate: today })
    get().saveToStorage()
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem('missions_store')
      if (raw) {
        const data = JSON.parse(raw)
        set(data)
      }
    } catch {}
  },

  saveToStorage: async () => {
    const { missions, lastResetDate } = get()
    try {
      await AsyncStorage.setItem('missions_store', JSON.stringify({ missions, lastResetDate }))
    } catch {}
  },
}))
