const sinon = require('sinon');
require('sinon-mongoose');
const bcrypt = require('bcrypt');

const User = require('../../../src/models/user');
const RefreshToken = require('../../../src/models/refresh-token');
const AuthService = require('../../../src/services/auth');

describe('AuthService#login', () => {
  const username = 'test123';
  const password = 'aman';
  const ip = '127.0.0.1';

  const user = new User({
    username,
    password: '$2b$10$NMhT8gHVyeOaxWVD1ezEYeYOrQpZ5pw/Or2v7CQ0D0SElJ2iDGl3i',
    role: 'user'
  });

  const refreshToken = new RefreshToken({ token: 'xxxx' });

  beforeEach(() => process.env.ACCESS_TOKEN_SECRET = 'rahasia');

  afterEach(() => sinon.restore());

  describe('login success', () => {
    beforeEach(() => {
      sinon.mock(User).expects('findOne').withArgs({ username }).resolves(user);
      sinon.mock(RefreshToken).expects('generate').returns(refreshToken);
      sinon.stub(RefreshToken.prototype, 'save').resolves();
    });

    it('can login', async () => {
      try {
        const payload = await AuthService.login({ username, password, ip });

        expect(payload).toHaveProperty('username');
        expect(payload).toHaveProperty('role');
        expect(payload).not.toHaveProperty('password');
        expect(payload.refreshToken).toEqual(refreshToken.token);
        expect(payload.accessToken).toBeDefined();
      } catch (err) {
        expect(err).toBeNull();
      }
    });
  });

  describe('invalid user/password', () => {
    beforeEach(() => {
      sinon.mock(User).expects('findOne').withArgs({ username }).resolves();
    });

    it('can\'t login', async () => {
      await expect(AuthService.login({ username, password, ip })).rejects.toThrow();
    });
  });
});
