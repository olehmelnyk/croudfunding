import * as express from 'express';

import db from '../config/db';

const currencyRouter = express.Router();

currencyRouter.get('/fiat', async (req, res) => {
  const fiatCurrencies = ((await db('FiatCurrencies').select('name'))).map(({name}) => name);

  res.json(fiatCurrencies);
});

currencyRouter.get('/crypto', async (req, res) => {
  const cryptoCurrencies = (await db('CryptoCurrencies').select('name')).map(({name}) => name);

  res.json(cryptoCurrencies);
});

export default currencyRouter;
