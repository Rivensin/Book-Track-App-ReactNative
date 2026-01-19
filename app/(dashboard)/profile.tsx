import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import Spacer from '../../components/Spacer'
import useUser from '../../hooks/useUser'
import ThemedButton from '../../components/ThemedButton'

const Profile = () => {
  const { logout, user } = useUser();

  return (
    <ThemeView style={styles.container} safe={true}>
      <ThemedText title={true} style={styles.heading}>
        {user?.email}
      </ThemedText>
      <Spacer />

      <ThemedText>
        Time to start reading some books...
      </ThemedText>
      <Spacer />

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