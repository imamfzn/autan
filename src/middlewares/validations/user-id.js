const mongoose = require('mongoose');
const { UserNotFoundError } = require('../../lib/error');

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    next(new UserNotFoundError());
    return;
  }

  next();
};
