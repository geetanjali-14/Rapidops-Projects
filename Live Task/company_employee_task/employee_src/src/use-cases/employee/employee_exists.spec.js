const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeEmployeeExistsUseCase = require("./employee_exists");

const sandbox = sinon.createSandbox();

Before(() => {
  this.employee_id = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

const employeeDB = {
    employeeExists: () => {},
};

const employeeExistsStub = sandbox.stub(employeeDB, "employeeExists");
employeeExistsStub.callsFake((args) => {
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
  "Checking employee existence having employee_id: {string} and database_name:{string}",
  (employee_id, database_name) => {
    this.employee_id = employee_id || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to check employee existence", async () => {
  const employeeExists = makeEmployeeExistsUseCase({
    Joi,
    employeeDB,
  });
  try {
    this.result = await employeeExists({
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
  'It will throw error: {string} with message: "{string}" while checking employee existence',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will check employee existence with result: "{string}"',
  (existenceStatus) => {
    expect(this.result).deep.equal(JSON.parse(existenceStatus));
  }
);

Then(
  "employeeExists function will call {int} time while checking employee existence",
  (employeeExistsFunctionCallCount) => {
    sinon.assert.callCount(employeeExistsStub, employeeExistsFunctionCallCount);
  }
);
