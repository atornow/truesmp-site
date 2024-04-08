const { challenges, users } = require('../models');
const { fetchEntityNames } = require('./fetchEntityNames');

async function createChallenges(description, entityName, amountToKill, startDate, endDate, categoryId) {
  try {
    const allUsers = await users.findAll();
    const entityMap = await fetchEntityNames();
    const challengePromises = allUsers.map(async (user) => {
      const initialProgress = user.entitiesKilled[entityMap.indexOf(entityName) + 1] || 0;
      await challenges.create({
        amountGoal: amountToKill,
        startDate,
        endDate,
        description,
        dataName: entityName,
        targetUsername: user.username,
        initialProgress,
        categoryId,
      });
    });
    await Promise.all(challengePromises);
  } catch (error) {
    console.error('Error creating challenges:', error);
    throw error;
  }
}

module.exports = { createChallenges };