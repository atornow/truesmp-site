const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const cron = require('node-cron');
const { getStats } = require('./scripts/StatsCalculator');
const { getPlaytime } = require('./scripts/PlaytimeCalculator');
const { fetchUniqueUsers } = require('./scripts/fetchUsersFromCoreProtect')
const { users } = require('./models');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Main stat update loop, run every minute for testing.
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

// Run every 60 min, get new users based on co_users values.
cron.schedule('*/60 * * * *', async () => {
  console.log('Fetching unique users from CoreProtect');
  const uniqueUsers = await fetchUniqueUsers();
  for (const username of uniqueUsers) {
    try {
      const [user, created] = await users.findOrCreate({
        where: { username },
        defaults: { password: null },
      });
      if (created) {
        console.log(`Created user entry for ${username}`);
      }
    } catch (error) {
      console.error(`Error creating user entry for ${username}:`, error);
    }
  }
});



