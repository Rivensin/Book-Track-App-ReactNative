import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Role, Query } from "react-native-appwrite";
import UseUser from "../hooks/useUser";

type BooksContextProp = {
  books: string[];
  fetchBooks: () => Promise<void>;
  fetchBooksById: (id: string) => Promise<void>;
  createBook: (data: Book) => Promise<void>;
  deleteBook: (data: string) => Promise<void>;
}

type Book = {
  title: string;
  author: string;
  description: string;
}

const DATABASE_ID = '696a09b5001ba11db07e'
const COLLECTION_ID = 'books'

export const BookContext = createContext<BooksContextProp | null>(null);

export const BooksProvider = ({children} : {children: React.ReactNode}) => {
  const [books, setBooks] = useState([])
  const { user } = UseUser()

  async function fetchBooks() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_ID,
        [
          Query.equal('userId', user.$id)
        ]
      )
      setBooks(response.documents)
    } catch (error : unknown) {
      const message = error instanceof Error ? error.message : 'Unknown Error' 
      throw new Error(message)
    }
  }

  async function fetchBooksById(id: string) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID, 
        COLLECTION_ID,
        id
      )
      return response
    } catch (error : unknown) {
      const message = error instanceof Error ? error.message : 'Unknown Error' 
      throw new Error(message)
    }
  }

  async function createBook(data : Book) {
    try { 
      const newBook = await databases.createDocument(
        DATABASE_ID, 
        COLLECTION_ID, 
        ID.unique(),
        {...data, userId: user.$id},
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id))
        ]
      )
    } catch (error : unknown) {
      const message = error instanceof Error ? error.message : 'Unknown Error' 
      throw new Error(message)
    }
  }

  async function deleteBook(id : string) {
    try {
      await databases.deleteDocument(  
        DATABASE_ID, 
        COLLECTION_ID,
        id
      )
    } catch (error : unknown) {
      const message = error instanceof Error ? error.message : 'Unknown Error' 
      throw new Error(message)
    }
  }

  useEffect(() => {
    let unsubscribe
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`

    if(user){
      fetchBooks()
      unsubscribe= client.subscribe(channel, (response) => {
        const {payload, events} = response
        
        if(events[0].includes('create')){
          setBooks((prev) => [...prev, payload])
        }
        
        if(events[0].includes('delete')){
          setBooks((prev) => prev.filter(book => book.$id !== payload.$id))
        }
        
      })
    } else {
      setBooks([])
    }

    return () => {
      if(unsubscribe) unsubscribe()
    }
  }, [user])

  return (
    <BookContext.Provider value={{books, fetchBooks, fetchBooksById, createBook, deleteBook}}>
      {children}
    </BookContext.Provider>
  )
}

