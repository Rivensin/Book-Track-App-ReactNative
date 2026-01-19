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
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 100,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5,
  },
})