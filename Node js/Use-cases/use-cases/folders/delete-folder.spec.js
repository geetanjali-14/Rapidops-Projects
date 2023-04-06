const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeDeleteFolderUseCase = require("./delete-folder");

const sandbox = sinon.createSandbox();

const foldersDb = {
  deleteFolder: () => {},
};

const deleteFolderStub = sandbox.stub(foldersDb, "deleteFolder");
deleteFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    folder_id:this.folder_id
  });
  return 1;
});

After(() => {
    this.id = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });
  
  Given(
    "Folder details folder_id: {string} to delete folder",
    (folder_id) => {
      this.folder_id = folder_id || undefined;
    }
  );

  When("Try to delete folder", async () => {
    const deleteFolder = makeDeleteFolderUseCase({
      Joi,
      foldersDb,
    });
    try {
      this.result = await deleteFolder({
        folder_id: this.folder_id,
      });
    } catch (e) {
      this.error = {
        name: e.name,
        message: e.message,
      };
    }
  });

  Then(
    'It will throw error: {string} with message: "{string}" while deleting folder',
    (error, message) => {
      expect(this.error).deep.equal({
        name: error,
        message,
      });
    }
  );
  
  Then('It will delete folder with details: {int}', (deletedFolderDetails) => {
    expect(this.result).deep.equal(JSON.parse(deletedFolderDetails));
  });
  
  Then('deleteFolder function will call {int} time while deleting folder',
      (deleteFolderFunctionCallCount) => {
        sinon.assert.callCount(deleteFolderStub, deleteFolderFunctionCallCount);
      },
  );