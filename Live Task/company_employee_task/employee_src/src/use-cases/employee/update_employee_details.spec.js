const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeUpdateEmployeeUseCase = require("./update_employee_details");

const sandbox = sinon.createSandbox();

const employeeDB = {
  updateEmployee: () => {},
};

const updateEmployeeStub = sandbox.stub(employeeDB, "updateEmployee");
updateEmployeeStub.callsFake(function (args)  {
  expect(args).deep.equal({
    employee_id: this.employee_id,
    employee_name: this.employee_name,
    role: this.role,
    company_id: this.company_id,
    company_name: this.company_name,
    database_name: this.database_name,
  });
  return true ;
});

After(function () {
  this.employee_id=undefined;
  this.employee_name = undefined;
  this.role = undefined;
  this.company_id = undefined;
  this.company_name = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

Given(
  "Updating Employee details employee_id: {string}, employee_name: {string}, role: {string}, company_id: {string}, company_name: {string} and database_name: {string}",
  function (employee_id,employee_name, role, company_id, company_name, database_name) {
    this.employee_id = employee_id || undefined;
    this.employee_name = employee_name || undefined;
    this.role = role || undefined;
    this.company_id = company_id || undefined;
    this.company_name = company_name || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to update employee", async function () {
  const updateEmployee = makeUpdateEmployeeUseCase({
    Joi,
    employeeDB,
  });
  try {
    this.result = await updateEmployee({
      employee_id: this.employee_id,
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
  'It will throw error: {string} with message: "{string}" while updating employee with empty fields',
  function (error, message) {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);
Then(
  'It will throw error: {string} with message: "{string}" while updating employee with wrong fields',
  function (error, message) {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will update employee with details: "{string}"',
  function (UpdateDetails) {
    console.log( this.result)
    expect(this.result).deep.equal(JSON.parse(UpdateDetails));
  }
);

Then(
  "updateEmployee function will call {int} time while updating employee",
  function (updateEmployeeFunctionCallCount) {
    sinon.assert.callCount(updateEmployeeStub, updateEmployeeFunctionCallCount);
  }
);
