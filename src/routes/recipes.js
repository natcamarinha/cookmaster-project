const router = require('express').Router();
const { validateToken } = require('../middlewares/auth');

const {
  addRecipeController,
} = require('../controller/recipes');

router.post('/recipes', validateToken, addRecipeController);

module.exports = router;
