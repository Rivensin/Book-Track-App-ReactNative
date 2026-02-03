import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import GuestOnly from '../../components/auth/GuestOnly'

const AuthLayout = () => {  
  return (
    <GuestOnly>
      {/* <StatusBar style='auto'/> */}
      <Stack screenOptions={{
        animation: 'none',
      }}>

        <Stack.Screen name='login' options={{title:'Login'}}></Stack.Screen>
        <Stack.Screen name='register' options={{title:'Register'}}></Stack.Screen> 
      </Stack>
    </GuestOnly>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})