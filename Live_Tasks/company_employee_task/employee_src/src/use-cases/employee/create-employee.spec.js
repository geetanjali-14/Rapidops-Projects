const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");
const { Kafka } = require("kafkajs");

const makeCreateEmployee = require("./create-employee");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const employeeDB = {
  createEmployee: () => {},
};

const functionsToMock = {
  companyExists: () => {},
  employeeEmailExists: () => {},
  run: () => {},
};

const createEmployeeStub = sandbox.stub(employeeDB, "createEmployee");
createEmployeeStub.callsFake((args) => {
  expect(args).deep.equal({
    employeeName: this.employeeName,
    jobTitle: this.jobTitle,
    companyId: this.companyId,
    companyName: this.companyName,
    password: this.password,
    employeeEmail: this.employeeEmail,
  });
  return 1;
});

const employeeEmailExistsStub = sandbox.stub(
  functionsToMock,
  "employeeEmailExists"
);
employeeEmailExistsStub.callsFake((args) => {
  console.log(args.employeeEmail);
  expect(args).deep.equal({
    employeeEmail: this.employeeEmail,
  });
  return 0;
});

const runStub = sandbox.stub(functionsToMock, "run");
runStub.callsFake(() => {
  return;
});

const companyExistsStub = sandbox.stub(functionsToMock, "companyExists");
companyExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    companyName: this.companyName,
  });
  return 1;
});

After(() => {
  this.employeeName = undefined;
  this.jobTitle = undefined;
  this.companyId = undefined;
  this.companyName = undefined;
  this.password = undefined;
  this.employeeEmail = undefined;
  this.result = undefined;
  this.error = undefined;
  
  sandbox.resetHistory();
});

Given(
  "Employee details employeeName: {string}, jobTitle: {string},companyId: {string},companyName: {string}, employeeEmail: {string}, password: {string} to create new employee",
  (employeeName, jobTitle, companyId, companyName, employeeEmail, password) => {
    this.employeeName = employeeName || undefined;
    this.jobTitle = jobTitle || undefined;
    this.companyId = companyId || undefined;
    this.companyName = companyName || undefined;
    this.password = password || undefined;
    this.employeeEmail = employeeEmail || undefined;
  }
);

Given("Company Exists: {int}", (companyExistsResult) => {
  this.companyExistsResult = companyExistsResult;
});

Given("Employee Email Exists: {int}", (employeeEmailExists) => {
  this.employeeEmailExists = employeeEmailExists;
});

When("Try to create new employee", async () => {
  const createEmployee = makeCreateEmployee({
    Joi,
    employeeDB,
    Kafka,
    companyExists: functionsToMock.companyExists,
    employeeEmailExists: functionsToMock.employeeEmailExists,
    ValidationError: exceptions.ValidationError,
  });
  try {
    console.log("EMP NAME::", this.employeeName);
    this.result = await createEmployee({
      employeeName: this.employeeName,
      jobTitle: this.jobTitle,
      companyId: this.companyId,
      companyName: this.companyName,
      password: this.password,
      employeeEmail: this.employeeEmail,
    });
    // console.log("RESULLTTT:::", this.result);
  } catch (error) {
    // console.log("-----",error)
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while creating new employee',
   (error, message)=> {
   
    expect(this.error).deep.equal({
      name: error,
      message: message,
    });
  }
);

Then("It will create new employee with details: {int}", (newEmployeeID) => {
  expect(this.result).deep.equal(newEmployeeID);
});

Then(
  "createEmployee function will call {int} time while creating new employee",
  function (createEmployeeFunctionCallCount) {
    sinon.assert.callCount(createEmployeeStub, createEmployeeFunctionCallCount);
  }
);

