import { FlatList, ImageBackground, Pressable, StyleSheet, Text } from 'react-native'
import ThemedView from '../../../components/ThemeView'
import UseUser from '../../../hooks/useUser'
import { Colors } from '../../../constants/Color'
import ThemeMail from '../../../components/ThemeMail'
import ImageBg from '../../../assets/img/Mail-pana.png'
import ImageBgDark from '../../../assets/img/Mail-pana-dark.png'
import { useEffect, useState } from 'react'
import { getMails, markMailAsRead } from '../../../services/mailService'
import { MailProps } from '../../../services/mailService'
import { useRouter } from 'expo-router'
import ThemedText from '../../../components/ThemedText'

const Mail = () => {
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
    <ThemedView style={[styles.wrapper, { backgroundColor: theme.menuBackground }]}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: 0.4, top:-50, bottom:50}]}></ImageBackground>
      {mail.length === 0 ? (
        <ThemedView style={{justifyContent: 'center', alignItems: 'center', height: '80%'}}>
          <ThemedText style={{fontSize: 26}}>All caught up!</ThemedText>
          <ThemedText style={{fontSize: 16}}>You Have no Mail for now</ThemedText>
        </ThemedView>
      ) 
       : 
      (        
        <FlatList 
          data={mail}
          keyExtractor={(item) => item.$id}        
          renderItem={({ item }) => (
            <Pressable onPress={() => {
              markMailAsRead(item.$id)
              
              setMail(prev => 
                prev.map(mail => 
                  mail.$id === item.$id ? {...mail, hasRead: true} : mail
                )
              )

              router.push(`header/mail/${item.$id}`)           
            }}
            >
              <ThemeMail 
                title={item.title}
                date={item.date}
                sender={item.sender}
                description={item.desc}
                hasRead={item.hasRead}
              />
            </Pressable>
          )}
        />  
      )}
      
          
    </ThemedView>
  )
}

export default Mail

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  textTitle: {
    fontSize: 20,
    paddingBottom: 5,
  },
  textDesc: {
    fontSize: 14,
  }
})