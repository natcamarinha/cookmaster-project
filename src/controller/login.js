const { loginService } = require('../service/login');
const { createToken } = require('../middlewares/auth');

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    const { password: _password, ...userWithoutPassword } = user;

    const token = await createToken(user);

    console.log('controller', token);
    return res.status(200).json({ token });
  } catch (error) {
    console.log('erro:', error);
    next(error);
  }
};

module.exports = {
  loginController,
};
