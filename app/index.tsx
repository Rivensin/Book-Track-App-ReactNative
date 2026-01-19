import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'
import ThemeView from '../components/ThemeView'
import ThemedLogo from '../components/ThemeLogo'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'


const Home = () => {
  return (
    <ThemeView style={styles.container} safe>
      <ThemedLogo />
      <Spacer height={20}/>

      <ThemedText 
        style={styles.title}
        title={true}>
        BookHolic App
      </ThemedText>

      <Spacer height={10}/>
      <ThemedText>Reading List</ThemedText>
      <Spacer/>

      <Link href="/login" style={styles.link}>
        <ThemedText>Login Page</ThemedText>
      </Link>

      <Link href="/register" style={styles.link}>
        <ThemedText>Register Page</ThemedText>
      </Link>

      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link>
    </ThemeView> 
  )
}

export default Home

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
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  }
})