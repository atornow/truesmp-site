const mysql = require('mysql2');

const coreProtectDBConfig = {
  host: process.env.COREPROTECT_DB_HOST,
  port: process.env.COREPROTECT_DB_PORT,
  user: process.env.COREPROTECT_DB_USER,
  password: process.env.COREPROTECT_DB_PASSWORD,
  database: process.env.COREPROTECT_DB_NAME,
  connectionLimit: 10,
};

const teamsDBConfig = {
  host: process.env.TEAMS_DB_HOST,
  port: process.env.TEAMS_DB_PORT,
  user: process.env.TEAMS_DB_USER,
  password: process.env.TEAMS_DB_PASSWORD,
  database: process.env.TEAMS_DB_NAME,
  connectionLimit: 10,
};

const coreProtectPool = mysql.createPool(coreProtectDBConfig);
const teamsPool = mysql.createPool(teamsDBConfig);

module.exports = {
  coreProtectPool,
  teamsPool,
};