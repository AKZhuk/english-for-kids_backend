import { Router } from 'express';
import {
  deleteCategory, getAllCategories, insertCategory, updateCategory,
} from '../storage/categories';
import { TCategory } from '../types';

const router = Router();
router.get('/getall', async (req, res) => {
  const reqResult = await getAllCategories();
  res.status(200).json(reqResult);
});

router.post('/add', async (req, res) => {
  const reqResult = await insertCategory(req.body as TCategory);
  res.status(200).json(reqResult);
});

router.put('/update', async (req, res) => {
  const { _id, name } = req.body;
  const reqResult = await updateCategory(_id, name);
  res.status(200).json(reqResult);
});

router.delete('/delete', async (req, res) => {
  const { _id } = req.body as { _id: string };
  const deleted = await deleteCategory(_id);
  res.status(200).json(deleted);
});

export default router;
