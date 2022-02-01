const jwt = require('jsonwebtoken');

const API_SECRET = 'meuSegredo123';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'missing auth token' });

  try {  
    const decoded = jwt.verify(authorization, API_SECRET);
    
    const { data } = decoded;
    // console.log('adminAuth', data.role);

    if (data.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }

    next();
  } catch (error) {
    console.log('erroValidação: ', error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
