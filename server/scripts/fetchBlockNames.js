const mysql = require('mysql2/promise');
const pool = require('../db');

async function fetchBlockNames() {
  const connection = await pool.promise().getConnection();
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
    connection.release();
  }
}

module.exports = { fetchBlockNames };