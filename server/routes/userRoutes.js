const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { getTotalMined } = require('../scripts/coreProtectDataAggregator');

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await users.create({ username: username, password: hashedPassword });
    const totalDirtMined = await getTotalMined(newUser.username, 'minecraft:dirt');
    const totalDiamondsMined = await getTotalMined(newUser.username, 'minecraft:deepslate_diamond_ore');
    newUser.update({ totalDirtMined });
    newUser.update({ totalDiamondsMined });
    res.json({ id: newUser.id, username: newUser.username });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token
  if (token == null) return res.sendStatus(411); // if there isn't any token

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // if the token has expired or is invalid
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};

// This route is now protected, and `req.user` contains the payload from the JWT
router.get('/protected-route', authenticateToken, (req, res) => {

});

// Secret key for signing JWT, should be stored in environment variable
const jwtSecret = process.env.JWT_SECRET || 'fjsdfhjFDgh4242';

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: '24h' } // token will expire in 24 hours
      );

      // Send the token to the client
      res.json({ message: "Login successful", token });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Post user stats for a specific user
router.post('/stats', async (req, res) => {
  try {
    const { username } = req.body;
    // Ensure that the username from the token matches the requested username
    const user = await users.findOne({
      where: { username: username },
      attributes: ['totalDirtMined', 'totalDiamondsMined'] // Specify any other attributes you may need
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      totalDirtMined: user.totalDirtMined,
      totalDiamondsMined: user.totalDiamondsMined
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
