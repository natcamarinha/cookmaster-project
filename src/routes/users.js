const router = require('express').Router();

const {
  addUserController,
  getAllUsersController,
  addAdminController,
} = require('../controller/users');

const authAdmin = require('../middlewares/authAdmin');

router.post('/users', addUserController);
router.get('/users', getAllUsersController);
router.post('/users/admin', authAdmin, addAdminController);

module.exports = router;
