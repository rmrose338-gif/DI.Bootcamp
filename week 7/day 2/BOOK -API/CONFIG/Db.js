const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',          // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'book_db',       // Replace with your database name
  password: 'yourpassword',    // Replace with your password
  port: 5432,
});

module.exports = pool;