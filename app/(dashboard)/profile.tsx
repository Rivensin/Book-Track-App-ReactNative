import ThemeView from "../../components/ThemeView";
import ThemedText from "../../components/ThemedText";
import { ImageBackground, StyleSheet, Image } from "react-native";
import UseUser from "../../hooks/useUser";
import { Colors } from "../../constants/Color";
import ImageBg from '../../assets/img/Account-bro.png'
import ImageBgDark from '../../assets/img/Account-bro-dark.png'
import profile from '../../assets/img/profile-icon-idle.png'
import { useEffect, useState } from "react";

const Profile = () => {
  const { themeMode } = UseUser()
  const theme = Colors[themeMode]
  const { user, getInitialUserTable } = UseUser()
  const [userInfo, setUserInfo] = useState(null) 

  useEffect(() => {
    async function fetchUserInfo(){
      try {
        const response = await getInitialUserTable(user.$id)     
        setUserInfo(response)        
      }catch (error){
        console.error(error)
      }
    }

    fetchUserInfo()
    
  },[user, getInitialUserTable])
  
  useEffect(() => {
    console.log(userInfo)
  },[userInfo])

  return (
    <ThemeView style={[styles.wrapper, { backgroundColor: theme.menuBackground }]}>
      <ImageBackground source={themeMode === 'dark' ? ImageBgDark : ImageBg} resizeMode='contain' style={[StyleSheet.absoluteFill, {opacity: 0.4, top:-50, bottom:50}]}></ImageBackground>
               
      <ThemeView style={styles.gridItems}>
        <Image source={profile} style={{width: 125, height: 125,}} />

        <ThemeView style={styles.descriptionWrapper}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: theme.textSecondary}}>
            Name :
          </ThemedText>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: theme.textSecondary}}>
            {userInfo?.name}
          </ThemedText>
        </ThemeView>

        <ThemeView style={styles.descriptionWrapper}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: theme.textSecondary}}>
            Membership :
          </ThemedText>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: theme.textSecondary}}>
            {userInfo?.membership}
          </ThemedText>
        </ThemeView>

        <ThemeView style={styles.descriptionWrapper}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: theme.textSecondary}}>
            Coin :
          </ThemedText>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: theme.textSecondary}}>
            {userInfo?.coin}
          </ThemedText>
        </ThemeView>
      </ThemeView>
    </ThemeView>
  )
}

export default Profile

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },  
  grid: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 25,
    rowGap: 10,
  },
  gridItems: {    
    alignItems: 'center',
    rowGap: 20,
    justifyContent: 'center',
    height: '80%'
  },
  descriptionWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '50%'
  }
})
