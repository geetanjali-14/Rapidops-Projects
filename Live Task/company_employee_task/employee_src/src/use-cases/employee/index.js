const Joi = require("joi");
const dataAccess = require("../../data-access");
const exceptions = require("../../exceptions");
const internalApis = require("../../internal-api-calls");
const { Kafka } = require("kafkajs");
var nodemailer = require("nodemailer");
const makeCreateEmployeeUseCase = require("./create_employee");
const createCreateEmployeeUseCase = makeCreateEmployeeUseCase({
  Joi,
  Kafka,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
  companyExists: internalApis.company_exists.getCompanyExists,
});

const makegetCompanyNameByCompanyId = require("./get_company_by_company_id");
const createGetCompanyNameByCompanyId = makegetCompanyNameByCompanyId({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
});

const makeEmployeeExistsUsecase = require("./employee_exists");
const createEmployeeExistsFunction = makeEmployeeExistsUsecase({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeGetEmployeeByCompanyUseCase = require("./get_employee_by_company_name");
const createGetEmployeeByCompanyUseCase = makeGetEmployeeByCompanyUseCase({
  Joi,
  employeeDB: dataAccess.employeeDB,
  companyExists: internalApis.company_exists.getCompanyExists,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeGetAllEmployeeUseCase = require("./get_all_employees");
const createGetAllEmployeeUseCase = makeGetAllEmployeeUseCase({
  employeeDB: dataAccess.employeeDB,
});

const makeDeleteEmployeeUseCase = require("./delete_employee");
const createDeleteEmployeeUseCase = makeDeleteEmployeeUseCase({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
  createEmployeeExistsFunction,
});

const makeDeleteEmployeeOfDeletedCompanyUseCase = require("./delete_employee_when_company_is_deleted");
const createDeleteEmployeeOfDeletedCompanyUseCase =
  makeDeleteEmployeeOfDeletedCompanyUseCase({
    Joi,
    employeeDB: dataAccess.employeeDB,
    companyExistsById: internalApis.company_exists_by_id.getCompanyExistsById,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

const makeUpdateEmployeeUseCase = require("./update_employee_details");
const createUpdateEmployeeUseCase = makeUpdateEmployeeUseCase({
  Joi,
  employeeDB: dataAccess.employeeDB,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
  createEmployeeExistsFunction,
});

const makeUpdateEmployeeWhenCompanyDetailsChangesUseCase = require("./update_employee_when_cmpany_details_upadtes");
const createUpdateEmployeeWhenCompanyDetailsChangesUseCase =
  makeUpdateEmployeeWhenCompanyDetailsChangesUseCase({
    Joi,
    employeeDB: dataAccess.employeeDB,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
    companyExistsById: internalApis.company_exists_by_id.getCompanyExistsById,
  });

const makeEmployeeCreationEmailSendUseCase = require("./send_email_on_employee_creation");
const createEmployeeCreationEmailSendUseCase =
  makeEmployeeCreationEmailSendUseCase({
    Joi,
    ValidationError: exceptions.ValidationError,
    nodemailer,
    getCompanyEmailbyCompanyId:internalApis.getCompanyEmailByCompanyID.getCompanyEmailByCompanyID,
  });

const makeEmployeeEmailExistsUseCase = require("./employee_email_exists");
const createEmployeeEmailExistsUseCase = makeEmployeeEmailExistsUseCase({
  Joi,
  employeeDB: dataAccess.employeeDB,
});
module.exports = Object.freeze({
  createCreateEmployeeUseCase,
  createGetCompanyNameByCompanyId,
  createGetEmployeeByCompanyUseCase,
  createGetAllEmployeeUseCase,
  createDeleteEmployeeUseCase,
  createEmployeeExistsFunction,
  createUpdateEmployeeUseCase,
  createDeleteEmployeeOfDeletedCompanyUseCase,
  createUpdateEmployeeWhenCompanyDetailsChangesUseCase,
  createEmployeeCreationEmailSendUseCase,
  createEmployeeEmailExistsUseCase
});
