const mysql = require('mysql2/promise');

const coreProtectDBConfig = {
  host: process.env.COREPROTECT_DB_HOST,
  port: process.env.COREPROTECT_DB_PORT,
  user: process.env.COREPROTECT_DB_USER,
  password: process.env.COREPROTECT_DB_PASSWORD,
  database: process.env.COREPROTECT_DB_NAME,
};

async function fetchBlockNames() {
  const connection = await mysql.createConnection(coreProtectDBConfig);
  try {
    const [rows] = await connection.execute(
      'SELECT id - 1 AS id, material FROM s4_coreprotect.co_material_map ORDER BY id;'
    );

    const blockNames = rows.map(row => row.material.replace(/^minecraft:/, ''));
    return blockNames;
  } catch (error) {
    console.error('Error fetching block names:', error);
    return [];
  } finally {
    await connection.end();
  }
}

module.exports = { fetchBlockNames };