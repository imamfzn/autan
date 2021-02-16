const bcrypt = require('bcrypt');
const jwt = require('../../lib/jwt');
const User = require('../../models/user');
const RefreshToken = require('../../models/refresh-token');
const { InvalidLoginError } = require('../../lib/error');

const basicDetails = ({ id, username, role }) => ({ id, username, role });

async function login({ username, password, ip }) {
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new InvalidLoginError();
  }

  const accessToken = jwt.generate(user);
  const refreshToken = RefreshToken.generate(user, ip);

  await refreshToken.save();

  return {
    ...basicDetails(user),
    accessToken,
    refreshToken: refreshToken.token,
  };
}

module.exports = login;
