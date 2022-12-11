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

  // TODO: create campaigns
};
