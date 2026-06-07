import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useQuizStore } from '../../store/useQuizStore'

interface Props {
  onPlayAgain: () => void
  onHome: () => void
  multiplier?: number
}

export function QuizResult({ onPlayAgain, onHome, multiplier = 1 }: Props) {
  const { questions, answers, coinsEarned, xpEarned } = useQuizStore()
  const correct = answers.filter((a, i) => a === questions[i]?.correctIndex).length

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>{correct === questions.length ? '🏆' : correct >= Math.ceil(questions.length * 0.6) ? '⚽' : '😓'}</Text>
      <Text style={styles.title}>{correct === questions.length ? 'Perfeito!' : `${correct}/${questions.length} corretas`}</Text>

      <View style={styles.rewardBox}>
        {multiplier > 1 && (
          <View style={styles.multiplierBadge}>
            <Text style={styles.multiplierText}>⚡ Bônus Desafio Diário {multiplier}×</Text>
          </View>
        )}
        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>🪙 Moedas ganhas</Text>
          <Text style={styles.rewardValue}>+{coinsEarned * multiplier}</Text>
        </View>
        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>⚡ XP ganho</Text>
          <Text style={styles.rewardValue}>+{xpEarned * multiplier}</Text>
        </View>
      </View>

      <View style={styles.answersBox}>
        <Text style={styles.sectionTitle}>Resumo das respostas</Text>
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correctIndex
          return (
            <View key={q.id} style={[styles.answerRow, isCorrect ? styles.answerCorrect : styles.answerWrong]}>
              <Text style={styles.answerIcon}>{isCorrect ? '✅' : '❌'}</Text>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.answerText} numberOfLines={2}>{q.text}</Text>
                {!isCorrect && (
                  <Text style={styles.correctAnswerText}>
                    Correto: {q.options[q.correctIndex]}
                  </Text>
                )}
              </View>
            </View>
          )
        })}
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={onPlayAgain}>
        <Text style={styles.primaryBtnText}>Jogar Novamente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={onHome}>
        <Text style={styles.secondaryBtnText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center', gap: 20, paddingBottom: 40 },
  emoji: { fontSize: 64, marginTop: 20 },
  title: { color: '#FFD700', fontSize: 28, fontWeight: '900' },
  rewardBox: {
    backgroundColor: '#0d2318',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  multiplierBadge: {
    backgroundColor: '#2a1f05',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  multiplierText: { color: '#FFD700', fontWeight: '800', fontSize: 13 },
  rewardRow: { flexDirection: 'row', justifyContent: 'space-between' },
  rewardLabel: { color: '#aaa', fontSize: 15 },
  rewardValue: { color: '#FFD700', fontWeight: '800', fontSize: 18 },
  sectionTitle: { color: '#FFD700', fontWeight: '700', fontSize: 14, alignSelf: 'flex-start', marginBottom: 4 },
  answersBox: { width: '100%', gap: 8 },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#0d2318',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1e4a32',
  },
  answerCorrect: { borderColor: '#1e4a32' },
  answerWrong: { borderColor: '#3a1010', backgroundColor: '#150808' },
  answerIcon: { fontSize: 16, marginTop: 1 },
  answerText: { color: '#ccc', fontSize: 13, flex: 1 },
  correctAnswerText: { color: '#4ade80', fontSize: 12, fontWeight: '600' },
  primaryBtn: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  primaryBtnText: { color: '#000', fontWeight: '800', fontSize: 16 },
  secondaryBtn: { paddingVertical: 10 },
  secondaryBtnText: { color: '#aaa', fontSize: 14 },
})
