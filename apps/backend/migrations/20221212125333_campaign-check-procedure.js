async function up(knex) {
  return Promise.all([
    knex.schema.raw(`SET GLOBAL event_scheduler = ON;`),
    knex.schema.raw(`DROP PROCEDURE IF EXISTS campaigns_check_success;`),
    knex.schema.raw(`CREATE PROCEDURE campaigns_check_success()
BEGIN
  UPDATE Campaigns
      SET status = 'successful'
      WHERE status = 'active' AND amount >= goal;
END;`),
    knex.schema.raw(`DROP PROCEDURE IF EXISTS campaigns_check_expired;`),
    knex.schema.raw(`CREATE PROCEDURE campaigns_check_expired()
BEGIN
  UPDATE Campaigns
      SET status = 'expired'
      WHERE status = 'active' AND amount < goal AND CURDATE() >= expiration_date;
END;`),
    knex.schema.raw(`CREATE EVENT IF NOT EXISTS campaigns_check_success
ON SCHEDULE EVERY 10 SECOND
DO CALL campaigns_check_success();`),
    knex.schema.raw(`CREATE EVENT IF NOT EXISTS campaigns_check_expired
ON SCHEDULE EVERY 10 SECOND
DO CALL campaigns_check_expired();`),
  ]);
}

async function down(knex) {
  return Promise.all([
    knex.schema.raw(`SET GLOBAL event_scheduler = OFF;`),
    knex.schema.raw(`DROP PROCEDURE IF EXISTS campaigns_check_success;`),
    knex.schema.raw(`DROP PROCEDURE IF EXISTS campaigns_check_expired;`),
    knex.schema.raw(`DROP EVENT IF EXISTS campaigns_check_success;`),
    knex.schema.raw(`DROP EVENT IF EXISTS campaigns_check_expired;`),
  ]);
}

module.exports = { up, down };
