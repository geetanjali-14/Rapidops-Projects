const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeEmployeeExists = require("./employee-exists");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const employeeDB = {
  employeeExists: () => {},
};

const employeeExistsStub = sandbox.stub(employeeDB, "employeeExists");
employeeExistsStub.callsFake((args)=> {
  expect(args).deep.equal({
    employeeId: this.employeeId,
  });
  return 1;
});


After(()=> {
  this.employeeId = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "Employee details employeeId: {string} to check employee existence",
  (employeeId)=> {
    this.employeeId = employeeId || undefined;
  }
)
When("Try to check employee existence", async  () =>{
  const employeeExists = makeEmployeeExists({
    Joi,
    employeeDB,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await employeeExists({
      employeeId: this.employeeId,
    });
  } catch (error) {
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while checking employee existence',
  (error, message) =>{
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will check employee existence with details: {int}',
  (existsResult) =>{
    expect(this.result).deep.equal(existsResult);
  }
);

Then(
  "employeeExists function will call {int} time while checking employee existence",
   (employeeExistsFunctionCallCount) =>{
    sinon.assert.callCount(employeeExistsStub, employeeExistsFunctionCallCount);
  }
);