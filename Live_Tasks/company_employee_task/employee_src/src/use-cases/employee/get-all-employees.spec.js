const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const exceptions = require("../../exceptions");
const makeGetAllEmployee = require("./get-all-employees");

const sandbox = sinon.createSandbox();

const employeeDB = {
  getAllEmployees: () => {},
};

const functionsToMock = {
  accessTokenExists: () => {},
  accessTokenExpirationTime: () => {},
  updateAccessTokenTime: () => {},
};

const getAllEmployeesStub = sandbox.stub(employeeDB, "getAllEmployees");
getAllEmployeesStub.callsFake( (args)=> {
  expect(args).deep.equal();
  return ["Employee1", "Employee2"];
});

const accessTokenExistsStub = sandbox.stub(
  functionsToMock,
  "accessTokenExists"
);
accessTokenExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    accessToken: this.accessToken,
  });
  return 1;
});

const accessTokenExpirationTimeStub = sandbox.stub(
  functionsToMock,
  "accessTokenExpirationTime"
);
accessTokenExpirationTimeStub.callsFake((args) => {
  expect(args).deep.equal({
    accessToken: this.accessToken,
  });
  return new Date(new Date().getTime() + 60 * 60 * 1000);
});

const updateAccessTokenTimeStub = sandbox.stub(
    functionsToMock,
    "updateAccessTokenTime"
  );
  updateAccessTokenTimeStub.callsFake(() =>{
    return 1;
  });
  

After( () =>{
  this.accessToken = undefined;
  this.result = undefined;
  this.accessTokenExpirationTimeResult=undefined;
  this.updatedExpirationTime=undefined;
  this.error = undefined;
  sandbox.resetHistory();
});

Given(
  "Access Token details accessToken: {string} to get all employees",
  (accessToken) => {
    this.accessToken = accessToken || undefined;
  }
);

Given(
  "Access Token exists check accessToken: {string} to get all employees",
  (accessTokenExistsResult) => {
    this.accessTokenExistsResult = accessTokenExistsResult;
  }
);

Given(
  "Fetching accessToken Expiration Time accessTokenExpirationTimeResult: {string} to get all employees",
  (accessTokenExpirationTimeResult) =>{
    this.accessTokenExpirationTimeResult = new Date(
      accessTokenExpirationTimeResult
    );
  }
);

Given(
  "Updating AccessToken Time accessToken: {string} and updatedExpirationTime: {string} to get all employees",
  (accessToken, updatedExpirationTime) => {
    this.updatedExpirationTime = updatedExpirationTime,
      this.accessToken = accessToken;
  }
);

When("Try to get all employees", async () => {
  const getAllEmployees = makeGetAllEmployee({
    Joi,
    employeeDB,
    accessTokenExists: functionsToMock.accessTokenExists,
    accessTokenExpirationTime: functionsToMock.accessTokenExpirationTime,
    updateAccessTokenTime: functionsToMock.updateAccessTokenTime,
    ValidationError: exceptions.ValidationError,
    ForbiddenError: exceptions.ForbiddenError,
  });

  try {
    this.result = await getAllEmployees({
      accessToken: this.accessToken,
      updatedExpirationTime:this.updatedExpirationTime,
    });

  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while getting all employees',
  (error, message) => {
   console.log("2222234")
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then("It will get all employees: {string}", (employeeDetails) => {
  expect(this.result).deep.equal(JSON.parse(employeeDetails));
});

Then(
  "getAllEmployees function will call {int} time when getting all employees",
  (getAllEmployeesFunctionCallCount) => {
    sinon.assert.callCount(
      getAllEmployeesStub,
      getAllEmployeesFunctionCallCount
    );
  }
);


