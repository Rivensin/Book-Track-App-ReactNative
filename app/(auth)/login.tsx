import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Colors } from '../../constants/Color'
import Spacer from '../../components/Spacer'
import UseUser from '../../hooks/useUser'
import ThemedView from '../../components/ThemeView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedLoader from '../../components/ThemedLoader'

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState<string | null>(null)

  const { login } = UseUser()

  const handleSubmit = async() => {
    setError(null)
    try {
      await login(email, password)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error'
      setError(message)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <ThemedView style={styles.container} safe>
        <Spacer />

        <ThemedText title={true} style={[styles.title, {marginBottom: 20}]}>
          Login to your account
        </ThemedText>

        <ThemedTextInput 
          placeholder='Email'
          placeholderTextColor= '#a9a9a9'
          keyboardType= 'email-address'
          style={{width: '80%', marginBottom: 20}}
          onChangeText= {setEmail}
          value={email} 
        />

        <ThemedTextInput 
          placeholder='Password'
          placeholderTextColor= '#a9a9a9'
          style={{width: '80%', marginBottom: 20}}
          onChangeText= {setPassword}
          value={password} 
          secureTextEntry
        />

        <ThemedButton onPress={handleSubmit}>
          <Text style={{color: '#f2f2f2'}}>
            Login
          </Text>
        </ThemedButton>

        {error && (
          <>
            <Spacer />
            <Text style={styles.error}>
              {error}
            </Text>
          </>
        )}

        <Spacer />

        <Link href="/register">
          <ThemedText style={{textAlign: 'center', textDecorationLine: 'underline'}}>
            Don't have an account? Register
          </ThemedText>
        </Link>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})