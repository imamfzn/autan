class AutanError extends Error {
  constructor(message) {
    super(message);
    this.httpStatus = 500;
    this.class = this.constructor;
  }
}

class UserNotFoundError extends AutanError {
  constructor(message = 'User not found') {
    super(message);
    this.httpStatus = 404;
  }
}

class ValidationError extends AutanError {
  constructor(details) {
    super(`Validation error: ${details}`);
    this.httpStatus = 400;
  }
}

class InvalidLoginError extends AutanError {
  constructor(message = 'Username or password incorrect') {
    super(message);
    this.httpStatus = 401;
  }
}

class UserAlreadyUsedError extends AutanError {
  constructor(message = 'Username already used') {
    super(message);
    this.httpStatus = 409;
  }
}

class InternalServerError extends AutanError {
  constructor(message = 'Something happened with our internal server :(') {
    super(message);
  }
}

module.exports = {
  AutanError,
  UserNotFoundError,
  ValidationError,
  InternalServerError,
  InvalidLoginError,
  UserAlreadyUsedError,
};
