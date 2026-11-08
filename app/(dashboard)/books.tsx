import { StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native'
import { useEffect } from 'react'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import ThemedCard from '../../components/ThemeCard'
import useBooks from '../../hooks/useBooks'
import UseUser from '../../hooks/useUser'
import { Colors } from '../../constants/Color'
import { useRouter } from 'expo-router/build/exports'
import ImageBg from '../../assets/img/Bibliophile-pana.png'
import ImageBgDark from '../../assets/img/Bibliophile-pana-dark.png'
import BookCard from '../../components/BookCard'


const Books = () => {
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const { booksUser, fetchBooksUser } = useBooks()
  const router = useRouter();

  useEffect(() => {
    fetchBooksUser()
  },[])

  return (
    <ThemeView style={styles.container}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: themeMode === 'light' ? 0.4 : 0.8, backgroundColor: theme.background}]}></ImageBackground>

      <ThemedText title={true} style={[styles.heading, {color: theme.textSecondary}]}>
        Your Reading List
      </ThemedText>

      {booksUser.length === 0 ? (
        <ThemeView style={{justifyContent: 'center', alignItems: 'center', height: '80%'}}>
          <ThemedText style={{fontSize: 26, color: theme.textQuarternary, paddingBottom: '30'}}>
            You have no books for now
          </ThemedText>
          <ThemedText style={{fontSize: 16, color: theme.textQuarternary}}>
            Add some book to your list!
          </ThemedText>
        </ThemeView>
      ) 
       : 
      (          
        <BookCard book={booksUser} />        
      )}
    </ThemeView>
  )
}

export default Books

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 24
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  }  
})