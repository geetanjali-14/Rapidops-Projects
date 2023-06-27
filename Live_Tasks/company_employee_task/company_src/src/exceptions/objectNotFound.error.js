class ObjectNotFoundError extends Error {
    constructor(message) {
      super(message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ObjectNotFoundError);
      }
      this.name = 'ObjectNotFoundError';
      this.httpStatusCode = 404;
    }
  }
  
  module.exports = ObjectNotFoundError;
  