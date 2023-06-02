const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require('../../exceptions');
const makeDeleteEmployeeOfDeletedCompanyUseCase = require("./delete_employee_when_company_is_deleted");

const sandbox = sinon.createSandbox();

Before(() => {
  this.company_id = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

const employeeDB = {
    deleteEmployeeOfDeletedCompany: () => {},
};
const functionsToMock = {
  companyExistsById: sinon.stub(),
};

const deleteEmployeeOfDeletedCompanyStub = sandbox.stub(employeeDB, "deleteEmployeeOfDeletedCompany");
deleteEmployeeOfDeletedCompanyStub.callsFake((args) => {
  expect(args).deep.equal({
    company_id: this.company_id,
    database_name: this.database_name,
  });

  return {employee_id: 1};
});

After(function () {
  sandbox.restore();
});

Given(
  "Delete employee having company_id: {string} and database_name:{string} when company is deleted",
  (company_id, database_name) => {
    this.company_id = company_id || undefined;
    this.database_name = database_name || undefined;
  }
);

Given(
  "Company Exists by id returns result is: {int}",
  function (companyExistsDetails) {
    functionsToMock.companyExistsById.resolves(companyExistsDetails);
  }
);

When("Try to delete employee when company is deleted", async () => {
  const deleteEmployeeOfDeletedCompany = makeDeleteEmployeeOfDeletedCompanyUseCase({
    Joi,
    employeeDB,
    companyExistsById:functionsToMock.companyExistsById,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });
  try {
    this.result = await deleteEmployeeOfDeletedCompany({
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
  'It will throw error: {string} with message: "{string}" while deleting employee when company is deleted',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
Then(
  'It will throw error: {string} with message: {string} while deleting employee when company ID entered still exist',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
    expect(functionsToMock.companyExistsById.callCount).to.equal(1);
  }
);
Then(
  'It will delete employee with details: "{string}" when company is deleted',
  (deletedEmployeeDetails) => {
    expect(this.result).deep.equal(JSON.parse(deletedEmployeeDetails));
  }
);

Then(
  "deleteEmployeeOfDeletedCompany function will call {int} time while deleting employee of deleted company",
  (deleteEmployeeOfDeletedCompanyFunctionCallCount) => {
    sinon.assert.callCount(deleteEmployeeOfDeletedCompanyStub, deleteEmployeeOfDeletedCompanyFunctionCallCount);
  }
);
Then(
  "companyExists function will call {int} time while deleting employee of deleted company",
  function (companyExistsByIdCallCount) {
    expect(functionsToMock.companyExistsById.callCount).to.equal(companyExistsByIdCallCount);
  }
);