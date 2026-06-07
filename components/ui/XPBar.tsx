import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useUserStore } from '../../store/useUserStore'

export function XPBar() {
  const { xp, level } = useUserStore()
  const needed = level * 100
  const pct = Math.min((xp / needed) * 100, 100)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nível {level}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.xpText}>{xp}/{needed} XP</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 4 },
  label: { color: '#FFD700', fontWeight: '700', fontSize: 13 },
  bar: {
    height: 8,
    backgroundColor: '#1e4a32',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2d6b47',
  },
  fill: { height: '100%', backgroundColor: '#FFD700', borderRadius: 4 },
  xpText: { color: '#aaa', fontSize: 11 },
})
