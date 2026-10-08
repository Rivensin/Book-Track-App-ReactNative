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
import UseUser from '../../hooks/useUser'

const RootLayout = () => {
  const {themeMode} = UseUser()
  const theme = Colors[themeMode] 
  
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
          name='profile' 
          options={{
            title: 'Home',
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
      </Tabs>
    </UserOnly>
  )
}

export default RootLayout

const styles = StyleSheet.create({})