import { Image, useColorScheme } from "react-native";
import DarkLogo from '../assets/img/channels10_profile-dark.jpg';
import LightLogo from '../assets/img/channels10_profile.jpg';

const ThemedLogo = ({...props}) => {
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark' ? DarkLogo : LightLogo;

    return(
        <Image source={logo} {...props}/>
    )
}

export default ThemedLogo