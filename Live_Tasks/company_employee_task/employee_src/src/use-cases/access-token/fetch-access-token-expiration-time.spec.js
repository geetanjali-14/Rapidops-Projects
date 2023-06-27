const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeGetAccessTokenExpirationTime = require("./fetch-access-token-expiration-time");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const accessTokensDB = {
  fetchExpirationTime: () => {},
};

const fetchExpirationTimeStub = sandbox.stub(accessTokensDB, "fetchExpirationTime");
fetchExpirationTimeStub.callsFake((args) => {
  expect(args).deep.equal({
    accessToken: this.accessToken,
  });
  return '2023-06-14T08:34:58.000Z';
});

After(() => {
  this.accessToken = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "AccessToken: {string} to fetch access token expiration time",
  (accessToken) => {
    this.accessToken = accessToken || undefined;
  }
);

When("To fetch access token expiration time", async () => {
  const fetchExpirationTime = makeGetAccessTokenExpirationTime({
    Joi,
    accessTokensDB,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await fetchExpirationTime({
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
  'It will throw error: {string} with message: "{string}" to fetch access token expiration time',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will fetch access token expiration time with details: "{string}"',
  (expirationTime) => {
    expect(this.result).deep.equal(expirationTime);
  }
);

Then(
  "fetchExpirationTime function will call {int} time to fetch access token expiration time",
  (fetchExpirationTimeFunctionCallCount) => {
    sinon.assert.callCount(fetchExpirationTimeStub, fetchExpirationTimeFunctionCallCount);
  }
);
