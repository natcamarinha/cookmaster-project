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

module.exports = {
  addRecipeModel,
};
