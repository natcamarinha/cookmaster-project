const connection = require('./connection');

// Requisito 2:
const loginModel = async (email, password) => {
  const connect = await connection();

  const login = await connect
  .collection('users')
  .findOne({ email, password });

  console.log('model', login);
  return login;
};

module.exports = {
  loginModel,
};
