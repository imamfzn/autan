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

module.exports = route;
