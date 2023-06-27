const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeDeleteEmployee = require("./delete-employee");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const employeeDB = {
  deleteEmployee: () => {},
  assignOtherEmployeeMasterWhenMasterDeletes:()=>{},
};

const functionsToMock = {
  createEmployeeExists: () => {},
  isVerifiedEmployee: () => {},
  accessTokenExists: () => {},
  accessTokenExpirationTime: () => {},
  updateAccessTokenTime: () => {},
  isMaster:()=>{},
};

const deleteEmployeeStub = sandbox.stub(employeeDB, "deleteEmployee");
deleteEmployeeStub.callsFake((args) => {
  expect(args).to.deep.equal({
    employeeId: this.employeeId,
  });
  return 1;
});

const assignOtherEmployeeMasterWhenMasterDeletesStub = sandbox.stub(employeeDB, "assignOtherEmployeeMasterWhenMasterDeletes");
assignOtherEmployeeMasterWhenMasterDeletesStub.callsFake(() => {
  return;
});

const createEmployeeExistsStub = sandbox.stub(
  functionsToMock,
  "createEmployeeExists"
);
createEmployeeExistsStub.callsFake(() => {
  return 1;
});

const isVerifiedEmployeeStub = sandbox.stub(
  functionsToMock,
  "isVerifiedEmployee"
);
isVerifiedEmployeeStub.callsFake(() => {
  return 1;
});

const accessTokenExistsStub = sandbox.stub(
  functionsToMock,
  "accessTokenExists"
);
accessTokenExistsStub.callsFake((args) => {
  expect(args).to.deep.equal({
    accessToken: args.accessToken,
  });
  return 1;
});

const accessTokenExpirationTimeStub = sandbox.stub(
  functionsToMock,
  "accessTokenExpirationTime"
);
accessTokenExpirationTimeStub.callsFake((args) => {
  expect(args).to.deep.equal({
    accessToken: args.accessToken,
  });
  return new Date(new Date().getTime() + 60 * 60 * 1000);
});

const updateAccessTokenTimeStub = sandbox.stub(
  functionsToMock,
  "updateAccessTokenTime"
);
updateAccessTokenTimeStub.callsFake((args) => {
  expect(args).to.deep.equal({
    accessToken: args.accessToken,
    updatedExpirationTime: args.updatedExpirationTime,
  });
  return 1;
});

const isMasterStub = sandbox.stub(
  functionsToMock,
  "isMaster"
);
isMasterStub.callsFake((args) => {
  expect(args).to.deep.equal({
    employeeId: this.employeeId,
  });
  return 1;
});

After(() => {
  this.employeeId = undefined;
  this.accessToken=undefined;
  this.result = undefined;
  this.error = undefined;
  
  sandbox.resetHistory();
});

Given(
  "Employee details employeeId: {string}, accessToken: {string} to delete employee",
  (employeeId, accessToken) => {
    this.employeeId = employeeId || undefined;
    this.accessToken = accessToken || undefined;
  }
);
When("Try to delete employee", async () => {
  const deleteEmployee = makeDeleteEmployee({
    Joi,
    employeeDB,
    createEmployeeExists: functionsToMock.createEmployeeExists,
    isVerifiedEmployee: functionsToMock.isVerifiedEmployee,
    accessTokenExists: functionsToMock.accessTokenExists,
    isMaster:functionsToMock.isMaster,
    accessTokenExpirationTime: functionsToMock.accessTokenExpirationTime,
    updateAccessTokenTime: functionsToMock.updateAccessTokenTime,
    assignOtherEmployeeMasterWhenMasterDeletes:employeeDB.assignOtherEmployeeMasterWhenMasterDeletes,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });
  try {
    this.result = await deleteEmployee({
      employeeId: this.employeeId,
      accessToken: this.accessToken,
    });
  } catch (error) {
    // console.log(error)
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while deleting employee',
  (error, message) => {
    expect(this.error).to.deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will throw error: {string} with message: "{string}" while deleting employee when Forbidden error occurs',
  (error, message) => {
    expect(this.error).to.deep.equal({
      name: error,
      message: message,
    });
  }
);

Then("It will delete employee with details: {int}", (deleteStatus) => {
  console.log("##########",this)
  expect(this.result).to.deep.equal(deleteStatus);
});

Then(
  "deleteEmployee function will be called {int} time while deleting employee",
  (deleteEmployeeFunctionCallCount) => {
    sinon.assert.callCount(deleteEmployeeStub, deleteEmployeeFunctionCallCount);
  }
);
