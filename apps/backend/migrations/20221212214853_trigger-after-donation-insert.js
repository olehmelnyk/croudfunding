async function up(knex) {
  return Promise.all([
    knex.schema.raw(`DROP TRIGGER IF EXISTS after_donation_insert;`),
    knex.schema.raw(`CREATE TRIGGER after_donation_insert AFTER INSERT
    ON DonationsHistory
    FOR EACH ROW
    BEGIN
        UPDATE Campaigns
        SET amount = Campaigns.amount + new.amount
        WHERE new.campaign = Campaigns.id;
    END`),
  ]);
}

async function down(knex) {
  return Promise.all([
    knex.schema.raw(`DROP TRIGGER IF EXISTS after_donation_insert;`),
  ]);
}

module.exports = { up, down };
