const mongoose = require('mongoose');

const RegExpURL = /^(https?:\/\/(www\.)?)([-a-zA-Z0-9\W]){1,}/;
const RegExpEN = /[A-z]/;
const RegExpRU = /[А-я]/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => RegExpURL.test(url),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => RegExpURL.test(url),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => RegExpURL.test(url),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (name) => RegExpRU.test(name),
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (name) => RegExpEN.test(name),
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
