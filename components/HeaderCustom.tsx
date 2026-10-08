import { StyleSheet, View, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../constants/Color'
import UseUser from '../hooks/useUser'
import logo from '../assets/img/logo.png'
import { useRouter } from 'expo-router'

const HeaderCustom = () => {
  const insets = useSafeAreaInsets()
  
  const { user, themeMode, toggleTheme, logout } = UseUser()
  const theme = Colors[themeMode]

  const router = useRouter()

  return (
    <View style={[styles.headerContainer, {backgroundColor: theme.background, paddingTop: insets.top + 10}]}>
      <View style={styles.topRow}>
        <Pressable onPress={() => router.push('/')}>
          <Image 
            source={logo}
            style={{ 
              width: 75, 
              height: 75,
              tintColor: themeMode === 'dark' ? '#fff' : '#000',}}          
          />
        </Pressable>
        
        <View style={styles.actionContainer}>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} onPress={toggleTheme}>
            <Ionicons name={themeMode === 'dark' ? "moon" : "sunny-outline"} size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />
          </Pressable>
          <Pressable onPress={() => router.push('/mail')} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <Ionicons name="mail-outline" size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />
            <View style={styles.badge} />
          </Pressable>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <Ionicons name="settings-outline" size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />
          </Pressable>
          <Pressable onPress={logout} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <Ionicons name="log-out-outline" size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />            
          </Pressable>
        </View>
      </View>            
    </View>
  )
}

export default HeaderCustom

const styles = StyleSheet.create({
  headerContainer: {    
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 26,
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 75,
  },    
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
  },  
})