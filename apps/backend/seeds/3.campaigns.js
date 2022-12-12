const { faker } = require('@faker-js/faker');

module.exports.seed = async function (knex) {
  // Deletes ALL existing entries
  //   await knex('CampaignOwners').del();
  //   await knex('CampaignOwnerWallets').del();
  //   await knex(`Campaigns`).del();

  // create 10 owners
  const owners = Array.from({ length: 10 }, () => ({
    user_name: faker.internet.userName(),
  }));

  // create owners
  await knex('CampaignOwners').insert(owners).onConflict('user_name').ignore();

  const ownerIds = (await knex('CampaignOwners').select('id')).map(
    ({ id }) => id
  );

  // console.log('ownerIds', ownerIds);

  // create 30 wallets for owners
  const campaignOwnerWallets = Array.from({ length: 30 }, () => ({
    owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
    crypto_name: faker.helpers.arrayElement([
      'DOGE',
      'SHIB',
      'KEEP',
      'DOT',
      'LTC',
      'BTC',
    ]),
    crypto_wallet_address: faker.random.alphaNumeric(64),
  }));

  // console.log(campaignOwnerWallets);

  await knex('CampaignOwnerWallets').insert(campaignOwnerWallets);

  const campaigns = Array.from({ length: 1000 }, () => ({
    name: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(),
    goal: faker.datatype.number({ min: 1000, max: 1000000, precision: 0.01 }), // 36.94
    amount: 0,
    fiat_currency: faker.helpers.arrayElement(['USD', 'EUR', 'UAH']),
    crypto_currency_name: faker.helpers.arrayElement([
      'DOGE',
      'SHIB',
      'KEEP',
      'DOT',
      'LTC',
      'BTC',
    ]),
    crypto_currency_amount: 0,
    status: 'active',
    expiration_date: faker.date.soon(30),
    owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)]
  }));

  // console.log(campaigns);

  await knex('Campaigns').insert(campaigns);
};
