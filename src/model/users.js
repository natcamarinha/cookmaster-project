const connection = require('./connection');

// Requisito 1:
const addUserModel = async (name, email, password) => {
  const connect = await connection();
  
  const { insertedId } = await connect
    .collection('users')
    .insertOne({ name, email, password, role: 'user' });
  
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

// Requisito 12:
const addAdminModel = async (name, email, password) => {
  const connect = await connection();

  const { insertedId } = await connect
    .collection('users')
    .insertOne({ name, email, password, role: 'admin' });
  
  return insertedId;
};

module.exports = {
  addUserModel,
  findUserByEmailModel,
  getAllUsersModel,
  addAdminModel,
};
