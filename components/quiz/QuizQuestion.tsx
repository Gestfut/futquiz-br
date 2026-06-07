import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Question } from '../../data/questions'
import { QuizTimer } from './QuizTimer'

interface Props {
  question: Question
  questionNumber: number
  total: number
  onAnswer: (index: number) => void
  isChallenge?: boolean
}

const LABELS = ['A', 'B', 'C', 'D']

export function QuizQuestion({ question, questionNumber, total, onAnswer, isChallenge }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [expired, setExpired] = useState(false)

  const answered = selected !== null || expired

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setTimeout(() => onAnswer(index), 2000)
  }

  const handleExpire = () => {
    if (answered) return
    setExpired(true)
    setTimeout(() => onAnswer(-1), 2000)
  }

  const getOptionStyle = (index: number) => {
    if (!answered) return styles.option
    if (index === question.correctIndex) return [styles.option, styles.correct]
    if (index === selected && selected !== question.correctIndex) return [styles.option, styles.wrong]
    return [styles.option, styles.dimmed]
  }

  const isCorrect = selected === question.correctIndex

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isChallenge && (
        <View style={styles.challengeBanner}>
          <Text style={styles.challengeText}>⚡ DESAFIO DIÁRIO • 2× Recompensa</Text>
        </View>
      )}
      <Text style={styles.counter}>{questionNumber}/{total}</Text>
      <QuizTimer duration={30} onExpire={handleExpire} running={!answered} />

      <View style={styles.questionBox}>
        <Text style={styles.category}>{question.category.toUpperCase()}</Text>
        <Text style={styles.question}>{question.text}</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((opt, i) => (
          <TouchableOpacity key={i} style={getOptionStyle(i)} onPress={() => handleSelect(i)} activeOpacity={0.8}>
            <View style={styles.labelBadge}>
              <Text style={styles.labelText}>{LABELS[i]}</Text>
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {answered && (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackEmoji}>
            {expired ? '⏰' : isCorrect ? '✅' : '❌'}
          </Text>
          <Text style={styles.feedbackTitle}>
            {expired ? 'Tempo esgotado!' : isCorrect ? 'Correto!' : 'Errado!'}
          </Text>
          <Text style={styles.explanation}>{question.explanation}</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16, paddingBottom: 30 },
  counter: { color: '#aaa', textAlign: 'right', fontSize: 13 },
  questionBox: {
    backgroundColor: '#0d2318',
    borderRadius: 16,
    padding: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1e4a32',
  },
  category: { color: '#FFD700', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  question: { color: '#fff', fontSize: 18, fontWeight: '600', lineHeight: 26 },
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d2318',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e4a32',
    padding: 14,
    gap: 12,
  },
  correct: { borderColor: '#4ade80', backgroundColor: '#052e16' },
  wrong: { borderColor: '#ef4444', backgroundColor: '#1a0505' },
  dimmed: { opacity: 0.35 },
  labelBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1e4a32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: { color: '#FFD700', fontWeight: '800', fontSize: 13 },
  optionText: { color: '#fff', fontSize: 15, flex: 1 },
  feedbackBox: {
    backgroundColor: '#0d2318',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2d5a3d',
    gap: 6,
    alignItems: 'center',
  },
  feedbackEmoji: { fontSize: 28 },
  feedbackTitle: { color: '#FFD700', fontWeight: '800', fontSize: 16 },
  explanation: { color: '#ccc', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  challengeBanner: {
    backgroundColor: '#1a2e10',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  challengeText: { color: '#FFD700', fontWeight: '800', fontSize: 12, letterSpacing: 1 },
})
