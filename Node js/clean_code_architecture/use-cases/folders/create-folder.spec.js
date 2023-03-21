const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeCreateFolderUseCase = require("./create-folder");

const sandbox = sinon.createSandbox();

const foldersDb = {
  createFolder: () => {},
};

const createFolderStub = sandbox.stub(foldersDb, "createFolder");
createFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    user_id: this.user_id,
    name: this.name,
  });

  return { id: 1 };
});

After(() => {
  this.user_id = undefined;
  this.name = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given(
  "Folder details user_id:{string} and name: {string} to create new folder",
  (user_id, name) => {
    this.user_id = user_id || undefined;
    this.name = name || undefined;
  }
);

When("Try to create new folder", async () => {
  const createFolder = makeCreateFolderUseCase({
    Joi,
    foldersDb,
  });
  try {
    this.result = await createFolder({
      user_id: this.user_id,
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
  'It will throw error: {string} with message: "{string}" while creating new folder',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then('It will create new folder with details: "{string}"', (newFolderDetails) => {
  expect(this.result).deep.equal(JSON.parse(newFolderDetails));
});

Then(
  "createFolder function will call {int} time while creating new Folder",
  (createFolderFunctionCallCount) => {
    sinon.assert.callCount(createFolderStub, createFolderFunctionCallCount);
  }
);
