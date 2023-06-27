const ValidationError = require("./validation.error");
const ForbiddenError = require("./forbidden.error");
const DatabaseError = require("./database.error");
const ObjectNotFoundError = require("./objectNotFound.error");
const InvalidAccessError = require("./invalid-access.error");
const DuplicateObjectDeclarationError=require('./duplicate-object-declaration.error')
module.exports = {
  ValidationError,
  ForbiddenError,
  DatabaseError,
  ObjectNotFoundError,
  InvalidAccessError,
  DuplicateObjectDeclarationError,
};
