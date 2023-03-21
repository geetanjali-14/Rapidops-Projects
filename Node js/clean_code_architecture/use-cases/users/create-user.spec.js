const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeCreateUserUseCase = require("./create-user");

const sandbox = sinon.createSandbox();

const usersDb = {
  createUser: () => {},
};

const createUserStub = sandbox.stub(usersDb, "createUser");
createUserStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    email: this.email,
    password: this.password,
  });

  return { id: 1 };
});

After(() => {
  this.name = undefined;
  this.email = undefined;
  this.password = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "User details name: {string}, email: {string}, and password: {string} to create new user",
  (name, email, password) => {
    this.name = name || undefined;
    this.email = email || undefined;
    this.password = password || undefined;
  }
);

When("Try to create new user", async () => {
  const createUser = makeCreateUserUseCase({
    Joi,
    usersDb,
  });
  try {
    this.result = await createUser({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while creating new user',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then('It will create new user with details: "{string}"', (newUserDetails) => {
  expect(this.result).deep.equal(JSON.parse(newUserDetails));
});

Then('createUser function will call {int} time while creating new user',
    (createUserFunctionCallCount) => {
      sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
    },
);