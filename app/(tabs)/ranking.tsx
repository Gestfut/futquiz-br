import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUserStore } from '../../store/useUserStore'

const MOCK_RANKING = [
  { id: '1', username: 'CraqueDigital', ovr: 94, wins: 42, xp: 8400 },
  { id: '2', username: 'FutMestre', ovr: 91, wins: 38, xp: 7600 },
  { id: '3', username: 'GoleiRo10', ovr: 89, wins: 35, xp: 7000 },
  { id: '4', username: 'TaticistaFC', ovr: 87, wins: 31, xp: 6200 },
  { id: '5', username: 'ReiDaÁrea', ovr: 85, wins: 28, xp: 5600 },
  { id: '6', username: 'LoboDoCampo', ovr: 83, wins: 25, xp: 5000 },
  { id: '7', username: 'VoadorVerde', ovr: 81, wins: 22, xp: 4400 },
  { id: '8', username: 'EscoladoBola', ovr: 79, wins: 19, xp: 3800 },
  { id: '9', username: 'PeloGol', ovr: 77, wins: 16, xp: 3200 },
  { id: '10', username: 'Fenômeno99', ovr: 75, wins: 13, xp: 2600 },
]

const MEDALS = ['🥇', '🥈', '🥉']

export default function RankingScreen() {
  const { level, xp } = useUserStore()
  const [tab, setTab] = useState<'global' | 'semanal'>('semanal')

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Ranking</Text>
      </View>

      {/* Prizes */}
      <View style={styles.prizesCard}>
        <Text style={styles.prizesTitle}>🏆 Prêmios desta semana</Text>
        <View style={styles.prizesRow}>
          <View style={styles.prize}>
            <Text style={styles.prizeEmoji}>🥇</Text>
            <Text style={styles.prizeLabel}>1500 🪙</Text>
          </View>
          <View style={styles.prize}>
            <Text style={styles.prizeEmoji}>🥈</Text>
            <Text style={styles.prizeLabel}>800 🪙</Text>
          </View>
          <View style={styles.prize}>
            <Text style={styles.prizeEmoji}>🥉</Text>
            <Text style={styles.prizeLabel}>400 🪙</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['semanal', 'global'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'semanal' ? 'Semanal' : 'Global'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Your position */}
      <View style={styles.myCard}>
        <Text style={styles.myRank}>#--</Text>
        <View style={styles.myInfo}>
          <Text style={styles.myName}>Você • Nível {level}</Text>
          <Text style={styles.myXP}>{xp} XP esta semana</Text>
        </View>
        <Text style={styles.myOvr}>--</Text>
      </View>

      {/* List */}
      <FlatList
        data={MOCK_RANKING}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={[styles.row, index < 3 && styles.rowTop]}>
            <Text style={styles.rank}>
              {index < 3 ? MEDALS[index] : `${index + 1}º`}
            </Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowName}>{item.username}</Text>
              <Text style={styles.rowXP}>{item.xp.toLocaleString()} XP • {item.wins} vitórias</Text>
            </View>
            <View style={styles.ovrChip}>
              <Text style={styles.ovrChipText}>{item.ovr}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050f0a' },
  header: { padding: 20, paddingBottom: 8 },
  title: { color: '#FFD700', fontSize: 24, fontWeight: '900' },
  prizesCard: {
    backgroundColor: '#0d2318',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginBottom: 12,
  },
  prizesTitle: { color: '#FFD700', fontWeight: '700', fontSize: 13, marginBottom: 10 },
  prizesRow: { flexDirection: 'row', justifyContent: 'space-around' },
  prize: { alignItems: 'center', gap: 4 },
  prizeEmoji: { fontSize: 24 },
  prizeLabel: { color: '#aaa', fontSize: 12, fontWeight: '600' },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: '#0d2318',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#FFD700' },
  tabText: { color: '#aaa', fontWeight: '700', fontSize: 13 },
  tabTextActive: { color: '#000' },
  myCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a3a2a',
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginBottom: 8,
  },
  myRank: { color: '#FFD700', fontWeight: '900', fontSize: 18, width: 40 },
  myInfo: { flex: 1 },
  myName: { color: '#fff', fontWeight: '700', fontSize: 14 },
  myXP: { color: '#aaa', fontSize: 12 },
  myOvr: { color: '#FFD700', fontWeight: '800', fontSize: 16 },
  list: { paddingHorizontal: 16, gap: 8, paddingBottom: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d2318',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1e4a32',
  },
  rowTop: { borderColor: '#FFD700' + '44' },
  rank: { fontSize: 18, width: 36, textAlign: 'center' },
  rowInfo: { flex: 1 },
  rowName: { color: '#fff', fontWeight: '700', fontSize: 14 },
  rowXP: { color: '#aaa', fontSize: 11 },
  ovrChip: {
    backgroundColor: '#1e4a32',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ovrChipText: { color: '#FFD700', fontWeight: '800', fontSize: 14 },
})
