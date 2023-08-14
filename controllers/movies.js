const mongoose = require('mongoose');
const Movie = require('../models/movie');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const { NOT_FOUND, BAD_REQUEST, FORBIDDEN } = require('../utils/const');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(200).send([]);
      }
      return next(err);
    });
};

const createMovie = (req, res, next) => {
  const newMovie = req.body;

  Movie.create({ ...newMovie, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(BAD_REQUEST.message.createMovie));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(FORBIDDEN.message.deleteMovie));
      }
      return Movie.deleteOne()
        .then(() => {
          res.status(200).send(movie);
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new DocumentNotFoundError(NOT_FOUND.message.deleteMovie));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError(BAD_REQUEST.message.deleteMovie));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
