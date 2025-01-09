const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

console.log('Environment:', isProduction ? 'Production' : 'Development');

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : undefined,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  user: !isProduction ? process.env.DB_USER : undefined,
  host: !isProduction ? process.env.DB_HOST : undefined,
  database: !isProduction ? process.env.DB_NAME : undefined,
  password: !isProduction ? process.env.DB_PASSWORD : undefined,
  port: !isProduction ? process.env.DB_PORT : undefined,
});

// Add error handler
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test connection with more detailed logging
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = pool;