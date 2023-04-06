const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeUpdateFolderUseCase=require('./update-folder');

const sandbox = sinon.createSandbox();

const foldersDb = {
  updateFolder: () => {},
};

const updateFolderStub = sandbox.stub(foldersDb, "updateFolder");
updateFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    folder_id:this.folder_id,
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
  'Folder details folder_id: {string}, name: {string} to update folder',
  (folder_id,name) => {
    this.folder_id = folder_id || undefined,
    this.name = name || undefined;
  }
);

When("Try to update folder", async () => {
  const updateFolder = makeUpdateFolderUseCase({
    Joi,
    foldersDb,
  });
  try {
    this.result = await updateFolder({
        folder_id: this.folder_id,
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
  'It will throw error: {string} with message: "{string}" while updating folder',
  (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  }
);

Then('It will update folder with details: {string}', (updateResult) => {
  expect(this.result).deep.equal(JSON.parse(updateResult));
});

Then('updateFolder function will call {int} time while updating folder',
    (updateFolderFunctionCallCount) => {
      sinon.assert.callCount(updateFolderStub, updateFolderFunctionCallCount);
    },
); 