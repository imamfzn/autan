const validations = require('./validations');

module.exports = {
  errorHandler: require('./error'),
  basicAuth: require('./basic_auth'),
  ...validations,
};
