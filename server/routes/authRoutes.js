const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const { getStats } = require('../scripts/StatsCalculator');

// Registration endpoint, generates token and expiration time and creates temp user.
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ where: { username } });
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (!user || user.password === null) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const verificationToken = crypto.randomBytes(3).toString('hex');
      const verificationExpires = Date.now() + 300000; // Token expires in 5 min

      if (user) {
        const lastUpdateTime = Math.floor(user.lastUpdate.getTime() / 1000); // Last update time in seconds
        const lookback = currentTime - lastUpdateTime;
        const entitiesKilled = await getStats(user.username, 64, 3, lookback);
        const blocksPlaced = await getStats(user.username, 996, 1, lookback);
        const blocksMined = await getStats(user.username, 996, 0, lookback);

        await user.update({
          password: hashedPassword,
          verificationToken: verificationToken,
          verificationExpires: verificationExpires,
          entitiesKilled,
          blocksPlaced,
          blocksMined,
          lastUpdate: new Date(),
        });
      } else {
        const lastUpdateTime = Math.floor(new Date(0).getTime() / 1000); // Last update time in seconds
        const lookback = currentTime - lastUpdateTime;
        const entitiesKilled = await getStats(username, 64, 3, lookback);
        const blocksPlaced = await getStats(username, 996, 1, lookback);
        const blocksMined = await getStats(username, 996, 0, lookback);
        await users.create({
          username: username,
          password: hashedPassword,
          verificationToken: verificationToken,
          verificationExpires: verificationExpires,
          entitiesKilled,
          blocksPlaced,
          blocksMined,
          lastUpdate: new Date(),
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

// Verify endpoint, check if /verify was run in game.
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

// Verification endpoint, check if user is verified.
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

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwtSecret,
        { expiresIn: '24h' }
      );

      // Update user stats and lastUpdate time
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const lastUpdateTime = Math.floor(user.lastUpdate.getTime() / 1000); // Last update time in seconds
      const lookback = currentTime - lastUpdateTime;

      const newEntitiesKilled = await getStats(user.username, 64, 3, lookback);
      const newBlocksPlaced = await getStats(user.username, 996, 1, lookback);
      const newBlocksMined = await getStats(user.username, 996, 0, lookback);
      await user.update({
        entitiesKilled: user.entitiesKilled.map((value, index) => Number(value) + Number(newEntitiesKilled[index])),
        blocksPlaced: user.blocksPlaced.map((value, index) => Number(value) + Number(newBlocksPlaced[index])),
        blocksMined: user.blocksMined.map((value, index) => Number(value) + Number(newBlocksMined[index])),
        lastUpdate: new Date(),
      });

      res.json({ message: "Login successful", token });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;