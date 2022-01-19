const router = require('express').Router();
const { validateToken } = require('../middlewares/auth');

const {
  addRecipeController,
  getRecipesController,
} = require('../controller/recipes');

router.post('/recipes', validateToken, addRecipeController);
router.get('/recipes', getRecipesController);

module.exports = router;
