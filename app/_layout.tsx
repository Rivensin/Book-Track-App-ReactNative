import { StyleSheet, useColorScheme, Pressable, Text, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Colors } from '../constants/Color'
import { UserProvider } from '../contexts/useContexts'
import { BooksProvider } from '../contexts/bookContexts'
import HeaderCustom from '../components/HeaderCustom'
import UseUser from '../hooks/useUser'

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light']
  const router = useRouter()

  return (
    <UserProvider>
      <BooksProvider>
        {/* <StatusBar style='auto' translucent={false}/> */}
        <Stack
          screenOptions={{
            headerStyle: { 
              backgroundColor: theme.navBackground,             
            },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen 
            name='index' 
            options={{
              headerTitle: '',
              header: () => <HeaderCustom />,              
            }}
             
          />
          <Stack.Screen name='(auth)' options={{headerShown: false}} />
          <Stack.Screen name='(dashboard)' options={{headerShown: false}} />
        </Stack>
      </BooksProvider>
    </UserProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginRight: 4,
  },
  iconButton: {
    position: 'relative',
    padding: 2,
  },
  logo: {
    width: 100,
    height: 32,
    marginLeft: 4,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000', // Titik merah notifikasi
    borderWidth: 1.5,
    borderColor: '#0082FB', // Menyesuaikan warna header
  },
})