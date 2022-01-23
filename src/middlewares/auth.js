const { verifyToken } = require('../service/authService'); // add importação do isAdmin

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    const data = verifyToken(authorization);

    // console.log('userAuth', data.role);
    
    if (!data) return res.status(401).json({ message: 'jwt malformed' });

    // const userRole = isAdmin(role);

    // console.log('userAdmin', userRole);

    // if (userRole !== 'admin') return res.status(401).json({ message: 'not authorized' });

    // if (data.role !== 'admin') return res.status(401).json({ message: 'not admin' });

    req.user = data;

    next();
  } catch (error) {
    console.log('erroValidação: ', error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
