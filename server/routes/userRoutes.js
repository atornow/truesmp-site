const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { getPlaytime } = require('../scripts/PlaytimeCalculator');
const { fetchEntityNames } = require('../scripts/fetchEntityNames');
const { fetchBlockNames } = require('../scripts/fetchBlockNames');
const jwtSecret = process.env.JWT_SECRET;

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

// Stat map endpoint, uses script to get entity map.
router.get('/entity-map', async (req, res) => {
  try {
    const entityMap = await fetchEntityNames();
    res.json(entityMap);
  } catch (error) {
    console.error('Error fetching entity map:', error);
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
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
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

router.get('/:username/entities-killed', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await users.findOne({
      where: { username },
      attributes: ['entitiesKilled'],
    });

    if (user) {
      res.json(user.entitiesKilled);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user killed stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:username/blocks-placed', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await users.findOne({
      where: { username },
      attributes: ['blocksPlaced'],
    });

    if (user) {
      res.json(user.blocksPlaced);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user blocks placed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:username/blocks-mined', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await users.findOne({
      where: { username },
      attributes: ['blocksMined'],
    });

    if (user) {
      res.json(user.blocksMined);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user blocks mined:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/block-map', async (req, res) => {
  try {
    const statMap = await fetchBlockNames();
    res.json(statMap);
  } catch (error) {
    console.error('Error fetching stat map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
