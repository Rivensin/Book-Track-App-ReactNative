import React, { useEffect } from 'react'
import useUser from '../../hooks/useUser';
import { usePathname, useRouter } from 'expo-router';
import ThemedLoader from '../ThemedLoader';

const UserOnly = ({children} : {children: React.ReactNode}) => {
  const {user, authChecked} = useUser();
  const router = useRouter();
  // const pathname = usePathname()

  // useEffect(() => {
  //   console.log(pathname)
  // },[pathname])

  useEffect(() => {
    if(authChecked && user === null) {
      router.replace('/login');
    }
  },[user,authChecked])

  if(!authChecked || !user){
    return (
      <ThemedLoader />
    )
  } 

  return children
}

export default UserOnly
