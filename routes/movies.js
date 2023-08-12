const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovie);

router.post('/', celebrate({
  body: Joi.object({
    country: Joi.string().required().min(2).max(80),
    director: Joi.string().required().min(2).max(80),
    duration: Joi.number().required().min(1),
    year: Joi.number().integer().min(1895).max(new Date().getFullYear()),
    description: Joi.string().required().min(10),
    image: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required().min(1),
    nameRU: Joi.string().required().min(2).max(80),
    nameEN: Joi.string().required().min(2).max(80),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
