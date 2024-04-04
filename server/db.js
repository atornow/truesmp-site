// db.js
const mysql = require('mysql2');

const coreProtectDBConfig = {
  host: process.env.COREPROTECT_DB_HOST,
  port: process.env.COREPROTECT_DB_PORT,
  user: process.env.COREPROTECT_DB_USER,
  password: process.env.COREPROTECT_DB_PASSWORD,
  database: process.env.COREPROTECT_DB_NAME,
  connectionLimit: 10, // Adjust the connection limit as needed
};

const pool = mysql.createPool(coreProtectDBConfig);

module.exports = pool;