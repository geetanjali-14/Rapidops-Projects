const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const makeGetEmployeeIdFromAccessToken = require("./get-employee-id-from-access-token");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const accessTokensDB = {
  getEmployeeIdFromAccessToken: () => {},
};

const getEmployeeIdFromAccessTokenStub = sandbox.stub(
  accessTokensDB,
  "getEmployeeIdFromAccessToken"
);
getEmployeeIdFromAccessTokenStub.callsFake((args)=> {
  expect(args).deep.equal({
    accessToken: this.accessToken,
  });
  return 1;
});

After(() => {
  this.accessToken = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("AccessToken: {string} to get employee id from access token", (
  accessToken
) =>{
  this.accessToken = accessToken || undefined;
});

When("To get employee id from access token", async  ()=> {
  const getEmployeeIdFromAccessToken = makeGetEmployeeIdFromAccessToken({
    Joi,
    ValidationError: exceptions.ValidationError,
    accessTokensDB,
  });
  try {
    this.result = await getEmployeeIdFromAccessToken({
      accessToken: this.accessToken,
    });
  } catch (error) {
    // console.log(error);
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" to get employee id from access token',
  (error, message)=> {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  "It will get employee id from access token with details: {int}",
   (employee_id) =>{
    expect(this.result).deep.equal(employee_id);
  }
);

Then(
  "getEmployeeIdFromAccessToken function will call {int} time to get employee id from access token",
  (getEmployeeIdFromAccessTokenFunctionCallCount) => {
    sinon.assert.callCount(
      getEmployeeIdFromAccessTokenStub,
      getEmployeeIdFromAccessTokenFunctionCallCount
    );
  }
);
