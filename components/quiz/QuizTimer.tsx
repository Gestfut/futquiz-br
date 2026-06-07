import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

interface Props {
  duration: number
  onExpire: () => void
  running: boolean
}

export function QuizTimer({ duration, onExpire, running }: Props) {
  const [seconds, setSeconds] = useState(duration)
  const progress = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!running) return

    Animated.timing(progress, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start()

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval)
          onExpire()
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  const barColor = progress.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: ['#ef4444', '#ef4444', '#4ade80'],
  })

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <View style={styles.barBg}>
        <Animated.View style={[styles.bar, { width: barWidth, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.text}>{seconds}s</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  barBg: { flex: 1, height: 10, backgroundColor: '#1e4a32', borderRadius: 5, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 5 },
  text: { color: '#fff', fontWeight: '700', width: 32, textAlign: 'right' },
})
