const UserService = require('../../services/user');

async function register(req, res, next){
  try {
    const user = await UserService.register(req.body);

    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next){
  try {
    await UserService.delete(req.params.id)
    res.status(200).json( {message: "user has been deleted."} );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  destroy,
  delete: destroy,
};
