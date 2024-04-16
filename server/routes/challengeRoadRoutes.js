const express = require('express');
const router = express.Router();
const { challengeRoads, users } = require('../models');

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const challengeRoad = await challengeRoads.findOne({ where: { categoryId: 8 } });
        const user = await users.findOne({ where: { username } });

        if (!challengeRoad || !user) {
            return res.status(404).json({ message: 'Challenge road or user not found' });
        }

        const { rewards } = challengeRoad;
        const { points, groups } = user;

        const personalizedRewards = Array.isArray(rewards) ? rewards.map((reward) => ({
            ...reward,
            unlocked: points >= reward.points,
        })) : [];
        console.log('Res Road:', rewards);
        res.json({ rewards: rewards, isDonator: groups.includes('donator'), points: points });
    } catch (error) {
        console.error('Error fetching challenge road data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;