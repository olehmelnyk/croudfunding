import * as express from 'express';

import db from '../config/db';

const campaignRouter = express.Router();

campaignRouter.get('/', async (req, res) => {
  // TODO: add input validation with Zod
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
    .offset(PER_PAGE * Number(req.query?.page) || 0);

  res.json(campaigns);
});

campaignRouter.get('/:campaignId', async (req, res) => {
  // TODO: add input validation with Zod
  const campaign = await db('Campaigns')
    .select([
      'id',
      'name',
      'description',
      'goal',
      'amount',
      'status',
      'expiration_date',
    ])
    .where({ id: req.params.campaignId });

  res.json(campaign);
});

export default campaignRouter;
