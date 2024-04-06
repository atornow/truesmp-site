const cron = require('node-cron');
const { getStats } = require('../scripts/StatsCalculator');
const { updatePlaytimes } = require('../scripts/PlaytimeCalculator');
const { users } = require('../models');
const { updateChallengeProgress } = require('../scripts/updateChallengeProgress');

module.exports = () => {
  cron.schedule('*/10 * * * *', async () => {
    console.log('Cron job started');

    const allUsers = await users.findAll();
    const updatePromises = allUsers.map(async (user) => {
      if (!user.username.startsWith('#')) {
        const currentDate = new Date().toISOString().split('T')[0];
        const lastUpdateDate = user.lastUpdate.toISOString().split('T')[0];
        const updatedPlaytimes = await updatePlaytimes(user.username, lastUpdateDate, user.playtimes);

        const currentTime = Math.floor(Date.now() / 1000);
        const lastUpdateTime = Math.floor(user.lastUpdate.getTime() / 1000);
        const lookback = currentTime - lastUpdateTime;

        const [newEntitiesKilled, newBlocksPlaced, newBlocksMined] = await Promise.all([
          getStats(user.username, 64, 3, lookback),
          getStats(user.username, 996, 1, lookback),
          getStats(user.username, 996, 0, lookback),
        ]);

        await user.update({
          playtimes: updatedPlaytimes,
          entitiesKilled: user.entitiesKilled.map((value, index) => Number(value) + Number(newEntitiesKilled[index])),
          blocksPlaced: user.blocksPlaced.map((value, index) => Number(value) + Number(newBlocksPlaced[index])),
          blocksMined: user.blocksMined.map((value, index) => Number(value) + Number(newBlocksMined[index])),
          lastUpdate: new Date(),
        });
      }
    });
    await Promise.all(updatePromises);

    const activeChallenges = await challenges.findAll({
        where: {
          startDate: { [Op.lte]: new Date() },
          endDate: { [Op.gte]: new Date() },
        },
      });
    await Promise.all(activeChallenges.map((challenge) => updateChallengeProgress(challenge.id)));

    console.log('Cron job completed');
  });
};