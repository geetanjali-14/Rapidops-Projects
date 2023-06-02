const Joi = require("joi");
const dataAccess = require("../../data-access");
const exceptions = require("../../exceptions");

const makeUpdateCompanyUseCase = require("./update_company");
const createUpdateCompanyFunction = makeUpdateCompanyUseCase({
  Joi,
  companyDB: dataAccess.companyDB,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeCompanyExistUseCase = require("./company_exists");
const createCompanyExistsCompanyFunction = makeCompanyExistUseCase({
  Joi,
  companyDB: dataAccess.companyDB,
  ValidationError: exceptions.ValidationError,
});

const makeCompanyExistsByNameUseCase = require("./company_exists_by_name");
const createCompanyExistsByNameCompanyFunction = makeCompanyExistsByNameUseCase(
  {
    Joi,
    companyDB: dataAccess.companyDB,
    ValidationError: exceptions.ValidationError,
  }
);

const makeCreateCompanyUseCase = require("./create_company");
const createCreateCompanyFunction = makeCreateCompanyUseCase({
  Joi,
  companyDB: dataAccess.companyDB,
  createCompanyExistsByNameCompanyFunction,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeDeleteCompanyUseCase = require("./delete_company");
const createDeleteCompanyFunction = makeDeleteCompanyUseCase({
  Joi,
  companyDB: dataAccess.companyDB,
  createCompanyExistsCompanyFunction,
  ValidationError: exceptions.ValidationError,
  ForbiddenError: exceptions.ForbiddenError,
});

const makeGetCompanyIdByCompanyNameUseCase = require("./find_id_by_company_name");
const createGetCompanyIdByCompanyNameFunction =
  makeGetCompanyIdByCompanyNameUseCase({
    Joi,
    companyDB: dataAccess.companyDB,
    createCompanyExistsByNameCompanyFunction,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

const makeGetCompanyNameByCompanyIdUseCase = require("./get_company_name_by_company_id");
const createGetCompanyNameByCompanyIdFunction =
  makeGetCompanyNameByCompanyIdUseCase({
    Joi,
    companyDB: dataAccess.companyDB,
    createCompanyExistsByNameCompanyFunction,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

  const makeGetCompanyEmailByCompanyIdUseCase = require("./get_company_email_by_company_id");
const createGetCompanyEmailByCompanyIdFunction =
makeGetCompanyEmailByCompanyIdUseCase({
    Joi,
    companyDB: dataAccess.companyDB,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
    createCompanyExistsCompanyFunction,
  });

const makeGetAllCompanyUseCase = require("./get_all_companies");
const createGetAllCompanyFunction = makeGetAllCompanyUseCase({
  Joi,
  companyDB: dataAccess.companyDB,
});

module.exports = Object.freeze({
  createCreateCompanyFunction,
  createUpdateCompanyFunction,
  createCompanyExistsCompanyFunction,
  createDeleteCompanyFunction,
  createGetCompanyIdByCompanyNameFunction,
  createCompanyExistsByNameCompanyFunction,
  createGetCompanyNameByCompanyIdFunction,
  createGetAllCompanyFunction,
  createGetCompanyEmailByCompanyIdFunction
});
