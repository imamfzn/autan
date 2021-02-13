const bcrypt = require("bcrypt");
const User = require('../../models/user');

async function register({username, password, role}){
  const userRegister = new User({ username, role });

  try {
    userRegister.password = await bcrypt.hash(password, 10);
  } catch (err) {
    console.error(err);
    throw new Error("something wrong, can't create new user.");
  }

  try {
    await userRegister.save();
  } catch (err) {
    if (err.code == 11000){
      const error = new Error('username already taken.');
      error.statusCode = 409;
      throw error;
    }

    console.error(err);
    throw new Error("something wrong, can't create new user.");
  }

  const user = userRegister.toObject();
  delete user.password;

  return user;
}

module.exports = register;
