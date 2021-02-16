const humps = require('humps');
const UserService = require('../services/user');

function sendResponse(res, status = 200) {
  return function (payload) {
    return res.status(status).json(
      humps.decamelizeKeys(payload),
    );
  };
}

function get(req, res, next) {
  UserService.get(req.params.id).then(sendResponse(res)).catch(next);
}

function register(req, res, next) {
  UserService.register(req.body).then(sendResponse(res)).catch(next);
}

function remove(req, res, next) {
  UserService.remove(req.params.id)
    .then(() => res.json({ message: 'User has been deleted' }))
    .catch(next);
}

module.exports = {
  get,
  register,
  remove,
};
