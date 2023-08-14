const { UNAUTHORIZED } = require('../utils/const');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = UNAUTHORIZED.name;
    this.statusCode = UNAUTHORIZED.statusCode;
  }
}

module.exports = UnauthorizedError;
