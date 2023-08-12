const router = require('express').Router();
const auth = require('./auth');
const movies = require('./movies');
const users = require('./users');
const pageNotFound = require('./pageNotFound');
const { checkAuthorizedUser } = require('../middlewares/auth');

router.use('/', auth);
router.use('/movies', checkAuthorizedUser, movies);
router.use('/users', checkAuthorizedUser, users);
router.use(pageNotFound);

module.exports = router;
