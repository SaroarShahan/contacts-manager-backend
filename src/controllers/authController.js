const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const { createCustomError } = require('../utils/CustomError');

/**
 * @description Register a users
 *
 * @route POST /api/v1/auth/register
 * @access public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(createCustomError('All the fields are required', 400));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(createCustomError('User already exists', 400));
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });

  res.status(200).json({
    message: 'Registration successful',
    data: {
      user: newUser,
    },
  });
});

/**
 * @description Login a users
 *
 * @route POST /api/v1/auth/login
 * @access public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createCustomError('Email and password are required', 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createCustomError('Invalid email or password', 400));
  }

  const isPasswordMatched = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatched) {
    return next(createCustomError('Invalid email or password', 400));
  }

  const token = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    },
    process.env.SECRET,
    { expiresIn: '1d' },
  );

  res.status(200).json({
    message: 'Login successful',
    data: {
      accessToken: token,
    },
  });
});
