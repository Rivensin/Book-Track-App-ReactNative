import { StyleSheet, TextInput } from 'react-native'
import { Colors } from '../constants/Color'
import { useState } from 'react'
import UseUser from '../hooks/useUser'

const ThemedTextInput = ({style,...props}) => {
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]
  const [focused, setFocused] =  useState(false);

  return (
    <TextInput 
      placeholder='Email'
      placeholderTextColor='#a9a9a9'
      underlineColorAndroid= 'transparent'
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)} 
      style={[
        { backgroundColor: theme.boxBackground,
          borderWidth: focused ? 2 : 1,
          borderColor: focused ? '#92b6f0' : theme.text,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
          opacity: focused ? 1 : 0.7
        },
        style
      ]}
      {...props}
    />  
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({})