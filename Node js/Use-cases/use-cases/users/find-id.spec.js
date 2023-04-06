const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeFindIdUserUseCase = require("./find-id");

const sandbox = sinon.createSandbox();

const usersDb = {
  findId: () => {},
};

const userIdStub = sandbox.stub(usersDb, "findId");
userIdStub.callsFake((args) => {
  expect(args).deep.equal({
    email:this.email
  });
  
  return { id: 1 };
});

After(() => {
  this.email= undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  'User details email: {string} to find id',
  (email) => {
    this.email = email || undefined;
  }
);

When("Try to find user id", async () => {
  const findId = makeFindIdUserUseCase({
    Joi,
    usersDb,
  });
  try {
    this.result = await findId({
      email: this.email,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while find user id',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message
    });
  }
);

Then('It will find user id with details: "{string}"', (email) => {
  expect(this.result).deep.equal(JSON.parse(email));
});

Then('findId function will call {int} time while finding user id',
    (findUserIdFunctionCallCount) => {
      sinon.assert.callCount(userIdStub, findUserIdFunctionCallCount);
    },
);