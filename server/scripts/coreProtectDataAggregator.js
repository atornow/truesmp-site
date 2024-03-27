// scripts/coreProtectDataAggregator.js
const mysql = require('mysql2/promise');

const coreProtectDBConfig = {
  host: process.env.COREPROTECT_DB_HOST,
  port: process.env.COREPROTECT_DB_PORT,
  user: process.env.COREPROTECT_DB_USER,
  password: process.env.COREPROTECT_DB_PASSWORD,
  database: process.env.COREPROTECT_DB_NAME,
};

// Example function to get total dirt blocks mined for a specific user
async function getTotalMined(username, block) {
  const connection = await mysql.createConnection(coreProtectDBConfig);
  try {
    const [rows] = await connection.execute(
      "SELECT COUNT(*) AS totalMined FROM s4_coreprotect.co_block WHERE type = (SELECT rowid FROM s4_coreprotect.co_material_map WHERE material = ?) AND action = 0 AND user = (SELECT rowid FROM s4_coreprotect.co_user WHERE user = ?);",
      [block, username]
    );
    return rows[0].totalMined;
  } catch (error) {
    console.error(error);
    return 0;
  } finally {
    await connection.end();
  }
}

module.exports = { getTotalMined };
