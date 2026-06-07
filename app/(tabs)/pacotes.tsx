import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CoinDisplay } from '../../components/ui/CoinDisplay'
import { PackOpening } from '../../components/cards/PackOpening'
import { PlayerCard } from '../../components/cards/PlayerCard'
import { useUserStore } from '../../store/useUserStore'
import { usePlayerStore } from '../../store/usePlayerStore'
import { useMissionsStore } from '../../store/useMissionsStore'
import { useLeagueStore } from '../../store/useLeagueStore'
import { getUnlockedRegions, LEAGUES } from '../../constants/divisions'
import { openPack } from '../../lib/cards'
import { PACK_PRICES, PackType, RARITIES } from '../../constants/rarities'
import { Player, PLAYERS } from '../../data/players'

const PACK_EMOJIS: Record<PackType, string> = {
  basic: '📦',
  premium: '🎁',
  elite: '👑',
}

const PACK_DESCRIPTIONS: Record<PackType, string> = {
  basic: '3 cartas • Drop normal',
  premium: '5 cartas • Prata garantida',
  elite: '5 cartas • Ouro garantido',
}

type Tab = 'pacotes' | 'colecao'
type RarityFilter = 'all' | keyof typeof RARITIES

export default function PacotesScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('pacotes')
  const [openedCards, setOpenedCards] = useState<Player[] | null>(null)
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('all')

  const { coins, spendCoins } = useUserStore()
  const { ownedCards, addCard } = usePlayerStore()
  const { updateProgress } = useMissionsStore()
  const { leagueId } = useLeagueStore()
  const unlockedRegions = getUnlockedRegions(leagueId)

  const handleOpenPack = (packType: PackType) => {
    const price = PACK_PRICES[packType].coins
    if (coins < price) {
      Alert.alert('Moedas insuficientes', `Você precisa de ${price} moedas para abrir este pacote.`)
      return
    }
    const success = spendCoins(price)
    if (!success) return

    const cards = openPack(packType, ownedCards.map((c) => c.id), leagueId)
    cards.forEach((c) => addCard(c))
    setOpenedCards(cards)
    updateProgress('open_pack')
  }

  const filteredOwned = rarityFilter === 'all'
    ? ownedCards
    : ownedCards.filter((c) => c.rarity === rarityFilter)

  const totalCards = PLAYERS.length

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Coleção</Text>
        <CoinDisplay />
      </View>

      {/* Tab selector */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pacotes' && styles.tabActive]}
          onPress={() => setActiveTab('pacotes')}
        >
          <Text style={[styles.tabText, activeTab === 'pacotes' && styles.tabTextActive]}>📦 Pacotes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'colecao' && styles.tabActive]}
          onPress={() => setActiveTab('colecao')}
        >
          <Text style={[styles.tabText, activeTab === 'colecao' && styles.tabTextActive]}>
            🃏 Coleção ({ownedCards.length}/{totalCards})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'pacotes' ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.regionsCard}>
            <Text style={styles.regionsTitle}>🌐 Regiões desbloqueadas</Text>
            <View style={styles.regionsRow}>
              {LEAGUES.map((l) => (
                <View key={l.id} style={[styles.regionChip, unlockedRegions.includes(l.region) ? { borderColor: l.color } : styles.regionLocked]}>
                  <Text style={[styles.regionChipText, !unlockedRegions.includes(l.region) && styles.regionLockedText]}>
                    {l.badge} {l.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {(Object.keys(PACK_PRICES) as PackType[]).map((packType) => {
            const pack = PACK_PRICES[packType]
            const canAfford = coins >= pack.coins

            return (
              <View key={packType} style={[styles.packCard, !canAfford && styles.packCardDisabled]}>
                <Text style={styles.packEmoji}>{PACK_EMOJIS[packType]}</Text>
                <View style={styles.packInfo}>
                  <Text style={styles.packName}>Pacote {pack.label}</Text>
                  <Text style={styles.packDesc}>{PACK_DESCRIPTIONS[packType]}</Text>
                  <View style={styles.dropRates}>
                    {(Object.keys(RARITIES) as (keyof typeof RARITIES)[]).map((r) => (
                      <Text key={r} style={[styles.dropRate, { color: RARITIES[r].color }]}>
                        {RARITIES[r].label} {(RARITIES[r].chance * 100).toFixed(0)}%
                      </Text>
                    ))}
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.buyBtn, !canAfford && styles.buyBtnDisabled]}
                  onPress={() => handleOpenPack(packType)}
                  disabled={!canAfford}
                >
                  <Text style={styles.buyBtnCoin}>🪙</Text>
                  <Text style={styles.buyBtnText}>{pack.coins.toLocaleString()}</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      ) : (
        <View style={styles.collectionContainer}>
          {/* Rarity filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterRow}>
            {(['all', ...Object.keys(RARITIES)] as RarityFilter[]).map((r) => {
              const label = r === 'all' ? 'Todas' : RARITIES[r as keyof typeof RARITIES].label
              const color = r === 'all' ? '#FFD700' : RARITIES[r as keyof typeof RARITIES].color
              const isActive = rarityFilter === r
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.filterChip, isActive && { borderColor: color, backgroundColor: color + '22' }]}
                  onPress={() => setRarityFilter(r)}
                >
                  <Text style={[styles.filterChipText, isActive && { color }]}>{label}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>

          {filteredOwned.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={styles.emptyText}>Nenhuma carta nessa raridade ainda.</Text>
              <Text style={styles.emptyHint}>Abra pacotes para conseguir cartas!</Text>
            </View>
          ) : (
            <FlatList
              data={filteredOwned}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.gridRow}
              renderItem={({ item }) => (
                <PlayerCard player={item} size="small" flippable />
              )}
            />
          )}
        </View>
      )}

      <Modal visible={!!openedCards} animationType="fade">
        {openedCards && (
          <PackOpening cards={openedCards} onClose={() => setOpenedCards(null)} />
        )}
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050f0a' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: { color: '#FFD700', fontSize: 24, fontWeight: '900' },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#0d2318',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#1e4a32',
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 9 },
  tabActive: { backgroundColor: '#1e4a32' },
  tabText: { color: '#4a7a5a', fontWeight: '700', fontSize: 13 },
  tabTextActive: { color: '#FFD700' },
  container: { padding: 16, gap: 14, paddingBottom: 30 },
  packCard: {
    backgroundColor: '#0d2318',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#1e4a32',
  },
  packCardDisabled: { opacity: 0.5 },
  packEmoji: { fontSize: 40 },
  packInfo: { flex: 1, gap: 4 },
  packName: { color: '#FFD700', fontSize: 16, fontWeight: '800' },
  packDesc: { color: '#aaa', fontSize: 12 },
  dropRates: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  dropRate: { fontSize: 10, fontWeight: '700' },
  buyBtn: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    minWidth: 70,
  },
  buyBtnDisabled: { backgroundColor: '#333' },
  buyBtnCoin: { fontSize: 16 },
  buyBtnText: { color: '#000', fontWeight: '800', fontSize: 12 },
  collectionContainer: { flex: 1 },
  filterScroll: { maxHeight: 48 },
  filterRow: { paddingHorizontal: 16, gap: 8, alignItems: 'center', paddingVertical: 6 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2d5a3d',
    backgroundColor: '#0d2318',
  },
  filterChipText: { color: '#666', fontWeight: '700', fontSize: 12 },
  gridContainer: { padding: 12, paddingBottom: 30 },
  gridRow: { gap: 8, marginBottom: 8, justifyContent: 'flex-start' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, paddingTop: 60 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: '#aaa', fontSize: 15, fontWeight: '600' },
  emptyHint: { color: '#555', fontSize: 13 },
  regionsCard: {
    backgroundColor: '#0d2318', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#1e4a32', gap: 10,
  },
  regionsTitle: { color: '#FFD700', fontWeight: '700', fontSize: 13 },
  regionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  regionChip: {
    borderWidth: 1, borderColor: '#2d5a3d', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  regionLocked: { borderColor: '#1a2a1a', opacity: 0.4 },
  regionChipText: { color: '#ccc', fontSize: 11, fontWeight: '700' },
  regionLockedText: { color: '#555' },
})
