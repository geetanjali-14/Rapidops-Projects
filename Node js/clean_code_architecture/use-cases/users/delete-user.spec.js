const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeDeleteUserUseCase = require("./delete-user");

const sandbox = sinon.createSandbox();

const usersDb = {
  deleteUser: () => {},
};

const deleteUserStub = sandbox.stub(usersDb, "deleteUser");
deleteUserStub.callsFake((args) => {
  expect(args).deep.equal({
    id:this.id
  });
  return { id: 1 };
});

After(() => {
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });
  
  Given(
    "User details id: {string} to delete user",
    (id) => {
      this.id = id || undefined;
    }
  );

  When("Try to delete user", async () => {
    const deleteUser = makeDeleteUserUseCase({
      Joi,
      usersDb,
    });
    try {
      this.result = await deleteUser({
        id: this.id,
      });
    } catch (e) {
      this.error = {
        name: e.name,
        message: e.message,
      };
    }
  });

  Then(
    'It will throw error: {string} with message: "{string}" while deleting user',
    (error, message) => {
      expect(this.error).deep.equal({
        name: error,
        message,
      });
    }
  );
  
  Then('It will delete user with details: "{string}"', (deleteduserDetails) => {
    expect(this.result).deep.equal(JSON.parse(deleteduserDetails));
  });
  
  Then('deleteUser function will call {int} time while deleting user',
      (deleteUserFunctionCallCount) => {
        sinon.assert.callCount(deleteUserStub, deleteUserFunctionCallCount);
      },
  );