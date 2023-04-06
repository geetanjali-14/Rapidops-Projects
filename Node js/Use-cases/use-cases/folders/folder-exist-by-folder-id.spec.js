const { Given, When, Then, After } = require("cucumber");
const sinon = require("sinon");
const expect = require("chai").expect;
const Joi = require("joi");

const makeFolderExistByFilderIdUseCase = require("./folder-exist-by-folder-id");

const sandbox = sinon.createSandbox();

const foldersDb = {
    folderExistsByFolderId: () => {},
};

const findFolderStub = sandbox.stub(foldersDb, "folderExistsByFolderId");
findFolderStub.callsFake((args) => {
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
    "Find folder with folder_id: {string}",
    (folder_id) => {
      this.folder_id = folder_id || undefined;
    }
  );

  When("Try to find folder with folder_id", async () => {
    const folderExistsByFolderId = makeFolderExistByFilderIdUseCase({
      Joi,
      foldersDb,
    });
    try {
      this.result = await folderExistsByFolderId({
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
    'It will throw error: {string} with message: {string} while finding folder',
    (error, message) => {
      expect(this.error).deep.equal({
        name: error,
        message,
      });
    }
  );
  
  Then('It will give folder with details: {int}', (folderDetails) => {
    expect(this.result).deep.equal(JSON.parse(folderDetails));
  });
  
  Then('folderExistsByFolderId function will call {int} time while finding folder',
      (findFolderFunctionCallCount) => {
        sinon.assert.callCount(findFolderStub, findFolderFunctionCallCount);
      },
  );