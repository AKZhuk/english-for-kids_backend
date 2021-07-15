import { ObjectId } from 'mongodb';
import { TWord } from '../types';
import { wordsCollection } from './collections';

export async function getAllWords(): Promise<TWord[]> {
  const words = await wordsCollection;
  const arrOfWords: TWord[] = await words
    .find()
    .map((elem) => elem)
    .toArray();
  return arrOfWords;
}

export async function insertWord(word: TWord): Promise<string> {
  const words = await wordsCollection;
  const { insertedId } = await words.insertOne(word);
  return insertedId;
}

export async function updateWord(id: string, word: TWord): Promise<boolean> {
  const words = await wordsCollection;
  const objID = new ObjectId(id);
  const response = await words.updateOne({ _id: objID }, { $set: word });
  return Boolean(response.upsertedCount);
}

export async function deleteWord(id: string): Promise<boolean> {
  const words = await wordsCollection;
  const objID = new ObjectId(id);
  const response = await words.deleteOne({
    _id: objID,
  });

  return Boolean(response.deletedCount);
}

export async function deleteWords(categoryId: string): Promise<number | undefined> {
  const words = await wordsCollection;
  const response = await words.deleteMany({ categoryID: categoryId });
  return response.deletedCount;
}
