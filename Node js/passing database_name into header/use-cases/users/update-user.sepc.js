const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeUpdateUserUseCase=require('./update-user');

const sandbox = sinon.createSandbox();

const usersDb = {
  updateUser: () => {},
};

const updateUserStub = sandbox.stub(usersDb, "updateUser");
updateUserStub.callsFake((args) => {
  expect(args).deep.equal({
    id:this.id,
    name: this.name,
  });

  return { "id": 1 };
});

After(() => {
  this.name = undefined;
  this.id = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  'User details id: {string}, name: {string} to update user',
  (id,name) => {
    this.id = id || undefined,
    this.name = name || undefined;
  }
);

When("Try to update user", async () => {
  const updateUser = makeUpdateUserUseCase({
    Joi,
    usersDb,
  });
  try {
    this.result = await updateUser({
        id: this.id,
      name: this.name,
    });
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then(
  'It will throw error: {string} with message: "{string}" while updating user',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then('It will update user with details: {string}', (userDetails) => {
  expect(this.result).deep.equal(JSON.parse(userDetails));
});

Then('updateUser function will call {int} time while updating user',
    (updateUserFunctionCallCount) => {
      sinon.assert.callCount(updateUserStub, updateUserFunctionCallCount);
    },
); 