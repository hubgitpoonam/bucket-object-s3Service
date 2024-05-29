// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    // Get token from cookies
    //const token = req.cookies.token;
    

    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
    console.log(token)


    if (!token) {
      return next(new Error('Unauthorized: No token provided'));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    // Get user details using the decoded user ID
    const user = await User.findById(decoded.id);
    console.log('Authenticated User:', user);
    if (!user) {
      return next(new Error('Unauthorized: Invalid token'));
    }

    // Attach user details to the request object
    req.user = user;
    console.log(user)

    next();
  } catch (error) {
    return next(error);
  }
};
