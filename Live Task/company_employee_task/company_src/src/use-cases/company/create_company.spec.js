const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require('../../exceptions');
const makeCreateCompanyUseCase = require("./create_company");

const sandbox = sinon.createSandbox();

const companyDB = {
    createCompany: sinon.stub(),
};

const functionsToMock = {
    createCompanyExistsByNameCompanyFunction: sinon.stub(),
};

After(function () {
  sandbox.restore();
});

Given(
  "company details company_name: {string}, address: {string} and database_name: {string} to create new company",
  function (company_name,address, database_name) {
    this.company_name = company_name || undefined;
    this.address = address || undefined;
    this.database_name = database_name || undefined;
  });
  
Given(
  "Company Exists returns result is: {int}",
  function (companyExistsDetails) {
    functionsToMock.createCompanyExistsByNameCompanyFunction.resolves(companyExistsDetails);
  }
);

When("Try to create new company", async function () {
  const createCompany = makeCreateCompanyUseCase({
    Joi,
    companyDB,
    createCompanyExistsByNameCompanyFunction:functionsToMock.createCompanyExistsByNameCompanyFunction,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

  try {
    this.result = await createCompany({
      company_name: this.company_name,
      address: this.address,
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
  'It will throw error: {string} with message: {string} while creating new company with empty fields',
  function (error, message) {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
Then(
  'It will throw error: {string} with message: {string} while creating new company with wrong fields',
  function (newcompanyDetails) {
    expect(this.result).to.deep.equal(JSON.parse(newcompanyDetails));
  }
);

Then(
  'It will throw error: {string} with message: {string} while creating new company when company entered does not exist',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
    expect(functionsToMock.createCompanyExistsByNameCompanyFunction.callCount).to.equal(0);
  }
);
Then(
  'It will create new company with details: "{string}"',
  function (newcompanyDetails) {
    expect(this.result).deep.equal(JSON.parse(newcompanyDetails));
    expect(functionsToMock.createCompanyExistsByNameCompanyFunction.callCount).to.equal(0);
  }
);

Then(
  "createcompany function will call {int} time while creating new company",
  function (createCompanyFunctionCallCount) {
    expect(companyDB.createCompany.callCount).to.equal(createCompanyFunctionCallCount);
  }
);
Then(
  "companyExists function will call {int} time while creating new company",
  function (companyExistsCallCount) {
    expect(functionsToMock.createCompanyExistsByNameCompanyFunction.callCount).to.equal(companyExistsCallCount);
  }
);
