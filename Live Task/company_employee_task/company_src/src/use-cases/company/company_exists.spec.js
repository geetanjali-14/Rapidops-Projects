const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require('../../exceptions');
const makeCompanyExistUseCase = require("./company_exists");

const sandbox = sinon.createSandbox();

Before(() => {
  this.company_id = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

const companyDB = {
    companyExists: () => {},
};

const companyExistsStub = sandbox.stub(companyDB, "companyExists");
companyExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    company_id: this.company_id,
    database_name: this.database_name,
  });

  return 1;
});

After(() => {
  this.company_id = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

Given(
  "Checking company existence having company_id: {string} and database_name:{string}",
  (company_id, database_name) => {
    this.company_id = company_id || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to check company existence", async () => {
  const companyExists = makeCompanyExistUseCase({
    Joi,
    companyDB,
    ValidationError:exceptions.ValidationError,
    ForbiddenError:exceptions.ForbiddenError,
  });
  try {
    this.result = await companyExists({
      company_id: this.company_id,
      database_name: this.database_name,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while checking company existence',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will check company existence with result: "{string}"',
  (existenceStatus) => {
    expect(this.result).deep.equal(JSON.parse(existenceStatus));
  }
);

Then(
  "companyExists function will call {int} time while checking company existence",
  (companyExistsFunctionCallCount) => {
    sinon.assert.callCount(companyExistsStub, companyExistsFunctionCallCount);
  }
);
