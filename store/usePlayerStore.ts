import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Player } from '../data/players'

interface PlayerState {
  ownedCards: Player[]
  addCard: (player: Player) => void
  hasCard: (playerId: string) => boolean
  loadFromStorage: () => Promise<void>
  saveToStorage: () => Promise<void>
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  ownedCards: [],

  addCard: (player) => {
    if (get().hasCard(player.id)) return
    set((s) => ({ ownedCards: [...s.ownedCards, player] }))
    get().saveToStorage()
  },

  hasCard: (playerId) => get().ownedCards.some((c) => c.id === playerId),

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem('player_store')
      if (raw) set({ ownedCards: JSON.parse(raw) })
    } catch {}
  },

  saveToStorage: async () => {
    try {
      await AsyncStorage.setItem('player_store', JSON.stringify(get().ownedCards))
    } catch {}
  },
}))
