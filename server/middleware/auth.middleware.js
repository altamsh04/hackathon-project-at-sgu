import pkg from 'jsonwebtoken';
const { verify } = pkg;

const authenticateToken = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    return res.status(403).json({ message: 'Access token missing' });
  }

  try {
    const decoded = verify(auth, '15a8157381e3c14eb2015c93674206a8416a861b8140994a8f07e99fcb646a59');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Access token wrong' });
  }
};

export default authenticateToken;
