const User = require('../../models/user');
const { UserNotFoundError } = require('../../lib/error');

const basicDetails = ({ id, username, role }) => ({ id, username, role });

async function get(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new UserNotFoundError();
  }

  return basicDetails(user);
}

module.exports = get;
