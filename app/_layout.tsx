import React, { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserStore } from '../store/useUserStore'
import { usePlayerStore } from '../store/usePlayerStore'
import { useTeamStore } from '../store/useTeamStore'

export default function RootLayout() {
  const loadUser = useUserStore((s) => s.loadFromStorage)
  const loadPlayers = usePlayerStore((s) => s.loadFromStorage)
  const loadTeam = useTeamStore((s) => s.loadFromStorage)
  const setUser = useUserStore((s) => s.setUser)

  useEffect(() => {
    async function init() {
      const token = await AsyncStorage.getItem('auth_token')
      if (!token) {
        router.replace('/auth')
        return
      }
      await Promise.all([loadUser(), loadPlayers(), loadTeam()])
    }
    init()
  }, [])

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050f0a' } }} />
    </>
  )
}
