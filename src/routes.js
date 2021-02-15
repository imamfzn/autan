const { Router } = require('express');
const UserController = require('./controllers/user');
const validation = require('./middlewares/validations');

const route = Router();

const noop = (req, res, next) => res.json('ok');

route.post('/login', validation.loginValidation, UserController.login);
route.post('/refresh-token', noop);
route.post('/revoke-token', noop);
route.post('/users', validation.registerValidation, UserController.register);
route.get('/users/:id', validation.userIdValidation, UserController.get);
route.delete('/users/:id', validation.userIdValidation, UserController.remove);

module.exports = route;
