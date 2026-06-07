import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
  Modal, FlatList, Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTeamStore } from '../../store/useTeamStore'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useUserStore } from '../../store/useUserStore'
import { useLeagueStore } from '../../store/useLeagueStore'
import { FORMATIONS, Position, POSITION_LABELS } from '../../constants/formations'
import { LEAGUES, getLeague, getNextLeague } from '../../constants/divisions'
import { RARITIES } from '../../constants/rarities'
import { Player } from '../../data/players'
import { PlayerCard } from '../../components/cards/PlayerCard'

const FORMATION_ROWS = 6
const COMPLETE_BONUS_COINS = 500
const COMPLETE_BONUS_XP = 200

type CelebMode = 'complete' | 'promotion' | null

export default function TimeScreen() {
  const { formation, slots, setFormation, setPlayer, getOVR } = useTeamStore()
  const { ownedCards } = usePlayerStore()
  const { addCoins, addXP } = useUserStore()
  const { leagueId, checkPromotion, loadFromStorage } = useLeagueStore()

  const [selectingPosition, setSelectingPosition] = useState<Position | null>(null)

  // IDs já escalados (exceto o slot que está sendo trocado)
  const slottedIds = new Set(
    Object.entries(slots)
      .filter(([pos]) => pos !== selectingPosition)
      .map(([, p]) => p?.id)
      .filter(Boolean)
  )
  const availableCards = ownedCards.filter((c) => !slottedIds.has(c.id))
  const [celebMode, setCelebMode] = useState<CelebMode>(null)
  const [promotedLeague, setPromotedLeague] = useState<typeof LEAGUES[0] | null>(null)
  const [celebratedAtOVR, setCelebratedAtOVR] = useState<number | null>(null)

  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  const currentFormation = FORMATIONS[formation] ?? FORMATIONS['4-3-3']
  const totalSlots = currentFormation.slots.length
  const filledSlots = Object.keys(slots).length
  const isComplete = filledSlots >= totalSlots
  const ovr = getOVR()
  const currentLeague = getLeague(leagueId)
  const nextLeague = getNextLeague(leagueId)

  useEffect(() => { loadFromStorage() }, [])

  useEffect(() => {
    if (!isComplete || ovr === 0) return
    if (celebratedAtOVR === ovr) return // já celebramos nesse OVR

    // Verifica promoção primeiro
    const result = checkPromotion(ovr, isComplete)
    if (result) {
      setPromotedLeague(result.league)
      addCoins(result.league.promotionReward.coins)
      addXP(result.league.promotionReward.xp)
      setCelebMode('promotion')
      setCelebratedAtOVR(ovr)
      triggerAnim()
      return
    }

    // Time completo sem promoção
    if (celebratedAtOVR === null) {
      addCoins(COMPLETE_BONUS_COINS)
      addXP(COMPLETE_BONUS_XP)
      setCelebMode('complete')
      setCelebratedAtOVR(ovr)
      triggerAnim()
    }
  }, [isComplete, ovr])

  useEffect(() => {
    if (!isComplete) setCelebratedAtOVR(null)
  }, [isComplete])

  function triggerAnim() {
    scaleAnim.setValue(0.5)
    opacityAnim.setValue(0)
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start()
  }

  const grid: (Position | null)[][] = Array.from({ length: FORMATION_ROWS }, () => Array(5).fill(null))
  for (const [pos, layout] of Object.entries(currentFormation.layout)) {
    grid[layout.row][layout.col] = pos as Position
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meu Time</Text>
          <View style={[styles.divBadge, { borderColor: currentLeague.color }]}>
            <Text style={styles.divBadgeText}>{currentLeague.badge} {currentLeague.name}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.slotCount}>{filledSlots}/{totalSlots}</Text>
          <View style={[styles.ovrBadge, isComplete && styles.ovrBadgeComplete]}>
            <Text style={styles.ovrText}>OVR {ovr > 0 ? ovr : '--'}</Text>
          </View>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${(filledSlots / totalSlots) * 100}%` }]} />
      </View>

      {/* Next division goal */}
      {nextLeague && (
        <View style={styles.goalBar}>
          <Text style={styles.goalText}>
            {nextLeague.badge} {nextLeague.name}:
            {nextLeague.requiresFullTeam && filledSlots < totalSlots
              ? ' complete o time primeiro'
              : ` OVR ${nextLeague.minOVR}+ ${ovr >= nextLeague.minOVR ? '✅' : `(faltam ${nextLeague.minOVR - ovr} pts)`}`
            }
          </Text>
        </View>
      )}

      {/* Formation selector */}
      <View style={styles.formationRow}>
        {Object.keys(FORMATIONS).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.formationBtn, formation === f && styles.formationBtnActive]}
            onPress={() => setFormation(f)}
          >
            <Text style={[styles.formationBtnText, formation === f && styles.formationBtnTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pitch */}
      <View style={styles.pitch}>
        <View style={styles.centerCircle} />
        <View style={styles.halfLine} />
        {grid.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.pitchRow}>
            {row.map((pos, colIdx) => {
              if (!pos) return <View key={colIdx} style={styles.emptySlot} />
              const player = slots[pos]
              return (
                <TouchableOpacity key={colIdx} style={styles.slotBtn} onPress={() => setSelectingPosition(pos)}>
                  {player ? (
                    <View style={[styles.playerSlot, { borderColor: RARITIES[player.rarity].color }]}>
                      <Text style={styles.slotOvr}>{player.overall}</Text>
                      <Text style={styles.slotName} numberOfLines={1}>{player.name.split(' ')[0]}</Text>
                    </View>
                  ) : (
                    <View style={styles.emptyPlayerSlot}>
                      <Text style={styles.slotPos}>{POSITION_LABELS[pos]}</Text>
                      <Text style={styles.slotPlus}>+</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>

      {/* Player selection modal */}
      <Modal visible={!!selectingPosition} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Escolher {selectingPosition ? POSITION_LABELS[selectingPosition] : ''}
              </Text>
              <TouchableOpacity onPress={() => setSelectingPosition(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {ownedCards.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Você não tem cartas ainda. Abra pacotes!</Text>
              </View>
            ) : availableCards.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Todos os seus jogadores já estão escalados!</Text>
              </View>
            ) : (
              <FlatList
                data={availableCards}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.cardGrid}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.cardWrapper}
                    onPress={() => {
                      if (selectingPosition) {
                        setPlayer(selectingPosition, item)
                        setSelectingPosition(null)
                      }
                    }}
                  >
                    <PlayerCard player={item} size="small" />
                  </TouchableOpacity>
                )}
              />
            )}

            {selectingPosition && slots[selectingPosition] && (
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => { setPlayer(selectingPosition!, null); setSelectingPosition(null) }}
              >
                <Text style={styles.removeBtnText}>Remover jogador</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Celebration modal */}
      <Modal visible={!!celebMode} transparent animationType="fade">
        <View style={styles.celebOverlay}>
          <Animated.View style={[
            styles.celebBox,
            promotedLeague && { borderColor: promotedLeague.color },
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}>
            {celebMode === 'promotion' && promotedLeague ? (
              <>
                <Text style={styles.celebEmoji}>{promotedLeague.badge}</Text>
                <Text style={styles.celebTitle}>Promovido!</Text>
                <Text style={[styles.celebDivName, { color: promotedLeague.color }]}>
                  {promotedLeague.name}
                </Text>
                <Text style={styles.celebSubtitle}>
                  Você subiu de divisão com OVR {ovr}!
                  {promotedLeague.quizBonus > 0
                    ? `\nBônus: +${promotedLeague.quizBonus * 100}% de moedas nos quizzes`
                    : ''}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.celebEmoji}>🏆</Text>
                <Text style={styles.celebTitle}>Time Completo!</Text>
                <Text style={styles.celebOvr}>OVR {ovr}</Text>
                <Text style={styles.celebSubtitle}>
                  {nextLeague
                    ? `Próxima meta: ${nextLeague.badge} ${nextLeague.name} (OVR ${nextLeague.minOVR})`
                    : 'Seu time está no máximo!'}
                </Text>
              </>
            )}

            <View style={styles.celebRewards}>
              <View style={styles.celebRewardRow}>
                <Text style={styles.celebRewardLabel}>🪙 Bônus</Text>
                <Text style={styles.celebRewardValue}>
                  +{celebMode === 'promotion' && promotedLeague
                    ? promotedLeague.promotionReward.coins
                    : COMPLETE_BONUS_COINS}
                </Text>
              </View>
              <View style={styles.celebRewardRow}>
                <Text style={styles.celebRewardLabel}>⚡ XP</Text>
                <Text style={styles.celebRewardValue}>
                  +{celebMode === 'promotion' && promotedLeague
                    ? promotedLeague.promotionReward.xp
                    : COMPLETE_BONUS_XP}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.celebBtn} onPress={() => { setCelebMode(null); setPromotedLeague(null) }}>
              <Text style={styles.celebBtnText}>Continuar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050f0a' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', padding: 20, paddingBottom: 8,
  },
  title: { color: '#FFD700', fontSize: 24, fontWeight: '900' },
  divBadge: {
    marginTop: 4, alignSelf: 'flex-start',
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3,
  },
  divBadgeText: { color: '#ccc', fontSize: 11, fontWeight: '700' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  slotCount: { color: '#aaa', fontSize: 13, fontWeight: '600' },
  ovrBadge: { backgroundColor: '#FFD700', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  ovrBadgeComplete: { backgroundColor: '#4ade80' },
  ovrText: { color: '#000', fontWeight: '800', fontSize: 14 },
  progressBg: {
    height: 4, backgroundColor: '#1e4a32', marginHorizontal: 20,
    borderRadius: 2, marginBottom: 4, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#4ade80', borderRadius: 2 },
  goalBar: {
    marginHorizontal: 20, marginBottom: 6,
    backgroundColor: '#0d2318', borderRadius: 8, padding: 8,
    borderWidth: 1, borderColor: '#1e4a32',
  },
  goalText: { color: '#aaa', fontSize: 11, fontWeight: '600' },
  formationRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 8 },
  formationBtn: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
    backgroundColor: '#0d2318', borderWidth: 1, borderColor: '#1e4a32',
  },
  formationBtnActive: { backgroundColor: '#FFD700', borderColor: '#FFD700' },
  formationBtnText: { color: '#aaa', fontWeight: '700', fontSize: 13 },
  formationBtnTextActive: { color: '#000' },
  pitch: {
    flex: 1, backgroundColor: '#0a4a1f', margin: 12, borderRadius: 16,
    padding: 8, justifyContent: 'space-around', overflow: 'hidden',
  },
  centerCircle: {
    position: 'absolute', width: 80, height: 80, borderRadius: 40,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    top: '50%', left: '50%', marginTop: -40, marginLeft: -40,
  },
  halfLine: {
    position: 'absolute', top: '50%', left: 16, right: 16,
    height: 1, backgroundColor: 'rgba(255,255,255,0.15)',
  },
  pitchRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  emptySlot: { width: 58, height: 58 },
  slotBtn: { width: 58, height: 68, alignItems: 'center', justifyContent: 'center' },
  playerSlot: {
    width: 55, height: 62, borderRadius: 10, backgroundColor: '#0d2318',
    borderWidth: 2, alignItems: 'center', justifyContent: 'center', gap: 2,
  },
  slotOvr: { color: '#FFD700', fontWeight: '800', fontSize: 15 },
  slotName: { color: '#fff', fontSize: 8, textAlign: 'center', width: 50 },
  emptyPlayerSlot: {
    width: 55, height: 62, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center', gap: 2,
  },
  slotPos: { color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: '700' },
  slotPlus: { color: 'rgba(255,255,255,0.3)', fontSize: 18, lineHeight: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#0a1f13', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: '85%', borderTopWidth: 1, borderColor: '#1e4a32',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, borderBottomWidth: 1, borderColor: '#1e4a32',
  },
  modalTitle: { color: '#FFD700', fontSize: 18, fontWeight: '800' },
  modalClose: { color: '#aaa', fontSize: 20 },
  cardGrid: { padding: 12, gap: 12 },
  cardWrapper: { flex: 1, alignItems: 'center', margin: 4 },
  emptyState: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#aaa', fontSize: 14, textAlign: 'center' },
  removeBtn: {
    margin: 16, padding: 14, backgroundColor: '#1a0505',
    borderRadius: 12, borderWidth: 1, borderColor: '#ef4444', alignItems: 'center',
  },
  removeBtnText: { color: '#ef4444', fontWeight: '700' },
  celebOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.88)', alignItems: 'center', justifyContent: 'center' },
  celebBox: {
    backgroundColor: '#0d2318', borderRadius: 24, padding: 32,
    alignItems: 'center', gap: 12, borderWidth: 2, borderColor: '#FFD700', width: '82%',
  },
  celebEmoji: { fontSize: 64 },
  celebTitle: { color: '#FFD700', fontSize: 26, fontWeight: '900' },
  celebDivName: { fontSize: 20, fontWeight: '900' },
  celebOvr: {
    color: '#000', fontWeight: '900', fontSize: 20,
    backgroundColor: '#FFD700', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 20,
  },
  celebSubtitle: { color: '#aaa', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  celebRewards: {
    backgroundColor: '#071a0f', borderRadius: 12, padding: 16,
    width: '100%', gap: 8, borderWidth: 1, borderColor: '#1e4a32',
  },
  celebRewardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  celebRewardLabel: { color: '#aaa', fontSize: 15 },
  celebRewardValue: { color: '#FFD700', fontWeight: '800', fontSize: 18 },
  celebBtn: {
    backgroundColor: '#FFD700', paddingHorizontal: 40, paddingVertical: 14,
    borderRadius: 30, width: '100%', alignItems: 'center', marginTop: 4,
  },
  celebBtnText: { color: '#000', fontWeight: '800', fontSize: 16 },
})
