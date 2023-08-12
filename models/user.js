const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email не может быть пустым'],
    unique: [true, 'Email занят другим пользователем'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный email адрес',
    },
  },
  name: {
    type: String,
    minlength: [2, 'Имя пользователя должно быть не короче 2 символов'],
    maxlength: [30, 'Имя пользователя должно быть не длиннее 30 символов'],
    required: [true, 'Имя не может быть пустым']
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Пароль не может быть пустым'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильная почта или неверный пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильная почта или неверный пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);