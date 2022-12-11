async function up(knex) {
  return knex.schema.createTable('CampaignStatuses', function (table) {
    table.string('campaign_status').unique().notNullable(); // ex. 'active', 'successful', 'expired', 'fraud'
  });
}

async function down(knex) {
  return knex.schema.dropTable('CampaignStatuses');
}

module.exports = { up, down };
