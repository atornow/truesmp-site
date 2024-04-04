const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const statUpdateJob = require('./cron/statUpdateJob');
const userFetchJob = require('./cron/userFetchJob');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const app = express();
const { users } = require('./models');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);

async function createDefaultUser() {
  try {
    const username = 'lsnaz';
    const password = 'test';

    // Check if the user already exists
    const existingUser = await users.findOne({ where: { username } });

    if (existingUser) {
      await existingUser.update({
              password: null,
              isVerified: true,
              lastUpdate: new Date(0),
            });
      console.log('Default user already exists, updating pw');
    } else {
      await users.create({
        username,
        isVerified: true,
        lastUpdate: new Date(0),
      });

    }
  } catch (error) {
    console.error('Error creating default user:', error);
  }
}



sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

createDefaultUser();
statUpdateJob();
userFetchJob();




