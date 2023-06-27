const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeDeleteMultipleEmployees = require("./delete-multiple-employee");

const sandbox = sinon.createSandbox();

const employeeDB = {
  deleteMultipleEmployees: () => {},
};

const functionsToMock = {
  accessTokenExists: () => {},
  accessTokenExpirationTime: () => {},
  getEmployeeIdFromAccessToken: () => {},
};

const deleteMultipleEmployeesStub = sandbox.stub(employeeDB, "deleteMultipleEmployees");

deleteMultipleEmployeesStub.callsFake(function (args) {
  expect(args).to.deep.equal({
    accessTokens: this.accessTokens,
  });

  return true;
});

const accessTokenExistsStub = sandbox.stub(
  functionsToMock,
  "accessTokenExists"
);
accessTokenExistsStub.callsFake((args) => {
  expect(args).to.deep.equal({
    accessToken: this.accessToken,
  });
  return true;
});

const accessTokenExpirationTimeStub = sandbox.stub(
  functionsToMock,
  "accessTokenExpirationTime"
);
accessTokenExpirationTimeStub.callsFake((args) => {
  expect(args).to.deep.equal({
    accessToken: this.accessToken,
  });
  return new Date();
});

const getEmployeeIdFromAccessTokenStub = sandbox.stub(
  functionsToMock,
  "getEmployeeIdFromAccessToken"
);
getEmployeeIdFromAccessTokenStub.callsFake((args) => {
  expect(args).to.deep.equal({
    accessToken: this.accessToken,
  });
  return {employeeId:1};
});

After(function () {
  sandbox.resetHistory();
});

Given('Access tokens {string}', (accessTokens) =>{
  this.accessTokens = JSON.parse(accessTokens);
});


When("Try to delete multiple employees", async () => {
  const deleteMultipleEmployees = makeDeleteMultipleEmployees({
    Joi,
    employeeDB,
    ValidationError: exceptions.ValidationError,
    ForbiddenError:exceptions.ForbiddenError,
    accessTokenExists: functionsToMock.accessTokenExists,
    accessTokenExpirationTime: functionsToMock.accessTokenExpirationTime,
    getEmployeeIdFromAccessToken: functionsToMock.getEmployeeIdFromAccessToken,
  });

  try {
    this.result = await deleteMultipleEmployees({
      accessTokens: this.accessTokens,
    });
    console.log(this.result);
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
    'It will throw error: {string} with message: "{string}" while deleting employees',
    (error, message) => {
      expect(this.error).deep.equal({
        name: error,
        message,
      });
    }
  );
  
  Then("It will delete employees: {string}", (deleteDetails) => {
    expect(this.result).deep.equal(deleteDetails);
  });

Then("The deleteMultipleEmployees function will be called", (deleteMultipleEmployeesFunctionCallCount) => {
  sinon.assert.callCount(deleteMultipleEmployeesStub,deleteMultipleEmployeesFunctionCallCount);
});

Then("The accessTokenExists function will be called for each access token", (accessTokenExistsFunctionCallCount) => {
  sinon.assert.callCount(accessTokenExistsStub,accessTokenExistsFunctionCallCount );
});

Then("The accessTokenExpirationTime function will be called for each access token", (accessTokenExpirationTimeFunctionCallCount) => {
  sinon.assert.callCount(accessTokenExpirationTimeStub,accessTokenExpirationTimeFunctionCallCount );
});

Then("The getEmployeeIdFromAccessToken function will be called for each access token", (getEmployeeIdFromAccessTokenFunctionCallCount) => {
  sinon.assert.callCount(getEmployeeIdFromAccessTokenStub,getEmployeeIdFromAccessTokenFunctionCallCount );
});
