const { DUPLICATE_KEY_ERROR } = require('../utils/const');

class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = DUPLICATE_KEY_ERROR.name;
    this.statusCode = DUPLICATE_KEY_ERROR.statusCode;
  }
}

module.exports = DuplicateKeyError;
