export type Region = 'brasil' | 'sulamerica' | 'africa' | 'asia' | 'europa' | 'mundial'

export interface League {
  id: number
  name: string
  subtitle: string
  badge: string
  color: string
  region: Region
  minOVR: number
  requiresFullTeam: boolean
  promotionReward: { coins: number; xp: number }
  quizBonus: number
}

export const LEAGUES: League[] = [
  {
    id: 1,
    name: 'Brasileirão',
    subtitle: 'Campeonato Brasileiro',
    badge: '🇧🇷',
    color: '#22c55e',
    region: 'brasil',
    minOVR: 0,
    requiresFullTeam: false,
    promotionReward: { coins: 0, xp: 0 },
    quizBonus: 0,
  },
  {
    id: 2,
    name: 'Libertadores',
    subtitle: 'América do Sul',
    badge: '🌎',
    color: '#f59e0b',
    region: 'sulamerica',
    minOVR: 65,
    requiresFullTeam: true,
    promotionReward: { coins: 500, xp: 200 },
    quizBonus: 0,
  },
  {
    id: 3,
    name: 'Copa Africana',
    subtitle: 'Continente Africano',
    badge: '🌍',
    color: '#ef4444',
    region: 'africa',
    minOVR: 70,
    requiresFullTeam: true,
    promotionReward: { coins: 1000, xp: 400 },
    quizBonus: 0.1,
  },
  {
    id: 4,
    name: 'Liga Asiática',
    subtitle: 'Continente Asiático',
    badge: '🌏',
    color: '#06b6d4',
    region: 'asia',
    minOVR: 74,
    requiresFullTeam: true,
    promotionReward: { coins: 1500, xp: 600 },
    quizBonus: 0.15,
  },
  {
    id: 5,
    name: 'Champions League',
    subtitle: 'Europa',
    badge: '⭐',
    color: '#a78bfa',
    region: 'europa',
    minOVR: 79,
    requiresFullTeam: true,
    promotionReward: { coins: 3000, xp: 1000 },
    quizBonus: 0.25,
  },
  {
    id: 6,
    name: 'Copa do Mundo',
    subtitle: 'Nível Mundial',
    badge: '🏆',
    color: '#FFD700',
    region: 'mundial',
    minOVR: 86,
    requiresFullTeam: true,
    promotionReward: { coins: 7000, xp: 2500 },
    quizBonus: 0.5,
  },
]

export function getLeague(id: number): League {
  return LEAGUES.find((l) => l.id === id) ?? LEAGUES[0]
}

export function getNextLeague(currentId: number): League | null {
  return LEAGUES.find((l) => l.id === currentId + 1) ?? null
}

export function getUnlockedRegions(leagueId: number): Region[] {
  return LEAGUES.filter((l) => l.id <= leagueId).map((l) => l.region)
}
