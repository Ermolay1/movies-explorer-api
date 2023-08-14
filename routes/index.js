const router = require('express').Router();
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const { NOT_FOUND } = require('../utils/const');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/joiValidation');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new DocumentNotFoundError(NOT_FOUND.message.routes));
});

module.exports = router;
