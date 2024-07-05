const router = require('express').Router();

const {jwtMiddleware} = require('../jwtAuth/jwt');

const adminController = require('../controllers/admin.controller');

router.post('/admin/createUser',jwtMiddleware, adminController.createUser);

router.put('/admin/updateUser/:uId',jwtMiddleware, adminController.updateUser);

router.get('/admin/getUser',jwtMiddleware, adminController.getUser);

router.delete('/admin/deleteUser/:uId',jwtMiddleware, adminController.deleteUser);

module.exports = router;