const router = require('express').Router();

const {
  addUserController,
} = require('../controller/users');

router.post('/users', addUserController);

module.exports = router;
