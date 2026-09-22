import { StyleSheet, useColorScheme, Pressable, Text, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Colors } from '../constants/Color'
import { UserProvider } from '../contexts/useContexts'
import { BooksProvider } from '../contexts/bookContexts'
import { Ionicons } from '@expo/vector-icons'

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']
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
              headerLeft: () => (
                <Pressable 
                  onPress={() => router.push('/')}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingLeft: 8 })}
                >
                  <Text style={{ color: theme.title, fontSize: 18 }}>Book Track App</Text>
                </Pressable>
              ),
              headerRight: () => (
                <View style={styles.actionContainer}>
                  <Pressable 
                    onPress={() => router.push('/')}
                    style={styles.iconButton}
                  >
                    <Ionicons name="mail-outline" size={24} color={theme.title} />
                    <View style={styles.badge} />
                  </Pressable>

                  <Pressable 
                    onPress={() => router.push('/')}
                    style={styles.iconButton}
                  >
                    <Ionicons name="settings-outline" size={24} color={theme.title} />
                  </Pressable>

                  <Pressable 
                    onPress={() => console.log('Logout clicked')}
                    style={styles.iconButton}
                  >
                    <Ionicons name="log-out-outline" size={24} color={theme.title} />
                  </Pressable>
                </View>
                
              ),
              
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