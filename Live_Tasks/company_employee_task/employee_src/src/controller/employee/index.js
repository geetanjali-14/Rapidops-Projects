const UseCases = require("../../use-cases");
const internalApis = require("../../internal-api-calls");
const geoip = require("geoip-lite");
const multer = require("multer");

const makeCreateEmployee = require("./create-employee");
const createCreateEmployee = makeCreateEmployee({
  createEmployee: UseCases.employee.createCreateEmployee,
  fetchCompanyIdByCompanyName:
    internalApis.createGetCompanyID,
  employeeEmailExists: UseCases.employee.createEmployeeEmailExists,
});

const makeGetCompanyNameByCompanyId = require("./get-company-name-by-company-id");
const createGetCompanyNameByCompanyId = makeGetCompanyNameByCompanyId({
  getCompanyNameByCompanyId:
    internalApis.createMakeGetCompanyByCompanyID,
});

const makeGetEmployeesByCompanyName = require("./get-employees-by-company-name");
const createGetEmployeesByCompanyName = makeGetEmployeesByCompanyName({
  getEmployees: UseCases.employee.createGetEmployeeByCompany,
});

const makeGetAllEmployees = require("./get-all-employees");
const createGetAllEmployees = makeGetAllEmployees({
  getAllEmployees: UseCases.employee.createGetAllEmployee,
});

const makeDeleteEmployee = require("./delete-employee");
const createDeleteEmployees = makeDeleteEmployee({
  deleteEmployee: UseCases.employee.createDeleteEmployee,
});

const makeDeleteMultipleEmployees = require("./delete-multiple-employee");
const createDeleteMultipleEmployees = makeDeleteMultipleEmployees({
  deleteMultipleEmployees: UseCases.employee.createDeleteMultipleEmployees,
});

const makeDeleteEmployeesOfDeletedCompany = require("./delete-employee-of-deleted-company");
const createDeleteEmployeesOfDeletedCompany =
  makeDeleteEmployeesOfDeletedCompany({
    deleteEmployeeOfDeletedCompany:
      UseCases.employee.createDeleteEmployeeOfDeletedCompany,
  });

const makeUpdateEmployee = require("./update-employee-details");
const createUpdateEmployee = makeUpdateEmployee({
  updateEmployee: UseCases.employee.createUpdateEmployee,
});

const makeUpdateEmployeeWhenCompanyTableUpdates = require("./update-employee-when-company-table-updates");
const createUpdateEmployeeWhenCompanyTableUpdates =
  makeUpdateEmployeeWhenCompanyTableUpdates({
    updateEmployeeWhenCompanyTableUpdates:
      UseCases.employee.createUpdateEmployeeWhenCompanyDetailsChanges,
  });

const makeUpdateEmployeeAccessToken = require("./update-employee-access-token");
const createUpdateEmployeeAccessToken = makeUpdateEmployeeAccessToken({
  updateEmployeeVerificationToken:
    UseCases.employee.createUpdateEmployeeAccessToken,
});

const makeEmployeeLogin = require("./employee-login");
const createEmployeeLogin = makeEmployeeLogin({
  employeeLogin: UseCases.employee.createEmployeeLogin,
  employeeIdByEmployeeEmail:
    UseCases.employee.createGetEmployeeIdByEmployeeEmail,
  insertAccessToken: UseCases.accessTokens.createInsertAccessToken,
  geoip,
});

const makeFilterEmployee = require("./filter-employee");
const createFilterEmployee = makeFilterEmployee({
  filterEmployee: UseCases.accessTokens.createFilterEmployee,
});

const makeUploadFile = require("./upload-file");
const createUploadFile = makeUploadFile({
  uploadFile: UseCases.employee.createUploadFile,
  multer,
});

const makeDownloadFile = require("./download-file");
const createDownloadFile = makeDownloadFile({
  downloadFile: UseCases.employee.createDownloadFile,
  multer,
});

const makeFetchEmployeeRole = require("./fetch-employee-role");
const createFetchEmployeeRole = makeFetchEmployeeRole({
  fetchEmployeeRole: UseCases.employeeRoles.createFetchEmployeeRole,
  fetchRoleNamesByRoleId: UseCases.roles.createfetchRoleNameByRoleId,
});

const makeAssignMasterRoleByMaster = require("./assign-master-by-master");
const createAssignMasterRoleByMaster = makeAssignMasterRoleByMaster({
 assignMasterRoleByMaster:UseCases.employee.createAssignMasterRoleByMaster,
});

module.exports = Object.freeze({
  createCreateEmployee,
  createGetCompanyNameByCompanyId,
  createGetEmployeesByCompanyName,
  createGetAllEmployees,
  createDeleteEmployees,
  createUpdateEmployee,
  createDeleteEmployeesOfDeletedCompany,
  createUpdateEmployeeWhenCompanyTableUpdates,
  createUpdateEmployeeAccessToken,
  createEmployeeLogin,
  createFilterEmployee,
  createDeleteMultipleEmployees,
  createUploadFile,
  createDownloadFile,
  createFetchEmployeeRole,
  createAssignMasterRoleByMaster,
});
