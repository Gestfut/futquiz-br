import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { Player } from '../../data/players'
import { PlayerCard } from './PlayerCard'

interface Props {
  cards: Player[]
  onClose: () => void
}

function AnimatedCard({ player, index }: { player: Player; index: number }) {
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 400),
      Animated.parallel([
        Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
    ]).start()
  }, [])

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <PlayerCard player={player} size="large" flippable />
    </Animated.View>
  )
}

export function PackOpening({ cards, onClose }: Props) {
  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>Suas Cartas!</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {cards.map((card, i) => (
          <AnimatedCard key={card.id + i} player={card} index={i} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#050f0a', alignItems: 'center', paddingTop: 60, paddingBottom: 30 },
  title: { color: '#FFD700', fontSize: 28, fontWeight: '900', marginBottom: 30, letterSpacing: 1 },
  cardsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16, paddingHorizontal: 16, paddingBottom: 20 },
  button: { backgroundColor: '#FFD700', paddingHorizontal: 40, paddingVertical: 14, borderRadius: 30, marginTop: 20 },
  buttonText: { color: '#000', fontWeight: '800', fontSize: 16 },
})
