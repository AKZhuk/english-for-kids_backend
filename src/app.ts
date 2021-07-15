import express from 'express';
import cors from 'cors';
import Words from './routes/words';
import Categories from './routes/categories';

require('dotenv').config();

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

app.use((err: Error, req: express.Request, res: express.Response) => {
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
