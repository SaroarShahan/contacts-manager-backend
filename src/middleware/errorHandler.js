const { CustomError } = require('../utils/CustomError');

exports.errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      data: null,
    });
  }

  return res.status(500).json({
    message: 'Something went wrong',
  });
};
