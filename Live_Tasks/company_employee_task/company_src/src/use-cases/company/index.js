const Joi = require("joi");
const dataAccess = require("../../data-access");
const exceptions = require("../../exceptions");
const makeCompanyExist = require("./company-exists");
const createCompanyExists = makeCompanyExist({
  Joi,
  companyDB: dataAccess.companyDB,
  ValidationError: exceptions.ValidationError,
});
const makeCompanyExistsByName = require("./company-exists-by-name");
const createCompanyExistByName = makeCompanyExistsByName(
  {
    Joi,
    companyDB: dataAccess.companyDB,
    ValidationError: exceptions.ValidationError,
  }
);

const makeUpdateCompany = require("./update-company");
const createUpdateCompany = makeUpdateCompany({
  Joi,
  companyDB: dataAccess.companyDB,
  ValidationError: exceptions.ValidationError,
  DuplicateObjectDeclarationError: exceptions.DuplicateObjectDeclarationError,
  ObjectNotFoundError:exceptions.ObjectNotFoundError,
  createCompanyExists,
  createCompanyExistByName
});



const makeCreateCompany= require("./create-company");
const createCompany = makeCreateCompany({
  Joi,
  companyDB: dataAccess.companyDB,
  createCompanyExistByName,
  ValidationError: exceptions.ValidationError,
  DuplicateObjectDeclarationError:exceptions.DuplicateObjectDeclarationError
});

const makeDeleteCompany= require("./delete-company");
const createDeleteCompany = makeDeleteCompany({
  Joi,
  companyDB: dataAccess.companyDB,
  createCompanyExists,
  ValidationError: exceptions.ValidationError,
  ObjectNotFoundError: exceptions.ObjectNotFoundError,
});

const makeGetCompanyIdByCompanyName= require("./get-id-by-company-name");
const createGetCompanyIdByCompanyName =
  makeGetCompanyIdByCompanyName({
    Joi,
    companyDB: dataAccess.companyDB,
    createCompanyExistByName,
    ValidationError: exceptions.ValidationError,
    ObjectNotFoundError: exceptions.ObjectNotFoundError,
  });

const makeGetCompanyNameByCompanyId= require("./get-company-name-by-company-id");
const createGetCompanyNameByCompanyId =
  makeGetCompanyNameByCompanyId({
    Joi,
    companyDB: dataAccess.companyDB,
    createCompanyExists,
    ValidationError: exceptions.ValidationError,
    ObjectNotFoundError: exceptions.ObjectNotFoundError,
  });

  const makeGetCompanyEmailByCompanyId= require("./get-company-email-by-company-id");
const createGetCompanyEmailByCompanyId =
makeGetCompanyEmailByCompanyId({
    Joi,
    companyDB: dataAccess.companyDB,
    ValidationError: exceptions.ValidationError,
  });

const makeGetAllCompany= require("./get-all-companies");
const createGetAllCompany = makeGetAllCompany({
  Joi,
  companyDB: dataAccess.companyDB,
});

module.exports = Object.freeze({
  createCompany,
  createUpdateCompany,
  createCompanyExists,
  createDeleteCompany,
  createGetCompanyIdByCompanyName,
  createCompanyExistByName,
  createGetCompanyNameByCompanyId,
  createGetAllCompany,
  createGetCompanyEmailByCompanyId
});
