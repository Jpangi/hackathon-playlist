const User = require('../models/Users');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const saltRounds = 12;

// Sign-up
router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) return res.status(409).json({ err: 'Username already taken.' });

    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, saltRounds)
    });

    const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sign-in
router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const doPasswordsMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!doPasswordsMatch) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
