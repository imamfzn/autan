const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { InvalidLoginError } = require('../../lib/error');

function generateJwtToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' },
  );
}

function generateRefreshToken() {
  return null;
}

const basicDetails = ({ id, username, role }) => ({ id, username, role });

async function login({ username, password, ip }) {
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new InvalidLoginError();
  }

  const accessToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user, ip);

  // TO-DO
  // save refresh token to database

  return {
    ...basicDetails(user),
    accessToken,
    refreshToken,
  };
}

module.exports = login;
