import { StyleSheet, Image, Text, useColorScheme,View, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { Link } from 'expo-router'
import ThemeView from '../components/ThemeView'
import ThemedLogo from '../components/ThemeLogo'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import Login from '../assets/img/login.png'
import Register from '../assets/img/register.png'
import Profile from '../assets/img/profile.png'
import UseUser from '../hooks/useUser'
import { Colors } from '../constants/Color'
import Logo1 from '../assets/img/Going offline-pana.png';
import Logo2 from '../assets/img/Going offline-cuate.png';
import Icon from '../assets/img/greeting-card.png';
import ImageBg from '../assets/img/Book lover-pana.png';

const Home = () => {
  const { user } = UseUser()

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const screenWidth = Dimensions.get('window').width

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ThemeView style={[styles.container]} safe>
        <ImageBackground source={ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFillObject, {opacity: 0.4, top:-50, bottom:50}]}></ImageBackground>
        <ThemedText 
          style={[styles.title, {textAlign:'center'}]}
          title={true}>
          Book Track App
        </ThemedText>
        <Spacer height={20} />

        <ThemedText style={{textDecorationLine: 'underline',textAlign:'center'}}>
          Manage your personal book collections
        </ThemedText>
        <Spacer height={50}/>

        <ThemeView style={{alignItems: 'flex-end', width:'100%'}}>
          <View style={{position:'relative'}}>
            <ThemedLogo src={Logo1} width={screenWidth * 0.9} height={400}/>
            <View style={styles.absolute}>
              <ThemedText style={{textDecorationColor: theme.text, textAlign: 'justify', lineHeight: 30, fontSize: 15, backgroundColor: colorScheme === 'light' ? 'white' : 'gray', opacity: 0.7, paddingHorizontal: 10}}>
                Reading offers vast benefits, including boosting brainpower (memory, focus, analysis), reducing stress, expanding knowledge and vocabulary, improving empathy and communication, enhancing sleep, and providing mental well-being through mental stimulation and escapism.
              </ThemedText>
            </View>
          </View>
        </ThemeView>

        {user && (
          <>
            <ThemeView style={{ width:'100%' }}>
              <View style={{position:'relative'}}>
                <ThemedLogo src={Logo2} width={380} height={400}/>

                <View style={[styles.absolute2]}>
                  <View style={{flex:1, alignItems: 'center'}}>
                    <ThemedText style={{color: theme.text, fontWeight: 'bold'}}>
                      Welcome back, <Text style={{color: '#43A6C6'}}>{user.email}!</Text>
                    </ThemedText>
                    <Spacer height={15}/>

                    <Link href="/profile" style={styles.link}>
                      <ThemeView style={styles.button2}> 
                        <Image 
                            source={Profile}
                            style={styles.icon} 
                        />
                        <ThemedText style={{marginLeft: 2}}>Go to Profile</ThemedText>
                      </ThemeView> 
                    </Link>
                  </View>
                </View>
              </View>
            </ThemeView>
          </>
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
        )} 
      </ThemeView> 
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
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
  }
})