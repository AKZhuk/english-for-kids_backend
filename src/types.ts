export type TWord = {
  word: string;
  translate: string;
  audioSRC: string;
  imageSRC: string;
};

export type TCategory = {
  name: string;
  id: number;
};

export type TFormData = {
  img: File[];
  audio: File[];
};

export type TFiles = {
  img: Express.Multer.File[];
  audio: Express.Multer.File[];
};
