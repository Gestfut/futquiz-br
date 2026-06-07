import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert,
} from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../lib/api'

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!email || !password || (mode === 'register' && !username)) {
      Alert.alert('Preencha todos os campos')
      return
    }
    setLoading(true)
    try {
      if (mode === 'register') {
        await api.register(email, username, password)
        Alert.alert('Conta criada!', 'Agora faça login com seu email e senha.', [
          { text: 'OK', onPress: () => { setMode('login'); setPassword('') } }
        ])
        return
      }

      const data = await api.login(email, password)
      await AsyncStorage.setItem('auth_token', data.token)
      await AsyncStorage.setItem('auth_user', JSON.stringify(data.user))
      router.replace('/(tabs)/')
    } catch (e: any) {
      Alert.alert('Erro', e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.logo}>⚽ FutQuiz BR</Text>
        <Text style={styles.subtitle}>Quiz de futebol + coleção de cartas</Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, mode === 'login' && styles.tabActive]}
            onPress={() => setMode('login')}
          >
            <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, mode === 'register' && styles.tabActive]}
            onPress={() => setMode('register')}
          >
            <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {mode === 'register' && (
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              placeholderTextColor="#4a5568"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#4a5568"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#4a5568"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#000" />
              : <Text style={styles.buttonText}>{mode === 'login' ? 'Entrar' : 'Criar conta'}</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050f0a' },
  inner: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: { fontSize: 36, fontWeight: 'bold', color: '#22c55e', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#6b7280', textAlign: 'center', marginBottom: 40, fontSize: 14 },
  tabs: { flexDirection: 'row', marginBottom: 24, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#1a2e1a' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', backgroundColor: '#0a1f0a' },
  tabActive: { backgroundColor: '#22c55e' },
  tabText: { color: '#6b7280', fontWeight: '600' },
  tabTextActive: { color: '#000' },
  form: { gap: 12 },
  input: {
    backgroundColor: '#0d1f0d',
    borderWidth: 1,
    borderColor: '#1a3a1a',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
})
