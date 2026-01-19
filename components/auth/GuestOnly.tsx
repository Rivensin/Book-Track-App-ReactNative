import { StyleSheet, Text, View } from 'react-native'
import React, { use, useEffect } from 'react'
import useUser from '../../hooks/useUser';
import { useRouter } from 'expo-router';
import ThemedLoader from '../ThemedLoader';

const GuestOnly = ({children} : {children: React.ReactNode}) => {
  const {user, authChecked} = useUser();
  const router = useRouter();

  useEffect(() => {
    if(authChecked && user !== null) {
      router.replace('/profile');
    }
  },[user,authChecked])

  if(!authChecked || user){
    return (
      <ThemedLoader />
    )
  } 

  return children
}

export default GuestOnly
