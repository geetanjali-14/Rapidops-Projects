const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require('../../exceptions');
const makeDeleteEmployeeUseCase = require("./delete_employee");

const sandbox = sinon.createSandbox();

Before(() => {
  this.employee_id = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});


const employeeDB = {
  deleteEmployee: () => {},
};

const functionsToMock = {
  createEmployeeExistsFunction: sinon.stub(),
};

const deleteEmployeeStub = sandbox.stub(employeeDB, "deleteEmployee");
deleteEmployeeStub.callsFake((args) => {
  expect(args).deep.equal({
    employee_id: this.employee_id,
    database_name: this.database_name,
  });
  return 1;
});

After(() => {
  this.employee_id = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

Given(
  "Delete employee having employee_id: {string} and database_name:{string}",
  function (employee_id, database_name) {
    this.employee_id = employee_id || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to delete employee", async () => {
  const deleteEmployee = makeDeleteEmployeeUseCase({
    Joi,
    employeeDB,
    createEmployeeExistsFunction: functionsToMock.createEmployeeExistsFunction,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });
  try {
    this.result = await deleteEmployee({
      employee_id: this.employee_id,
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
  'It will throw error: {string} with message: "{string}" while deleting employee',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will throw error: {string} with message: {string} while deleting employee when employee ID entered does not exist',
  function (error, message) {
    expect(this.error).to.deep.equal({
      name: error,
      message,
    });
    expect(functionsToMock.createEmployeeExistsFunction.callCount).to.equal(1);
  }
);
Then(
  'It will delete employee with result: "{string}"',
  (deleteStatus) => {
    expect(this.result).deep.equal(JSON.parse(deleteStatus));
  }
);

Then(
  "deleteEmployee function will call {int} time while deleting employee",
  (deleteEmployeeFunctionCallCount) => {
    sinon.assert.callCount(deleteEmployeeStub, deleteEmployeeFunctionCallCount);
  }
);

Then(
  "companyExists function will call {int} time while deleting employee",
  function (companyExistsByIdCallCount) {
    expect(functionsToMock.companyExistsById.callCount).to.equal(companyExistsByIdCallCount);
  }
);