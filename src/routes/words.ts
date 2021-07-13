import { Router } from 'express';
import { loader } from '../middleware/files';
import { deleteWord, getAllWords, insertWord, updateWord } from '../storage/words';
import { TWord } from '../types';
const fs = require('fs/promises');
const cloudinary = require('cloudinary').v2;

const router = Router();

router.get('/getall', async (req, res) => {
  const reqResult = await getAllWords();
  res.status(200).json(reqResult);
});

router.put('/update', async (req, res) => {
  const word = req.query as TWord;
  const reqResult = await updateWord(word.word, req.query as TWord);
  res.status(200).json(reqResult);
});

router.post('/create', loader.fields([{ name: 'img' }, { name: 'audio' }]), async (req, res) => {
  console.log('create', req.body, req.files);
  const wordData: TWord = req.body;
  try {
    console.log((<any>req.files)['audio'][0].path, 'llll');

    const audioPath = await cloudinary.uploader.upload((<any>req.files)['audio'][0].path, {
      resource_type: 'auto',
      folder: 'audio',
      use_filename: true,
    });
    console.log(audioPath);

    wordData.audioSRC = audioPath.secure_url;
    fs.unlink((req.files as any)['audio'][0].path);
    const imgPath = await cloudinary.uploader.upload((<any>req.files)['img'][0].path);
    wordData.imageSRC = imgPath.secure_url;
    fs.unlink((req.files as any)['img'][0].path);
    console.log(wordData, 'load data');
  } catch (e) {
    console.log(e, 'something ent wrong');
  }

  console.log(wordData, 'load data 55');
  const reqResult = await insertWord(wordData);
  res.status(200).json(reqResult);
});

router.delete('/delete', async (req, res) => {
  const { id } = req.body as { id: string };
  const deleted = await deleteWord(id);
  res.status(200).json(deleted);
});

export default router;
