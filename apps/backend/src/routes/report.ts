import * as express from 'express';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

import db from '../config/db';

const reportRouter = express.Router();

reportRouter.patch(
  '/fraud/:campaignOwnerId',
  validateRequest({
    params: z.object({
      campaignOwnerId: z.string().uuid(),
    }),
  }),
  async (req, res) => {
    const result = await db('Campaigns')
      .update('status', 'fraud')
      .where({ owner_id: req.params.campaignOwnerId });

    res.json(result);
  }
);

export default reportRouter;
