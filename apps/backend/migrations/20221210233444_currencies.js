async function up(knex) {
  return knex.schema
    .createTable('FiatCurrencies', function (table) {
      table.increments('id');
      table.string('name', 3).unique().notNullable(); // ex. USD, EUR, etc.
    })
    .createTable('CryptoCurrencies', function (table) {
      table.increments('id');
      table.string('name', 20).unique().notNullable(); // ex. DOGE, ETH, BTC, etc.
      table.string('exchange_rate', 30).notNullable(); // ex. "26417.078189300411581808"
    });
}

async function down(knex) {
  return knex.schema.dropTable('FiatCurrencies').dropTable('CryptoCurrencies');
}

module.exports = { up, down };
