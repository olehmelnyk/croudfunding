import * as express from 'express';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

import db from '../config/db';

const donateRouter = express.Router();

donateRouter.post(
  '/:campaignId',
  validateRequest({
    body: z.object({
      amount: z.number().refine((n) => n >= 0),
      fiat_currency: z.string().regex(/^[A-Z]{3}$/),
      nickname: z.string().regex(/^[a-z0-9_]{3,}$/i),
    }),
    params: z.object({
      campaignId: z.string().uuid(),
    }),
  }),
  async (req, res) => {
    const { amount, fiat_currency, nickname } = req.body;

    // MySQL does not return data/id on insert
    const donation = {
      amount,
      fiat_currency,
      nickname,
      state: 'valid', // not specified when state is invalid
      campaign: req.params.campaignId,
    };

    await db('DonationsHistory').insert(donation);

    res.status(201).json({ success: true, ...donation });
  }
);

export default donateRouter;
