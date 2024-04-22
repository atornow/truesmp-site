const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { newsPosts } = require('../models');

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
        const { heading, content } = req.body;
        const imageUrl = req.file ? req.file.filename : null;
        const newsPost = await newsPosts.create({ heading, content, imageUrl });
        res.status(201).json(newsPost);
    } catch (error) {
        console.error('Error creating news post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const newsPost = await newsPosts.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(newsPost);
    } catch (error) {
        console.error('Error fetching news posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;