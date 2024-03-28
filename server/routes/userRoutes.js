const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { getTotalMined } = require('../scripts/coreProtectDataAggregator');
const { getPlaytime } = require('../scripts/PlaytimeCalculator');
const jwtSecret = process.env.JWT_SECRET;


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

// Registration endpoint, generates token and expiration time and creates temp user.
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ where: { username } });

    if (!user || user.password === null) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const verificationToken = crypto.randomBytes(3).toString('hex');
      const verificationExpires = Date.now() + 300000; // Token expires in 5 min

      if (user) {
        await user.update({
          password: hashedPassword,
          verificationToken: verificationToken,
          verificationExpires: verificationExpires,
        });
      } else {
        await users.create({
          username: username,
          password: hashedPassword,
          verificationToken: verificationToken,
          verificationExpires: verificationExpires,
        });
      }

      res.json({
        message: 'Please run /verify in-game within 5 minutes to link account.',
        token: verificationToken,
        username: username,
      });
    } else {
      res.status(400).json({ message: 'Username already in use' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



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

router.get('/:username/playtimes', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await users.findOne({
      where: { username },
      attributes: ['playtimes'],
    });

    if (user) {
      res.json(user.playtimes);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user playtimes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/verify', async (req, res) => {
  try {
    const { username, token } = req.body;
    const user = await users.findOne({ where: { username } });

    if (user) {
      if (user.verificationToken === token && user.verificationExpires > Date.now()) {
        const newPlaytimes = await getPlaytime(user.username);
        const playtimesArray = JSON.parse(newPlaytimes);
        await user.update({ isVerified: true, verificationToken: null, verificationExpires: null, playtimes: playtimesArray});
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

router.get('/check-verification/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await users.findOne({ where: { username } });

    if (user && user.isVerified) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: '24h' }
      );
      res.json({ isVerified: true, token });
    } else {
      res.json({ isVerified: false });
    }
  } catch (error) {
    console.error('Error checking verification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/stats/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await users.findOne({ where: { username } });
    if (user) {
      const { totalDirtMined, totalDiamondsMined } = user;
      res.json({ totalDirtMined, totalDiamondsMined });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
