class AutanError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.httpStatus = status;
    this.class = this.constructor;
  }
}

class UserNotFoundError extends AutanError {
  constructor(message = 'User not found') {
    super(message, 404);
  }
}

class ValidationError extends AutanError {
  constructor(details) {
    super(`Validation error: ${details}`, 400);
  }
}

class UnauthorizedError extends AutanError {
  constructor(message = 'You aren\'t authorize to access this') {
    super(message, 401);
  }
}

class InvalidLoginError extends AutanError {
  constructor(message = 'Username or password incorrect') {
    super(message, 401);
  }
}

class UserAlreadyUsedError extends AutanError {
  constructor(message = 'Username already used') {
    super(message, 409);
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
  UnauthorizedError,
  InternalServerError,
  InvalidLoginError,
  UserAlreadyUsedError,
};
