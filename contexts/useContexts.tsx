import { createContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { useColorScheme } from "react-native";

type UserContextProps = {
  user: any;
  authChecked: boolean;
  themeMode: 'light' | 'dark';
  toggleTheme: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({children} : {children: React.ReactNode}) => {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [themeMode,setThemeMode] = useState<'light' | 'dark'>(useColorScheme() === 'dark' ? 'dark' : 'light')

  async function toggleTheme(){
    setThemeMode(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  async function login(email : string, password: string) {
     try {
      await account.createEmailPasswordSession(email,password)
      const response = await account.get()
      setUser(response)
    } catch (error : unknown) {
      const message = error instanceof Error ? error.message : 'Unknown Error' 
      throw new Error(message)
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(),email,password)
      await login(email,password)
    } catch (error : unknown) {
      const message = error instanceof Error ? error.message : 'Unknown Error' 
      throw new Error(message)
    }
  }

  async function logout() {
    await account.deleteSession('current')
    setUser(null)
  }

  async function getInitialUserValue() {
    try {
      const response = await account.get()
      setUser(response)
    } catch (error) {
      setUser(null)
    } finally {
      setAuthChecked(true)
    }
  }

  useEffect(() => { 
    getInitialUserValue()
  }, [])

  return (
    <UserContext.Provider value={{user, authChecked, themeMode, toggleTheme,login, register, logout}}>
      {children}
    </UserContext.Provider>
  )
}

