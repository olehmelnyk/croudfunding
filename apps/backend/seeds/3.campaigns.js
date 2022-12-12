module.exports.seed = async function (knex) {
  // Deletes ALL existing entries
  //   await knex('CampaignOwners').del();
  //   await knex('CampaignOwnerWallets').del();
  //   await knex(`Campaigns`).del();

  // create owners
  await knex('CampaignOwners')
    .insert([
      { user_name: 'john_doe' },
      { user_name: 'kate_smith' },
      { user_name: 'darth_wader' },
    ])
    .onConflict('user_name')
    .ignore();

  const ownerIds = (await knex('CampaignOwners').select('id')).map(
    ({ id }) => id
  );

  console.log('ownerIds', ownerIds);

  // TODO: create owners wallets
  await knex('CampaignOwnerWallets').insert([
    {
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      crypto_name: 'BTC',
      crypto_wallet_address: '' + Date.now() + Math.random(),
    },
    {
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      crypto_name: 'BTC',
      crypto_wallet_address: '' + Date.now() + Math.random(),
    },
    {
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      crypto_name: 'BTC',
      crypto_wallet_address: '' + Date.now() + Math.random(),
    },
    {
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      crypto_name: 'BTC',
      crypto_wallet_address: '' + Date.now() + Math.random(),
    },
    {
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      crypto_name: 'BTC',
      crypto_wallet_address: '' + Date.now() + Math.random(),
    },
    {
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      crypto_name: 'BTC',
      crypto_wallet_address: '' + Date.now() + Math.random(),
    },
    {
      owner_id: ownerIds[Math.floor(Math.random() * ownerIds.length)],
      crypto_name: 'BTC',
      crypto_wallet_address: '' + Date.now() + Math.random(),
    },
  ]);

  // TODO: create campaigns
};
