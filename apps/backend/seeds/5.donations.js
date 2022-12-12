const { faker } = require('@faker-js/faker');

module.exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('DonationsHistory').del();

  const activeCampaigns = (
    await knex('Campaigns').select('id').where('status', 'active')
  ).map(({ id }) => id);

  // console.log('activeCampaigns', activeCampaigns);

  const donations = Array.from({ length: 10000 }, () => ({
    amount: faker.datatype.number({ min: 10, max: 50000, precision: 0.01 }),
    fiat_currency: faker.helpers.arrayElement(['USD', 'EUR', 'UAH']),
    nickname: faker.internet.userName(),
    state: 'valid',
    campaign:
      activeCampaigns[Math.floor(Math.random() * activeCampaigns.length)],
  }));

  await knex('DonationsHistory').insert(donations);
};
