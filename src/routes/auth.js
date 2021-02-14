const { Router } = require('express');
const AuthController = require('../controllers/auth');
const { loginValidation } = require('../middlewares/validations');

const route = Router();

route.post('/login', loginValidation, AuthController.login);

module.exports = route;
