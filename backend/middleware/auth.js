const jwt = require('jsonwebtoken');
const User = require('../model/user');

async function requireAuth(req, res, next) {
  try {
    // Read the token
    const token = req.cookies.Authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Check expiration
    if (Date.now() > decoded.exp * 1000) {
      return res.status(401).json({ message: 'Unauthorized - Token has expired' });
    }

    // Find the user
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    // Attach the user to req
    req.user = user;
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}

module.exports = requireAuth;
