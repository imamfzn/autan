const sinon = require('sinon');
require('sinon-mongoose');
const AuthService = require('../../src/services/auth');
const AuthController = require('../../src/controllers/auth');

describe('AuthController#login', () => {
  const req = {
    body: {
      username: 'user123',
      password: 'pass123',
    },
  }

  afterEach(() => sinon.restore());

  describe('login success', () => {
    const user = { username: 'user123' };
    const token = 'abcd123';
    const authResult = { user, token };

    // dummy controller params
    const next = err => err;
    const res = { json: () => {} };

    beforeEach(() => {
      sinon.stub(AuthService, 'login').resolves(authResult);
      sinon.spy(res, 'json');
    });

    it('successfull', async () => {
      expect(await AuthController.login(req, res, next)).resolves;
      expect(res.json.withArgs({...user, token}).calledOnce).toBeTruthy();
    });
  });

  describe('login failed', () => {
    const res = {};
    const next = sinon.spy();
    const loginError = new Error('failed to login.');

    beforeEach(() => {
      sinon.stub(AuthService, 'login').rejects(loginError);
    });

    it('failed to login', async () => {
      expect(await AuthController.login(req, res, next)).rejects;
      expect(next.withArgs(loginError).calledOnce).toBeTruthy();
    });
  });
});
