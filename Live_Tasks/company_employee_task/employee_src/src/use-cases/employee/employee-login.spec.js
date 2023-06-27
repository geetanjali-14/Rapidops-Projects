const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeEmployeeLogin = require("./employee-login");

const sandbox = sinon.createSandbox();

const employeeDB = {
  authenticateEmployee: () => {},
};

const functionsToMock = {
  employeeEmailExists: () => {},
  getEmployeeIdByEmployeeEmail: () => {},
  isVerifiedEmployee: () => {},
  generateAccessToken: () => {},
};

const authenticateEmployeeStub = sandbox.stub(
  employeeDB,
  "authenticateEmployee"
);
authenticateEmployeeStub.callsFake(function (args) {
  expect(args).deep.equal({
    employeeEmail: this.employeeEmail,
    password: this.password,
  });
  return 1;
});

const employeeEmailExistsStub = sandbox.stub(
  functionsToMock,
  "employeeEmailExists"
);
employeeEmailExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeEmail: this.employeeEmail,
  });
  return 1;
});

const getEmployeeIdByEmployeeEmailStub = sandbox.stub(
  functionsToMock,
  "getEmployeeIdByEmployeeEmail"
);

getEmployeeIdByEmployeeEmailStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeEmail: this.employeeEmail,
  });
  return 1;
});
const isVerifiedEmployeeStub = sandbox.stub(
  functionsToMock,
  "isVerifiedEmployee"
);
isVerifiedEmployeeStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return 1;
});

const generateAccessTokenStub = sandbox.stub(
  functionsToMock,
  "generateAccessToken"
);
generateAccessTokenStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return { accessToken: 'six8487xnry4ryc' };
});

After(function () {
  this.employeeEmail = undefined;
  this.password = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

Given(
  "Employee details employeeEmail: {string}, password: {string} to login employee",
  (employeeEmail, password) => {
    this.employeeEmail = employeeEmail || undefined;
    this.password = password || undefined;
  }
);

Given(
  "Employee Email Exists employeeEmail: {string} to login employee",
  (employeeEmailExistsResult) => {
    this.employeeEmailExistsResult = employeeEmailExistsResult;
  }
);
Given(
  "Employee is verified employeeId: {string} to login employee",
  (isVerifiedResult) => {
    this.isVerifiedResult = isVerifiedResult;
  }
);
Given(
  "Get Employee ID by Email employeeEmail: {string} to login employee",
  (employeeId) => {
    this.employeeId = employeeId;
  }
);
Given(
  "Generate Access Token employeeId: {string} to login employee",
  (accessToken) => {
    this.accessToken = accessToken;
  }
);

When("Try to login employee", async () => {
  const authenticateEmployee = makeEmployeeLogin({
    Joi,
    employeeDB,
    employeeEmailExists: functionsToMock.employeeEmailExists,
    isVerifiedEmployee: functionsToMock.isVerifiedEmployee,
    getEmployeeIdByEmployeeEmail: functionsToMock.getEmployeeIdByEmployeeEmail,
    generateAccessToken: functionsToMock.generateAccessToken,
    ValidationError: exceptions.ValidationError,
    InvalidAccessError: exceptions.InvalidAccessError,
  });

  try {
    this.result = await authenticateEmployee({
      employeeEmail: this.employeeEmail,
      password: this.password,
    });
  } catch (e) {
    console.log("error: ",e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" to login employee',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will login employee: {int}", (employeeDetails) => {
  expect(this.result).deep.equal(employeeDetails);
});

Then("It will return accessToken: {string}", (accessToken) => {
  expect(this.result.accessToken).to.equal(accessToken);
});

Then(
  "employeeEmailExists function will call {int} time to login employee",
  (employeeEmailExistsFunctionCallCount) => {
    sinon.assert.callCount(
      employeeEmailExistsStub,
      employeeEmailExistsFunctionCallCount
    );
  }
);

Then(
  "getEmployeeIdByEmployeeEmail function will call {int} time to login employee",
  (getEmployeeIdByEmployeeEmailFunctionCallCount) => {
    sinon.assert.callCount(
      getEmployeeIdByEmployeeEmailStub,
      getEmployeeIdByEmployeeEmailFunctionCallCount
    );
  }
);

Then(
  "isVerifiedEmployee function will call {int} time to login employee",
  (isVerifiedEmployeeFunctionCallCount) => {
    sinon.assert.callCount(
      isVerifiedEmployeeStub,
      isVerifiedEmployeeFunctionCallCount
    );
  }
);

Then(
  "generateAccessToken function will call {int} time to login employee",
  (generateAccessTokenFunctionCallCount) => {
    sinon.assert.callCount(
      generateAccessTokenStub,
      generateAccessTokenFunctionCallCount
    );
  }
);

Then(
  "authenticateEmployee function will call {int} time to login employee",
  (authenticateEmployeeFunctionCallCount) => {
    sinon.assert.callCount(
      authenticateEmployeeStub,
      authenticateEmployeeFunctionCallCount
    );
  }
);
