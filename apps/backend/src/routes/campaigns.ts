import * as express from 'express';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

import db from '../config/db';

const campaignRouter = express.Router();

campaignRouter.get(
  '/',
  validateRequest({
    query: z.object({
      status: z.enum(['active', 'expired', 'fraud', 'successful']).optional(), // probably we should get those values from DB - Redis or MySQL
      perPage: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine((n) => n >= 3 && n <= 100)
        .optional(),
      page: z
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine((n) => n >= 1)
        .optional(),
    }),
  }),
  async (req, res) => {
    const PER_PAGE = 10;
    const status = req.query.status || 'active';

    const campaigns = await db('Campaigns')
      .select([
        'id',
        'name',
        'description',
        'goal',
        'amount',
        'status',
        'expiration_date',
        'fiat_currency'
      ])
      .where({ status })
      .limit(Math.min(100, Number(req.query.perPage) || PER_PAGE))
      .offset(PER_PAGE * Number(req.query.page) || 1);

    res.json(campaigns);
  }
);

campaignRouter.get(
  '/:campaignId',
  validateRequest({
    params: z.object({
      campaignId: z.string().uuid(),
    }),
  }),
  async (req, res) => {
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
  }
);

export default campaignRouter;
