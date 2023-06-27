const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeGetCompanyEmailByCompanyId = require("./get-company-email-by-company-id");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const companyDB = {
  companyEmailByCompanyId: () => {},
};

const companyEmailByCompanyIdStub = sandbox.stub(
  companyDB,
  "companyEmailByCompanyId"
);
companyEmailByCompanyIdStub.callsFake((args) => {
  expect(args).deep.equal({
    companyId: this.companyId,
  });
  return 'geetanjali@gmail.com';
});

After(() => {
  this.companyId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "company details companyId: {string} to get company Email By CompanyId",
  (companyId) => {
    this.companyId = companyId || undefined;
  }
);
When("Try to get company Email By CompanyId", async () => {
  const companyEmailByCompanyId = makeGetCompanyEmailByCompanyId({
    Joi,
    companyDB,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await companyEmailByCompanyId({
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
  'It will throw error: {string} with message: "{string}" while to get company Email By CompanyId',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then('It will get company Email: {string}', (companyEmail) => {
  expect(this.result).deep.equal(companyEmail);
});

Then(
  "companyEmailByCompanyId function will call {int} time while to get company Email By CompanyId",
  (companyEmailByCompanyIdFunctionCallCount) => {
    sinon.assert.callCount(
      companyEmailByCompanyIdStub,
      companyEmailByCompanyIdFunctionCallCount
    );
  }
);
