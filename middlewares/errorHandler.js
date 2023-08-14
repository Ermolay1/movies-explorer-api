const SERVER_ERROR = require('../utils/const');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR.statusCode, message = SERVER_ERROR.message } = err;
  res.status(statusCode).send({ message });
};

module.exports = {
  errorHandler,
};
