import { StyleSheet, useColorScheme } from 'react-native'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Color'
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/useContexts'
import { BooksProvider } from '../contexts/bookContexts'

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  return (
    <UserProvider>
      <BooksProvider>
        {/* <StatusBar style='auto' translucent={false}/> */}
        <Stack screenOptions={{
          headerStyle: { 
            backgroundColor: theme.navBackground,             
          },
          headerTintColor: theme.title,
        }}>
          <Stack.Screen name='index' options={{title: 'Home'}} />
          <Stack.Screen name='(auth)' options={{headerShown: false}} />
          <Stack.Screen name='(dashboard)' options={{headerShown: false}} />
        </Stack>
      </BooksProvider>
    </UserProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})