// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Requisito 1:
const addUserModel = async (name, email, password) => {
  const connect = await connection();
  
  const { insertedId } = await connect
    .collection('users')
    .insertOne({ name, email, password, role: 'user' });

  console.log('model', insertedId);
  
  return insertedId;
};

const findUserByEmailModel = async (email) => {
  const connect = await connection();

  const userEmail = await connect
    .collection('users')
    .findOne({ email });

  return userEmail;
};

const getAllUsersModel = async () => {
  const connect = await connection();

  const users = await connect
    .collection('users')
    .find()
    .toArray();
  
  return users;
};

module.exports = {
  addUserModel,
  findUserByEmailModel,
  getAllUsersModel,
};
