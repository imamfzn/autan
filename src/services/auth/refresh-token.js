const jwt = require('../../lib/jwt');
const { UnauthorizedError } = require('../../lib/error');
const RefreshToken = require('../../models/refresh-token');

const basicDetails = ({ id, username, role }) => ({ id, username, role });

async function refreshToken({ token, ip }) {
  const oldRefreshToken = await RefreshToken.findOne({ token }).populate('user');
  if (!oldRefreshToken || !oldRefreshToken.isActive) {
    throw new UnauthorizedError('Invalid token');
  }

  const { user } = oldRefreshToken;
  const newRefreshToken = RefreshToken.generate(user, ip);
  oldRefreshToken.revoked = new Date();
  oldRefreshToken.revoked_ip = ip;
  oldRefreshToken.replaced_token = newRefreshToken.token;

  await oldRefreshToken.save();
  await newRefreshToken.save();

  const accessToken = jwt.generate(user);

  return {
    ...basicDetails(user),
    accessToken,
    refreshToken: newRefreshToken.token,
  };
}

module.exports = refreshToken;
