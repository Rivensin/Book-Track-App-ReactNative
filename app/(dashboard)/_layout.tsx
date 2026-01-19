import { StyleSheet, useColorScheme, Image } from 'react-native'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '../../constants/Color'
import BookActive from '../../assets/img/book-icon-active.png'
import BookIdle from '../../assets/img/book-icon-idle.png'
import ProfileActive from '../../assets/img/profile-icon-active.png'
import ProfileIdle from '../../assets/img/profile-icon-idle.png'
import CreateActive from '../../assets/img/create-icon-active.png'
import CreateIdle from '../../assets/img/create-icon-idle.png'
import UserOnly from '../../components/auth/UserOnly'

const RootLayout = ({children} : {children: React.ReactNode}) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  
  return (
    <UserOnly>
      <StatusBar style='auto'/>
      <Tabs screenOptions={{
        headerShown: false,
        animation: 'none',
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          padding: 10,
          height: 90
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor : theme.iconColor
      }}> 

        <Tabs.Screen 
          name='profile' 
          options={{
            title: 'Profile',
            tabBarIcon: ({focused, size}) => (
              <Image 
                source={focused ? ProfileActive : ProfileIdle}
                style={{width:size, height: size}}              
                resizeMode= 'contain' 
              />
            )
            }} 
        />

        <Tabs.Screen 
          name='books' 
          options={{
            title: 'Books',
            tabBarIcon: ({focused, size}) => (
              <Image 
                source={focused ? BookActive : BookIdle}
                style={{width:size, height: size}}
                resizeMode= 'contain' 
              />
            )
            }} 
        />

        <Tabs.Screen 
          name='create' 
          options={{
            title: 'Create',
            tabBarIcon: ({focused, size}) => (
              <Image 
                source={focused ? CreateActive : CreateIdle}
                style={{width:size, height: size}}
                resizeMode= 'contain' 
              />
            )
            }} 
        />

        <Tabs.Screen 
          name='books/[id]' 
          options={{href:null}} 
        />

        {children}
      </Tabs>
    </UserOnly>
  )
}

export default RootLayout

const styles = StyleSheet.create({})