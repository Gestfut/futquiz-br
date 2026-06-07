import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LEAGUES, getLeague, getNextLeague } from '../constants/divisions'

interface LeagueState {
  leagueId: number

  checkPromotion: (ovr: number, isFullTeam: boolean) => { promoted: boolean; league: typeof LEAGUES[0] } | null
  loadFromStorage: () => Promise<void>
  saveToStorage: () => Promise<void>
}

export const useLeagueStore = create<LeagueState>((set, get) => ({
  leagueId: 1,

  checkPromotion: (ovr, isFullTeam) => {
    const { leagueId } = get()
    const next = getNextLeague(leagueId)
    if (!next) return null
    if (next.requiresFullTeam && !isFullTeam) return null
    if (ovr < next.minOVR) return null

    set({ leagueId: next.id })
    get().saveToStorage()
    return { promoted: true, league: next }
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem('league_store')
      if (raw) set(JSON.parse(raw))
    } catch {}
  },

  saveToStorage: async () => {
    try {
      await AsyncStorage.setItem('league_store', JSON.stringify({ leagueId: get().leagueId }))
    } catch {}
  },
}))
