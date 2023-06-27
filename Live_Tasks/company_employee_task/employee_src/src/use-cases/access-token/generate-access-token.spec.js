const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const makeGenerateAccessToken = require("./generate-access-token");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const jwt = {
  sign: () => {},
};

const jwtSignStub = sandbox.stub(jwt, "sign");
jwtSignStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  // console.log("####### ",this)
  return "3m8z2498y510nc2ymc";
});

After(() => {
  this.employeeId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given("employeeId: {string} to generate access token", (employeeId) => {
  this.employeeId = employeeId;
});

When("To generate accessToken", async () =>{
  const generateAccessToken = makeGenerateAccessToken({
    Joi,
    jwt,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await generateAccessToken({
      employeeId: this.employeeId,
    });
    
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then("It will generate an access token: {string}", (accessToken) => {
  expect(this.result.accessToken).to.equal(accessToken);
});

Then(
  'It will throw error: {string} with message: "{string}" while generating accessToken',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);
