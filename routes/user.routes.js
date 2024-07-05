const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.post('/user/signup', userController.signup);

router.post('/user/signin', userController.signin);

module.exports = router;