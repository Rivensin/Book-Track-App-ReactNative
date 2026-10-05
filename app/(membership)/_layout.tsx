import { StyleSheet, useColorScheme, Image } from 'react-native'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '../../constants/Color'
import UserOnly from '../../components/auth/UserOnly'
import MemberActive from '../../assets/img/membership-active.png'
import MemberIdle from '../../assets/img/membership.png'
import PerksActive from '../../assets/img/perks-active.png'
import PerksIdle from '../../assets/img/perks.png'

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'] 
  
  return (
    <UserOnly>
      <StatusBar style='auto'/>
      <Tabs
        safeAreaInsets={{bottom: 0}} 
        screenOptions={{
          headerShown: false,
          animation: 'none',        
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            height:60,
            padding: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor : theme.iconColor
        }}> 

        <Tabs.Screen 
          name='membership' 
          options={{
            title: 'Membership',
            tabBarIcon: ({focused, size}) => (
              <Image 
                source={focused ? MemberActive : MemberIdle}
                style={{width:size, height: size}}
                resizeMode= 'contain' 
              />
            )
          }} 
        />

        <Tabs.Screen 
          name='perks' 
          options={{
            title: 'Perks',
            tabBarIcon: ({focused, size}) => (
              <Image 
                source={focused ? PerksActive : PerksIdle}
                style={{width:size, height: size}}
                resizeMode= 'contain' 
              />
            )
          }} 
        />        
      </Tabs>
    </UserOnly>
  )
}

export default RootLayout

const styles = StyleSheet.create({})