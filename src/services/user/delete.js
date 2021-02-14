const User = require('../../models/user');
const logger = require('../../lib/logger');

async function destroy(id) {
  try {
    await User.findByIdAndDelete(id);
  } catch (err) {
    logger.error(err);
    throw new Error('something wrong while deleting user.');
  }
}

module.exports = destroy;
