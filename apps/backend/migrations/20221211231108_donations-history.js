async function up(knex) {
  return knex.schema.createTable('DonationsHistory', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.float('amount', 2, 2).checkPositive().notNullable();
    table
      .string('fiat_currency')
      .references('name')
      .inTable('FiatCurrencies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('nickname').notNullable();
    table
      .string('state')
      .references('state')
      .inTable('DonationsStates')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

async function down(knex) {
  return knex.schema.dropTable('DonationsHistory');
}

module.exports = { up, down };
