const { Router } = require('express');

const route = Router();

route.use('/users', require('./user'));

module.exports = route;
