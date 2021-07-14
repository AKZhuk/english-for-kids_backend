require('dotenv').config();
import express from 'express';
import Words from './routes/words';
import Categories from './routes/categories';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/words', Words);
app.use('/categories', Categories);
app.use((req, res) => {
  res.status(404).json({
    statuscode: 404,
    message: 'Page not found',
  });
});

app.use((err: any, req: any, res: any) => {
  res.status(500).json({
    statuscode: 500,
    message: err.message,
    stack: err.stack,
  });
});
app.set('port', PORT);
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
