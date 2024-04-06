const { coreProtectPool } = require('../db');

async function getStats(username, mapSize, action, lookback) {
  const connection = await coreProtectPool.promise().getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT
         TYPE,
         SUM(CASE WHEN s4_coreprotect.co_block.time >= UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL ? SECOND)) AND action = ? THEN 1 ELSE 0 END) AS type_count
       FROM
         s4_coreprotect.co_block
       JOIN
         s4_coreprotect.co_user ON s4_coreprotect.co_block.user = s4_coreprotect.co_user.rowid
       WHERE
         s4_coreprotect.co_user.user = ?
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