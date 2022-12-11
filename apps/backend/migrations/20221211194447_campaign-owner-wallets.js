async function up(knex) {
  return knex.schema.hasTable('CampaignOwnerWallets').then(function (exists) {
    if (!exists) {
      knex.schema.createTable('CampaignOwnerWallets', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table
          .uuid('owner_id')
          .references('id')
          .inTable('CampaignOwners')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .string('crypto_name')
          .references('name')
          .inTable('CryptoCurrencies')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('crypto_wallet_address').unique().notNullable();
        table.timestamps(true, true);
      });
    }
  });
}

async function down(knex) {
  return knex.schema.dropTable('CampaignOwnerWallets');
}

module.exports = { up, down };
