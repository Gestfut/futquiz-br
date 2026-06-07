import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Player } from '../data/players'
import { Position } from '../constants/formations'

type Slots = Partial<Record<Position, Player>>

interface TeamState {
  formation: string
  slots: Slots
  setFormation: (f: string) => void
  setPlayer: (position: Position, player: Player | null) => void
  getOVR: () => number
  loadFromStorage: () => Promise<void>
  saveToStorage: () => Promise<void>
}

export const useTeamStore = create<TeamState>((set, get) => ({
  formation: '4-3-3',
  slots: {},

  setFormation: (f) => {
    set({ formation: f, slots: {} })
    get().saveToStorage()
  },

  setPlayer: (position, player) => {
    set((s) => {
      const slots = { ...s.slots }
      if (player === null) delete slots[position]
      else slots[position] = player
      return { slots }
    })
    get().saveToStorage()
  },

  getOVR: () => {
    const players = Object.values(get().slots).filter(Boolean) as Player[]
    if (!players.length) return 0
    return Math.round(players.reduce((sum, p) => sum + p.overall, 0) / players.length)
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem('team_store')
      if (raw) {
        const { formation, slots } = JSON.parse(raw)
        set({ formation, slots })
      }
    } catch {}
  },

  saveToStorage: async () => {
    const { formation, slots } = get()
    try {
      await AsyncStorage.setItem('team_store', JSON.stringify({ formation, slots }))
    } catch {}
  },
}))
