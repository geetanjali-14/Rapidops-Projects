const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeGetEmployeeByCompanyUseCase = require("./get_employee_by_company_name");

const sandbox = sinon.createSandbox();

Before(() => {
  this.company_name = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

const employeeDB = {
    getEmployeesByCompanyName: () => {},
};

const getEmployeesByCompanyNameStub = sandbox.stub(employeeDB, "getEmployeesByCompanyName");
getEmployeesByCompanyNameStub.callsFake((args) => {
  expect(args).deep.equal({
    company_name: this.company_name,
    database_name: this.database_name,
  });

  return {employee_id:1};
});

After(() => {
  this.company_name = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

Given(
  "Get employee having company_name: {string} and database_name:{string}",
  (company_name, database_name) => {
    this.company_name = company_name || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to get employee by company_name", async () => {
  const getEmployeesByCompanyName = makeGetEmployeeByCompanyUseCase({
    Joi,
    employeeDB,
  });
  try {
    this.result = await getEmployeesByCompanyName({
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
  'It will throw error: {string} with message: {string} while getting employee',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will give employees of company with result: "{string}"',
  (employeeDetails) => {
    expect(this.result).deep.equal(JSON.parse(employeeDetails));
  }
);

Then(
  "getEmployeesByCompanyName function will call {int} time while getting employees",
  (getEmployeesByCompanyNameFunctionCallCount) => {
    sinon.assert.callCount(getEmployeesByCompanyNameStub, getEmployeesByCompanyNameFunctionCallCount);
  }
);
