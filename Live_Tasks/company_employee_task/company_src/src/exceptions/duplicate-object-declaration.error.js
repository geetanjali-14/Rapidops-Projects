class DuplicateObjectDeclarationError extends Error {
    constructor(message) {
      super(message);
      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, DuplicateObjectDeclarationError);
        }
        this.name = 'DuplicateObjectDeclarationError';
    }
  }
  
  module.exports = DuplicateObjectDeclarationError;
  