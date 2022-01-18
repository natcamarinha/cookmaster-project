const Joi = require('joi');
const {
  loginModel,
} = require('../model/login');
const errorHandler = require('../utils/errorHandler');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

  if (error) throw errorHandler(401, 'All fields must be filled');

  const user = await loginModel(email, password);

  if (!user) throw errorHandler(401, 'Incorrect username or password');

  console.log('service', user);
  return user;
};

module.exports = {
  loginService,
};
