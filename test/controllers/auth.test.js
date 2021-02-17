const sinon = require('sinon');
require('sinon-mongoose');

const AuthService = require('../../src/services/auth');
const AuthController = require('../../src/controllers/auth');
const { InvalidLoginError } = require('../../src/lib/error');

describe('AuthController#login', () => {
  const req = {
    body: {
      username: 'user123',
      password: 'pass123',
    },
  }

  afterEach(() => sinon.restore());

  describe('login success', () => {
    const username = 'user123';
    const accessToken = 'abcd123';
    const refreshToken = 'xxxx';
    const authResult = { username, accessToken, refreshToken };

    // dummy controller params
    const next = err => err;
    const res = { status() { return this }, json() { } };

    beforeEach(() => {
      sinon.stub(AuthService, 'login').resolves(authResult);
      sinon.spy(res, 'json');
    });

    it('successfull', async () => {
      await expect(AuthController.login(req, res, next)).resolves;
      expect(res.json.calledOnce).toBeTruthy();
    });
  });

  describe('login failed', () => {
    const res = {};

    beforeEach(() => {
      sinon.stub(AuthService, 'login').rejects(new InvalidLoginError());
    });

    it('failed to login', async () => {
      AuthController.login(req, res, (err) => {
        expect(err).toBeInstanceOf(InvalidLoginError);
      });
    });
  });
});
