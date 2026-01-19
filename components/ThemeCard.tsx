import { StyleSheet, useColorScheme, View, ViewProps, StyleProp, ViewStyle } from 'react-native'
import { Colors } from '../constants/Color'

type ThemeCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>
}

const ThemedCard = ({ style, ...props } : ThemeCardProps) => {
  const colorScheme = useColorScheme ()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View
      style={[
        styles.card,
        {backgroundColor: theme.uiBackground}, 
        style]}
      {...props}
    />
  )
}

export default ThemedCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  }
})