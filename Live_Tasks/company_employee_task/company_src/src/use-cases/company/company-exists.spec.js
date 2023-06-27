const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeCompanyExist = require("./company-exists");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const companyDB = {
    companyExists: () => {},
};

const companyExistsStub = sandbox.stub(companyDB, "companyExists");
companyExistsStub.callsFake( (args)=> {
  expect(args).deep.equal({
    companyId: this.companyId,
  });
  return 1;
});


After(() =>{
  this.companyId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "company details companyId: {string} to check company existence",
   (companyId)=> {
    this.companyId = companyId || undefined;
  }
)
When("Try to check company existence", async ()=> {
  const companyExists = makeCompanyExist({
    Joi,
    companyDB,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await companyExists({
      companyId: this.companyId,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while checking company existence',
  (error, message)=> {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will check company existence with details: {int}',
   (existsResult) =>{
    expect(this.result).deep.equal(existsResult);
  }
);

Then(
  "companyExists function will call {int} time while checking company existence",
   (companyExistsFunctionCallCount)=> {
    sinon.assert.callCount(companyExistsStub, companyExistsFunctionCallCount);
  }
);