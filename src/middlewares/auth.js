const jwt = require('jsonwebtoken');

const API_SECRET = 'meuSegredo';

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    /* console.log('JWT', decoded);
    return decoded.data; */
    const { _id } = decoded.data;
    // console.log('JWT', _id);
    return _id;
  } catch (error) {
    // console.log('erroVerificação: ', error);
    return null;
  }
};

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    const user = verifyToken(authorization);
    
    if (!user) return res.status(401).json({ message: 'jwt malformed' });

    req.user = user;

    next();
  } catch (error) {
    // console.log('erroValidação: ', error);
    return res.status(401).json({ message: 'Falha na autenticação' });
  }
};

module.exports = {
  createToken,
  verifyToken,
  validateToken,
};
