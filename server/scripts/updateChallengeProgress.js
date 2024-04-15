const { challenges, users } = require('../models');
const { fetchEntityNames } = require('./fetchEntityNames');
const { fetchBlockNames } = require('./fetchBlockNames');

async function updateChallengeProgress(challengeId) {
  try {
    const challenge = await challenges.findByPk(challengeId);
    const user = await users.findOne({ where: { username: challenge.targetUsername } });

    const dataMap = challenge.dataType === 'entity' ? await fetchEntityNames() : await fetchBlockNames();
    const dataIndex = dataMap.indexOf(challenge.dataName);

    const currentProgress = challenge.dataType === 'entity'
      ? user.entitiesKilled[dataIndex + 1] || 0
      : user.blocksMined[dataIndex + 1] || 0;
    const progressDifference = currentProgress - challenge.initialProgress;

    if (progressDifference >= challenge.amountGoal) {
      // Award points to the user
      await user.increment('points', { by: challenge.points });
      await challenge.update({ points: 0 });
    }

    await challenge.update({ currentProgress: progressDifference });
  } catch (error) {
    console.error('Error updating challenge progress:', error);
    throw error;
  }
}

module.exports = { updateChallengeProgress };