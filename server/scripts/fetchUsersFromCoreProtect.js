const { coreProtectPool } = require('../db');

async function fetchUniqueUsers() {
  const connection = await coreProtectPool.promise().getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT DISTINCT user FROM s4_coreprotect.co_user'
    );
    const uniqueUsers = rows.map(row => row.user);
    return uniqueUsers;
  } catch (error) {
    console.error('Error fetching unique users:', error);
    return [];
  } finally {
    connection.release();
  }
}

module.exports = { fetchUniqueUsers };