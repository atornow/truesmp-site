const { challenges, users } = require('../models');
const { fetchEntityNames } = require('./fetchEntityNames');

async function createChallenge(amountGoal, startDate, endDate, description, dataName, targetUsername) {
  try {
    const user = await users.findOne({ where: { username: targetUsername } });
    const entityMap = await fetchEntityNames();
    const entityIndex = entityMap.indexOf(dataName);

    const initialProgress = user.entitiesKilled[entityIndex] || 0;

    const challenge = await challenges.create({
      amountGoal,
      startDate,
      endDate,
      description,
      dataName,
      targetUsername,
      initialProgress,
    });
    return challenge;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
}

module.exports = { createChallenge };