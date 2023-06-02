const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const exceptions = require('../../exceptions');
const makeCreateEmployeeUseCase = require("./create_employee");

const sandbox = sinon.createSandbox();

const employeeDB = {
  createEmployee: sinon.stub(),
};

const functionsToMock = {
  companyExists: sinon.stub(),
};

After(function () {
  sandbox.restore();
});

Given(
  "Employee details employee_name: {string}, role: {string}, company_id: {string}, company_name: {string} and database_name: {string} to create new employee",
  function (employee_name, role, company_id, company_name, database_name) {
    this.employee_name = employee_name || undefined;
    this.role = role || undefined;
    this.company_id = company_id || undefined;
    this.company_name = company_name || undefined;
    this.database_name = database_name || undefined;
  });
  
Given(
  "Company Exists returns result is: {int}",
  function (companyExistsDetails) {
    functionsToMock.companyExists.resolves(companyExistsDetails);
  }
);

When("Try to create new employee", async function () {
  const createEmployee = makeCreateEmployeeUseCase({
    Joi,
    employeeDB,
    companyExists:functionsToMock.companyExists,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

  try {
    this.result = await createEmployee({
      employee_name: this.employee_name,
      role: this.role,
      company_id: this.company_id,
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
  'It will throw error: {string} with message: {string} while creating new employee with empty fields',
  function (error, message) {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
Then(
  'It will throw error: {string} with message: {string} while creating new employee with wrong fields',
  function (newEmployeeDetails) {
    expect(this.result).to.deep.equal(JSON.parse(newEmployeeDetails));
  }
);

Then(
  'It will throw error: {string} with message: {string} while creating new employee when company entered does not exist',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
    expect(functionsToMock.companyExists.callCount).to.equal(1);
  }
);
Then(
  'It will create new employee with details: "{string}"',
  function (newEmployeeDetails) {
    expect(this.result).deep.equal(JSON.parse(newEmployeeDetails));
  }
);

Then(
  "createEmployee function will call {int} time while creating new employee",
  function (createEmployeeFunctionCallCount) {
    expect(employeeDB.createEmployee.callCount).to.equal(createEmployeeFunctionCallCount);
  }
);
Then(
  "companyExists function will call {int} time while creating new employee",
  function (companyExistsCallCount) {
    expect(functionsToMock.companyExists.callCount).to.equal(companyExistsCallCount);
  }
);
