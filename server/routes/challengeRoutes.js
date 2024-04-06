const express = require('express');
const router = express.Router();
const { createChallenge } = require('../scripts/createChallenge');

router.post('/', async (req, res) => {
  try {
    const { amountGoal, startDate, endDate, description, dataName, targetUsername } = req.body;
    const challenge = await createChallenge(amountGoal, startDate, endDate, description, dataName, targetUsername);
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;