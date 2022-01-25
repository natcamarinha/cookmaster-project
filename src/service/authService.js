const jwt = require('jsonwebtoken');

const API_SECRET = 'meuSegredo123';

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    // console.log(token);
    const decoded = jwt.verify(token, API_SECRET);
    // console.log('JWT', decoded);
    const { data } = decoded;
    // console.log('JWT2', data);
    return data;
  } catch (error) {
    console.log('erroVerificação: ', error);
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
