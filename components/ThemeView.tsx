import { StyleSheet, View, StyleProp, ViewProps, ViewStyle, useColorScheme } from 'react-native'
import { Colors } from '../constants/Color'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

type ThemeViewProps = ViewProps & {
  style?: StyleProp<ViewStyle>
  safe?: boolean
}

const ThemeView = ({style, safe = false, ...props} : ThemeViewProps) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  if(!safe){
    return (
    <View 
      style={[{backgroundColor: theme.background},style]} 
      {...props} />
    )
  }

  const insets = useSafeAreaInsets()

  return (
    <View 
      style={[{
        backgroundColor: theme.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        },
        style
      ]} 
      {...props}
    />
  )
}

export default ThemeView

const styles = StyleSheet.create({})