const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Incorrect email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new Unauthorized('Incorrect email or password.'))
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, passIsEqual]) => {
      if (!passIsEqual) {
        throw new Unauthorized('Incorrect email or password.');
      }

      return user;
    });
};

module.exports = mongoose.model('user', userSchema);
