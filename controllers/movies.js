const http2 = require('http2').constants;
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const Forbidden = require('../errors/Forbidden');

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const newMovie = req.boby;

  Movie.create({ ...newMovie, owner: req.user._id })
    .then((movie) => {
      res.status(http2.HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      }
      return next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Нет такого фильма с такими данными.'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new Forbidden('Доступ к ресурсу запрещен');
      }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Введены неправильные данные.'));
      }
      return next(err);
    });
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovieById,
};
