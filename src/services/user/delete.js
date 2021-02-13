const User = require('../../models/user');

async function destroy(id){
  const user = await User.findById(id);
  if (!user) {
    const error = new Error('user not found.');
    error.statusCode = 404;
    throw error;
  }

  await user.remove();
}

module.exports = destroy;
