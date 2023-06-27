const Joi = require("joi");
const dataAccess = require("../../data-access");
const exceptions = require("../../exceptions");
const permissionList=require('../../utilities/constant')
const employeeUsecases=require('../employee')
const accessTokenUsecases=require('../access-token')

const makeRoleExists = require("./role-exists");
const createRoleExists = makeRoleExists({
  Joi,
  rolesDB: dataAccess.rolesDB,
  ValidationError:exceptions.ValidationError
});

const makeCreateRole = require("./create-role");
const createCreateRole = makeCreateRole({
  Joi,
  rolesDB: dataAccess.rolesDB,
  permissionList,
  isMasterRole:employeeUsecases.createIsMaster,
  getEmployeeIdByAccessToken:accessTokenUsecases.createGetEmployeeIdFromAccessToken,
  roleExists:createRoleExists,
  ValidationError:exceptions.ValidationError,
  DuplicateObjectDeclarationError:exceptions.DuplicateObjectDeclarationError,
  InvalidAccessError:exceptions.InvalidAccessError,
});
const makeFetchAllRole = require("./fetch-all-roles");
const createFetchAllRole = makeFetchAllRole({
  rolesDB: dataAccess.rolesDB,
});

const makeUpdateRole = require("./update-role");
const createUpdateRole = makeUpdateRole({
  rolesDB: dataAccess.rolesDB,
});

const makeDeleteRole = require("./delete-role");
const createDeleteRole = makeDeleteRole({
  rolesDB: dataAccess.rolesDB,
  ValidationError:exceptions.ValidationError,
Joi,
});


const makefetchRoleId = require("./fetch-role-id");
const createfetchRoleId = makefetchRoleId({
  Joi,
  rolesDB: dataAccess.rolesDB,
  ValidationError:exceptions.ValidationError
});

const makefetchRoleNameByRoleId = require("./fetch-role-name-by-role-id");
const createfetchRoleNameByRoleId = makefetchRoleNameByRoleId({
  Joi,
  rolesDB: dataAccess.rolesDB,
  ValidationError:exceptions.ValidationError
});


const makefetchPermissionsByRoleId = require("./fetch-permissions-by-role-id");
const createfetchPermissionsByRoleId = makefetchPermissionsByRoleId({
  Joi,
  rolesDB: dataAccess.rolesDB,
  ValidationError:exceptions.ValidationError
});

const makeDeleteRolesOfDeletedCompany = require("./delete-roles-of-deleted-company");
const createDeleteRolesOfDeletedCompany = makeDeleteRolesOfDeletedCompany(
  {
    Joi,
    rolesDB: dataAccess.rolesDB,
    ValidationError: exceptions.ValidationError,
  }
);

module.exports = Object.freeze({
    createCreateRole,
    createFetchAllRole,
    createUpdateRole,
    createDeleteRole,
    createRoleExists,
    createfetchRoleId,
    createfetchRoleNameByRoleId,
    createfetchPermissionsByRoleId,
    createDeleteRolesOfDeletedCompany
});
