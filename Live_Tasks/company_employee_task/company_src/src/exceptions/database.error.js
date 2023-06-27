class DatabaseError extends Error {
  constructor(message) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }
    this.name = 'DatabaseError';
    this.httpStatusCode = 500;
  }
}

module.exports = DatabaseError;
