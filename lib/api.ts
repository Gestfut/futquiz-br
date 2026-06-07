import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'https://futquiz-br-production.up.railway.app'

async function getToken() {
  return AsyncStorage.getItem('auth_token')
}

async function request(path: string, options: RequestInit = {}) {
  const token = await getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erro na requisição')
  return data
}

export const api = {
  register: (email: string, username: string, password: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    }),

  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getState: () => request('/game/state'),

  saveState: (payload: Record<string, unknown>) =>
    request('/game/state', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  getRanking: () => request('/game/ranking'),
}
