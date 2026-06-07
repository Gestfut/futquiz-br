import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useUserStore } from '../../store/useUserStore'

export function CoinDisplay() {
  const coins = useUserStore((s) => s.coins)
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🪙</Text>
      <Text style={styles.text}>{coins.toLocaleString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e4a32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
    gap: 4,
  },
  icon: { fontSize: 16 },
  text: { color: '#FFD700', fontWeight: '700', fontSize: 15 },
})
