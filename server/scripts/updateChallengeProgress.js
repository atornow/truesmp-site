const { challenges, users } = require('../models');
const { fetchEntityNames } = require('./fetchEntityNames');

async function updateChallengeProgress(challengeId) {
  try {
    const challenge = await challenges.findByPk(challengeId);
    const user = await users.findOne({ where: { username: challenge.targetUsername } });

    const entityMap = await fetchEntityNames();
    const entityIndex = entityMap.indexOf(challenge.dataName);

    const currentProgress = user.entitiesKilled[entityIndex + 1] || 0;
    const progressDifference = currentProgress - challenge.initialProgress;

    await challenge.update({ currentProgress: progressDifference });
  } catch (error) {
    console.error('Error updating challenge progress:', error);
    throw error;
  }
}

module.exports = { updateChallengeProgress };