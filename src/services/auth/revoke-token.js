const { UnauthorizedError } = require('../../lib/error');
const RefreshToken = require('../../models/refresh-token');

async function revokeToken({ token, ip }){
  const refreshToken = await RefreshToken.findOne({ token });
  if (!(refreshToken && refreshToken.isActive)) {
    throw new UnauthorizedError('Invalid token');
  }

  refreshToken.revoked = new Date();
  refreshToken.revoked_ip = ip;
  await refreshToken.save();
}

module.exports = revokeToken;
