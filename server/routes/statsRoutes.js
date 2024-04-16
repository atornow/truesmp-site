const express = require('express');
const router = express.Router();
const { fetchEntityNames } = require('../scripts/fetchEntityNames');
const { fetchBlockNames } = require('../scripts/fetchBlockNames');
const { users } = require('../models');


// Block map endpoint, uses script to get block map.
router.get('/block-map', async (req, res) => {
  try {
    const statMap = await fetchBlockNames();
    res.json(statMap);
  } catch (error) {
    console.error('Error fetching stat map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Entity map endpoint, uses script to get entity map.
router.get('/entity-map', async (req, res) => {
  try {
    const entityMap = await fetchEntityNames();
    res.json(entityMap);
  } catch (error) {
    console.error('Error fetching entity map:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/top-diamond-miners', async (req, res) => {
  try {
    const blockMap = await fetchBlockNames();
    const deepslateIndex = blockMap.indexOf('brown_shulker_box');
    const allUsers = await users.findAll({
      attributes: ['username', 'blocksMined', 'blocksPlaced'],
    });

    const topDiamondMiners = allUsers
      .map((user) => ({
        username: user.username,
        diamondsMined:
          ((user.blocksMined && user.blocksMined[deepslateIndex]) || 0) -
          ((user.blocksPlaced && user.blocksPlaced[deepslateIndex]) || 0),
      }))
      .sort((a, b) => b.diamondsMined - a.diamondsMined)
      .slice(0, 10);

    res.json(topDiamondMiners);
  } catch (error) {
    console.error('Error fetching top diamond miners:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await users.findOne({
      where: { username },
      attributes: ['entitiesKilled', 'blocksMined', 'playtimes', 'blocksPlaced', 'points', 'groups'],
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(`Error fetching user data:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
