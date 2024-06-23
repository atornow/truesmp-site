const express = require('express');
const router = express.Router();
const { challenges, galleryPosts, users, challengeRoads } = require('../models');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/challengeroad');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/challenge-road', async (req, res) => {
  try {
    const { category, rewards } = req.body;
    const challengeRoad = await challengeRoads.create({
      rewards: rewards.map(reward => ({
        ...reward,
        command: reward.command || '' // Ensure command is included
      })),
      categoryId: category
    });
    res.status(201).json(challengeRoad);
  } catch (error) {
    console.error('Error creating challenge road:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/challenge-road/upload-image', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ filePath: `uploads/challengeroad/${req.file.filename}` });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});


router.delete('/challenges', async (req, res) => {
  try {
    const { id, description, targetUsername } = req.body;
    const where = {};
    if (id) where.categoryId = id;
    if (description) where.description = { [Op.like]: `%${description}%` };
    if (targetUsername) where.targetUsername = { [Op.like]: `%${targetUsername}%` };
    await challenges.destroy({ where });
    res.json({ message: 'Challenges deleted successfully' });
  } catch (error) {
    console.error('Error deleting challenges:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/galleryPosts', async (req, res) => {
  try {
    const { id, username, caption } = req.body;
    const where = {};
    if (id) where.id = id;
    if (username) where.username = { [Op.like]: `%${username}%` };
    if (caption) where.caption = { [Op.like]: `%${caption}%` };
    await galleryPosts.destroy({ where });
    res.json({ message: 'Gallery posts deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/users', async (req, res) => {
  try {
    const { username, uuid, teamId } = req.body;
    const where = {};
    if (username) where.username = { [Op.like]: `%${username}%` };
    if (uuid) where.uuid = { [Op.like]: `%${uuid}%` };
    if (teamId) where.teamId = { [Op.like]: `%${teamId}%` };
    await users.destroy({ where });
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;