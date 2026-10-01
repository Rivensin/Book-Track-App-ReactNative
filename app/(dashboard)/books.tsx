import { StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native'
import ThemedText from '../../components/ThemedText'
import ThemeView from '../../components/ThemeView'
import ThemedCard from '../../components/ThemeCard'
import Spacer from '../../components/Spacer'
import useBooks from '../../hooks/useBooks'
import UseUser from '../../hooks/useUser'
import { Colors } from '../../constants/Color'
import { useRouter } from 'expo-router/build/exports'
import ImageBg from '../../assets/img/Bibliophile-pana.png'
import ImageBgDark from '../../assets/img/Bibliophile-pana-dark.png'

const Books = () => {
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const { books } = useBooks()
  const router = useRouter();

  return (
    <ThemeView style={styles.container} safe={true}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: themeMode === 'light' ? 0.4 : 0.8, backgroundColor: theme.background}]}></ImageBackground>
      <Spacer />

      <ThemedText title={true} style={[styles.heading, {color: theme.textSecondary}]}>
        Your Reading List
      </ThemedText>

      <FlatList 
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/books/${item.$id}`)}>
            <ThemedCard style={[styles.card, {backgroundColor: theme.boxBackground}]}>
              <ThemedText style={[styles.title, {color: theme.text}]}>{item.title}</ThemedText>
              <ThemedText style={{color: theme.textTertiary}}>Written by : {item.author}</ThemedText>
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
    borderColor: '#000',
    borderWidth: 0.5,
    borderLeftColor: '#A1C9FB',
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  } 
})