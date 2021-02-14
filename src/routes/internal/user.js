const { Router } = require('express');
const UserController = require('../../controllers/internal/user');
const validation = require('../../middlewares/validations');

const route = Router();

route.put('/', validation.register, UserController.register);
route.get('/:id', UserController.get);
route.delete('/:id', UserController.delete);

module.exports = route;
