import { StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import Spacer from '../../components/Spacer'
import useBooks from '../../hooks/useBooks'
import UseUser from '../../hooks/useUser'
import { Colors } from '../../constants/Color'
import ImageBg from '../../assets/img/Bibliophile-pana.png'
import ImageBgDark from '../../assets/img/Bibliophile-pana-dark.png'
import { useEffect } from 'react'
import BookCard from '../../components/BookCard'

const ReadBooks = () => {
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const { books, fetchBooks } = useBooks() 

  useEffect(() => {
    fetchBooks('free')
  },[])

  return (
    <ThemeView style={styles.container}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: themeMode === 'light' ? 0.4 : 0.8, backgroundColor: theme.background}]}></ImageBackground>
      <Spacer />

      <ThemedText title={true} style={[styles.heading, {color: theme.textSecondary}]}>
        Read Our Free Books
      </ThemedText>

      <BookCard book={books} />
    </ThemeView>
  )
}

export default ReadBooks

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'stretch',
    // justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  }  
})