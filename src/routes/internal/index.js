const { Router } = require('express');

const route = Router();

route.use(require('../../middlewares/basic_auth'));
route.use('/users', require('./user'));

module.exports = route;
