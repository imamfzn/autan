const validations = require('./validations');

module.exports = {
  errorHandler: require('./error'),
  basicAuth: require('./basic-auth'),
  requestLog: require('./request-log'),
  ...validations,
};
