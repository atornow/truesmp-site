const cron = require('node-cron');
const { getStats } = require('../scripts/StatsCalculator');
const { getPlaytime } = require('../scripts/PlaytimeCalculator');
const { users } = require('../models');

module.exports = () => {
  cron.schedule('*/1 * * * *', async () => {
    console.log('Cron job started');

    // Run test user ahead for faster testing.
    const testUser = await users.findOne({ where: { username: 'RamenLover' } });
    const testEntitiesKilled = await getStats(testUser.username, 64, 3)
    const testBlocksPlaced = await getStats(testUser.username, 996, 1);
    const testBlocksMined = await getStats(testUser.username, 996, 0);
    const testJSONPlaytimes = await getPlaytime(testUser.username);
    const testPlaytimes = JSON.parse(testJSONPlaytimes);
    await testUser.update({ playtimes: testPlaytimes, entitiesKilled: testEntitiesKilled, blocksPlaced: testBlocksPlaced, blocksMined: testBlocksMined });

    // Run updates on all existing users.
    const allUsers = await users.findAll();
    for (const user of allUsers) {
      if (!user.username.startsWith('#')) {
        const JSONPlaytimes = await getPlaytime(user.username);
        const playtimes = JSON.parse(JSONPlaytimes);
        const entitiesKilled = await getStats(user.username, 64, 3)
        const blocksPlaced = await getStats(user.username, 996, 1);
        const blocksMined = await getStats(user.username, 996, 0);
        await user.update({ playtimes, entitiesKilled, blocksPlaced, blocksMined });
      }
    }
  });
}