const { teamsPool } = require('../db');

async function fetchTeamName(uuid) {
  const connection = await teamsPool.promise().getConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT bt.name AS teamName
       FROM s4_teams.BetterTeams_Players AS bp
       JOIN s4_teams.BetterTeams_Team AS bt ON bp.teamID = bt.teamID
       WHERE bp.playerUUID = ?`,
      [uuid]
    );

    return rows.length > 0 ? rows[0].teamName : 'No Team';
  } catch (error) {
    console.error('Error fetching team name:', error);
    return 'No Team';
  } finally {
    connection.release();
  }
}

module.exports = { fetchTeamName };