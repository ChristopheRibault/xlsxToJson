// Update with your config settings.
require('dotenv').config();
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_DATABASE,
      user: DB_USER,
      password: DB_PASSWORD,
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
