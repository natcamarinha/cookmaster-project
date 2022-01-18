const router = require('express').Router();

const {
  addUserController,
  getAllUsersController,
} = require('../controller/users');

router.post('/users', addUserController);
router.get('/users', getAllUsersController);

module.exports = router;
