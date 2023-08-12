const PageNotFoundError = require('../errors/PageNotFound');

module.exports.pageNotFound = (req, res, next) => next(new PageNotFoundError('Страница не найдена'));
