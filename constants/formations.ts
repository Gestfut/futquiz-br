export type Position = 'GK' | 'CB1' | 'CB2' | 'LB' | 'RB' | 'CM1' | 'CM2' | 'CM3' | 'LW' | 'RW' | 'ST'

export const FORMATIONS: Record<string, {
  slots: Position[]
  layout: Record<Position, { row: number; col: number }>
}> = {
  '4-3-3': {
    slots: ['GK', 'LB', 'CB1', 'CB2', 'RB', 'CM1', 'CM2', 'CM3', 'LW', 'ST', 'RW'],
    layout: {
      GK:  { row: 5, col: 2 },
      LB:  { row: 4, col: 0 },
      CB1: { row: 4, col: 1 },
      CB2: { row: 4, col: 3 },
      RB:  { row: 4, col: 4 },
      CM1: { row: 3, col: 1 },
      CM2: { row: 3, col: 2 },
      CM3: { row: 3, col: 3 },
      LW:  { row: 1, col: 0 },
      ST:  { row: 1, col: 2 },
      RW:  { row: 1, col: 4 },
    },
  },
  '4-4-2': {
    slots: ['GK', 'LB', 'CB1', 'CB2', 'RB', 'CM1', 'CM2', 'CM3', 'CM3', 'ST', 'RW'],
    layout: {
      GK:  { row: 5, col: 2 },
      LB:  { row: 4, col: 0 },
      CB1: { row: 4, col: 1 },
      CB2: { row: 4, col: 3 },
      RB:  { row: 4, col: 4 },
      CM1: { row: 3, col: 0 },
      CM2: { row: 3, col: 1 },
      CM3: { row: 3, col: 3 },
      LW:  { row: 3, col: 4 },
      ST:  { row: 1, col: 1 },
      RW:  { row: 1, col: 3 },
    },
  },
}

export const POSITION_LABELS: Record<Position, string> = {
  GK: 'GOL', CB1: 'ZAG', CB2: 'ZAG', LB: 'LAT', RB: 'LAT',
  CM1: 'MEI', CM2: 'MEI', CM3: 'MEI', LW: 'ATA', RW: 'ATA', ST: 'ATA',
}
