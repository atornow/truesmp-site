const cron = require('node-cron');
const { getStats } = require('../scripts/StatsCalculator');
const { getPlaytime } = require('../scripts/PlaytimeCalculator');
const { users } = require('../models');

module.exports = () => {
  cron.schedule('*/5 * * * *', async () => {
    console.log('Cron job started');

    // Run updates on all existing users.
    const allUsers = await users.findAll();
    for (const user of allUsers) {
      if (!user.username.startsWith('#')) {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const lastUpdateTime = Math.floor(user.lastUpdate.getTime() / 1000); // Last update time in seconds
        const lookback = currentTime - lastUpdateTime;

        const JSONPlaytimes = await getPlaytime(user.username);
        const playtimes = JSON.parse(JSONPlaytimes);

        const newEntitiesKilled = await getStats(user.username, 64, 3, lookback);
        const newBlocksPlaced = await getStats(user.username, 996, 1, lookback);
        const newBlocksMined = await getStats(user.username, 996, 0, lookback);
        await user.update({
          playtimes,
          entitiesKilled: user.entitiesKilled.map((value, index) => Number(value) + Number(newEntitiesKilled[index])),
          blocksPlaced: user.blocksPlaced.map((value, index) => Number(value) + Number(newBlocksPlaced[index])),
          blocksMined: user.blocksMined.map((value, index) => Number(value) + Number(newBlocksMined[index])),
          lastUpdate: new Date(),
        });
      }
    }
  });
}