const jwt = require('jsonwebtoken');
const { loginService } = require('../service/login');

const secret = 'meuSegredo';

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email, password);

    const jwtConfig = { 
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

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
