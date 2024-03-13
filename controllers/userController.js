const { User } = require('../models');
const router = require('express').Router()
const bcrypt = require('bcrypt')


router.get('/new', (req, res) => {
  res.render('users/new')
})


router.post('/', async (req, res) => {
 req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
 const newUser = await User.create(req.body)
 console.log(newUser)
 res.redirect('/')
})

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserById(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

async function updateUser(req, res) {
  try {
    if (req.body.username != null) {
      res.user.username = req.body.username;
    }
    if (req.body.password != null) {
      res.user.password = req.body.password;
    }
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  // createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
