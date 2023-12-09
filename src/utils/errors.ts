class TokenInvalidError extends Error {
  code = 401;
  constructor(message: string = "Token invalid") {
    super(message);
    this.name = "TokenInvalidError";
    this.message = message;
    this.code = 401;
  }
}

class UserNotFound extends Error {
  code = 404;
  constructor(message: string = "User not found") {
    super(message);
    this.name = "UserNotFound";
    this.message = message;
  }
}

class UserAlreadyExists extends Error {
  code = 409;
  constructor(message: string = "User already exists") {
    super(message);
    this.name = "UserAlreadyExists";
    this.message = message;
  }
}

class NotCreatedError extends Error {
  code = 400;
  constructor(message: string = "Not created") {
    super(message);
    this.name = "NotCreatedError";
    this.message = message;
  }
}

class InvalidEmailOrPasswordError extends Error {
  code = 401;
  constructor(message: string = "Invalid email or password") {
    super(message);
    this.name = "InvalidEmailOrPasswordError";
    this.message = message;
  }
}

export {
  TokenInvalidError,
  UserNotFound,
  InvalidEmailOrPasswordError,
  UserAlreadyExists,
  NotCreatedError,
};
