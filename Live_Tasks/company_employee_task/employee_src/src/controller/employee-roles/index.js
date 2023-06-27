const useCases = require("../../use-cases");

const makeAssignRolesToEmployee = require("./assign-role-to-employee");
const createAssignRolesToEmployee = makeAssignRolesToEmployee({
  assignEmployeeRoles: useCases.employeeRoles.createAssignRolesToEmployee,
});

const makeFetchEmployeeRoles=require('./fetch-employee-roles')
const createFetchEmployeeRoles=makeFetchEmployeeRoles({
  fetchEmployeeRole:useCases.employeeRoles.createFetchEmployeeRole
})
module.exports = Object.freeze({
  createAssignRolesToEmployee,
  createFetchEmployeeRoles
});
