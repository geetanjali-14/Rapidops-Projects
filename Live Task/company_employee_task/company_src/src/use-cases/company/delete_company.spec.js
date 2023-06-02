const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require('../../exceptions');
const makeDeletecompanyUseCase = require("./delete_company");

const sandbox = sinon.createSandbox();

Before(() => {
  this.company_id = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});


const companyDB = {
  deletecompany: () => {},
};

const functionsToMock = {
  createcompanyExistsFunction: sinon.stub(),
};

const deletecompanyStub = sandbox.stub(companyDB, "deletecompany");
deletecompanyStub.callsFake((args) => {
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
  "Delete company having company_id: {string} and database_name:{string}",
  function (company_id, database_name) {
    this.company_id = company_id || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to delete company", async () => {
  const deletecompany = makeDeletecompanyUseCase({
    Joi,
    companyDB,
    createcompanyExistsFunction: functionsToMock.createcompanyExistsFunction,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });
  try {
    this.result = await deletecompany({
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
  'It will throw error: {string} with message: "{string}" while deleting company',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will throw error: {string} with message: {string} while deleting company when company ID entered does not exist',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
    expect(functionsToMock.createcompanyExistsFunction.callCount).to.equal(0);
  }
);

Then(
  'It will delete company with result: "{string}"',
  (deleteStatus) => {
    expect(this.result).deep.equal(JSON.parse(deleteStatus));
  }
);

Then(
  "deletecompany function will call {int} time while deleting company",
  (deletecompanyFunctionCallCount) => {
    sinon.assert.callCount(deletecompanyStub, deletecompanyFunctionCallCount);
  }
);

Then(
  "companyExists function will call {int} time while deleting company",
  function (companyExistsByIdCallCount) {
    expect(functionsToMock.companyExistsById.callCount).to.equal(companyExistsByIdCallCount);
  }
);