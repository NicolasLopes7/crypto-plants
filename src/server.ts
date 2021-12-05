require('dotenv').config();

import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

Object.entries(routes).forEach(([name, routes]) => app.use(`/${name}`, routes));

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => console.log(`listen on http://localhost:${PORT}`));
