import { StyleSheet, Image, Text, useColorScheme,View, ScrollView, ImageBackground, Dimensions, Pressable } from 'react-native'
import { Link, useRouter } from 'expo-router'
import ThemeView from '../components/ThemeView'
import ThemedLogo from '../components/ThemeLogo'
import ThemedText from '../components/ThemedText'
import Login from '../assets/img/login.png'
import Register from '../assets/img/register.png'
import rentBook from '../assets/img/rent-book.png'
import readBook from '../assets/img/reading-book.png'
import bookList from '../assets/img/book-stack.png'
import upcomingBook from '../assets/img/clock.png'
import bookRank from '../assets/img/number-1.png'
import addCoin from '../assets/img/give-coin.png'
import deposit from '../assets/img/deposit.png'
import reader from '../assets/img/reader.png'
import podium from '../assets/img/podium.png'
import discussion from '../assets/img/discussion.png'
import UseUser from '../hooks/useUser'
import { Colors } from '../constants/Color'
import Logo1 from '../assets/img/Going offline-pana.png';
import Logo2 from '../assets/img/Going offline-cuate.png';
import Icon from '../assets/img/greeting-card.png';
import Ionicons from '@expo/vector-icons/build/Ionicons'

const Home = () => {
  const { user, themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const router = useRouter()

  const screenWidth = Dimensions.get('window').width

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: theme.background}}>
      <ThemeView style={[styles.container]} safe>
        <ImageBackground source={Logo1} style={styles.backgroundImage} imageStyle={{ opacity: 0.4 }}>
          <ThemeView style={[styles.boxMenu, {backgroundColor: theme.menuBackground}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 13, justifyContent: 'space-between'}}>
              <ThemedText style={{fontSize: 18, fontWeight: 'bold', color: theme.text}}>
                Book
              </ThemedText>  

              <View style={{flexDirection: 'row', alignItems:'center', gap: 10, marginRight: 20}}>
                <ThemedText style={{fontSize: 13, fontWeight: 'bold', color: theme.textSecondary}}>
                  Points
                </ThemedText>        

                <Ionicons name="eye-outline" size={22} color={theme.textSecondary} />

                <ThemedText style={{fontSize: 13, fontWeight: 'bold', color: theme.textSecondary}}>
                  Filter
                </ThemedText>        

                <Ionicons name="options-outline" size={22} color={theme.textSecondary} />

                </View>
            </View>

            <View style={styles.grid}>
              <ThemeView style={styles.gridItems}>
                <Image source={rentBook} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Rent Book
                </ThemedText>     
              </ThemeView>

              <ThemeView style={styles.gridItems}>
                <Image source={readBook} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Read Book
                </ThemedText>     
              </ThemeView>

              <Pressable style={styles.gridItems} onPress={() => router.push('/books')}>
                <Image source={bookList} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Book List
                </ThemedText>     
              </Pressable>

              <ThemeView style={styles.gridItems}>
                <Image source={upcomingBook} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Upcoming Book
                </ThemedText>     
              </ThemeView>

              <ThemeView style={styles.gridItems}>
                <Image source={bookRank} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Book Ranking
                </ThemedText>     
              </ThemeView>

              <ThemeView style={styles.gridItems}>
                <Image source={discussion} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Forum
                </ThemedText>     
              </ThemeView>
            </View>
          </ThemeView>

          <ThemeView style={[styles.boxMenu, {backgroundColor: theme.menuBackground, marginTop: 20}]}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 13, justifyContent: 'space-between'}}>
              <ThemedText style={{fontSize: 18, fontWeight: 'bold', color: theme.text}}>
                Membership
              </ThemedText>  

              <View style={{flexDirection: 'row', alignItems:'center', gap: 10, marginRight: 20}}>
                <ThemedText style={{fontSize: 13, fontWeight: 'bold', color: theme.textSecondary}}>
                  Filter
                </ThemedText>        

                <Ionicons name="options-outline" size={22} color={theme.textSecondary} />
                </View>
            </View>

            <View style={styles.grid}>
              <ThemeView style={styles.gridItems}>
                <Image source={addCoin} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Add Coin
                </ThemedText>     
              </ThemeView>

              <ThemeView style={styles.gridItems}>
                <Image source={deposit} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Buy Perks
                </ThemedText>     
              </ThemeView>

              <ThemeView style={styles.gridItems}>
                <Image source={reader} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Profile
                </ThemedText>     
              </ThemeView>

              <ThemeView style={styles.gridItems}>
                <Image source={podium} style={{width: 35, height: 35,}} />
                <ThemedText style={{fontSize: 12, fontWeight: 'bold', color: theme.textSecondary}}>
                  Rank
                </ThemedText>     
              </ThemeView>                          
            </View>
          </ThemeView>                        
        </ImageBackground>

        {/* {user && (
          <ThemeView style={{alignItems: 'flex-end', width:'100%', backgroundColor: '#EBF3FE'}}>
            <View style={{position:'relative'}}>
              <ThemedLogo src={Logo2} width={screenWidth * 0.9} height={400}/>            
            </View>
          </ThemeView>
        )}  

        {!user && (
          <>
            <ThemeView style={{alignItems: 'flex-end', width:'100%'}}>
              <View style={{position:'relative'}}>
                <ThemedLogo src={Logo2} width={380} height={400}/>

                <View style={styles.absolute2}>
                  <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                    <ThemedText style={{textAlign: 'center'}}>Join with the App </ThemedText>
                    <ThemedLogo src={Icon} opacity={1} width={30} height={30}></ThemedLogo>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>
                    
                    <Link href="/login" style={styles.link}>
                      <ThemeView style={styles.button}> 
                        <Image 
                            source={Login}
                            style={styles.icon} 
                        />
                        <ThemedText style={{marginLeft: 2, color: 'white'}}>Login</ThemedText>
                      </ThemeView> 
                    </Link>

                    <Link href="/register" style={styles.link}>
                      <ThemeView style={styles.button}> 
                        <Image 
                            source={Register}
                            style={styles.icon} 
                        />
                        <ThemedText style={{marginLeft: 2, color: 'white'}}>Register</ThemedText>
                      </ThemeView> 
                    </Link>
                  </View>
                </View>
              </View>
            </ThemeView>
          </>
        )}  */}
      </ThemeView> 
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
  },
  grid: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 25,
    rowGap: 10,
  },
  gridItems: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 25,
    rowGap:7
  },
  absolute:{
    position:'absolute',
    top: 0,
    left: -20,
    right:20,
    bottom:0,
    textAlign: 'center', 
  },
  absolute2:{
    position:'absolute',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    textAlign: 'center', 
  },
  boxMenu: {
    alignSelf:'center', 
    width: '95%', 
    height: '45%', 
    borderRadius: 30
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden'
  },
  icon: {
    width: 20,
    height: 40,
    marginRight: 5,
    resizeMode: 'contain',
  },
  button: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.button,
    paddingVertical: 4,
    paddingHorizontal:10,
    borderRadius: 15,
    opacity: 0.9
  },
  button2: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.button,
    paddingHorizontal: 10,
    boxShadow: '1px 1px 3px'
  },
  backgroundImage: {
    width: '100%',
    height: 600,
    opacity: 0.9,
  }
})