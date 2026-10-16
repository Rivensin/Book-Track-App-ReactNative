import { Text, StyleSheet, ImageBackground, useColorScheme } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ThemedText from '../../../../components/ThemedText'
import ThemeView from '../../../../components/ThemeView'
import UseUser from '../../../../hooks/useUser'
import { useEffect, useState } from 'react'
import ThemedLoader from '../../../../components/ThemedLoader'
import { Colors } from '../../../../constants/Color'
import ImageBg from '../../../../assets/img/Bibliophile-amico.png'
import ImageBgDark from '../../../../assets/img/Bibliophile-amico-dark.png'
import { getMailsDetail } from '../../../../services/mailService'
import { MailProps } from '../../../../services/mailService'


const MailDetails = () => {
  const { id } = useLocalSearchParams<{id: string}>()    
  const [mail,setMail] = useState<MailProps | null>(null)
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]

  const { user } = UseUser()  

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

      <ThemeView style={{paddingHorizontal: 16, borderBottomColor: theme.iconColor, borderStartColor: theme.textSecondary, borderStartWidth: 1, borderBottomWidth: 1, paddingVertical: 10, height: '100%'}}>
        <ThemeView style={[styles.dateWrapper, {borderBottomColor: theme.text}]}>
          <ThemedText style={styles.textSender}>
            Date : 
          </ThemedText>
          <ThemedText style={styles.textSender}>
            {new Date(mail.date).toLocaleDateString()}
          </ThemedText>          
        </ThemeView>

        <ThemeView style={[styles.dateWrapper, {borderBottomColor: theme.text}]}>
          <ThemedText style={styles.textSender}>
            From :  
          </ThemedText>
          <ThemedText style={styles.textSender}>
            {mail.sender}
          </ThemedText>
        </ThemeView>

        <ThemeView style={[styles.dateWrapper, {borderBottomColor: theme.text}]}>
          <ThemedText style={styles.textSender}>
            To :  
          </ThemedText>
          <ThemedText style={styles.textSender}>
            {user.email}
          </ThemedText>
        </ThemeView>

        <ThemedText style={[styles.textTitle, {fontWeight: mail.hasRead ? '400' : '700'}]}>
          {mail.title} {!mail.hasRead && <Text style={{color: Colors.warning}}>*</Text>}
        </ThemedText>
        <ThemedText style={styles.textDesc}>
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
  dateWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20,      
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  textTitle: {
    fontSize: 30,
    paddingBottom: 15,    
  },
  textSender: {
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: '400'
  },
  textDesc: {
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 30
  }
})