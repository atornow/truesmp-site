const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const { getStats } = require('../scripts/StatsCalculator');
const { updatePlaytimes } = require('../scripts/PlaytimeCalculator');

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
        const user = await users.findOne({ where: { username } });
        createUserStats(user);
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

      res.json({ message: "Login successful", token });

      // Update user stats and lastUpdate time in the background
      updateUserStats(user);
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function updateUserStats(user) {
  const currentDate = new Date().toISOString().split('T')[0];
  const lastUpdateDate = user.lastUpdate.toISOString().split('T')[0];
  const updatedPlaytimes = await updatePlaytimes(user.username, lastUpdateDate, user.playtimes);

  const currentTime = Math.floor(Date.now() / 1000);
  const lastUpdateTime = Math.floor(user.lastUpdate.getTime() / 1000);
  const lookback = currentTime - lastUpdateTime;

  const newEntitiesKilled = await getStats(user.username, 64, 3, lookback);
  const newBlocksPlaced = await getStats(user.username, 996, 1, lookback);
  const newBlocksMined = await getStats(user.username, 996, 0, lookback);

  const updatedFields = {
    playtimes: updatedPlaytimes,
    lastUpdate: new Date(),
  };

  if (user.entitiesKilled !== null) {
    updatedFields.entitiesKilled = user.entitiesKilled.map((value, index) => Number(value) + Number(newEntitiesKilled[index]));
  }

  if (user.blocksPlaced !== null) {
    updatedFields.blocksPlaced = user.blocksPlaced.map((value, index) => Number(value) + Number(newBlocksPlaced[index]));
  }

  if (user.blocksMined !== null) {
    updatedFields.blocksMined = user.blocksMined.map((value, index) => Number(value) + Number(newBlocksMined[index]));
  }

  await user.update(updatedFields);
}

async function createUserStats(user) {
  const currentDate = new Date().toISOString().split('T')[0];
  const lastUpdateDate = user.lastUpdate.toISOString().split('T')[0];
  const updatedPlaytimes = await updatePlaytimes(user.username, lastUpdateDate, user.playtimes || []);

  const currentTime = Math.floor(Date.now() / 1000);
  const lastUpdateTime = Math.floor(user.lastUpdate.getTime() / 1000);
  const lookback = currentTime - lastUpdateTime;

  const entitiesKilled = await getStats(user.username, 64, 3, lookback);
  const blocksPlaced = await getStats(user.username, 996, 1, lookback);
  const blocksMined = await getStats(user.username, 996, 0, lookback);

  await user.update({
    playtimes: updatedPlaytimes,
    entitiesKilled,
    blocksPlaced,
    blocksMined,
    lastUpdate: new Date(),
  });
}

module.exports = router;