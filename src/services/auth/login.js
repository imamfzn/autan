const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' },
  );
}

async function login(username, password) {
  const userRec = await User.findOne({ username });
  if (!userRec) {
    const error = new Error('invalid user / password');
    error.statusCode = 401;
    throw error;
  }

  if (!await bcrypt.compare(password, userRec.password)) {
    const error = new Error('invalid user / password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(userRec);
  const user = userRec.toObject();
  delete user.password;

  return { user, token };
}

module.exports = login;
