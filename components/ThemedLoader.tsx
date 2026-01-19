import { ActivityIndicator, useColorScheme } from 'react-native'
import { Colors } from '../constants/Color'
import ThemeView from './ThemeView';

const ThemedLoader = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemeView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size='large' color={theme.text} />
    </ThemeView>
  )
}

export default ThemedLoader