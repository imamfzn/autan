const User = require('../../models/user');

async function destroy(id) {
  try {
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
    throw new Error('something wrong while deleting user.');
  }
}

module.exports = destroy;
