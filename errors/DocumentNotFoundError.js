const { NOT_FOUND } = require('../utils/const');

class DocumentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = NOT_FOUND.name;
    this.statusCode = NOT_FOUND.statusCode;
  }
}

module.exports = DocumentNotFoundError;
