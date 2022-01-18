const {
  addUserService,
  getAllUsersService,
} = require('../service/users');

const addUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await addUserService(name, email, password);

    // console.log('controller', newUser);

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    return res.status(201).json(users);
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

module.exports = {
  addUserController,
  getAllUsersController,
};
