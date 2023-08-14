const { BAD_REQUEST } = require('../utils/const');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = BAD_REQUEST.name;
    this.statusCode = BAD_REQUEST.statusCode;
  }
}

module.exports = ValidationError;
