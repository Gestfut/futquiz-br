import { Rarity } from '../constants/rarities'
import { Region } from '../constants/divisions'

export interface Player {
  id: string
  name: string
  position: 'GOL' | 'ZAG' | 'LAT' | 'MEI' | 'ATA'
  overall: number
  rarity: Rarity
  club: string
  nationality: string
  region: Region
  stats: {
    pace: number
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
}

export const PLAYERS: Player[] = [

  // ── BRASIL — ELITE ────────────────────────────────────────────────────────
  {
    id: 'p1', name: 'Pelé', position: 'ATA', overall: 99, rarity: 'elite',
    club: 'Santos FC', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 92, shooting: 99, passing: 88, dribbling: 99, defending: 45, physical: 78 },
  },
  {
    id: 'p2', name: 'Ronaldinho Gaúcho', position: 'ATA', overall: 97, rarity: 'elite',
    club: 'Barcelona', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 85, shooting: 90, passing: 92, dribbling: 99, defending: 40, physical: 70 },
  },
  {
    id: 'p3', name: 'Ronaldo Fenômeno', position: 'ATA', overall: 98, rarity: 'elite',
    club: 'Real Madrid', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 95, shooting: 98, passing: 75, dribbling: 96, defending: 30, physical: 80 },
  },
  {
    id: 'p4', name: 'Zico', position: 'MEI', overall: 95, rarity: 'elite',
    club: 'Flamengo', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 78, shooting: 92, passing: 95, dribbling: 94, defending: 55, physical: 72 },
  },
  {
    id: 'p5', name: 'Romário', position: 'ATA', overall: 94, rarity: 'elite',
    club: 'PSV', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 90, shooting: 95, passing: 72, dribbling: 93, defending: 28, physical: 68 },
  },

  // ── BRASIL — GOLD ─────────────────────────────────────────────────────────
  {
    id: 'p6', name: 'Neymar Jr.', position: 'ATA', overall: 91, rarity: 'gold',
    club: 'Al-Hilal', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 89, shooting: 85, passing: 86, dribbling: 97, defending: 35, physical: 62 },
  },
  {
    id: 'p7', name: 'Kaká', position: 'MEI', overall: 91, rarity: 'gold',
    club: 'AC Milan', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 85, shooting: 83, passing: 90, dribbling: 88, defending: 50, physical: 74 },
  },
  {
    id: 'p8', name: 'Roberto Carlos', position: 'LAT', overall: 90, rarity: 'gold',
    club: 'Real Madrid', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 93, shooting: 80, passing: 82, dribbling: 80, defending: 82, physical: 85 },
  },
  {
    id: 'p9', name: 'Cafu', position: 'LAT', overall: 89, rarity: 'gold',
    club: 'Roma', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 90, shooting: 68, passing: 80, dribbling: 75, defending: 86, physical: 87 },
  },
  {
    id: 'p10', name: 'Rivaldo', position: 'ATA', overall: 90, rarity: 'gold',
    club: 'Barcelona', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 82, shooting: 90, passing: 84, dribbling: 90, defending: 38, physical: 73 },
  },
  {
    id: 'p11', name: 'Bebeto', position: 'ATA', overall: 87, rarity: 'gold',
    club: 'Deportivo La Coruña', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 86, shooting: 88, passing: 74, dribbling: 85, defending: 30, physical: 71 },
  },
  {
    id: 'p12', name: 'Thiago Silva', position: 'ZAG', overall: 88, rarity: 'gold',
    club: 'Chelsea FC', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 72, shooting: 52, passing: 80, dribbling: 70, defending: 92, physical: 83 },
  },
  {
    id: 'p13', name: 'Aldair', position: 'ZAG', overall: 85, rarity: 'gold',
    club: 'Roma', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 70, shooting: 45, passing: 70, dribbling: 60, defending: 90, physical: 82 },
  },
  {
    id: 'p14', name: 'Taffarel', position: 'GOL', overall: 86, rarity: 'gold',
    club: 'Galatasaray', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 50, shooting: 20, passing: 55, dribbling: 25, defending: 90, physical: 75 },
  },
  {
    id: 'p15', name: 'Sócrates', position: 'MEI', overall: 88, rarity: 'gold',
    club: 'Corinthians', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 68, shooting: 80, passing: 92, dribbling: 86, defending: 55, physical: 78 },
  },

  // ── BRASIL — SILVER ───────────────────────────────────────────────────────
  {
    id: 'p16', name: 'Casemiro', position: 'MEI', overall: 82, rarity: 'silver',
    club: 'Manchester United', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 70, shooting: 72, passing: 80, dribbling: 74, defending: 90, physical: 88 },
  },
  {
    id: 'p17', name: 'Firmino', position: 'ATA', overall: 81, rarity: 'silver',
    club: 'Al-Qadsiah', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 80, shooting: 78, passing: 82, dribbling: 83, defending: 42, physical: 73 },
  },
  {
    id: 'p18', name: 'Alisson Becker', position: 'GOL', overall: 82, rarity: 'silver',
    club: 'Liverpool FC', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 55, shooting: 22, passing: 78, dribbling: 30, defending: 88, physical: 76 },
  },
  {
    id: 'p19', name: 'Marquinhos', position: 'ZAG', overall: 82, rarity: 'silver',
    club: 'PSG', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 76, shooting: 50, passing: 80, dribbling: 68, defending: 88, physical: 80 },
  },
  {
    id: 'p20', name: 'Vinicius Jr.', position: 'ATA', overall: 82, rarity: 'silver',
    club: 'Real Madrid', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 97, shooting: 80, passing: 75, dribbling: 94, defending: 28, physical: 68 },
  },
  {
    id: 'p21', name: 'Éderson Moraes', position: 'GOL', overall: 80, rarity: 'silver',
    club: 'Manchester City', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 60, shooting: 25, passing: 82, dribbling: 38, defending: 86, physical: 74 },
  },
  {
    id: 'p22', name: 'Gabriel Martinelli', position: 'ATA', overall: 78, rarity: 'silver',
    club: 'Arsenal FC', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 95, shooting: 76, passing: 72, dribbling: 82, defending: 40, physical: 73 },
  },
  {
    id: 'p23', name: 'Lucas Paquetá', position: 'MEI', overall: 79, rarity: 'silver',
    club: 'West Ham', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 78, shooting: 74, passing: 84, dribbling: 86, defending: 50, physical: 70 },
  },
  {
    id: 'p24', name: 'Danilo', position: 'LAT', overall: 75, rarity: 'silver',
    club: 'Juventus', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 78, shooting: 60, passing: 76, dribbling: 70, defending: 82, physical: 80 },
  },
  {
    id: 'p25', name: 'Gabigol', position: 'ATA', overall: 75, rarity: 'silver',
    club: 'Cruzeiro', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 82, shooting: 82, passing: 60, dribbling: 78, defending: 28, physical: 72 },
  },

  // ── BRASIL — BRONZE ───────────────────────────────────────────────────────
  {
    id: 'p26', name: 'Everton Ribeiro', position: 'MEI', overall: 72, rarity: 'bronze',
    club: 'Bahia', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 74, shooting: 68, passing: 78, dribbling: 80, defending: 48, physical: 65 },
  },
  {
    id: 'p27', name: 'Pedro Guilherme', position: 'ATA', overall: 71, rarity: 'bronze',
    club: 'Flamengo', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 72, shooting: 76, passing: 60, dribbling: 68, defending: 28, physical: 78 },
  },
  {
    id: 'p28', name: 'Malcom', position: 'ATA', overall: 78, rarity: 'silver',
    club: 'Zenit', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 90, shooting: 74, passing: 70, dribbling: 86, defending: 30, physical: 68 },
  },
  {
    id: 'p29', name: 'Rodrygo', position: 'ATA', overall: 80, rarity: 'silver',
    club: 'Real Madrid', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 88, shooting: 78, passing: 78, dribbling: 88, defending: 35, physical: 68 },
  },
  {
    id: 'p30', name: 'João Fonseca', position: 'MEI', overall: 65, rarity: 'bronze',
    club: 'Fluminense', nationality: 'Brasil', region: 'brasil',
    stats: { pace: 75, shooting: 64, passing: 70, dribbling: 72, defending: 42, physical: 63 },
  },

  // ── AMÉRICA DO SUL — ELITE ────────────────────────────────────────────────
  {
    id: 'sa1', name: 'Diego Maradona', position: 'MEI', overall: 98, rarity: 'elite',
    club: 'Napoli', nationality: 'Argentina', region: 'sulamerica',
    stats: { pace: 85, shooting: 90, passing: 93, dribbling: 99, defending: 52, physical: 74 },
  },
  {
    id: 'sa2', name: 'Lionel Messi', position: 'ATA', overall: 99, rarity: 'elite',
    club: 'Inter Miami', nationality: 'Argentina', region: 'sulamerica',
    stats: { pace: 87, shooting: 95, passing: 96, dribbling: 99, defending: 38, physical: 65 },
  },

  // ── AMÉRICA DO SUL — GOLD ─────────────────────────────────────────────────
  {
    id: 'sa3', name: 'Lautaro Martínez', position: 'ATA', overall: 88, rarity: 'gold',
    club: 'Inter de Milão', nationality: 'Argentina', region: 'sulamerica',
    stats: { pace: 80, shooting: 88, passing: 75, dribbling: 84, defending: 38, physical: 85 },
  },
  {
    id: 'sa4', name: 'Julián Álvarez', position: 'ATA', overall: 85, rarity: 'gold',
    club: 'Atlético de Madrid', nationality: 'Argentina', region: 'sulamerica',
    stats: { pace: 84, shooting: 84, passing: 76, dribbling: 82, defending: 40, physical: 80 },
  },
  {
    id: 'sa5', name: 'Luis Díaz', position: 'ATA', overall: 84, rarity: 'gold',
    club: 'Liverpool FC', nationality: 'Colômbia', region: 'sulamerica',
    stats: { pace: 94, shooting: 78, passing: 72, dribbling: 88, defending: 38, physical: 74 },
  },
  {
    id: 'sa6', name: 'James Rodríguez', position: 'MEI', overall: 86, rarity: 'gold',
    club: 'Rayo Vallecano', nationality: 'Colômbia', region: 'sulamerica',
    stats: { pace: 76, shooting: 82, passing: 90, dribbling: 86, defending: 45, physical: 68 },
  },

  // ── AMÉRICA DO SUL — SILVER ───────────────────────────────────────────────
  {
    id: 'sa7', name: 'Darwin Núñez', position: 'ATA', overall: 82, rarity: 'silver',
    club: 'Liverpool FC', nationality: 'Uruguai', region: 'sulamerica',
    stats: { pace: 93, shooting: 82, passing: 68, dribbling: 78, defending: 32, physical: 82 },
  },
  {
    id: 'sa8', name: 'Arrascaeta', position: 'MEI', overall: 78, rarity: 'silver',
    club: 'Flamengo', nationality: 'Uruguai', region: 'sulamerica',
    stats: { pace: 80, shooting: 75, passing: 82, dribbling: 88, defending: 44, physical: 68 },
  },
  {
    id: 'sa9', name: 'Alexis Sánchez', position: 'ATA', overall: 80, rarity: 'silver',
    club: 'Udinese', nationality: 'Chile', region: 'sulamerica',
    stats: { pace: 85, shooting: 80, passing: 74, dribbling: 84, defending: 42, physical: 74 },
  },
  {
    id: 'sa10', name: 'Emiliano Martínez', position: 'GOL', overall: 84, rarity: 'gold',
    club: 'Aston Villa', nationality: 'Argentina', region: 'sulamerica',
    stats: { pace: 52, shooting: 20, passing: 72, dribbling: 28, defending: 90, physical: 80 },
  },

  // ── ÁFRICA — ELITE ────────────────────────────────────────────────────────
  {
    id: 'af1', name: 'Mohamed Salah', position: 'ATA', overall: 92, rarity: 'elite',
    club: 'Liverpool FC', nationality: 'Egito', region: 'africa',
    stats: { pace: 95, shooting: 90, passing: 82, dribbling: 90, defending: 42, physical: 74 },
  },
  {
    id: 'af2', name: 'Samuel Eto\'o', position: 'ATA', overall: 91, rarity: 'elite',
    club: 'Barcelona', nationality: 'Camarões', region: 'africa',
    stats: { pace: 92, shooting: 90, passing: 72, dribbling: 86, defending: 35, physical: 84 },
  },

  // ── ÁFRICA — GOLD ─────────────────────────────────────────────────────────
  {
    id: 'af3', name: 'Victor Osimhen', position: 'ATA', overall: 87, rarity: 'gold',
    club: 'Galatasaray', nationality: 'Nigéria', region: 'africa',
    stats: { pace: 90, shooting: 86, passing: 68, dribbling: 80, defending: 32, physical: 88 },
  },
  {
    id: 'af4', name: 'Achraf Hakimi', position: 'LAT', overall: 86, rarity: 'gold',
    club: 'PSG', nationality: 'Marrocos', region: 'africa',
    stats: { pace: 95, shooting: 72, passing: 78, dribbling: 84, defending: 80, physical: 78 },
  },
  {
    id: 'af5', name: 'Didier Drogba', position: 'ATA', overall: 89, rarity: 'gold',
    club: 'Chelsea FC', nationality: 'Costa do Marfim', region: 'africa',
    stats: { pace: 80, shooting: 90, passing: 65, dribbling: 76, defending: 35, physical: 95 },
  },
  {
    id: 'af6', name: 'Sadio Mané', position: 'ATA', overall: 87, rarity: 'gold',
    club: 'Al-Nassr', nationality: 'Senegal', region: 'africa',
    stats: { pace: 93, shooting: 84, passing: 75, dribbling: 88, defending: 44, physical: 78 },
  },

  // ── ÁFRICA — SILVER ───────────────────────────────────────────────────────
  {
    id: 'af7', name: 'Riyad Mahrez', position: 'ATA', overall: 82, rarity: 'silver',
    club: 'Al-Ahli', nationality: 'Argélia', region: 'africa',
    stats: { pace: 82, shooting: 80, passing: 78, dribbling: 90, defending: 35, physical: 62 },
  },
  {
    id: 'af8', name: 'Hakim Ziyech', position: 'MEI', overall: 78, rarity: 'silver',
    club: 'Galatasaray', nationality: 'Marrocos', region: 'africa',
    stats: { pace: 78, shooting: 78, passing: 82, dribbling: 84, defending: 40, physical: 64 },
  },

  // ── ÁSIA — GOLD ───────────────────────────────────────────────────────────
  {
    id: 'as1', name: 'Son Heung-min', position: 'ATA', overall: 87, rarity: 'gold',
    club: 'Tottenham', nationality: 'Coreia do Sul', region: 'asia',
    stats: { pace: 92, shooting: 84, passing: 78, dribbling: 86, defending: 40, physical: 72 },
  },
  {
    id: 'as2', name: 'Hidetoshi Nakata', position: 'MEI', overall: 84, rarity: 'gold',
    club: 'Roma', nationality: 'Japão', region: 'asia',
    stats: { pace: 80, shooting: 76, passing: 86, dribbling: 82, defending: 54, physical: 74 },
  },

  // ── ÁSIA — SILVER ─────────────────────────────────────────────────────────
  {
    id: 'as3', name: 'Takefusa Kubo', position: 'ATA', overall: 80, rarity: 'silver',
    club: 'Real Sociedad', nationality: 'Japão', region: 'asia',
    stats: { pace: 84, shooting: 76, passing: 78, dribbling: 90, defending: 38, physical: 64 },
  },
  {
    id: 'as4', name: 'Lee Kang-in', position: 'MEI', overall: 79, rarity: 'silver',
    club: 'PSG', nationality: 'Coreia do Sul', region: 'asia',
    stats: { pace: 78, shooting: 76, passing: 80, dribbling: 86, defending: 42, physical: 68 },
  },
  {
    id: 'as5', name: 'Minamino Takumi', position: 'MEI', overall: 76, rarity: 'silver',
    club: 'Monaco', nationality: 'Japão', region: 'asia',
    stats: { pace: 82, shooting: 72, passing: 76, dribbling: 78, defending: 48, physical: 70 },
  },
  {
    id: 'as6', name: 'Salem Al-Dawsari', position: 'ATA', overall: 75, rarity: 'silver',
    club: 'Al-Hilal', nationality: 'Arábia Saudita', region: 'asia',
    stats: { pace: 86, shooting: 72, passing: 70, dribbling: 80, defending: 35, physical: 68 },
  },

  // ── EUROPA — ELITE ────────────────────────────────────────────────────────
  {
    id: 'eu1', name: 'Cristiano Ronaldo', position: 'ATA', overall: 97, rarity: 'elite',
    club: 'Al-Nassr', nationality: 'Portugal', region: 'europa',
    stats: { pace: 88, shooting: 97, passing: 82, dribbling: 90, defending: 35, physical: 92 },
  },
  {
    id: 'eu2', name: 'Zinedine Zidane', position: 'MEI', overall: 96, rarity: 'elite',
    club: 'Real Madrid', nationality: 'França', region: 'europa',
    stats: { pace: 76, shooting: 82, passing: 96, dribbling: 96, defending: 65, physical: 76 },
  },
  {
    id: 'eu3', name: 'Ronaldo (R9 europeu)', position: 'ATA', overall: 97, rarity: 'elite',
    club: 'Real Madrid', nationality: 'Portugal', region: 'europa',
    stats: { pace: 94, shooting: 96, passing: 82, dribbling: 94, defending: 34, physical: 85 },
  },

  // ── EUROPA — GOLD ─────────────────────────────────────────────────────────
  {
    id: 'eu4', name: 'Kylian Mbappé', position: 'ATA', overall: 92, rarity: 'elite',
    club: 'Real Madrid', nationality: 'França', region: 'europa',
    stats: { pace: 99, shooting: 90, passing: 82, dribbling: 92, defending: 38, physical: 80 },
  },
  {
    id: 'eu5', name: 'Erling Haaland', position: 'ATA', overall: 92, rarity: 'elite',
    club: 'Manchester City', nationality: 'Noruega', region: 'europa',
    stats: { pace: 88, shooting: 96, passing: 68, dribbling: 80, defending: 40, physical: 92 },
  },
  {
    id: 'eu6', name: 'Kevin De Bruyne', position: 'MEI', overall: 91, rarity: 'gold',
    club: 'Manchester City', nationality: 'Bélgica', region: 'europa',
    stats: { pace: 76, shooting: 84, passing: 96, dribbling: 86, defending: 58, physical: 78 },
  },
  {
    id: 'eu7', name: 'Luka Modric', position: 'MEI', overall: 90, rarity: 'gold',
    club: 'Real Madrid', nationality: 'Croácia', region: 'europa',
    stats: { pace: 76, shooting: 78, passing: 92, dribbling: 90, defending: 70, physical: 68 },
  },
  {
    id: 'eu8', name: 'Robert Lewandowski', position: 'ATA', overall: 90, rarity: 'gold',
    club: 'Barcelona', nationality: 'Polônia', region: 'europa',
    stats: { pace: 78, shooting: 94, passing: 78, dribbling: 80, defending: 40, physical: 86 },
  },
  {
    id: 'eu9', name: 'Jude Bellingham', position: 'MEI', overall: 88, rarity: 'gold',
    club: 'Real Madrid', nationality: 'Inglaterra', region: 'europa',
    stats: { pace: 82, shooting: 82, passing: 84, dribbling: 86, defending: 74, physical: 86 },
  },
  {
    id: 'eu10', name: 'Pedri', position: 'MEI', overall: 86, rarity: 'gold',
    club: 'Barcelona', nationality: 'Espanha', region: 'europa',
    stats: { pace: 74, shooting: 72, passing: 88, dribbling: 90, defending: 68, physical: 66 },
  },
  {
    id: 'eu11', name: 'Lamine Yamal', position: 'ATA', overall: 85, rarity: 'gold',
    club: 'Barcelona', nationality: 'Espanha', region: 'europa',
    stats: { pace: 90, shooting: 78, passing: 80, dribbling: 92, defending: 32, physical: 62 },
  },

  // ── EUROPA — SILVER ───────────────────────────────────────────────────────
  {
    id: 'eu12', name: 'Virgil van Dijk', position: 'ZAG', overall: 88, rarity: 'gold',
    club: 'Liverpool FC', nationality: 'Holanda', region: 'europa',
    stats: { pace: 80, shooting: 60, passing: 78, dribbling: 65, defending: 94, physical: 92 },
  },
  {
    id: 'eu13', name: 'Gianluigi Buffon', position: 'GOL', overall: 90, rarity: 'gold',
    club: 'Juventus', nationality: 'Itália', region: 'europa',
    stats: { pace: 48, shooting: 18, passing: 60, dribbling: 22, defending: 94, physical: 80 },
  },
  {
    id: 'eu14', name: 'Phil Foden', position: 'MEI', overall: 86, rarity: 'gold',
    club: 'Manchester City', nationality: 'Inglaterra', region: 'europa',
    stats: { pace: 82, shooting: 80, passing: 84, dribbling: 88, defending: 52, physical: 70 },
  },
  {
    id: 'eu15', name: 'Trent Alexander-Arnold', position: 'LAT', overall: 84, rarity: 'gold',
    club: 'Real Madrid', nationality: 'Inglaterra', region: 'europa',
    stats: { pace: 82, shooting: 72, passing: 90, dribbling: 78, defending: 78, physical: 72 },
  },

  // ── MUNDIAL — ELITE (melhores da história) ────────────────────────────────
  {
    id: 'wl1', name: 'Johan Cruyff', position: 'ATA', overall: 97, rarity: 'elite',
    club: 'Ajax', nationality: 'Holanda', region: 'mundial',
    stats: { pace: 90, shooting: 90, passing: 94, dribbling: 97, defending: 60, physical: 74 },
  },
  {
    id: 'wl2', name: 'Ronaldo (GOAT Card)', position: 'ATA', overall: 99, rarity: 'elite',
    club: 'Selecao', nationality: 'Brasil', region: 'mundial',
    stats: { pace: 99, shooting: 99, passing: 88, dribbling: 99, defending: 42, physical: 92 },
  },
  {
    id: 'wl3', name: 'Messi (GOAT Card)', position: 'ATA', overall: 99, rarity: 'elite',
    club: 'Selecao', nationality: 'Argentina', region: 'mundial',
    stats: { pace: 90, shooting: 98, passing: 98, dribbling: 99, defending: 42, physical: 68 },
  },
  {
    id: 'wl4', name: 'Pelé (GOAT Card)', position: 'ATA', overall: 99, rarity: 'elite',
    club: 'Selecao', nationality: 'Brasil', region: 'mundial',
    stats: { pace: 95, shooting: 99, passing: 92, dribbling: 99, defending: 50, physical: 85 },
  },
]
