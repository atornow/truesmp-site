const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { galleryPosts } = require('../models');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { userId, caption, username } = req.body;
    const imageUrl = req.file.filename;
    const galleryPost = await galleryPosts.create({ userId, username, imageUrl, caption });
    res.status(201).json(galleryPost);
  } catch (error) {
    console.error('Error creating gallery post:', error);
    res.status(500).json({ message: 'Internal server error' });  }
});


// Fetch gallery posts
router.get('/', async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const where = userId ? { userId } : {};
    const galleryPost = await galleryPosts.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'username', 'imageUrl', 'caption', 'likes', 'createdAt'],
    });
    res.json(galleryPost);
  } catch (error) {
    console.error('Error fetching gallery posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Like a gallery post
router.post('/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const { username } = req.body;
    const galleryPost = await galleryPosts.findByPk(postId);
    if (!galleryPost) {
      return res.status(404).json({ message: 'Gallery post not found' });
    }
    if (!galleryPost.likes.includes(username)) {
      galleryPost.likes = [...galleryPost.likes, username];
      await galleryPost.save();
    }
    res.json(galleryPost);
  } catch (error) {
    console.error('Error liking gallery post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;