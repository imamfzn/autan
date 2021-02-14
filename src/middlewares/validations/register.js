const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'admin'),
  }),
});
