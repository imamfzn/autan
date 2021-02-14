const User = require('../../models/user');
const UserService = require('../../services/user');

async function register(req, res, next) {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    await UserService.delete(req.params.id);
    res.status(200).json({ message: 'user has been deleted.' });
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      const error = new Error('user not found.');
      error.statusCode = 404;
      next(error);
      return;
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    next(new Error('something wrong, can\'t get user.'));
  }
}

module.exports = {
  get,
  register,
  destroy,
  delete: destroy,
};
