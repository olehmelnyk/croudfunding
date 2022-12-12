async function up(knex) {
  return knex.schema.createTable('Campaigns', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.text('name').notNullable();
    table.text('description').nullable();
    table.float('goal', 14, 2).notNullable();
    table.float('amount', 14, 2).notNullable();
    table
      .string('fiat_currency')
      .references('name')
      .inTable('FiatCurrencies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .string('crypto_currency_name')
      .references('name')
      .inTable('CryptoCurrencies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.float('crypto_currency_amount', null).notNullable();
    table
      .string('status')
      .references('campaign_status')
      .inTable('CampaignStatuses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo('active');
    table.date('expiration_date').notNullable();
    table
      .uuid('owner_id')
      .references('id')
      .inTable('CampaignOwners')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

async function down(knex) {
  return knex.schema.dropTable('Campaigns');
}

module.exports = { up, down };
