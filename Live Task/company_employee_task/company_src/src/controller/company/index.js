const Joi=require('joi');
const useCases = require('../../use-cases');
const internalApis=require('../../internal-api-calls')

const makeCreateCompanyController = require('./create_company');
const createCreateCompanyController = makeCreateCompanyController({
    Joi,
    createCompany: useCases.company.createCreateCompanyFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});


const makeGetAllEmployeesOfCompanyController=require('./get_all_employee_of_company_')
const createGetAllEmployeesOfCompanyController = makeGetAllEmployeesOfCompanyController({
    Joi,
    getAllEmployeeofCompany:internalApis.getAllEmployeeofCompany.getAllEmployeesOfCompanyFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});


const makeGetAllCompanyController= require('./get_all_company')
const createGetAllCompanyController = makeGetAllCompanyController({
    Joi,
    getAllCompany:useCases.company.createGetAllCompanyFunction,
});


const makeUpdateCompanyController = require('./update_company');
const createUpdateCompanyController = makeUpdateCompanyController({
    Joi,
    updateCompany: useCases.company.createUpdateCompanyFunction,
    companyExists:useCases.company.createCompanyExistsCompanyFunction,
    updateCompanyDetailsInEmployeeTable:internalApis.updateCompanyDetailsInEmployeeTable.updateCompanyDetailsInEmployeeTableFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});


const makeDeleteCompanyController = require('./delete_company');
const createDeleteCompanyController = makeDeleteCompanyController({
    Joi,
    deleteCompany: useCases.company.createDeleteCompanyFunction,
    companyExists:useCases.company.createCompanyExistsCompanyFunction,
    deleteEmployeeOfDeletedCompany:internalApis.deleteEmployeeOfDeletedCompany.deleteEmployeeOfDeletedCompanyFunction
});


const makeGetCompanyIdByCompanyNameController=require('./get_company_id_by_company_name')
const  createGetCompanyIdByCompanyNameController= makeGetCompanyIdByCompanyNameController({
    Joi,
    getCompanyIdByCompanyName:useCases.company.createGetCompanyIdByCompanyNameFunction,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});


const makeGetCompanyNameByCompanyIdController=require('./get_company_name_by_company_id')
const  createGetCompanyNameByCompanyIdController= makeGetCompanyNameByCompanyIdController({
    Joi,
    getCompanyNameByCompanyId:useCases.company.createGetCompanyNameByCompanyIdFunction,
    companyExists:useCases.company.createCompanyExistsCompanyFunction,
});

const makeGetCompanyEmailByCompanyIdController=require('./get_company_email_by_company_id')
const  createGetCompanyEmailByCompanyIdController= makeGetCompanyEmailByCompanyIdController({
    Joi,
    getCompanyEmailByCompanyId:useCases.company.createGetCompanyEmailByCompanyIdFunction,
    companyExists:useCases.company.createCompanyExistsCompanyFunction,
});


const makeCompanyExistsByNameController=require('./company_exists-by-name')
const  createCompanyExistsbyNameController= makeCompanyExistsByNameController({
    Joi,
    companyExistsByName:useCases.company.createCompanyExistsByNameCompanyFunction,
});


const makeCompanyExistsController=require('./company_exists_by_id')
const  createCompanyExistController= makeCompanyExistsController({
    Joi,
    companyExistsById:useCases.company.createCompanyExistsCompanyFunction,
});

module.exports = Object.freeze({
    createCreateCompanyController,
    createUpdateCompanyController,
    createDeleteCompanyController,
    createGetCompanyIdByCompanyNameController,
    createCompanyExistsbyNameController,
    createCompanyExistController,
    createGetCompanyNameByCompanyIdController,
    createGetCompanyEmailByCompanyIdController,
    createGetAllEmployeesOfCompanyController,
    createGetAllCompanyController,
});