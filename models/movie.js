const mongoose = require('mongoose');
const validator = require('validator');
const checkUrl = (url) => validator.isURL(url);

const requiredString = (string, min = 3, max = false, required = true) => ({
  type: String,
  ...(min && { minlength: [min, `${string} не может быть короче ${min} символов`] }),
  ...(max && { maxlength: [max, `${string} не может быть длиннее ${max} символов`] }),
  ...(required && { required: [ true, `${string} не может быть пустым`] }),
});

const urlString = (string) => ({
  ...requiredString(string),
  validate: {
    validator: checkUrl,
    message: `Ссылка для поля ${string.toLowerCase()} некорректна`,
  }
});

const movieSchema = new mongoose.Schema({
  country: {
    ...requiredString('Страна', 3, 80),
  },
  director: {
    ...requiredString('Режиссёр', 2, 80),
  },
  duration: {
    type: Number,
    min: [1, 'Продолжительность должна быть не меньше 1'],
    required: [true, 'Продолжительность не может быть пустой'],
  },
  year: {
    min: [1888, 'Год должен быть начиная с 1895'],
    max: [new Date().getFullYear(), 'Год не может быть больше текущего'],
    ...requiredString('Год', 4, 4),
  },
  description: {
    ...requiredString('Описание', 10),
  },
  image: urlString('Изображение'),
  trailerLink: urlString('Ссылка на трейлер'),
  thumbnail: urlString('Миниатюрное изображение'),
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Владелец не может быть пустым'],
  },
  movieId: {
    type: Number,
    min: [1, 'ID фильма должен быть не меньше 1'],
    required: [true, 'ID фильма не может быть пустым'],
  },
  nameRU: {
      ...requiredString('Название на русском', 2, 70),
    },
  nameEN: {
      ...requiredString('Название на английском', 2, 70),
    },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
