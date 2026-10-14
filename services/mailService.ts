import { databases } from '../lib/appwrite'
import { Models, Query } from 'react-native-appwrite'

const DATABASE_ID = '696a09b5001ba11db07e'
const COLLECTION_ID = '6acd0445002874f62bf3'

export type MailProps = Models.Document & {
  title: string
  date: string
  sender: string
  desc: string  
  hasRead: boolean
}

export async function getMails(userId: string) : Promise<MailProps[]>{
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal('userId', userId)
      ]
    )

    return response.documents as MailProps[]
  
  } catch (error : unknown){
    const message = error instanceof Error ? error.message : 'Unknown Error'

    throw new Error(message)
  }
}

export async function getMailsDetail(id: string) : Promise<MailProps>{
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id
    )

    return response
  
  } catch (error : unknown){
    const message = error instanceof Error ? error.message : 'Unknown Error'

    throw new Error(message)
  }
}

export async function markMailAsRead(id: string): Promise<void> {
  try {
    const response = await databases.updateDocument<MailProps>(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      {
        hasRead: true,
      }
    );

  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown Error';

    throw new Error(message);
  }
}

