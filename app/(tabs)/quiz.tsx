import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { QuizQuestion } from '../../components/quiz/QuizQuestion'
import { QuizResult } from '../../components/quiz/QuizResult'
import { useQuizStore } from '../../store/useQuizStore'
import { useUserStore } from '../../store/useUserStore'
import { useMissionsStore } from '../../store/useMissionsStore'
import { selectQuestions } from '../../lib/quiz'

export default function QuizScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>()
  const isChallenge = mode === 'challenge'

  const { questions, currentIndex, isFinished, answers, startQuiz, submitAnswer, reset, coinsEarned, xpEarned } = useQuizStore()
  const { addCoins, addXP, markChallengeCompleted } = useUserStore()
  const { updateProgress } = useMissionsStore()

  useEffect(() => {
    startQuiz(selectQuestions(isChallenge ? 10 : 5))
  }, [])

  useEffect(() => {
    if (!isFinished) return

    const multiplier = isChallenge ? 2 : 1
    addCoins(coinsEarned * multiplier)
    addXP(xpEarned * multiplier)

    if (isChallenge) markChallengeCompleted()

    // Track missions
    updateProgress('quiz_complete')

    const correctCount = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0)
    updateProgress('correct_answers', correctCount)

    if (correctCount === questions.length) {
      updateProgress('perfect_quiz')
    }
  }, [isFinished])

  const handlePlayAgain = () => {
    reset()
    startQuiz(selectQuestions(5))
  }

  if (!questions.length) return null

  if (isFinished) {
    return (
      <SafeAreaView style={styles.safe}>
        <QuizResult
          onPlayAgain={handlePlayAgain}
          onHome={() => router.push('/(tabs)/')}
          multiplier={isChallenge ? 2 : 1}
        />
      </SafeAreaView>
    )
  }

  const current = questions[currentIndex]
  if (!current) return null

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <QuizQuestion
          key={currentIndex}
          question={current}
          questionNumber={currentIndex + 1}
          total={questions.length}
          onAnswer={submitAnswer}
          isChallenge={isChallenge}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#050f0a' },
  container: { flex: 1 },
})
