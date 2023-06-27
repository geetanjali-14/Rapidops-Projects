const Joi = require("joi");
const dataAccess = require("../../data-access");
const exceptions = require("../../exceptions");
const internalApis = require("../../internal-api-calls");
const { Kafka } = require("kafkajs");
var nodemailer = require("nodemailer");
const crypto = require("crypto");
const AccessTokens = require("../access-token");
const { Storage } = require("@google-cloud/storage");
const gcpConfig = require("../../config/gcp-config/config.json");

const makeEmployeeEmailExists = require("./employee-email-exists");
const createEmployeeEmailExists = makeEmployeeEmailExists({
  Joi,
  employeeDB: dataAccess.employeeDB,
});

const makeIsMaster = require("./is-master");
const createIsMaster = makeIsMaster({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
});

const makeCreateEmployee = require("./create-employee");
const createCreateEmployee = makeCreateEmployee({
  Joi,
  Kafka,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  DuplicateObjectDeclarationError: exceptions.DuplicateObjectDeclarationError,
  ObjectNotFoundError: exceptions.InvalidAccessError,
  companyExists: internalApis.createCompanyExists,
  employeeEmailExists: createEmployeeEmailExists,
});

const makegetCompanyNameByCompanyId = require("./get-company-name-by-company-id");
const createGetCompanyNameByCompanyId = makegetCompanyNameByCompanyId({
  Joi,
  getCompanyNameByCompanyID: internalApis.getCompanyNameByCompanyID,
  ValidationError: exceptions.ValidationError,
});

const makeEmployeeExists = require("./employee-exists");
const createEmployeeExists = makeEmployeeExists({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});
const makeIsVerifiedEmployee = require("./is-verified-employee");
const createIsVerifiedEmployee = makeIsVerifiedEmployee({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
});

const makeGetEmployeeByCompany = require("./get-employee-by-company-name");
const createGetEmployeeByCompany = makeGetEmployeeByCompany({
  Joi,
  employeeDB: dataAccess.employeeDB,
  companyExists: internalApis.createCompanyExists,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeGetAllEmployee = require("./get-all-employees");
const createGetAllEmployee = makeGetAllEmployee({
  Joi,
  employeeDB: dataAccess.employeeDB,
  accessTokenExists: AccessTokens.createAccessTokenExists,
  accessTokenExpirationTime: AccessTokens.createGetAccessTokenExpirationTime,
  updateAccessTokenTime: AccessTokens.createUpdateAccessToken,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeDeleteEmployee = require("./delete-employee");
const createDeleteEmployee = makeDeleteEmployee({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  createEmployeeExists,
  isMaster: createIsMaster,
  isVerifiedEmployee: createIsVerifiedEmployee,
  accessTokenExists: AccessTokens.createAccessTokenExists,
  accessTokenExpirationTime: AccessTokens.createGetAccessTokenExpirationTime,
  updateAccessTokenTime: AccessTokens.createUpdateAccessToken,
  ObjectNotFoundError: exceptions.InvalidAccessError,
});

const makeDeleteMultipleEmployees = require("./delete-multiple-employee");
const createDeleteMultipleEmployees = makeDeleteMultipleEmployees({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  createEmployeeExists,
  getEmployeeIdFromAccessToken: AccessTokens.createGetEmployeeIdFromAccessToken,
  accessTokenExists: AccessTokens.createAccessTokenExists,
  accessTokenExpirationTime: AccessTokens.createGetAccessTokenExpirationTime,
  InvalidAccessError: exceptions.InvalidAccessError,
  ObjectNotFoundError: exceptions.ObjectNotFoundError,
});

const makeDeleteEmployeeOfDeletedCompany = require("./delete-employee-when-company-is-deleted");
const createDeleteEmployeeOfDeletedCompany = makeDeleteEmployeeOfDeletedCompany(
  {
    Joi,
    employeeDB: dataAccess.employeeDB,
    ValidationError: exceptions.ValidationError,
  }
);

const makeUpdateEmployee = require("./update-employee-details");
const createUpdateEmployee = makeUpdateEmployee({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  createEmployeeExists,
  companyExists: internalApis.getCompanyExists,
  fetchCompanyIdByCompanyName: internalApis.fetchCompanyIdByCompanyName,
  isVerifiedEmployee: createIsVerifiedEmployee,
  InvalidAccessError: exceptions.InvalidAccessError,
  ObjectNotFoundError: exceptions.ObjectNotFoundError,
});

const makeUpdateEmployeeWhenCompanyDetailsChanges = require("./update-employee-when-company-details-updates");
const createUpdateEmployeeWhenCompanyDetailsChanges =
  makeUpdateEmployeeWhenCompanyDetailsChanges({
    Joi,
    employeeDB: dataAccess.employeeDB,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
    companyExistsById: internalApis.getCompanyExistsById,
  });

const makeEmployeeCreationEmailSend = require("./send-email-on-employee-creation");
const createEmployeeCreationEmailSend = makeEmployeeCreationEmailSend({
  Joi,
  ValidationError: exceptions.ValidationError,
  nodemailer,
  getCompanyEmailbyCompanyId: internalApis.createGetCompanyEmailByCompanyID,
  crypto,
});

const makeUpdateEmployeeAccessToken = require("./update-employee-access-token");
const createUpdateEmployeeAccessToken = makeUpdateEmployeeAccessToken({
  Joi,
  employeeDB: dataAccess.employeeDB,
  createEmployeeEmailExists,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeGetEmployeeIdByEmployeeEmail = require("./get-employee-id-by-employee-email");
const createGetEmployeeIdByEmployeeEmail = makeGetEmployeeIdByEmployeeEmail({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
});

const makeEmployeeLogin = require("./employee-login");
const createEmployeeLogin = makeEmployeeLogin({
  Joi,
  employeeEmailExists: createEmployeeEmailExists,
  isVerifiedEmployee: createIsVerifiedEmployee,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
  employeeDB: dataAccess.employeeDB,
  getEmployeeIdByEmployeeEmail: createGetEmployeeIdByEmployeeEmail,
  generateAccessToken: AccessTokens.createGenerateAccessToken,
  InvalidAccessError: exceptions.InvalidAccessError,

});

const makeUploadFile = require("./upload-file");
const createUploadFile = makeUploadFile({
  Joi,
  Storage,
  gcpConfig,
  ValidationError: exceptions.ValidationError,
});

const makeDownloadFile = require("./download-file");
const createDownloadFile = makeDownloadFile({
  Joi,
  Storage,
  gcpConfig,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeAssignMasterRoleByMaster = require("./assign-master-by-master");
const createAssignMasterRoleByMaster = makeAssignMasterRoleByMaster({
  Joi,
  employeeDB: dataAccess.employeeDB,
  isMaster: createIsMaster,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

module.exports = Object.freeze({
  createCreateEmployee,
  createGetCompanyNameByCompanyId,
  createGetEmployeeByCompany,
  createGetAllEmployee,
  createDeleteEmployee,
  createEmployeeExists,
  createUpdateEmployee,
  createDeleteEmployeeOfDeletedCompany,
  createUpdateEmployeeWhenCompanyDetailsChanges,
  createEmployeeCreationEmailSend,
  createEmployeeEmailExists,
  createUpdateEmployeeAccessToken,
  createIsVerifiedEmployee,
  createEmployeeLogin,
  createGetEmployeeIdByEmployeeEmail,
  createDeleteMultipleEmployees,
  createUploadFile,
  createDownloadFile,
  createIsMaster,
  createAssignMasterRoleByMaster,
});
