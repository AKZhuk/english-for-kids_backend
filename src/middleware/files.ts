import multer from 'multer';
import path from 'path';

export const loader = multer({ dest: path.join(__dirname, 'tmp') });
