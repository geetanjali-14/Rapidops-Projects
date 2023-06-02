const Joi = require("joi");
const useCases = require("../../../src/use-cases");
const internalApis = require("../../internal-api-calls");

const makeCreateEmployeeController = require("./create_employee");
const createCreateEmployeeController = makeCreateEmployeeController({
  Joi,
  companyExists: internalApis.company_exists.getCompanyExists,
  createEmployeeFunction: useCases.employee.createCreateEmployeeUseCase,
  fetchCompanyIdByCompanyName:internalApis.getCompanyID.fetchCompanyIdByCompanyName,
  employeeEmailExists:useCases.employee.createEmployeeEmailExistsUseCase
});

const makeGetCompanyByCompanyIdController = require("./get_company_by_company_id");
const createGetCompanyByCompanyIdController =
  makeGetCompanyByCompanyIdController({
    Joi,
    getCompanyByCompanyId:
      internalApis.getCompanyByCompanyID.getCompanyNameByCompanyID,
  });

const makeGetEmployeesByCompanyNameController = require("./get_employees_by_company_name");
const createGetEmployeesByCompanyNameController =
  makeGetEmployeesByCompanyNameController({
    Joi,
    getEmployees: useCases.employee.createGetEmployeeByCompanyUseCase,
  });

const makeGetAllEmployeesController = require("./get_all_employees");
const createGetAllEmployeesController = makeGetAllEmployeesController({
  Joi,
  getAllEmployees: useCases.employee.createGetAllEmployeeUseCase,
});

const makeDeleteEmployeeController = require("./delete_employee");
const createDeleteEmployeesController = makeDeleteEmployeeController({
  Joi,
  employeeExists: useCases.employee.createEmployeeExistsFunction,
  deleteEmployee: useCases.employee.createDeleteEmployeeUseCase,
});

const makeDeleteEmployeesOfDeletedCompanyController = require("./delete_employee_of_deleted_company");
const createDeleteEmployeesOfDeletedCompanyController =
  makeDeleteEmployeesOfDeletedCompanyController({
    Joi,
    companyExistsById: internalApis.company_exists_by_id.getCompanyExistsById,
    deleteEmployeeOfDeletedCompany:
      useCases.employee.createDeleteEmployeeOfDeletedCompanyUseCase,
  });

const makeUpdateEmployeeController = require("./update_employee_details");
const createUpdateEmployeeController = makeUpdateEmployeeController({
  Joi,
  employeeExists: useCases.employee.createEmployeeExistsFunction,
  updateEmployee: useCases.employee.createUpdateEmployeeUseCase,
  companyExists: internalApis.company_exists.getCompanyExists,
  fetchCompanyIdByCompanyName:
    internalApis.getCompanyID.fetchCompanyIdByCompanyName,
});

const makeUpdateEmployeeWhenCompanyTableUpdatesController = require("./update_employee_when_company_table_updates");
const createUpdateEmployeeWhenCompanyTableUpdatesController =
  makeUpdateEmployeeWhenCompanyTableUpdatesController({
    Joi,
    updateEmployeeWhenCompanyTableUpdates:
      useCases.employee.createUpdateEmployeeWhenCompanyDetailsChangesUseCase,
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
