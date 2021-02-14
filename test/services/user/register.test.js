const sinon = require('sinon');
const User = require('../../../src/models/user');
const UserService = require('../../../src/services/user');

describe('register user', () => {
  const payload = { username: 'test1234', password: 'pass1234', role: 'user' };

  beforeEach(() => sinon.stub(User.prototype, 'save').returns());
  afterEach(() => sinon.restore());

  it('can be created', async () => {
    try {
      const user = await UserService.register(payload);

      expect(user).toHaveProperty('_id');
      expect(user).toHaveProperty('role', 'user');
      expect(user).not.toHaveProperty('password');
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
