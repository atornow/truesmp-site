const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { getTotalMined } = require('../scripts/coreProtectDataAggregator');

// Setup auth token for using protected route to talk to frontend
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

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verificationExpires = Date.now() + 300000; // Token expires in 5 min

    const newUser = await users.create({
      username: username,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationExpires: verificationExpires,
    });

    res.json({
      message: 'Registration successful. Please run /verify in-game within 5 minutes to complete the verification process.',
      token: verificationToken,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
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

router.get('/top-miners/:blockType', async (req, res) => {
  try {
    const { blockType } = req.params;
    const topMiners = await users.findAll({
      order: [[blockType, 'DESC']],
      limit: 10,
      attributes: ['username', blockType],
    });
    res.json(topMiners);
  } catch (error) {
    console.error('Error fetching top miners:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { username, token } = req.body;
    const user = await users.findOne({ where: { username } });

    if (user) {
      if (user.verificationToken === token && user.verificationExpires > Date.now()) {
        await user.update({ isVerified: true, verificationToken: null, verificationExpires: null });
        return res.status(200).json({ message: `Verification successful for ${username}` });
      } else {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error handling verification request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
