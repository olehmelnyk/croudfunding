module.exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('CampaignStatuses').del();

  await knex('CampaignStatuses').insert([
    { campaign_status: 'active' },
    { campaign_status: 'successful' },
    { campaign_status: 'expired' },
    { campaign_status: 'fraud' },
  ]);
};
