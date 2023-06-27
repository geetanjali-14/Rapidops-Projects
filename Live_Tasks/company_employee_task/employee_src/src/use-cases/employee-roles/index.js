const Joi = require("joi");
const dataAccess = require("../../data-access");
const exceptions = require("../../exceptions");
const EmployeeUseCases=require('../../use-cases/employee')
const rolesUseCase=require('../../use-cases/roles');
const makeAssignRolesToEmployee = require("./assign-roles-to-employee");
const createAssignRolesToEmployee = makeAssignRolesToEmployee({
  Joi,
  employeeRolesDB: dataAccess.employeeRolesDB,
  isMaster:EmployeeUseCases.createIsMaster,
  employeeExists:EmployeeUseCases.createEmployeeExists,
  ValidationError:exceptions.ValidationError,
  ObjectNotFoundError:exceptions.ObjectNotFoundError,
  InvalidAccessError:exceptions.InvalidAccessError,
  roleExists:rolesUseCase.createRoleExists,
  fetchRoleId:rolesUseCase.createfetchRoleId,
});

const makeFetchEmployeeRole=require('./fetch-employee-roles');
const createFetchEmployeeRole=makeFetchEmployeeRole({
  Joi,
  employeeRolesDB: dataAccess.employeeRolesDB,
  ValidationError:exceptions.ValidationError,
  InvalidAccessError:exceptions.InvalidAccessError,

})
module.exports = Object.freeze({
    createAssignRolesToEmployee,
    createFetchEmployeeRole,
});
