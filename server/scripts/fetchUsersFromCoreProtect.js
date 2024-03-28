const mysql = require('mysql2/promise');

const coreProtectDBConfig = {
  host: process.env.COREPROTECT_DB_HOST,
  port: process.env.COREPROTECT_DB_PORT,
  user: process.env.COREPROTECT_DB_USER,
  password: process.env.COREPROTECT_DB_PASSWORD,
  database: process.env.COREPROTECT_DB_NAME,
};

async function fetchUniqueUsers() {
  const connection = await mysql.createConnection(coreProtectDBConfig);
  try {
    const [rows] = await connection.execute(
      'SELECT DISTINCT user FROM s4_coreprotect.co_user'
    );
    const uniqueUsers = rows.map(row => row.user);
    console.log('Unique users:', uniqueUsers); // Add this line
    return uniqueUsers;
  } catch (error) {
    console.error('Error fetching unique users:', error);
    return [];
  } finally {
    await connection.end();
  }
}

module.exports = { fetchUniqueUsers };