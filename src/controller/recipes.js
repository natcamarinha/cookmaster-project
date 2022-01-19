const {
  addRecipeService,
} = require('../service/recipes');

const addRecipeController = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user;

    const newRecipe = await addRecipeService(name, ingredients, preparation, userId);

    console.log('controller', newRecipe);

    return res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  addRecipeController,
};
