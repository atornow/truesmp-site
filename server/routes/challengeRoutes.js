const express = require('express');
const router = express.Router();
const { challenges } = require('../models');
const { createChallenges } = require('../scripts/createChallenge');


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


router.get('/', async (req, res) => {
  try {
    const { targetUsername } = req.query;
    const challenge = await challenges.findAll({
      where: { targetUsername },
    });
    res.json(challenge);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/admin', async (req, res) => {
  try {
    const { description, dataName, amountGoal, startDate, endDate, categoryId, dataType, points, blockAction } = req.body;
    await createChallenges(description, dataName, amountGoal, startDate, endDate, categoryId, dataType, points, blockAction);
    res.status(201).json({ message: 'Challenges created successfully' });
  } catch (error) {
    console.error('Error creating challenges:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;