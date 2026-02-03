import { StyleSheet, Pressable, PressableProps } from 'react-native'
import { Colors } from '../constants/Color'

type ThemedButtonProps = PressableProps & {
  variant?: 'primary' | 'secondary';
};

const ThemedButton = ({style, ...props} : ThemedButtonProps) => {  
  return (
    <Pressable 
      style={({pressed}) => [styles.btn, pressed && styles.pressed, style]}
      {...props} 
    />    
  )
}

export default ThemedButton

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.button,
    paddingVertical: 18,
    paddingHorizontal: 100,
    borderRadius: 6,
    marginVertical: 10,
    opacity: 0.9
  },
  pressed: {
    opacity: 0.5,
  },
})