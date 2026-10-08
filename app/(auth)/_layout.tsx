import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import GuestOnly from '../../components/auth/GuestOnly'
import { Colors } from '../../constants/Color'
import UseUser from '../../hooks/useUser'

const AuthLayout = () => {  
  const { themeMode } = UseUser()
  const theme = Colors[themeMode]

  return (
    <GuestOnly>
      {/* <StatusBar style='auto'/> */}
      <Stack screenOptions={{
        animation: 'none',      
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,        
        contentStyle: {
          backgroundColor: theme.background,
        },        
      }}>

        <Stack.Screen name='login' options={{title:'Login'}}></Stack.Screen>
        <Stack.Screen name='register' options={{title:'Register'}}></Stack.Screen> 
      </Stack>
    </GuestOnly>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})