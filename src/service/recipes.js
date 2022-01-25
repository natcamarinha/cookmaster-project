const Joi = require('joi');
const { ObjectId } = require('mongodb');

const {
  addRecipeModel,
  getRecipesModel,
  getByIdModel,
  editRecipeModel,
  deleteModel,
  addImageModel,
} = require('../model/recipes');
const errorHandler = require('../utils/errorHandler');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const addRecipeService = async (name, ingredients, preparation, userId) => {
  const { error } = recipeSchema.validate({ name, ingredients, preparation });

  if (error) throw errorHandler(400, 'Invalid entries. Try again.');

  const recipeId = await addRecipeModel(name, ingredients, preparation, userId);

  // console.log('service', recipeId);

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeId,
  };
};

const getRecipesService = async () => {
  const recipes = await getRecipesModel();
  return recipes;
};

const getByIdService = async (id) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'recipe not found');

  const recipe = await getByIdModel(id);

  // if (!recipe) throw errorHandler(404, 'recipe not found');

  return recipe;
};

const editRecipeService = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'recipe not found');

  const editRecipe = await editRecipeModel({ id, name, ingredients, preparation });

  console.log('service', editRecipe);

  return editRecipe;
};

const deleteService = async (id) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'recipe not found');

  const exclude = await deleteModel(id);

  return exclude;
};

const addImageService = async (id, image) => {
  if (!ObjectId.isValid(id)) throw errorHandler(404, 'recipe not found');

  const addImage = await addImageModel(id, image);

  console.log('service', addImage);

  return addImage;
};

module.exports = {
  addRecipeService,
  getRecipesService,
  getByIdService,
  editRecipeService,
  deleteService,
  addImageService,
};
