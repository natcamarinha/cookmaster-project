const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Requisito 3:
const addRecipeModel = async (name, ingredients, preparation, userId) => {
  const connect = await connection();

  const { insertedId } = await connect
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  
  // console.log('model', insertedId);

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

// Requisito 7:
const editRecipeModel = async (id, name, ingredients, preparation) => {
  const connect = await connection();

  // console.log('modelID', id);

  const editRecipe = await connect
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnDocument: 'after' }, // https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
    );

  console.log('model', editRecipe);

  const recipe = await getByIdModel(id);

  console.log('model', recipe);
  
  return recipe;
};

// Requisito 8: 
const deleteModel = async (id) => {
  const connect = await connection();

  const exclude = await connect
    .collection('recipes')
    .findOneAndDelete({ _id: ObjectId(id) }, {});
  
  return exclude;
};

module.exports = {
  addRecipeModel,
  getRecipesModel,
  getByIdModel,
  editRecipeModel,
  deleteModel,
};
