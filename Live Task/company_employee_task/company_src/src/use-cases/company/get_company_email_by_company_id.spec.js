const { Given, When, Then } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeGetCompanyEmailByCompanyIdUseCase = require("./get_company_email_by_company_id");

const sandbox = sinon.createSandbox();

const companyDB = {
  companyEmailByCompanyId: sinon.stub(),
};

const functionsToMock = {
  createCompanyExistsCompanyFunction: sinon.stub(),
};

Given(
  'company details company_id: "{string}", database_name: "{string}" to fetch company email by company ID',
  function (company_id, database_name) {
    this.company_id = company_id || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to fetch company email by company ID", async function () {
  const getCompanyEmailByCompanyId = makeGetCompanyEmailByCompanyIdUseCase({
    Joi,
    companyDB,
    ForbiddenError: exceptions.ForbiddenError,
    ValidationError: exceptions.ValidationError,
    createCompanyExistsCompanyFunction: functionsToMock.createCompanyExistsCompanyFunction,
  });

  try {
    this.result = await getCompanyEmailByCompanyId({
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
  'It will throw error: "{string}" with message: "{string}" when company does not exist',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
    expect(functionsToMock.createCompanyExistsCompanyFunction.callCount).to.equal(1);
  }
);

Then(
  'It will fetch company email: "{string}" when company exists',
  function (company_email) {
    expect(this.result).to.equal(company_email);
  }
);

Then(
  'companyEmailByCompanyId function will be called {int} time',
  function (companyEmailByCompanyIdFunctionCallCount) {
    expect(companyDB.companyEmailByCompanyId.callCount).to.equal(companyEmailByCompanyIdFunctionCallCount);
  }
);
