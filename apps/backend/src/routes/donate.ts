import * as express from 'express';

import db from '../config/db';

const donateRouter = express.Router();

donateRouter.post('/:campaignId', async (req, res) => {
  // TODO: add input validation via Zod
  const { amount, fiat_currency, nickname } = req.body;

  const result = await db('DonationsHistory').insert({
    amount,
    fiat_currency,
    nickname,
    state: 'valid', // not specified when state is invalid
    campaign: req.params.campaignId,
  }).returning('id');

  res.status(201).json(result);
});

export default donateRouter;
