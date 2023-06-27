class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ForbiddenError);
      }
      this.name = 'ForbiddenError';
      this.httpStatusCode = 403;
    }
  }
  
  module.exports = ForbiddenError;
  