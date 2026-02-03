import { StyleSheet, TouchableWithoutFeedback, Keyboard, Text, ImageBackground, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import Spacer from '../../components/Spacer'
import useBooks from '../../hooks/useBooks'
import { useRouter } from 'expo-router/build/exports'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ImageBg from '../../assets/img/Bibliophile-bro.png'

const Create = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const { createBook } = useBooks()
  const router = useRouter()
  const colorScheme = useColorScheme()

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
      <ThemeView style={styles.container} safe>
        <ImageBackground source={ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFillObject, {opacity: colorScheme === 'light' ? 0.4 : 0.2, top: 50, bottom: -50}]}></ImageBackground>
        <ThemedText title={true} style={styles.heading}>
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

export default Create

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