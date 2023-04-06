const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeGetUserByIdUseCase = require("./get-user-by-id");

const sandbox = sinon.createSandbox();

const usersDb = {
    getUserById: () => {},
};

const getUserByIdStub = sandbox.stub(usersDb, "getUserById");
getUserByIdStub.callsFake((args) => {
  expect(args).deep.equal({
    id:this.id
  });
  return {id:1}
});

After(() => {
    this.id=undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });
  
  Given(
    'User details id: {string} to get user details',
    (id) => {
      this.id = id || undefined;
    }
  );

  When("Try to get user details", async () => {
    const getUserById = makeGetUserByIdUseCase({
      Joi,
      usersDb,
    });
    try {
      this.result = await getUserById({
        id:this.id,
      });
    } catch (e) {
      this.error = {
        name: e.name,
        message: e.message,
      };
    }
  });

  Then(
    'It will throw error: {string} with message: "{string}" while getting user by id',
    (error, message) => {
      expect(this.error).deep.equal({
        name: error,
        message,
      });
    }
  );
  
  Then('It will get user with details: "{string}"', (userDetails) => {
    expect(this.result).deep.equal(JSON.parse(userDetails));
  });
  
  Then('getUserById function will call {int} time while getting user details',
      (getUserByIdFunctionCallCount) => {
        sinon.assert.callCount(getUserByIdStub, getUserByIdFunctionCallCount);
      },
  );