import { Text, StyleSheet, ImageBackground, useColorScheme, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ThemedText from '../../../components/ThemedText'
import ThemedButton from '../../../components/ThemedButton'
import ThemeView from '../../../components/ThemeView'
import ThemedCard from '../../../components/ThemeCard'
import Spacer from '../../../components/Spacer'
import UseBooks from '../../../hooks/useBooks'
import UseUser from '../../../hooks/useUser'
import { useEffect, useState } from 'react'
import ThemedLoader from '../../../components/ThemedLoader'
import { Colors } from '../../../constants/Color'
import ImageBg from '../../../assets/img/Bibliophile-amico.png'
import ImageBgDark from '../../../assets/img/Bibliophile-amico-dark.png'

const BooksDetails = () => {
  const { id } = useLocalSearchParams<{id: string}>()
  const router = useRouter()

  const { themeMode } = UseUser() 
  const { fetchBooksById, deleteBook } = UseBooks()

  const [books,setBooks] = useState(null)
  const [chapter,setChapter] = useState(null) 
  const theme = Colors[themeMode]
  
  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBooksById(id)
      setBooks(bookData)
    }

    loadBook()
    
  },[id])

  if(!books){
    return (
      <ThemeView safe style={styles.container}>
        <ThemedLoader />
      </ThemeView>
    )
  }

  return (
    <ThemeView style={styles.container}>      
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: themeMode === 'light' ? 0.4 : 0.8, backgroundColor: theme.background}]}></ImageBackground>
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
      <ThemedCard style={[styles.card, {backgroundColor: theme.boxBackground}]}>
        <ThemedText style={[styles.title, {color: theme.text}]}>{books?.title}</ThemedText>
        <ThemedText style={{color: theme.textTertiary}}>Written by {books?.author}</ThemedText>
        <Spacer />

        <ThemedText title={true} style={{color: theme.text}}>Book Description:</ThemedText>
        <Spacer height={10} />

        <ThemedText style={{color: theme.textTertiary}}>{books?.description}</ThemedText>
      </ThemedCard>
      
      {!chapter && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
        >
          {books?.bookId?.map(book => (       
            <Pressable onPress={() => {setChapter(book)}} key={book.$id}> 
              <ThemedCard style={{backgroundColor: theme.boxBackground, marginHorizontal: 15, marginBottom: 10}}>
                <ThemedText style={{color: theme.textTertiary}}>Chapter {book.chapterNumber} {book.chapterTitle}</ThemedText>
              </ThemedCard>      
            </Pressable>  
          ))}
        </ScrollView>
      )}

      {chapter && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
          key={chapter.$id}
        >                         
          <ThemedCard style={{backgroundColor: theme.boxBackground, marginHorizontal: 15, marginBottom: 10}}>
            <Pressable onPress={() => {setChapter(null)}}>
              <ThemedText style={{paddingBottom: 20}}>Back to List</ThemedText>
            </Pressable>
            <ThemedText style={{color: theme.textTertiary, fontSize: 18, fontWeight: 'bold', paddingBottom: 16}}>
              {chapter.chapterNumber}. {chapter.chapterTitle}
            </ThemedText>
            <ThemedText style={{color: theme.textTertiary, lineHeight: 24}}>
              {chapter.content}
            </ThemedText>
          </ThemedCard>      
          
          
        </ScrollView>
      )}      
      </ScrollView>
    </ThemeView>
  )
}

export default BooksDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  card: {
    margin: 15,
  },
  delete: {
    backgroundColor: Colors.warning,
    minWidth: 200,
    marginTop: 40, 
    alignSelf: 'center',
  },
})