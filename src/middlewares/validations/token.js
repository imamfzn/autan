const Joi = require('joi');
const validateRequest = require('../validate-request');

module.exports = validateRequest(
  Joi.object({
    token: Joi.string().required(),
  }),
);
