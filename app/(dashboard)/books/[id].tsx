import { Text, StyleSheet, ImageBackground, useColorScheme } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ThemedText from '../../../components/ThemedText'
import ThemedButton from '../../../components/ThemedButton'
import ThemeView from '../../../components/ThemeView'
import ThemedCard from '../../../components/ThemeCard'
import Spacer from '../../../components/Spacer'
import UseBooks from '../../../hooks/useBooks'
import { useEffect, useState } from 'react'
import ThemedLoader from '../../../components/ThemedLoader'
import { Colors } from '../../../constants/Color'
import ImageBg from '../../../assets/img/Bibliophile-bro.png'

const BooksDetails = () => {
  const { id } = useLocalSearchParams<{id: string}>()
  const router = useRouter()
  const { fetchBooksById, deleteBook } = UseBooks()
  const [books,setBooks] = useState(null)
  const colorScheme = useColorScheme() 

  const handleDelete = async() => {
    try {
      await deleteBook(id)
      setBooks(null)
      router.replace('/books')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error'
      throw new Error(message)
    }
  }
  
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
    <ThemeView style={styles.container} safe>
      <ImageBackground source={ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFillObject, {opacity: colorScheme === 'light' ? 0.4 : 0.2, top: 120, bottom: -120}]}></ImageBackground>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{books?.title}</ThemedText>
        <ThemedText>Written by {books?.author}</ThemedText>
        <Spacer />

        <ThemedText title={true}>Book Description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{books?.description}</ThemedText>
      </ThemedCard>

      <ThemedButton style={styles.delete} onPress={handleDelete}>
        <Text style={{color: '#fff'}}>
          Delete Book
        </Text>
      </ThemedButton>
      
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