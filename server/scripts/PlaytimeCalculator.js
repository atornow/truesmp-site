const pool = require('../db');

async function calculatePlaytime(username, dateStr) {
  const connection = await pool.promise().getConnection();
  try {
    console.log(`Calculating playtime for ${username} on ${dateStr}`);

    const query = `
      SELECT
        COALESCE(SUM(
          CASE
            WHEN start_time < UNIX_TIMESTAMP(?) AND end_time > UNIX_TIMESTAMP(?) THEN
              LEAST(end_time, UNIX_TIMESTAMP(DATE_ADD(?, INTERVAL 1 DAY))) - UNIX_TIMESTAMP(?)
            WHEN start_time >= UNIX_TIMESTAMP(?) AND end_time <= UNIX_TIMESTAMP(DATE_ADD(?, INTERVAL 1 DAY)) THEN
              end_time - start_time
            WHEN start_time >= UNIX_TIMESTAMP(?) AND end_time > UNIX_TIMESTAMP(DATE_ADD(?, INTERVAL 1 DAY)) THEN
              CASE
                WHEN CURDATE() = ? THEN UNIX_TIMESTAMP() - start_time
                ELSE UNIX_TIMESTAMP(DATE_ADD(?, INTERVAL 1 DAY)) - start_time
              END
            ELSE 0
          END
        ), 0) AS playtime
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
            CASE
              WHEN CURDATE() = ? THEN UNIX_TIMESTAMP()
              ELSE UNIX_TIMESTAMP(DATE_ADD(?, INTERVAL 1 DAY))
            END
          ) AS end_time
        FROM
          s4_coreprotect.co_session AS s1
        WHERE
          s1.user = (
            SELECT rowid
            FROM s4_coreprotect.co_user
            WHERE user = ?
          ) AND
          s1.action = 1 AND
          s1.time < CASE
                      WHEN CURDATE() = ? THEN UNIX_TIMESTAMP()
                      ELSE UNIX_TIMESTAMP(DATE_ADD(?, INTERVAL 1 DAY))
                    END
        ) AS sessions;
    `;

    const [result] = await connection.execute(query, [
      dateStr, dateStr, dateStr, dateStr, dateStr, dateStr, dateStr, dateStr, dateStr, dateStr, dateStr, dateStr, username, dateStr, dateStr
    ]);

    const playtime = result[0].playtime;
    console.log(`Total playtime for ${dateStr}: ${playtime} seconds`);

    return playtime;
  } catch (error) {
    console.error('Error calculating playtime:', error);
    return 0;
  } finally {
    connection.release();
  }
}

function getNextDate(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

async function updatePlaytimes(username, lastUpdate, existingPlaytimes = []) {
  const currentDate = new Date().toISOString().split('T')[0];

  console.log(`Updating playtimes for ${username} from ${lastUpdate} to ${currentDate}`);

  const updatedPlaytimes = Array.isArray(existingPlaytimes) ? [...existingPlaytimes] : [];
  let processDate = lastUpdate;

  while (processDate <= currentDate) {
    console.log(`Processing playtime for ${processDate}`);
    const playtime = await calculatePlaytime(username, processDate);

    if (processDate === lastUpdate) {
      if (updatedPlaytimes.length > 0) {
        updatedPlaytimes[updatedPlaytimes.length - 1] = playtime;
      } else {
        updatedPlaytimes.push(playtime);
      }
    } else {
      updatedPlaytimes.push(playtime);
    }

    processDate = getNextDate(processDate);
  }

  console.log('Updated playtimes:', updatedPlaytimes);

  return updatedPlaytimes;
}

module.exports = { updatePlaytimes };