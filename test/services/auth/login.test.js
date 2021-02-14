const sinon = require('sinon');
require('sinon-mongoose');
const bcrypt = require('bcrypt');
const User = require('../../../src/models/user');
const AuthService = require('../../../src/services/auth');

describe('AuthService#login', () => {
  const user = new User({
    username: 'test123',
    password: '$2b$10$NMhT8gHVyeOaxWVD1ezEYeYOrQpZ5pw/Or2v7CQ0D0SElJ2iDGl3i',
    role: 'user'
  });

  afterEach(() => sinon.restore());

  describe('login success', () => {
    beforeEach(() => {
      process.env.ACCESS_TOKEN_SECRET = 'rahasia';

      sinon
        .mock(User)
        .expects('findOne')
        .withArgs({ username: user.username })
        .resolves(user);
    });

    it('can login', async () => {
      try {
        const { user, token } = await AuthService.login('test123', 'aman');
        expect(token).toBeDefined();
        expect(token).not.toBeNull();
        expect(user).not.toHaveProperty('password');
        expect(user).toHaveProperty('_id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('role');
      } catch (err) {
        expect(err).toBeNull();
      }
    });
  });

  describe('invalid user/password', () => {
    beforeEach(() => {
      sinon
        .mock(User)
        .expects('findOne')
        .withArgs({ username: user.username })
        .resolves();
    });

    it('can\'t login', async () => {
      await expect(AuthService.login('test123', 'aman')).rejects.toThrow();
    });
  });
});
