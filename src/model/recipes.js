// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Requisito 3:
const addRecipeModel = async (name, ingredients, preparation, userId) => {
  const connect = await connection();

  const { insertedId } = await connect
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  
  console.log('model', insertedId);

  return insertedId;
};

const getRecipesModel = async () => {
  const connect = await connection();

  const recipes = await connect.collection('recipes').find().toArray();

  return recipes;
};

module.exports = {
  addRecipeModel,
  getRecipesModel,
};
