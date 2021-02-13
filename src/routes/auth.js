const { Router } = require('express');

const AuthController = require('../controllers/auth');
const validation = require('../middlewares/validations');

const route = Router();

route.post('/login', validation.login, AuthController.login);

module.exports = route;
