const mysql = require('mysql2/promise');

const coreProtectDBConfig = {
  host: process.env.COREPROTECT_DB_HOST,
  port: process.env.COREPROTECT_DB_PORT,
  user: process.env.COREPROTECT_DB_USER,
  password: process.env.COREPROTECT_DB_PASSWORD,
  database: process.env.COREPROTECT_DB_NAME,
};

async function fetchEntityNames() {
  const connection = await mysql.createConnection(coreProtectDBConfig);
  try {
    const [rows] = await connection.execute(
      'SELECT id - 1 AS id, entity FROM s4_coreprotect.co_entity_map ORDER BY id;'
    );

    const entityNames = rows.map(row => row.entity);
    return entityNames;
  } catch (error) {
    console.error('Error fetching entity names:', error);
    return [];
  } finally {
    await connection.end();
  }
}

module.exports = { fetchEntityNames };