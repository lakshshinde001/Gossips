import { Account, Client, Databases } from 'appwrite';

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID_MESSAGES = import.meta.env.VITE_COLLECTION_ID_MESSAGES;


export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('667a551d003a57c5fd9e');

export const databases = new Databases(client);
export const account = new Account(client);
