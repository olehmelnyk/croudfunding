async function up(knex) {
  return knex.schema.createTable('DonationsStates', function (table) {
    table.string('state').unique().notNullable(); // ex. valid, invalid
  });
}

async function down(knex) {
  return knex.schema.dropTable('DonationsStates');
}

module.exports = { up, down };
