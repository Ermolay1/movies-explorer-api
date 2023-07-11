const router = require('express').Router();
const usersController = require('../controllers/users');
const movieController = require('../controllers/movies');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const {
  validateSignUp,
  validateLogin,
  validateUserId,
  validateMovieId,
  validateCreateMovie,
} = require('../middlewares/validation');

router.post('/signup', validateSignUp, usersController.createUser);
router.post('/signin', validateLogin, usersController.login);

router.use(auth);

router.get('/users', usersController.getUsers);
router.get('/users/me', usersController.getUserInfo);
router.get('/users/:userId', validateUserId, usersController.getUserById);

router.get('/movies', movieController.getMovie);
router.post('/movies', validateCreateMovie, movieController.createMovie);
// eslint-disable-next-line no-whitespace-before-property
router.delete('/movies/movieId', validateMovieId, movieController. deleteMovieById);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ой страница не найдена. (✖╭╮✖) '));
});

module.exports = router;
