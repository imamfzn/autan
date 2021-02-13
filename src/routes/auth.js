const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const AuthController = require('../controllers/auth');

const route = Router();

route.post(
  '/login',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  AuthController.login
);

route.put(
  '/_internal/users',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().valid('user', 'admin'),
    })
  }),
  AuthController.register
);

module.exports = route;
