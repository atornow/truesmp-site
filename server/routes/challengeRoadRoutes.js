const express = require('express');
const router = express.Router();
const { ChallengeRoad } = require('../models');


router.get('/', async (req, res) => {
    try {
        const challengeRoad = await ChallengeRoad.findOne({ where: { categoryId: 1 } });

        if (!challengeRoad) {
            return res.status(404).json({ message: 'Challenge road not found' });
        }

        res.json(challengeRoad);
    } catch (error) {
        console.error('Error fetching challenge road data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;