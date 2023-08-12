const { ValidationError, CastError, DocumentNotFoundError, MongoError } = require('mongoose').Error;
const InternalServer = require('../errors/InternalServer');
const BadRequest = require('../errors/BadRequest');
const PageNotFound = require('../errors/PageNotFound');

module.exports.errorHandler = (err, res, next) => {
  switch (err.constructor) {
    case ValidationError: {
      const errors = Object.values(err.errors).map((error) => error.message);
      next(new BadRequest(`Validation error ${errors}`));
      break;
    }
    case CastError:
      next(new BadRequest(err.message));
      break;
    case DocumentNotFoundError:
      next(new PageNotFound(err.message));
      break;
    case MongoError:
      next(new InternalServer(err.message));
      break;
    default:
      next(new InternalServer(err.message));
  };
};
