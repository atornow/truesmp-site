const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await users.create({ username: username, password: hashedPassword });
    // Return only the public information
    res.json({ id: newUser.id, username: newUser.username });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // if the token has expired or is invalid
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};

// This route is now protected, and `req.user` contains the payload from the JWT
router.get('/protected-route', authenticateToken, (req, res) => {

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

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
