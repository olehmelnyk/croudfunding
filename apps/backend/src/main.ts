/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import db from './config/db';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.get('/api/campaigns', async (req, res) => {
  const PER_PAGE = 10;

  const status = req.query?.status || 'active';

  const campaigns = await db('Campaigns')
    .select([
      'id',
      'name',
      'description',
      'goal',
      'amount',
      'status',
      'expiration_date',
    ])
    .where({ status })
    .limit(Math.min(100, Number(req.query?.perPage) || PER_PAGE))
    .offset(PER_PAGE * Number(req.query?.page));

  res.json(campaigns);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
