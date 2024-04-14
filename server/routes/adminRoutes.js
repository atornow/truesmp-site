const express = require('express');
const router = express.Router();
const { challenges, galleryPosts, users } = require('../models');

router.delete('/challenges', async (req, res) => {
  try {
    const { id } = req.body;
    await challenges.destroy({ where: { categoryId: id } });
    res.json({ message: 'Challenges deleted successfully' });
  } catch (error) {
    console.error('Error deleting challenges:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/galleryPosts', async (req, res) => {
  try {
    const { id } = req.body;
    await galleryPosts.destroy({ where: { id } });
    res.json({ message: 'Gallery posts deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/users', async (req, res) => {
  try {
    const { username } = req.body;
    await users.destroy({ where: { username } });
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;