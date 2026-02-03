import { StyleSheet, FlatList, Pressable, ImageBackground, useColorScheme } from 'react-native'
import React from 'react'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import ThemedCard from '../../components/ThemeCard'
import Spacer from '../../components/Spacer'
import useBooks from '../../hooks/useBooks'
import { Colors } from '../../constants/Color'
import { useRouter } from 'expo-router/build/exports'
import ImageBg from '../../assets/img/Bibliophile-pana.png'

const Books = () => {
  const { books } = useBooks()
  const router = useRouter();

  const colorScheme = useColorScheme()

  return (
    <ThemeView style={styles.container} safe>
      <ImageBackground source={ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFillObject, {opacity: colorScheme === 'light' ? 0.4 : 0.2, top: 50, bottom: -50}]}></ImageBackground>
      <Spacer />

      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

      <FlatList 
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Written by : {item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemeView>
  )
}

export default Books

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
  },
  list: {
    marginTop: 20,
    opacity: 0.8
  },
  card: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 10,
    paddingLeft: 14,
    borderColor: 'transparent ',
    borderLeftColor: Colors.primary,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  } 
})