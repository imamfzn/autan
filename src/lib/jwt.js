const jwt = require('jsonwebtoken');

function generate({ id, username, role }) {
  return jwt.sign({ id, username, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {
  generate,
};
