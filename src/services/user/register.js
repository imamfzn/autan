const bcrypt = require("bcrypt");
const User = require('../../models/user');

async function register({username, password, role}){
  const userExists = await User.findOne({ username });
  if (userExists) {
    const error = new Error('username already taken.');
    error.statusCode = 409;
    throw error;
  }

  const userRegister = new User({username, role});
  userRegister.password = await bcrypt.hash(password, 10);
  await userRegister.save();

  const user = userRegister.toObject();
  delete user.password;

  return user;
}

module.exports = register;
