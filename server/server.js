const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const cron = require('node-cron');
const { getTotalMined } = require('./scripts/coreProtectDataAggregator');
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

cron.schedule('*/45 * * * * *', async () => {
  console.log('Cron job started'); // For debugging
  // Fetch all users
  const allUsers = await users.findAll(); // Variable name changed to avoid shadowing
  for (const user of allUsers) {
    // Update total dirt mined for each user
    const totalDirtMined = await getTotalMined(user.username, 'minecraft:dirt');
    const totalDiamondsMined = await getTotalMined(user.username, 'minecraft:deepslate_diamond_ore');
    await user.update({ totalDirtMined }); // Ensure the update is awaited
    await user.update({ totalDiamondsMined });
    console.log(`Updated ${user.username}: ${user.isVerified}`); // Moved inside loop for clarity
  }
});



