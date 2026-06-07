import { QUESTIONS, Question } from '../data/questions'

const STORAGE_KEY = '__quiz_used_ids__'

let usedIds: Set<string> = new Set()
let initialized = false

function loadUsed() {
  if (initialized) return
  initialized = true
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (raw) usedIds = new Set(JSON.parse(raw))
  } catch {}
}

function saveUsed() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...usedIds]))
    }
  } catch {}
}

export function selectQuestions(count = 5): Question[] {
  loadUsed()

  let available = QUESTIONS.filter((q) => !usedIds.has(q.id))

  // Pool esgotado — reseta
  if (available.length < count) {
    usedIds.clear()
    available = [...QUESTIONS]
  }

  const shuffled = [...available].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)

  selected.forEach((q) => usedIds.add(q.id))
  saveUsed()

  return selected
}
