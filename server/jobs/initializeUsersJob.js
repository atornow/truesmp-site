// initializeUserStats.js
const { fetchUniqueUsers } = require('./fetchUsersFromCoreProtect');
const { users } = require('../models');
const { getStats } = require('./StatsCalculator');
const { updatePlaytimes } = require('./PlaytimeCalculator');

async function initializeUserStats() {
  console.log('Fetching unique users from CoreProtect');
  const uniqueUsers = await fetchUniqueUsers();
  const userPromises = uniqueUsers.map(async (username) => {
    try {
      const [user, created] = await users.findOrCreate({
        where: { username },
        defaults: { password: null },
      });
      if (created) {
        console.log(`Created user entry for ${username}`);
        const currentDate = new Date().toISOString().split('T')[0];
        const lastUpdateDate = user.lastUpdate.toISOString().split('T')[0];
        const currentTime = Math.floor(Date.now() / 1000);
        const lastUpdateTime = Math.floor(user.lastUpdate.getTime() / 1000);
        const lookback = currentTime - lastUpdateTime;

        const [entitiesKilled, blocksPlaced, blocksMined] = await Promise.all([
          getStats(user.username, 64, 3, lookback),
          getStats(user.username, 996, 1, lookback),
          getStats(user.username, 996, 0, lookback),
        ]);

        await user.update({
          entitiesKilled,
          blocksPlaced,
          blocksMined,
        });
      }
      if (!user.username.startsWith('#')) {
        const updatedPlaytimes = await updatePlaytimes(user.username, user.lastUpdate.toISOString().split('T')[0], user.playtimes || []);
        await user.update({
          playtimes: updatedPlaytimes,
          lastUpdate: new Date(),
        });
      }
    } catch (error) {
      console.error(`Error processing user entry for ${username}:`, error);
    }
  });

  await Promise.all(userPromises);
  console.log('User processing completed');
}



module.exports = { initializeUserStats };