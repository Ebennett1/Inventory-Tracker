const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/new', (req, res) => {
  res.render('users/new', )
})
router.get('/:id', userController.getUserById, (req, res) => {
  res.json(res.user);
});
router.patch('/:id', userController.getUserById, userController.updateUser);
router.delete('/:id', userController.getUserById, userController.deleteUser);

module.exports = router;
