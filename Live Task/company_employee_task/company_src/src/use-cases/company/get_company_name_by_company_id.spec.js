const { Given, When, Then } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeGetCompanyNameByCompanyIdUseCase = require("./get_company_id_by_company_id");

const sandbox = sinon.createSandbox();

const companyDB = {
  companyNameByCompanyId: sinon.stub(),
};

const functionsToMock = {
  createCompanyExistsCompanyFunction: sinon.stub(),
};

Given(
  'company details company_id: "{string}", database_name: "{string}" to fetch company name by company ID',
  function (company_id, database_name) {
    this.company_id = company_id || undefined;
    this.database_name = database_name || undefined;
  }
);

Given(
  'Company Exists returns result is: "{int}"',
  function (companyExistsDetails) {
    functionsToMock.createCompanyExistsCompanyFunction.resolves(companyExistsDetails);
  }
);

When("Try to fetch company name by company ID", async function () {
  const getCompanyNameByCompanyId = makeGetCompanyNameByCompanyIdUseCase({
    Joi,
    companyDB,
    createCompanyExistsByNameCompanyFunction: functionsToMock.createCompanyExistsCompanyFunction,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

  try {
    this.result = await getCompanyNameByCompanyId({
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
  'It will throw error: "{string}" with message: "{string}" while fetching company name by company ID with empty fields',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will throw error: "{string}" with message: "{string}" while fetching company name by company ID with wrong fields',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will throw error: "{string}" with message: "{string}" while fetching company name by company ID when company ID entered does not exist',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
    expect(functionsToMock.createCompanyExistsCompanyFunction.callCount).to.equal(1);
  }
);

Then(
  'It will fetch company name by company ID with details: "{string}"',
  function (companyDetails) {
    expect(this.result).to.deep.equal(companyDetails);
  }
);

Then(
  "getCompanyNameByCompanyId function will call {int} time while fetching company name by company ID",
  function (companyNameByCompanyIdFunctionCallCount) {
    expect(companyDB.companyNameByCompanyId.callCount).to.equal(companyNameByCompanyIdFunctionCallCount);
  }
);

Then(
  "companyExists function will call {int} time while fetching company name by company ID",
  function (companyExistsCallCount) {
    expect(functionsToMock.createCompanyExistsCompanyFunction.callCount).to.equal(companyExistsCallCount);
  }
);
