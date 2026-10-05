import { StyleSheet, Pressable, Image } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '../../constants/Color'
import BookActive from '../../assets/img/book-icon-active.png'
import BookIdle from '../../assets/img/book-icon-idle.png'
import MemberActive from '../../assets/img/membership-active.png'
import MemberIdle from '../../assets/img/membership.png'
import UserOnly from '../../components/auth/UserOnly'
import UseUser from '../../hooks/useUser'

const RootLayout = () => {
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const router = useRouter()
  
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

        {/* <Tabs.Screen 
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
        /> */}

        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen 
          name='books' 
          options={{
            title: 'Books',
            tabBarIcon: ({focused, size}) => (
              <Pressable onPress={() => router.push('/(dashboard)/books')}>
                <Image 
                  source={focused ? BookActive : BookIdle}
                  style={{width:size, height: size}}
                  resizeMode= 'contain' 
                />
              </Pressable>
            ),            
          }} 
        />

        <Tabs.Screen 
          name='membership' 
          options={{
            title: 'Membership',
            tabBarIcon: ({focused, size}) => (
              <Pressable 
                onPress={() => router.push('/(membership)/membership')}>
              <Image 
                source={focused ? MemberActive : MemberIdle}
                style={{width:size, height: size}}
                resizeMode= 'contain' 
              />
              </Pressable>
            )
          }} 
        />
      </Tabs>
    </UserOnly>
  )
}

export default RootLayout

const styles = StyleSheet.create({})