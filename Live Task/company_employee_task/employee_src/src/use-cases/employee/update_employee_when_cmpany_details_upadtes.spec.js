const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeUpdateEmployeeWhenCompanyDetailsChangesUseCase = require("./update_employee_when_cmpany_details_upadtes");

const sandbox = sinon.createSandbox();

const employeeDB = {
    updateEmployeeWhenCompanyIsUpdated: () => {},
};

const updateEmployeeWhenCompanyIsUpdatedStub = sandbox.stub(employeeDB, "updateEmployeeWhenCompanyIsUpdated");
updateEmployeeWhenCompanyIsUpdatedStub.callsFake(function (args) {
  expect(args).deep.equal({
    company_id: this.company_id,
    company_name: this.company_name,
    database_name: this.database_name,
  });

  return {employee_id: 1};
});

After(() => {
  this.company_id = undefined;
  this.company_name = undefined;
  this.database_name = undefined;

  sandbox.resetHistory();
});

Given(
  "Update employee details when company details changes having company_id: {string}, company_name: {string} and database_name:{string} when company is updated",
  (company_id,company_name, database_name) => {
    this.company_id = company_id || undefined;
    this.company_name = company_name || undefined;
    this.database_name = database_name || undefined;
  }
);

When("Try to update employee when company details changes", async () => {
  const updateEmployeeWhenCompanyIsUpdated = makeUpdateEmployeeWhenCompanyDetailsChangesUseCase({
    Joi,
    employeeDB,
  });
  try {
    this.result = await updateEmployeeWhenCompanyIsUpdated({
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
  'It will update employee when company details changes with details: "{string}"',
  (updatedEmployeeDetails) => {
    expect(this.result).deep.equal(JSON.parse(updatedEmployeeDetails));
  }
);

Then(
  'It will throw error: {string} with message: "{string}" to update employee when company details changes',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);


Then(
  "updateEmployeeWhenCompanyIsUpdated function will call {int} time to update employee when company details changes",
  (updateEmployeeWhenCompanyIsUpdatedFunctionCallCount) => {
    sinon.assert.callCount(updateEmployeeWhenCompanyIsUpdatedStub, updateEmployeeWhenCompanyIsUpdatedFunctionCallCount);
  }
);
