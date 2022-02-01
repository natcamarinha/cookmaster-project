const Joi = require('joi');
const {
  addUserModel,
  findUserByEmailModel,
  getAllUsersModel,
  addAdminModel,
} = require('../model/users');
const errorHandler = require('../utils/errorHandler');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const addUserService = async (name, email, password) => {
  // console.log(name);
  // console.log(email);
  // console.log(password);

  const { error } = userSchema.validate({ name, email, password });

  if (error) throw errorHandler(400, 'Invalid entries. Try again.');

  const emailExist = await findUserByEmailModel(email);

  if (emailExist) throw errorHandler(409, 'Email already registered');

  const newUser = await addUserModel(name, email, password);

 // console.log('service', userId);

 return {
  _id: newUser,
  name,
  email,
  role: 'user',
 };
};

const getAllUsersService = async () => {
  const users = await getAllUsersModel();
  return { users };
};

const addAdminService = async (name, email, password) => {
  
  const { error } = userSchema.validate({ name, email, password });

  if (error) throw errorHandler(400, 'Invalid entries. Try again.');

  const emailExist = await findUserByEmailModel(email);

  if (emailExist) throw errorHandler(409, 'Email already registered');

  const userId = await addAdminModel(name, email, password);

 // console.log('service', userId);

 return {
  _id: userId,
  name,
  email,
  role: 'admin',
 };
};

module.exports = {
  addUserService,
  getAllUsersService,
  addAdminService,
};
