const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeAccessTokenExists = require("./access-token-exists");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const accessTokensDB = {
  accessTokenExists: () => {},
};

const accessTokenExistsStub = sandbox.stub(accessTokensDB, "accessTokenExists");
accessTokenExistsStub.callsFake( (args)=> {
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

Given(
  "Access token exists accessToken: {string} to check access token existence by accessToken",
  (accessToken) => {
    this.accessToken = accessToken || undefined;
  }
);

When("To check access token existence by accessToken", async ()=> {
  const accessTokenExists = makeAccessTokenExists({
    Joi,
    accessTokensDB,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await accessTokenExists({
      accessToken: this.accessToken,
    });
  } catch (error) {
    console.log(error);
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" to check access token existence by accessToken',
  (error, message)=> {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will check access token existence  by accessToken with details: {int}',
  (existenceStatus) =>{
    expect(this.result).deep.equal(existenceStatus);
  }
);

Then(
  "accessTokenExists function will call {int} time to check access token existence by accessToken",
  (accessTokenExistsFunctionCallCount) => {
    sinon.assert.callCount(
      accessTokenExistsStub,
      accessTokenExistsFunctionCallCount
    );
  }
);
