const cron = require('node-cron');
const { fetchUniqueUsers } = require('../scripts/fetchUsersFromCoreProtect');
const { users } = require('../models');

module.exports = () => {
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
};