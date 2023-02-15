const jwt = require('jsonwebtoken');
const { createCustomError } = require('../utils/CustomError');

const asyncHandler = require('./asyncHandler');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader) {
    return next(createCustomError('Unauthorized', 401));
  }

  if (authHeader?.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        return next(createCustomError('Unauthorized', 401));
      }

      req.user = decode.user;
      next();
    });
  }
});

module.exports = validateToken;
