import { Router } from 'express';
import { loader } from '../middleware/files';
import { deleteWord, getAllWords, insertWord, updateWord } from '../storage/words';
import { TFiles, TWord } from '../types';

const fs = require('fs/promises');
const cloudinary = require('cloudinary').v2;

const router = Router();

router.get('/getall', async (req, res) => {
  const reqResult = await getAllWords();
  res.status(200).json(reqResult);
});

router.put('/update', loader.fields([{ name: 'img' }, { name: 'audio' }]), async (req, res) => {
  const wordData: TWord = req.body;
  const { id } = req.query;
  if ((<TFiles>req.files).audio) {
    const audioPath = await cloudinary.uploader.upload((<TFiles>req.files).audio[0].path, {
      resource_type: 'auto',
      folder: 'audio',
      use_filename: true,
      unique_filename: false,
    });
    wordData.audioSRC = audioPath.secure_url;
    fs.unlink((req.files as TFiles).audio[0].path);
  }
  if ((<TFiles>req.files).img) {
    const imgPath = await cloudinary.uploader.upload((<TFiles>req.files).img[0].path);
    wordData.imageSRC = imgPath.secure_url;
    fs.unlink((req.files as TFiles).img[0].path);
  }
  const reqResult = await updateWord(id as string, wordData);
  res.status(200).json(reqResult);
});

router.post('/create', loader.fields([{ name: 'img' }, { name: 'audio' }]), async (req, res) => {
  const wordData: TWord = req.body;
  try {
    const audioPath = await cloudinary.uploader.upload((<TFiles>req.files).audio[0].path, {
      resource_type: 'auto',
      folder: 'audio',
      use_filename: true,
      unique_filename: false,
    });

    wordData.audioSRC = audioPath.secure_url;
    fs.unlink((req.files as TFiles).audio[0].path);

    if ((<TFiles>req.files).img) {
      const imgPath = await cloudinary.uploader.upload((<TFiles>req.files).img[0].path);
      wordData.imageSRC = imgPath.secure_url;
      fs.unlink((req.files as TFiles).img[0].path);
    } else {
      wordData.imageSRC =
        'https://res.cloudinary.com/dshgus1qp/image/upload/v1626286092/english-for-kids/img/default.jpg';
    }
  } catch (e) {
    console.log(e, 'something went wrong');
  }

  const reqResult = await insertWord(wordData);
  res.status(200).json(reqResult);
});

router.delete('/delete', async (req, res) => {
  const { id } = req.body as { id: string };
  const deleted = await deleteWord(id);
  res.status(200).json(deleted);
});

export default router;
