module.exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('DonationsStates').del();

    await knex('DonationsStates').insert([
      { state: 'valid' },
      { state: 'invalid' },
    ]);
  };
