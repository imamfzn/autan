const { isCelebrateError } = require('celebrate');

module.exports = function(err, req, res, next){
  if (isCelebrateError(err)){
    const details = [...err.details.entries()].map(([_, joiError]) => joiError.message);
    const message = "invalid request.";

    return res.status(400).json({ message, details });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "something wrong.";

  return res.status(statusCode).json({ message });
}
