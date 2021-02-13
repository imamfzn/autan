const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const UserController = require('../../controllers/internal/user');

const route = Router();

route.put(
  '/',
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().valid('user', 'admin'),
    })
  }),
  UserController.register
);

route.delete('/:id', UserController.delete);

module.exports = route;
