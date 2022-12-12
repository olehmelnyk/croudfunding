module.exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('DonationsHistory').del();

  // TODO: get list of active campaigns and it's ids

  // await knex('DonationsHistory').insert([
  //   {
  //     amount: 100.54,
  //     fiat_currency: 'USD',
  //     nickname: 'John',
  //     state: 'valid',
  //     campaign: '',
  //   },
  // ]);
};
