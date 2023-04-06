const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeUserExistUseCase = require("./user-exists");

const sandbox = sinon.createSandbox();

const usersDb = {
  userExists: () => {},
};

const userIdStub = sandbox.stub(usersDb, "userExists");
userIdStub.callsFake((args) => {
  expect(args).deep.equal({
    id:this.id
  });
  
  return 1 ;
});

After(() => {
  this.id= undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  'User details id: {string} to find user existence',
  (id) => {
    this.id = id || undefined;
  }
);

When("Try to find user existence", async () => {
  const userExists = makeUserExistUseCase({
    Joi,
    usersDb,
  });
  try {
    this.result = await userExists({
      id: this.id,
    });
  } catch (e) {
    console.log(e)
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while finding user existence',
  (error, message) => {
    console.log(this.error)
    expect(this.error).deep.equal({
      name: error,
      message
    });
  }
);

Then('It will find user with details: {int}', (userExists) => {
  expect(this.result).deep.equal(JSON.parse(userExists));
});

Then('userExists function will call {int} time while finding user',
    (userExistsFunctionCallCount) => {
      sinon.assert.callCount(userIdStub, userExistsFunctionCallCount);
    },
);