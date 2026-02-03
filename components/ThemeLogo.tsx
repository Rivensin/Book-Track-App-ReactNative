import { Image, useColorScheme, StyleSheet, ViewProps, ImageSourcePropType } from "react-native";

const ThemedLogo = ({src,width,height,opacity =0.4,...props}) => {
    const colorScheme = useColorScheme();

    return (
        <Image 
            source={src}
            style={[styles.logo,{width:width, height: height, opacity: opacity}]}
            {...props}
        />
    )
}

export default ThemedLogo

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    opacity: 0.4
  },
});