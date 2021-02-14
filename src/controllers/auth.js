const AuthService = require('../services/auth');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const { user, token } = await AuthService.login(username, password);

    return res.json({ ...user, token });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  login,
};
