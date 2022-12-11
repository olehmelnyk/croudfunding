async function up(knex) {
  return knex.schema.createTable('Campaigns', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name').unique().notNullable();
    table.string('description').nullable();
    table.float('goal', 2, 2).checkPositive().notNullable();
    table.float('amount', 2, 2).checkPositive().notNullable();
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
    table.float('crypto_currency_amount', null).checkPositive().notNullable();
    table
      .string('status')
      .references('campaign_status')
      .inTable('CampaignStatuses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.date('expiration_date').notNullable();
    table.timestamps(true, true);
  });
}

async function down(knex) {
  return knex.schema.dropTable('Campaigns');
}

module.exports = { up, down };
