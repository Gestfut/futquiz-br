import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CoinDisplay } from '../../components/ui/CoinDisplay'
import { XPBar } from '../../components/ui/XPBar'
import { useUserStore } from '../../store/useUserStore'
import { useTeamStore } from '../../store/useTeamStore'
import { useMissionsStore } from '../../store/useMissionsStore'
import { useLeagueStore } from '../../store/useLeagueStore'
import { getLeague, getNextLeague } from '../../constants/divisions'

export default function HomeScreen() {
  const { loginStreak, checkDailyLogin, canPlayDailyChallenge, addCoins, addXP } = useUserStore()
  const ovr = useTeamStore((s) => s.getOVR())
  const { missions, claimReward, resetIfNewDay, loadFromStorage } = useMissionsStore()
  const { leagueId } = useLeagueStore()
  const division = getLeague(leagueId)
  const nextDivision = getNextLeague(leagueId)

  useEffect(() => {
    checkDailyLogin()
    resetIfNewDay()
    loadFromStorage()
  }, [])

  const handleClaimMission = (missionId: string) => {
    const reward = claimReward(missionId)
    if (!reward) return
    addCoins(reward.coins)
    addXP(reward.xp)
    Alert.alert('Recompensa coletada!', `+${reward.coins} moedas  +${reward.xp} XP`)
  }

  const challengeAvailable = canPlayDailyChallenge()

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Fut Manager</Text>
            <Text style={styles.subtitle}>Pocket Edition</Text>
          </View>
          <CoinDisplay />
        </View>

        {/* Division */}
        <TouchableOpacity style={[styles.divCard, { borderColor: division.color }]} onPress={() => router.push('/(tabs)/time')}>
          <Text style={styles.divEmoji}>{division.badge}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.divName, { color: division.color }]}>{division.name}</Text>
            {nextDivision && (
              <Text style={styles.divNext}>Próxima: {nextDivision.badge} {nextDivision.name} • OVR {nextDivision.minOVR}+</Text>
            )}
          </View>
          <Text style={styles.divArrow}>›</Text>
        </TouchableOpacity>

        {/* XP Bar */}
        <View style={styles.card}>
          <XPBar />
          {loginStreak > 0 && (
            <Text style={styles.streak}>🔥 {loginStreak} dia{loginStreak > 1 ? 's' : ''} consecutivos</Text>
          )}
        </View>

        {/* Daily Challenge */}
        <TouchableOpacity
          style={[styles.challengeBtn, !challengeAvailable && styles.challengeBtnDone]}
          onPress={() => challengeAvailable
            ? router.push({ pathname: '/(tabs)/quiz', params: { mode: 'challenge' } })
            : Alert.alert('Desafio concluído!', 'Você já completou o desafio de hoje. Volte amanhã!')
          }
        >
          <View style={styles.challengeLeft}>
            <Text style={styles.challengeEmoji}>{challengeAvailable ? '⚡' : '✅'}</Text>
            <View>
              <Text style={styles.challengeTitle}>Desafio Diário</Text>
              <Text style={styles.challengeSubtitle}>
                {challengeAvailable ? '10 perguntas • Recompensa 2×' : 'Concluído hoje!'}
              </Text>
            </View>
          </View>
          <Text style={styles.challengeArrow}>›</Text>
        </TouchableOpacity>

        {/* CTA Quiz */}
        <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/(tabs)/quiz')}>
          <Text style={styles.ctaEmoji}>🧠</Text>
          <View>
            <Text style={styles.ctaTitle}>Jogar Quiz</Text>
            <Text style={styles.ctaSubtitle}>Ganhe moedas e XP respondendo perguntas</Text>
          </View>
        </TouchableOpacity>

        {/* Daily Missions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Missões Diárias</Text>
          {missions.map((mission) => {
            const progress = Math.min(mission.progress / mission.goal, 1)
            const canClaim = mission.completed && !mission.claimed

            return (
              <View key={mission.id} style={styles.missionRow}>
                <View style={styles.missionInfo}>
                  <Text style={[styles.missionTitle, mission.claimed && styles.missionDone]}>
                    {mission.claimed ? '✅ ' : ''}{mission.title}
                  </Text>
                  <Text style={styles.missionDesc}>{mission.description}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                  </View>
                  <Text style={styles.progressText}>
                    {mission.progress}/{mission.goal}  •  🪙{mission.reward.coins} ⚡{mission.reward.xp}XP
                  </Text>
                </View>
                {canClaim && (
                  <TouchableOpacity style={styles.claimBtn} onPress={() => handleClaimMission(mission.id)}>
                    <Text style={styles.claimBtnText}>Coletar</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          })}
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/time')}>
            <Text style={styles.statEmoji}>⚽</Text>
            <Text style={styles.statValue}>{ovr > 0 ? ovr : '--'}</Text>
            <Text style={styles.statLabel}>OVR do Time</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/pacotes')}>
            <Text style={styles.statEmoji}>📦</Text>
            <Text style={styles.statValue}>Abrir</Text>
            <Text style={styles.statLabel}>Pacotes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard} onPress={() => router.push('/(tabs)/ranking')}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statValue}>Top</Text>
            <Text style={styles.statLabel}>Ranking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050f0a' },
  container: { padding: 20, gap: 16, paddingBottom: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { color: '#FFD700', fontSize: 26, fontWeight: '900', letterSpacing: 1 },
  subtitle: { color: '#4a7a5a', fontSize: 13, fontWeight: '600' },
  card: {
    backgroundColor: '#0d2318',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e4a32',
    gap: 10,
  },
  streak: { color: '#f97316', fontSize: 13, fontWeight: '600' },
  challengeBtn: {
    backgroundColor: '#1a2e10',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  challengeBtnDone: { borderColor: '#2d5a3d', backgroundColor: '#0d1f0f' },
  challengeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  challengeEmoji: { fontSize: 32 },
  challengeTitle: { color: '#FFD700', fontWeight: '800', fontSize: 16 },
  challengeSubtitle: { color: '#aaa', fontSize: 12, marginTop: 2 },
  challengeArrow: { color: '#FFD700', fontSize: 22 },
  ctaBtn: {
    backgroundColor: '#1a3a2a',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#2d5a3d',
  },
  ctaEmoji: { fontSize: 36 },
  ctaTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  ctaSubtitle: { color: '#aaa', fontSize: 12, marginTop: 2 },
  sectionTitle: { color: '#FFD700', fontWeight: '700', fontSize: 14 },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1e4a32',
  },
  missionInfo: { flex: 1, gap: 4 },
  missionTitle: { color: '#fff', fontWeight: '700', fontSize: 13 },
  missionDone: { color: '#4a7a5a' },
  missionDesc: { color: '#888', fontSize: 11 },
  progressBar: {
    height: 5,
    backgroundColor: '#1e4a32',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 2,
  },
  progressFill: { height: '100%', backgroundColor: '#4ade80', borderRadius: 3 },
  progressText: { color: '#666', fontSize: 10 },
  claimBtn: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  claimBtnText: { color: '#000', fontWeight: '800', fontSize: 12 },
  divCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#0d2318', borderRadius: 14, padding: 14,
    borderWidth: 2,
  },
  divEmoji: { fontSize: 28 },
  divName: { fontWeight: '800', fontSize: 16 },
  divNext: { color: '#666', fontSize: 11, marginTop: 2 },
  divArrow: { color: '#555', fontSize: 22 },
  statsGrid: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: '#0d2318',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#1e4a32',
  },
  statEmoji: { fontSize: 24 },
  statValue: { color: '#FFD700', fontSize: 18, fontWeight: '800' },
  statLabel: { color: '#aaa', fontSize: 10, textAlign: 'center' },
})
