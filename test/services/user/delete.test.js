const sinon = require('sinon');
require('sinon-mongoose');
const User = require('../../../src/models/user');
const UserService = require('../../../src/services/user');

describe('deleting user', () => {
  const userId = "602790f104f3832b5b0e4b7f";

  beforeEach(() => {
    sinon
      .mock(User)
      .expects('findByIdAndDelete')
      .withArgs(userId)
      .resolves()
  });

  afterEach(() => sinon.restore());

  it('can be deleted', async () => {
    await expect(UserService.delete(userId)).resolves.not.toThrow();
  });
});
