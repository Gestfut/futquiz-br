export type Rarity = 'bronze' | 'silver' | 'gold' | 'elite'

export const RARITIES: Record<Rarity, {
  chance: number
  overallRange: [number, number]
  color: string
  label: string
}> = {
  bronze: { chance: 0.60, overallRange: [60, 72], color: '#CD7F32', label: 'Bronze' },
  silver: { chance: 0.28, overallRange: [73, 82], color: '#C0C0C0', label: 'Prata' },
  gold:   { chance: 0.10, overallRange: [83, 91], color: '#FFD700', label: 'Ouro' },
  elite:  { chance: 0.02, overallRange: [92, 99], color: '#9B59B6', label: 'Elite' },
}

export const PACK_PRICES = {
  basic:   { coins: 300, cards: 3, guaranteedSilver: false, guaranteedGold: false, label: 'Básico' },
  premium: { coins: 800, cards: 5, guaranteedSilver: true,  guaranteedGold: false, label: 'Premium' },
  elite:   { coins: 2000, cards: 5, guaranteedSilver: false, guaranteedGold: true,  label: 'Elite' },
} as const

export type PackType = keyof typeof PACK_PRICES
