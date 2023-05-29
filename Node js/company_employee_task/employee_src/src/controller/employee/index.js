const Joi=require('joi');
const useCases = require('../../../src/use-cases');
const internalApis=require('../../internal-api-calls');
const makeCreateEmployeeController = require('./create_employee');
const makeGetCompanyByCompanyIdController= require('./get_company_by_company_id')
const makeGetEmployeesByCompanyNameController= require('./get_employees_by_company_name')
const makeGetAllEmployeesController= require('./get_all_employees')
const makeDeleteEmployeeController=require('./delete_employee')
const makeUpdateEmployeeController=require('./update_employee_details')
const makeDeleteEmployeesOfDeletedCompanyController=require('./delete_employee_of_deleted_company')
const makeUpdateEmployeeWhenCompanyTableUpdatesController=require('./update_employee_when_company_table_updates')

const createCreateEmployeeController = makeCreateEmployeeController({
    Joi,
    companyExists:internalApis.company_exists.getCompanyExists,
    createEmployee: useCases.employee.createCreateEmployeeFunction,
    fetchCompanyIdByCompanyName:internalApis.getCompanyID.fetchCompanyIdByCompanyName
});

const createGetCompanyByCompanyIdController = makeGetCompanyByCompanyIdController({
    Joi,
    getCompanyByCompanyId:internalApis.getCompanyByCompanyID.getCompanyNameByCompanyID
});

const createGetEmployeesByCompanyNameController = makeGetEmployeesByCompanyNameController({
    Joi,
    getEmployees:useCases.employee.createGetEmployeeByCompanyUseCase
});

const createGetAllEmployeesController = makeGetAllEmployeesController({
    Joi,
    getAllEmployees:useCases.employee.createGetAllEmployeeUseCase
});

const createDeleteEmployeesController = makeDeleteEmployeeController({
    Joi,
    employeeExists:useCases.employee.createEmployeeExistsFunction,
    deleteEmployee:useCases.employee.createDeleteEmployeeUseCase,
});

const createDeleteEmployeesOfDeletedCompanyController = makeDeleteEmployeesOfDeletedCompanyController({
    Joi,
    deleteEmployeeOfDeletedCompany:useCases.employee.createDeleteEmployeeOfDeletedCompanyUseCase,
});

const createUpdateEmployeeController = makeUpdateEmployeeController({
    Joi,
    employeeExists:useCases.employee.createEmployeeExistsFunction,
    updateEmployee:useCases.employee.createUpdateEmployeeUseCase,
    companyExists:internalApis.company_exists.getCompanyExists,
    fetchCompanyIdByCompanyName:internalApis.getCompanyID.fetchCompanyIdByCompanyName
});

const createUpdateEmployeeWhenCompanyTableUpdatesController = makeUpdateEmployeeWhenCompanyTableUpdatesController({
    Joi,
    updateEmployeeWhenCompanyTableUpdates:useCases.employee.createUpdateEmployeeWhenCompanyDetailsChangesUseCase
});

module.exports = Object.freeze({
    createCreateEmployeeController,
    createGetCompanyByCompanyIdController,
    createGetEmployeesByCompanyNameController,
    createGetAllEmployeesController,
    createDeleteEmployeesController,
    createUpdateEmployeeController,
    createDeleteEmployeesOfDeletedCompanyController,
    createUpdateEmployeeWhenCompanyTableUpdatesController,
});