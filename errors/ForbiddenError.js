const { FORBIDDEN } = require('../utils/const');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = FORBIDDEN.name;
    this.statusCode = FORBIDDEN.statusCode;
  }
}

module.exports = ForbiddenError;
