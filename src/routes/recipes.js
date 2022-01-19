const router = require('express').Router();
const { validateToken } = require('../middlewares/auth');

const {
  addRecipeController,
  getRecipesController,
  getByIdController,
} = require('../controller/recipes');

router.post('/recipes', validateToken, addRecipeController);
router.get('/recipes', getRecipesController);
router.get('/recipes/:id', getByIdController);

module.exports = router;
