const { ObjectId } = require('mongodb');
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

// Requisito 4:
const getRecipesModel = async () => {
  const connect = await connection();

  const recipes = await connect.collection('recipes').find().toArray();

  return recipes;
};

// Requisito 5:
const getByIdModel = async (id) => {
  const connect = await connection();

  const recipe = await connect.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
};

module.exports = {
  addRecipeModel,
  getRecipesModel,
  getByIdModel,
};
