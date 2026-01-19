import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Color'
import { useState } from 'react'
import Spacer from '../../components/Spacer'
import ThemedView from '../../components/ThemeView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
import useUser from '../../hooks/useUser'

const Register = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState<string | null>(null)

  const { register } = useUser()
  
  const handleSubmit = async() => {
    setError(null)
    try {
      await register(email, password)
      setEmail('')
      setPassword('')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error'
      setError(message)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe>
        <Spacer />

        <ThemedText title={true} style={[styles.title, {marginBottom: 20}]}>
          Register a new account
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
            Register
          </Text>
        </ThemedButton>

        <Spacer />

        {error && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        <Spacer height={100}/>

        <Link href="/login">
          <ThemedText style={{textAlign: 'center', textDecorationLine: 'underline'}}>
            Already have an account? Login
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback> 
  )
}

export default Register

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
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
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