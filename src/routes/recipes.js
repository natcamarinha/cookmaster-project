const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  addRecipeController,
  getRecipesController,
  getByIdController,
  editRecipeController,
} = require('../controller/recipes');

router.post('/recipes', auth, addRecipeController);
router.get('/recipes', getRecipesController);
router.get('/recipes/:id', getByIdController);
router.put('/recipes/:id', auth, editRecipeController);

module.exports = router;
