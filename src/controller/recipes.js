const {
  addRecipeService,
  getRecipesService,
  getByIdService,
} = require('../service/recipes');

const addRecipeController = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user;

    const newRecipe = await addRecipeService(name, ingredients, preparation, userId);

    // console.log('controller', newRecipe);

    return res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRecipesController = async (req, res, next) => {
  try {
    const recipes = await getRecipesService();

    return res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await getByIdService(id);

    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  addRecipeController,
  getRecipesController,
  getByIdController,
};
