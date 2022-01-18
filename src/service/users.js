const Joi = require('@hapi/joi');
const {
  addUserModel,
  findUserByEmailModel,
} = require('../model/users');
const errorHandler = require('../utils/errorHandler');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const addUserService = async (name, email, password) => {
  console.log(name);
  console.log(email);
  console.log(password);

  const { error } = userSchema.validate({ name, email, password });

  if (error) throw errorHandler(400, 'Invalid entries. Try again.');

  const emailExist = await findUserByEmailModel(email);

  if (emailExist) throw errorHandler(409, 'Email already registered');

  const newUser = await addUserModel(name, email, password);

 // console.log('service', userId);

 return {
  user: {
    name,
    email,
    password,
    role: 'user',
    _id: newUser,
  },
 };
};

// const findUserByEmailService = async () => {};

module.exports = {
  addUserService,
  // findUserByEmailService,
};
