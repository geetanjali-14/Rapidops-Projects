const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeAssignRolesToEmployeeRoles = require("./create-employee");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const employeeRolesDB = {
  assignEmployeeRoles: () => {},
};

const functionsToMock = {
  isMaster: () => {},
  employeeExists: () => {},
  roleExists: () => {},
  fetchRoleId: () => {},
};

const assignEmployeeRolesStub = sandbox.stub(
  employeeRolesDB,
  "assignEmployeeRoles"
);
assignEmployeeRolesStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
    assignerId: this.assignerId,
    roles: this.roles,
  });
  return 1;
});

const isMasterStub = sandbox.stub(functionsToMock, "isMaster");
isMasterStub.callsFake((args) => {
  console.log(args.employeeEmail);
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return 0;
});

const employeeExistsStub = sandbox.stub(functionsToMock, "employeeExists");
employeeExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return 1;
});

const roleExistsStub = sandbox.stub(functionsToMock, "roleExists");
roleExistsStub.callsFake((args) => {
  console.log(args.employeeEmail);
  expect(args).deep.equal({
    role: this.role,
  });
  return 1;
});

const fetchRoleIdStub = sandbox.stub(functionsToMock, "fetchRoleId");
fetchRoleIdStub.callsFake((args) => {
  expect(args).deep.equal({
    role: this.role,
  });
  return 1;
});

After(() => {
  this.employeeId = undefined;
  this.assignerId = undefined;
  this.roles = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "Employee details employeeId: {string}, assignerId: {string},roles: {string} to assign role to employee",
  (employeeId, assignerId, roles) => {
    this.employeeId = employeeId || undefined;
    this.assignerId = assignerId || undefined;
    this.roles = roles || undefined;
  }
);

Given("Employee Exists: {int}", (employeeExistsResult) => {
  this.employeeExistsResult = employeeExistsResult;
});

Given("Role exists: {int}", (roleExistsResult) => {
  this.roleExistsResult = roleExistsResult;
});

Given("Employee is master: {int}", (isMasterResult) => {
  this.isMasterResult = isMasterResult;
});

When("Try to assign role to employee", async () => {
  const assignEmployeeRoles = makeAssignRolesToEmployeeRoles({
    Joi,
    employeeRolesDB,
    isMaster: functionsToMock.isMaster,
    employeeExists: functionsToMock.employeeExists,
    roleExists: functionsToMock.roleExists,
    fetchRoleId: functionsToMock.fetchRoleId,
    ValidationError: exceptions.ValidationError,
    ObjectNotFoundError: exceptions.ObjectNotFoundError,
    InvalidAccessError: exceptions.InvalidAccessError,
  });
  try {
    this.result = await assignEmployeeRoles({
      employeeId: this.employeeId,
      assignerId: this.assignerId,
      roles: this.roles,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while assigning role to employee',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  "It will assign role to employee with details: {int}",
  (assignedDetails) => {
    expect(this.result).deep.equal(assignedDetails);
  }
);

Then(
  "assignEmployeeRoles function will call {int} time while assigning role to employee",
  function (assignEmployeeRolesFunctionCallCount) {
    sinon.assert.callCount(
      assignEmployeeRolesStub,
      assignEmployeeRolesFunctionCallCount
    );
  }
);
