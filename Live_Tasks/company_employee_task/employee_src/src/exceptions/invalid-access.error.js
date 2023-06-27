class InvalidAccessError extends Error {
    constructor(message) {
      super(message);
      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, InvalidAccessError);
        }
        this.name = 'InvalidAccessError';
    }
  }
  
  module.exports = InvalidAccessError;
  