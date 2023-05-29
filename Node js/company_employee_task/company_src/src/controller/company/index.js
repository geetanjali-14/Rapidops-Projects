const Joi=require('joi');
const useCases = require('../../use-cases');
const internalApis=require('../../internal-api-calls')
const makeCreateCompanyController = require('./create_company');
const makeUpdateCompanyController = require('./update_company');
const makeDeleteCompanyController = require('./delete_company');
const makeGetCompanyIdByCompanyNameController=require('./get_company_id_by_company_name')
const makeCompanyExistsByNameController=require('./company_exists-by-name')
const makeGetCompanyNameByCompanyIdController=require('./get_company_name_by_company_id')
const makeGetAllEmployeesOfCompanyController=require('./get_all_employee_of_company_')
const makeGetAllCompanyController= require('./get_all_company')

const createGetAllEmployeesOfCompanyController = makeGetAllEmployeesOfCompanyController({
    Joi,
    getAllEmployeeofCompany:internalApis.getAllEmployeeofCompany.getAllEmployeesOfCompanyFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});

const createGetAllCompanyController = makeGetAllCompanyController({
    Joi,
    getAllCompany:useCases.company.createGetAllCompanyFunction,
});

const createCreateCompanyController = makeCreateCompanyController({
    Joi,
    createCompany: useCases.company.createCreateCompanyFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});

const createUpdateCompanyController = makeUpdateCompanyController({
    Joi,
    updateCompany: useCases.company.createUpdateCompanyFunction,
    companyExists:useCases.company.createCompanyExistsCompanyFunction,
    updateCompanyDetailsInEmployeeTable:internalApis.updateCompanyDetailsInEmployeeTable.updateCompanyDetailsInEmployeeTableFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});

const createDeleteCompanyController = makeDeleteCompanyController({
    Joi,
    deleteCompany: useCases.company.createDeleteCompanyFunction,
    companyExists:useCases.company.createCompanyExistsCompanyFunction,
    deleteEmployeeOfDeletedCompany:internalApis.deleteEmployeeOfDeletedCompany.deleteEmployeeOfDeletedCompanyFunction
});

const  createGetCompanyIdByCompanyNameController= makeGetCompanyIdByCompanyNameController({
    Joi,
    getCompanyIdByCompanyName:useCases.company.createGetCompanyIdByCompanyNameFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});

const  createGetCompanyNameByCompanyIdController= makeGetCompanyNameByCompanyIdController({
    Joi,
    getCompanyNameByCompanyId:useCases.company.createGetCompanyNameByCompanyIdFunction,
    companyExists:useCases.company.createCompanyExistsCompanyFunction,
});

const  createCompanyExistsbyNameController= makeCompanyExistsByNameController({
    Joi,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});

module.exports = Object.freeze({
    createCreateCompanyController,
    createUpdateCompanyController,
    createDeleteCompanyController,
    createGetCompanyIdByCompanyNameController,
    createCompanyExistsbyNameController,
    createGetCompanyNameByCompanyIdController,
    createGetAllEmployeesOfCompanyController,
    createGetAllCompanyController,
});