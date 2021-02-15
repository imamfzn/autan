const bcrypt = require('bcrypt');
const User = require('../../models/user');
const { UserAlreadyUsedError } = require('../../lib/error');

const basicDetails = ({ id, username, role }) => ({ id, username, role });

async function register({ username, password, role }) {
  const user = new User({ username, role });
  user.password = await bcrypt.hash(password, 10);

  try {
    await user.save();
  } catch (err) {
    throw (err.code === 11000 ? new UserAlreadyUsedError() : err);
  }

  return basicDetails(user);
}

module.exports = register;
