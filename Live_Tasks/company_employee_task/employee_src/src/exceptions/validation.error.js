class ValidationError extends Error {
    constructor(message) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ValidationError);
      }
      this.name = 'ValidationError';
      this.httpStatusCode = 500;
    }
  }
  
  module.exports = ValidationError;
  