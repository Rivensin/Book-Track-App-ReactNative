import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Role, Query, Models } from "react-native-appwrite";
import UseUser from "../hooks/useUser";

type BooksContextProp = {
  books: Book[];
  booksUser: Book[];
  fetchBooks: (status?: string) => Promise<void>;
  fetchBooksUser: (status?: string) => Promise<void>;
  fetchBooksById: (id: string) => Promise<Models.Document>;
  createBook: (data: Book) => Promise<void>;
  deleteBook: (data: string) => Promise<void>;
}

export type Book = {
  title: string;
  author: string;
  description: string;
  price: number
}

const DATABASE_ID = '696a09b5001ba11db07e'
const COLLECTION_ID = 'books'
const COLLECTION_ID_USERBOOK = '6af091de0016ca86856d'

export const BookContext = createContext<BooksContextProp | null>(null);

export const BooksProvider = ({children} : {children: React.ReactNode}) => {
  const [books, setBooks] = useState<Book[]>([])
  const [booksUser, setBooksUser] = useState<Book[]>([])
  const { user } = UseUser()

  async function fetchBooks(status?: string) {
    try {
      let queries = []
      if(status){
        queries.push(Query.equal('status', status))
      }

      const response = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_ID,
        queries
      )

      setBooks(response.documents)
    } catch (error : unknown) {
      const message = error instanceof Error ? error.message : 'Unknown Error' 
      throw new Error(message)
    }
  }

  async function fetchBooksUser() {
    try {      
      //Get all books that belong to the user
      const userBookResponse = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_ID_USERBOOK,
        [
          Query.equal('userId', user.$id)
        ]
      )      

      //Extract Book Id
      const bookIds = userBookResponse.documents.map(item => item.bookIdCollection)

      //Handle if user have no books
      if(bookIds.length === 0){
        setBooksUser([])
        return
      }

      //Get Book Documents
      const bookResponse = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('$id',bookIds)
        ]
      )

      setBooksUser(bookResponse.documents)

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
        id,
        [
          Query.select(['*', 'bookId.*'])
        ]
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
        {...data, readCount: 0, userId: user.$id},
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
    <BookContext.Provider value={{books, booksUser, fetchBooks, fetchBooksUser, fetchBooksById, createBook, deleteBook}}>
      {children}
    </BookContext.Provider>
  )
}

