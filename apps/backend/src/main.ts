/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import campaignRouter from './routes/campaigns';
import currencyRouter from './routes/currency';
import reportRouter from './routes/report';
import donateRouter from './routes/donate';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/campaigns', campaignRouter);
app.use('/api/currency', currencyRouter);
app.use('/api/report', reportRouter);
app.use('/api/donate', donateRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
