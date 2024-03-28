const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const cron = require('node-cron');
const { getTotalMined } = require('./scripts/coreProtectDataAggregator');
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

cron.schedule('*/60 * * * * *', async () => {
  console.log('Cron job started'); // For debugging
  // Fetch all users
  const allUsers = await users.findAll(); // Variable name changed to avoid shadowing
  for (const user of allUsers) {
    // Update total dirt mined for each user
    const newPlaytimes = await getPlaytime(user.username);
    const playtimesArray = JSON.parse(newPlaytimes);
    console.log(`Updated ${user.username}: ${playtimesArray}`);
    const totalDirtMined = await getTotalMined(user.username, 'minecraft:dirt');
    const totalDiamondsMined = await getTotalMined(user.username, 'minecraft:deepslate_diamond_ore');
    await user.update({ totalDirtMined }); // Ensure the update is awaited
    await user.update({ totalDiamondsMined });
    await user.update({ playtimes: playtimesArray });
    console.log(`Updated ${user.username}: ${user.playtimes}`);
  }
});

cron.schedule('*/30 * * * * *', async () => { // Run every 30 seconds for testing
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



