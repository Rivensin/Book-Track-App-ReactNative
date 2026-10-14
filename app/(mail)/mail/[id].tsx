import { Text, StyleSheet, ImageBackground, useColorScheme } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ThemedText from '../../../components/ThemedText'
import ThemedButton from '../../../components/ThemedButton'
import ThemeView from '../../../components/ThemeView'
import ThemedCard from '../../../components/ThemeCard'
import Spacer from '../../../components/Spacer'
import UseUser from '../../../hooks/useUser'
import { useEffect, useState } from 'react'
import ThemedLoader from '../../../components/ThemedLoader'
import { Colors } from '../../../constants/Color'
import ImageBg from '../../../assets/img/Bibliophile-amico.png'
import ImageBgDark from '../../../assets/img/Bibliophile-amico-dark.png'
import { getMailsDetail } from '../../../services/mailService'
import { MailProps } from '../../../services/mailService'

const MailDetails = () => {
  const { id } = useLocalSearchParams<{id: string}>()
  const router = useRouter()  
  const [mail,setMail] = useState<MailProps | null>(null)
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]

  useEffect(() => {
    async function loadMail() {
      try {
        const mailData = await getMailsDetail(id)
        setMail(mailData)
      } catch(error){
        console.error(error); 
      }      
    }

    loadMail()
  },[id])

  if(!mail){
    return (
      <ThemeView safe style={styles.container}>
        <ThemedLoader />
      </ThemeView>
    )
  }

  return (
    <ThemeView style={[styles.wrapper, { backgroundColor: theme.menuBackground }]}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: 0.4, top:-50, bottom:50}]}></ImageBackground>

      <ThemeView style={{paddingHorizontal: 16, borderBottomColor: theme.iconColor, borderStartColor: theme.textSecondary, borderStartWidth: 3, borderBottomWidth: 1, paddingVertical: 10}}>
        <ThemeView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ThemedText style={styles.textSender}>
            {mail.sender}
          </ThemedText>
          <ThemedText style={styles.textSender}>
            {new Date(mail.date).toLocaleDateString()}
          </ThemedText>
        </ThemeView>
        <ThemedText style={[styles.textTitle, {fontWeight: mail.hasRead ? '400' : '700'}]}>
          {mail.title} {!mail.hasRead && <Text style={{color: Colors.warning}}>*</Text>}
        </ThemedText>
        <ThemedText 
          style={styles.textDesc}
          numberOfLines= {2} 
          ellipsizeMode= 'tail'
        >
          {mail.desc}
        </ThemedText>
      </ThemeView>
    </ThemeView>
  )
}

export default MailDetails

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  textTitle: {
    fontSize: 20,
    paddingBottom: 5,    
  },
  textSender: {
    fontSize: 14,
    paddingBottom: 5,
    fontWeight: '400'
  },
  textDesc: {
    fontSize: 14,
    fontWeight: '300'
  }
})