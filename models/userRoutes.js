const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = await User.create({ username });
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Login endpoint (simplified for demonstration)
router.post('/login', async (req, res) => {
  // Implement login logic here
  // This is a placeholder for demonstration purposes
  res.send('Login endpoint');
});

module.exports = router;
