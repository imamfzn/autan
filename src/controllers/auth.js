const humps = require('humps');
const AuthService = require('../services/auth');

function sendResponse(res, status = 200) {
  return function (payload) {
    return res.status(status).json(
      humps.decamelizeKeys(payload),
    );
  };
}

function login(req, res, next) {
  const { username, password } = req.body;
  const { ip } = req;

  AuthService.login({ username, password, ip })
    .then(sendResponse(res))
    .catch(next);
}

function refreshToken(req, res, next) {
  const { token } = req.body;
  const { ip } = req;

  AuthService.refreshToken({ token, ip }).then(sendResponse(res)).catch(next);
}

function revokeToken(req, res, next) {
  const { token } = req.body;
  const { ip } = req;

  AuthService.revokeToken({ token, ip })
    .then(() => res.json({ message: 'Token has been revoked.' }))
    .catch(next);
}

module.exports = {
  login,
  refreshToken,
  revokeToken,
};
