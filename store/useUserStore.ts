import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserState {
  coins: number
  xp: number
  level: number
  lastLoginDate: string | null
  loginStreak: number
  lastChallengeDate: string | null

  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  addXP: (amount: number) => void
  checkDailyLogin: () => boolean
  canPlayDailyChallenge: () => boolean
  markChallengeCompleted: () => void
  setUser: (user: { coins: number; xp: number; level: number }) => void
  loadFromStorage: () => Promise<void>
  saveToStorage: () => Promise<void>
}

function xpToNextLevel(level: number) {
  return level * 100
}

export const useUserStore = create<UserState>((set, get) => ({
  coins: 500,
  xp: 0,
  level: 1,
  lastLoginDate: null,
  loginStreak: 0,
  lastChallengeDate: null,

  setUser: (user) => {
    set({ coins: user.coins, xp: user.xp, level: user.level })
  },

  addCoins: (amount) => {
    set((s) => ({ coins: s.coins + amount }))
    get().saveToStorage()
  },

  spendCoins: (amount) => {
    if (get().coins < amount) return false
    set((s) => ({ coins: s.coins - amount }))
    get().saveToStorage()
    return true
  },

  addXP: (amount) => {
    set((s) => {
      let { xp, level } = s
      xp += amount
      while (xp >= xpToNextLevel(level)) {
        xp -= xpToNextLevel(level)
        level += 1
      }
      return { xp, level }
    })
    get().saveToStorage()
  },

  checkDailyLogin: () => {
    const today = new Date().toDateString()
    const { lastLoginDate, loginStreak } = get()
    if (lastLoginDate === today) return false

    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const newStreak = lastLoginDate === yesterday ? loginStreak + 1 : 1
    set({ lastLoginDate: today, loginStreak: newStreak })
    get().addCoins(30)
    get().addXP(30)
    get().saveToStorage()
    return true
  },

  canPlayDailyChallenge: () => {
    const today = new Date().toDateString()
    return get().lastChallengeDate !== today
  },

  markChallengeCompleted: () => {
    const today = new Date().toDateString()
    set({ lastChallengeDate: today })
    get().saveToStorage()
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem('user_store')
      if (raw) {
        const data = JSON.parse(raw)
        set(data)
      }
    } catch {}
  },

  saveToStorage: async () => {
    const { coins, xp, level, lastLoginDate, loginStreak, lastChallengeDate } = get()
    try {
      await AsyncStorage.setItem(
        'user_store',
        JSON.stringify({ coins, xp, level, lastLoginDate, loginStreak, lastChallengeDate })
      )
    } catch {}
  },
}))
