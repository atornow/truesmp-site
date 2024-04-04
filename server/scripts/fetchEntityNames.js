const mysql = require('mysql2/promise');
const pool = require('../db');

async function fetchEntityNames() {
  const connection = await pool.promise().getConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT id - 1 AS id, entity FROM s4_coreprotect.co_entity_map ORDER BY id;'
    );

    const entityNames = rows.map(row => row.entity.replace(/^minecraft:/, ''));
    return entityNames;
  } catch (error) {
    console.error('Error fetching entity names:', error);
    return [];
  } finally {
    connection.release();
  }
}

module.exports = { fetchEntityNames };