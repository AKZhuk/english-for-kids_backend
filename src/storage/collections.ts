require('dotenv').config();
import console from 'console';
import { MongoClient } from 'mongodb';

const URL = process.env.DB as string;
console.log('DB URL', URL);
const DBNAME = 'english-for-kids';
const CATEGORIES = `categories`;
const WORDS = `words`;

async function getMongoInstance() {
  const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
  return client.db(DBNAME);
}

async function getCollection(collectionName: string) {
  const db = await getMongoInstance();
  return db.collection(collectionName);
}

const categoriesCollection = getCollection(CATEGORIES);
const wordsCollection = getCollection(WORDS);

export { categoriesCollection, wordsCollection };
