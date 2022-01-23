const jwt = require('jsonwebtoken');

const API_SECRET = 'meuSegredo123';

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    // console.log('JWT', decoded);
    const { data } = decoded;
    console.log('JWT2', data);
    return data;
    // const { _id } = decoded.data;
    // console.log('JWT', _id);
    // return _id;
  } catch (error) {
    // console.log('erroVerificação: ', error);
    return null;
  }
};

const isAdmin = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    // if (decoded.role !== 'admin')
    // console.log('JWT', decoded);
    // // return decoded.data; */
    const { role } = decoded.data;
    // console.log('JWT', role);
    return role;
  } catch (error) {
    // console.log('erroVerificação: ', error);
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
  isAdmin,
};
