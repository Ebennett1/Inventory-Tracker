const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
