const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST ||'db',
  database: process.env.DB_NAME || 'db123',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
