const { challenges, users } = require('../models');
const { fetchEntityNames } = require('./fetchEntityNames');
const { fetchBlockNames } = require('./fetchBlockNames');

async function createChallenges(description, dataName, amountGoal, startDate, endDate, categoryId, dataType, points, blockAction) {
  try {
    const allUsers = await users.findAll();
    const dataMap = dataType === 'entity' ? await fetchEntityNames() : await fetchBlockNames();
    const challengePromises = allUsers.map(async (user) => {
      const initialProgress = dataType === 'entity'
        ? user.entitiesKilled[dataMap.indexOf(dataName) + 1] || 0
        : blockAction === 'placed'
          ? user.blocksPlaced[dataMap.indexOf(dataName) + 1] || 0
          : user.blocksMined[dataMap.indexOf(dataName) + 1] || 0;
      await challenges.create({
        amountGoal,
        startDate,
        endDate,
        description,
        dataName,
        targetUsername: user.username,
        initialProgress,
        categoryId,
        dataType,
        points,
        blockAction,
      });
    });
    await Promise.all(challengePromises);
  } catch (error) {
    console.error('Error creating challenges:', error);
    throw error;
  }
}

module.exports = { createChallenges };