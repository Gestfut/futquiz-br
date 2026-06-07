import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native'
import { Player } from '../../data/players'
import { RARITIES } from '../../constants/rarities'

interface Props {
  player: Player
  size?: 'small' | 'large'
  flippable?: boolean
}

export function PlayerCard({ player, size = 'large', flippable = false }: Props) {
  const [isFront, setIsFront] = useState(true)
  const flipAnim = useRef(new Animated.Value(0)).current
  const rarityColor = RARITIES[player.rarity].color

  const cardWidth = size === 'large' ? 180 : 110
  const cardHeight = size === 'large' ? 260 : 158
  const fontSize = size === 'large' ? 14 : 9
  const overallSize = size === 'large' ? 36 : 22

  const frontRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] })
  const backRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] })

  const handlePress = () => {
    if (!flippable) return
    Animated.timing(flipAnim, {
      toValue: isFront ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start()
    setIsFront(!isFront)
  }

  const Wrapper = flippable ? TouchableOpacity : View

  return (
    <Wrapper
      onPress={flippable ? handlePress : undefined}
      activeOpacity={0.9}
      style={{ width: cardWidth, height: cardHeight }}
    >
      {/* Front */}
      <Animated.View
        style={[
          styles.card,
          { borderColor: rarityColor, width: cardWidth, height: cardHeight, position: 'absolute' },
          { transform: [{ rotateY: frontRotate }], backfaceVisibility: 'hidden' },
        ]}
      >
        <View style={[styles.header, { backgroundColor: rarityColor + '33' }]}>
          <Text style={[styles.overall, { color: rarityColor, fontSize: overallSize }]}>{player.overall}</Text>
          <Text style={[styles.position, { color: rarityColor, fontSize }]}>{player.position}</Text>
        </View>
        <View style={styles.body}>
          <Text style={[styles.name, { fontSize: fontSize + 1 }]} numberOfLines={2}>{player.name}</Text>
          <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
            <Text style={[styles.rarityText, { fontSize: fontSize - 2 }]}>{RARITIES[player.rarity].label.toUpperCase()}</Text>
          </View>
          <Text style={[styles.club, { fontSize: fontSize - 1 }]} numberOfLines={1}>{player.club}</Text>
        </View>
        {flippable && <Text style={styles.hint}>Toque para ver stats</Text>}
      </Animated.View>

      {/* Back */}
      <Animated.View
        style={[
          styles.card,
          { borderColor: rarityColor, width: cardWidth, height: cardHeight, padding: 10, position: 'absolute' },
          { transform: [{ rotateY: backRotate }], backfaceVisibility: 'hidden' },
        ]}
      >
        <Text style={[styles.name, { color: rarityColor, marginBottom: 8, fontSize }]}>{player.name}</Text>
        {Object.entries(player.stats).map(([key, val]) => (
          <View key={key} style={styles.statRow}>
            <Text style={[styles.statLabel, { fontSize: fontSize - 1 }]}>{key.toUpperCase()}</Text>
            <View style={styles.statBar}>
              <View style={[styles.statFill, { width: `${val}%`, backgroundColor: rarityColor }]} />
            </View>
            <Text style={[styles.statVal, { fontSize: fontSize - 1 }]}>{val}</Text>
          </View>
        ))}
        <Text style={styles.hint}>Toque para voltar</Text>
      </Animated.View>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#0d2318', borderWidth: 2, borderRadius: 12, overflow: 'hidden' },
  header: { padding: 10, alignItems: 'flex-start' },
  overall: { fontWeight: '900', lineHeight: 36 },
  position: { fontWeight: '700', marginTop: -4 },
  body: { flex: 1, padding: 10, justifyContent: 'flex-end', gap: 4 },
  name: { color: '#fff', fontWeight: '700', lineHeight: 18 },
  rarityBadge: { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  rarityText: { color: '#000', fontWeight: '800' },
  club: { color: '#aaa' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 4 },
  statLabel: { color: '#aaa', width: 30 },
  statBar: { flex: 1, height: 5, backgroundColor: '#1e4a32', borderRadius: 3, overflow: 'hidden' },
  statFill: { height: '100%', borderRadius: 3 },
  statVal: { color: '#fff', width: 24, textAlign: 'right' },
  hint: { color: '#555', fontSize: 9, textAlign: 'center', paddingBottom: 4 },
})
