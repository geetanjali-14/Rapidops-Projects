const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeFolderExistUseCase = require("./folder-exists");

const sandbox = sinon.createSandbox();

const foldersDb = {
    folderExists: () => {},
};

const folderIdStub = sandbox.stub(foldersDb, "folderExists");
folderIdStub.callsFake((args) => {
  expect(args).deep.equal({
    user_id:this.user_id,
    name:this.name,
  });
  
  return 1 ;
});

After(() => {
  this.user_id= undefined;
  this.name=undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  'Folder details user_id: {string} and name: {string} to find folder existence',
  (user_id,name) => {
    this.user_id = user_id || undefined;
    this.name = name || undefined;
  }
);

When("Try to find folder existence", async () => {
  const folderExists = makeFolderExistUseCase({
    Joi,
    foldersDb,
  });
  try {
    this.result = await folderExists({
      user_id: this.user_id,
      name:this.name,
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
  'It will throw error: {string} with message: {string} while finding folder existence',
  (error, message) => {
    console.log(this.error)
    expect(this.error).deep.equal({
      name: error,
      message
    });
  }
);

Then('It will find folder with details: {int}', (folderExists) => {
  expect(this.result).deep.equal(JSON.parse(folderExists));
});

Then('folderExists function will call {int} time while finding folder',
    (folderExistsFunctionCallCount) => {
      sinon.assert.callCount(folderIdStub, folderExistsFunctionCallCount);
    },
);