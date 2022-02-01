const { verifyToken } = require('../service/authService');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    const data = verifyToken(authorization);
    
    if (!data) return res.status(401).json({ message: 'jwt malformed' });

    // if (data.role !== 'admin') {
    //   return res.status(403).json({ message: 'Only admins can register new admins' });
    // }

    req.user = data;

    next();
  } catch (error) {
    console.log('erroValidação: ', error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
