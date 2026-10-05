import { StyleSheet, TouchableWithoutFeedback, Keyboard, Text, ImageBackground, useColorScheme } from 'react-native'
import { useState } from 'react'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import Spacer from '../../components/Spacer'
import useBooks from '../../hooks/useBooks'
import UseUser from '../../hooks/useUser'
import { useRouter } from 'expo-router/build/exports'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ImageBg from '../../assets/img/Bibliophile-bro.png'
import ImageBgDark from '../../assets/img/Bibliophile-bro-dark.png'
import { Colors } from '../../constants/Color'

const Perks = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const { createBook } = useBooks()
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const router = useRouter()

  const handleSubmit = async() => {
    if(!title.trim() || !author.trim() || !description.trim()) return
    setLoading(true)
    try {
      await createBook({title, author, description})
      setTitle('')
      setAuthor('')
      setDescription('')  
      router.replace('/books')
      setLoading(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error'
      console.log(message)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemeView style={styles.container} safe={true}>
        <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: themeMode === 'light' ? 0.4 : 0.8, backgroundColor: theme.background}]}></ImageBackground>
        <ThemedText title={true} style={[styles.heading, {color: theme.textSecondary}]}>
          Add a New Book
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <Spacer />

        <ThemedTextInput
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
          style={styles.input}
        />
        <Spacer />

        <ThemedTextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.multiline}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{color: '#fff'}}>
            {loading ? 'Saving...' : 'Create Book'}
          </Text>
        </ThemedButton>
      </ThemeView>
    </TouchableWithoutFeedback>
  )
}

export default Perks

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  }
})    