const { celebrate, Joi, Segments } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const validateSignUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEX),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
});

const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),
});

const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateMovieId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const validateCreateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEX),
  }),
});

module.exports = {
  validateSignUp,
  validateLogin,
  validateUserId,
  validateMovieId,
  validateCreateMovie,
};
