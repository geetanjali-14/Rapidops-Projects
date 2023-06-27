const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeUpdateEmployee = require("./update-employee-details");

const sandbox = sinon.createSandbox();

const employeeDB = {
  updateEmployee: () => {},
};

const functionsToMock = {
  fetchCompanyIdByCompanyName: () => {},
  createEmployeeExists: () => {},
  isVerifiedEmployee: () => {},
  companyExists: () => {},
};

const updateEmployeeStub = sandbox.stub(employeeDB, "updateEmployee");

updateEmployeeStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeName: this.employeeName,
    employeeId: this.employeeId,
    jobTitle: this.jobTitle,
    companyId: this.companyId,
    companyName: this.companyName,
  });
  return 1;
});

const fetchCompanyIdByCompanyNameStub = sandbox.stub(
  functionsToMock,
  "fetchCompanyIdByCompanyName"
);
fetchCompanyIdByCompanyNameStub.callsFake((args) => {
  expect(args).deep.equal({
    companyName: this.companyName,
  });

  return this.companyId;
});

const createEmployeeExistsStub = sandbox.stub(
  functionsToMock,
  "createEmployeeExists"
);
createEmployeeExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });

  return this.employeeExistsResult;
});

const isVerifiedEmployeeStub = sandbox.stub(
  functionsToMock,
  "isVerifiedEmployee"
);
isVerifiedEmployeeStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });

  return this.isVerifiedResult;
});

const companyExistsStub = sandbox.stub(functionsToMock, "companyExists");
companyExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    companyName: this.companyName,
  });

  return this.companyExistsResult;
});

After(() => {
  this.employeeId = undefined;
  this.employeeName = undefined;
  this.jobTitle = undefined;
  this.companyId = undefined;
  this.companyName = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

Given(
  "Employee details employeeId: {string}, employeeName: {string}, jobTitle: {string},companyId: {string},companyName: {string} to update employee",
  (employeeId, employeeName, jobTitle, companyId, companyName) => {
    this.employeeId = employeeId || undefined;
    this.employeeName = employeeName || undefined;
    this.jobTitle = jobTitle || undefined;
    this.companyId = companyId || undefined;
    this.companyName = companyName || undefined;
  }
);

Given(
  "Employee Exists employeeId: {string} to update employee",
  (employeeExistsResult) => {
    this.employeeExistsResult = employeeExistsResult;
  }
);
Given(
  "Employee is verified employeeId: {string} to update employee",
  (isVerifiedResult) => {
    this.isVerifiedResult = isVerifiedResult;
  }
);
Given(
  "Company Exists companyId: {string} to update employee",
  (companyExistsResult) => {
    this.companyExistsResult = companyExistsResult;
  }
);

When("Try to update employee details", async () => {
  const updateEmployee = makeUpdateEmployee({
    Joi,
    employeeDB,
    fetchCompanyIdByCompanyName: functionsToMock.fetchCompanyIdByCompanyName,
    createEmployeeExists: functionsToMock.createEmployeeExists,
    isVerifiedEmployee: functionsToMock.isVerifiedEmployee,
    companyExists: functionsToMock.companyExists,
    ValidationError: exceptions.ValidationError,
    ObjectNotFoundError: exceptions.ObjectNotFoundError,
    InvalidAccessError:exceptions.InvalidAccessError,
  });

  try {
    this.result = await updateEmployee({
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      jobTitle: this.jobTitle,
      companyId: this.companyId,
      companyName: this.companyName,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while updating employee',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will update employee: {int}", (updateDetails) => {
  expect(this.result).deep.equal(JSON.parse(updateDetails));
});

Then(
  "createEmployeeExists function will call {int} time while updating employee",
  (createEmployeeExistsFunctionCallCount) => {
    sinon.assert.callCount(
      createEmployeeExistsStub,
      createEmployeeExistsFunctionCallCount
    );
  }
);

Then(
  "isVerifiedEmployee function will call {int} time while updating employee",
  (isVerifiedEmployeeFunctionCallCount) => {
    sinon.assert.callCount(
      isVerifiedEmployeeStub,
      isVerifiedEmployeeFunctionCallCount
    );
  }
);
Then(
  "fetchCompanyIdByCompanyName function will call {int} time while updating employee",
  (fetchCompanyIdByCompanyNameFunctionCallCount) => {
    sinon.assert.callCount(
      fetchCompanyIdByCompanyNameStub,
      fetchCompanyIdByCompanyNameFunctionCallCount
    );
  }
);

Then(
  "companyExists function will call {int} time while updating employee",
  (companyExistsFunctionCallCount) => {
    sinon.assert.callCount(companyExistsStub, companyExistsFunctionCallCount);
  }
);

Then(
  "updateEmployee function will call {int} time while updating employee",
  (updateEmployeeFunctionCallCount) => {
    sinon.assert.callCount(updateEmployeeStub, updateEmployeeFunctionCallCount);
  }
);
