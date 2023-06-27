const permissionList = require("../utilities/constant");
const useCase = require("../use-cases");
const makeCheckPermission = require("./check-permissions");
const exceptions=require('../exceptions')
const createCheckPermissions = makeCheckPermission({
  permissionList,
  getEmployeeRole: useCase.employeeRoles.createFetchEmployeeRole,
  getEmployeeIdByAccessToken:useCase.accessTokens.createGetEmployeeIdFromAccessToken,
  fetchPermissionFromRoleId:useCase.roles.createfetchPermissionsByRoleId,
  isMaster:useCase.employee.createIsMaster,
  accessTokenExists:useCase.accessTokens.createAccessTokenExists,
  accessTokenExpirationTime:useCase.accessTokens.createGetAccessTokenExpirationTime,
  InvalidAccessError:exceptions.InvalidAccessError,
});
module.exports = Object.freeze({
  createCheckPermissions,
});
