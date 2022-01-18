const {
  addUserService,
  // findUserByEmailService,
} = require('../service/users');

const addUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await addUserService(name, email, password);

    // console.log('controller', newUser);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

/* const findUserByEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userEmail = await findUserByEmailService(email);

    return res()
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
}; */

module.exports = {
  addUserController,
  // findUserByEmailController,
};
