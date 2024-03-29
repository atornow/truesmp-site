const mysql = require('mysql2/promise');

const coreProtectDBConfig = {
  host: process.env.COREPROTECT_DB_HOST,
  port: process.env.COREPROTECT_DB_PORT,
  user: process.env.COREPROTECT_DB_USER,
  password: process.env.COREPROTECT_DB_PASSWORD,
  database: process.env.COREPROTECT_DB_NAME,
};

async function getPlaytime(username) {
  const connection = await mysql.createConnection(coreProtectDBConfig);
  try {
    const [rows] = await connection.execute(
      `SELECT
         JSON_ARRAYAGG(COALESCE(playtime, 0) ORDER BY play_date DESC) AS playtime_array
       FROM
         (SELECT
           DATE(FROM_UNIXTIME(start_time)) AS play_date,
           COALESCE(SUM(end_time - start_time), 0) AS playtime
         FROM
           (SELECT
             s1.time AS start_time,
             COALESCE(
               (SELECT s2.time
                FROM s4_coreprotect.co_session AS s2
                WHERE s2.user = s1.user AND
                      s2.action = 0 AND
                      s2.time > s1.time
                ORDER BY s2.time
                LIMIT 1),
               UNIX_TIMESTAMP()
             ) AS end_time
           FROM
             s4_coreprotect.co_session AS s1
           WHERE
             s1.user = (
               SELECT rowid
               FROM s4_coreprotect.co_user
               WHERE user = ?
             ) AND
             s1.action = 1
           ) AS sessions
         GROUP BY
           play_date) AS daily_playtime;
      `,
      [username]
    );

    if (rows.length > 0) {
      return rows[0].playtime_array;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await connection.end();
  }
}

module.exports = { getPlaytime };