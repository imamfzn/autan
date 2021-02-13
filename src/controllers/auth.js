const AuthService = require('../services/auth');

async function login(req, res, next){
  try {
    const { username, password } = req.body;
    const { user, token } = await AuthService.login(username, password);

    return res.status(201).json({ ...user, token });
  } catch (e) {
    return next(e);
  }
}

async function register(req, res, next){
  try {
    const user = await AuthService.register(req.body);

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  login,
  register,
};
