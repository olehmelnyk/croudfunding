import { knex } from 'knex';

export const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root', // MYSQL_USER,
    password: 'db_croudfunding_root_password', // MYSQL_PASSWORD,
    database: 'db_croudfunding_name', // MYSQL_DATABASE,
  },
});

export default db;