const useCases = require("../../use-cases");
const internalApis = require("../../internal-api-calls");

const makeCreateRole = require("./create-role");
const createCreateRole = makeCreateRole({
  createRole: useCases.roles.createCreateRole,
});

const makeFetchAllRole = require("./fetch-all-roles");
const createFetchAllRole = makeFetchAllRole({
  fetchAllRoles: useCases.roles.createFetchAllRole,
});

const makeUpdateRole = require("./update-role");
const createUpdateRole = makeUpdateRole({
  updateRole: useCases.roles.createUpdateRole,
});

const makeDeleteRole = require("./delete-role");
const createDeleteRole = makeDeleteRole({
  updateRole: useCases.roles.createDeleteRole,
});

const makeDeleteRolesOfDeletedCompany = require("./delete-roles-of-deleted-company");
const createDeleteRolesOfDeletedCompany = makeDeleteRolesOfDeletedCompany({
  deleteRolesOfDeletedCompany:
    useCases.employee.createDeleteRolesOfDeletedCompany,
});

module.exports = Object.freeze({
  createCreateRole,
  createFetchAllRole,
  createUpdateRole,
  createDeleteRole,
  createDeleteRolesOfDeletedCompany,
});
