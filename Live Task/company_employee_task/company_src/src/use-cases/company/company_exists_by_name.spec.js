const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require('../../exceptions');
const makeCompanyExistByNameUseCase = require("./company_exists_by_name");

const sandbox = sinon.createSandbox();

const companyDB = {
  companyExistsByName: sinon.stub(),
};

After(function () {
  sandbox.restore();
});

Given(
  "Company details company_name: {string} and database_name: {string} to check company name existence",
  function (company_name, database_name) {
    this.company_name = company_name || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to check company existence", async function () {
  const functionsToMock = {
    companyExists: sinon.stub(),
  };

  const companyExistsByName = makeCompanyExistByNameUseCase({
    Joi,
    companyDB,
    companyExists: functionsToMock.companyExists,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

  try {
    this.result = await companyExistsByName({
      company_name: this.company_name,
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
  'It will throw error: {string} with message: {string} while checking company existence with invalid fields',
  function (error, message) {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will checking company Name existence with details: {int}',
  function (companyExists) {
    expect(this.result).deep.equal(JSON.parse(companyExists));
  }
);

Then(
  "companyExists function will call {int} time while creating new employee",
  function (companyExistsCallCount) {
    expect(functionsToMock.companyExists.callCount).to.equal(companyExistsCallCount);
  }
);
