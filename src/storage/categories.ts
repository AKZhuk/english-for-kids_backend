import { ObjectId } from 'mongodb';
import { TCategory } from '../types';
import { categoriesCollection } from './collections';
import { deleteWords } from './words';

export async function getAllCategories(): Promise<TCategory[]> {
  const categories = await categoriesCollection;
  const arrOfCategories = await categories
    .find()
    .map((elem) => elem)
    .toArray();
  return arrOfCategories;
}

export async function insertCategory(category: TCategory): Promise<string> {
  const categories = await categoriesCollection;
  const { insertedId } = await categories.insertOne(category);
  return insertedId;
}

export async function updateCategory(id: string, name: string): Promise<boolean> {
  const categories = await categoriesCollection;
  const objID = new ObjectId(id);
  const response = await categories.updateOne(
    {
      _id: objID,
    },
    { $set: { name } },
  );
  return Boolean(response.modifiedCount);
}

export async function deleteCategory(id: string): Promise<{
  category: number | undefined;
  wordsCount: number | undefined;
}> {
  const categories = await categoriesCollection;
  const objID = new ObjectId(id);
  const result = await categories.deleteOne({
    _id: objID,
  });
  const wordsCount = await deleteWords(id);
  return { category: result.deletedCount, wordsCount };
}
