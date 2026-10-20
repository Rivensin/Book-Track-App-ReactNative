import { ImageBackground, StyleSheet } from 'react-native'
import UseUser from '../../../hooks/useUser'
import { Colors } from '../../../constants/Color'
import ThemeView from '../../../components/ThemeView'
import ThemedText from '../../../components/ThemedText'
import ImageBg from '../../../assets/img/Settings-amico.png'
import ImageBgDark from '../../../assets/img/Settings-amico-dark.png'
import { useEffect, useState } from 'react'
import { getMails } from '../../../services/mailService'
import { MailProps } from '../../../services/mailService'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Setting = () => {
  const { themeMode, user } = UseUser()
  const theme = Colors[themeMode]

  const router = useRouter()

  const [mail, setMail] = useState<MailProps[]>([])

  useEffect(() => {
    if(!user?.$id) return

    async function fetchMails(){
      try{
        const data = await getMails(user.$id)
        setMail(data) 
      } catch(error){
        console.error('Failed to fetch mails:', error)      
      }
    }  
    
    fetchMails() 
  },[user?.$id])

  return (
    <ThemeView style={[styles.wrapper, { backgroundColor: theme.menuBackground }]}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: 0.4, top:-50, bottom:50}]}></ImageBackground>
        <ThemeView style={{borderBottomColor: theme.iconColor, borderStartColor: theme.textSecondary, borderBottomWidth: 1, height: '100%'}}>          
          <ThemeView style={[styles.dateWrapper, {borderBottomColor: theme.text}]}>
            <Ionicons name={themeMode === 'dark' ? "notifications-outline" : "notifications"} size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />

            <ThemedText style={styles.textSender}>
              Notification
            </ThemedText>                      
          </ThemeView> 

          <ThemeView style={[styles.dateWrapper, {borderBottomColor: theme.text}]}>
            <Ionicons name={themeMode === 'dark' ? "language-outline" : "language"} size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />            

            <ThemedText style={styles.textSender}>
              Languange
            </ThemedText>                      
          </ThemeView>  

          <ThemeView style={[styles.dateWrapper, {borderBottomColor: theme.text}]}>
            <Ionicons name={themeMode === 'dark' ? "card-outline" : "card"} size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />

            <ThemedText style={styles.textSender}>
              Billing
            </ThemedText>                      
          </ThemeView>

          <ThemeView style={[styles.dateWrapper, {borderBottomColor: theme.text}]}>
            <Ionicons name={themeMode === 'dark' ? "people-outline" : "people"} size={22} color={themeMode === 'dark' ? '#D1D5DB' : '#374151'} />

            <ThemedText style={styles.textSender}>
              Account
            </ThemedText>                      
          </ThemeView>  
        </ThemeView>
    </ThemeView>
  )
}

export default Setting

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  dateWrapper: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',        
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingLeft: 14,
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 30,
    paddingBottom: 15,    
  },
  textSender: {
    fontSize: 22,
    paddingBottom: 5,
    fontWeight: '400',
    paddingLeft: 20
  },
  textDesc: {
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 30
  }
})