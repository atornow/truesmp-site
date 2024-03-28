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
           generated_dates.play_date,
           COALESCE(
             SUM(
               CASE
                 WHEN action = 1 THEN
                   COALESCE(
                     (SELECT time
                      FROM s4_coreprotect.co_session AS s2
                      WHERE s2.user = s1.user AND
                            s2.action = 0 AND
                            s2.time > s1.time AND
                            DATE(FROM_UNIXTIME(s2.time)) = DATE(FROM_UNIXTIME(s1.time))
                      LIMIT 1),
                     UNIX_TIMESTAMP(NOW())
                   ) - time
                 ELSE 0
               END
             ),
             0
           ) AS playtime
         FROM
           (SELECT ADDDATE('1970-01-01', t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) play_date FROM
            (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,
            (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,
            (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,
            (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3,
            (SELECT 0 i UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) generated_dates
         LEFT JOIN
           s4_coreprotect.co_session AS s1 ON DATE(FROM_UNIXTIME(s1.time)) = generated_dates.play_date AND
                                               s1.user = (
                                                           SELECT rowid
                                                           FROM s4_coreprotect.co_user
                                                           WHERE user = ?
                                                         )
         WHERE
           generated_dates.play_date BETWEEN (SELECT MIN(DATE(FROM_UNIXTIME(time))) FROM s4_coreprotect.co_session WHERE user = (SELECT rowid FROM s4_coreprotect.co_user WHERE user = ?))
           AND
           (SELECT MAX(DATE(FROM_UNIXTIME(time))) FROM s4_coreprotect.co_session WHERE user = (SELECT rowid FROM s4_coreprotect.co_user WHERE user = ?))
         GROUP BY
           generated_dates.play_date) AS daily_playtime;
`,
      [username, username, username]
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