const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided, access denied.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Add the user data from the token to the request object
    next();  // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};