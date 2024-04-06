const { coreProtectPool } = require('../db');

async function fetchEntityNames() {
  const connection = await coreProtectPool.promise().getConnection();
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