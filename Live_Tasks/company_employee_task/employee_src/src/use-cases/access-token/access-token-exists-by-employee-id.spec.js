const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeAccessTokenExistsByEmployeeId = require("./access-token-exists-by-employee-id");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const accessTokensDB = {
  accessTokenExists: () => {},
};

const accessTokenExistsStub = sandbox.stub(accessTokensDB, "accessTokenExists");
accessTokenExistsStub.callsFake((args) => {
  console.log("HIIII", this.employeeId);
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return 1;
});

After(() => {
  this.employeeId = undefined;
  this.result = undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

Given(
  "Access token exists employeeId: {string} to check access token existence",
  (employeeId) => {
    console.log("@@@@@@@@@  ", this.employeeId);
    this.employeeId = employeeId || undefined;
  }
);

When("To check access token existence", async () => {
  const accessTokenExists = makeAccessTokenExistsByEmployeeId({
    Joi,
    accessTokensDB,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await accessTokenExists({
      employeeId: this.employeeId,
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
  'It will throw error: {string} with message: "{string}" to check access token existence',
  (error, message)=> {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then('It will check access token existence with details: {int}', (existenceStatus) => {
  expect(this.result).deep.equal(JSON.parse(existenceStatus));
});

Then(
  "accessTokenExists function will call {int} time to check access token existence",
  (accessTokenExistsFunctionCallCount) => {
    sinon.assert.callCount(accessTokenExistsStub, accessTokenExistsFunctionCallCount);
  }
);
