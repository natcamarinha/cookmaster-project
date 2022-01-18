const router = require('express').Router();

const {
  loginController,
} = require('../controller/login');

router.post('/login', loginController);

module.exports = router;
