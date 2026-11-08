import { StyleSheet, Pressable, FlatList } from 'react-native'
import ThemedText from './ThemedText'
import ThemeView from './ThemeView'
import ThemedCard from './ThemeCard'
import { Colors } from '../constants/Color'
import UseUser from '../hooks/useUser'
import { useRouter } from 'expo-router'
import { Book } from '../contexts/bookContexts'

type BookCardProps = {
  book : Book[];
}

const BookCard = ({ book } : BookCardProps) => {
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const router = useRouter();
  
  return (
    <FlatList 
      data={book}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/books/${item.id}`)}>
          <ThemedCard style={[styles.card, {backgroundColor: theme.boxBackground}]}>
            <ThemeView style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <ThemedText style={[styles.title, {color: theme.text}]}>{item.title}</ThemedText>
              <ThemedText style={[styles.title, {fontSize: 15, borderColor:theme.textQuarternary, borderWidth: 0.5, color: theme.textSecondary, backgroundColor:'#FFFF2E', padding: 6, borderRadius: 10}]}>{item.price}</ThemedText>
            </ThemeView>
            <ThemedText style={{color: theme.textTertiary}}>Written by : {item.author}</ThemedText>
          </ThemedCard>
        </Pressable>
      )}
    /> 
  )
}

export default BookCard

const styles = StyleSheet.create({  
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
  },
  list: {
    marginTop: 20,
    opacity: 0.8
  }  
})