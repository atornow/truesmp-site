const mysql = require('mysql2/promise');
const pool = require('../db');

async function getStats(username, mapSize, action, lookback) {
  const connection = await pool.promise().getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT
         TYPE,
         SUM(CASE WHEN time >= UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL ? SECOND)) AND action = ? THEN 1 ELSE 0 END) AS type_count
       FROM
         s4_coreprotect.co_block
       WHERE
         user = (SELECT rowid FROM s4_coreprotect.co_user WHERE user = ?)
         AND TYPE <= ?
       GROUP BY
         TYPE
       ORDER BY
         TYPE;`,
      [lookback, action, username, mapSize]
    );

    const result = Array(mapSize + 1).fill(0); // Initialize an array of size mapSize + 1 with 0 values
    rows.forEach(row => {
      result[row.TYPE] = row.type_count;
    });

    return result;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    connection.release();
  }
}

module.exports = { getStats };