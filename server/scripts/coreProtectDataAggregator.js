// scripts/coreProtectDataAggregator.js
const mysql = require('mysql2/promise');

const coreProtectDBConfig = {
  host: '89.117.74.38', // The host address without the port
  port: 3306, // The port, specified separately. This line can be omitted if it's indeed the default MySQL port
  user: 'u4_V39TX6itW0', // Your database username
  password: 'J768R=E5Yjdww^@avZkU5JYQ', // Your database password
  database: 's4_coreprotect', // Your CoreProtect database name
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
