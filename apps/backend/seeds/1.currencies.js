module.exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('FiatCurrencies')
    .del()
    .then(function () {
      return knex('FiatCurrencies').insert([
        { name: 'USD' },
        { name: 'EUR' },
        { name: 'UAH' },
      ]);
    });

  await knex('CryptoCurrencies')
    .del()
    .then(function () {
      return knex('CryptoCurrencies').insert([
        { name: 'DOGE', exchange_rate: '13046.133523015953696161' },
        { name: 'SHIB', exchange_rate: '138050537.634408602150561103' },
        { name: 'KEEP', exchange_rate: '14534.8837209302325581' },
        { name: 'DOT', exchange_rate: '235.897106109324801127' },
        { name: 'LTC', exchange_rate: '16.593899444229073778' },
        { name: 'BTC', exchange_rate: '0.074435' },
      ]);
    });
};
