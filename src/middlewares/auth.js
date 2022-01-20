const { verifyToken } = require('../service/authService'); // add importação do isAdmin

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    const user = verifyToken(authorization);

    // console.log('userAuth', user);
    
    if (!user) return res.status(401).json({ message: 'jwt malformed' });

    // const userRole = isAdmin(authorization);

    // console.log('userAdmin', userRole);

    // if (userRole !== 'admin') return res.status(401).json({ message: 'not authorized' });

    req.user = user;

    next();
  } catch (error) {
    // console.log('erroValidação: ', error);
    return res.status(401).json({ message: 'Falha na autenticação' });
  }
};
