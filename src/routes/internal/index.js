const { Router } = require('express');
const basicAuth = require('express-basic-auth')

const route = Router();

route.use(basicAuth(
  {
    users: {
      [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD,
    }
  }
));

route.use('/users', require('./user'));

module.exports = route;
