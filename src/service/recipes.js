// const jwt = require('jsonwebtoken');
const Joi = require('joi');

const {
  addRecipeModel,
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

  console.log('service', recipeId);

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipeId,
  };
};

module.exports = {
  addRecipeService,
};
