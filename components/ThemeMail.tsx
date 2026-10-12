import { StyleSheet, View } from 'react-native'
import { Colors } from '../constants/Color'
import UseUser from '../hooks/useUser'
import ThemedView from './ThemeView'
import ThemedText from './ThemedText'

type ThemeMailProps = {
  sender: string,
  date: string,
  title: string,
  description: string
} 

const ThemeMail = ({sender, date, title, description}: ThemeMailProps) => {
  const { themeMode } = UseUser()
  const theme = Colors[themeMode]
  
  return (
    <ThemedView style={{paddingHorizontal: 16, borderBottomColor: theme.iconColor, borderStartColor: theme.textSecondary, borderStartWidth: 3, borderBottomWidth: 1, paddingVertical: 10}}>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ThemedText style={styles.textSender}>
          {sender}
        </ThemedText>
        <ThemedText style={styles.textSender}>
          {new Date(date).toLocaleDateString()}
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.textTitle}>
        {title}
      </ThemedText>
      <ThemedText 
        style={styles.textDesc}
        numberOfLines= {2} 
        ellipsizeMode= 'tail'
      >
        {description}
      </ThemedText>
    </ThemedView>
  )
}

export default ThemeMail

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: '400'
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