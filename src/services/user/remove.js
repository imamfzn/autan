const User = require('../../models/user');

module.exports = function (id) {
  return User.findByIdAndDelete(id);
};
