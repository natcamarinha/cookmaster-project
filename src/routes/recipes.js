const router = require('express').Router();
const upload = require('../config/multer');
const auth = require('../middlewares/auth');

const {
  addRecipeController,
  getRecipesController,
  getByIdController,
  editRecipeController,
  deleteController,
  addImageController,
} = require('../controller/recipes');

router.post('/recipes', auth, addRecipeController);
router.get('/recipes', getRecipesController);
router.get('/recipes/:id', getByIdController);
router.put('/recipes/:id', auth, editRecipeController);
router.put('/recipes/:id/image', auth, upload.single('image'), addImageController);
router.delete('/recipes/:id', auth, deleteController);

module.exports = router;
