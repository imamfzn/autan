const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

async function login(username, password){
  const userRec = await User.findOne({ username });
  if (!userRec) {
    throw new Error('User not found.');
  }

  if (!await bcrypt.compare(password, userRec.password)){
    throw new Error('Invalid password.');
  }

  const token = generateToken(userRec);
  const user = userRec.toObject();
  delete user.password;

  return { user, token };
}

function generateToken(user){
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = login;