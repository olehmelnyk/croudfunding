import { knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
// this connection is used to fetch data (CRUD) from DB
export const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  },
});

export default db;