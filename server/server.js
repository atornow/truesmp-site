const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const cron = require('node-cron');
const { getTotalMined } = require('./scripts/coreProtectDataAggregator');
const { getStats } = require('./scripts/StatsCalculator');
const { getPlaytime } = require('./scripts/PlaytimeCalculator');
const { fetchUniqueUsers } = require('./scripts/fetchUsersFromCoreProtect')
const { users } = require('./models');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('Hello World!'));

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

cron.schedule('*/1 * * * *', async () => { // Run every 5 min
  console.log('Cron job started');
  const userR = await users.findOne({ where: { username: 'RamenLover' } });
  const userKilledStatR = await getStats(userR.username, 64, 3)
  await userR.update({ userKilledStats: userKilledStatR })
  const allUsers = await users.findAll();
  for (const user of allUsers) {
    if (!user.username.startsWith('#')) {
      const newPlaytimes = await getPlaytime(user.username);
      const playtimesArray = JSON.parse(newPlaytimes);
      const userKilledStat = await getStats(user.username, 64, 3)
      const totalDirtMined = await getTotalMined(user.username, 'minecraft:dirt');
      const totalDiamondsMined = await getTotalMined(user.username, 'minecraft:deepslate_diamond_ore');
      await user.update({ totalDirtMined });
      await user.update({ totalDiamondsMined });
      await user.update({ playtimes: playtimesArray });
      await user.update({ userKilledStats: userKilledStat })
      console.log(`Updated ${user.username}: ${user.userKilledStats}`);
    }
  }
});

cron.schedule('*/5 * * * *', async () => { // Run every 5 min
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



