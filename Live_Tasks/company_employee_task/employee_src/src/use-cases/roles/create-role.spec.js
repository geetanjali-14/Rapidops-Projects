const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");
const { Kafka } = require("kafkajs");

const makeCreateRole = require("./create-role");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const rolesDB = {
  createRole: () => {},
};

const functionsToMock = {
  roleExists: () => {},
  getEmployeeIdByAccessToken: () => {},
  isMasterRole: () => {},
};

const createRoleStub = sandbox.stub(rolesDB, "createRole");
createRoleStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    permissions: this.permissions,
    companyId: this.companyId,
    isMaster: this.isMaster,
    accessToken: this.accessToken,
  });
  return 1;
});

const isMasterRoleStub = sandbox.stub(
  functionsToMock,
  "isMasterRole"
);
isMasterRoleStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return 0;
});

const getEmployeeIdByAccessTokenStub = sandbox.stub(functionsToMock, "getEmployeeIdByAccessToken");
getEmployeeIdByAccessTokenStub.callsFake((args) => {
  expect(args).deep.equal({
    accessToken: this.accessToken,
  });
  return 1;
});

const roleExistsStub = sandbox.stub(functionsToMock, "roleExists");
roleExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    role: this.role,
  });
  return 1;
});

After(() => {
  this.name = undefined;
  this.companyId = undefined;
  this.permissions = undefined;
  this.isMaster = undefined;
  this.accessToken = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "Employee details name: {string}, permissions: {string},companyId: {string},isMaster: {string}, accessToken: {string} to create new role",
  (name, permissions, companyId, isMaster, accessToken) => {
    this.name = name || undefined;
    this.permissions = permissions || undefined;
    this.companyId = companyId || undefined;
    this.isMaster = isMaster || undefined;
    this.accessToken = accessToken || undefined;
  }
);

Given("Role Exists: {int}", (roleExistsResult) => {
  this.roleExistsResult = roleExistsResult;
});

Given("Fetching Employee Id By accessToken: {int}", (accessToken) => {
  this.accessToken = accessToken;
});

When("Try to create new role", async () => {
  const createRole = makeCreateRole({
    Joi,
    rolesDB,
    isMasterRole:functionsToMock.isMasterRole,
    getEmployeeIdByAccessToken:functionsToMock.getEmployeeIdByAccessToken,
    roleExists:functionsToMock.roleExists,
    // permissionList,
    ValidationError: exceptions.ValidationError,
    InvalidAccessError: exceptions.InvalidAccessError,
    DuplicateObjectDeclarationError: exceptions.DuplicateObjectDeclarationError,
  });
  try {
    
    this.result = await createRole({
      name: this.name,
      permissions: this.permissions,
      companyId: this.companyId,
      isMaster: this.isMaster,
      accessToken: this.accessToken,
      employeeEmail: this.employeeEmail,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while creating new role',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then("It will create new role with details: {int}", (newRoleID) => {
  expect(this.result).deep.equal(newRoleID);
});

Then(
  "createRole function will call {int} time while creating new role",
  function (createRoleFunctionCallCount) {
    sinon.assert.callCount(createRoleStub, createRoleFunctionCallCount);
  }
);
