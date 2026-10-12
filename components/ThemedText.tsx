import { StyleSheet, Text, TextProps, View, useColorScheme, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Color'
import UseUser from '../hooks/useUser'

type ThemedTextProps = TextProps & {
  style?: StyleProp<TextStyle>,
  title?: boolean,
}

const ThemedText = ({style, title=false, ...props} : ThemedTextProps) => {
  const { themeMode } = UseUser()  
  const theme = Colors[themeMode]

  const textColor = title ? theme.title : theme.text
  
  return (
      <Text 
        style={[{color: textColor}, style]}
        {...props} 
      />
  )
}

export default ThemedText

const styles = StyleSheet.create({})