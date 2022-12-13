import * as express from 'express';

import db from '../config/db';

const reportRouter = express.Router();

reportRouter.patch('/fraud/:campaignOwnerId', async (req, res) => {
  const result = await db('Campaigns')
    .update('status', 'fraud')
    .where({ owner_id: req.params.campaignOwnerId });

  res.json(result);
});

export default reportRouter;
