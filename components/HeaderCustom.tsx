import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../constants/Color'
import UseUser from '../hooks/useUser'
import ThemedLogo from './ThemeLogo'
import logo from '../assets/img/logo.png'

const HeaderCustom = () => {
  const insets = useSafeAreaInsets()
  
  const { user, themeMode, toggleTheme } = UseUser()
  const theme = Colors[themeMode]

  return (
    <View style={[styles.headerContainer, {backgroundColor: theme.background, paddingTop: insets.top + 10}]}>
      <View style={styles.topRow}>
        <Image 
          source={logo}
          style={{ 
            width: 75, 
            height: 75,
            tintColor: themeMode === 'dark' ? '#fff' : '#000',}}          
        />
        
        <View style={styles.actionContainer}>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} onPress={toggleTheme}>
            <Ionicons name={themeMode === 'dark' ? "moon" : "sunny-outline"} size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />
          </Pressable>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <Ionicons name="mail-outline" size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />
            <View style={styles.badge} />
          </Pressable>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <Ionicons name="settings-outline" size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />
          </Pressable>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <Ionicons name="log-out-outline" size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />            
          </Pressable>
        </View>
      </View>
      
      <View style={styles.bottomRow}>
        <View style={styles.profileSection}>   
          <Image
            source={require('../assets/img/profile-icon-idle.png')}
            style={styles.avatar}
            resizeMode='contain' />

          <View>
            <Text style={[styles.greetingText, {color: theme.text}]}>Hi, {user?.email}</Text>
            
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Image
                source={require('../assets/img/bronze-medal.png')}
                style={styles.smallLogo}
                resizeMode='contain' 
              /> 

              <Text style={[styles.subText, {color: theme.textTertiary}]}>Basic Membership</Text>               
            </View>              
          </View>
        </View>

        <View style={[styles.pointBadge, {backgroundColor: themeMode === 'dark' ? '#fff' : '#FFFF2E'}]}>
          <Text style={styles.pointText}>8305</Text>
        </View>
      </View>
    </View>
  )
}

export default HeaderCustom

const styles = StyleSheet.create({
  headerContainer: {    
    paddingHorizontal: 16,
    paddingBottom: 20,
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  logo: {
    width: 75,
    height: 75,
  },
  smallLogo: {
    width: 15,
    height: 15,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#475569',
  },
  greetingText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
  },
  pointBadge: {    
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 13,
  },
})