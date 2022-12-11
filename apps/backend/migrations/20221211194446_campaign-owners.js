async function up(knex) {
  return knex.schema.createTable('CampaignOwners', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('user_name').unique().notNullable();
    table.timestamps(true, true);
  });
}

async function down(knex) {
  return knex.schema.dropTable('CampaignOwners');
}

module.exports = { up, down };
