const { Given, When, Then, After } = require("@cucumber/cucumber");
const sinon = require("sinon");
const { expect } = require("chai");
const Joi = require("joi");

const makeInsertAccessToken = require("./insert-access-token");
const exceptions = require("../../exceptions");
const sandbox = sinon.createSandbox();

const accessTokensDB = {
  insertAccessToken: () => {},
};

const functionsToMock = {
  accessTokenExistsByEmployeeId: () => {},
  updateAccessToken: () => {},
};

const insertAccessTokenStub = sandbox.stub(accessTokensDB, "insertAccessToken");
insertAccessTokenStub.callsFake((args) => {
  expect(args).to.deep.equal({
    employeeId: this.employeeId,
    accessToken: this.accessToken,
    expirationTime: this.expirationTime,
    createdAt: this.createdAt,
    ipAddress: this.ipAddress,
    city: this.city,
    state: this.state,
    country: this.country,
    deviceName: this.deviceName,
    browserName: this.browserName,
  });
  return 1;
});

const accessTokenExistsByEmployeeIdStub = sandbox.stub(
  functionsToMock,
  "accessTokenExistsByEmployeeId"
);
accessTokenExistsByEmployeeIdStub.callsFake((args) => {
  console.log(this.employeeEmail);
  expect(args).to.deep.equal({
    employeeId: this.employeeId,
  });
  return this.accessTokenExistsResult;
});

const updateAccessTokenStub = sandbox.stub(
  functionsToMock,
  "updateAccessToken"
);
updateAccessTokenStub.callsFake((args) => {
  expect(args).to.deep.equal({
    accessToken: this.accessToken,
    updatedExpirationTime: this.updatedExpirationTime,
  });
  return this.affectedRows;
});


After(() => {
  this.employeeId = undefined;
  this.accessToken = undefined;
  this.expirationTime = undefined;
  this.createdAt =  undefined;
  this.ipAddress = undefined;
  this.city = undefined;
  this.state = undefined;
  this.country =  undefined;
  this.deviceName =  undefined;
  this.browserName = undefined;
  sandbox.resetHistory();
});

Given(
  "Employee details employeeId: {string}, accessToken: {string},expirationTime: {string},createdAt: {string}, ipAddress: {string}, city: {string} ,state: {string} , country: {string}, deviceName:{string}, browserName:{string} to create new employee",
  (
    employeeId,
    accessToken,
    expirationTime,
    createdAt,
    ipAddress,
    city,
    state,
    country,
    deviceName,
    browserName
  ) => {
    this.employeeId = employeeId || undefined;
    this.accessToken = accessToken || undefined;
    this.expirationTime = expirationTime || undefined;
    this.createdAt = createdAt || undefined;
    this.ipAddress = ipAddress || undefined;
    this.city = city || undefined;
    this.state = state || undefined;
    this.country = country || undefined;
    this.deviceName = deviceName || undefined;
    this.browserName = browserName || undefined;
  }
);

When("Try to insert accessToken", async () => {
  const insertAccessToken = makeInsertAccessToken({
    Joi,
    accessTokensDB,
    updateAccessToken: functionsToMock.updateAccessToken,
    accessTokenExistsByEmployeeId:
      functionsToMock.accessTokenExistsByEmployeeId,
    ValidationError: exceptions.ValidationError,
  });
  try {
    this.result = await insertAccessToken({
      employeeId: this.employeeId,
      accessTokenDetails: {
        accessToken: this.accessToken,
        expirationTime: this.expirationTime,
        createdAt: this.createdAt,
      },
      ipAddress: this.ipAddress,
      city: this.city,
      state: this.state,
      country: this.country,
      deviceName: this.deviceName,
      browserName: this.browserName,
    });
  } catch (error) {
    // console.log("Error: ",error);
    this.error = {
      name: error.name,
      message: error.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while checking accessToken Exists By EmployeeId when inserting access token',
  (error, message) => {
    expect(this.error).to.deep.equal({
      name: error,
      message: message,
    });
  }
);

Then(
  'It will insert access token with details: {int}',
  (insertedAccessTokenId) => {
    console.log("///////////",this)
    expect(this.result).to.deep.equal(insertedAccessTokenId);
  }
);

Then(
  "insertAccessToken function will call {int} time while inserting access token",
  (insertAccessTokenFunctionCallCount) => {
    sinon.assert.callCount(
      insertAccessTokenStub,
      insertAccessTokenFunctionCallCount
    );
  }
);

Then(
  "accessTokenExistsByEmployeeId function will call {int} time while inserting access token",
  (accessTokenExistsByEmployeeIdFunctionCallCount) => {
    sinon.assert.callCount(
      accessTokenExistsByEmployeeIdStub,
      accessTokenExistsByEmployeeIdFunctionCallCount
    );
  }
);

Then(
  "updateAccessToken function will call {int} time while inserting access token",
  (updateAccessTokenFunctionCallCount) => {
    sinon.assert.callCount(
      updateAccessTokenStub,
      updateAccessTokenFunctionCallCount
    );
  }
);
