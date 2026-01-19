import { Client, Account, Avatars, Databases } from "react-native-appwrite";

export const client = new Client() 
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("695fe62a003e2a08a6db") 
  .setPlatform("dev.rivensin");

export const account = new Account(client)
export const avatar = new Avatars(client)
export const databases = new Databases(client)