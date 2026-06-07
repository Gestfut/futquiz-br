import { RARITIES, Rarity, PACK_PRICES, PackType } from '../constants/rarities'
import { PLAYERS, Player } from '../data/players'
import { Region, getUnlockedRegions } from '../constants/divisions'

function drawRarity(guaranteed?: 'silver' | 'gold'): Rarity {
  if (guaranteed === 'gold') {
    const roll = Math.random()
    return roll < (RARITIES.elite.chance / (RARITIES.elite.chance + RARITIES.gold.chance))
      ? 'elite'
      : 'gold'
  }
  if (guaranteed === 'silver') {
    const roll = Math.random()
    if (roll < RARITIES.elite.chance) return 'elite'
    if (roll < RARITIES.elite.chance + RARITIES.gold.chance) return 'gold'
    return 'silver'
  }

  const roll = Math.random()
  let cumulative = 0
  for (const [rarity, config] of Object.entries(RARITIES) as [Rarity, typeof RARITIES[Rarity]][]) {
    cumulative += config.chance
    if (roll < cumulative) return rarity
  }
  return 'bronze'
}

export function openPack(packType: PackType, ownedIds: string[], leagueId = 1): Player[] {
  const config = PACK_PRICES[packType]
  const unlockedRegions = getUnlockedRegions(leagueId)
  const result: Player[] = []

  for (let i = 0; i < config.cards; i++) {
    let guaranteed: 'silver' | 'gold' | undefined
    if (i === 0 && config.guaranteedGold) guaranteed = 'gold'
    if (i === 0 && config.guaranteedSilver) guaranteed = 'silver'

    const rarity = drawRarity(guaranteed)
    const pool = PLAYERS.filter(
      (p) =>
        p.rarity === rarity &&
        unlockedRegions.includes(p.region) &&
        !ownedIds.includes(p.id) &&
        !result.some((r) => r.id === p.id)
    )

    if (pool.length === 0) {
      const fallback = PLAYERS.filter(
        (p) => p.rarity === rarity && unlockedRegions.includes(p.region)
      )
      if (fallback.length) result.push(fallback[Math.floor(Math.random() * fallback.length)])
    } else {
      result.push(pool[Math.floor(Math.random() * pool.length)])
    }
  }

  return result
}
