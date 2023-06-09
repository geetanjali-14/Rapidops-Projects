const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeEmployeeCreationEmailSendUseCase = require("./send_email_on_employee_creation");

const sandbox = sinon.createSandbox();

Before(() => {
  this.employee_email = undefined;
  this.company_id = undefined;

  sandbox.resetHistory();
});

const mockFunction = {
    getCompanyEmailbyCompanyId: () => {},
};

const getCompanyEmailbyCompanyIdStub = sandbox.stub(mockFunction, "getCompanyEmailbyCompanyId");
getCompanyEmailbyCompanyIdStub.callsFake((args) => {
  expect(args).deep.equal({
    company_id: this.company_id,
    employee_email: this.employee_email,
  });

  return 1;
});

After(() => {
  this.company_id = undefined;
  this.employee_email = undefined;

  sandbox.resetHistory();
});

Given(
  "Get employee having company_name: {string} and database_name: {string}",
  (company_id, employee_email) => {
    this.company_id = company_id || undefined;
    this.employee_email = employee_email || undefined;
  }
);

When("Try to get Company Email by Company Id", async () => {
  const getCompanyEmailbyCompanyId = makeEmployeeCreationEmailSendUseCase({
    Joi,
    mockFunction,
    ValidationError,
  });
  try {
    this.result = await getCompanyEmailbyCompanyId({
      company_id: this.company_id,
      employee_email: this.employee_email,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while while getting employee',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then(
  'It will Try to get Company Email by Company Id with result: {int}',
  (emailSent) => {
    expect(this.result).deep.equal(JSON.parse(emailSent));
  }
);

Then(
  "getCompanyEmailbyCompanyId function will call {int} time while getting company email by company Id",
  (getCompanyEmailbyCompanyIdFunctionCallCount) => {
    sinon.assert.callCount(getCompanyEmailbyCompanyIdStub, getCompanyEmailbyCompanyIdFunctionCallCount);
  }
);
