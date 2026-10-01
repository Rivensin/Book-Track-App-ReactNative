import { StyleSheet, Text, ImageBackground, useColorScheme } from 'react-native'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import Spacer from '../../components/Spacer'
import useUser from '../../hooks/useUser'
import ThemedButton from '../../components/ThemedButton'
import ImageBg from '../../assets/img/Book lover-pana.png'
import ImageBgDark from '../../assets/img/Book lover-pana-dark.png'
import { Colors } from '../../constants/Color'

const Profile = () => {
  const { logout, user, themeMode } = useUser();  
  const theme = Colors[themeMode]

  return (
    <ThemeView style={styles.container} safe={true}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: themeMode === 'light' ? 0.4 : 0.8, backgroundColor: theme.background}]}></ImageBackground>

      <ThemedText title={true} style={[styles.heading, {color: theme.textSecondary}]}>
        {user?.email}
      </ThemedText>
      <Spacer />

      <ThemedText style={{color: theme.textTertiary}}>
        Time to start reading some books...
      </ThemedText>
      <Spacer height={340}/>

      <ThemedButton onPress={logout}>
        <Text style={{color: '#f2f2f2'}}>
          Logout
        </Text>
      </ThemedButton>
    </ThemeView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },  
})