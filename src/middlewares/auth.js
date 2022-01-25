const { verifyToken } = require('../service/authService');

module.exports = (req, res, next) => {
  // console.log(req.file.image);
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    const data = verifyToken(authorization);
    
    if (!data) return res.status(401).json({ message: 'jwt malformed' });

    req.user = data;

    next();
  } catch (error) {
    console.log('erroValidação: ', error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
