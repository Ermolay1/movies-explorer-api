const router = require('express').Router();
const { getMyUser, updateUser } = require('../controllers/users');

const { validationUpdateUser } = require('../middlewares/joiValidation');

router.get('/me', getMyUser);
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
