const { Router } = require('express');
const UserController = require('./controllers/user');
const AuthController = require('./controllers/auth');
const validation = require('./middlewares/validations');

const route = Router();

route.post('/auth/login', validation.loginValidation, AuthController.login);
route.post('/auth/refresh-token', validation.tokenValidation, AuthController.refreshToken);
route.post('/auth/revoke-token', validation.tokenValidation, AuthController.revokeToken);

route.post('/users', validation.registerValidation, UserController.register);
route.get('/users/:id', validation.userIdValidation, UserController.get);
route.delete('/users/:id', validation.userIdValidation, UserController.remove);

module.exports = route;
