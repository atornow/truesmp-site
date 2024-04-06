const cron = require('node-cron');
const { users, challenges } = require('../models');
const { createChallenge } = require('../scripts/createChallenge');

module.exports = () => {
  cron.schedule('0 23 * * *', async () => {
    console.log('Challenge creation job started');
    const startDate = new Date('2024-04-06T23:00:00.000Z');
    const endDate = new Date('2024-04-07T23:00:00.000Z');

    const targetUsers = await users.findAll();
    const challengePromises = targetUsers.map(async (user) => {
      try {
        const existingChallenge = await challenges.findOne({
          where: {
            targetUsername: user.username,
            startDate: startDate,
            endDate: endDate,
          },
        });

        if (!existingChallenge) {
          await createChallenge(
            500,
            startDate,
            endDate,
            'Kill 500 Pigmen',
            'piglin',
            user.username
          );
        }
      } catch (error) {
        console.error(`Error creating challenge for user ${user.username}:`, error);
      }
    });

    await Promise.all(challengePromises);
    console.log('Challenge creation job completed');
  });
};