import { StyleSheet, Text, ImageBackground, useColorScheme } from 'react-native'
import React from 'react'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import Spacer from '../../components/Spacer'
import useUser from '../../hooks/useUser'
import ThemedButton from '../../components/ThemedButton'
import ImageBg from '../../assets/img/Book lover-pana.png'

const Profile = () => {
  const { logout, user } = useUser();
  const colorScheme = useColorScheme()

  return (
    <ThemeView style={styles.container} safe={true}>
      <ImageBackground source={ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFillObject, {opacity: colorScheme === 'light' ? 0.4 : 0.2}]}></ImageBackground>
      <ThemedText title={true} style={styles.heading}>
        {user?.email}
      </ThemedText>
      <Spacer />

      <ThemedText>
        Time to start reading some books...
      </ThemedText>
      <Spacer height={300}/>

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
  }
})