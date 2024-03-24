const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await users.create({ username: username, password: password });
    res.json({ id: newUser.id, username: newUser.username });


  } catch (error) {
    res.status(400).send(error.message);
  }
});



// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: "Login successful" });
      // Proceed with session/token generation as per your auth strategy
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
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


module.exports = router;
