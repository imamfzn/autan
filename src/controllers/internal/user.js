const UserService = require('../../services/user');

async function register(req, res, next){
  try {
    const user = await UserService.register(req.body);

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = {
    register
};
