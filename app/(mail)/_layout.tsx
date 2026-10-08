import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import UserOnly from '../../components/auth/UserOnly'
import { Colors } from '../../constants/Color'
import UseUser from '../../hooks/useUser'
import { StatusBar } from 'expo-status-bar'
import HeaderCustom from '../../components/HeaderCustom'

const AuthLayout = () => {  
  const { themeMode } = UseUser()
  const theme = Colors[themeMode]

  return (
    <UserOnly>
      <StatusBar style='auto'/>
      <Stack screenOptions={{
        headerShown:true,                   
      }}>

        <Stack.Screen 
            name='mail' 
            options={{
              headerTitle: '',
              header: () => <HeaderCustom />,              
            }}             
          />        
      </Stack>
    </UserOnly>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})