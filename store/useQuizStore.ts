import { create } from 'zustand'
import { Question } from '../data/questions'

interface QuizState {
  questions: Question[]
  currentIndex: number
  answers: (number | null)[]
  isFinished: boolean
  coinsEarned: number
  xpEarned: number

  startQuiz: (questions: Question[]) => void
  submitAnswer: (index: number) => void
  finishQuiz: () => void
  reset: () => void
}

const COIN_PER_CORRECT = 20
const XP_PER_CORRECT = 10
const BONUS_PERFECT_COINS = 100
const BONUS_PERFECT_XP = 50

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: [],
  isFinished: false,
  coinsEarned: 0,
  xpEarned: 0,

  startQuiz: (questions) => set({
    questions,
    currentIndex: 0,
    answers: new Array(questions.length).fill(null),
    isFinished: false,
    coinsEarned: 0,
    xpEarned: 0,
  }),

  submitAnswer: (index) => {
    const { answers, currentIndex, questions } = get()
    const newAnswers = [...answers]
    newAnswers[currentIndex] = index

    const isLast = currentIndex >= questions.length - 1
    set({ answers: newAnswers, currentIndex: currentIndex + 1 })

    if (isLast) get().finishQuiz()
  },

  finishQuiz: () => {
    const { questions, answers } = get()
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++
    })

    const isPerfect = correct === questions.length
    const coinsEarned = correct * COIN_PER_CORRECT + (isPerfect ? BONUS_PERFECT_COINS : 0)
    const xpEarned = correct * XP_PER_CORRECT + (isPerfect ? BONUS_PERFECT_XP : 0)

    set({ isFinished: true, coinsEarned, xpEarned })
  },

  reset: () => set({
    questions: [],
    currentIndex: 0,
    answers: [],
    isFinished: false,
    coinsEarned: 0,
    xpEarned: 0,
  }),
}))
